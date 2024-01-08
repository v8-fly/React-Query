import {
  useQuery,
  useQueries,
  keepPreviousData,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query"
import {
  getTododIds,
  getTodo,
  getProjects,
  getProducts,
  getProduct,
} from "./api"
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

export function useProducts() {
  return useInfiniteQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined
      }
      return lastPageParam + 1
    },
    getPreviousPageParam: (_, __, firstPageParam) => {
      if (firstPageParam <= 1) {
        return undefined
      }
      return firstPageParam - 1
    },
  })
}

export function useProduct(id) {
  const queryClient = useQueryClient()

  return useQuery({
    queryKey: ["product", { id }],
    queryFn: () => getProduct(id),
    enabled: !!id,
    placeholderData: () => {
      const cachedProducts = queryClient
        .getQueryData(["products"])
        ?.pages?.flat(2)

      if (cachedProducts) {
        return cachedProducts.find((item) => item.id === id)
      }
    },
  })
}
