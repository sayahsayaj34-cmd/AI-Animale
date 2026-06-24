import { useState } from "react";
import { Sparkles, ClipboardList } from "lucide-react";

type Props = {
  animalId: string;
  animalSpecies: string;
  onResult: (result: Prediction) => void;
};

export type Prediction = {
  id: string;
  predicted_disease: string;
  confidence_score: number;
  risk_level: string;
  recommendation: string;
  created_at: string;
};

const SYMPTOM_GROUPS: Record<string, string[]> = {
  "🌡️ General": [
    "Fever",
    "Loss of appetite",
    "Weight loss",
    "Lethargy",
    "Dehydration",
  ],
  "🫁 Respiratory": [
    "Coughing",
    "Nasal discharge",
    "Difficulty breathing",
    "Wheezing",
  ],
  "🫃 Digestive": [
    "Diarrhea",
    "Bloating",
    "Vomiting",
    "Constipation",
    "Drooling",
  ],
  "🦵 Locomotion": [
    "Limping",
    "Swollen joints",
    "Hoof problems",
    "Muscle weakness",
  ],
  "🐾 Skin & Coat": [
    "Hair loss",
    "Skin lesions",
    "Itching",
    "Wounds",
    "Swelling",
  ],
  "🔬 Reproductive": ["Abnormal discharge", "Abortion", "Mastitis signs"],
};

const DISEASE_RULES = [
  {
    disease: "Respiratory Infection",
    symptoms: ["Fever", "Nasal discharge", "Coughing"],
    confidence: 88,
    risk: "Medium",
    recommendation:
      "Isolate the animal, monitor temperature, and contact a veterinarian within 24 hours.",
  },
  {
    disease: "Mastitis",
    symptoms: ["Mastitis signs"],
    confidence: 95,
    risk: "High",
    recommendation:
      "Contact a veterinarian immediately. Check udder condition and milk quality.",
  },
  {
    disease: "Foot Rot",
    symptoms: ["Limping", "Hoof problems"],
    confidence: 90,
    risk: "Medium",
    recommendation:
      "Clean affected hooves, isolate the animal, and consult a veterinarian.",
  },
  {
    disease: "Digestive Disorder",
    symptoms: ["Vomiting", "Diarrhea", "Loss of appetite"],
    confidence: 82,
    risk: "Medium",
    recommendation:
      "Provide clean water, monitor hydration, and seek veterinary advice.",
  },
  {
    disease: "Parasitic Infection",
    symptoms: ["Weight loss", "Hair loss", "Lethargy"],
    confidence: 80,
    risk: "Medium",
    recommendation: "Perform parasite treatment and consult a veterinarian.",
  },
  {
    disease: "Skin Disease",
    symptoms: ["Itching", "Skin lesions", "Hair loss"],
    confidence: 85,
    risk: "Medium",
    recommendation:
      "Inspect skin condition, isolate if contagious, and contact a veterinarian.",
  },
  {
    disease: "Severe Infection",
    symptoms: ["Fever", "Wounds", "Swelling"],
    confidence: 92,
    risk: "High",
    recommendation: "Immediate veterinary intervention is recommended.",
  },
];

function generateDiagnosis(symptoms: string[]): Prediction {
  let bestMatch = null;
  let highestScore = 0;

  for (const rule of DISEASE_RULES) {
    const matches = rule.symptoms.filter((s) => symptoms.includes(s)).length;

    if (matches > highestScore) {
      highestScore = matches;
      bestMatch = rule;
    }
  }

  if (!bestMatch || highestScore === 0) {
    return {
      id: crypto.randomUUID(),
      predicted_disease: "No clear diagnosis",
      confidence_score: 45,
      risk_level: "Low",
      recommendation:
        "Continue monitoring the animal and consult a veterinarian if symptoms worsen.",
      created_at: new Date().toISOString(),
    };
  }

  return {
    id: crypto.randomUUID(),
    predicted_disease: bestMatch.disease,
    confidence_score: bestMatch.confidence,
    risk_level: bestMatch.risk,
    recommendation: bestMatch.recommendation,
    created_at: new Date().toISOString(),
  };
}

function DiagnosisForm({ animalId, animalSpecies, onResult }: Props) {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [extraSymptoms, setExtraSymptoms] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function toggleSymptom(symptom: string) {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom],
    );
  }

  async function handleAnalyze() {
    const symptoms = [
      ...selectedSymptoms,
      ...(extraSymptoms.trim() ? [extraSymptoms.trim()] : []),
    ];

    if (symptoms.length === 0) {
      setError("Select at least one symptom");
      return;
    }

    setError("");
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const result = generateDiagnosis(symptoms);

    setLoading(false);

    onResult(result);

    setSelectedSymptoms([]);
    setExtraSymptoms("");
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-100 flex items-center gap-2">
        <ClipboardList size={18} className="text-mainColor" />
        <h2 className="font-semibold text-gray-800">Symptom checker</h2>
        <span className="ml-auto text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">
          {animalSpecies}
        </span>
      </div>

      <div className="p-4 flex flex-col gap-4">
        {error && (
          <p className="text-red-500 text-sm text-center bg-red-50 p-2 rounded-xl">
            {error}
          </p>
        )}

        {/* Symptom checkboxes */}
        {Object.entries(SYMPTOM_GROUPS).map(([group, symptoms]) => (
          <div key={group}>
            <div className="text-xs font-medium text-gray-500 mb-2">
              {group}
            </div>
            <div className="flex flex-wrap gap-2">
              {symptoms.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => toggleSymptom(s)}
                  className={`text-xs px-3 py-1.5 rounded-xl border transition-all ${
                    selectedSymptoms.includes(s)
                      ? "bg-mainColor text-white border-mainColor"
                      : "bg-gray-50 text-gray-600 border-gray-200 hover:border-mainColor"
                  }`}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Extra free text */}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-500 font-medium uppercase tracking-wide">
            Other observations
          </label>
          <textarea
            placeholder="Describe anything else you notice — behaviour, physical appearance..."
            rows={2}
            className="border border-gray-200 rounded-xl px-3 py-2 text-sm bg-gray-50 text-gray-800 resize-none"
            value={extraSymptoms}
            onChange={(e) => setExtraSymptoms(e.target.value)}
          />
        </div>

        {/* Selected summary */}
        {selectedSymptoms.length > 0 && (
          <div className="text-xs text-gray-500 bg-gray-50 rounded-xl px-3 py-2">
            Selected: {selectedSymptoms.join(", ")}
          </div>
        )}

        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="bg-mainColor text-white rounded-xl py-2.5 text-sm font-semibold disabled:opacity-60 flex items-center justify-center gap-2">
          {loading ? (
            "Analyzing..."
          ) : (
            <>
              <Sparkles size={16} />
              Run AI diagnosis
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default DiagnosisForm;
