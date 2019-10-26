import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, AsyncStorage } from 'react-native';
import { Card, CardItem, Header, Body, Title } from "native-base";
import jwt_decode from 'jwt-decode';


import { connect } from 'react-redux'
import * as actionAuth from './../redux/actions/actionAuth'

class setting extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    async componentDidMount() {
        const token = await AsyncStorage.getItem('userToken')
        const idUser = jwt_decode(token)
        const id = idUser.userId

        await this.props.handleGetUser(id, token)
    }

    render() {
        const dataUser = this.props.dataUser.data
        console.log(dataUser)
        return (
            <View>
                <Header style={{ backgroundColor: '#01CB75', marginBottom: 20 }}>
                    <Body style={{ paddingLeft: 15 }}>
                        <Title style={{ color: 'white', alignSelf: 'center' }}>Setting</Title>
                    </Body>
                </Header>
                <Card style={styles.cardStyle}>
                    <CardItem style={styles.cardItem}>
                        <Text style={styles.textStyle}>{dataUser.username}</Text>
                    </CardItem>
                </Card>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    cardStyle: {
        flex: 1,
        height: 100,
        flexDirection: 'column',
    },
    cardItem: {
        marginTop: 5,
    },
    textStyle: {
        fontSize: 20,
        alignSelf: 'center',
        justifyContent: 'center'
    }
})

const mapStateToProps = state => {
    return {
        dataUser: state.getuser
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleGetUser: (id, token) => dispatch(actionAuth.handleGetUser(id, token)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(setting);