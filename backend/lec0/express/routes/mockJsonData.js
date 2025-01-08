import express from "express";

// here we need to use a router
const router = express.Router();
// we use it instead of app from express()
// also if all routes share a common prefix
// like /api/json then it can be abstracted
// away and specified only once at the time
// of router.use(prefixStr, importedRouter)

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
    const result = jsonData.find(item => item.id === id)
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

// finally export this router:
export default router