import classes from './header.module.css'
import {NavLink} from "react-router-dom";
import {LoginOutlined} from '@ant-design/icons';
const Header = function(){
    return(
        <div className={classes.main}>
            <NavLink to={'/login'} className={classes.login}><LoginOutlined style={{marginRight : 20,
            color : 'rgba(216, 216, 216, 1)'}} />Login</NavLink>
        </div>
    )
}


export default Header