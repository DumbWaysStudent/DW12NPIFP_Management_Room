import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
// import { Icon } from 'native-base'

import checkin from '../screen/checkin'
import room from '../screen/room'
import customer from '../screen/customer'
import setting from '../screen/setting'

import Icon from 'react-native-vector-icons/Ionicons';

const BottonNavigator = createBottomTabNavigator({
    checkin: {
        screen: checkin,
        navigationOptions: {
            tabBarLabel: 'Check In',
            tabBarIcon: ({ tintColor }) => (<Icon name="md-apps" color={tintColor} size={24} />),

        }
    },
    room: {
        screen: room,
        navigationOptions: {
            tabBarLabel: 'Room',
            tabBarIcon: ({ tintColor }) => (<Icon name="md-star" color={tintColor} size={24} />)
        }
    },
    customer: {
        screen: customer,
        navigationOptions: {
            tabBarLabel: 'Customer',
            tabBarIcon: ({ tintColor }) => (<Icon name="md-person" color={tintColor} size={24} />)
        }
    },
    setting: {
        screen: setting,
        navigationOptions: {
            tabBarLabel: 'Setting',
            tabBarIcon: ({ tintColor }) => (<Icon name="md-person" color={tintColor} size={24} />)
        }
    }
}, {
    tabBarOptions: {
        activeTintColor: 'white',
        inactiveTintColor: '#003a21',
        style: {
            backgroundColor: '#01CB75',
            borderTopWidth: 0,
            shadowOffset: { width: 5, height: 3 },
            shadowColor: 'black',
            shadowOpacity: 0.5,
            elevation: 5
        }
    },
})

export default createAppContainer(BottonNavigator);