import Greeting from "@/features/landing/components/Greeting";
import Header from "@/features/landing/components/Header";
import { WebGLShader } from "@/features/landing/components/Background";
import Features from "@/features/landing/components/Features";
import AboutUsSection from "@/features/landing/components/AboutUsSection";
import FullFAQSection from "@/features/landing/components/FullFAQSection";

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
