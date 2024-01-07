import { useState } from "react"
import { useProjects } from "../services/queries"

function PaginationProjects() {
  const [page, setPage] = useState(1)
  const { data, isPending, error, isError, isPlaceholderData, isFetching } =
    useProjects(page)

  return (
    <>
      {isPending && <h4>Loading ...</h4>}
      {isError && <h4>Error : {error.message}</h4>}
      {data?.map((project) => {
        return (
          <div key={project.id}>
            <h4>ID: {project.id}</h4>
            <h4>NAME: {project.name}</h4>
          </div>
        )
      })}
      <div>Current Page {page}</div>
      <button onClick={() => setPage((old) => Math.max(old - 1, 0))}>
        Previous
      </button>{" "}
      <button
        disabled={isPlaceholderData}
        onClick={() => setPage((old) => Math.max(old + 1))}
      >
        Next
      </button>{" "}
      {isFetching ? <div>Lodaing</div> : null}
    </>
  )
}

export default PaginationProjects
