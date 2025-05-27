
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CompanyPresentation from "@/components/CompanyPresentation";
import Services from "@/components/Services";
import Process from "@/components/Process";
import { Scheduling } from "@/components/Scheduling";
import CalendlyScheduling from "@/components/CalendlyScheduling";
import { ShippingInfo } from "@/components/ShippingInfo";
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
      <section id="informacoes-envio" className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <ShippingInfo />
          </div>
        </div>
      </section>
      <ContactForm />
      <SecurePayment />
      <Security />
      <ProtectedAdminPanel />
      <Footer />
    </div>
  );
};

export default Index;
