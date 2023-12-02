import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings(deafultPageSize = 10) {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const filterParam = searchParams.get("status");
  const sortParam = searchParams.get("sortBy");
  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || deafultPageSize;

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

  const pagination = { page, pageSize };

  const response = useQuery({
    queryKey: ["bookings", filter, sort, pagination],
    queryFn: () => getBookings({ filter, sort, pagination }),
  });

  const {
    isLoading,
    data: { data: bookings = [], count = 0 } = {},
    error,
  } = response;

  const hasNextPage = page * pageSize < count;

  if (hasNextPage) {
    const nextPage = { page: page + 1, pageSize };
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sort, nextPage],
      queryFn: () => getBookings({ filter, sort, nextPage }),
    });
  }

  return { isLoading, bookings, count, error };
}
