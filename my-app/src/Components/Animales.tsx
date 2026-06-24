import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { Stethoscope } from "lucide-react";
import { NavLink } from "react-router-dom";

type Animal = {
  id: string;
  name: string;
  species: string;
  age: number;
  weight: number;
  gender: string;
  created_at: string;
};

type AnimalForm = {
  name: string;
  species: string;
  age: string;
  weight: string;
  gender: string;
};

const SPECIES = [
  "Sheep",
  "Cow",
  "Goat",
  "Camel",
  "Horse",
  "Chicken",
  "Rabbit",
  "Donkey",
];

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

function Animales() {
  const [animalForm, setAnimalForm] = useState<AnimalForm>({
    name: "",
    species: "Sheep",
    age: "",
    weight: "",
    gender: "Male",
  });
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchAnimals();
  }, []);

  async function fetchAnimals() {
    setFetchLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from("animals")
      .select("*")
      .eq("farmer_id", user.id)
      .order("created_at", { ascending: false });

    if (error) console.error(error);
    else setAnimals(data || []);

    setFetchLoading(false);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!animalForm.name || !animalForm.age || !animalForm.weight) {
      setError("Please fill in all required fields");
      return;
    }
    if (Number(animalForm.age) <= 0) {
      setError("Age must be a positive number");
      return;
    }
    if (Number(animalForm.weight) <= 0) {
      setError("Weight must be a positive number");
      return;
    }

    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setError("You must be logged in");
      setLoading(false);
      return;
    }

    // ✅ matches your real columns exactly: name, species, age, weight, gender
    const { error } = await supabase.from("animals").insert({
      farmer_id: user.id,
      name: animalForm.name,
      species: animalForm.species,
      age: Number(animalForm.age),
      weight: Number(animalForm.weight),
      gender: animalForm.gender,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      setSuccess("Animal registered successfully!");
      setAnimalForm({
        name: "",
        species: "Sheep",
        age: "",
        weight: "",
        gender: "Male",
      });
      fetchAnimals();
    }
  }

  async function handleDelete(id: string) {
    const { error } = await supabase.from("animals").delete().eq("id", id);
    if (!error) setAnimals(animals.filter((a) => a.id !== id));
  }

  return (
    <section className="bg-[#DBD7D2] min-h-screen">
      <h1 className="bg-mainColor p-3 text-center font-bold text-xl text-white">
        Animals Management
      </h1>

      <div className="flex justify-center items-start gap-6 p-6 flex-wrap">
        {/* ───── ADD ANIMAL FORM ───── */}
        <div className="bg-white rounded-2xl border border-gray-200 w-[370px] shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800">Add new animal</h2>
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-4 animal-form flex flex-col gap-4">
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

            {/* Species */}
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                Species *
              </label>
              <select
                className="border border-gray-200 rounded-xl px-3 py-2 text-sm bg-gray-50 text-gray-800"
                value={animalForm.species}
                onChange={(e) =>
                  setAnimalForm({ ...animalForm, species: e.target.value })
                }>
                {SPECIES.map((s) => (
                  <option key={s} value={s}>
                    {SPECIES_EMOJI[s]} {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Name */}
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                Name / ID *
              </label>
              <input
                type="text"
                placeholder="e.g. Sheep-01"
                className="border border-gray-200 rounded-xl px-3 py-2 text-sm bg-gray-50 text-gray-800"
                value={animalForm.name}
                onChange={(e) =>
                  setAnimalForm({ ...animalForm, name: e.target.value })
                }
              />
            </div>

            {/* Age + Weight */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                  Age (months) *
                </label>
                <input
                  type="number"
                  placeholder="e.g. 24"
                  min="1"
                  className="border border-gray-200 rounded-xl px-3 py-2 text-sm bg-gray-50 text-gray-800"
                  value={animalForm.age}
                  onChange={(e) =>
                    setAnimalForm({ ...animalForm, age: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                  Weight (kg) *
                </label>
                <input
                  type="number"
                  placeholder="e.g. 45"
                  min="1"
                  className="border border-gray-200 rounded-xl px-3 py-2 text-sm bg-gray-50 text-gray-800"
                  value={animalForm.weight}
                  onChange={(e) =>
                    setAnimalForm({ ...animalForm, weight: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Gender */}
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                Gender *
              </label>
              <div className="grid grid-cols-2 gap-2">
                {["Male", "Female"].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setAnimalForm({ ...animalForm, gender: g })}
                    className={`py-2 rounded-xl text-sm font-medium border transition-all ${
                      animalForm.gender === g
                        ? "border-mainColor bg-mainColor text-white"
                        : "border-gray-200 bg-gray-50 text-gray-600"
                    }`}>
                    {g === "Male" ? "♂ Male" : "♀ Female"}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-mainColor text-white rounded-xl py-2.5 text-sm font-semibold disabled:opacity-60">
              {loading ? "Saving..." : "Register animal"}
            </button>
          </form>
        </div>

        {/* ───── ANIMAL LIST ───── */}
        <div className="bg-white rounded-2xl border border-gray-200 flex-1 min-w-[320px] max-w-[560px] shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-800">My animals</h2>
            <span className="text-xs text-gray-400">
              {animals.length} registered
            </span>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 p-4 border-b border-gray-100">
            {[
              { label: "Total", value: animals.length },
              {
                label: "Males",
                value: animals.filter((a) => a.gender === "Male").length,
              },
              {
                label: "Females",
                value: animals.filter((a) => a.gender === "Female").length,
              },
            ].map((s) => (
              <div key={s.label} className="bg-gray-50 rounded-xl p-3">
                <div className="text-xl font-semibold text-gray-800">
                  {s.value}
                </div>
                <div className="text-xs text-gray-400 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          {/* List */}
          <div className="divide-y divide-gray-100">
            {fetchLoading ? (
              <p className="text-center text-gray-400 text-sm py-10">
                Loading...
              </p>
            ) : animals.length === 0 ? (
              <p className="text-center text-gray-400 text-sm py-10">
                No animals registered yet
              </p>
            ) : (
              animals.map((animal) => (
                <div
                  key={animal.id}
                  className="flex items-center gap-3 px-4 py-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl flex-shrink-0">
                    {SPECIES_EMOJI[animal.species] ?? "🐾"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-gray-800">
                      {animal.name}
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">
                      {animal.species} · {animal.gender} · {animal.age} months ·{" "}
                      {animal.weight} kg
                    </div>
                  </div>
                  <NavLink
                    to={`/animals/${animal.id}`}
                    className="w-8 h-8 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 hover:bg-gray-100 transition-colors flex items-center justify-center flex-shrink-0">
                    <Stethoscope size={16} />
                  </NavLink>
                  <button
                    onClick={() => handleDelete(animal.id)}
                    className="w-8 h-8 rounded-xl border border-red-100 bg-red-50 text-red-400 hover:bg-red-100 transition-colors flex items-center justify-center text-sm flex-shrink-0">
                    ✕
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Animales;
