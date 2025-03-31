import { useQuery } from "@tanstack/react-query";
import { listOrder } from "../api/api";

export const useOrder = () => {
    return useQuery({
        queryKey: ["orders"],
        queryFn: listOrder,
    });
};
