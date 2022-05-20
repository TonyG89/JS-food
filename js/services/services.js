// пост данных(шаблон)
const postData = async (url, data) => { // постинг данных
    const res = await fetch(url, {
    method: "POST",
    headers: {
    'Content-type': 'application/json'
    },
    body: data
    })
    
    return await res.json()
    }


    const getResource = async (url) => { // постинг данных МОЖНО ЛИ ЗАКОМЕНТИРОВАТЬ?
        const res = await fetch(url)
    
        // ручная настройка кетчей(реджект) ошибки
        if (!res.ok) {
            throw new Error(`Couldn't fetch ${ulr}, status: ${res.status} `)
        }
    
        return await res.json()
    }


export {postData}
export {getResource}