import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchPongs, createPong, clearPongs } from "./api";

export function usePongs() {
  return useQuery({ queryKey: ["pongs"], queryFn: fetchPongs });
}

export function useCreatePong() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createPong,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["pongs"] }),
  });
}

export function useClearPongs() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: clearPongs,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["pongs"] }),
  });
}
