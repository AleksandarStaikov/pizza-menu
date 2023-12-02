import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { getBooking } from "../../services/apiBookings";

export function useBooking() {
  const { bookingId } = useParams();

  const {
    data: booking,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(bookingId),
    retry: false,
  });

  if (error) {
    console.error(error);
    throw new Error("Error while loading booking");
  }

  return { booking, isLoading };
}
