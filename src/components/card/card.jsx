import {useLocation, NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {Card, Button, Skeleton, Empty, Tag, Image} from 'antd'
import classes from './card.module.css';
import {getOnePostTC as getOnePost, getTagBackgroundTC as getTagBackground} from "../../reducers/main_reducer";
import {useEffect,useRef} from "react";
import {MediaPlayer} from "../addPost/addPost";
import {Telegram,VK} from 'react-social-sharing';
const MainCard = function(){
    const location = useLocation();
    const dispatch = useDispatch();
    const description = useRef()
    let card_id = location.pathname.split('/')[2];
    const tag = useSelector((state) => state.main.tag);
    // selected_post
    function mount(){
            dispatch(getOnePost({id : card_id}))
            parseDescription()
    }
    useEffect(mount,[])
    const data = useSelector((state) => state.main.selected_post);
    if (!data){
        return <PreloaderCard />
    }
    let src;
    if (data.post_image){
        try {
            src = require(`./../../../backend/backgrounds/${data.post_image}`);
        }
        catch (error){
            //nothing...
        }
    }
    // tag_back

    let isSrc = data.post_image && src && src.default;
    let tags = JSON.parse(data.tags).map((item) => <Tag>{item}</Tag>);
    let images = JSON.parse(data?.images).map((item) => <Image
        width={350}
        src={item}
    />);
    let videos = JSON.parse(data?.videos).map((item) => <MediaPlayer url={item} />)
    function parseDescription(){
        if (description.current){
            description.current.innerHTML=data?.post_text
        }

    }
    const path = 'http://localhost:3000'+location.pathname
    return(
        <div className={classes.main}>
           <div className={classes.cancelButtonWrapper}>
               <NavLink to={'/'}><Button dashed>Cancel</Button></NavLink></div>
            {data?.error ?

                <Empty style={{transform: 'scale(3) translate(-25%,0)',position: 'absolute',left : '50%',top : '50%'}} />
                :
                <Card title={data.title} style={{ width: 1200, minHeight : 600 ,margin : '0 auto' , marginTop: 20}}>
                    <p ref={description} className={classes.description}></p>
                    <p className={classes.user}>{data.user}</p>
                    {tags}
                    {videos}
                    {images}
                    <Telegram link={location.pathname} />
                    <VK link={path} />
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