import { twMerge } from "tailwind-merge";

const variants = {
  primary: `
    relative px-6 py-3 text-white border-highlight font-semibold rounded-xl
    bg-gradient-to-r from-primary via-secondary/90 to-secondary
    bg-[length:200%_200%] transition-all duration-500
    hover:bg-[position:100%_0%]
    backdrop-blur-sm
  `,
  secondary: "bg-secondary text-white",
  outline: "text-primary text-shadow-2xs text-shadow-black/50",
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  align?: "left" | "center" | "right" | "between";
};

const Button = ({ children, className, variant = "primary", align = "between", ...props }: ButtonProps) => {
  return (
    <button
      className={twMerge("active:scale-98 hover:scale-102 ease-in hover:motion-rotate-out-1 transition-transform", className)}
      {...props}
    >
      <span
        className={twMerge(
          `flex flex-1 items-center justify-${align} py-3 px-4 gap-2 rounded-xl 
          font-medium cursor-pointer border border-b-4          
          `,
          variants[variant]
        )}
      >
        {children}
      </span>
    </button>
  );
};

export default Button;
