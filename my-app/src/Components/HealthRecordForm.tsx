import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

type Props = {
  animalId: string;
  onRecordAdded: () => void;
};

function HealthRecordForm({ animalId, onRecordAdded }: Props) {
  const [form, setForm] = useState({
    temperature: "",
    heart_rate: "",
    appetite_level: "Normal",
    activity_level: "Normal",
    symptoms: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.temperature || !form.heart_rate) {
      setError("Temperature and heart rate are required");
      return;
    }
    if (Number(form.temperature) <= 0 || Number(form.heart_rate) <= 0) {
      setError("Values must be positive numbers");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("health_records").insert({
      animal_id: animalId,
      temperature: Number(form.temperature),
      heart_rate: Number(form.heart_rate),
      appetite_level: form.appetite_level,
      activity_level: form.activity_level,
      symptoms: form.symptoms || null,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setSuccess("Health record added");
      setForm({
        temperature: "",
        heart_rate: "",
        appetite_level: "Normal",
        activity_level: "Normal",
        symptoms: "",
      });
      onRecordAdded();
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-800">Add health record</h2>
      </div>

      <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-4">
        {error && (
          <p className="text-red-500 text-sm text-center bg-red-50 p-2 rounded-xl">
            {error}
          </p>
        )}
        {success && (
          <p className="text-green-600 text-sm text-center bg-green-50 p-2 rounded-xl">
            {success}
          </p>
        )}

        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500 font-medium uppercase tracking-wide">
              Temperature (°C) *
            </label>
            <input
              type="number"
              step="0.1"
              placeholder="e.g. 38.5"
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm bg-gray-50 text-gray-800"
              value={form.temperature}
              onChange={(e) =>
                setForm({ ...form, temperature: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500 font-medium uppercase tracking-wide">
              Heart rate (bpm) *
            </label>
            <input
              type="number"
              placeholder="e.g. 70"
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm bg-gray-50 text-gray-800"
              value={form.heart_rate}
              onChange={(e) => setForm({ ...form, heart_rate: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500 font-medium uppercase tracking-wide">
              Appetite
            </label>
            <select
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm bg-gray-50 text-gray-800"
              value={form.appetite_level}
              onChange={(e) =>
                setForm({ ...form, appetite_level: e.target.value })
              }>
              <option>Low</option>
              <option>Normal</option>
              <option>High</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500 font-medium uppercase tracking-wide">
              Activity
            </label>
            <select
              className="border border-gray-200 rounded-xl px-3 py-2 text-sm bg-gray-50 text-gray-800"
              value={form.activity_level}
              onChange={(e) =>
                setForm({ ...form, activity_level: e.target.value })
              }>
              <option>Low</option>
              <option>Normal</option>
              <option>High</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-500 font-medium uppercase tracking-wide">
            Symptoms
          </label>
          <textarea
            placeholder="e.g. coughing, loss of appetite, limping..."
            rows={3}
            className="border border-gray-200 rounded-xl px-3 py-2 text-sm bg-gray-50 text-gray-800 resize-none"
            value={form.symptoms}
            onChange={(e) => setForm({ ...form, symptoms: e.target.value })}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-mainColor text-white rounded-xl py-2.5 text-sm font-semibold disabled:opacity-60">
          {loading ? "Saving..." : "Save record"}
        </button>
      </form>
    </div>
  );
}

export default HealthRecordForm;
