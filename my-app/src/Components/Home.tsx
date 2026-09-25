import {
  Brain,
  Stethoscope,
  ShoppingBag,
  ArrowRight,
  Info,
} from "lucide-react";

function Home() {
  return (
    <section className="w-full p-6 lg:p-10 flex flex-col gap-12 bg-white h-full overflow-y-auto">
      {/* Top Section: Text & Image */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Left Side Content */}
        <div className="flex flex-col gap-5 w-full lg:w-1/2 z-10">
          <span className="text-mainColor font-bold tracking-wider uppercase text-xs">
            Smart Platform for Livestock Management
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-gray-900">
            Take care of your animals with <br className="hidden sm:block" />
            <span className="text-mainColor">Artificial Intelligence</span>
          </h1>

          <p className="text-gray-500 text-base leading-relaxed max-w-xl">
            My Animal AI helps you track livestock health, run AI-powered
            symptom diagnostics, consult with veterinarians, and manage your
            farm through a complete digital ecosystem.
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-wrap gap-4 mt-4">
            <a
              href="/register"
              className="flex items-center gap-2 bg-mainColor text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition-opacity shadow-sm">
              Get Started
              <ArrowRight size={18} />
            </a>

            <a
              href="/about"
              className="flex items-center gap-2 bg-white text-gray-700 border border-gray-200 px-6 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors shadow-sm">
              <Info size={18} />
              Learn More
            </a>
          </div>
        </div>

        {/* Right Side Image */}
        <div className="w-full lg:w-1/2 flex justify-center items-center">
          <div className="relative w-full max-w-[450px] aspect-video lg:aspect-square flex justify-center items-center bg-gray-50 border border-gray-100 rounded-3xl overflow-hidden shadow-inner">
            <img
              src="https://images.unsplash.com/photo-1596733430284-f7437764b1a9?q=80&w=800&auto=format&fit=crop"
              alt="Farmer using My Animal AI"
              className="w-full h-full object-cover"
              onError={(e) => {
                const image = e.currentTarget;
                const fallback = image.nextElementSibling as HTMLElement | null;

                image.style.display = "none";

                if (fallback) {
                  fallback.style.display = "flex";
                }
              }}
            />

            {/* Fallback state if image fails to load */}
            <div className="hidden absolute inset-0 flex-col items-center justify-center text-gray-400 p-6 text-center">
              <Info className="mb-2 opacity-30" size={40} />

              <p className="text-sm font-medium">Image not found</p>

              <p className="text-xs mt-1 opacity-70">
                Check your internet connection
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-gray-100 w-full">
        {/* Feature 1 */}
        <div className="flex flex-col gap-3 p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center mb-2">
            <Brain className="text-purple-600" size={24} />
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 text-lg mb-1">
              AI Diagnosis
            </h3>

            <p className="text-sm text-gray-500 leading-relaxed">
              Instantly analyze symptoms and get disease predictions with AI
              confidence scoring.
            </p>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="flex flex-col gap-3 p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center mb-2">
            <Stethoscope className="text-amber-600" size={24} />
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 text-lg mb-1">
              Health Records
            </h3>

            <p className="text-sm text-gray-500 leading-relaxed">
              Track vaccinations, treatments, and veterinary visits securely in
              one organized place.
            </p>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="flex flex-col gap-3 p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center mb-2">
            <ShoppingBag className="text-teal-600" size={24} />
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 text-lg mb-1">
              Marketplace
            </h3>

            <p className="text-sm text-gray-500 leading-relaxed">
              Buy and sell animals, feed, veterinary supplies, and agricultural
              services easily.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
