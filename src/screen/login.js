import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, Image, AsyncStorage } from 'react-native';
import { Item, Input, Button, Icon } from 'native-base';

import { API_SERV } from '../assets/server'
import axios from 'axios';

export default class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputUsername: '',
            inputPassword: '',
            hiddenPass: true,
            icon: 'eye',
        };
    }
    authUsernamePassword() {
        const { inputUsername, inputPassword } = this.state
        const { navigation } = this.props
        if (inputUsername != '' && inputPassword != '') {
            axios.post(`${API_SERV}/api/v2/login`, {
                username: inputUsername,
                password: inputPassword
            })
                .then(result => {
                    AsyncStorage.setItem('userToken', result.data.token)
                    navigation.navigate('MemberNavigation')
                })
                .catch((error) => {
                    console.log(error)
                })
        } else {
            alert('Email & Password tidak boleh kosong')
        }
    };

    _changeIcon = () => {
        if (this.state.icon == 'eye-off' || this.state.password != '') {
            this.setState(prevState => ({ icon: prevState.icon == 'eye' ? 'eye-off' : 'eye', hiddenPass: !prevState.hiddenPass }));
        }
    };
    demoAkun = () => {
        const { inputUsername, inputPassword } = this.state
        this.setState({
            inputUsername: 'admin',
            inputPassword: 'admin'
        })
    }

    render() {
        return (
            <View style={styles.signInBg}>
                <StatusBar backgroundColor="#01CB75" barStyle="light-content" />
                <View style={styles.bgImgView} >
                    <Text style={styles.loginText}>Login With Your Account </Text>
                </View>
                <View style={styles.loginTextView}>
                    <Item rounded style={styles.inputStyle}>
                        <Input autoCapitalize='none' returnKeyType='next' placeholder='Username' placeholderTextColor='white' style={styles.txtFormStyle} value={this.state.inputUsername} onChangeText={(inputUsername) => this.setState({ inputUsername })} />
                    </Item>
                    <Item rounded style={styles.inputStyle}>
                        <Input autoCapitalize='none' returnKeyType='go' secureTextEntry={this.state.hiddenPass} placeholder='Password' placeholderTextColor='white' style={styles.txtFormStyle} value={this.state.inputPassword} onChangeText={(inputPassword) => this.setState({ inputPassword })} />
                        <Icon style={styles.iconStyle} active name={this.state.icon} onPress={() => this._changeIcon()} />
                    </Item>
                    <Button rounded style={styles.buttonLogin} onPress={() => this.authUsernamePassword()}>
                        <Text style={styles.textButtonSignIn}> SIGN IN </Text>
                    </Button>
                    <Button rounded style={styles.buttonLogin} onPress={() => this.demoAkun()}>
                        <Text style={styles.textButtonSignIn}> DEMO </Text>
                    </Button>
                    <Text onPress={() => this.props.navigation.navigate('signup')} style={{ color: 'white' }}>If you dont have account please Klik Me</Text>
                </View>

            </View>
        );
    }
}


const styles = StyleSheet.create({
    signInBg: {
        backgroundColor: '#01CB75',
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    },
    bgImgView: {
        flex: 2,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    bgImg: {
        width: 250,
        height: 250,
    },
    loginTextView: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 30,
        marginBottom: 50,
    },
    loginText: {
        fontSize: 20,
        color: 'white',
        marginTop: 20,
        alignSelf: 'center'
    },
    inputStyle: {
        marginVertical: 5,
        paddingHorizontal: 10
    },
    txtFormStyle: {
        color: 'white',
    },
    iconStyle: {
        color: 'white'
    },
    buttonLogin: {
        width: 330,
        justifyContent: 'center',
        marginVertical: 10,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    textButtonSignIn: {
        color: '#01CB75',
        fontSize: 15,
        fontFamily: 'GOTHIC',
        width: 300,
        textAlign: 'center'
    }
});