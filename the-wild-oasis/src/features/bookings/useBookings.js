import { useQuery } from "@tanstack/react-query";

import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
  const [searchParams] = useSearchParams();
  const filterParam = searchParams.get("status");
  const sortParam = searchParams.get("sortBy");

  let filter = null;
  if (filterParam && filterParam !== "all") {
    filter = {
      field: "status",
      value: filterParam,
    };
  }

  let sort = null;
  if (sortParam) {
    let [field, direction] = sortParam.split("-");
    sort = { field, direction };
  }

  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sort],
    queryFn: () => getBookings({ filter, sort }),
  });

  return { isLoading, bookings, error };
}
