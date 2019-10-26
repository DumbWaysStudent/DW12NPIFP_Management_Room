import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import login from '../screen/login'

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
    // MemberNavigation: {
    //     screen: MemberNavigation,
    //     navigationOptions: {
    //         header: null,
    //         gesturesEnabled: false,
    //     }
    // },
})


export default createAppContainer(RootNavigation);