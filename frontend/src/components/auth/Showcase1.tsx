import type { FC } from "react";
import { LuBookOpen, LuUsers, LuStar } from "react-icons/lu";
import Button from "../ui/Button";

export const BookstoreShowcase: FC = () => {
  return (
    <aside className="flex flex-col border-b-3 border-primary/50 justify-between bg-gradient-to-b from-white via-sky-100 to-white p-8 w-full h-full rounded-2xl">
      <div className="space-y-6">
        <h2 className="text-lg text-center font-serif font-semibold text-primary">Descubra novos mundos em cada página</h2>
      </div>

      <div className="flex flex-col items-center text-center mt-10">
        <img src="/images/showcase13.png" alt="Livro em destaque" className="w-40 h-56 object-cover shadow-md rounded-lg mb-4" />
        <h3 className="text-lg font-semibold text-primary">A Livraria dos Sonhos</h3>
        <p className="text-sm text-stone-600">por Daniel Santos</p>

        <Button variant="outline" className="mt-4">
          Ver mais
        </Button>
      </div>

      {/* Bottom section — stats */}
      <div className="flex justify-around items-center text-stone-700 mt-10 pt-6 border-t border-stone-300">
        <div className="flex flex-col items-center">
          <LuBookOpen className="w-6 h-6 mb-1" />
          <span className="font-semibold text-primary">3.200+</span>
          <span className="text-xs text-stone-600">Livros</span>
        </div>
        <div className="flex flex-col items-center">
          <LuUsers className="w-6 h-6 mb-1" />
          <span className="font-semibold text-primary">1.000+</span>
          <span className="text-xs text-stone-600">Autores</span>
        </div>
        <div className="flex flex-col items-center">
          <LuStar className="w-6 h-6 mb-1" />
          <span className="font-semibold text-primary">10k+</span>
          <span className="text-xs text-stone-600">Leitores</span>
        </div>
      </div>
    </aside>
  );
};
