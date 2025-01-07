import fs from "fs"

export default function commitDataToFile(fileName, data) {
    fs.writeFileSync(fileName, JSON.stringify(data), "utf8", (err) => {
        return { success: false, error: err }
    })
    return { success: true, error: null }
}