import Button from "../ui/Button";
import Input from "../ui/Input";
import { AiOutlineLogin } from "react-icons/ai";
import { PiUserCirclePlusFill } from "react-icons/pi";
import Logo from "../ui/Logo";

const SignInForm = () => {
  return (
    <div className="bg-white border-b-3 border-primary/50 text-gray-700 flex flex-col gap-8 2xl:w-[35rem] h-10/12 py-15 px-8 xl:px-15 rounded-2xl shadow-lg">
      <section className="flex justify-center items-center">
        <Logo />
      </section>

      <section className="flex flex-col">
        <h1 className="text-2xl font-bold">Acesse sua conta</h1>
        <p>Informe seu e-mail e senha para entrar</p>
      </section>

      <section className="flex flex-col">
        <form className="flex flex-col gap-4">
          <Input type="email" name="Email" placeholder="Insira o email" />
          <Input type="password" name="Senha" placeholder="Insira a senha" />

          <Button className="mt-4 flex justify-between">
            Acessar
            <AiOutlineLogin size={25} />
          </Button>
        </form>
      </section>

      <section className="flex flex-col gap-3 justify-end h-full">
        <p>Ainda não possui uma conta?</p>

        <Button variant="outline" className="flex justify-between">
          Cadastrar
          <PiUserCirclePlusFill size={25} />
        </Button>
      </section>
    </div>
  );
};

export default SignInForm;
