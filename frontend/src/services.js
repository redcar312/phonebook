import axios from "axios";
const url = '/api/persons'


 export const getAll = () => {
    return axios.get(url)
}


 export const create = (dataObj) => {
    return axios.post(url, dataObj)
}

 export const deletePerson = (id) => {
    
    return axios.delete(`${url}/${id}`)
}

 export const updatePerson = (personObj) => {
  const res = axios.put(`${url}/${personObj.id}`, personObj)
  return res.then(res.data)
    
}

export default {
    getAll,
    create,
    deletePerson,
    updatePerson
}