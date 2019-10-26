import { combineReducers } from 'redux';
import { createNavigationReducer } from 'react-navigation-redux-helpers';

import RootNavigation from './../../navigator/RootNavigation'
import reducerAuth from './reducerAuth';
import reducerGetUser from './reducerGetUser';
import reducerRoom from './reducerRoom';
import reducerRoomAdd from './reducerRoomAdd';
import reducerRoomEdit from './reducerRoomEdit';
import reducerCustomer from './reducerCustomer';
import reducerOrder from './reducerOrder';


const reducerRouter = createNavigationReducer(RootNavigation);

const appReducer = combineReducers({
    router: reducerRouter,
    auth: reducerAuth,
    getuser: reducerGetUser,
    rooms: reducerRoom,
    roomsadd: reducerRoomAdd,
    roomsedit: reducerRoomEdit,
    customers: reducerCustomer,
    orders: reducerOrder,

})

export default appReducer