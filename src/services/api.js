import axios from "axios"
const BASE_URL = "http://localhost:8080"
const axiosInstance = axios.create({ baseURL: BASE_URL })

export const getTododIds = async () => {
  return (await axiosInstance.get("todos")).data?.map((todo) => todo.id)
}

export const getTodo = async (id) => {
  console.log("getTodo >>> ", id)
  return (await axiosInstance.get(`todos/${id}`)).data
}

export const createTodo = async (data) => {
  await axiosInstance.post("todos", data)
}

export const updateTodo = async (data) => {
  await axiosInstance.put(`todos/${data?.id}`, data)
}
export const deleteTodo = async (id) => {
  await axiosInstance.delete(`todos/${id}`)
}

// /**
//  * Project Pagination Queries
//  */

export const getProjects = async (page = 1) => {
  return (await axiosInstance.get(`projects?_page=${page}&_limit=3`)).data
}

/***
 * Fetch onScroll
 *
 */

export const getProducts = async ({ pageParam }) => {
  console.log("pageParam", pageParam)
  return (await axiosInstance.get(`products?_page=${pageParam + 1}&_limit=3`))
    .data
}

export const getProduct = async (id) => {
  return (await axiosInstance.get(`products/${id}`)).data
}
