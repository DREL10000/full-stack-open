import axios from "axios";

const baseUrl = 'http://localhost:3001/persons'

const getAll = () =>{
    const promise = axios.get(baseUrl)
    const data = promise.then(response => response.data)
    return data
}

const create = (newObj) =>{
    const promise = axios.post(baseUrl, newObj)
    const data = promise.then(response => response.data)
    return data
}

const update = (id, newObj) =>{
    const promise = axios.put(`${baseUrl}/${id}`, newObj)
    const data = promise.then(response => response.data)
    return data
}

const remove = (id) =>{
    const promise = axios.delete(`${baseUrl}/${id}`)
    const data = promise.then(response => response.data)
    return data
}

export default {getAll, create, update, remove}