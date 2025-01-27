import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { authService } from "../../../app/services/authServices";
import { SignUpData } from "../../../app/services/authServices/signup";
import toast from "react-hot-toast";
import { useAuth } from "../../../app/hooks/useAuth";

const schema = z.object({
  email: z.string().nonempty("Email é obrigatório").email("Email inválido"),
  name: z.string().nonempty("Nome é obrigatório"),
  password: z
    .string()
    .nonempty("Senha é obrigatória")
    .min(8, "Senha deve ter no mínimo 8 caracteres"),
});

type FormData = z.infer<typeof schema>;

export function useRegisterController() {
  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync: signUp, isLoading } = useMutation({
    mutationFn: async (data: SignUpData) => {
      return authService.signUp(data);
    },
    mutationKey: ["signUp"],
  });

  const { signIn } = useAuth();

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      const { accessToken } = await signUp(data);
      signIn(accessToken);
    } catch (error) {
      toast.error("Erro ao cadastrar");
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
