import axios from 'axios'

let apiUrl


if (process.env.NODE_ENV === "production") {
    apiUrl = "https://mighty-river-42782.herokuapp.com/"
} else {
    apiUrl = process.env.REACT_APP_API_URL
}

export const api = axios.create({
    baseURL: apiUrl
})