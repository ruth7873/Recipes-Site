import { useDispatch } from 'react-redux'
import { useSelector } from "react-redux/es/hooks/useSelector"
import Button from '@mui/material/Button';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { editAdd } from '../service/shopping';
import { Print } from '@mui/icons-material';

export default (props) => {
    const { user, categories } = useSelector(state => ({
        user: state.user.user,
        categories: state.category.categories
    }))

    const dispatch = useDispatch();
    const difficulty = ["קל", "בינוני", "קשה", "קשה מאד"]
    return (
        <Card sx={{ maxWidth: 500 }} style={{ marginLeft: 50, opacity: 0.8 }}>
            <CardContent>
                <div variant="body2" color="text.secondary">
                    <h2>{props.props.Description}</h2>
                    <h3>Category:</h3>
                    <div>{categories[props.props.CategoryId - 1]?.Name}</div>
                    <h3>Duration:</h3>
                    <div> {props.props.Duration} minutes</div>
                    <h3> Difficulty:</h3>
                    <div>{difficulty[props.props.Difficulty - 1]}</div>
                    <h3>Ingrident:</h3>{props.props.Ingrident.map((x, i) =>
                        <div key={i}>
                            <div>{x.Name} {x.Count} {x.Type}</div>
                            <Button variant="outlined" startIcon={<ShoppingBasketIcon />} onClick={() => dispatch(editAdd(x.Name, 1, user))}>
                                BUY
                            </Button>
                        </div>)}
                    <h3>Instructions:</h3>
                    {props.props.Instructions.map((x, i) =>
                        <div key={i}>
                            {x}</div>)}
                            <hr/>
                    <Button size="small" startIcon={<Print />} onClick={() => (
                        window.print()
                    )}>
                        Print
                    </Button>
                </div>
            </CardContent>
            <CardActions>
            </CardActions>
        </Card>
    );
}