import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { PlanProvider } from "@/context/PlanContext";
import "./globals.css";

export const metadata = {
  title: "FitLog",
  description: "Track your workouts and build your plan.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <PlanProvider>
          <Navbar />
          {children}
          <Footer />
        </PlanProvider>
      </body>
    </html>
  );
}
