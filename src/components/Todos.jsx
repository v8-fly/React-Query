import { useForm } from "react-hook-form"
import {
  useCreateTodo,
  useDeleteTodo,
  useUpdateTodo,
} from "../services/mutations"
import { useTodos, useTodosId } from "../services/queries"

function Todos() {
  const { handleSubmit, register } = useForm()
  const todosIdsQueries = useTodosId()
  const todosQueries = useTodos(todosIdsQueries?.data)
  const createTodoMutation = useCreateTodo()
  const updateTodoMutation = useUpdateTodo()
  const deleteTododMutation = useDeleteTodo()

  const handleCreateTodoSubmit = (data) => {
    createTodoMutation.mutate(data)
  }
  const handleMarkAsDoneTodoSubmit = (data = undefined) => {
    if (data) {
      updateTodoMutation.mutate({ ...data, checked: true })
    }
  }
  const handleDeleteTodo = (id = undefined) => {
    if (id) {
      deleteTododMutation.mutate(id)
    }
  }

  //   want to do something after deleting Todos
  const handleDeleteTodoAsync = async (id = undefined) => {
    if (id) {
      await deleteTododMutation.mutateAsync(id)
      console.log("Hurray Deleted")
    }
  }

  if (todosIdsQueries.isPending) {
    return <div>Todos Loading ....</div>
  }
  if (todosIdsQueries.isError) {
    return <div>There is an error</div>
  }
  if (todosQueries.isPending) {
    return <div>individual Todos Loading ....</div>
  }
  if (todosQueries.isError) {
    return <div>individual error</div>
  }

  return (
    <div>
      <form onSubmit={handleSubmit(handleCreateTodoSubmit)}>
        <h4>New Todo: </h4>
        <input type="text" placeholder="todo" {...register("title")} />
        <br></br>
        <input
          type="text"
          placeholder="Description"
          {...register("description")}
        />
        <br></br>
        <input
          type="submit"
          placeholder="Submit"
          disabled={createTodoMutation.isPending}
          value={
            createTodoMutation.isPending ? "Creating Todos.." : "create Todo"
          }
        />
      </form>
      <p>
        Query tatus ➡️➡️➡️➡️ <strong>{todosIdsQueries.fetchStatus}</strong>{" "}
      </p>
      <p>
        Query data tatus ➡️➡️➡️➡️ <strong>{todosIdsQueries.status}</strong>{" "}
      </p>
      {todosIdsQueries.data?.map((id) => (
        <p key={id}>id : {id}</p>
      ))}
      {todosQueries.map(({ data }) => {
        console.log("todosQueriesData", data)
        return (
          <li key={data?.id}>
            <strong>Title: {data?.title}</strong>
            <br />
            <strong>Description: {data?.description}</strong>
            <br></br>
            <button
              onClick={() => {
                handleMarkAsDoneTodoSubmit(data)
              }}
              disabled={data?.checked}
            >
              {data?.checked ? "Done" : "Mark As Done"}
            </button>
            <br></br>
            {data?.id && (
              <button onClick={() => handleDeleteTodo(data?.id)}>Delete</button>
            )}
            {data?.id && (
              <button onClick={() => handleDeleteTodoAsync(data?.id)}>
                Delete Async
              </button>
            )}
          </li>
        )
      })}
    </div>
  )
}

export default Todos
