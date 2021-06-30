import axios from 'axios'

// Sets the URL for the backend depending on env and chosen settings 
export const setApiUrl = () => {
    if (process.env.NODE_ENV === "production") {
        return "https://mighty-river-42782.herokuapp.com/"
    }

    if (process.env.NODE_ENV === "development"){
        return process.env.REACT_APP_API_URL || "http://localhost:4000"
    }
}

const apiUrl = setApiUrl()

export const api = axios.create({
    baseURL: apiUrl
})