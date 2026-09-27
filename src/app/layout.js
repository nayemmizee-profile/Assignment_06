import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { PlanContext } from "@/context/context";
import { ToastContainer } from "react-toastify";
import "./globals.css";

export const metadata = {
  title: "FitLog",
  description: "Track your workouts and build your plan.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <PlanContext>
          <Navbar />
          {children}
          <Footer />
          <ToastContainer />
        </PlanContext>
      </body>
    </html>
  );
}
