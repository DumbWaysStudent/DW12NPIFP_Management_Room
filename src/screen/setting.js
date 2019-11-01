import React, { Component } from 'react';
import { View, Text, FlatList, AsyncStorage, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Header, Body, Title, Button, Image, Icon, Fab } from "native-base";

import HeaderComponent from '../assets/component/HeaderComponent'

export default class setting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            isDisabled: false,
            swipeToClose: true,
            username: ''
        };
    }


    async componentDidMount() {
        const username = await AsyncStorage.getItem('adminUsername')

        this.setState({ username })
    }

    _handleLogOut() {
        AsyncStorage.clear()
        this.props.navigation.navigate('login')
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <HeaderComponent titlename='Setting' />
                <View style={{ flexDirection: 'row', flex: 1, margin: 3, alignContent: 'center', alignSelf: 'center', }}>
                    <TouchableOpacity style={styles.cardItem}>
                        <View style={styles.imgStyle}>
                            <Icon name="contact" style={{ color: '#2f3640', fontSize: 75 }} />
                        </View>
                        <View style={styles.cardItemDetail}>
                            <Text style={styles.fontDetail}>Nama</Text>
                        </View>
                        <View style={styles.cardItemDetail}>
                            <Text style={styles.fontDetailContent}>: {this.state.username}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ justifyContent: 'flex-end', alignContent: 'flex-end' }}>
                    <Button warning onPress={() => this._handleLogOut()} >
                        <Text>Log Out</Text>
                    </Button>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    scrollViewStle: {
        alignContent: 'center',
        alignSelf: 'center',

    },
    cardItem: {
        borderWidth: 2,
        borderRadius: 20,
        width: 360,
        height: 100,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fdcb6e'
    },
    cardItemDetail: {
        marginLeft: 10,
    },
    imgStyle: {

    },
    fontDetail: {
        fontSize: 15
    },
    fontDetailContent: {
        fontSize: 15,
        fontWeight: 'bold'
    }

});