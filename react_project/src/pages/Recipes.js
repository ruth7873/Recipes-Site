import { useState, useEffect } from 'react'
import Recipe from './Recipe';
import { useSelector } from "react-redux/es/hooks/useSelector"
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { TextField, Select, MenuItem, InputLabel, CardMedia, CardActions, Card } from '@mui/material';
import { useLocation } from 'react-router-dom/dist';
import { deleteRecipe, getRecipes } from '../service/recipes';
import { AddCategory, getCategories } from '../service/category';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CategoryIcon from '@mui/icons-material/Category';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import Swal from 'sweetalert2'

export default () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedDuration, setSelectedDuration] = useState(null);
    const [selectedDifficulty, setSelectedDifficulty] = useState(null);
    const [ifAddCategory, SetIfAddCategory] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    const { pathname } = useLocation()
    const { user, recipes, categories } = useSelector(state => ({
        user: state.user.user,
        recipes: state.recipe.recipes.filter(x => pathname === '/recipe' || x.UserId === state.user.user.Id),
        categories: state.category.categories
    }))
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        if (!recipes.length)
            dispatch(getRecipes());
        if (!categories.length)
            dispatch(getCategories())
    }, [])
    const handleCategoryChange = (event) => {
        const selectedCategoryId = event.target.value;
        setSelectedCategory(selectedCategoryId);
    };
    const handleDurationChange = (event) => {
        const selectedDuration = event.target.value;
        setSelectedDuration(selectedDuration);
    };
    function checkDuration(recipe_duration) {
        switch (selectedDuration) {
            case 60:
                return (recipe_duration >= 60);
            case 45:
                return (recipe_duration >= 45 && recipe_duration < 60);
            case 30:
                return (recipe_duration >= 30 && recipe_duration < 45);
            case 15:
                return (recipe_duration >= 0 && recipe_duration < 30);
            default: return false;
        }
    }
    const handleDifficultyChange = (event) => {
        const selectedDifficulty = event.target.value;
        setSelectedDifficulty(selectedDifficulty);
    };
    function deleteR(Id) {
        Swal.fire({
            title: "?האם אתה בטוח",
            text: "?אתה בטוח שהינך רוצה למחוק את המתכון לצמיתות",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "!כן, מחק",
            cancelButtonText:"!!!!לא"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "נמחק!",
                    text: "המכון נמחק בהצלחה.",
                    icon: "success"
                });
                dispatch(deleteRecipe(Id))
            }
        });
    }
    return (<div className='recipes'>
        <br />
        <Button variant="outlined" startIcon={<AddIcon />} onClick={() => (navigate('/recipe/add'), { state: null })}>
            הוסף מתכון
        </Button>
        <br />
        <div style={{ display: 'inline-flex' }}>
            {/* <InputLabel>קטגוריה</InputLabel> */}
            {<CategoryIcon/>}
            <Select onChange={handleCategoryChange} value={selectedCategory || ''}>
                <MenuItem value="">
                    <em>ללא</em>
                </MenuItem>
                {categories.map((x) => (
                    <MenuItem key={x.Id} value={x.Id}>
                        {x.Name}
                    </MenuItem>
                ))}
            </Select>
            {/* <InputLabel>משך זמן הכנה</InputLabel> */}
            {<AlarmOnIcon/>}
            <Select onChange={handleDurationChange} value={selectedDuration || ''}>
                <MenuItem value=""><em>ללא</em></MenuItem>
                <MenuItem value={15}>15 דקות</MenuItem>
                <MenuItem value={30}>30 דקות</MenuItem>
                <MenuItem value={45}>45 דקות</MenuItem>
                <MenuItem value={60}>שעה ויותר</MenuItem>
            </Select>
            {/* <InputLabel>רמת קושי</InputLabel> */}
            {<SignalCellularAltIcon/>}
            <Select onChange={handleDifficultyChange} value={selectedDifficulty || ''}>
                <MenuItem value=""><em>ללא</em></MenuItem>
                <MenuItem value={1}>קל</MenuItem>
                <MenuItem value={2}>בינוני</MenuItem>
                <MenuItem value={3}>קשה</MenuItem>
                <MenuItem value={4}>קשה מאד</MenuItem>
            </Select>
        </div>
        <br />
        <Button variant="outlined" startIcon={<AddIcon />} onClick={() => SetIfAddCategory(true)}>הוסף קטגוריה</Button>
        <br />
        {ifAddCategory ?
            <TextField style={{ width: '20%' }} label="הכנס שם קטגוריה"
                onBlur={(e) => {
                    dispatch(AddCategory(e.target.value));
                    SetIfAddCategory(false)
                }} />
            : null}
        {recipes.map(x => (!selectedCategory || x.CategoryId === selectedCategory) &&
            (!selectedDuration || checkDuration(x.Duration)) &&
            (!selectedDifficulty || selectedDifficulty === x.Difficulty) ?
            <div key={x.Id}>
                <Card sx={{ maxWidth: 500 }} style={{ marginLeft: 50, opacity: 0.8}}>
                    <h1>{x.Name}</h1>
                    <CardMedia className='card'
                        component="img"
                        alt="image"
                        image={x.Img}
                    />
                    <CardActions className='cardAction'>
                        <Button size="small" startIcon={<ExpandMoreIcon />} onClick={() => {
                            setShowDetails(true);
                            setSelectedRecipe(x);
                        }}
                        >להצגת פרטי המתכון</Button>
                        <Button size="small" startIcon={<DeleteIcon />} disabled={x.UserId !== user.Id} onClick={() => deleteR(x.Id)} >
                            מחק
                        </Button>
                        <Button size="small" startIcon={<EditIcon />} disabled={x.UserId !== user.Id} onClick={() => (
                            navigate('/recipe/edit', { state: x })
                        )}>
                            ערוך
                        </Button>
                    </CardActions>
                </Card>

                {showDetails && selectedRecipe && selectedRecipe.Id === x.Id ? (
                    <Recipe props={selectedRecipe} />
                ) : null}
            </div>
            : null)
        }
    </div >
    );
}

