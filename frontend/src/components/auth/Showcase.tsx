import type { JSX } from "react";
import { CloudIcon, ExploreBookIcon, ExploreRegIcon, HistoryIcon, LogoIcon } from "../../libs/utils/icons";

type BlockProps = {
  title: string;
  className?: string;
  icon?: JSX.Element;
};

const Block = ({ title, className, icon }: BlockProps) => {
  return (
    <div
      className={`flex absolute motion-preset-pop text-gray-500 bg-white font-medium w-50 gap-2 items-center text-sm p-2 text-left rounded-2xl shadow ${className}`}
    >
      <span className="bg-primary/90 backdrop-blur-md text-white p-3 rounded-xl aspect-square">{icon}</span>
      <span className="w-8/12">{title}</span>
    </div>
  );
};

const Showcase = () => {
  return (
    <section className="bg-showcase-pattern motion-preset-slide-up-sm relative text-white hidden lg:flex p-2 w-full h-10/12 rounded-2xl shadow-lg bg-center bg-cover bg-no-repeat">
      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-black/10 rounded-2xl" />

      <div className="relative flex flex-col h-full border-2 border-dashed rounded-2xl w-full z-10 gap-10 text-2xl font-bold items-center justify-center text-center">
        <div className="flex flex-col gap-4 items-center justify-center p-5 border-3 aspect-square border-dashed rounded-2xl bg-white/10 backdrop-blur-md">
          <LogoIcon size={120} />
          <span className="text-2xl">
            Bem-vindo ao <br /> Bookstore
          </span>
        </div>

        <Block title="Seu Histórico de Leitura" className="top-1/3 left-5" icon={<HistoryIcon size={20} />} />
        <Block title="Acesse de onde quiser" className="top-1/5 right-10" icon={<CloudIcon size={20} />} />
        <Block title="Esplore novos títulos" className="bottom-10 left-20" icon={<ExploreBookIcon size={20} />} />
        <Block title="Busque por Autores" className="bottom-20 right-10" icon={<ExploreRegIcon size={20} />} />

        <blockquote className="italic text-white/80 text-sm border-l-4 border-secondary pl-3 shadow-xs p-2">
          “Um livro é um sonho que você segura nas mãos.” — Neil Gaiman
        </blockquote>

        <div className="bg-white p-3 rounded-xl backdrop-blur-md shadow-lg text-sm">
          <p className="text-gray-600 font-medium">
            Mais de <span className="text-secondary font-bold">3.000</span> títulos{" "}
            <span className="text-secondary font-bold">disponíveis</span> esperando por você!
          </p>
        </div>
      </div>
    </section>
  );
};

export default Showcase;
