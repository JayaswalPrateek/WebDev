import products from "../data/products.json" with { type: "json" }
import { v4 as uuidv4 } from 'uuid'
import commitDataToFile from "../utils/commitDataToFile.js"

function getAll() {
    if (products.length != 0)
        return Promise.resolve(products)
    else
        return Promise.reject()
}

function getByID(id) {
    return new Promise((resolve, reject) => {
        const product = products.find(p => p.id === id)
        if (product)
            resolve(product)
        else reject(404)
    })
}

function create(entry) {
    return new Promise((resolve, reject) => {
        const newEntry = { id: uuidv4(), ...entry }
        products.push(newEntry)
        // now write the updated product list to the local json file
        const operation = commitDataToFile("data/products.json", products)
        if (operation.success)
            resolve(newEntry)
        else reject(operation.error)
    })
}

function update(entry, id) {
    return new Promise((resolve, reject) => {
        const index = products.findIndex((p => p.id === id))
        products[index] = entry
        // now write the updated product list to the local json file
        const operation = commitDataToFile("data/products.json", products)
        if (operation.success)
            resolve(entry)
        else reject(operation.error)
    })
}

export default { getAll, getByID, create, update }