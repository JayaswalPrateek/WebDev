const errorHandler = (error, request, response, nextMiddleware) => {
    if (error.status === 0)
        return response.status(error.status).json({ msg: error.message })
    response.status(500).json({ msg: error.message }) // 500: Internal Server Error(default)
}

export default errorHandler