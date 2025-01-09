import express, { response } from "express";

// here we need to use a router
const router = express.Router();
// we use it instead of app from express()
// also if all routes share a common prefix
// like /api/json then it can be abstracted
// away and specified only once at the time
// of router.use(prefixStr, importedRouter)

// const loggerMiddleware = (request, response, nextMiddleware) => {
//     console.log(`Logger: ${request.method} ${request.protocol}://${request.get('host')}${request.originalUrl}`)
//     nextMiddleware()
// }
// to use this middleware at the route level we can pass it as the 2nd argument to the request method function
// ie between the route string and the callback method
// router.get("/all", loggerMiddleware, (request, response) => {
//     response.json(jsonData)
// })
// to apply it to all routes, ie at the app level instead of the route level,
// then move the middleware into a seperate file which exports it and then we
// import it wherever the express app exists(index.js) and pass it to app.use()

let jsonData = [
    { id: 1, title: "foo" },
    { id: 2, title: "bar" },
    { id: 3, title: "baz" }
]
// the idiomatic way to send json is to use .json() instead of .send():
router.get("/all", (request, response) => {
    response.json(jsonData)
})
// We can chain the status code of the response before its sent.
// to get a single post by its id, we use :id inside the route
// which is available as a string inside request.params object
router.get("/:id", (request, response) => {
    const id = parseInt(request.params.id)
    const result = jsonData.find(item => item.id == id)
    if (result)
        return response.status(200).json(result)
    // else not needed as we return in if block
    response.status(404).send("<h1>404 - Not Found</h1>")
})
// limiting response size by specifying it as a query:
// http://localhost:8000/api/json/limit/all?limit=2
// should only send a response with 2 or less entires
// WARNING: COULD BE AN INJECTION ATTACK INSTEAD OF '2'
// such queries in the url are stored as a string in
// request.query object.
router.get("/limit/all", (request, response) => {
    const limit = parseInt(request.query.limit)
    if (!isNaN(limit) && limit > 0) return response.status(200).json(jsonData.slice(0, limit))
    response.status(200).json(jsonData)
})

// http://localhost:8000/api/json/postDemo
router.post("/postDemo", (request, response) => {
    // consume the body using request.body
    const newEntry = {
        id: jsonData.length + 1,
        title: request.body.title,
    }
    if (!newEntry.title) return response.status(400).send("<h1>400 - please include title</h1>")
    jsonData.push(newEntry)
    response.status(201).json(jsonData)
})

// Update using PUT Request:
// http://localhost:8000/api/json/:id
router.put("/:id", (request, response) => {
    const id = request.params.id
    const result = jsonData.find(item => item.id == id)
    if (!result) return response.status(404).send("<h1>404 - Not Found</h1>")
    if (!request.body.title) return response.status(400).send("<h1>400 - please include title</h1>")
    result.title = request.body.title
    response.status(200).json(jsonData)
})

// Delete using Delete Request:
// http://localhost:8000/api/json/:id
// router.delete("/:id", (request, response) => {
//     const id = request.params.id
//     const result = jsonData.find(item => item.id == id)
//     if (!result) return response.status(404).send("<h1>404 - Not Found</h1>")
//     jsonData = jsonData.filter(item => item.id != id)
//     response.status(200).json(jsonData)
// })
// implementing it with an error handling middleware
router.delete("/:id", (request, response, nextMiddleware) => {
    const id = request.params.id
    const result = jsonData.find(item => item.id == id)
    if (!result) {
        const error = new Error(`404 - id ${id} Not Found`)
        error.status = 404
        return nextMiddleware(error)
        // return response.status(404).send("<h1>404 - Not Found</h1>")
    } jsonData = jsonData.filter(item => item.id != id)
    response.status(200).json(jsonData)
})

// finally export this router:
export default router