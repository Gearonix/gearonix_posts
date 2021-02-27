import classes from './header.module.css'
import {NavLink} from "react-router-dom";
import {LoginOutlined,SettingFilled} from '@ant-design/icons';
const Header = function(){
    const iconStyle = {marginRight : 10,
    color : 'rgba(216, 216, 216, 1)'}
    return(
        <div className={classes.main}>
            <NavLink to={'/'} className={classes.logo}><SettingFilled style={iconStyle}/>Gearonix Posts</NavLink>
            <NavLink to={'/login'} className={classes.login}><LoginOutlined style={iconStyle} />Login</NavLink>
        </div>
    )
}


export default Header