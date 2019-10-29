import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import MemberNavigation from '../navigator/MemberNavigation'
import login from '../screen/login'
import addRoom from '../screen/addRoom'
import editRoom from '../screen/editRoom'
import addCustomer from '../screen/addCustomer'
import editCustomer from '../screen/editCustomer'


const RootNavigation = createStackNavigator({
    // SplashScreen: {
    //     screen: SplashScreen,
    //     navigationOptions: {
    //         header: null,
    //     }
    // },
    login: {
        screen: login,
        navigationOptions: {
            header: null,
        }
    },
    // signup: {
    //     screen: SignUp,
    //     navigationOptions: {
    //         header: null,
    //     }
    // },
    MemberNavigation: {
        screen: MemberNavigation,
        navigationOptions: {
            header: null,
        }
    },
    addRoom: {
        screen: addRoom,
        navigationOptions: {
            header: null,
        }
    },
    editRoom: {
        screen: editRoom,
        navigationOptions: {
            header: null,
        }
    },
    addCustomer: {
        screen: addCustomer,
        navigationOptions: {
            header: null,
        }
    },
    editCustomer: {
        screen: editCustomer,
        navigationOptions: {
            header: null,
        }
    },
})


export default createAppContainer(RootNavigation);