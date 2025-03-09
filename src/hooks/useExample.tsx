import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchAllMessageChatOfTheMatch = async (
  matchId: string
): Promise<string[]> => {
  const config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${process.env.NEXT_PUBLIC_API_CHAT_BASE_URL}/messages/${matchId}`,
    headers: {},
  };

  return await axios.request(config).then((response) => {
    return response.data.data;
  });
};

const useGetAllMessageOfMatch = (matchId: string) => {
  return useQuery({
    queryKey: ['chat', matchId],
    queryFn: () => fetchAllMessageChatOfTheMatch(matchId),
    staleTime: 600000,
    refetchOnWindowFocus: false,
    retry: false,
  });
};

export { useGetAllMessageOfMatch };
