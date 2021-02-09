import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    getPostsTC as getPosts,
    setTagAC as setTag,
    getTagBackgroundTC as getTagBackground,
    setTagBackgroundAC as setTagBackground, addTagImageTC as addTagImage
} from "../../reducers/main_reducer";
import {Card, Skeleton, Tag, Button, Image} from 'antd';
import classes from './main.module.css'
import {NavLink} from "react-router-dom";
import {LoadingOutlined, PlusOutlined, FundOutlined, UploadOutlined} from '@ant-design/icons';
import AddPost from "../addPost/addPost";
import {Field, reduxForm} from "redux-form";

const Main = function () {
    let dispatch = useDispatch();
    const mainRef = useRef();
    const user_name = useSelector((state) => state.login.user_name);
    const [isAddPost, openAddPost] = useState(false);
    const [changeTag, openChangeTag] = useState(false)
    const tag = useSelector((state) => state.main.tag);
    const tag_back = useSelector((state) => state.main.tag_back);
    const IS_ALL = useSelector((state) => state.main.isAll)

    function mount() {
        dispatch(getPosts({page_count: page_count, tag: tag}))
        if (tag) {
            dispatch(getTagBackground(tag))
        }
    }

    let src;
    if (tag_back) {
        try {
            src = require(`./../../../backend/tags_backgrounds/${tag_back}`)
        } catch (error) {
            //nothing...
        }
    }
    let isSrc = tag_back && src && src.default;

    useEffect(mount, [tag])
    let posts = useSelector((state) => state.main.posts);
    const page_count = useSelector((state) => state.main.page_count)
    let elements = posts?.map((item, index) => <PostItem user_name={item.user}
                                                        title={item.title} background={item.post_image}
                                                        text={item.post_text} key={index} id={item.id}
                                                        tags={JSON.parse(item.tags)} setFilter={setFilter}
                                                        images={item.images}/>)

    function setFilter(value) {
        dispatch(setTag(value))
    }

    if (posts?.length === 0) {
        elements = [1, 1, 1].map((item, index) => <PreloaderCard key={index}/>)
    }
    const checkScroll = () => {
        dispatch(getPosts({page_count: page_count, tag: tag}))
    }

    function tagClose() {
        setFilter('');
        dispatch(setTagBackground(null));
    }


    function addPostClose() {
        openAddPost(false)
        dispatch(getPosts({page_count: page_count, tag: tag}))
    }

    return (
        <div className={classes.main} ref={mainRef}>
            <img src={isSrc} className={classes.background}/>
            {isAddPost && <AddPost close={addPostClose}/>}
            {changeTag && <ChangeTagsImage close={() => openChangeTag(false)}/>}
            {/*<AddPost close={addPostClose}/>*/}
            <div className={classes.cancelButtonWrapper}>{tag && <Tag closable onClose={tagClose}>{tag}</Tag>}</div>
            {user_name && <button onClick={() => openAddPost(true)} className={classes.plus}><PlusOutlined
                style={{fontSize: 45, color: '#6C6C6C'}}/></button>}
            {user_name &&
            <button onClick={() => openChangeTag(true)} className={classes.plus + ' ' + classes.changetag}>
                <FundOutlined style={{fontSize: 40, color: '#6C6C6C'}}/></button>}
            {elements}
            {!IS_ALL && <Button
                style={{
                    height: '50px',
                    width: '150px',
                    margin: '0 auto', display: 'block', fontSize: 20, marginTop: 40
                }} onClick={checkScroll}>Show more</Button>}
        </div>
    )
}
export const PostItem = function (props) {
    let descRef = useRef(null)
    let text = props.text.length > 388 ? props.text.slice(0, 388) + '...' : props.text;
    let setFilter = props.setFilter ? props.setFilter : () => {
    }
    let tags = props.tags.map((item, index) => <Tag onClick={() => setFilter(item)} key={index}>
        {item}</Tag>)

    function mount() {
        descRef.current.innerHTML = text
    }

    useEffect(mount, [])
    let images = JSON.parse(props.images).map((item,index) => <Image src={item} width={200} key={index}/>)
    return (
        <div>
            <Card title={props.title} extra={<NavLink to={`/card/${props.id}`}>Show more</NavLink>}
                  style={{
                      width: 800, maxHeight: 700, margin: '0 auto',
                      marginTop: 40
                  }}>
                <p ref={descRef} className={classes.desc}></p>
                <div className={classes.imagesBlock}>
                    {images}
                </div>
                <br/>
                {tags}
                {props.edit && <NavLink to={`/edit_post/${props.id}`}>
                    <button>edit</button>
                </NavLink>}
            </Card>
        </div>
    )
}

// <Tag>Tag 1</Tag>

const PreloaderCard = function () {
    return (
        <Card style={{width: 600, height: 300, margin: '0 auto'}}
        >
            <Skeleton loading={true} avatar active>
            </Skeleton>
        </Card>
    )
}

const ChangeTagsImage = function ({close}) {
    // <FundOutlined />
    let [image, setImage] = useState(null);
    const dispatch = useDispatch();

    function change({tag_name}) {
        let submit = {tag_name, background: image};
        dispatch(addTagImage(submit))
    }

    function addImage(event) {
        if (event.target.files.length > 0) {
            setImage(event.target.files[0])
        }
    }

    return (
        <ChangeTagsImageFormC onSubmit={change} addImage={addImage} close={close}/>
    )
}
const ChangeTagsImageForm = function (props) {
    const [main_class, changeMainClass] = useState(classes.changeTagMain)

    function mount() {
        // main.current.focus()
    }

    function close() {
        changeMainClass(classes.changeTagMainClosed);
        setTimeout(props.close, 400)
    }

    useEffect(mount, [])

    return (
        <form onSubmit={props.handleSubmit} className={main_class}>
            <h2 className={classes.changeTagTitle}>Change Tag Background:</h2>
            <h3 className={classes.changeTagTagName}>Tag name:</h3>
            <Field component={'input'} name={'tag_name'}
                   className={classes.changeTagInput} placeholder={'Name'} autoComplete={'off'}/>
            <div className={classes.changeTagBlock}>
                <Button style={{
                    height: '80%', width: '60%', margin: '0 auto', display: 'block', fontSize: 20,
                }}>
                    <UploadOutlined/> Add Image
                </Button>
                <input onChange={props.addImage} type={'file'} className={classes.inputFile}/>
                <input onChange={props.addImage} type={'file'} className={classes.anotherFile}/>
                <input onChange={props.addImage} type={'file'} className={classes.middleFile}/>
            </div>
            <div className={classes.changeTagSaveOrCancelBlock}>
                <Button
                    style={{
                        width: '40%', fontSize: 20, height: 50, margin: '0 auto'
                        , marginTop: 80, display: 'block'
                    }} onClick={close}>Cancel</Button>
                <Button type={'primary'}
                        style={{
                            width: '40%', fontSize: 20, height: 50, margin: '0 auto'
                            , marginTop: 80, display: 'block'
                        }} onClick={props.handleSubmit}>Save</Button>
            </div>
        </form>
    )
}
const ChangeTagsImageFormC = reduxForm({
    form: 'change_tags_image'
})(ChangeTagsImageForm)


export default Main