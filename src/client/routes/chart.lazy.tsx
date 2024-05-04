import {createFileRoute, createLazyRoute, Link} from "@tanstack/react-router"
import * as React from "react"
import {ArcElement, Chart as ChartJS, Legend, Tooltip} from 'chart.js'
import {Pie} from 'react-chartjs-2'
import {useApplesApi} from "../hooks/useApplesApi";


const ChartComponent = () => {
  ChartJS.register(ArcElement, Tooltip, Legend)

  const {data, isLoading} = useApplesApi()
  if (isLoading) return <div>Loading...</div>
  if (!data) return

  return (
    <div style={{width: '300px'}}>
      <Pie data={data} />
    </div>
  )
}

const Component = () => {
  return (
    <>
      <h1>Hello, Chart</h1>
      <Link to="/">Home</Link>
      <hr />
      <ChartComponent />
    </>
  )
}

export const Route = createLazyRoute('/chart')({
  component: Component
})