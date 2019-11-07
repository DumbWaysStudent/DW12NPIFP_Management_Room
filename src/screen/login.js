import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, Image, AsyncStorage, ImageBackground, Dimensions } from 'react-native';
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
                    // console.log(result.data.error)
                    if (result.data.error != true) {
                        AsyncStorage.setItem('userToken', result.data.token)
                        AsyncStorage.setItem('adminUsername', result.data.username)
                        navigation.navigate('MemberNavigation')
                    } else {
                        alert(result.data.message)
                    }
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
            <ImageBackground source={require('../assets/img/imgBackground.jpg')} style={styles.ImgBackground}>
                <View style={styles.signInBg}>
                    <StatusBar backgroundColor="#75AF34" barStyle="light-content" />
                    <View style={styles.bgImgView} >
                        <Image style={styles.LogoImg} source={require('../assets/img/Logo2.png')}></Image>
                    </View>
                    <View style={styles.loginTextView}>
                        <Item rounded style={styles.inputStyle}>
                            <Input autoCapitalize='none' returnKeyType='next' placeholder='Username' placeholderTextColor='white' style={styles.txtFormStyle} value={this.state.inputUsername} onChangeText={(inputUsername) => this.setState({ inputUsername })} />
                        </Item>
                        <Item rounded style={styles.inputStyle}>
                            <Input autoCapitalize='none' returnKeyType='go' secureTextEntry={this.state.hiddenPass} placeholder='Password' placeholderTextColor='white' style={styles.txtFormStyle} value={this.state.inputPassword} onChangeText={(inputPassword) => this.setState({ inputPassword })} />
                            <Icon style={styles.iconStyle} active name={this.state.icon} onPress={() => this._changeIcon()} />
                        </Item>
                        <View style={{ flexDirection: 'row' }}>
                            <Button rounded style={styles.buttonLogin} onPress={() => this.authUsernamePassword()}>
                                <Text style={styles.textButtonSignIn}> SIGN IN </Text>
                            </Button>
                            <Button rounded style={styles.buttonLogin} onPress={() => this.props.navigation.navigate('register')}>
                                <Text style={styles.textButtonSignIn}> REGISTER </Text>
                            </Button>
                        </View>
                        <Button rounded style={styles.buttonDemo} onPress={() => this.demoAkun()}>
                            <Text style={styles.textButtonSignIn}> DEMO </Text>
                        </Button>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}


const styles = StyleSheet.create({
    ImgBackground: {
        width: Dimensions.get('window').width,
        height: '100%',
    },
    signInBg: {
        backgroundColor: 'rgba(118,176,53,0.4)',
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    },
    LogoImg: {
        width: 250,
        height: 300,
        resizeMode: 'contain'
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
        paddingHorizontal: 10,
        backgroundColor: 'rgba(118,176,53,0.8)',
    },
    txtFormStyle: {
        color: 'white',
    },
    iconStyle: {
        color: 'white'
    },
    buttonLogin: {
        width: Dimensions.get('window').width * 0.45,
        justifyContent: 'center',
        marginVertical: 10,
        backgroundColor: 'white',
        alignItems: 'center',
        marginHorizontal: 5

    },
    buttonDemo: {
        width: Dimensions.get('window').width * 0.8,
        justifyContent: 'center',
        marginVertical: 10,
        backgroundColor: 'white',
        alignItems: 'center',
        marginHorizontal: 20

    },
    textButtonSignIn: {
        color: '#75AF34',
        fontSize: 15,
        fontFamily: 'CenturyGothic',
        width: 300,
        textAlign: 'center',
    }
});