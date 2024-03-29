import { useForm } from "react-hook-form"
import { useNavigate, useLocation } from "react-router-dom"
import { yupResolver } from "@hookform/resolvers/yup"
import axios from "axios"
import * as yup from "yup"
import { Button, TextField } from "@mui/material"
import Swal from "sweetalert2"

let schema = yup
    .object({
        Username: yup.string().required(),
        Name: yup.string().required(),
        Adress: yup.string().required(),
        Email: yup.string().email().required(),
        Phone: yup.string().required(),
        Tz: yup.string().required(),
        Password: yup.string().min(3).required("סיסמה חייבת לכלול לפחות 3 תווים"),
    })
    .required()

export default function App() {
    const { state } = useLocation()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: { Username: state?.userName }
    })
    const navigate = useNavigate();
    const onSubmit = (data, e) => {
        {
            axios.post('http://localhost:8080/api/user/sighin', data)
                .then((d) => {
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: "נרשמת בהצלחה",
                        showConfirmButton: false,
                        timer: 2500
                    });
                    navigate("/login", { state: data })
                }).catch((error) => {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: error.response.data,
                    });
                    reset()
                })
        }
    }
    return (
        <div className="p">
            <form onSubmit={handleSubmit(onSubmit)} className="signup">

                <TextField style={{ width: '20%', backgroundColor: 'white', opacity: 0.8 }} label="שם משתמש" {...register("Username")} error={!!errors.Username} helperText={errors.Username?.message} />
                <br />
                <TextField style={{ width: '20%', backgroundColor: 'white', opacity: 0.8 }} label="שם"{...register("Name")} error={!!errors.Name} helperText={errors.Name?.message} />
                <br />
                <TextField style={{ width: '20%', backgroundColor: 'white', opacity: 0.8 }} label="כתובת" {...register("Adress")} error={!!errors.Adress} helperText={errors.Adress?.message} />
                <br />
                <TextField style={{ width: '20%', backgroundColor: 'white', opacity: 0.8 }} label="דואר אלקטרוני"  placeholder="Email" {...register("Email")} error={!!errors.Email} helperText={errors.Email?.message} />
                <br />
                <TextField style={{ width: '20%', backgroundColor: 'white', opacity: 0.8 }} label="טלפון"{...register("Phone")} error={!!errors.Phone} helperText={errors.Phone?.message} />
                <br />
                <TextField style={{ width: '20%', backgroundColor: 'white', opacity: 0.8 }} label="מספר זהות" {...register("Tz")} error={!!errors.Tz} helperText={errors.Tz?.message} />
                <br />
                <TextField style={{ width: '20%', backgroundColor: 'white', opacity: 0.8 }} label="סיסמה" type="Password" {...register("Password")} error={!!errors.Password} helperText={errors.Password?.message} />
                <br />
                <Button variant="contained" color="primary" type="submit">הרשם</Button>
            </form>
        </div>
    )
}