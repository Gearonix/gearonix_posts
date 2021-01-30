import {useLocation, Redirect, NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {Card, Button, Skeleton, Empty, Tag} from 'antd'
import classes from './card.module.css';
import {getOnePostTC as getOnePost} from "../../reducers/main_reducer";
import {useEffect} from "react";

const MainCard = function(){
    const location = useLocation();
    const dispatch = useDispatch();
    let card_id = location.pathname.split('/')[2]
    // selected_post
    function mount(){
            dispatch(getOnePost({id : card_id}))
    }
    useEffect(mount,[])
    const data = useSelector((state) => state.main.selected_post);
    console.log(data);
    if (!data){
        return <PreloaderCard />
    }
    console.log(data)
    let src;
    if (data.post_image){
        try {
            src = require(`./../../../backend/backgrounds/${data.post_image}`);
        }
        catch (error){
            //nothing...
        }
    }
    let isSrc = data.post_image && src && src.default;
    console.log('ISSRC' + isSrc)
    let tags = JSON.parse(data.tags).map((item) => <Tag>{item}</Tag>)
    return(
        <div className={classes.main}>
           <div className={classes.cancelButtonWrapper}>
               <NavLink to={'/'}><Button dashed>Cancel</Button></NavLink></div>
            {data?.error ?

                <Empty style={{transform: 'scale(3) translate(-25%,0)',position: 'absolute',left : '50%',top : '50%'}} />
                :
                <Card title={data.title} style={{ width: 1000, height : 600 ,margin : '0 auto' , marginTop: 20}}>
                    <p >{data.post_text}</p>
                    <p>{data.user}</p>
                    {tags}
                </Card>

            }
            <img src={isSrc} className={classes.backgroundImage}/>

        </div>
    )
}

export const PreloaderCard = function(){
    return(
        <Card  style={{ width: 600, height : 300 ,margin : '0 auto'}}
        >
            <Skeleton loading={true} avatar active>
            </Skeleton>
        </Card>
    )
}

export default MainCard;