import "./globals.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import PageLoader from "./components/ui/PageLoader";
import CustomCursor from "./components/ui/CustomCursor";

export const metadata = {
  title: "RazorFrame Studios — Digital Content Agency",
  description: "High-quality digital content creators for brands that stand out.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ background: "#000000", color: "white", overflowX: "hidden" }}>
        {/* Custom cursor */}
        <CustomCursor />

        {/* Loading animation */}
        <PageLoader />

        {/* Site content */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
