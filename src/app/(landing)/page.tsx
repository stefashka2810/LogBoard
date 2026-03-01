import Greeting from "@/widgets/landing/ui/Greeting";
import Header from "@/widgets/landing/ui/Header";
import { WebGLShader } from "@/widgets/landing/ui/Background";
import Features from "@/widgets/landing/ui/Features";
import AboutUsSection from "@/widgets/landing/ui/AboutUsSection";
import FullFAQSection from "@/widgets/landing/ui/FullFAQSection";

export default function LandingPage() {
  return (
    <>
      <section className="relative w-screen bg-black overflow-hidden min-h-screen min-h-[100svh]">
        <WebGLShader />
        <div className="relative z-20 flex min-h-screen flex-col">
          <div className="py-[1.5vw] px-[4vw]">
            <Header />
          </div>
          <div className="flex-1 flex items-center px-[4vw] pb-[10vw]">
            <Greeting />
          </div>
        </div>
      </section>

      <section
        id={"features"}
        className="min-h-screen pr-[4vw] bg-white text-black flex items-center"
      >
        <div className="w-full">
          <Features />
        </div>
      </section>

      <section id={"about"} className="min-h-screen px-[4vw] flex items-center">
        <div className={"w-full"}>
          <AboutUsSection />
        </div>
      </section>

      <section id="faq" className="min-h-screen  flex items-center">
        <div className={"w-full"}>
          <FullFAQSection></FullFAQSection>
        </div>
      </section>
    </>
  );
}
