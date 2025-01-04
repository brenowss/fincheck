import { Link } from "react-router-dom";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

export default function Register() {
  return (
    <>
      <header className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-2xl font-bold -tracking-[1px] text-gray-900">
          Crie sua conta
        </h1>

        <p className="space-x-2">
          <span className="-tracking-[0.5px] text-gray-700">
            Já possui uma conta?
          </span>
          <Link
            to="/login"
            className="font-medium -tracking-[0.5px] text-teal-900"
          >
            Fazer login
          </Link>
        </p>
      </header>

      <form className="mt-16 flex flex-col gap-4">
        <Input type="text" placeholder="Nome" name="register-name" />
        <Input type="email" placeholder="Email" name="register-email" />
        <Input type="password" placeholder="Senha" name="register-password" />

        <Button type="submit">Criar conta</Button>
      </form>
    </>
  );
}
