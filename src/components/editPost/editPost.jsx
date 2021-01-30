import {useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getOnePostTC as getOnePost} from "../../reducers/main_reducer";
import {useEffect} from "react";
import AddPost from "../addPost/addPost";
import {setSelectedPostAC as setSelectedPost} from "../../reducers/main_reducer";
import {PreloaderCard} from "../card/card";

const EditPost = function (props){
    const location = useLocation();
    const dispatch = useDispatch();
    let card_id = location.pathname.split('/')[2]
    // selected_post
    function mount(){
        // debugger
        dispatch(getOnePost({id : card_id}))
    }
    useEffect(mount,[])
    const data = useSelector((state) => state.main.selected_post);
    let nextData = data;
    if (data?.id!=card_id){
        return <PreloaderCard />
    }
    return(
        <AddPost edit_data={nextData} edit_post={true}/>
    )

}

export default EditPost