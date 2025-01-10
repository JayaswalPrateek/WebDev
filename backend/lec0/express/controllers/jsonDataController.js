let jsonData = [
    { id: 1, title: "foo" },
    { id: 2, title: "bar" },
    { id: 3, title: "baz" }
]

const getAll = (request, response) => {
    response.json(jsonData)
}

const getByID = (request, response) => {
    const id = parseInt(request.params.id)
    const result = jsonData.find(item => item.id == id)
    if (result)
        return response.status(200).json(result)
    // else not needed as we return in if block
    response.status(404).send("<h1>404 - Not Found</h1>")
}

const limitedGetAll = (request, response) => {
    const limit = parseInt(request.query.limit)
    if (!isNaN(limit) && limit > 0) return response.status(200).json(jsonData.slice(0, limit))
    response.status(200).json(jsonData)
}

const postEntry = (request, response) => {
    // consume the body using request.body
    const newEntry = {
        id: jsonData.length + 1,
        title: request.body.title,
    }
    if (!newEntry.title) return response.status(400).send("<h1>400 - please include title</h1>")
    jsonData.push(newEntry)
    response.status(201).json(jsonData)
}

const putEntry = (request, response) => {
    const id = request.params.id
    const result = jsonData.find(item => item.id == id)
    if (!result) return response.status(404).send("<h1>404 - Not Found</h1>")
    if (!request.body.title) return response.status(400).send("<h1>400 - please include title</h1>")
    result.title = request.body.title
    response.status(200).json(jsonData)
}

// const deleteEntry =  (request, response) => {
//     const id = request.params.id
//     const result = jsonData.find(item => item.id == id)
//     if (!result) return response.status(404).send("<h1>404 - Not Found</h1>")
//     jsonData = jsonData.filter(item => item.id != id)
//     response.status(200).json(jsonData)
// }
// implementing it with an error handling middleware
const deleteEntry = (request, response, nextMiddleware) => {
    const id = request.params.id
    const result = jsonData.find(item => item.id == id)
    if (!result) {
        const error = new Error(`404 - id ${id} Not Found`)
        error.status = 404
        return nextMiddleware(error)
        // return response.status(404).send("<h1>404 - Not Found</h1>")
    } jsonData = jsonData.filter(item => item.id != id)
    response.status(200).json(jsonData)
}

export default { getAll, getByID, limitedGetAll, postEntry, putEntry, deleteEntry }