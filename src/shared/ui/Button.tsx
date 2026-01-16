import { cn } from "@/shared/lib/utils";

interface ButtonProps extends React.ComponentProps<"button"> {
  bgColor?: string;
  borderColor?: string;
  textColor?: string;
  onClick?: () => void;
  children: React.ReactNode;
}

export const Button = ({
  bgColor,
  borderColor,
  textColor,
  children,
  onClick,
  className,
  ...props
}: ButtonProps) => {
  return (
    <>
      <button
        style={{
          background: bgColor || "white",
          borderColor: borderColor || "black",
          color: textColor || "black",
        }}
        onClick={onClick}
        className={cn(
          "outline-0 w-fit h-fit rounded-3xl py-2 px-4 border " +
            "hover:cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out will-change-transform " +
            "disabled:cursor-not-allowed",
          className,
        )}
        {...props}
      >
        {children}
      </button>
    </>
  );
};
