import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Content-Type": "application/json",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // -----------------------------
    // Validate environment variables
    // -----------------------------
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const anthropicKey = Deno.env.get("ANTHROPIC_API_KEY");

    if (!supabaseUrl) {
      throw new Error("Missing SUPABASE_URL");
    }

    if (!serviceRoleKey) {
      throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY");
    }

    if (!anthropicKey) {
      throw new Error("Missing ANTHROPIC_API_KEY");
    }

    // -----------------------------
    // Parse request body safely
    // -----------------------------
    let body;

    try {
      body = await req.json();
    } catch {
      return new Response(
        JSON.stringify({
          error: "Invalid JSON body",
        }),
        {
          status: 400,
          headers: corsHeaders,
        },
      );
    }

    const { animalId, symptoms } = body;

    if (!animalId) {
      return new Response(
        JSON.stringify({
          error: "animalId is required",
        }),
        {
          status: 400,
          headers: corsHeaders,
        },
      );
    }

    if (!symptoms) {
      return new Response(
        JSON.stringify({
          error: "symptoms is required",
        }),
        {
          status: 400,
          headers: corsHeaders,
        },
      );
    }

    // -----------------------------
    // Create Supabase client
    // -----------------------------
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    // -----------------------------
    // Load animal
    // -----------------------------
    const { data: animal, error: animalError } = await supabase
      .from("animals")
      .select("*")
      .eq("id", animalId)
      .single();

    if (animalError || !animal) {
      return new Response(
        JSON.stringify({
          error: "Animal not found",
          detail: animalError?.message,
        }),
        {
          status: 404,
          headers: corsHeaders,
        },
      );
    }

    // -----------------------------
    // Load health records
    // -----------------------------
    const { data: records, error: recordsError } = await supabase
      .from("health_records")
      .select("*")
      .eq("animal_id", animalId)
      .order("created_at", { ascending: false })
      .limit(5);

    if (recordsError) {
      console.error("Health records error:", recordsError);
    }

    const recordsSummary =
      records && records.length > 0
        ? records
            .map(
              (r) =>
                `- Temp: ${r.temperature ?? "?"}°C | HR: ${
                  r.heart_rate ?? "?"
                } bpm | Appetite: ${r.appetite_level ?? "?"} | Activity: ${
                  r.activity_level ?? "?"
                } | Symptoms: ${r.symptoms ?? "none"}`,
            )
            .join("\n")
        : "No previous health records";

    // -----------------------------
    // Build prompt
    // -----------------------------
    const prompt = `
You are an expert livestock veterinarian.

Animal:
- Name: ${animal.name ?? "Unknown"}
- Species: ${animal.species ?? "Unknown"}
- Gender: ${animal.gender ?? "Unknown"}
- Age: ${animal.age ?? "Unknown"}
- Weight: ${animal.weight ?? "Unknown"}

Current symptoms:
${symptoms}

Previous health records:
${recordsSummary}

Return ONLY valid JSON.

{
  "predicted_disease": "string",
  "confidence_score": 0,
  "risk_level": "Low",
  "recommendation": "string"
}
`;

    // -----------------------------
    // Call Anthropic
    // -----------------------------
    const aiResponse = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": anthropicKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-0",
        max_tokens: 500,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();

      return new Response(
        JSON.stringify({
          error: "Anthropic API failed",
          status: aiResponse.status,
          detail: errorText,
        }),
        {
          status: 500,
          headers: corsHeaders,
        },
      );
    }

    const aiData = await aiResponse.json();

    const rawText = aiData?.content?.[0]?.text ?? "";

    if (!rawText) {
      return new Response(
        JSON.stringify({
          error: "Claude returned empty response",
        }),
        {
          status: 500,
          headers: corsHeaders,
        },
      );
    }

    // -----------------------------
    // Parse Claude JSON
    // -----------------------------
    let result;

    try {
      const cleaned = rawText
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      result = JSON.parse(cleaned);
    } catch {
      return new Response(
        JSON.stringify({
          error: "Failed to parse Claude response",
          raw: rawText,
        }),
        {
          status: 500,
          headers: corsHeaders,
        },
      );
    }

    // -----------------------------
    // Save prediction
    // -----------------------------
    const { data: saved, error: saveError } = await supabase
      .from("predictions")
      .insert({
        animal_id: animalId,
        predicted_disease: result.predicted_disease,
        confidence_score: result.confidence_score,
        risk_level: result.risk_level,
        recommendation: result.recommendation,
      })
      .select()
      .single();

    if (saveError) {
      return new Response(
        JSON.stringify({
          error: "Failed to save prediction",
          detail: saveError.message,
        }),
        {
          status: 500,
          headers: corsHeaders,
        },
      );
    }

    return new Response(JSON.stringify(saved), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (err) {
    return new Response(
      JSON.stringify({
        error: err instanceof Error ? err.message : "Unknown error",
      }),
      {
        status: 500,
        headers: corsHeaders,
      },
    );
  }
});
