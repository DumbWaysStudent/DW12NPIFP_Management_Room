import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, AsyncStorage } from 'react-native';
import { Card, CardItem, Header, Body, Title } from "native-base";

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
                <Header style={{ backgroundColor: '#01CB75', marginBottom: 20 }}>
                    <Body style={{ paddingLeft: 15 }}>
                        <Title style={{ color: 'white', alignSelf: 'center' }}>Room</Title>
                    </Body>
                </Header>
                <FlatList
                    data={dataRoom}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) =>
                        <Card style={styles.cardStyle}>
                            <CardItem button onPress={() => this.props.navigation.navigate('editRoom', {
                                id: item.id,
                                roomname: item.roomname
                            })} style={styles.cardItem}>
                                <Text style={styles.textStyle}>{item.roomname}</Text>
                            </CardItem>
                        </Card>
                    }
                    keyExtractor={(item, index) => index.toString()
                    } />
                <Card>
                    <CardItem button onPress={() => this.props.navigation.navigate('addRoom')} style={styles.cardItem}>
                        <Text>Add</Text>
                    </CardItem>
                </Card>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    pageStyle: {
        flex: 1,

    },
    cardStyle: {
        flex: 1,
        height: 100,
        flexDirection: 'column',
    },
    cardItem: {
        marginTop: 5,
        backgroundColor: 'tomato'
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