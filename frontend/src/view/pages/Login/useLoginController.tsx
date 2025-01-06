import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authService } from "../../../app/services/authService";
import { useMutation } from "@tanstack/react-query";
import { SignInData } from "../../../app/services/authService/signin";
import toast from "react-hot-toast";

const schema = z.object({
  email: z.string().nonempty("Email é obrigatório").email("Email inválido"),
  password: z
    .string()
    .nonempty("Senha é obrigatória")
    .min(8, "Senha deve ter no mínimo 8 caracteres"),
});

type FormData = z.infer<typeof schema>;

export function useLoginController() {
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync: signIn, isLoading } = useMutation({
    mutationFn: async (data: SignInData) => {
      return authService.signIn(data);
    },
    mutationKey: ["signIn"],
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      const { accessToken } = await signIn(data);
      console.log(accessToken);
    } catch (error) {
      toast.error("Erro ao fazer login");
      console.error(error);
    }
  });

  return {
    register,
    handleSubmit,
    errors,
    isLoading,
  };
}
