import { Outlet } from "react-router-dom";
function Layout() {
  return (
    <section className="w-full h-auto">
      <Outlet />
    </section>
  );
}
export default Layout;
