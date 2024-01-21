import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector"
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Image from '../images/aa.jpg'
import { getBuies, deleteProd, editAdd } from "../service/shopping";
import { Print } from "@mui/icons-material";

export default () => {
    const { user, buies } = useSelector(state => ({
        user: state.user.user,
        buies: state.buy.buies
    }))
    const dispatch = useDispatch();

    useEffect(() => {
        if (!buies.length)
            dispatch(getBuies(user));
    }, [])
    function removeProd(name, id, count) {
        if (count - 1 == 0)
            dispatch(deleteProd(user, name, id))
        else
            dispatch(editAdd(name, -1, user))
    }
    return <div className="shopping">
        {buies.length ? <Button size="small" startIcon={<Print />} onClick={() => (
            window.print()
        )}>
            להדפסת רשימת הקניות
        </Button> : <h2>רשימת הקניות ריקה!!!</h2>}
        {buies?.map((x, id) => (
            <div key={id}>
                <div>{x.Name}</div>
                <div>{x.Count}</div>

                <Button variant="outlined" startIcon={<AddIcon />} onClick={() => dispatch(editAdd(x.Name, 1, user))}>
                </Button>
                <Button variant="outlined" startIcon={<RemoveIcon />} onClick={() => removeProd(x.Name, x.Id, x.Count)}>
                </Button>
                <Button variant="outlined" startIcon={<CheckIcon />} onClick={() => dispatch(deleteProd(user, x.Name, x.Id))}>
                    !קניתי
                </Button>
            </div>
        ))}
        <img src={Image} style={{ width: '50%', opacity: 0.5, borderRadius: 60 }} alt="shopping"></img>
    </div>
}