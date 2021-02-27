import {Field, reduxForm} from "redux-form";
import {useDispatch, useSelector} from "react-redux";
import {loginTC as login, registerTC as register} from "../../reducers/login_reducer";
import classes from './login.module.css'
import {loginVal} from "../../others/validator";
import {Input} from './../others/inputs/input';
import {NavLink, Redirect} from 'react-router-dom';

const LoginForm = function (props) {
    const data = useSelector((state) => state.login);
    if (data.user_id) {
        return <Redirect to={'/'}/>
    }
    const isRegister = props.mode=='register'
    console.log(isRegister)
    const isREgisterbutton = isRegister ? classes.registerButton : null
    return (
        <form onSubmit={props.handleSubmit}>
            <div className={classes.loginBlock}>
                <h1 className={classes.title + ' ' + classes.titleFirst}>{isRegister ? 'Register' : 'Hello.'}</h1>
                {!isRegister && <h1 className={classes.title}>Welcome back</h1>}
                <h4 className={classes.inputTitle}>Name:</h4>
                <Field component={Input} name={'user_name'} className={classes.input} autoComplete={'off'}
                       validate={loginVal}/>
                <h4 className={classes.inputTitle}>Password:</h4>
                <Field component={Input} name={'password'} className={classes.input} autoComplete={'off'}
                       validate={loginVal}/>
                <NavLink to={isRegister ? '/login' : '/register'} className={classes.back}>or {isRegister ? 'login' : 'register'}</NavLink>
                <button className={classes.loginButton+' '+ isREgisterbutton}>
                    {isRegister ? 'Sign up!' : 'Login'}</button>
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
    form: 'login'
})(LoginForm)
const Login = function ({mode}) {
    const dispatch = useDispatch()
    const callback = mode=='register' ? register : login
    const onSubmit = (data) => {
        dispatch(callback(data))
    }
    return <LoginFormC onSubmit={onSubmit} mode={mode}/>
}
export default Login