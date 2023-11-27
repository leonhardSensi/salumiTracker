import { useMutation } from "@tanstack/react-query";
import { login, register, updateUser } from "@/api/userApi";
import {
  IloginCredentials,
  IregisterCredentials,
  IuserToUpdate,
} from "@/interfaces/interfaces";

export const useRegisterMutation = () => {
  // const router = useRouter();

  return useMutation({
    mutationFn: (registerCredentials: IregisterCredentials) => {
      return register(
        registerCredentials.name,
        registerCredentials.email,
        registerCredentials.password,
        registerCredentials.passwordConfirm
      );
    },
    // onSuccess: () => router.push("/"),
  });
};

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (loginCredentials: IloginCredentials) => {
      return login(loginCredentials.email, loginCredentials.password);
    },
    // onSuccess: () => router.push("/"),
  });
};

export const useUpdateUserMutation = () => {
  return useMutation({
    mutationFn: (user: IuserToUpdate) => {
      return updateUser(user.name, user.email);
    },
  });
};
