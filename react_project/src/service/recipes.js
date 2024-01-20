import axios from "axios";

export const getRecipes = () => {
    return dispatch => {
        axios.get('http://localhost:8080/api/recipe')
            .then((res) =>
                dispatch({ type: "SET_RECIPE", data: res.data }))
            .catch((error) =>
                console.error(error)
            )
    }
}
export const deleteRecipe = (x) => {
    return dispatch => {
        axios.post(`http://localhost:8080/api/recipe/delete/:${x.Id}`)
            .then(() => {
                dispatch({ type: "DELETE_RECIPE", data: x })
            })
            .catch((error) => { console.error(error) })
    }
}
export const addRecipe = (data) => {
    return dispatch => axios.post('http://localhost:8080/api/recipe', data)
        .then(() => {
            dispatch({ type: "ADD_RECIPE", data: data })
        })
        .catch((error) => {
            console.error(error)
        })
}
export const editRecipe = (data, selectRecipe) => {
    return dispatch => axios.post('http://localhost:8080/api/recipe/edit', { ...data, UserId: selectRecipe?.UserId, Id: selectRecipe?.Id })
        .then((response) => {
            dispatch({ type: "EDIT_RECIPE", data: response.data })
        }).catch((error) => { console.error(error) })
}