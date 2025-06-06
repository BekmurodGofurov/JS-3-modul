async function getResources(api) {
    try {
        const response = await fetch(api)
        return response.json()
    } catch (err) {
        return `Erorr: ${err}`
    }
}

export default getResources