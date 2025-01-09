import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authService } from "../../../app/services/authServices";
import { useMutation } from "@tanstack/react-query";
import { SignInData } from "../../../app/services/authServices/signin";
import toast from "react-hot-toast";
import { useAuth } from "../../../app/hooks/useAuth";

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

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (data: SignInData) => {
      return authService.signIn(data);
    },
    mutationKey: ["signIn"],
  });

  const { signIn } = useAuth();

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      const { accessToken } = await mutateAsync(data);
      console.log(accessToken);
      signIn(accessToken);
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
