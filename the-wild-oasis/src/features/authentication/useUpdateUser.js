import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { updateCurrentUser } from "../../services/apiAuth";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isPending: isUpdatingUser } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: ({ user }) => {
      toast.success("User data has been updated successfully!");
      queryClient.setQueryData(["user"], user);
    },
    onError: (error) => toast.error(error.message),
  });

  return { updateUser, isUpdatingUser };
}
