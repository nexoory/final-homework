import axios from "axios"

async function responder(page) {

    const server = 'http://192.168.99.100:5555'

    const basePath = "/apiV1"
    const bookPath = "/book"
    const authorPath = "/author"

    let request
    let url

    if(page === 'library') {
        url = server+basePath+bookPath
        request = axios.get(url)
    } else {
        return {
            error: "What?",
            description: "Responder does not know such a request"
        }
    }

    let response
    try {
        response = await request
    } catch (e) {
        response = e.response
    }

    let status
    try {
        status = response.status
    } catch (e) {
        status = 0
    }

    if(status === 200) {
        return {
            error: false,
            data: response.data
        }
    }

    if(status === 404) {
        return {
            error: "Incorrect URL",
            description: `Data not found at ${url}`
        }
    }

    if(isNaN(status)) {
        return {
            error: `The server said ${status}`,
            description: `We don't know what to do about it`
        }
    }

    return {
        error: "Network error",
        description: `${server} not responding`
    }
}


export default responder