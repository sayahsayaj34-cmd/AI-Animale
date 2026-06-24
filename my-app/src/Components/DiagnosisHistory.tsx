import { History, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

type Prediction = {
  id: string;
  predicted_disease: string;
  confidence_score: number;
  risk_level: string;
  recommendation: string;
  created_at: string;
};

type Props = {
  history: Prediction[];
};

const RISK_BADGE: Record<string, string> = {
  Low: "bg-green-100 text-green-700",
  Medium: "bg-yellow-100 text-yellow-700",
  High: "bg-red-100 text-red-700",
};

function DiagnosisHistory({ history }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null);

  if (history.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 text-center">
        <History size={32} className="text-gray-200 mx-auto mb-2" />
        <p className="text-sm text-gray-400">
          No diagnoses yet for this animal
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-100 flex items-center gap-2">
        <History size={18} className="text-mainColor" />
        <h2 className="font-semibold text-gray-800">Diagnosis history</h2>
        <span className="ml-auto text-xs text-gray-400">
          {history.length} total
        </span>
      </div>

      <div className="divide-y divide-gray-100 max-h-[400px] overflow-y-auto">
        {history.map((h) => (
          <div key={h.id} className="px-4 py-3">
            <button
              className="w-full text-left"
              onClick={() => setExpanded(expanded === h.id ? null : h.id)}>
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-full ${RISK_BADGE[h.risk_level] ?? "bg-gray-100 text-gray-600"}`}>
                  {h.risk_level}
                </span>
                <span className="text-sm font-medium text-gray-800 flex-1 text-left">
                  {h.predicted_disease}
                </span>
                <span className="text-xs text-gray-400 flex-shrink-0">
                  {new Date(h.created_at).toLocaleDateString()}
                </span>
                {expanded === h.id ? (
                  <ChevronUp
                    size={14}
                    className="text-gray-400 flex-shrink-0"
                  />
                ) : (
                  <ChevronDown
                    size={14}
                    className="text-gray-400 flex-shrink-0"
                  />
                )}
              </div>
            </button>

            {/* Expanded detail */}
            {expanded === h.id && (
              <div className="mt-3 flex flex-col gap-2">
                {/* Confidence bar */}
                <div>
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Confidence</span>
                    <span>{h.confidence_score}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-mainColor"
                      style={{ width: `${h.confidence_score}%` }}
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-600 bg-gray-50 rounded-xl px-3 py-2 leading-relaxed">
                  {h.recommendation}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DiagnosisHistory;
