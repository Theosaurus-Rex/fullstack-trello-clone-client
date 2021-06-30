import { setApiUrl } from './index'

describe("setApiUrl", () => {
    test("It sets API URL to prod when in production mode", () => {
        //Mock being in production
        process.env.NODE_ENV = "production"

        //Test goes here
        const apiUrl = setApiUrl()
        expect(apiUrl).toBe("https://mighty-river-42782.herokuapp.com/")

        //Reset environment variable
        process.env.NODE_ENV = "test"
    })

    test("It sets API URL to localhost by default when in development mode", () => {
        //Mock being in development
        process.env.NODE_ENV = "development"

        //Test goes here
        const apiUrl = setApiUrl()
        expect(apiUrl).toBe("http://localhost:4000")

        //Reset environment variable
        process.env.NODE_ENV = "test"
    })

    test("It sets API URL to chosen url when flag is passed", () => {
        //Mock being in production
        process.env.NODE_ENV = "development"
        process.env.REACT_APP_API_URL = "banana"

        //Test goes here
        const apiUrl = setApiUrl()
        expect(apiUrl).toBe("banana")

        //Reset environment variable
        process.env.NODE_ENV = "test"
    })
})