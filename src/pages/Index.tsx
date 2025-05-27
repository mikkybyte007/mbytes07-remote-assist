
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CompanyPresentation from "@/components/CompanyPresentation";
import Services from "@/components/Services";
import Process from "@/components/Process";
import { Scheduling } from "@/components/Scheduling";
import CalendlyScheduling from "@/components/CalendlyScheduling";
import ContactForm from "@/components/ContactForm";
import { SecurePayment } from "@/components/SecurePayment";
import Security from "@/components/Security";
import ProtectedAdminPanel from "@/components/ProtectedAdminPanel";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <CompanyPresentation />
      <Services />
      <Process />
      <CalendlyScheduling />
      <Scheduling />
      <ContactForm />
      <SecurePayment />
      <Security />
      <ProtectedAdminPanel />
      <Footer />
    </div>
  );
};

export default Index;
