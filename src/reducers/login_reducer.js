import API from "../API";
import {stopSubmit} from "redux-form";

const initial = {
    user_name : null,
    user_id : null,
    password : null,
    myPosts : [],
}
const login_reducer = function(state = initial,action){
    switch (action.type){
        case 'LOGIN':
            return {...state,user_name: action.data.user,password: action.data.password,user_id: action.data.id}
        case 'SET-MY-POSTS':
            return {...state, myPosts: action.data}
        default:
            return state
    }
}
export let loginAC = function(data){
    return {
        type : 'LOGIN',
        data : data
    }
}
export let loginTC = function(data){
    return async function(dispatch){
        let response = await API.login(data);
        if (response.data.code!==0){
            let error = stopSubmit('login',{_error : response.data.message})
            dispatch(error);
            return
        }
        dispatch(loginAC(response.data.data))

    }
}
export let getMyPostsTC = function(data){
    return async function(dispatch){
        let response = await API.getMyPosts(data);
        // debugger
        dispatch(setMyPostsAC(response.data.data))

    }
}
export let setMyPostsAC = function(data){
    return{
        type : 'SET-MY-POSTS',
        data : data
    }
}
export default login_reducer