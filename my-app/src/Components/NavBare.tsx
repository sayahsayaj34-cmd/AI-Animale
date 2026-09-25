import { NavLink, useNavigate } from "react-router-dom";
import { UserLock, UserPlus, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabaseClient";

function NavBar() {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      },
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/");
  }

  return (
    <>
      <div className="nav bg-secendColor! flex w-full! items-center justify-between px-[2%]">
        <ul>
          <li>
            <img src="/Logo.png" alt="" className="w-[clamp(50px,7vw,85px)]" />
          </li>
        </ul>

        <ul className="nav flex w-[50%] justify-between text-[#010b13]!">
          <NavLink to="/">
            <li>Home</li>
          </NavLink>

          <NavLink to="/Bibliotheque">
            <li>Bibliothèque</li>
          </NavLink>

          <NavLink to="/projects">
            <li></li>
          </NavLink>

          <NavLink to="/About">
            <li>About</li>
          </NavLink>
        </ul>

        <ul className="flex gap-2 items-center">
          {user ? (
            <>
              <li>
                <span className="text-mainColor font-semibold"></span>
              </li>

              <li>
                <button
                  onClick={handleLogout}
                  className="logOut flex items-center gap-2 px-4 py-2 !bg-[#FF0800] text-white rounded-xl">
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <button>
                  <NavLink
                    to="/register"
                    className="flex items-center gap-2 px-4 py-2">
                    <UserPlus />
                    <span>S'inscrire</span>
                  </NavLink>
                </button>
              </li>

              <li>
                <button>
                  <NavLink
                    to="/login"
                    className="flex items-center gap-2 px-4 py-2">
                    <UserLock />
                    <span>Se connecter</span>
                  </NavLink>
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  );
}

export default NavBar;
