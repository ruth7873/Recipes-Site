import axios from "axios";

export const getBuies = (user) => {
    return dispatch => axios.get(`http://localhost:8080/api/bay/${user.Id}`)
        .then((res) => {
            dispatch({ type: "SET_BUY", data: res.data })
        })
        .catch((error) =>
            console.error(error)
        )
}
export const deleteProd = (user,name,id) => {
    return dispatch => {
         axios.post(`http://localhost:8080/api/bay/delete/${id}`)
            .then((res) => {
                dispatch({ type: "DELETE_BUY", data: {  Id: id,Name: name, UserId: user.Id,Count:0 } })
            })
            .catch((error) => { console.error(error) })
    }
}

export const editAdd = (name, count, user) => {
    return dispatch => {
        axios.post(`http://localhost:8080/api/bay`, { Name: name, Count: count, UserId: user.Id })
            .then((res) => {
                dispatch({ type: "EDIT_BUY", data: {Id:res.data.Id, Name: name, Count: res.data.Count, UserId: user.Id } })
            }).catch((error) => console.error(error))
    }
}
