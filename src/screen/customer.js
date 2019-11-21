import React, { Component } from 'react';
import { View, Text, FlatList, ScrollView, StyleSheet, TouchableOpacity, Dimensions, Image, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import { Icon, Fab, Item, Input, Thumbnail, Spinner } from "native-base";
import Modal, { ModalContent, ModalTitle, ModalButton, ModalFooter } from 'react-native-modals';
import ImagePicker from 'react-native-image-picker';
import firebase from 'firebase';
import moment from 'moment';

import HeaderComponent from '../assets/component/HeaderComponent'

import { API_SERV } from '../assets/server'

import { connect } from 'react-redux'
import * as actionCustomer from './../redux/actions/actionCustomer'

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

class customer extends Component {
    constructor(props) {
        super(props);
        this.selectPhoto = this.selectPhoto.bind(this);
        this.state = {
            id: '',
            name: '',
            idNumber: '',
            phone: '',
            token: '',
            imageSource: '',
            AddCustomer: false,
            EditCustomer: false,
            isLoading: false,
        };
    }

    async componentDidMount() {
        const token = await AsyncStorage.getItem('userToken')
        this.setState({ token })

        await this.props.handleGetCustomer(token)
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
                let source= response.uri
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

    _handleClearState = () => {
        this.setState({
            id: '',
            name: '',
            idNumber: '',
            phone: '',
            token: '',
            imageSource: '',
            AddCustomer: false,
            EditCustomer: false,
        })
    }

    async _handleAddCustomer() {
        const { name, idNumber, phone, token } = this.state
        const data = await {
            name,
            idNumber,
            phone,
            image: this.state.imageSource
        }
        // const data = new FormData();
        // data.append('name', name)
        // data.append('idNumber', idNumber)
        // data.append('phone', phone)
        // data.append('image', this.state.imageSource)
        console.log('ini data di function _handleAddCustomer', data)
        await this.props.handleAddCustomer(data, token)
        await this.props.handleGetCustomer(token)
        await this.setState({ AddCustomer: false })

    }

    _handleShowEditCustomer(item) {
        this.setState({
            id: item.id,
            name: item.name,
            idNumber: item.idNumber,
            phone: item.phone,
        })
        this.setState({ EditCustomer: true })
    }

    async _handleEditCustomer() {
        const { id, name, idNumber, phone, token } = this.state
        const data = await {
            name,
            idNumber,
            phone,
            image: this.state.imageSource
        }
        // const data = new FormData()
        // data.append('name', name)
        // data.append('idNumber', idNumber)
        // data.append('phone', phone)
        // data.append('image', this.state.imageSource)

        await this.props.handleEditCustomer(id, data, token)
        await this.props.handleGetCustomer(token)
        await this.setState({ EditCustomer: false })
    }

    render() {
        const dataCustomer = this.props.dataCustomer.data
        console.log(dataCustomer)
        return (
            <View style={{ flex: 1 }}>
                <HeaderComponent titlename='Customer' />
                <StatusBar backgroundColor="#75AF34" barStyle="light-content" />
                <ScrollView style={styles.scrollViewStle}>
                    <FlatList
                        data={dataCustomer}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) =>
                            <View style={{ flexDirection: 'row', flex: 1, margin: 3 }}>
                                <TouchableOpacity style={styles.cardItem} onPress={() => this._handleShowEditCustomer(item)} >
                                    <View style={styles.imgStyle}>
                                        {/* <Icon name="contact" style={{ color: 'white', fontSize: 75 }} /> */}
                                        {
                                            item.image ? <Thumbnail source={{ uri:item.image }} style={{ width: 80, height: 80, resizeMode: 'contain', alignSelf: 'center', justifyContent: 'center' }} /> : <Icon name="contact" style={{ color: 'white', fontSize: 75 }} />
                                        }
                                    </View>
                                    <View style={styles.cardItemDetail}>
                                        <Text style={styles.fontDetail}>Nama</Text>
                                        <Text style={styles.fontDetail}>Id Card</Text>
                                        <Text style={styles.fontDetail}>Phone</Text>
                                    </View>
                                    <View style={styles.cardItemDetail}>
                                        <Text style={styles.fontDetailContent}>: {item.name}</Text>
                                        <Text style={styles.fontDetailContent}>: {item.idNumber}</Text>
                                        <Text style={styles.fontDetailContent}>: {item.phone}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        }
                        keyExtractor={(item, index) => index.toString()
                        } />
                </ScrollView>
                <View style={{ justifyContent: 'flex-end', alignContent: 'flex-end' }}>
                    <Fab
                        active={this.state.active}
                        direction="up"
                        containerStyle={{}}
                        style={{ backgroundColor: '#75AF34', alignSelf: 'flex-end' }}
                        position="bottomRight"
                        onPress={() => this.setState({ AddCustomer: true })}
                    >
                        <Icon name="add" />
                    </Fab>
                </View>

                {/* MODAL ADD CUSTOMER */}
                <Modal
                    visible={this.state.AddCustomer}
                    swipeThreshold={100} // default 100
                    onSwipeOut={(event) => {
                        this.setState({ AddCustomer: false });
                    }}
                    modalTitle={<ModalTitle style={{ backgroundColor: '#75AF34' }} textStyle={{ color: 'white' }} title="ADD CUSTOMER" />}
                    footer={
                        <ModalFooter>
                            <ModalButton
                                text="CANCEL"
                                textStyle={{ color: '#000' }}
                                // onPress={() => this.setState({ AddCustomer: false })}
                                onPress={() => { this._handleClearState() }}
                            />
                            <ModalButton
                                style={{ backgroundColor: '#75AF34' }}
                                textStyle={{ color: 'white' }}
                                text="ADD CUSTOMER"
                                // disabled={true}
                                onPress={() => { this._handleAddCustomer() }}
                            />
                        </ModalFooter>
                    }
                    width={Dimensions.get('window').width * 0.80}
                >
                    <ModalContent>
                        <View>
                            <View style={{ marginHorizontal: 10 }}>
                                <View style={styles.titleStyleText}>
                                    <Text style={styles.textStyle}>Nama</Text>
                                </View>
                                <Item rounded>
                                    <Input style={styles.inputStyle} placeholder='Nama' value={this.state.name} onChangeText={(name) => this.setState({ name })} />
                                </Item>
                                <View style={styles.titleStyleText}>
                                    <Text style={styles.textStyle}>Identity Number</Text>
                                </View>
                                <Item rounded>
                                    <Input style={styles.inputStyle} placeholder='Identity Number' keyboardType={'numeric'} value={this.state.idNumber} onChangeText={(idNumber) => this.setState({ idNumber })} />
                                </Item>
                                <View style={styles.titleStyleText}>
                                    <Text style={styles.textStyle}>Phone</Text>
                                </View>
                                <Item rounded>
                                    <Input style={styles.inputStyle} placeholder='Phone' keyboardType={'numeric'} value={this.state.phone} onChangeText={(phone) => this.setState({ phone })} />
                                </Item>
                                {
                                    this.state.isLoading == true ? <Spinner color='#34afa9' /> : this.state.imageSource ? <Image source={{ uri: this.state.imageSource }} style={{ width: '80%', height: 200, resizeMode: 'contain', alignSelf: 'center' }} /> : <Text style={{ alignSelf: 'center' }}>Foto Customer</Text>
                                }
                                <Icon style={{ alignSelf: 'center' }} onPress={this.selectPhoto.bind(this)} type='Ionicons' name='camera' />
                            </View>
                        </View>
                    </ModalContent>
                </Modal>
                {/* END SCRIPT ADD CUSTOMER */}

                {/* MODAL EDIT CUSTOMER */}
                <Modal
                    visible={this.state.EditCustomer}
                    swipeThreshold={100} // default 100
                    onSwipeOut={(event) => {
                        this.setState({ EditCustomer: false });
                    }}
                    modalTitle={<ModalTitle style={{ backgroundColor: '#75AF34' }} textStyle={{ color: 'white' }} title="EDIT CUSTOMER" />}
                    footer={
                        <ModalFooter>
                            <ModalButton
                                text="CANCEL"
                                textStyle={{ color: '#000' }}
                                // onPress={() => this.setState({ EditCustomer: false })}
                                onPress={() => { this._handleClearState() }}
                            />
                            <ModalButton
                                style={{ backgroundColor: '#75AF34' }}
                                textStyle={{ color: 'white' }}
                                text="EDIT CUSTOMER"
                                // disabled={true}
                                onPress={() => { this._handleEditCustomer() }}
                            />
                        </ModalFooter>
                    }
                    width={Dimensions.get('window').width * 0.80}
                >
                    <ModalContent>
                        <View>
                            <View style={{ marginHorizontal: 10 }}>
                                <View style={styles.titleStyleText}>
                                    <Text style={styles.textStyle}>Nama</Text>
                                </View>
                                <Item rounded>
                                    <Input style={styles.inputStyle} placeholder='Nama' value={this.state.name} onChangeText={(name) => this.setState({ name })} />
                                </Item>
                                <View style={styles.titleStyleText}>
                                    <Text style={styles.textStyle}>Identity Number</Text>
                                </View>
                                <Item rounded>
                                    <Input style={styles.inputStyle} placeholder='Identity Number' keyboardType={'numeric'} value={this.state.idNumber} onChangeText={(idNumber) => this.setState({ idNumber })} />
                                </Item>
                                <View style={styles.titleStyleText}>
                                    <Text style={styles.textStyle}>Phone</Text>
                                </View>
                                <Item rounded>
                                    <Input style={styles.inputStyle} placeholder='Phone' keyboardType={'numeric'} value={this.state.phone} onChangeText={(phone) => this.setState({ phone })} />
                                </Item>
                                {
                                    this.state.isLoading == true ? <Spinner color='#34afa9' /> : this.state.imageSource ? <Image source={{ uri: this.state.imageSource }} style={{ width: '80%', height: 200, resizeMode: 'contain', alignSelf: 'center' }} /> : <Text style={{ alignSelf: 'center' }}>Foto Customer</Text>
                                }
                                <Icon style={{ alignSelf: 'center' }} onPress={this.selectPhoto.bind(this)} type='Ionicons' name='camera' />
                            </View>
                        </View>
                    </ModalContent>
                </Modal>
                {/* END SCRIPT EDIT CUSTOMER */}
            </View >
        );
    }
}

const styles = StyleSheet.create({
    titleStyle: {
        color: 'white',
        alignSelf: 'center',
        fontWeight: 'bold'
    },
    titleStyleText: {
        marginVertical: 10,
        marginLeft: 15
    },
    textStyle: {
        fontSize: 16,
        fontWeight: '200'
    },
    inputStyle: {
        width: '100%'
    },
    scrollViewStle: {
        alignContent: 'center',
        alignSelf: 'center',

    },
    cardItem: {
        borderRadius: 20,
        width: 360,
        height: 100,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#75AF34'
    },
    cardItemDetail: {
        marginLeft: 10,
    },
    // imgStyle: {
    //     height: 80,
    //     width: 80,
    //     borderWidth: 2,
    //     borderColor: 'black',
    //     borderRadius: 50
    // },
    fontDetail: {
        fontSize: 15,
        color: 'white'
    },
    fontDetailContent: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white'
    }

});


const mapStateToProps = state => {
    return {
        dataCustomer: state.customers
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleGetCustomer: (token) => dispatch(actionCustomer.handleGetCustomer(token)),
        handleAddCustomer: (data, token) => dispatch(actionCustomer.handleAddCustomer(data, token)),
        handleEditCustomer: (id, data, token) => dispatch(actionCustomer.handleEditCustomer(id, data, token)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(customer);