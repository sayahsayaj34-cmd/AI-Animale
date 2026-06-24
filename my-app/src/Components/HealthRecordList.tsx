import { Thermometer, HeartPulse, Utensils, Activity } from "lucide-react";

type HealthRecord = {
  id: string;
  temperature: number | null;
  heart_rate: number | null;
  appetite_level: string | null;
  activity_level: string | null;
  symptoms: string | null;
  created_at: string;
};

type Props = {
  records: HealthRecord[];
};

function HealthRecordList({ records }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <h2 className="font-semibold text-gray-800">Health history</h2>
        <span className="text-xs text-gray-400">{records.length} records</span>
      </div>

      <div className="divide-y divide-gray-100 max-h-[480px] overflow-y-auto">
        {records.length === 0 ? (
          <p className="text-center text-gray-400 text-sm py-10">
            No health records yet
          </p>
        ) : (
          records.map((r) => (
            <div key={r.id} className="px-4 py-3">
              <div className="text-xs text-gray-400 mb-1.5">
                {new Date(r.created_at).toLocaleDateString()}
              </div>
              <div className="flex gap-4 text-sm text-gray-700 mb-1.5">
                <span className="flex items-center gap-1">
                  <Thermometer size={14} className="text-gray-400" />{" "}
                  {r.temperature}°C
                </span>
                <span className="flex items-center gap-1">
                  <HeartPulse size={14} className="text-gray-400" />{" "}
                  {r.heart_rate} bpm
                </span>
              </div>
              <div className="flex gap-3 text-xs text-gray-500 mb-1">
                <span className="flex items-center gap-1">
                  <Utensils size={12} /> {r.appetite_level}
                </span>
                <span className="flex items-center gap-1">
                  <Activity size={12} /> {r.activity_level}
                </span>
              </div>
              {r.symptoms && (
                <div className="text-xs text-gray-600 bg-gray-50 rounded-lg px-2 py-1 mt-1">
                  Symptoms: {r.symptoms}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default HealthRecordList;
