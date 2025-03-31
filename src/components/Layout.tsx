import { ReactNode } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="w-full bg-white">
      <Header />
      <main className="flex-grow max-w-7xl mx-auto pt-12 md:pt-4 lg:pt-4 pl-4 pr-4">{children}</main>
      <Footer />
    </div>
  );
};