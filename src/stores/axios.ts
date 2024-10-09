/**
 * Axios http client store
 */
import axios from 'axios'
import { AxiosInstance } from 'axios'

// axios setup
const BASE_URL = import.meta.env.VITE_BASE_URL
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'accept': 'application/json',
  }
})

export function useAxiosClient(): AxiosInstance {
  return axiosInstance
}
