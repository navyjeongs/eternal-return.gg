import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface FetchRouteData {
  code: number;
  routeDetail: {
    characterCode: number;
    equipment: Array<number>;
    id: number;
    paths: Array<number>;
    title: string;
    userNickname: string;
    weaponType: number;
    skillPaths?: Array<string>;
    descs?: string;
  };
}

const fetchDetailRoute = async (routeId: string) => {
  try {
    const res = await axios({
      method: "get",
      url: `/api/routepath/detail/${routeId}`,
    });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data;
    }
  }
};

export const useFetchRouteDetail = (routeId: string) => {
  const { isError, isLoading, data, error } = useQuery<FetchRouteData>(["getRoutes", routeId], () =>
    fetchDetailRoute(routeId)
  );

  return { isError, isLoading, data, error };
};
