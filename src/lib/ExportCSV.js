export const arrayToCsv = (data) => {
        return data.map(row => row
            .map(String)  // convert every value to String
            .map(v => v.replaceAll('"', '""'))  // escape double quotes
            .map(v => `"${v}"`)  // quote it
            .join(',')  // comma-separated
        ).join('\r\n')  // rows starting on new lines
}

export const downloadBlob = (content, filename, contentType) => {
    // Create a blob
    const blob = new Blob([content], { type: contentType })
    const url = URL.createObjectURL(blob)

    // Create a link to download it
    const pom = document.createElement('a')
    pom.href = url
    pom.setAttribute('download', filename)
    pom.click()
}
