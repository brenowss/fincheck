import { Link } from "react-router-dom";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { useRegisterController } from "./useRegisterController";

export default function Register() {
  const { register, handleSubmit, errors, isLoading } = useRegisterController();

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

      <form className="mt-16 flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Nome"
          {...register("name")}
          error={errors.name}
        />
        <Input
          type="email"
          placeholder="Email"
          {...register("email")}
          error={errors.email}
        />
        <Input
          type="password"
          placeholder="Senha"
          {...register("password")}
          error={errors.password}
        />

        <Button type="submit" isLoading={isLoading}>
          Criar conta
        </Button>
      </form>
    </>
  );
}
