import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import MemberNavigation from '../navigator/MemberNavigation'
import login from '../screen/login'
import register from '../screen/register'
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
    register: {
        screen: register,
        navigationOptions: {
            header: null,
        }
    },
    MemberNavigation: {
        screen: MemberNavigation,
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