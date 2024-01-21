import { Link, useLocation, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useDispatch } from "react-redux"
import { SetUser } from "../service/user"
import { Button, TextField } from "@mui/material"
const schema = yup
    .object({
        userName: yup.string().required("שדה חובה!"),
        password: yup.string().min(3).required("סיסמה חייבת לכלול לפחות 3 תווים"),
    })
    .required()

export default function App() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { state } = useLocation()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema), defaultValues: { userName: state?.Username, password: state?.Password }
    })
    const onSubmit = (data) => {
        dispatch(SetUser(data, navigate))
    }
    return (
        <div className="p">
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField style={{ width: '20%' }} label="שם משתמש" {...register("userName")} error={!!errors.userName} helperText={errors.userName?.message} />
                <br />
                <TextField style={{ width: '20%' }} label="סיסמה" type="password" {...register("password")} error={!!errors.password} helperText={errors.password?.message} />
                <br />
                <Link to={'/signUp'}>!עדיין אין לך חשבון? צור עכשיו</Link>
                <br />
                <Button variant="contained" color="primary" type="submit">התחבר</Button>
            </form>
        </div>
    )
}