import React from "react";
import { twMerge } from "tailwind-merge";

type Props = React.HTMLAttributes<HTMLButtonElement> & {
  label: string;
  icon: React.ReactNode;
};

const CategoriesCard = ({ label, icon, className, ...props }: Props) => {
  return (
    <button
      {...props}
      className={twMerge(
        "border-spin hover:scale-102 transition-transform cursor-pointer aspect-[5/4] lg:aspect-video w-50 shadow-lg",
        className
      )}
    >
      <div className="bg-white h-full w-full p-2 rounded-2xl flex flex-col items-center justify-center text-center text-sm lg:text-lg">
        {icon}
        <p className="font-bold">{label}</p>
        <div className="w-1/2 h-1 bg-gradient-to-r from-primary via-accent to-secondary/50 rounded-2xl" />
      </div>
    </button>
  );
};

export default CategoriesCard;
