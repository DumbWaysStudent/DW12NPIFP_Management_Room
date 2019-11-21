import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import MemberNavigation from '../navigator/MemberNavigation'
import login from '../screen/login'
import register from '../screen/register'


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
})


export default createAppContainer(RootNavigation);