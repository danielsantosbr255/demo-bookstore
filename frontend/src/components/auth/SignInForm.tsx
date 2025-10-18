import Logo from "../ui/Logo";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { SignInIcon, SignUpIcon } from "../../libs/utils/icons";

const SignInForm = () => {
  return (
    <div className="border-spin h-10/12 w-full 2xl:w-[35rem] shadow-lg">
      <div className="bg-white w-full flex flex-col gap-8 h-full py-15  px-8 xl:px-15 rounded-2xl">
        <section className="flex justify-center items-center">
          <Logo />
        </section>

        <section className="flex flex-col motion-preset-slide-left">
          <h1 className="text-2xl font-bold">Acesse sua conta</h1>
          <p>Informe seu e-mail e senha para entrar</p>
        </section>

        <section className="flex flex-col motion-preset-slide-down-left-sm">
          <form className="flex flex-col gap-4">
            <Input type="email" name="Email" placeholder="Insira o email" />
            <Input type="password" name="Senha" placeholder="Insira a senha" />

            <Button className="mt-4 flex justify-between">
              Acessar
              <SignInIcon size={25} />
            </Button>
          </form>
        </section>

        <section className="flex flex-col gap-3 justify-end h-full">
          <p>Ainda não possui uma conta?</p>

          <Button variant="outline" className="flex justify-between">
            Cadastrar
            <SignUpIcon size={25} />
          </Button>
        </section>
      </div>
    </div>
  );
};

export default SignInForm;
