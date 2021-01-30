import logo from './logo.svg';
import './App.css';
import {Switch,Route} from 'react-router-dom'
import Main from "./components/main/main";
import Header from "./components/header/header";
import 'antd/dist/antd.css';
import './normalize.css';
import Card from "./components/card/card";
import Login from "./components/login/login";
import Profile from "./components/profile/profile";
import AddPost from "./components/addPost/addPost";
import EditPost from "./components/editPost/editPost";
function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path={'/card/:id?'} component={Card} />
        <Route exact path={'/'} component={Main}/>
        <Route path={'/login'} component={Login} />
        <Route path={'/profile'} component={Profile} />
        <Route path={'/add_post'} component={AddPost} />
        <Route path={'/edit_post/:id?'} component={EditPost} />
      </Switch>
    </div>
  );
}

export default App;
