import axiosClient from "./axiosClient"

 
const todoApi = {
    getAll(){
        const url = '/comments'
        return axiosClient.get(url, {
            params: {
                _limit: 10
            }
        })
    },

    getById(id){
        const url = `/comments?id=${id}`
        return axiosClient.get(url)
    },


    add(data){
        const url = '/comments'
        return axiosClient.post(url, data)
    },

    delete(id){
        const url = `/comments/${id}`
        return axiosClient.delete(url)
    }
}

export default todoApi