import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import {
  PlusCircle,
  Stethoscope,
  AlertTriangle,
  TrendingUp,
  ChevronRight,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Animal = {
  id: string;
  name: string;
  species: string;
  gender: string;
  age: number;
  weight: number;
  created_at: string;
};

type HealthRecord = {
  id: string;
  animal_id: string;
  temperature: number | null;
  heart_rate: number | null;
  appetite_level: string | null;
  activity_level: string | null;
  symptoms: string | null;
  created_at: string;
};

// ─── Constants ────────────────────────────────────────────────────────────────

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

// An animal is flagged as "at risk" if its latest health record has
// a temperature out of a normal range or symptoms filled in.
function isAtRisk(records: HealthRecord[]): boolean {
  if (records.length === 0) return false;
  const latest = records[0];
  const hasSymptoms = !!latest.symptoms?.trim();
  const highTemp = latest.temperature !== null && latest.temperature > 39.5;
  const lowActivity = latest.activity_level === "Low";
  const lowAppetite = latest.appetite_level === "Low";
  return hasSymptoms || highTemp || (lowActivity && lowAppetite);
}

// ─── Component ────────────────────────────────────────────────────────────────

function Dashboard() {
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>("");
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [recentRecords, setRecentRecords] = useState<HealthRecord[]>([]);
  const [recordsByAnimal, setRecordsByAnimal] = useState<
    Record<string, HealthRecord[]>
  >({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    setLoading(true);

    // Get current user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      navigate("/login");
      return;
    }

    setUsername(user.user_metadata?.username ?? user.email ?? "Farmer");

    // Fetch this farmer's animals
    const { data: animalData } = await supabase
      .from("animals")
      .select("*")
      .eq("farmer_id", user.id)
      .order("created_at", { ascending: false });

    const fetchedAnimals: Animal[] = animalData || [];
    setAnimals(fetchedAnimals);

    if (fetchedAnimals.length > 0) {
      const ids = fetchedAnimals.map((a) => a.id);

      // Fetch all health records for those animals
      const { data: recordData } = await supabase
        .from("health_records")
        .select("*")
        .in("animal_id", ids)
        .order("created_at", { ascending: false });

      const fetchedRecords: HealthRecord[] = recordData || [];

      // Group by animal_id for risk detection
      const grouped: Record<string, HealthRecord[]> = {};
      for (const r of fetchedRecords) {
        if (!grouped[r.animal_id]) grouped[r.animal_id] = [];
        grouped[r.animal_id].push(r);
      }

      setRecentRecords(fetchedRecords.slice(0, 5)); // show last 5 across all animals
      setRecordsByAnimal(grouped);
    }

    setLoading(false);
  }

  // Derived stats
  const totalAnimals = animals.length;
  const maleCount = animals.filter((a) => a.gender === "Male").length;
  const femaleCount = animals.filter((a) => a.gender === "Female").length;
  const atRiskAnimals = animals.filter((a) =>
    isAtRisk(recordsByAnimal[a.id] ?? []),
  );
  const checkedCount = Object.keys(recordsByAnimal).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#DBD7D2] flex items-center justify-center">
        <p className="text-gray-500 text-sm animate-pulse">
          Loading dashboard...
        </p>
      </div>
    );
  }

  return (
    <section className="bg-[#DBD7D2] min-h-screen pb-12">
      {/* ── Header ── */}
      <div className="bg-mainColor px-6 py-5">
        <p className="text-white/70 text-sm">Welcome back,</p>
        <h1 className="text-white text-2xl font-bold capitalize">{username}</h1>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-6 flex flex-col gap-6">
        {/* ── Stats row ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            {
              label: "Total animals",
              value: totalAnimals,
              icon: "🐾",
              bg: "bg-white",
            },
            {
              label: "Males",
              value: maleCount,
              icon: "♂",
              bg: "bg-white",
            },
            {
              label: "Females",
              value: femaleCount,
              icon: "♀",
              bg: "bg-white",
            },
            {
              label: "Checked",
              value: checkedCount,
              icon: "✅",
              bg: "bg-white",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`${stat.bg} rounded-2xl border border-gray-200 shadow-sm p-4`}>
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-2xl font-bold text-gray-800">
                {stat.value}
              </div>
              <div className="text-xs text-gray-400 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* ── Alert: at-risk animals ── */}
        {atRiskAnimals.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
            <div className="flex items-center gap-2 text-red-600 font-semibold mb-3">
              <AlertTriangle size={18} />
              {atRiskAnimals.length} animal
              {atRiskAnimals.length > 1 ? "s" : ""} may need attention
            </div>
            <div className="flex flex-col gap-2">
              {atRiskAnimals.map((a) => (
                <NavLink
                  key={a.id}
                  to={`/animals/${a.id}`}
                  className="flex items-center justify-between bg-white rounded-xl px-3 py-2.5 border border-red-100 hover:border-red-300 transition-colors">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <span>{SPECIES_EMOJI[a.species] ?? "🐾"}</span>
                    <span className="font-medium">{a.name}</span>
                    <span className="text-gray-400">· {a.species}</span>
                  </div>
                  <ChevronRight size={16} className="text-red-400" />
                </NavLink>
              ))}
            </div>
          </div>
        )}

        {/* ── Quick actions ── */}
        <div>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Quick actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <NavLink
              to="/animals"
              className="bg-mainColor text-white rounded-2xl p-4 flex items-center gap-3 shadow-sm hover:opacity-90 transition-opacity">
              <PlusCircle size={22} />
              <div>
                <div className="font-semibold text-sm">Add animal</div>
                <div className="text-white/70 text-xs">
                  Register a new animal
                </div>
              </div>
            </NavLink>

            <NavLink
              to="/animals"
              className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-3 shadow-sm hover:border-mainColor transition-colors">
              <Stethoscope size={22} className="text-mainColor" />
              <div>
                <div className="font-semibold text-sm text-gray-800">
                  Health check
                </div>
                <div className="text-gray-400 text-xs">
                  Open an animal's record
                </div>
              </div>
            </NavLink>

            <NavLink
              to="/animals"
              className="bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-3 shadow-sm hover:border-mainColor transition-colors">
              <TrendingUp size={22} className="text-mainColor" />
              <div>
                <div className="font-semibold text-sm text-gray-800">
                  My animals
                </div>
                <div className="text-gray-400 text-xs">View full list</div>
              </div>
            </NavLink>
          </div>
        </div>

        {/* ── Animal list preview ── */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-800">Your animals</h2>
            <NavLink to="/animals" className="text-xs text-mainColor underline">
              See all
            </NavLink>
          </div>

          {animals.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-gray-400 text-sm mb-3">
                No animals registered yet
              </p>
              <NavLink
                to="/animals"
                className="text-mainColor text-sm font-medium underline">
                Add your first animal →
              </NavLink>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {animals.slice(0, 5).map((animal) => {
                const risk = isAtRisk(recordsByAnimal[animal.id] ?? []);
                return (
                  <NavLink
                    key={animal.id}
                    to={`/animals/${animal.id}`}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl flex-shrink-0">
                      {SPECIES_EMOJI[animal.species] ?? "🐾"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-800">
                          {animal.name}
                        </span>
                        {risk && (
                          <span className="text-xs bg-red-100 text-red-500 px-1.5 py-0.5 rounded-full">
                            ⚠ At risk
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5">
                        {animal.species} · {animal.gender} · {animal.age} months
                        · {animal.weight} kg
                      </div>
                    </div>
                    <ChevronRight
                      size={16}
                      className="text-gray-300 flex-shrink-0"
                    />
                  </NavLink>
                );
              })}
            </div>
          )}
        </div>

        {/* ── Recent health activity ── */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800">
              Recent health activity
            </h2>
          </div>

          {recentRecords.length === 0 ? (
            <p className="text-center text-gray-400 text-sm py-10">
              No health records yet — open an animal to add one
            </p>
          ) : (
            <div className="divide-y divide-gray-100">
              {recentRecords.map((r) => {
                const animal = animals.find((a) => a.id === r.animal_id);
                return (
                  <NavLink
                    key={r.id}
                    to={`/animals/${r.animal_id}`}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-lg flex-shrink-0">
                      {SPECIES_EMOJI[animal?.species ?? ""] ?? "🐾"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-800">
                        {animal?.name ?? "Unknown"}
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5">
                        {r.temperature}°C · {r.heart_rate} bpm ·{" "}
                        {r.appetite_level} appetite
                        {r.symptoms ? ` · "${r.symptoms}"` : ""}
                      </div>
                    </div>
                    <span className="text-xs text-gray-300 flex-shrink-0">
                      {new Date(r.created_at).toLocaleDateString()}
                    </span>
                  </NavLink>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
