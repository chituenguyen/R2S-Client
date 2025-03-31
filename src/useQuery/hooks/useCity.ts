import { useQuery } from "@tanstack/react-query";
import { CityPick } from "../api/api";

export const useCity = () => {
    return useQuery({
        queryKey: ["cities"],
        queryFn: CityPick,
    });
};