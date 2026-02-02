import FAQSection from "@/features/landing/components/FAQ";
import Text from "@/features/landing/components/Text";

const FullFAQSection = () => {
  return (
    <div className="h-fit">
      <Text
        delay={500}
        baseVelocity={-3}
        clasname="font-bold  text-h0  tracking-[-0.07em] leading-[90%]"
      >
        ЧАСТОЗАДАВАЕМЫЕ ВОПРОСЫ
      </Text>
      <Text
        delay={500}
        baseVelocity={3}
        clasname="font-bold text-h0 tracking-[-0.07em] leading-[90%]"
      >
        ОТВЕТЫ НА ВАШИ ВОПРОСЫ
      </Text>
      <div className={"px-[4vw]"}>
        <FAQSection></FAQSection>
      </div>
    </div>
  );
};

export default FullFAQSection;
