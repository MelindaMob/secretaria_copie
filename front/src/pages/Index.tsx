import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import VideoSection from "@/components/VideoSection";
import Benefits from "@/components/Benefits";
import HowItWorks from "@/components/HowItWorks";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import PhoneDemo from "@/components/PhoneDemo";
import Pricing from "@/components/Pricing";
import RoiCalculator from "@/components/RoiCalculator";
import Testimonials from "@/components/Testimonials";
import WhyLoss from "@/components/WhyLoss";
import FAQ from "@/components/FAQ";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  return (
    <>
      <SEO
        title="Secretar.IA - Agent IA Téléphonique pour Restaurants"
        description="Ne ratez plus aucune réservation avec Secretar.IA. Notre agent IA répond aux appels, gère vos réservations 24h/24 et 7j/7 et améliore l'expérience client de votre restaurant."
        ogImage="https://secretar-ia.fr/og-image.png"
      />
      <main className="min-h-screen">
        <Navbar />
        <Hero />
        <WhyLoss />
        <PhoneDemo />
        <VideoSection />
        <RoiCalculator />
        <Pricing />
        <Testimonials />
        <Benefits />
        <HowItWorks />
        <CTA />
        <FAQ />
        <Footer />
      </main>
    </>
  );
};

export default Index;
