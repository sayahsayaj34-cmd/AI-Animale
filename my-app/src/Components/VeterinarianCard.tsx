import {
  Phone,
  MapPin,
  Stethoscope,
  UserRound,
  ExternalLink,
} from "lucide-react";

type Props = {
  name: string;
  specialization: string;
  city: string;
  address: string;
  phone: string;
  experience: number;
  availability: string;
  latitude?: number;
  longitude?: number;
};

function VeterinarianCard({
  name,
  specialization,
  city,
  address,
  phone,
  experience,
  availability,
  latitude,
  longitude,
}: Props) {
  const hasCoordinates =
    latitude !== undefined &&
    longitude !== undefined &&
    latitude !== null &&
    longitude !== null;

  const mapLink = hasCoordinates
    ? `https://www.google.com/maps?q=${latitude},${longitude}`
    : `https://www.google.com/maps/search/${encodeURIComponent(city)}`;

  const availabilityClass =
    availability === "Available Today"
      ? "bg-green-100 text-green-700"
      : availability === "Busy"
        ? "bg-red-100 text-red-700"
        : "bg-blue-100 text-blue-700";

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-mainColor/10 flex items-center justify-center">
          <UserRound size={24} className="text-mainColor" />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-800 leading-tight truncate">
            {name}
          </h3>
          <div className="flex items-center gap-1 text-xs text-mainColor mt-1">
            <Stethoscope size={12} />
            <span className="truncate">{specialization}</span>
          </div>
        </div>

        <span
          className={`text-[10px] px-2 py-1 rounded-full font-medium ${availabilityClass}`}>
          {availability}
        </span>
      </div>

      <div className="space-y-3 text-sm text-gray-600">
        <div className="flex items-start gap-2">
          <MapPin size={14} className="mt-0.5 flex-shrink-0" />
          <div>
            <div className="font-medium text-gray-700">{city}</div>
            <div className="text-xs text-gray-500">{address}</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Phone size={14} className="flex-shrink-0" />
          <a href={`tel:${phone}`} className="hover:underline">
            {phone}
          </a>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
        <div className="text-xs text-gray-500">
          {experience} years experience
        </div>

        <a
          href={mapLink}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1 text-mainColor text-sm font-medium hover:underline">
          Map <ExternalLink size={13} />
        </a>
      </div>
    </div>
  );
}

export default VeterinarianCard;
