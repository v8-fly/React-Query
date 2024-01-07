import { useQuery, useQueries, keepPreviousData } from "@tanstack/react-query"
import { getTododIds, getTodo, getProjects } from "./api"
export const useTodosId = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: getTododIds,
  })
}

/**
 *
 * when you want to query multiple endpoints but you dont know how many
 */
export const useTodos = (ids = []) => {
  return useQueries({
    queries: ids?.map((id) => {
      return {
        queryKey: ["todos", { id }],
        queryFn: () => getTodo(id),
      }
    }),
  })
}

export const useProjects = (page) => {
  return useQuery({
    queryKey: ["projects", { page }],
    queryFn: () => getProjects(page),
    placeholderData: keepPreviousData,
  })
}
