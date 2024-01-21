import { Link } from "react-router-dom"
import { useSelector } from "react-redux/es/hooks/useSelector"
import { useDispatch } from "react-redux";
import * as Actions from "../store/action"
import { styled } from '@mui/system';
import { grey } from '@mui/material/colors';
import Swal from "sweetalert2";


export default  ()=> {
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();
  const onLogOut = () => {
    Swal.fire({
      icon: "info",
      title: "!!!נשמח לראותך שוב",
      text: `!להתראות ${user.Name}`,
      showConfirmButton: false,
      timer: 2500
    });
    dispatch({ type: Actions.SET_USER, user: null });
  }
  const StyledLink = styled(Link)`
  color: ${grey};
  text-decoration: none;
  margin-right: ${(props) => props.theme.spacing(2)};`;
  return (
    <div>
      {!user ? (
        <div>
          <StyledLink to="/login">כניסה</StyledLink>
          <StyledLink to="/signUp">הרשמה</StyledLink>
        </div>
      ) : (
        <div>
          <StyledLink to="/homePage">דף הבית</StyledLink>
          <StyledLink to="/recipe">מתכונים</StyledLink>
          <StyledLink to="/myrecipe">המתכונים שלי</StyledLink>
          <StyledLink to="/shopping">קניות</StyledLink>
          <StyledLink onClick={onLogOut} to="/login" >
            התנתקות 
          </StyledLink>
          <p style={{ top: '-15px', left: '15px', position: 'absolute' }}>המשתמש הנוכחי:  {user.Name}</p>
        </div>
      )}
    </div>
  );
}
