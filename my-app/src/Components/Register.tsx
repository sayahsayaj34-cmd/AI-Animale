import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate, NavLink } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (
      !userInfo.username ||
      !userInfo.email ||
      !userInfo.password ||
      !confirmPassword
    ) {
      setError("Please fill in all fields");
      return;
    }
    if (!isNaN(Number(userInfo.username[0]))) {
      setError("Username cannot start with a number");
      return;
    }
    if (userInfo.password.length <= 8) {
      setError("Password must be more than 8 characters");
      return;
    }
    if (userInfo.password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email: userInfo.email,
      password: userInfo.password,
      options: {
        data: { username: userInfo.username },
      },
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    if (data.session) {
      navigate("/");
    } else {
      setError("Please check your email to confirm your account.");
    }
  }

  return (
    <section className="flex justify-center items-center h-screen bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="p-8 rounded-[32px] flex flex-col gap-5 w-full max-w-[440px] bg-mainColor shadow-lg">
        <h1 className="text-center text-3xl font-bold text-white mb-2">
          Register
        </h1>

        {error && <p className="text-red-300 text-sm text-center">{error}</p>}

        {/* Username Field */}
        <div className="grid grid-cols-[90px_1fr] items-center gap-4">
          <label htmlFor="username" className="text-white font-medium">
            Username
          </label>
          <input
            id="username"
            type="text"
            className="w-full bg-[#f0f4f8] rounded-full px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/50"
            value={userInfo.username}
            onChange={(e) =>
              setUserInfo({ ...userInfo, username: e.target.value })
            }
          />
        </div>

        {/* Email Field */}
        <div className="grid grid-cols-[90px_1fr] items-center gap-4">
          <label htmlFor="email" className="text-white font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full bg-[#f0f4f8] rounded-full px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/50"
            value={userInfo.email}
            onChange={(e) =>
              setUserInfo({ ...userInfo, email: e.target.value })
            }
          />
        </div>

        {/* Password Field */}
        <div className="grid grid-cols-[90px_1fr] items-center gap-4">
          <label htmlFor="password" className="text-white font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full bg-[#f0f4f8] rounded-full px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/50"
            value={userInfo.password}
            onChange={(e) =>
              setUserInfo({ ...userInfo, password: e.target.value })
            }
          />
        </div>

        {/* Confirm Password Field */}
        <div className="grid grid-cols-[90px_1fr] items-center gap-4">
          <label htmlFor="confirmPassword" className="text-white font-medium">
            Confirm
          </label>
          <input
            id="confirmPassword"
            type="password"
            className="w-full bg-[#f0f4f8] rounded-full px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/50"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="border-2 border-white hover:bg-white/10 transition-colors text-white font-semibold rounded-2xl py-2.5 mt-4">
          {loading ? "Creating account..." : "Create account"}
        </button>

        <p className="text-center text-sm text-white mt-2">
          Already have an account?{" "}
          <NavLink
            to="/login"
            className="text-white underline font-medium hover:text-gray-200">
            Login
          </NavLink>
        </p>
      </form>
    </section>
  );
}

export default Register;
