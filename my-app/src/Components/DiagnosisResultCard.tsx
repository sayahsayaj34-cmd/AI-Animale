import { AlertTriangle, CheckCircle, Phone } from "lucide-react";

export type Prediction = {
  id: string;
  predicted_disease: string;
  confidence_score: number;
  risk_level: string;
  recommendation: string;
  created_at: string;
};

type Props = {
  result: Prediction;
  onClose: () => void;
};

const RISK_CONFIG: Record<
  string,
  { bg: string; border: string; text: string; badge: string; icon: JSX.Element }
> = {
  Low: {
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-800",
    badge: "bg-green-100 text-green-700",
    icon: <CheckCircle size={20} className="text-green-500" />,
  },
  Medium: {
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    text: "text-yellow-800",
    badge: "bg-yellow-100 text-yellow-700",
    icon: <AlertTriangle size={20} className="text-yellow-500" />,
  },
  High: {
    bg: "bg-red-50",
    border: "border-red-200",
    text: "text-red-800",
    badge: "bg-red-100 text-red-700",
    icon: <AlertTriangle size={20} className="text-red-500" />,
  },
};

function DiagnosisResultCard({ result, onClose }: Props) {
  const config = RISK_CONFIG[result.risk_level] ?? RISK_CONFIG["Low"];

  return (
    <div
      className={`rounded-2xl border p-4 flex flex-col gap-3 ${config.bg} ${config.border}`}>
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          {config.icon}
          <span className={`font-semibold text-base ${config.text}`}>
            {result.predicted_disease}
          </span>
        </div>
        <span
          className={`text-xs font-medium px-2.5 py-1 rounded-full flex-shrink-0 ${config.badge}`}>
          {result.risk_level} risk
        </span>
      </div>

      {/* Confidence bar */}
      <div>
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Confidence</span>
          <span className="font-medium">{result.confidence_score}%</span>
        </div>
        <div className="h-2 bg-white/60 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${
              result.risk_level === "High"
                ? "bg-red-400"
                : result.risk_level === "Medium"
                  ? "bg-yellow-400"
                  : "bg-green-400"
            }`}
            style={{ width: `${result.confidence_score}%` }}
          />
        </div>
      </div>

      {/* Recommendation */}
      <div className={`text-sm leading-relaxed ${config.text}`}>
        <span className="font-medium">Recommendation: </span>
        {result.recommendation}
      </div>

      {/* Suggested Actions */}
      <div className="bg-white/70 rounded-xl p-3 text-sm">
        <div className="font-semibold mb-2">Suggested Actions</div>

        <ul className="list-disc pl-4 space-y-1">
          <li>Monitor the animal for 24–48 hours.</li>
          <li>Record temperature and appetite changes.</li>
          <li>Separate sick animals from healthy ones.</li>
          <li>Ensure access to clean water and feed.</li>

          {result.risk_level !== "Low" && (
            <li className="font-medium">Schedule a veterinary examination.</li>
          )}

          {result.risk_level === "High" && (
            <li className="font-semibold text-red-600">
              Immediate veterinary intervention required.
            </li>
          )}
        </ul>
      </div>

      {/* Vet CTA for high risk */}
      {result.risk_level === "High" && (
        <div className="bg-red-100 border border-red-200 rounded-xl p-3 flex items-center gap-2">
          <Phone size={16} className="text-red-500 flex-shrink-0" />
          <span className="text-xs text-red-700 font-medium">
            Contact a veterinarian immediately — this animal needs urgent care.
          </span>
        </div>
      )}

      {/* Date + close */}
      <div className="flex items-center justify-between pt-1">
        <span className="text-xs text-gray-400">
          {new Date(result.created_at).toLocaleString()}
        </span>
        <button
          onClick={onClose}
          className="text-xs text-gray-400 hover:text-gray-600 underline">
          Run another diagnosis
        </button>
      </div>
    </div>
  );
}

export default DiagnosisResultCard;
