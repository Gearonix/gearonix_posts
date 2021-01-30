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
        // debugger
        let form_data = new FormData();
        form_data.append('file',data.background);
        form_data.append('json',JSON.stringify(data));
        return axios.post('http://localhost:4001/addpost',form_data)
    }
}
export default API