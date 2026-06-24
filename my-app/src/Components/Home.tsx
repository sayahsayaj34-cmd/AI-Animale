import {
  Brain,
  Stethoscope,
  ShoppingBag,
  ArrowRight,
  Info,
} from "lucide-react";

function Home() {
  return (
    <section className="relative w-full h-full overflow-y-auto bg-gray-50 p-6 lg:p-10">
      <div className="max-w-7xl mx-auto flex flex-col gap-12 lg:gap-16">
        {/* TOP ROW: Text and Image */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Side Content */}
          <div className="flex flex-col gap-6 w-full lg:w-1/2 z-10">
            <span className="text-mainColor font-semibold tracking-wide uppercase text-sm">
              Smart Platform for Livestock Management
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
              Take care of your animals with <br className="hidden sm:block" />
              <span className="text-mainColor">Artificial Intelligence</span>
            </h1>

            <p className="text-gray-600 text-lg leading-relaxed max-w-xl">
              My Animal AI helps you track livestock health, run AI-powered
              symptom diagnostics, consult with veterinarians, and manage your
              farm through a complete digital ecosystem.
            </p>

            {/* Call to Action Buttons */}
            <div className="flex flex-wrap gap-4 mt-2">
              <a
                href="/register"
                className="flex items-center gap-2 bg-mainColor text-white px-6 py-3.5 rounded-xl font-medium hover:opacity-90 transition-opacity shadow-md">
                Get Started
                <ArrowRight size={18} />
              </a>

              <a
                href="/about"
                className="flex items-center gap-2 bg-white text-gray-700 border border-gray-200 px-6 py-3.5 rounded-xl font-medium hover:bg-gray-50 transition-colors shadow-sm">
                <Info size={18} />
                Learn More
              </a>
            </div>
          </div>

          {/* Right Side Image */}
          <div className="w-full lg:w-1/2 flex justify-center items-center">
            <div className="relative w-full max-w-[500px] aspect-video lg:aspect-square bg-gray-200 rounded-3xl overflow-hidden shadow-xl border border-gray-200">
              {/* Optional decorative background blob behind the image */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-mainColor/10 rounded-full blur-3xl -z-10"></div>

              <img
                src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?q=80&w=800&auto=format&fit=crop"
                alt="Livestock farming"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />

              {/* Fallback state if internet image fails to load */}
              <div className="hidden absolute inset-0 flex-col items-center justify-center text-gray-500 bg-gray-100 p-6 text-center">
                <Info className="mb-2 opacity-30" size={40} />
                <p className="text-sm font-medium">Image not found</p>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM ROW: Key Features Grid (Full Width) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-gray-200">
          <div className="flex flex-col gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 rounded-xl bg-purple-50 flex items-center justify-center">
              <Brain className="text-purple-600" size={28} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg mb-2">
                AI Diagnosis
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Instantly analyze symptoms and get disease predictions with AI
                confidence scoring.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 rounded-xl bg-amber-50 flex items-center justify-center">
              <Stethoscope className="text-amber-600" size={28} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg mb-2">
                Health Records
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Track vaccinations, treatments, and veterinary visits securely
                in one organized place.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 rounded-xl bg-teal-50 flex items-center justify-center">
              <ShoppingBag className="text-teal-600" size={28} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg mb-2">
                Marketplace
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Buy and sell animals, feed, veterinary supplies, and
                agricultural services easily.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
