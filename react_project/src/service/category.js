import axios from "axios"
import Swal from "sweetalert2"

export const getCategories = () => {
    return dispatch =>
     axios.get('http://localhost:8080/api/category')
        .then((res) => {
            dispatch({ type: "SET_CATEGORY", data: res.data })
        })
        .catch((error) =>
            console.error(error)
        )
}
export const AddCategory = (category) => {
    return dispatch =>
        axios.post(`http://localhost:8080/api/category`, { Name: category })
            .then((res) => {
                dispatch({ type: "ADD_CATEGORY", data: res.data })
                Swal.fire({
                    text: "הקטגוריה נוספה בהצלחה",
                    icon: "success",
                })
            })
            .catch((error) => console.error(error))
}