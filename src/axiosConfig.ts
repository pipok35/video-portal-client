import Axios from 'axios'

const token = localStorage.getItem('token')

const axios = Axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: { Authorization: `Bearer ${token}` }
})

export default axios
