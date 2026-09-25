import { LayoutDashboard, Rabbit, PawPrint, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
function SidBar() {
  return (
    <section className="flex flex-col justify-between items-start row-span-2   !w- bg-[#F5F5F5] border-r-2 border-mainColor">
      <ul className="option w-full text-center">
        <Link to="TableauBord">
          <li>
            <LayoutDashboard />
            Tableau de bord
          </li>
        </Link>
        <Link to="Animales">
          <li>
            <Rabbit /> Mes Animaux
          </li>
        </Link>

        <Link to="/Veterinarians">
          <li>
            <PawPrint />
            Veterinaires
          </li>
        </Link>

        <Link to="Marketplace">
          <li>
            <ShoppingBag />
            Marketplace
          </li>
        </Link>
      </ul>
      {/*    <ul className="userOption w-full">
        <li>
          <UserRoundCog /> Parametres
        </li>
        <li className="logOUT">
          <LogOut />
          Déconnexion
        </li>
      </ul> */}
    </section>
  );
}
export default SidBar;
