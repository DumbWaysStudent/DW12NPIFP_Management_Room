import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, AsyncStorage, TouchableOpacity } from 'react-native';
import { Card, CardItem, Header, Body, Title, Button } from "native-base";

import { connect } from 'react-redux'
import * as actionOrder from './../redux/actions/actionOrder'
import * as actionRoom from './../redux/actions/actionRoom'

class checkin extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    async componentDidMount() {
        const token = await AsyncStorage.getItem('userToken')

        await this.props.handleGetOrder(token)
    }

    render() {
        const dataOrder = Object.values(this.props.dataOrder.data)
        console.log(dataOrder)
        return (
            <View style={styles.pageStyle}>
                <Header style={{ backgroundColor: '#01CB75', marginBottom: 15 }}>
                    <Body style={{ paddingLeft: 15 }}>
                        <Title style={styles.titleStyle}>Check In </Title>
                    </Body>
                </Header>
                <FlatList
                    data={dataOrder}
                    numColumns={2}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) =>
                        <View style={{ flexDirection: 'row', flex: 1, margin: 3 }}>

                            <TouchableOpacity style={styles.itemStyleGrey} onPress={() => this.props.navigation.navigate('editRoom', {
                                id: item.id,
                                roomname: item.roomname
                            })}>
                                <Text>{item.roomname}</Text>
                            </TouchableOpacity>

                            {/* {item.Orders[0] === '' || item.Orders[0].is_done == false && item.Orders[0].is_booked == true ?
                                <TouchableOpacity style={styles.itemStyleGrey} onPress={() => this.props.navigation.navigate('editRoom', {
                                    id: item.id,
                                    roomname: item.roomname
                                })}>
                                    <Text>{item.roomname}</Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity style={styles.itemStyleGreen} onPress={() => this.props.navigation.navigate('editRoom', {
                                    id: item.id,
                                    roomname: item.roomname
                                })}>
                                    <Text>{item.roomname}</Text>
                                </TouchableOpacity>
                            } */}
                        </View>
                    }
                    keyExtractor={(item, index) => index.toString()
                    } />
                <View style={styles.addButton}>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    pageStyle: {
        flex: 1,

    },
    titleStyle: {
        color: 'white',
        alignSelf: 'center',
        fontWeight: 'bold'
    },
    cardStyle: {
        flex: 1,
        height: 100,
        flexDirection: 'column',
    },
    cardItem: {
        marginTop: 5,
    },
    itemStyleGrey: {
        height: 60,
        width: 190,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#95a5a6'
    },
    itemStyleGreen: {
        height: 60,
        width: 190,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#01CB75'
    },
    addButton: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'green',
        borderRadius: 20,
        width: 100,
        marginBottom: 20
    },
    textStyle: {
        fontSize: 20,
        alignSelf: 'center',
        justifyContent: 'center'
    }
})

const mapStateToProps = state => {
    return {
        dataOrder: state.orders,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleGetOrder: (token) => dispatch(actionOrder.handleGetOrder(token)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(checkin);