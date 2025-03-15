import { useQuery } from "@tanstack/react-query";
import { getProductList } from "../redux/api/axios";

export const useProduct = () => {
    return useQuery({
        queryKey: ["products"],
        queryFn: getProductList,
    });
};