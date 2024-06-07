import { useMutation } from "@tanstack/react-query";
import { login, refresh, register, updateUser } from "@/api/userApi";
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
        registerCredentials.dateOfBirth,
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
  });
};

export const useRefreshTokenMutation = () => {
  return useMutation({
    mutationFn: (refreshCredentials: IloginCredentials) => {
      // return refresh(refreshCredentials.email, refreshCredentials.password);
      return refresh();
    },
  });
};

export const useUpdateUserMutation = () => {
  return useMutation({
    mutationFn: (user: IuserToUpdate) => {
      return updateUser(
        user.name,
        user.email,
        user.dateOfBirth,
        user.password,
        user.photo
      );
    },
  });
};
