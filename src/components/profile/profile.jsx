import {Button, Card} from 'antd';
import {NavLink, Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import classes from './profile.module.css';
import {getMyPostsTC as getMyPosts} from "../../reducers/login_reducer";
import {useEffect} from "react";
import {PostItem} from "../main/main";

const Profile = function(){
    const user_name = useSelector((state) => state.login.user_name);
    const myPosts = useSelector((state) => state.login.myPosts);
    const dispatch = useDispatch();
    useEffect(mount,[])
    if (!user_name){
        return <Redirect to={'/login'} />
    }
    function mount(){
        dispatch(getMyPosts({user_name : user_name}))
    }
    let posts = [...myPosts].map((item,index) => <PostItem user_name={item.user}
               title={item.title} background={item.post_image} text={item.post_text} key={index} id={item.id}
               tags={JSON.parse(item.tags)} edit={true} />).reverse()
    return(
        <div className={classes.main}>
            <div className={classes.titleBlock}>
            <h2 className={classes.title}>{user_name}</h2>
            </div>

            <h3 className={classes.yourPosts}>Your posts:</h3>
            <NavLink to={'/add_post'}><Button type="primary" style={{width: 265, height: 70 ,fontSize: 30 ,
                marginTop: 30,marginBottom: 30, marginLeft: 40}}>Add Post</Button></NavLink>
            <div className={classes.postBlock}>
            {posts}
            </div>
        </div>
    )
}

export default Profile