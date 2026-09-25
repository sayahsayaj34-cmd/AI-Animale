import { Route, Routes } from "react-router-dom";
import Layout from "../Layout";
import Home from "../Components/Home";
import About from "../Components/About";
import Projects from "../Components/Projects";
import Contacts from "../Components/About";
import Register from "../Components/Register";
import Login from "../Components/Login";
import Dashboard from "../Components/Dashboard";
import Animales from "../Components/Animales";
import AnimalDetail from "../Components/AnimalDetail";
import Marketplace from "../Components/Marketplace";
import Bibliotheque from "../Components/Bibliothèque";
import Veterinarians from "../Components/Veterinarians";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* public pages — all have NavBar */}
        <Route path="/" element={<Home />} />

        <Route path="/projects" element={<Projects />} />
        <Route path="/contacts" element={<Contacts />} />

        {/* app pages — also have NavBar */}
        <Route path="/TableauBord" element={<Dashboard />} />
        <Route path="/Animales" element={<Animales />} />
        <Route path="/animals/:id" element={<AnimalDetail />} />
        <Route path="/Marketplace" element={<Marketplace />} />
        <Route path="/Bibliotheque" element={<Bibliotheque />} />
        <Route path="/About" element={<About />} />
      </Route>

      {/* auth pages — no NavBar */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Veterinarians" element={<Veterinarians />} />

      <Route path="*" element={<>Page not found</>} />
    </Routes>
  );
}

export default AppRoutes;
