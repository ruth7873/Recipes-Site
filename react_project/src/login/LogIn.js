import { Link, useLocation, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useDispatch } from "react-redux"
import { SetUser } from "../service/user"
import { Button, TextField } from "@mui/material"
const schema = yup
    .object({
        userName: yup.string().required(),
        password: yup.string().min(3).required(),
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
                <TextField style={{ width: '20%' }} label="User Name" {...register("userName")} error={!!errors.userName} helperText={errors.userName?.message} />
                <br />
                <TextField style={{ width: '20%' }} label="Password" type="password" {...register("password")} error={!!errors.password} helperText={errors.password?.message} />
                <br />
                <Link to={'/signUp'}>Don't have an account yet? Sign up now</Link>
                <br />
                <Button variant="contained" color="primary" type="submit">Submit</Button>
            </form>
        </div>
    )
}