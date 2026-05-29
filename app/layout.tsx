import "./globals.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import PageLoader from "./components/ui/PageLoader";
import CustomCursor from "./components/ui/CustomCursor";

export const metadata = {
  title: 'RazorFrame Studios | Digital Content Agency',
  description: 'High-quality digital content creators for brands that stand out.',
  metadataBase: new URL('https://razorframestudios.in'),
  openGraph: {
    title: 'RazorFrame Studios',
    description: 'High-quality digital content creators for brands that stand out.',
    url: 'https://razorframestudios.in',
    siteName: 'RazorFrame Studios',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ background: "#000000", color: "white", overflowX: "hidden" }}>
        {/* Custom cursor */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "RazorFrame Studios",
            "url": "https://razorframestudios.in",
            "logo": "https://razorframestudios.in/logo.png",
            "sameAs": [
              "https://www.instagram.com/razorframestudios",
              "https://www.linkedin.com/in/razorframestudios-9960b8402",
              "https://www.youtube.com/@RazorFrameStudios",
              "https://x.com/RazorFrameHQ"
            ]
          })}}
        />
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
