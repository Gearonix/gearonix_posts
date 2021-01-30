import {Field, reduxForm} from "redux-form";
import {useDispatch, useSelector} from "react-redux";
import {NavLink, Redirect} from 'react-router-dom';
import {addPostTC as addPost, setSelectedPostAC as setSelectedPost} from "../../reducers/main_reducer";
import {useState,useRef} from "react";
import {Button, Tag, Upload} from 'antd';
import classes from './addPost.module.css';
import {UploadOutlined} from '@ant-design/icons';
import {useEffect} from "react";
const AddPost = function ({edit_data,edit_post}){
    const dispatch = useDispatch();
    const user_name = useSelector((state) => state.login.user_name);
    let [redirect,openRedirect] = useState(false);
    let [back,setBack] = useState(null);
    let [tags,addTags] = useState([])
    // useEffect(mount,[])
    if (!user_name){
        return <Redirect to={'/login'} />
    }
    // function mount(){
    //     return () => dispatch(setSelectedPost(null))
    // }
    async function onSubmit(data){
        //todo : добавить теги, не оставлять так!!!
        let submit = {...data,user_name : user_name,tags : tags, background: back};
        let response = await dispatch(addPost(submit));
        if (response.data.code==0){
            openRedirect(true)
        }
    }
    if (redirect){
        return  <Redirect to={'/profile'} />
    }
    function setBackground(event){
        if (event.target.files.length>0){
            setBack(event.target.files[0])
        }
    }
    function addTagValue(value){
        if (!tags.includes(value) && value){
            addTags([...tags,value])
        }
    }
    function closeTag(value){
        addTags(tags.filter((item) => item!=value))
    }
    // closeTag
    console.log(tags)
    // <Tag>Tag 1</Tag>
    return <AddPostFormC onSubmit={onSubmit}
                         setBackground={setBackground} addTag={addTagValue}
                         tags={tags} close={closeTag} edit_data={edit_data} edit_post={edit_post}/>
}

const AddPostForm = function(props){
    let tags_ref = useRef(null)
    function onChange(){
        let value = tags_ref.current.value;
        console.log(value)
        if (value[value.length-1]==' '){
            props.addTag(value.replace(' ',''));
            tags_ref.current.value = ''
        }
    }

    // debugger
    let editTags = props?.edit_data ? JSON.parse(props?.edit_data?.tags) : props.tags

    let tagsElements = editTags.map((item) => <Tag closable onClose={() => props.close(item)}
    >{item}</Tag>);
    // onChange={props.setBackground}
    function mount(){
        console.log(props?.edit_data);
        // debugger
        props.initialize({ title: props?.edit_data?.title , description: props?.edit_data?.post_text});
    }
    useEffect(mount,[]);
    const addOrChange = props.edit_post ? 'Change' : 'Add'
    return(
        <form onSubmit={props.handleSubmit} className={classes.main}>
            <NavLink to={'/profile'} className={classes.back}>back</NavLink>
            <div className={classes.mainBlock}>
            <h1 className={classes.title}>{addOrChange} new Post:</h1>
            <div className={classes.titleBlock}>
            <div className={classes.postTitleField}>
            <h3 className={classes.postTitleh1}>Title:</h3>
            <Field component={'input'} name={'title'} className={classes.input}
                   autoComplete={'off'} placeholder={'write title'}/>
            </div>
            <div className={classes.backgroundBlock}>
            <Button style={{height: '100%',width: '90%',margin : '0 auto',display : 'block'}}>
                <UploadOutlined /> {addOrChange} background
            </Button>
            <input  onChange={props.setBackground} type={'file'} className={classes.inputFile}/>
            <input  onChange={props.setBackground} type={'file'} className={classes.anotherFile}/>
            <input  onChange={props.setBackground} type={'file'} className={classes.middleFile}/>
            </div>
            </div>
            {/*<div className={classes.descBlock}>*/}
            <h3 className={classes.postTitleh1+' '+classes.twiceTitle}>Description:</h3>
            <Field component={'textarea'} name={'description'} className={classes.textarea} placeholder={'Write description'}/>
            {/*</div>*/}
            <h3 className={classes.postTitleh1+' '+classes.twiceTitle}>{addOrChange} Tags:</h3>
            <input type="text" ref={tags_ref} onChange={onChange} className={classes.input} placeholder={'Add tags'} />
            <div className={classes.tagsBlock}>{tagsElements}</div>
            <button className={classes.saveButton}>Save!</button>
            </div>
        </form>
    )
}

const AddPostFormC = reduxForm({
    form : 'add_post'
})(AddPostForm)

export default AddPost
