import Header from "@/features/landing/components/Header";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative h-screen">
      <div
        className="absolute top-0 left-0 min-w-screen h-full z-0 pointer-events-none"
        style={{
          backgroundImage: "url('/images/BG.png')",
          backgroundSize: "120% auto",
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div
        className="absolute top-0 left-0 w-full h-full overflow-hidden  z-10 pointer-events-none mix-blend-soft-light"
        style={{
          backgroundImage: "url('/images/bg2.png')",
          backgroundSize: "100% auto",
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
          opacity: 1,
        }}
      />

      <div className="relative z-20 flex flex-col h-full">
        <div className="py-[1.5vw] px-[4vw] w-full">
          <Header></Header>
          <main className="flex-grow  w-full">{children}</main>
        </div>
      </div>
    </div>
  );
}
