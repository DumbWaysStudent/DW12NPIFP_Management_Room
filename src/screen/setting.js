import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, Dimensions, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Button, Icon, Thumbnail, Item, Input, Spinner } from "native-base";

import Modal, { ModalContent, ModalTitle, ModalButton, ModalFooter } from 'react-native-modals';
import ImagePicker from 'react-native-image-picker';

import firebase from 'firebase';
import moment from 'moment';

import { API_SERV } from '../assets/server'
import jwt_decode from 'jwt-decode';

import { connect } from 'react-redux'
import * as actionAuth from './../redux/actions/actionAuth'

import HeaderComponent from '../assets/component/HeaderComponent'

var firebaseConfig = {
    apiKey: "AIzaSyBo-LYwIHHfoELqUJqLOvZJ9B3gjmLbsrk",
    authDomain: "isleep-1694d.firebaseapp.com",
    databaseURL: "https://isleep-1694d.firebaseio.com",
    projectId: "isleep-1694d",
    storageBucket: "isleep-1694d.appspot.com",
    messagingSenderId: "994092262246",
    appId: "1:994092262246:web:c48e90628d786a34d29ea7",
    measurementId: "G-7NKFBGVLB9"
};
// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

class setting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.dataUser.data.username,
            password: this.props.dataUser.data.password,
            hiddenPass: true,
            imageSource: '',
            EditProfileVisible: false,
            icon: 'eye',
            isLoading: false,
        };
    }


    async componentDidMount() {
        const token = await AsyncStorage.getItem('userToken')
        const id = await jwt_decode(token)
        const idUser = await id.userId

        await this.props.handleGetUser(idUser, token)
    }


    selectPhoto() {
        const options = {
            title: 'Select Photo',
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true,
            },
        };
        ImagePicker.showImagePicker(options, response => {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled photo picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                // let source = {
                //     uri: response.uri,
                //     type: response.type,
                //     name: response.fileName,
                //     data: response.data
                // };
                let source = response.uri
                console.log('ini adalah source', source)
                this.setState({
                    imageSource: source,
                    isLoading: true
                });
                this.uploadImageAsync(source);
            }
        });
    }

    async uploadImageAsync(uri) {
        // Why are we using XMLHttpRequest? See:
        // https://github.com/expo/expo/issues/2402#issuecomment-443726662
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                console.log(e);
                reject(new TypeError('Network request failed'));
            };
            xhr.responseType = 'blob';
            xhr.open('GET', uri, true);
            xhr.send(null);
        });
        const ref = firebase
            .storage()
            .ref()
            .child(moment().toISOString());
        const snapshot = await ref.put(blob);
        // We're done with the blob, close and release it
        blob.close();
        console.log('link', await snapshot.ref.getDownloadURL());
        this.setState({
            imageSource: await snapshot.ref.getDownloadURL(),
            isLoading: false
        });
        console.log(this.state.imageSource);
        return await snapshot.ref.getDownloadURL();
    }

    _handleShowEdit() {
        this.setState({
            username: this.props.dataUser.data.username,
            password: this.props.dataUser.data.password,
            EditProfileVisible: true
        })
    }

    _handleClearUser = () => {
        this.setState({
            username: this.props.dataUser.data.username,
            password: this.props.dataUser.data.password,
            hiddenPass: true,
            imageSource: '',
            EditProfileVisible: false,
            icon: 'eye',
        })
    }

    _handleLogOut() {
        AsyncStorage.clear()
        this.props.navigation.navigate('login')
    }

    _changeIcon = () => {
        if (this.state.icon == 'eye-off' || this.state.password != '') {
            this.setState(prevState => ({ icon: prevState.icon == 'eye' ? 'eye-off' : 'eye', hiddenPass: !prevState.hiddenPass }));
        }
    };

    async _handleEditUser() {
        const token = await AsyncStorage.getItem('userToken')
        const id = await jwt_decode(token)
        const idUser = await id.userId

        const { username, password, imageSource } = this.state
        // data = new FormData
        // data.append('username', username)
        // data.append('password', password)
        // data.append('userImg', imageSource)
        data ={
            username,
            password,
            userImg: imageSource
        }

        await this.props.handleEditUser(idUser, data, token);
        await this.props.handleGetUser(idUser, token)
        await this.setState({
            EditProfileVisible: false,
            hiddenPass: true,
            imageSource: '',
            icon: 'eye',
        })
    }

    render() {
        const dataUser = this.props.dataUser.data
        return (
            <View style={{ flex: 1 }}>
                <HeaderComponent titlename='Setting' />
                <StatusBar backgroundColor="#75AF34" barStyle="light-content" />
                <View style={{ flex: 1, margin: 3, alignContent: 'center', alignSelf: 'center', }}>
                    <View style={styles.cardItem}>
                        <View style={styles.imgStyle}>
                            {
                                dataUser.userImg ? <Thumbnail source={{ uri: dataUser.userImg }} style={{ width: 250, height: 250, borderRadius: 10, resizeMode: 'contain', alignSelf: 'center', justifyContent: 'center' }} /> : <Icon name="contact" style={{ color: 'white', fontSize: 250 }} />
                            }
                        </View>
                        <View style={styles.cardItemDetail}>
                            <Text style={styles.fontDetailContent}>{dataUser.username}</Text>
                        </View>
                    </View>
                    <View>
                        <Button rounded style={styles.buttonDemo} onPress={() => this._handleShowEdit()}>
                            <Text style={styles.textButtonSignIn}> EDIT PROFILE </Text>
                        </Button>
                        <Button rounded style={styles.buttonDemo} onPress={() => this._handleLogOut()}>
                            <Text style={styles.textButtonSignIn}> LOG OUT </Text>
                        </Button>
                    </View>
                </View>

                {/* MODAL EDIT ROOM */}
                <Modal
                    visible={this.state.EditProfileVisible}
                    swipeThreshold={100} // default 100
                    onSwipeOut={(event) => {
                        this.setState({ EditProfileVisible: false });
                    }}
                    modalTitle={<ModalTitle style={{ backgroundColor: '#75AF34' }} textStyle={{ color: 'white' }} title="EDIT PROFILE" />}
                    footer={
                        <ModalFooter>
                            <ModalButton
                                text="CANCEL"
                                textStyle={{ color: '#000' }}
                                onPress={() => { this._handleClearUser() }}
                            />
                            <ModalButton
                                style={{ backgroundColor: '#75AF34' }}
                                textStyle={{ color: 'white' }}
                                text="CHANGE"
                                onPress={() => { this._handleEditUser() }}
                            />
                        </ModalFooter>
                    }
                    width={Dimensions.get('window').width * 0.80}
                >
                    <ModalContent>
                        <Item rounded style={styles.inputStyle}>
                            <Input autoCapitalize='none' returnKeyType='next' placeholder='username' placeholderTextColor='black' value={this.state.username} onChangeText={(username) => this.setState({ username })} />
                        </Item>
                        <Item rounded style={styles.inputStyle}>
                            <Input autoCapitalize='none' returnKeyType='go' secureTextEntry={this.state.hiddenPass} placeholder='Password' placeholderTextColor='black' value={this.state.inputPassword} onChangeText={(inputPassword) => this.setState({ inputPassword })} />
                            <Icon style={styles.iconStyle} active name={this.state.icon} onPress={() => this._changeIcon()} />
                        </Item>
                        {
                            this.state.isLoading == true ? <Spinner color='#34afa9' /> : this.state.imageSource ? <Image source={{ uri: this.state.imageSource }} style={{ width: '80%', height: 200, resizeMode: 'contain', alignSelf: 'center' }} /> : <Text style={{ alignSelf: 'center' }}>Foto Profile</Text>
                        }
                        <Icon style={{ alignSelf: 'center' }} onPress={this.selectPhoto.bind(this)} type='Ionicons' name='camera' />
                    </ModalContent>
                </Modal>
                {/* END SCRIPT EDIT ROOM */}
            </View >
        );
    }
}

const styles = StyleSheet.create({
    scrollViewStle: {
        alignContent: 'center',
        alignSelf: 'center',

    },
    cardItem: {
        borderRadius: 20,
        width: 360,
        height: 400,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#75AF34'
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
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white'
    },
    buttonDemo: {
        width: Dimensions.get('window').width * 0.8,
        justifyContent: 'center',
        marginVertical: 10,
        backgroundColor: '#75AF34',
        alignItems: 'center',
        marginHorizontal: 20
    },
    textButtonSignIn: {
        color: 'white',
        fontSize: 15,
        fontFamily: 'CenturyGothic',
        width: 300,
        textAlign: 'center',
    },
    inputStyle: {
        marginVertical: 5,
        paddingHorizontal: 10,
    },
    iconStyle: {
        color: '#000'
    },

});

const mapStateToProps = state => {
    return {
        dataUser: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleGetUser: (id, token) => dispatch(actionAuth.handleGetUser(id, token)),
        handleEditUser: (id, data, token) => dispatch(actionAuth.handleEditUser(id, data, token)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(setting);