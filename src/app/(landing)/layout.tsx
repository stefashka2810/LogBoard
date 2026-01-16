import Header from "@/features/landing/components/Header";
export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative h-screen bg-black">
      <div className="relative z-20 flex flex-col h-full">
        <div className="py-[1.5vw] px-[4vw] w-full">
          <Header></Header>
          <main className="flex-grow  w-full">{children}</main>
        </div>
      </div>
    </div>
  );
}
