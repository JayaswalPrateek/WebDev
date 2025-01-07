import Product from "../models/productsModel.js"

async function getAllProducts(request, response) {
    try {
        const products = await Product.getAll()
        response.writeHead(200, { "Content-Type": "application/json" })
        response.write(JSON.stringify(products))
    } catch (error) {
        response.writeHead(404, { "Content-Type": "text/html" })
        response.write("<h1>404 - Not Found</h1>")
    } finally {
        response.end()
    }
}

async function getProductByID(request, response, id) {
    try {
        const product = await Product.getByID(id)
        // if (product) {
        response.writeHead(200, { "Content-Type": "application/json" })
        response.write(JSON.stringify(product))
        // }
        // No need to handle the else case because
        // getByID() resolves only if there is no error
        // it rejects in case of an error, trigerring the catch block
        // hence the if block isnt needed either
    } catch (error) {
        response.writeHead(404, { "Content-Type": "text-html" })
        response.write(`<h1>404 - Product with id=${id} not found</h1>`)
    } finally {
        response.end()
    }
}

function createProduct(request, response) {
    try {
        // can create a util to read the body and call resolve(body) on end
        let body = ''
        request.on('data', chunk => body += chunk.toString("utf8"))
        request.on("end", async () => {
            const newProduct = await Product.create(JSON.parse(body))
            // if (newProduct) {
            response.writeHead(201, { "Content-Type": "application/json" })
            response.write(JSON.stringify(newProduct))
            // }
            // No need to handle the else case because
            // create() resolves only if there is no error
            // it rejects in case of an error, trigerring the catch block
            // hence the if block isnt needed either
            response.end()
        })
    } catch (error) {
        response.writeHead(422, { "Content-Type": "text-html" })
        response.write(`<h1>422 - Couldn't add ${dummy}</h1>`)
        response.end()
    }
}

async function updateProductByID(request, response, id) {
    try {
        let body = ''
        const initialProduct = await Product.getByID(id)
        request.on('data', chunk => body += chunk.toString("utf8"))
        request.on("end", async () => {
            // the PUT request body may not contain all the properties
            // and instead may only contain the ones that have changed
            // so we need to merge the changed properties into the old
            // object to generate the complete updated object:
            const updatedProduct = Object.assign({}, initialProduct, JSON.parse(body))
            await Product.update(updatedProduct, id)
            response.writeHead(200, { "Content-Type": "application/json" })
            response.write(JSON.stringify(updatedProduct))
            response.end()
        })
    } catch (error) {
        if (error == 404) {
            response.writeHead(404, { "Content-Type": "text/html" })
            response.write("<h1>404 - Not Found</h1>")
            response.end()
        } else {
            response.writeHead(400, { "Content-Type": "text-html" })
            response.write(`<h1>422 - Couldn't add ${dummy}</h1>`)
            response.end()
        }
    }
}

async function deleteProductByID(request, response, id) {
    try {
        const product = await Product.getByID(id)
        await Product.del(id)
        response.writeHead(200, { "Content-Type": "application/json" })
        response.write(JSON.stringify(product))
    } catch (error) {
        response.writeHead(404, { "Content-Type": "text-html" })
        response.write(`<h1>404 - Product with id=${id} not found</h1>`)
    } finally {
        response.end()
    }
}

export default { getAllProducts, getProductByID, createProduct, updateProductByID, deleteProductByID }