import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchPongs, createPong, clearPongs } from "./api";

export function usePongs() {
  return useQuery({ queryKey: ["pongs"], queryFn: fetchPongs });
}

export function useCreatePong() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPong,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pongs"] });
    },
  });
}

export function useClearPongs() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: clearPongs,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pongs"] });
    },
  });
}
