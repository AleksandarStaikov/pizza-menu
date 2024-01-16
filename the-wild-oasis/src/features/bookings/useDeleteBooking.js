import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { deleteBooking as deleteBookingApiCall } from "../../services/apiBookings";

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { mutate: deleteBooking, isLoading: isDeletingBooking } = useMutation({
    mutationFn: deleteBookingApiCall,
    onSuccess: (bookingId) => {
      toast.success(`Booking #${bookingId} has been deleted`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => toast.error(`There was an error while deleting the booking`),
  });

  return { deleteBooking, isDeletingBooking };
}
