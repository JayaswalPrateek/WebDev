// to use ES Module Import/Export, set type='module' in package.json
// Otherwise it defaults to CommonJS: module.exports = ... and require()
import http from "http"
import fs from "fs/promises" // filesystem methods that use promises
import url from "url"
import path from "path"

// to read data from env file, create .env
// add --env-file=.env in package.json script
const PORT = process.env.PORT

const users = [
    { id: 1, username: "foo" },
    { id: 2, username: "bar" },
    { id: 3, username: "baz" }
]

const server = http.createServer((request, response) => {
    console.log(request.url)
    console.log(request.method)
    loggerMiddleware(request, response, async () => {
        // there is no routing by default
        // we must respond only at a specific route/method
        if (request.method == "GET") {
            if (request.url == "/") {
                // response defaults to text/plain which wont render HTML
                // response.setHeader("Content-Type", "text/html")
                // response.statusCode = 201
                // Both can be aggregated in one line using writeHead()
                response.writeHead(200, { 'Content-Type': "text/html" })
                response.write("<h1>Hello World</h1>")
            } else if (request.url == "/about") {
                response.writeHead(200, { 'Content-Type': "text/html" })
                response.write("<h1>About Us</h1>")
            } else if (request.url == "/home") {
                const __filename = url.fileURLToPath(import.meta.url) // file://<> -> <>
                console.log("current file: ", __filename)
                const __dirname = path.dirname(__filename)
                console.log("current dir: ", __dirname)
                const filePath = path.join(__dirname, "home.html") // same as .resolve()
                console.log("Reading file: " + filePath)
                const data = await fs.readFile(filePath)
                console.log(filePath + " read")
                response.writeHead(200, { 'Content-Type': "text/html" })
                response.write(data)
            } else if (request.url == "/api/users/all") {
                response.writeHead(200, { 'Content-Type': "application/json" })
                response.write(JSON.stringify(users))
            } else if (request.url.match(/\/api\/users\/([0-9]+)/)) {
                const pattern = /\/api\/users\/([0-9]+)/;
                const match = request.url.match(pattern);
                if (match) {
                    const id = match[1];
                    console.log("Requested id: " + id)
                    if (id <= 0 || id - 1 >= users.length) {
                        response.writeHead(404, { 'Content-Type': "text/html" })
                        response.write("<h1>404, User Not Found</h1>")
                    } else {
                        response.writeHead(200, { 'Content-Type': "application/json" })
                        response.write(JSON.stringify(users[id - 1]))
                    }
                } else {
                    response.writeHead(404, { 'Content-Type': "text/html" })
                    response.write("<h1>404, User Not Found</h1>")
                }
            } else {
                response.writeHead(404, { 'Content-Type': "text/html" })
                response.write("<h1>404, Route Not Found</h1>")
            }
        } else if (request.method == "POST" && request.url == "/api/users/") {
            let body = ""
            request.on('data', (chunk) => { body += chunk.toString() })
            request.on('end', () => {
                const newUser = JSON.parse(body)
                users.push(newUser)
                response.writeHead(201, { 'Content-Type': "application/json" })
                response.write(JSON.stringify(newUser))
                response.end()
            })
            // after setting these event handlers, response is ended, and then
            // we start writing headers in the response, when its too late.
            // so to avoid this closure of response, we return here itself
            return // and instead we call .end() in the event handler itself
        } else { // Not a GET Request
            response.writeHead(500, { 'Content-Type': "text/html" })
            response.write("<h1>Server Error</h1>")
        }
        response.end()
    })
});

// a middleware is a function that exists in the middle of the request and response
// they perform a specific thing like logging, sanitation, authentication, etc
// each middleware method accepts 3 things: the request and response objects,
// and a callback function called 'next' which is the next middleware to be called
// after the current middleware has finished executing.
const loggerMiddleware = (request, response, next) => {
    console.log("Logger: " + request.method + ":" + request.url + " [" + JSON.stringify(request.headers) + "]")
    next()
}

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})