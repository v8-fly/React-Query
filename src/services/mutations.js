import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createTodo, deleteTodo, updateTodo } from "./api"

export const useCreateTodo = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data) => createTodo(data),
    onMutate: () => {
      console.log("onMutate")
    },
    onError: () => {
      console.log("onError")
    },
    onSuccess: () => {
      console.log("onSuccess")
    },
    onSettled: async (data, error, variables) => {
      console.log("onSettled")
      if (error) {
        console.log("Error", error)
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["todos"],
        })
      }
    },
  })
}

export const useUpdateTodo = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data) => updateTodo(data),
    onSuccess: () => {
      console.log(" Delete onSuccess")
    },
    onSettled: async (_data, error, variables) => {
      if (error) {
        console.log(error)
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["todos"],
        })
        await queryClient.invalidateQueries({
          queryKey: ["todos", { id: variables.id }],
        })
      }
    },
  })
}

export const useDeleteTodo = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id) => deleteTodo(id),
    onSettled: async (_data, error, _variables) => {
      if (error) {
        console.log(error)
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["todos"],
        })
      }
    },
  })
}
