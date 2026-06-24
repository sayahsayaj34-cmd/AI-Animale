import { Phone, MapPin, Stethoscope, ExternalLink } from "lucide-react";

export default function VeterinariansList() {
  const veterinarians = [
    {
      id: 1,
      name: "Dr. Ahmed Benali",
      city: "Bordj Bou Arreridj",
      phone: "+213 555 22 33 44",
      specialty: "Livestock Veterinarian",
      map: "https://maps.google.com/?q=Bordj+Bou+Arreridj",
    },
    {
      id: 2,
      name: "Dr. Mohamed Boussaad",
      city: "Sétif",
      phone: "+213 555 11 45 87",
      specialty: "Cattle Specialist",
      map: "https://maps.google.com/?q=Setif",
    },
    {
      id: 3,
      name: "Dr. Samira Khelifi",
      city: "Constantine",
      phone: "+213 555 65 77 12",
      specialty: "Sheep & Goat Health",
      map: "https://maps.google.com/?q=Constantine",
    },
    {
      id: 4,
      name: "Dr. Yacine Merabet",
      city: "Batna",
      phone: "+213 555 87 45 33",
      specialty: "Farm Animal Care",
      map: "https://maps.google.com/?q=Batna",
    },
    {
      id: 5,
      name: "Dr. Karim Bensaid",
      city: "M'Sila",
      phone: "+213 555 14 25 98",
      specialty: "Vaccination Programs",
      map: "https://maps.google.com/?q=Msila",
    },
    {
      id: 6,
      name: "Dr. Nabila Zerrouki",
      city: "Béjaïa",
      phone: "+213 555 32 18 76",
      specialty: "Veterinary Consultation",
      map: "https://maps.google.com/?q=Bejaia",
    },
    {
      id: 7,
      name: "Dr. Farid Ait Ali",
      city: "Tizi Ouzou",
      phone: "+213 555 77 88 22",
      specialty: "Animal Nutrition",
      map: "https://maps.google.com/?q=Tizi+Ouzou",
    },
    {
      id: 8,
      name: "Dr. Amel Bouchareb",
      city: "Alger",
      phone: "+213 555 56 43 90",
      specialty: "Livestock Monitoring",
      map: "https://maps.google.com/?q=Alger",
    },
    {
      id: 9,
      name: "Dr. Sofiane Rezig",
      city: "Djelfa",
      phone: "+213 555 29 66 41",
      specialty: "Large Animal Medicine",
      map: "https://maps.google.com/?q=Djelfa",
    },
    {
      id: 10,
      name: "Dr. Lina Hamdi",
      city: "Oran",
      phone: "+213 555 73 54 21",
      specialty: "Veterinary Surgery",
      map: "https://maps.google.com/?q=Oran",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-green-700">
        Veterinarians Directory
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {veterinarians.map((vet) => (
          <div
            key={vet.id}
            className="bg-white rounded-2xl border shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-500 p-5 flex justify-center">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                <Stethoscope size={30} className="text-green-600" />
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              <h2 className="font-bold text-lg text-gray-800 mb-1">
                {vet.name}
              </h2>

              <p className="text-green-600 text-sm font-medium mb-4">
                {vet.specialty}
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin size={16} className="text-green-600" />
                  <span className="text-sm">{vet.city}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <Phone size={16} className="text-green-600" />
                  <span className="text-sm">{vet.phone}</span>
                </div>
              </div>

              <div className="flex gap-2 mt-5">
                <a
                  href={`tel:${vet.phone}`}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm py-2 rounded-lg text-center font-medium">
                  Call
                </a>

                <a
                  href={vet.map}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center">
                  <ExternalLink size={18} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
