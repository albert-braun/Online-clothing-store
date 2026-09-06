import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Newsletter } from "./Marketing";

export function Layout({ bare }: { bare?: boolean }) {
  return (
    <div className="min-h-screen">
      {!bare && <Header />}
      <Outlet />
      {!bare && (
        <>
          <Newsletter />
          <Footer />
        </>
      )}
    </div>
  );
}
