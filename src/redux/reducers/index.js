import { combineReducers } from 'redux';
import { createNavigationReducer } from 'react-navigation-redux-helpers';

import RootNavigation from './../../navigator/RootNavigation'
import reducerAuth from './reducerAuth';
import reducerRoom from './reducerRoom';
import reducerCustomer from './reducerCustomer';
import reducerOrder from './reducerOrder';


const reducerRouter = createNavigationReducer(RootNavigation);

const appReducer = combineReducers({
    router: reducerRouter,
    auth: reducerAuth,
    rooms: reducerRoom,
    customers: reducerCustomer,
    orders: reducerOrder,

})

export default appReducer