import { useEffect, useState } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import HealthRecordForm from "./HealthRecordForm";
import HealthRecordList from "./HealthRecordList";
import AIAnalysis from "./AIAnalysis"; // ✅ added

type Animal = {
  id: string;
  name: string;
  species: string;
  age: number;
  weight: number;
  gender: string;
};

type HealthRecord = {
  id: string;
  temperature: number | null;
  heart_rate: number | null;
  appetite_level: string | null;
  activity_level: string | null;
  symptoms: string | null;
  created_at: string;
};

const SPECIES_EMOJI: Record<string, string> = {
  Sheep: "🐑",
  Cow: "🐄",
  Goat: "🐐",
  Camel: "🐪",
  Horse: "🐎",
  Chicken: "🐔",
  Rabbit: "🐇",
  Donkey: "🫏",
};

function AnimalDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [animal, setAnimal] = useState<Animal | null>(null);
  const [records, setRecords] = useState<HealthRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) loadData(id);
  }, [id]);

  async function loadData(animalId: string) {
    setLoading(true);
    setError("");

    const { data: animalData, error: animalError } = await supabase
      .from("animals")
      .select("*")
      .eq("id", animalId)
      .single();

    if (animalError || !animalData) {
      setError("Animal not found");
      setLoading(false);
      return;
    }

    setAnimal(animalData);
    await fetchRecords(animalId);
    setLoading(false);
  }

  async function fetchRecords(animalId: string) {
    const { data, error } = await supabase
      .from("health_records")
      .select("*")
      .eq("animal_id", animalId)
      .order("created_at", { ascending: false });

    if (!error) setRecords(data || []);
  }

  if (loading) {
    return <p className="text-center text-gray-400 py-20">Loading...</p>;
  }

  if (error || !animal) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500 mb-3">{error || "Animal not found"}</p>
        <button
          onClick={() => navigate("/animals")}
          className="text-mainColor underline"
        >
          Back to animals
        </button>
      </div>
    );
  }

  return (
    <section className="bg-[#DBD7D2] min-h-screen pb-10">
      <h1 className="bg-mainColor p-3 text-center font-bold text-xl text-white">
        Animal Health Record
      </h1>

      <div className="max-w-5xl mx-auto px-4">
        <NavLink
          to="/animals"
          className="inline-block text-sm text-mainColor mt-4 mb-2"
        >
          ← Back to my animals
        </NavLink>

        {/* Animal info card */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 flex items-center gap-4 shadow-sm mb-6">
          <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-2xl flex-shrink-0">
            {SPECIES_EMOJI[animal.species] ?? "🐾"}
          </div>
          <div>
            <div className="text-lg font-semibold text-gray-800">
              {animal.name}
            </div>
            <div className="text-sm text-gray-400 mt-0.5">
              {animal.species} · {animal.gender} · {animal.age} months ·{" "}
              {animal.weight} kg
            </div>
          </div>
        </div>

        {/* Health records row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <HealthRecordForm
            animalId={animal.id}
            onRecordAdded={() => fetchRecords(animal.id)}
          />
          <HealthRecordList records={records} />
        </div>

        {/* ✅ AI Diagnosis — full width below */}
        <AIAnalysis
          animalId={animal.id}
          animalSpecies={animal.species}
        />
      </div>
    </section>
  );
}

export default AnimalDetail;