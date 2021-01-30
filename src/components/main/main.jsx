import {useEffect,useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getOnePostTC as getOnePost, getPostsTC as getPosts, setTagAC as setTag} from "../../reducers/main_reducer";
import {Card, Skeleton, Spin, Tag,Button} from 'antd';
import classes from './main.module.css'
import {NavLink, useLocation} from "react-router-dom";
import {LoadingOutlined } from '@ant-design/icons';

const Main = function(){
    let dispatch = useDispatch();
    const mainRef = useRef()
    const tag = useSelector((state) => state.main.tag)
    function mount(){
        dispatch(getPosts({page_count :page_count,tag: tag}))
    }
    useEffect(mount,[tag])
    let posts = useSelector((state) => state.main.posts);
    const page_count = useSelector((state) => state.main.page_count)
    let elements = posts.map((item,index) => <PostItem user_name={item.user}
    title={item.title} background={item.post_image} text={item.post_text} key={index} id={item.id}
    tags={JSON.parse(item.tags)} setFilter={setFilter}/>)
     function setFilter (value){
        dispatch(setTag(value))
    }
    if (posts.length==0){
        elements = [1,1,1].map((item) => <PreloaderCard />)
    }
    const checkScroll = () => {
        const main = mainRef.current
        if (main.scrollTop>=main.scrollHeight-450){

            dispatch(getPosts({page_count :page_count,tag: tag}))
        }
    }
    //todo : решить проблему с prealoder
    const antIcon = <LoadingOutlined style={{
        fontSize: 55, color : 'rgba(175, 175, 175, 1)', margin : '0 auto', textAlign : 'center'}} spin />;
    return(
        <div className={classes.main} onScroll={checkScroll} ref={mainRef}>
            <div className={classes.cancelButtonWrapper}>{tag && <Tag closable onClose={() => setFilter('')}>{tag}</Tag>}</div>
            {elements}
            <div className={classes.preloader}><Spin size={'large' } indicator={antIcon}/></div>
        </div>
    )
}
export const PostItem = function(props){
    let text = props.text.length>388 ? props.text.slice(0,388)+'...' : props.text;
    let setFilter = props.setFilter ?  props.setFilter : () => {}
    let tags = props.tags.map((item) => <Tag onClick={() => setFilter(item)}>{item}</Tag>)
    return(
        <div>
        <Card title={props.title} extra={<NavLink to={`/card/${props.id}`}>Show more</NavLink>}
              style={{ width: 800, height : 400 ,margin : '0 auto' ,
        marginTop: 40}}>
            <p>{text}</p>
            <p>{ props.user_name}</p>
            {tags}
            {props.edit && <NavLink to={`/edit_post/${props.id}`}><button>edit</button></NavLink>}
        </Card>
    </div>
    )
}

// <Tag>Tag 1</Tag>

const PreloaderCard = function(){
    return(
            <Card  style={{ width: 600, height : 300 ,margin : '0 auto'}}
                    >
                <Skeleton loading={true} avatar active>
                </Skeleton>
            </Card>
        )
}


export default Main