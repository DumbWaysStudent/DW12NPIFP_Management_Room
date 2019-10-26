import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage } from 'react-native';
import { Item, Input, Button } from 'native-base';

import { connect } from 'react-redux'
import * as actionRoom from './../redux/actions/actionRoom'

class addRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomname: '',
            token: ''
        };
    }
    async componentDidMount() {
        const token = await AsyncStorage.getItem('userToken')
        this.setState({ token })
    }
    _handleAddRoom() {
        const { roomname, token } = this.state
        const data = {
            roomname
        }
        this.props.handleAddRoom(data, token)
        this.props.navigation.navigate('room')
    }

    render() {
        return (
            <View style={styles.FormView}>
                <Item rounded style={styles.inputStyle}>
                    <Input autoCapitalize='none' returnKeyType='next' placeholder='Room Name' placeholderTextColor='black' style={styles.txtFormStyle} value={this.state.roomname} onChangeText={(roomname) => this.setState({ roomname })} />
                </Item>
                <Button rounded style={styles.buttonLogin} onPress={() => this._handleAddRoom()}>
                    <Text style={styles.textButtonSignIn}> Submit </Text>
                </Button>
                <Button rounded style={styles.buttonLogin} onPress={() => this.props.navigation.navigate.goBack()}>
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
        handleAddRoom: (data, token) => dispatch(actionRoom.handleAddRoom(data, token)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(addRoom);
