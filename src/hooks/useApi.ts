import { useState } from 'react'
import { AxiosError, HttpStatusCode } from 'axios'

import { useBoolean } from './useBoolean'

type UseApiRequestReturn<T> = {
  loading: boolean
  errorMessage: string
  showSuccess: boolean
  callApi: (apiFunc: () => Promise<T>) => Promise<void>
}

export const useApi = <T>(): UseApiRequestReturn<T> => {
  const [errorMessage, setErrorMessage] = useState('')

  const { value: loading, setTrue: setLoading, setFalse: setUnloading } = useBoolean(false)

  const { value: showSuccess, setTrue: setShowSuccess, setFalse: setUnShowSuccess } = useBoolean(false)

  const callApi = async (apiFunc: () => Promise<T>) => {
    setLoading()
    setErrorMessage('')
    try {
      await apiFunc()
      setShowSuccess()
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{errorMessage: string, errorStatus: HttpStatusCode}>

      const errorMessage = axiosError.response?.data?.errorMessage
      if (errorMessage) {
        setErrorMessage(errorMessage)
      }
    } finally {
      setUnloading()
      setTimeout(() => {
        setUnShowSuccess()
      }, 3000)
    }
  }

  return { loading, errorMessage, showSuccess, callApi }
}