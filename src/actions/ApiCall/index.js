import axios from 'axios'
import { API_ROOT } from 'untilities/constants'

export const fetchBoardDetails = async (id) => {
  const request = await axios.get(`${API_ROOT}/v1/boards/${id}`)
  // console.log(request)
  return request.data
}