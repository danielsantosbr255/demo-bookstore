import { motion, type HTMLMotionProps } from "motion/react";
import { twMerge } from "tailwind-merge";

const variants = {
  primary: `
    relative px-6 py-3 text-white font-semibold rounded-xl
    bg-gradient-to-r from-primary via-secondary/90 to-secondary
    bg-[length:200%_200%] transition-all duration-500
    hover:bg-[position:100%_0%]
  `,
  secondary: "bg-secondary text-white",
  outline: "text-primary",
};

type ButtonProps = React.ComponentProps<"button"> &
  HTMLMotionProps<"button"> & {
    variant?: keyof typeof variants;
  };

const Button = ({ children, className, variant = "primary", ...props }: ButtonProps) => {
  return (
    <motion.button
      className={twMerge(
        "flex items-center justify-between py-3 px-4 rounded-xl hover:scale-101 font-medium cursor-pointer border border-b-3 border-highlight transition-all duration-300",
        variants[variant],
        className
      )}
      {...props}
    >
      <span className="relative flex w-full justify-between">{children}</span>
    </motion.button>
  );
};

export default Button;
