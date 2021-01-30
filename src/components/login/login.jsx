import {Field,reduxForm} from "redux-form";
import {useDispatch, useSelector} from "react-redux";
import {loginTC as login} from "../../reducers/login_reducer";
import classes from './login.module.css'
import {loginVal} from "../../others/validator";
import {Input} from './../others/inputs/input';
import {Redirect} from 'react-router-dom';

const LoginForm = function(props){
    const data = useSelector((state) => state.login);
    if (data.user_id){
        return <Redirect to={'/profile'} />
    }
    return(
        <form onSubmit={props.handleSubmit}>
    <div className={classes.loginBlock}>

    <h1 className={classes.title+' '+classes.titleFirst}>Hello.</h1>
<h1 className={classes.title}>Welcome back</h1>
<h4 className={classes.inputTitle}>Name:</h4>
 <Field component={Input} name={'user_name'} className={classes.input} autoComplete={'off'}
        validate={loginVal}/>
<h4 className={classes.inputTitle}>Password:</h4>
<Field component={Input} name={'password'}  className={classes.input} autoComplete={'off'} validate={loginVal} />
<button className={classes.loginButton}>Login</button>
<span className={classes.error}>{props.error}</span>
</div>
</form>
    )
}
// form onSubmit={props.handleSubmit}>
//     <div className={classes.loginBlock}>
//
//     <h1 className={classes.title+' '+classes.titleFirst}>Hello.</h1>
// <h1 className={classes.title}>Welcome back</h1>
// <h4 className={classes.inputTitle}>Name:</h4>
//  <Field component={'input'} name={'user_name'} />
// <h4 className={classes.inputTitle}>Password:</h4>
// <Field component={'input'} name={'password'} />
// <NavLink to={'/register'} className={classes.back}>Register</NavLink>
// <button className={classes.loginButton}>Login</button>
// <span className={classes.error}>{props.error}</span>
// </div>
// </form>
const LoginFormC = reduxForm({
    form : 'login'
})(LoginForm)
const Login = function(){
    const dispatch = useDispatch()

    const onSubmit = (data) => {
        dispatch(login(data))
    }
    return <LoginFormC onSubmit={onSubmit}/>
}
export default Login