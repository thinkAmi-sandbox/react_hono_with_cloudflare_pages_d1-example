import {createFileRoute, createLazyRoute, createRoute, Link} from "@tanstack/react-router";

const Component = () => {
  return (
    <>
      <h1>Hello, TanStack Router</h1>
      <Link to="/chart">Chart</Link>
    </>
  )
}

export const Route = createLazyRoute('/')({
  component: Component
})