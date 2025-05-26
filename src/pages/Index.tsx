
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Process from "@/components/Process";
import { Scheduling } from "@/components/Scheduling";
import { SecurePayment } from "@/components/SecurePayment";
import Security from "@/components/Security";
import ProtectedAdminPanel from "@/components/ProtectedAdminPanel";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <Process />
      <Scheduling />
      <SecurePayment />
      <Security />
      <ProtectedAdminPanel />
      <Footer />
    </div>
  );
};

export default Index;
