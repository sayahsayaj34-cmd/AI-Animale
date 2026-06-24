import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate, NavLink } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!userInfo.email || !userInfo.password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);

    // ✅ Supabase login
    const { error } = await supabase.auth.signInWithPassword({
      email: userInfo.email,
      password: userInfo.password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      navigate("/"); // ✅ redirect after success
    }
  }

  return (
    <section className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="border-2 p-6 rounded-2xl border-mainColor grid grid-cols-1 gap-4  bg-mainColor">
        <h1 className="text-center text-2xl! font-bold text-mainColor">Login</h1>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <div className="grid grid-cols-2 items-center">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className="border-2 border-mainColor rounded-2xl px-2 py-1 text-mainColor"
            value={userInfo.email}
            onChange={(e) =>
              setUserInfo({ ...userInfo, email: e.target.value })
            }
          />
        </div>

        <div className="grid grid-cols-2 items-center">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className="border-2 border-mainColor rounded-2xl px-2 py-1 text-mainColor"
            value={userInfo.password}
            onChange={(e) =>
              setUserInfo({ ...userInfo, password: e.target.value })
            }
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-mainColor text-white rounded-2xl py-2 mt-2">
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-sm">
          No account yet?{" "}
          <NavLink to="/register" className="text-mainColor underline">
            Register
          </NavLink>
        </p>
      </form>
    </section>
  );
}

export default Login;
