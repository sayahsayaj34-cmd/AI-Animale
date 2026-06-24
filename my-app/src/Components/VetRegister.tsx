
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

function VetRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    clinic_name: "",
    specialization: "",
    city: "",
    address: "",
    years_experience: "",
    bio: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>,
  ) {
    e.preventDefault();

    setError("");

    if (
      !formData.full_name ||
      !formData.email ||
      !formData.password
    ) {
      setError("Please fill all required fields");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const { data, error: authError } =
        await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              role: "veterinarian",
              full_name: formData.full_name,
            },
          },
        });

      if (authError) {
        throw authError;
      }

      if (!data.user) {
        throw new Error("Failed to create user");
      }

      const { error: vetError } = await supabase
        .from("veterinarians")
        .insert({
          user_id: data.user.id,
          full_name: formData.full_name,
          email: formData.email,
          phone: formData.phone,
          clinic_name: formData.clinic_name,
          specialization: formData.specialization,
          city: formData.city,
          address: formData.address,
          years_experience:
            Number(formData.years_experience) || 0,
          bio: formData.bio,
        });

      if (vetError) {
        throw vetError;
      }

      navigate("/vet-login");
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >,
  ) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <section className="min-h-screen bg-gray-50 flex justify-center items-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-3xl flex flex-col gap-4"
      >
        <h1 className="text-3xl font-bold text-center text-mainColor">
          Veterinarian Registration
        </h1>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl">
            {error}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-4">
          <input
            name="full_name"
            placeholder="Full Name"
            value={formData.full_name}
            onChange={handleChange}
            className="border rounded-xl p-3"
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border rounded-xl p-3"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="border rounded-xl p-3"
          />

          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="border rounded-xl p-3"
          />

          <input
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="border rounded-xl p-3"
          />

          <input
            name="clinic_name"
            placeholder="Clinic Name"
            value={formData.clinic_name}
            onChange={handleChange}
            className="border rounded-xl p-3"
          />

          <input
            name="specialization"
            placeholder="Specialization"
            value={formData.specialization}
            onChange={handleChange}
            className="border rounded-xl p-3"
          />

          <input
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="border rounded-xl p-3"
          />

          <input
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="border rounded-xl p-3 md:col-span-2"
          />

          <input
            name="years_experience"
            placeholder="Years of Experience"
            value={formData.years_experience}
            onChange={handleChange}
            className="border rounded-xl p-3"
          />
        </div>

        <textarea
          name="bio"
          placeholder="Professional Biography"
          rows={4}
          value={formData.bio}
          onChange={handleChange}
          className="border rounded-xl p-3 resize-none"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-mainColor text-white py-3 rounded-xl font-semibold"
        >
          {loading
            ? "Creating account..."
            : "Register as Veterinarian"}
        </button>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <NavLink
            to="/vet-login"
            className="text-mainColor font-semibold"
          >
            Login
          </NavLink>
        </p>
      </form>
    </section>
  );
}

export default VetRegister;

