import API from "../API";
const initial = {
    posts : [],
    page_count : 4,
    tag : '',
    selected_post : null,
    tag_back : null,
    isAll : false
}
const main_reducer = function(state = initial,action){
    switch (action.type){
        case 'SET-POSTS':
            return {...state, posts :action.data, page_count : state.page_count+4}
        case 'SET-TAG':
            return {...state,tag : action.value}
        case 'SET-SELECTED-POST':
            return {...state,selected_post: action.data}
        case 'GET-TAG-BACKGROUND':
            return {...state,tag_back : action.image}
        case 'IS-ALL':
            return {...state,isAll : action.bool}
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
export let isAllAC = function(bool){
    return{
        type : 'IS-ALL',
        bool : bool
    }
}

export let getPostsTC = function(data){
    return async function(dispatch){
        let response = await API.getPosts(data);
        let total_count = 0;
        if (response.data.total_count){
            total_count = Number(Object.values(response.data.total_count)[0])
        }
        if (data.page_count>total_count){
            dispatch(isAllAC(true))
        }

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
        // debugger
        // debugger
        if (!data.description){
            return 'Background is required'
        }
        if (!data.title){
            return 'Title is required'
        }
        if (data.images.length>2){
            return 'You cannot add more than two pictures '
        }
        if (data.videos.length>2){
           return 'You cannot add more than two videos '
        }

        let response = await API.addPost(data);
        return response
    }
}
export let changePostTC = function(id,data){
    return async function(dispatch){
        let response = await API.changePost(+id,data);
        return response
    }
}
export let addTagImageTC = function(data){
    return async function(dispatch){
        await API.addTagImage(data)
        //todo : DISPATCH ACTION!!!
    }
}
export let setTagBackgroundAC = function(image){
    return{
        type : 'GET-TAG-BACKGROUND',
        image
    }
}
export let getTagBackgroundTC = function(value){
    return async function(dispatch){
        let response = await API.getTagBackground(value)
        if  (!response.data.data){
            return
        }
        dispatch(setTagBackgroundAC(response.data.data.image))
    }
}
export default main_reducer