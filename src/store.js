import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import main_reducer from "./reducers/main_reducer";
import {reducer as form_reducer} from 'redux-form';
import login_reducer from "./reducers/login_reducer";

const reducers = combineReducers({
    main : main_reducer,
    form : form_reducer,
    login  : login_reducer
})

const store = createStore(reducers,applyMiddleware(thunk));

export default store