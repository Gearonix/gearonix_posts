import classes from './input.module.css';
export const Input= function({input,meta,...props}){

    let throw_error = meta.error && meta.touched && !meta.active;
    let isError = throw_error ? classes.input_error : null
    return(
        <div className={isError}>
            <input {...input}{...props} ></input>
            <span>{throw_error && meta.error}</span>
        </div>
    )
}

