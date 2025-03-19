import { useQuery } from "@tanstack/react-query";
import { fetchProductDetail } from "../api/api";

export const useProductDetail = (id: number) => {
    return useQuery({
        queryKey: ["productDetail", id],
        queryFn: () => fetchProductDetail(id),
    });
};
