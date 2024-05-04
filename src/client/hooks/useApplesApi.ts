import {hc} from 'hono/client'

import {useQuery} from "@tanstack/react-query";
import {ApplesType} from "../../index";

const client = hc<ApplesType>('')

const queryFn = async () => {
  const response = await client.api.apples.$get()
  if (response.ok) {
    return await response.json()
  }
}

export const useApplesApi = () => {
  return useQuery({
    queryKey: ['ApiApples'],
    queryFn: queryFn
  })
}