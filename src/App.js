import logo from './logo.svg';
import './App.css';
import {Switch,Route} from 'react-router-dom'
import Main from "./components/main/main";
import Header from "./components/header/header";
import 'antd/dist/antd.css';
import './normalize.css';
import Card from "./components/card/card";
import Login from "./components/login/login";
import 'react-quill/dist/quill.snow.css';
function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path={'/card/:id?'} component={Card} />
        <Route exact path={'/'} component={Main}/>
        <Route path={'/login'} render={ () => <Login mode={'login'} />} />
        <Route path={'/register'} render={ () => <Login mode={'register'} />} />
      </Switch>
    </div>
  );
}

export default App;
