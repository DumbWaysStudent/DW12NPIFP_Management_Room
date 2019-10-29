import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, AsyncStorage, TouchableOpacity } from 'react-native';
import { Card, CardItem, Header, Body, Title, Button } from "native-base";

import { connect } from 'react-redux'
import * as actionRoom from './../redux/actions/actionRoom'

class room extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    async componentDidMount() {
        const token = await AsyncStorage.getItem('userToken')

        await this.props.handleGetRoom(token)
    }

    render() {
        const dataRoom = this.props.dataRoom.data
        return (
            <View style={styles.pageStyle}>
                <Header style={{ backgroundColor: '#01CB75', marginBottom: 15 }}>
                    <Body style={{ paddingLeft: 15 }}>
                        <Title style={styles.titleStyle}>Room</Title>
                    </Body>
                </Header>
                <FlatList
                    data={dataRoom}
                    numColumns={2}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) =>
                        <View style={{ flexDirection: 'row', flex: 1, margin: 3 }}>
                            <TouchableOpacity style={styles.itemStyle} onPress={() => this.props.navigation.navigate('editRoom', {
                                id: item.id,
                                roomname: item.roomname
                            })}>
                                <Text>{item.roomname}</Text>
                            </TouchableOpacity>
                        </View>
                    }
                    keyExtractor={(item, index) => index.toString()
                    } />
                <View style={styles.addButton}>
                    <Button rounded transparent onPress={() => this.props.navigation.navigate('addRoom')} style={styles.cardItem}>
                        <Text>Add</Text>
                    </Button>
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
    itemStyle: {
        height: 60,
        width: 190,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fdcb6e'
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
        dataRoom: state.rooms
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleGetRoom: (token) => dispatch(actionRoom.handleGetRoom(token)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(room);