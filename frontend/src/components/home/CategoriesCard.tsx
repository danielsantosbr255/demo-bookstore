import React from "react";

type Props = {
  label: string;
  icon: React.ReactNode;
};

const CategoriesCard = ({ label, icon }: Props) => {
  return (
    <button className="border-rotating hover:scale-102 transition-transform cursor-pointer aspect-video w-50 pb-1 shadow-lg rounded-2xl">
      <div className="bg-white h-full w-full rounded-2xl flex flex-col items-center justify-center text-center text-lg text-primary">
        {icon}
        <p className="text-primary text-lg font-bold">{label}</p>
        <div className="w-1/2 h-1 bg-gradient-to-r from-primary via-accent to-secondary/50 rounded-2xl" />
      </div>
    </button>
  );
};

export default CategoriesCard;
