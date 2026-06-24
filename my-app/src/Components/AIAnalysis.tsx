import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import DiagnosisForm from "./DiagnosisForm";
import DiagnosisResultCard from "./DiagnosisResultCard";
import DiagnosisHistory from "./DiagnosisHistory";

type Prediction = {
  id: string;
  predicted_disease: string;
  confidence_score: number;
  risk_level: string;
  recommendation: string;
  created_at: string;
};

type Props = {
  animalId: string;
  animalSpecies: string;
};

function AIAnalysis({ animalId, animalSpecies }: Props) {
  const [result, setResult] = useState<Prediction | null>(null);
  const [history, setHistory] = useState<Prediction[]>([]);

  useEffect(() => {
    fetchHistory();
  }, [animalId]);

  async function fetchHistory() {
    const { data, error } = await supabase
      .from("predictions")
      .select("*")
      .eq("animal_id", animalId)
      .order("created_at", { ascending: false });

    if (!error) setHistory(data || []);
  }

  function handleResult(newResult: Prediction) {
    setResult(newResult);
    setHistory((prev) => [newResult, ...prev]);
  }

  return (
    <div className="md:col-span-2 flex flex-col gap-4">
      {result ? (
        <DiagnosisResultCard result={result} onClose={() => setResult(null)} />
      ) : (
        <DiagnosisForm
          animalId={animalId}
          animalSpecies={animalSpecies}
          onResult={handleResult}
        />
      )}

      <DiagnosisHistory history={history} />
    </div>
  );
}

export default AIAnalysis;
