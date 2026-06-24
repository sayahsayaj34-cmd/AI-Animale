import AppRoutes from "./routes/AppRoutes";
import NavBar from "./Components/NavBare";
import SidBar from "./Components/SidBar";
function App() {
  return (
    <main className="grid h-screen grid-cols-[15%_1fr] grid-rows-[auto_1fr]">
      {/* Sidebar */}
   
        <SidBar />


      {/* Navbar */}
      <header className="border-b bg-secend">
        <NavBar />
      </header>

      {/* Page Content */}
      <section className="overflow-auto">
        <AppRoutes />
      </section>
    </main>
  );
}

export default App;
