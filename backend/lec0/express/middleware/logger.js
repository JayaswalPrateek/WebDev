const loggerMiddleware = (request, response, nextMiddleware) => {
    console.log(`Logger: ${request.method} ${request.protocol}://${request.get('host')}${request.originalUrl}`)
    nextMiddleware()
}

export default loggerMiddleware