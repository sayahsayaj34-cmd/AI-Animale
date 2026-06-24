import { useState } from "react";
import { BookOpen, Search, ChevronRight, X } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Article = {
  id: number;
  category: string;
  tag: string;
  title: string;
  summary: string;
  readTime: string;
  icon: string;
  content: string;
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const ARTICLES: Article[] = [
  // ── Disease Prevention ────────────────────────────────────────────────────
  {
    id: 1,
    category: "Disease Prevention",
    tag: "Prevention",
    icon: "🛡️",
    title: "How to prevent Foot-and-Mouth Disease in cattle and sheep",
    summary:
      "Foot-and-Mouth Disease (FMD) spreads rapidly between cloven-hoofed animals. Learn the early signs and how to protect your herd.",
    readTime: "5 min",
    content: `## What is Foot-and-Mouth Disease?

Foot-and-Mouth Disease (FMD) is a highly contagious viral illness that affects cattle, sheep, goats, pigs, and camels. It causes painful blisters on the mouth, tongue, and feet, leading to severe loss of productivity.

## Early signs to watch for

- Fever above 40°C (104°F)
- Excessive salivation and drooling
- Blisters on the gums, tongue, lips, and between the toes
- Limping or reluctance to stand
- Sudden drop in milk production
- Loss of appetite

## How it spreads

FMD spreads through direct contact with infected animals, contaminated feed, water, soil, and even the air over short distances. It can also be carried by humans on clothing and boots.

## Prevention measures

**Vaccination** is the most effective protection. Speak to your local veterinarian about the vaccination schedule recommended in your region.

**Biosecurity steps:**
- Isolate any new animals for at least 21 days before introducing them to your herd
- Disinfect footwear and equipment before entering animal areas
- Restrict visitor access to your farm
- Report any suspected cases immediately to the local veterinary authority

## What to do if you suspect FMD

Do not move any animals. Contact your veterinarian immediately. Early reporting can prevent the disease from spreading to neighboring farms.`,
  },
  {
    id: 2,
    category: "Disease Prevention",
    tag: "Prevention",
    icon: "💉",
    title: "Vaccination calendar for sheep and goats in Algeria",
    summary:
      "A practical guide to the essential vaccines for small ruminants, with recommended timing throughout the year.",
    readTime: "4 min",
    content: `## Why vaccination matters

Vaccination is the most cost-effective way to prevent disease outbreaks in your flock. Missing a scheduled vaccine can leave your entire herd vulnerable.

## Core vaccines for sheep and goats

| Disease | Vaccine type | When to vaccinate |
|---|---|---|
| Enterotoxemia (Pulpy Kidney) | Clostridial | Annually, before lambing season |
| Foot-and-Mouth Disease | FMD Polyvalent | Every 6 months |
| Brucellosis | Rev.1 (ewes only) | Once, between 3–6 months of age |
| Peste des Petits Ruminants (PPR) | PPR live vaccine | Every 3 years |
| Pasteurellosis | Killed vaccine | Annually, before cold season |

## Timing tips

- **Spring (March–April):** FMD booster, Clostridial booster before lambing
- **Autumn (September–October):** FMD booster, Pasteurellosis ahead of winter
- **New lambs:** Begin vaccination at 4–6 weeks of age

## Storage

Vaccines must be kept at 2–8°C at all times. Never use a vaccine that has been frozen or left out in the heat.

## Record keeping

Keep a written log of every vaccination: date, animal ID, vaccine name, batch number, and the administering vet. This is required if you sell animals or products.`,
  },
  {
    id: 3,
    category: "Disease Prevention",
    tag: "Prevention",
    icon: "🦠",
    title: "Recognizing and preventing respiratory diseases in livestock",
    summary:
      "Respiratory infections are among the most common causes of death in young animals. Learn how to spot them early.",
    readTime: "6 min",
    content: `## Overview

Respiratory diseases cause significant losses in livestock worldwide, especially in young animals during cold or wet weather. They are often triggered by a combination of infection and stress.

## Common respiratory diseases

**Pneumonia** — Affects all species. Signs: rapid or labored breathing, nasal discharge, high fever, depression, coughing.

**Pasteurellosis (Shipping Fever)** — Often triggered by transport stress. Common in cattle and sheep.

**Contagious Bovine Pleuropneumonia (CBPP)** — A serious bacterial disease in cattle. Notifiable disease in Algeria.

## Risk factors

- Overcrowding in poorly ventilated shelters
- Sudden temperature changes
- Moving animals over long distances
- Mixing animals from different sources
- Malnutrition and low immunity

## Prevention

1. **Ventilation** — Ensure shelters have adequate airflow without creating cold drafts.
2. **Density** — Do not overcrowd. Each animal needs space to lie down and stand without contact.
3. **Nutrition** — A well-fed animal resists infection. Ensure adequate energy and vitamin A/E intake.
4. **Stress reduction** — Minimize unnecessary handling, especially before and after transport.
5. **Vaccination** — Pasteurellosis vaccines are available and recommended before cold seasons.

## Treatment

Bacterial pneumonia responds well to antibiotics when caught early. Always consult a veterinarian — self-medicating without a diagnosis often leads to antibiotic resistance.`,
  },

  // ── Nutrition ─────────────────────────────────────────────────────────────
  {
    id: 4,
    category: "Nutrition",
    tag: "Nutrition",
    icon: "🌾",
    title: "Feeding sheep and goats: what they need at each life stage",
    summary:
      "Nutritional requirements change significantly from lamb to adult to pregnant ewe. Here's what to feed and when.",
    readTime: "7 min",
    content: `## Why nutrition changes with life stage

A growing lamb, a lactating ewe, and a dry adult have completely different energy and protein needs. Feeding them all the same ration leads to either deficiency or wasteful overfeeding.

## Life stages and requirements

### Lambs (0–3 months)
- Colostrum in the first 6 hours after birth is critical for immunity.
- Milk feeding for the first 6–8 weeks.
- Introduce dry creep feed (high protein, 18–20%) from week 2.
- Gradually wean between 8–12 weeks.

### Growing lambs (3–6 months)
- High energy and protein diet to support rapid muscle growth.
- Good quality hay or pasture + 200–300g/day of concentrate feed.
- Ensure clean water is always available.

### Adult dry ewes
- Maintenance ration only — avoid overfeeding which causes fat ewes that struggle at lambing.
- Good pasture or hay is usually sufficient.
- Monitor body condition score regularly.

### Late pregnancy (last 6 weeks)
- Energy requirements increase by 50–75% as the fetus grows rapidly.
- Feed 300–500g/day of concentrate in addition to roughage.
- Avoid underfeeding — leads to pregnancy toxemia (twin lamb disease).

### Lactating ewes
- Highest nutritional demand of any life stage.
- Needs 2–3× maintenance energy.
- High quality hay + 500–700g/day concentrate.

## Key minerals

- **Calcium & Phosphorus** — Critical for bone development and milk production.
- **Selenium** — Deficiency causes white muscle disease in lambs. Supplement in selenium-poor regions.
- **Copper** — Essential for wool quality and reproduction. However, goats are more tolerant of copper than sheep — never give sheep mineral mixes formulated for goats.`,
  },
  {
    id: 5,
    category: "Nutrition",
    tag: "Nutrition",
    icon: "🐄",
    title: "Water needs of livestock — the most overlooked nutrient",
    summary:
      "Water is the single most important nutrient. Even mild dehydration reduces feed intake, milk, and growth. Learn how much each species needs.",
    readTime: "4 min",
    content: `## Water is a nutrient

Most farmers focus on feed, but water is the first nutrient to limit production. An animal can survive weeks without food but only days without water. Even 5–8% dehydration reduces feed intake by up to 20%.

## Daily water requirements

| Species | Condition | Liters per day |
|---|---|---|
| Dairy cow | Lactating | 80–120 L |
| Beef cow | Dry adult | 30–50 L |
| Ewe/goat | Lactating | 5–10 L |
| Sheep/goat | Dry adult | 2–4 L |
| Camel | Dry season | 30–50 L every few days |
| Horse | Working | 30–50 L |
| Chicken | Laying hen | 0.25–0.35 L |

## Factors that increase water needs

- High ambient temperature — needs can double in summer
- High dry matter in feed (hay vs fresh pasture)
- Late pregnancy and lactation
- High salt or protein in the diet

## Water quality

- Test water sources annually for bacteria and nitrates.
- Clean troughs at least once a week — dirty water is often refused.
- In hot weather, provide water in the shade to keep it cooler.
- Ensure enough trough space so submissive animals are not pushed away.

## Signs of dehydration

- Sunken eyes
- Dry nose and gums
- Skin that stays "tented" when pinched
- Reduced urine output
- Lethargy and weakness`,
  },
  {
    id: 6,
    category: "Nutrition",
    tag: "Nutrition",
    icon: "🧪",
    title: "Understanding body condition scoring in sheep and cattle",
    summary:
      "Body Condition Score (BCS) is a hands-on tool to measure if your animals are too thin, too fat, or just right.",
    readTime: "5 min",
    content: `## What is Body Condition Score?

Body Condition Score (BCS) is a simple 1–5 scale used to assess the amount of fat and muscle on a live animal by feel, without needing scales. It is the most practical tool for monitoring nutrition across a whole flock.

## How to score sheep (1–5 scale)

Feel the spine and ribs behind the last rib with your thumb and fingers:

**Score 1 — Emaciated**
Spine and ribs are very sharp. No fat or muscle covering. Animal is dangerously thin.

**Score 2 — Thin**
Spine is prominent. Individual ribs can be felt easily. Needs more feed.

**Score 3 — Ideal**
Spine can be felt with light pressure. Ribs felt with firm pressure. Fat covering is smooth.

**Score 4 — Fat**
Spine detected only with firm pressure. Ribs hard to feel. Risk of lambing difficulty.

**Score 5 — Obese**
Spine and ribs cannot be felt. Animal at serious health risk.

## Target scores by stage

| Life stage | Target BCS |
|---|---|
| Breeding (tupping) | 3–3.5 |
| Mid-pregnancy | 2.5–3 |
| Late pregnancy | 3–3.5 |
| Early lactation | 2.5–3 |
| Weaning | 2.5+ |

## How often to score

Score your whole flock at tupping, 6 weeks before lambing, at lambing, and at weaning. Any animal scoring below 2 should be separated and fed extra rations immediately.`,
  },

  // ── Animal Care ───────────────────────────────────────────────────────────
  {
    id: 7,
    category: "Animal Care",
    tag: "Care",
    icon: "🐑",
    title: "Hoof care and foot rot prevention in sheep and goats",
    summary:
      "Lame animals eat less, grow slower, and suffer. Regular hoof trimming and prompt foot rot treatment are essential management tasks.",
    readTime: "5 min",
    content: `## Why hoof care matters

Lameness is one of the most common and costly problems in sheep and goat farming. A lame animal reduces its feed intake, loses body condition, and if pregnant, may abort or produce less milk.

## Common causes of lameness

**Foot rot (Fusobacterium necrophorum + Dichelobacter nodosus)**
The most serious cause. It spreads rapidly in wet, muddy conditions. Infected feet have a very foul smell, soft wet tissue between the toes, and severe lameness.

**Foot scald (Benign foot rot)**
Early-stage disease affecting the skin between the toes. Less severe. Animal is lame but the smell is not as strong.

**Overgrown hooves**
Curling, overgrown hooves trap dirt and moisture, creating ideal conditions for infection.

## Hoof trimming schedule

- Trim hooves **twice a year** minimum (spring and autumn).
- Use sharp, clean hoof shears or trimmers.
- Remove excess hoof wall so the sole is flat and the animal walks naturally.
- Disinfect tools between animals to avoid spreading infection.

## Foot bathing

Walk your flock through a 10% zinc sulfate or 3–5% formalin foot bath:
- Every 2–3 weeks in wet conditions
- After any outbreak of foot rot
- Keep the bath fresh — change solution after 100–150 sheep

## Treating foot rot

1. Trim away all infected tissue until you reach healthy horn.
2. Apply a topical antibiotic spray.
3. Separate the animal from the flock to avoid spreading.
4. In severe cases, inject with long-acting oxytetracycline (consult your vet).
5. A foot rot vaccine is available and recommended for chronically affected flocks.`,
  },
  {
    id: 8,
    category: "Animal Care",
    tag: "Care",
    icon: "🐪",
    title: "Camel health management: unique needs of dromedaries",
    summary:
      "Camels have adapted to harsh conditions but still require regular care. Learn about common diseases, parasite control, and water management.",
    readTime: "6 min",
    content: `## Understanding camels

Dromedary camels (Camelus dromedarius) are remarkably resilient animals, but their unique physiology means they show illness differently from other livestock. By the time a camel appears visibly sick, the disease may already be advanced.

## Common health problems

**Trypanosomiasis (Surra)**
Caused by a blood parasite (Trypanosoma evansi) transmitted by biting flies. Signs: weight loss, swollen limbs, anemia, weakness. Treat with diminazene aceturate or suramin under veterinary supervision.

**Mange (Sarcoptic mange)**
Causes severe skin crusting and hair loss. Spreads rapidly between camels. Treat with ivermectin injections and topical acaricides.

**Camelpox**
A viral disease causing fever and skin lesions. Vaccination is available in endemic areas.

**Internal parasites**
Gastrointestinal worms and liver flukes are common. Deworm annually and after the rainy season.

## Water and feeding

- Healthy camels can go 5–10 days without water in cool weather, but should be watered every 2–3 days in summer heat.
- When they do drink, a camel can consume 100–150 liters in one session.
- Feed: browse, hay, and grain concentrate. Avoid spoiled or moldy feed.
- Do not suddenly change the diet — camels have sensitive digestive systems.

## Signs of illness to watch

- Grinding of teeth (sign of abdominal pain)
- Head pressing against walls
- Failure to rise in the morning
- Unusual posture when resting
- Excessive nasal discharge

## Handling tips

Always approach a camel calmly and from the side. Use a nose peg for restraint during treatment. Train young camels to be handled from birth.`,
  },
  {
    id: 9,
    category: "Animal Care",
    tag: "Care",
    icon: "🐔",
    title: "Poultry health: preventing Newcastle disease and Marek's disease",
    summary:
      "Two of the deadliest poultry diseases can be prevented almost entirely by vaccination and good biosecurity.",
    readTime: "5 min",
    content: `## Newcastle Disease (ND)

Newcastle Disease is a highly contagious viral disease that can kill an entire flock within days. It is one of the most important diseases for chicken farmers worldwide.

### Signs
- Sudden deaths, often without warning
- Twisted necks and nervous signs
- Greenish diarrhea
- Swelling around the eyes and neck
- Gasping and coughing

### Vaccination
Vaccinate day-old chicks with the La Sota or Hitchner B1 strain. Booster at 3–4 weeks, then every 3–4 months in endemic areas.

### No treatment — only prevention
There is no effective treatment for Newcastle Disease. Biosecurity and vaccination are the only tools.

---

## Marek's Disease

A herpesvirus infection that causes tumors and paralysis in young chickens (3–30 weeks old). Once in a flock, it can persist in the environment for months.

### Signs
- Leg paralysis — one leg stretched forward, one back
- Wing droop
- Sudden blindness (gray eye)
- Wasting

### Vaccination
Vaccinate all chicks on day 1 of life. The vaccine prevents tumor development but does not prevent infection, so vaccinated birds can still carry and shed the virus.

---

## General biosecurity for poultry

- Keep different age groups separate — "all in, all out" management.
- Prevent contact with wild birds, especially waterfowl.
- Disinfect coops thoroughly between flocks.
- Change clothes and disinfect footwear before entering the chicken house.
- Do not bring birds from unknown sources without a 2-week isolation period.`,
  },

  // ── Best Practices ────────────────────────────────────────────────────────
  {
    id: 10,
    category: "Best Practices",
    tag: "Management",
    icon: "📋",
    title: "How to keep accurate livestock records",
    summary:
      "Good records are the foundation of a profitable farm. Learn what to track and why it matters for disease control, breeding, and sales.",
    readTime: "4 min",
    content: `## Why records matter

Farms that keep detailed records are significantly more profitable than those that do not. Records help you track which animals are productive, spot health problems earlier, prove vaccination compliance for export or sale, and make better breeding decisions.

## What to record for each animal

**Identity**
- Unique ID / ear tag number
- Species, breed, date of birth, sex
- Purchase date and source (if bought)

**Health**
- All vaccinations (date, product, batch number)
- Treatments administered (date, drug, dose, reason)
- Veterinary visits and diagnoses
- Dates of illness and recovery

**Reproduction**
- Mating dates and the sire used
- Expected and actual birth dates
- Number of offspring and their IDs

**Production**
- Milk yield records (dairy animals)
- Weight at birth, weaning, and sale
- Wool shearing records (sheep)

**Financial**
- Purchase cost
- Feed costs per animal
- Sale price and buyer

## How to record

A simple notebook or spreadsheet works. My Animal AI stores your health records automatically — use it alongside a physical register for full coverage.

## How long to keep records

Keep all livestock records for a minimum of 5 years. In the event of a disease outbreak or legal dispute, these records may be required by the veterinary authority.`,
  },
  {
    id: 11,
    category: "Best Practices",
    tag: "Management",
    icon: "🏠",
    title: "Shelter and housing requirements for livestock in hot climates",
    summary:
      "Heat stress silently costs farmers through reduced milk, slower growth, and more disease. Good housing design makes a measurable difference.",
    readTime: "5 min",
    content: `## Heat stress is a hidden cost

In Algeria's climate, heat stress in summer is one of the biggest drains on productivity. Dairy cows, for example, begin to experience heat stress above 25°C. A stressed animal eats less, produces less milk, and is more susceptible to disease.

## Key design principles

**Orientation**
Align long buildings east–west so the roof blocks the midday sun. South-facing walls get morning and evening sun but are in shade at peak heat.

**Ventilation**
Natural ventilation is most effective. The ridge of the roof should have an open vent running the full length. Side walls should be open mesh or spaced planks, not solid — this allows hot air to escape and a cross-breeze to enter.

**Roof material**
White-painted or aluminized roofing reflects solar radiation. Dark metal roofing becomes extremely hot and radiates heat down onto the animals.

**Space per animal (minimum)**
- Dairy cow: 8–10 m²
- Sheep / goat: 1.5–2 m² (housing) + 2–3 m² (yard)
- Camel: 12–15 m²
- Laying hen: 0.25 m² (floor housing)

**Shade in the yard**
If animals spend time outdoors, provide shade with shade cloth or a simple roof structure. Trees are ideal but take years to grow.

**Water access**
In hot conditions, provide water in the shade. Hot water is rejected by animals — shade keeps it cooler.

## Signs of heat stress

- Heavy panting, open-mouth breathing
- Clustering together to shade each other (cattle)
- Reduced feed intake during hot hours
- Drop in milk production`,
  },
  {
    id: 12,
    category: "Best Practices",
    tag: "Management",
    icon: "🔬",
    title: "When to call a veterinarian: a practical guide for farmers",
    summary:
      "Knowing when to call a vet and when to manage a problem yourself can save both money and animal lives.",
    readTime: "4 min",
    content: `## The general rule

If you are unsure, call. Early veterinary intervention almost always costs less than treating an animal that has been sick for several days. The most expensive vet visit is the one you delayed.

## Call a veterinarian immediately for

- Any animal that cannot stand or has been down for more than 4 hours
- Difficult birth lasting more than 30 minutes of active straining without progress
- Suspected poisoning
- Sudden deaths — especially if more than one animal dies quickly
- Suspected notifiable diseases (FMD, Brucellosis, CBPP, PPR, Newcastle Disease)
- Prolapsed uterus (womb coming out after birth)
- Bloat that does not resolve within 30 minutes of walking the animal
- Any animal with a temperature above 41°C (105.8°F)
- Eye problems with significant swelling or discharge

## Monitor but can often manage yourself

- Mild diarrhea in adults (ensure hydration, monitor)
- Minor wounds not involving joints or the eye
- Mild lameness that improves within 48 hours
- Animals that are slightly off-feed with no other symptoms

## Before calling the vet — gather this information

1. Species, age, and sex of the affected animal(s)
2. How many animals are affected
3. When the problem started
4. Temperature (take it rectally)
5. Recent changes in feed, water, or environment
6. Vaccination and treatment history
7. What you have already given the animal

This information helps the vet advise you faster and more accurately.`,
  },
];

// ─── Category config ──────────────────────────────────────────────────────────

const CATEGORIES = [
  { label: "All", value: "All" },
  { label: "Disease Prevention", value: "Disease Prevention" },
  { label: "Nutrition", value: "Nutrition" },
  { label: "Animal Care", value: "Animal Care" },
  { label: "Best Practices", value: "Best Practices" },
];

const CATEGORY_COLORS: Record<string, string> = {
  "Disease Prevention": "bg-red-100 text-red-600",
  Nutrition: "bg-green-100 text-green-700",
  "Animal Care": "bg-blue-100 text-blue-700",
  "Best Practices": "bg-amber-100 text-amber-700",
};

// ─── Article modal ────────────────────────────────────────────────────────────

function ArticleModal({
  article,
  onClose,
}: {
  article: Article;
  onClose: () => void;
}) {
  // Render simple markdown-ish content
  const lines = article.content.split("\n");

  return (
    <div
      className="fixed inset-0 bg-black/40 z-50 flex items-start justify-center p-4 overflow-y-auto"
      onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-2xl mt-6 mb-10 overflow-hidden"
        onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="bg-mainColor p-5 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors">
            <X size={16} />
          </button>
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded-full mb-3 inline-block ${CATEGORY_COLORS[article.category]}`}>
            {article.category}
          </span>
          <div className="text-3xl mb-2">{article.icon}</div>
          <h2 className="text-white text-lg font-bold leading-snug pr-8">
            {article.title}
          </h2>
          <p className="text-white/70 text-xs mt-1">{article.readTime} read</p>
        </div>

        {/* Body */}
        <div className="p-6 text-sm text-gray-700 leading-relaxed space-y-3">
          {lines.map((line, i) => {
            if (line.startsWith("## ")) {
              return (
                <h3
                  key={i}
                  className="text-base font-bold text-gray-900 mt-5 mb-1">
                  {line.replace("## ", "")}
                </h3>
              );
            }
            if (line.startsWith("### ")) {
              return (
                <h4
                  key={i}
                  className="text-sm font-semibold text-gray-800 mt-4 mb-0.5">
                  {line.replace("### ", "")}
                </h4>
              );
            }
            if (line.startsWith("**") && line.endsWith("**")) {
              return (
                <p key={i} className="font-semibold text-gray-800">
                  {line.replace(/\*\*/g, "")}
                </p>
              );
            }
            if (line.startsWith("- ")) {
              return (
                <li key={i} className="ml-4 list-disc text-gray-600">
                  {line.replace(/\*\*/g, "").slice(2)}
                </li>
              );
            }
            if (line.startsWith("|")) {
              // crude table row
              const cells = line
                .split("|")
                .filter((c) => c.trim() !== "")
                .map((c) => c.trim());
              if (cells.every((c) => c === "---" || c === "")) return null;
              return (
                <div
                  key={i}
                  className="grid gap-2 py-1 border-b border-gray-100 text-xs"
                  style={{
                    gridTemplateColumns: `repeat(${cells.length}, minmax(0,1fr))`,
                  }}>
                  {cells.map((c, j) => (
                    <span
                      key={j}
                      className={j === 0 ? "font-medium" : "text-gray-500"}>
                      {c.replace(/\*\*/g, "")}
                    </span>
                  ))}
                </div>
              );
            }
            if (line.startsWith("---")) {
              return <hr key={i} className="border-gray-200 my-3" />;
            }
            if (line.trim() === "") return null;
            // Bold inline
            const parts = line.split(/\*\*(.*?)\*\*/g);
            return (
              <p key={i}>
                {parts.map((part, j) =>
                  j % 2 === 1 ? <strong key={j}>{part}</strong> : part,
                )}
              </p>
            );
          })}
        </div>

        <div className="px-6 pb-6">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl border border-gray-200 text-sm text-gray-500 hover:bg-gray-50 transition-colors">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

function Bibliotheque() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const filtered = ARTICLES.filter((a) => {
    const matchCategory =
      activeCategory === "All" || a.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchSearch =
      q === "" ||
      a.title.toLowerCase().includes(q) ||
      a.summary.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q);
    return matchCategory && matchSearch;
  });

  return (
    <>
      {/* Article Modal */}
      {selectedArticle && (
        <ArticleModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}

      <section className="bg-[#DBD7D2] min-h-screen pb-12">
        {/* ── Header ── */}
        <div className="bg-mainColor px-6 py-5">
          <div className="flex items-center gap-2 text-white/80 text-sm mb-1">
            <BookOpen size={16} />
            <span>Digital Library</span>
          </div>
          <h1 className="text-white text-2xl font-bold">
            Livestock Knowledge Base
          </h1>
          <p className="text-white/70 text-sm mt-1">
            Guides, disease prevention, nutrition, and best practices for
            Algerian farmers
          </p>
        </div>

        <div className="max-w-4xl mx-auto px-4 mt-6 flex flex-col gap-5">
          {/* ── Search ── */}
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm text-gray-800 shadow-sm focus:outline-none focus:border-mainColor"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* ── Category tabs ── */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-xl text-sm font-medium border transition-all ${
                  activeCategory === cat.value
                    ? "bg-mainColor text-white border-mainColor"
                    : "bg-white text-gray-600 border-gray-200 hover:border-mainColor"
                }`}>
                {cat.label}
              </button>
            ))}
          </div>

          {/* ── Results count ── */}
          <p className="text-xs text-gray-400">
            {filtered.length} article{filtered.length !== 1 ? "s" : ""}
            {activeCategory !== "All" ? ` in ${activeCategory}` : ""}
            {searchQuery ? ` matching "${searchQuery}"` : ""}
          </p>

          {/* ── Article grid ── */}
          {filtered.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200 py-14 text-center shadow-sm">
              <p className="text-2xl mb-2">📭</p>
              <p className="text-gray-500 text-sm">No articles found</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                }}
                className="mt-3 text-mainColor text-sm underline">
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filtered.map((article) => (
                <button
                  key={article.id}
                  onClick={() => setSelectedArticle(article)}
                  className="bg-white rounded-2xl border border-gray-200 shadow-sm text-left hover:border-mainColor hover:shadow-md transition-all overflow-hidden group">
                  {/* Card top strip */}
                  <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-b border-gray-100">
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${CATEGORY_COLORS[article.category]}`}>
                      {article.tag}
                    </span>
                    <span className="text-xs text-gray-400">
                      {article.readTime} read
                    </span>
                  </div>

                  {/* Card body */}
                  <div className="p-4">
                    <div className="text-2xl mb-2">{article.icon}</div>
                    <h3 className="text-sm font-semibold text-gray-900 leading-snug mb-1.5 group-hover:text-mainColor transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {article.summary}
                    </p>
                  </div>

                  <div className="px-4 pb-3 flex items-center gap-1 text-xs text-mainColor font-medium">
                    Read article <ChevronRight size={13} />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Bibliotheque;
