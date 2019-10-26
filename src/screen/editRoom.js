import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage } from 'react-native';
import { Item, Input, Button } from 'native-base';

import { connect } from 'react-redux'
import * as actionRoom from './../redux/actions/actionRoom'

class editRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.navigation.getParam('id'),
            roomname: this.props.navigation.getParam('roomname'),
            token: ''
        };
    }
    async componentDidMount() {
        const token = await AsyncStorage.getItem('userToken')
        this.setState({ token })
    }
    _handleEditRoom() {
        const { id, roomname, token } = this.state
        const data = {
            roomname
        }
        this.props.handleEditRoom(id, data, token)
        this.props.navigation.navigate('room')
    }

    render() {
        return (
            <View style={styles.FormView}>
                <Item rounded style={styles.inputStyle}>
                    <Input autoCapitalize='none' returnKeyType='next' placeholder='Room Name' placeholderTextColor='black' style={styles.txtFormStyle} value={this.state.roomname} onChangeText={(roomname) => this.setState({ roomname })} />
                </Item>
                <Button rounded style={styles.buttonLogin} onPress={() => this._handleEditRoom()}>
                    <Text style={styles.textButtonSignIn}> Submit </Text>
                </Button>
                <Button rounded style={styles.buttonLogin} onPress={() => this.props.navigation.goBack()}>
                    <Text style={styles.textButtonSignIn}> Cancel </Text>
                </Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    FormView: {
        flex: 1,
    }
});

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleEditRoom: (id, data, token) => dispatch(actionRoom.handleEditRoom(id, data, token)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(editRoom);
