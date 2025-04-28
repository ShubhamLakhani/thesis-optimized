import papaparse from "papaparse"

export const loadFile = (file, callback) => {
    const reader = new FileReader()

    if(file.name.endsWith('.csv')) {
        papaparse.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (res) => callback(res.data)
        })
    } else {
        reader.onload = () => {
            const jsonData = JSON.parse(reader.result)
            callback(jsonData)
        }
        reader.readAsText(file)
    }
}