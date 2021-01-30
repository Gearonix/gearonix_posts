import API from "../API";
const initial = {
    posts : [],
    page_count : 4,
    tag : '',
    selected_post : null
}
const main_reducer = function(state = initial,action){
    switch (action.type){
        case 'SET-POSTS':
            return {...state, posts :action.data, page_count : state.page_count+4}
        case 'SET-TAG':
            return {...state,tag : action.value}
        case 'SET-SELECTED-POST':
            return {...state,selected_post: action.data}
        default:
            return state
    }
}
export let setPostsAC = (data) => {
    return{
        type: 'SET-POSTS',
        data : data
    }
}
export let setSelectedPostAC = function(data){
    return{
        type : 'SET-SELECTED-POST',
        data : data
    }
}

export let getPostsTC = function(data){
    return async function(dispatch){
        let response = await API.getPosts(data);
        dispatch(setPostsAC(response.data.data))
    }
}
export let setTagAC = function(value){
    return{
        type : 'SET-TAG',
        value : value
    }
}
export let getOnePostTC = function(data){
    return async function(dispatch){
        let response = await API.getOnePost(data);
        if (response.data.status!=200){
            dispatch(setSelectedPostAC({error : true}))
            return
        }
        dispatch(setSelectedPostAC(response.data.data))
    }
}
export let addPostTC = function(data){
    return async function(dispatch){
        let response = await API.addPost(data);
        console.log(response.data)
        // debugger
        return response
    }
}

export default main_reducer