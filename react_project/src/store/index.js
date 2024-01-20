import { createStore, applyMiddleware, combineReducers } from 'redux';
import reducerUser from './reducerUser';
import reducerRecipe from './reducerRecipe'
import reducerBuy from './reducerBuy';
import { thunk } from 'redux-thunk'
import reducerCategory from './reducerCategory';


const reducers = combineReducers({
    user: reducerUser,
    recipe: reducerRecipe,
    buy: reducerBuy,
    category: reducerCategory
})

const store = createStore(reducers, applyMiddleware(thunk));

export default store;