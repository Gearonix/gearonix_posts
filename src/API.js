import axios from 'axios';
const API = {
    getPosts(data){
        return axios.post(`http://localhost:4001/getposts`,data)
    },
    getOnePost(data){
        return axios.post('http://localhost:4001/getonepost',data)
    },
    login(data){
        return axios.post('http://localhost:4001/login',data)
    },
    getMyPosts(data){
        return axios.post('http://localhost:4001/getmyposts',data)
    },
    addPost(data){
        return axios.post('http://localhost:4001/addpost',setFormData(data))
    },
    changePost(id,data){
        let form_data = new FormData();
        form_data.append('file',data.background);
        form_data.append('json',JSON.stringify({id : id,data : data}));
        return axios.post('http://localhost:4001/changepost',form_data )
    },
    addTagImage(data){
        return axios.post('http://localhost:4001/addtagimage',setFormData(data))
    },
    getTagBackground(value){
        return axios.post('http://localhost:4001/gettagbackground',{value : value})
    }
}

function setFormData(data){
    let form_data = new FormData();
    form_data.append('file',data.background);
    form_data.append('json',JSON.stringify(data));
    return form_data
}


export default API