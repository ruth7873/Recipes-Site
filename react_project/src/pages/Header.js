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
      title: "See You Later...",
      text: `good buy ${user.Name}!!!`,
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
          <StyledLink to="/login">Log in</StyledLink>
          <StyledLink to="/signUp">Sign Up</StyledLink>
        </div>
      ) : (
        <div>
          <StyledLink to="/homePage">Home Page</StyledLink>
          <StyledLink to="/recipe">Recipes</StyledLink>
          <StyledLink to="/myrecipe">My Recipes</StyledLink>
          <StyledLink to="/shopping">Shopping</StyledLink>
          <StyledLink onClick={onLogOut} to="/login">
            Change User
          </StyledLink>
          <p style={{ top: '-15px', left: '15px', position: 'absolute' }}>the current user: {user.Name}</p>
        </div>
      )}
    </div>
  );
}
