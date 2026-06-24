import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { Search, ShoppingCart, MapPin } from "lucide-react";

type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  unit: string;
  category: string;
  location: string;
  stock: number;
  image_emoji: string;
  is_available: boolean;
};

const CATEGORIES = ["All", "Animals", "Feed", "Veterinary", "Equipment", "Products"];

const CATEGORY_ICONS: Record<string, string> = {
  All: "🏪", Animals: "🐄", Feed: "🌾", Veterinary: "💊",
  Equipment: "🔧", Products: "🥩",
};

const RISK_COLOR: Record<string, string> = {
  Animals: "bg-green-50 text-green-700",
  Feed: "bg-yellow-50 text-yellow-700",
  Veterinary: "bg-blue-50 text-blue-700",
  Equipment: "bg-purple-50 text-purple-700",
  Products: "bg-orange-50 text-orange-700",
};

function Marketplace() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    let result = products;
    if (activeCategory !== "All") {
      result = result.filter((p) => p.category === activeCategory);
    }
    if (search.trim()) {
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(search.toLowerCase()) ||
          p.description?.toLowerCase().includes(search.toLowerCase()) ||
          p.location?.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFiltered(result);
  }, [activeCategory, search, products]);

  async function fetchProducts() {
    setLoading(true);
    const { data, error } = await supabase
      .from("marketplace_products")
      .select("*")
      .eq("is_available", true)
      .order("created_at", { ascending: false });

    if (!error) {
      setProducts(data || []);
      setFiltered(data || []);
    }
    setLoading(false);
  }

  return (
    <section className="bg-[#DBD7D2] min-h-screen">
      <h1 className="bg-mainColor p-3 text-center font-bold text-xl text-white">
        🏪 Marketplace
      </h1>

      <div className="max-w-6xl mx-auto px-4 py-6">

        {/* Search */}
        <div className="relative mb-5">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search products, location..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 shadow-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                activeCategory === cat
                  ? "bg-mainColor text-white border-mainColor"
                  : "bg-white text-gray-600 border-gray-200 hover:border-mainColor"
              }`}
            >
              {CATEGORY_ICONS[cat]} {cat}
              {cat !== "All" && (
                <span className="ml-1 text-xs opacity-70">
                  ({products.filter((p) => p.category === cat).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Results count */}
        <div className="text-sm text-gray-400 mb-4">
          {filtered.length} product{filtered.length !== 1 ? "s" : ""} found
        </div>

        {/* Grid */}
        {loading ? (
          <p className="text-center text-gray-400 py-20">Loading marketplace...</p>
        ) : filtered.length === 0 ? (
          <p className="text-center text-gray-400 py-20">No products found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col"
              >
                {/* Image area */}
                <div className="h-28 bg-gray-50 flex items-center justify-center text-5xl">
                  {product.image_emoji}
                </div>

                <div className="p-3 flex flex-col gap-2 flex-1">
                  {/* Category badge */}
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium w-fit ${RISK_COLOR[product.category] ?? "bg-gray-100 text-gray-600"}`}>
                    {product.category}
                  </span>

                  {/* Title */}
                  <div className="text-sm font-semibold text-gray-800 leading-tight">
                    {product.title}
                  </div>

                  {/* Description */}
                  {product.description && (
                    <div className="text-xs text-gray-400 leading-relaxed line-clamp-2">
                      {product.description}
                    </div>
                  )}

                  {/* Location */}
                  {product.location && (
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <MapPin size={11} />
                      {product.location}
                    </div>
                  )}

                  <div className="mt-auto pt-2 flex items-center justify-between border-t border-gray-100">
                    <div>
                      <span className="text-base font-bold text-mainColor">
                        {product.price.toLocaleString()}
                      </span>
                      <span className="text-xs text-gray-400 ml-1">
                        DZD / {product.unit}
                      </span>
                    </div>
                    <button className="flex items-center gap-1 bg-mainColor text-white text-xs px-3 py-1.5 rounded-xl font-medium hover:opacity-90 transition-opacity">
                      <ShoppingCart size={12} />
                      Contact
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Marketplace;