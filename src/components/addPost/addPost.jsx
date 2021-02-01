import {Field, reduxForm} from "redux-form";
import {useDispatch, useSelector} from "react-redux";
import {NavLink, Redirect} from 'react-router-dom';
import {addPostTC as addPost} from "../../reducers/main_reducer";
import {useState, useRef} from "react";
import {Button, Tag, Image} from 'antd';
import classes from './addPost.module.css';
import {UploadOutlined} from '@ant-design/icons';
import {useEffect} from "react";
import {changePostTC as changePost} from "../../reducers/main_reducer";
import {Media, Player} from 'react-media-player'
import ReactQuill from "react-quill";
import {Quill} from 'react-quill';
import quillEmoji from 'quill-emoji';
import 'react-quill/dist/quill.snow.css';
import {PreloaderCard} from "../card/card";


const {EmojiBlot, ShortNameEmoji, ToolbarEmoji, TextAreaEmoji} = quillEmoji;

const AddPost = function ({edit_data, edit_post, ...props}) {
    const dispatch = useDispatch();
    const user_name = useSelector((state) => state.login.user_name);
    const [error, addError] = useState('');
    let [redirect, openRedirect] = useState(false);
    let [back, setBack] = useState(null);
    let [tags, addTags] = useState(edit_data?.tags ? JSON.parse(edit_data?.tags) : []);
    let [field, changeFieldDesc] = useState('');
    let [videos, addVideos] = useState([]);
    let [images, addImages] = useState([]);
    let main_class = classes.main
    if (redirect) {
        main_class = classes.mainClose
        setTimeout(props.close, 700)
    }

    async function onSubmit(data) {
        let submit = {
            ...data, user_name: user_name, tags: tags, background: back, description: field,
            videos: videos, images: images
        };
        let func = edit_post ? () => dispatch(changePost(edit_data?.id, submit)) :
            () => dispatch(addPost(submit))
        let response = await func();
        if (response?.data?.code == 0) {
            openRedirect(true)
        }
    }

    function setBackground(event) {
        if (event.target.files.length > 0) {
            setBack(event.target.files[0])
        }
    }

    function addTagValue(value) {
        if (!tags.includes(value) && value && tags.length <= 10) {
            addTags([...tags, value])
        }
    }

    function closeTag(value) {
        addTags(tags.filter((item) => item != value))
    }

    function changeField(value) {
        changeFieldDesc(value)
    }

    function addVideoFunc(url) {
        addVideos([...videos, url])
    }

    function addImageFunc(url) {
        addImages([...images, url])
    }

    return <AddPostFormC onSubmit={onSubmit}
                         setBackground={setBackground} addTag={addTagValue}
                         tags={tags} close={closeTag} edit_data={edit_data} edit_post={edit_post}
                         changeField={changeField} addImageFunc={addImageFunc} addVideoFunc={addVideoFunc}
                         videos={videos} images={images} main_class={main_class}
                         close_form={() => openRedirect(true)} error={error}/>
}

Quill.register({
    'formats/emoji': EmojiBlot,
    'modules/emoji-shortname': ShortNameEmoji,
    'modules/emoji-toolbar': ToolbarEmoji,
    'modules/emoji-textarea': TextAreaEmoji
}, true);

const modulesQuill = {
    toolbar: {
        container: [
            [{'header': [1, 2, 3, 4, 5, 6, false]}],
            [{'font': []}],
            [{'align': []}],
            ['bold', 'italic', 'underline'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'color': ['#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff', '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff', '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff', '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2', '#444444', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466', 'custom-color']}, {'background': []}, 'link', 'emoji'],
        ],
        handlers: {
            'color': function (value) {
                if (value == 'custom-color') value = window.prompt('Enter Hex Color Code');
                this.quill.format('color', value);
            }
        }
    },
    keyboard: {
        bindings: {
            tab: false,
            custom: {
                key: 13,
                shiftKey: true,
                handler: function () {
                }
            },
            handleEnter: {
                key: 13,
                handler: function () {
                }
            }
        }
    },
    'emoji-toolbar': true,
    'emoji-textarea': true,
    'emoji-shortname': true,
};

const formatsQuill = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent', 'align',
    'link', 'image', 'background', 'color', 'emoji'
];


const AddPostForm = function (props) {
    let tags_ref = useRef(null);
    let [field, changeField] = useState('');
    let [videoForm, openVideoForm] = useState(false);
    let [showImageForm, openImageForm] = useState(false)

    function onChange() {
        let value = tags_ref.current.value;
        if (value[value.length - 1] == ' ') {
            props.addTag(value.replace(' ', ''));
            tags_ref.current.value = ''
        }
    }


    let tagsElements = props.tags.map((item) => <Tag closable onClose={() => props.close(item)}
    >{item}</Tag>);


    const addOrChange = props.edit_post ? 'Change' : 'Add';
    useEffect(() => props.changeField(field), [field]);

    function openVideoFormFunc(event) {
        event.preventDefault();
        openVideoForm(true)
    }

    function openImageFormFunc(event) {
        event.preventDefault();
        openImageForm(true)
    }

    return (
        <form onSubmit={props.handleSubmit} className={props.main_class}>
            <div className={classes.mainBlock}>
                <div className={classes.titleBlock}>
                    <div className={classes.postTitleField}>
                        <h3 className={classes.postTitleh1 + ' ' + classes.twiceTitle}>Title:</h3>
                        <Field component={'input'} name={'title'} className={classes.input}
                               autoComplete={'off'} placeholder={'Title'}/>
                    </div>
                    <div>
                        <h3 className={classes.postTitleh1 + ' ' + classes.twiceTitle}>Description:</h3>
                        <ReactQuill
                            modules={modulesQuill}
                            formats={formatsQuill}
                            onChange={changeField}
                            style={{width: 562, height: 178}}
                        /></div>
                </div>
                <div className={classes.backgroundBlock}>
                    <Button style={{
                        height: '100%', width: '90%', margin: '0 auto', display: 'block', fontSize: 20,
                    }}>
                        <UploadOutlined/> {addOrChange} background
                    </Button>
                    <input onChange={props.setBackground} type={'file'} className={classes.inputFile}/>
                    <input onChange={props.setBackground} type={'file'} className={classes.anotherFile}/>
                    <input onChange={props.setBackground} type={'file'} className={classes.middleFile}/>
                </div>
                <div className={classes.otherBlock}>
                    <div>
                        <h3 className={classes.postTitleh1 + ' ' + classes.twiceTitle}>{addOrChange} Tags:</h3>
                        <input type="text" ref={tags_ref} onChange={onChange}
                               className={classes.input + ' ' + classes.doubleInput}
                               placeholder={'Add tags'}/>
                    </div>
                    <div className={classes.tagsBlock}>{tagsElements}</div>
                    <div>
                        <h3 className={classes.postTitleh1 + ' ' + classes.twiceTitle + ' ' + classes.doYouWant}>{addOrChange} Do
                            you want to add image or youtube-video?</h3>
                        <div className={classes.addVideoOrImageBlock}>

                            <Button type={'default'} onClick={openVideoFormFunc}
                                    style={{width: 282, height: 58, fontSize: 25}}>Add Video</Button>
                            <Button type={'default'} onClick={openImageFormFunc}
                                    style={{width: 282, height: 58, fontSize: 25}}>Add Image</Button>
                        </div>
                    </div>
                    {videoForm && <AddVideo addUrl={props.addVideoFunc} close={() => openVideoForm(false)}/>}
                    {showImageForm && <AddVideo addUrl={props.addImageFunc} close={() => openImageForm(false)}/>}</div>
                <span>{props.error}</span>
                <div className={classes.saveOrcancelBlock}>
                    <Button style={{
                        width: 339,
                        height: 57, fontSize: 30, margin: '0 auto', display: 'block',
                        marginTop: 57
                    }} onClick={props.close_form}>Cancel</Button>
                    <Button danger style={{
                        width: 339,
                        height: 57, fontSize: 30, margin: '0 auto', display: 'block',
                        marginTop: 57
                    }} onClick={props.handleSubmit}>Save!</Button></div>
            </div>
        </form>
    )
}


const AddVideo = function (props) {
    let input = useRef(null)

    function add(event) {
        event.preventDefault();
        props.addUrl(input.current.value)
        props.close()
    }

    return (
        <div className={classes.addVideoMain}>
            <h2 className={classes.addVideoTitle}>Add Video or Image:</h2>
            <h3 className={classes.videoMainEnterPL}>Enter picture link:</h3>
            <input type="text" ref={input} className={classes.addVideoInput} placeholder={'Write link'}/>
            <div className={classes.AddVideoaddAndCancelBlock}>
                <Button type={'primary'} onClick={add} style={{width: 267, height: 60, fontSize: 27}}>Add</Button>
                <Button danger onClick={props.close}
                        style={{width: 267, height: 60, fontSize: 27}}>Cancel</Button>
            </div>
        </div>
    )
}

const AddPostFormC = reduxForm({
    form: 'add_post'
})(AddPostForm)


export const MediaPlayer = function (props) {
    if (!props.url) {
        return <PreloaderCard/>
    }
    return (
        <Media>
            <div className="media">
                <div className="media-player">
                    <Player src={props.url}/>
                </div>
                <div className="media-controls">
                </div>
            </div>
        </Media>
    )
}

export default AddPost
