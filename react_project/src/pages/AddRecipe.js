import { useFieldArray, useForm } from "react-hook-form"
import { useLocation, useNavigate } from "react-router-dom"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useSelector, useDispatch } from "react-redux";
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { addRecipe, editRecipe } from '../service/recipes'
import { Remove } from "@mui/icons-material";


export default () => {
    const schema = yup
        .object({
            Name: yup.string().required("שדה חובה"),
            CategoryId: yup.number().required(""),
            Img: yup.string().required("שדה חובה"),
            UserId: yup.number().required(),
            Duration: yup.number().required(),
            Difficulty: yup.number().required(),
            Description: yup.string().required("הכנס תאור קצר"),
            Instructions: yup.array(yup.string("כתוב הוראות הכנה")),
            Ingrident: yup.array().of(yup.object({
                Name: yup.string().nullable(),
                Count: yup.string().nullable(),
                Type: yup.string().nullable(),
            }))
        })
        .required()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { state } = useLocation()
    const selectRecipe = state;
    const { UserId, Categories } = useSelector(state => ({
        UserId: state.user.user?.Id,
        Categories: state.category.categories
    }))
    const {
        register,
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            Name: state?.Name, UserId: UserId, CategoryId: state?.CategoryId,
            Img: state?.Img, Duration: state?.Duration, Difficulty: state?.Difficulty,
            Description: state?.Description, Ingrident: state?.Ingrident, Instructions: state?.Instructions
        }
    })
    const { fields: Instructions, append: appendInstructions, remove: removeInst } = useFieldArray({
        control, name: "Instructions"
    });
    const { fields: Ingrident, append: appendIngridents, remove: removeIngr } = useFieldArray({
        control, name: "Ingrident"
    });
    const onSubmit = (data) => {
        {
            if (selectRecipe == null)
                dispatch(addRecipe(data, UserId))
            else
                dispatch(editRecipe(data, selectRecipe))
            navigate('/recipe')
        }
    }
    return (
        <div className='add'>
            <form className='form' onSubmit={handleSubmit(onSubmit)}>
                <TextField style={{ width: '20%', backgroundColor: "whitesmoke", opacity: 0.7 }} label="שם מתכון" {...register("Name")} error={!!errors.Name} helperText={errors.Name?.message} />
                <br />
                <TextField style={{ width: '20%', backgroundColor: "whitesmoke", opacity: 0.7 }} label="תאור" {...register("Description")} error={!!errors.Description} helperText={errors.Description?.message} />
                <br />
                <FormControl style={{ width: '20%', backgroundColor: "whitesmoke", opacity: 0.7 }}>
                    <InputLabel>קטגוריה</InputLabel>
                    <Select {...register("CategoryId")} error={!!errors.CategoryId} displayEmpty>
                        {Categories.map((x) => (
                            <MenuItem key={x.Id} value={x.Id}>
                                {x.Name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <br />
                <TextField style={{ width: '20%', backgroundColor: "whitesmoke", opacity: 0.7 }} label="כתובת תמונה" {...register("Img")} error={!!errors.Img} helperText={errors.Img?.message} />
                <br />
                <TextField style={{ width: '20%', backgroundColor: "whitesmoke", opacity: 0.7 }} label="משך זמן הכנה" type="input" {...register("Duration")} error={!!errors.Duration} helperText={errors.Duration?.message} />
                <br />
                <FormControl style={{ width: '20%', backgroundColor: "whitesmoke", opacity: 0.7 }}>
                    <InputLabel>רמת קושי</InputLabel>
                    <Select {...register("Difficulty")} error={!!errors.Difficulty} displayEmpty helperText={errors.Difficulty?.message}>
                        <MenuItem value={1}>קל</MenuItem>
                        <MenuItem value={2}>בינוני</MenuItem>
                        <MenuItem value={3}>קשה</MenuItem>
                        <MenuItem value={4}>קשה מאד</MenuItem>
                    </Select>
                </FormControl>
                <br />
                <div >
                    {Ingrident?.map((item, index) => (
                        <div class="card" key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: 0.8 }}>
                            <TextField type="text" label="מוצר"  {...register(`Ingrident.${index}.Name`)} />
                            <TextField label="כמות:" {...register(`Ingrident.${index}.Count`)} />
                            <TextField type="text" label="סוג:" {...register(`Ingrident.${index}.Type`)} />
                            <Button variant="outlined" startIcon={<Remove />} onClick={() => removeIngr()}>
                                הסר מוצר
                            </Button>
                        </div>
                    ))}
                </div>
                <Button variant="outlined" startIcon={<AddIcon />} onClick={() => appendIngridents({ Name: "", Count: 0, Type: "" })}>
                    הוסף מוצר
                </Button>
                <div>
                    {Instructions?.map((item,index) => (
                        <div key={index}>
                            <TextField type="text" placeholder="הוראות הכנה" {...register(`Instructions.${index}`)} />
                            <Button variant="outlined" startIcon={<Remove />} onClick={() => removeInst(index)}>
                                הסר
                            </Button>
                        </div>
                    ))}
                </div>
                <Button variant="outlined" startIcon={<AddIcon />} onClick={() => appendInstructions(" ")}>
                    הוסף הוראה
                </Button>
                <br />
                <Button variant="contained" color="primary" type="submit">שמור ושלח</Button>
            </form>
        </div>
    );
}
