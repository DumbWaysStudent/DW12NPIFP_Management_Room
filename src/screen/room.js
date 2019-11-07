import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, AsyncStorage, TouchableOpacity, Dimensions, ImageBackground, Image, StatusBar } from 'react-native';
import { Item, Button, Input, Icon } from "native-base";
import ImagePicker from 'react-native-image-picker';

import HeaderComponent from '../assets/component/HeaderComponent'

import { FlatGrid } from 'react-native-super-grid';
import Modal, { ModalContent, ModalTitle, ModalButton, ModalFooter } from 'react-native-modals';

import { API_SERV } from '../assets/server'

import { connect } from 'react-redux'
import * as actionRoom from './../redux/actions/actionRoom'
import * as actionCustomer from './../redux/actions/actionCustomer'

class room extends Component {
    constructor(props) {
        super(props);
        this.selectPhoto = this.selectPhoto.bind(this);
        this.state = {
            id: '',
            roomname: '',
            token: '',
            AddRoomVisible: false,
            EditRoomVisible: false,
            imageSource: '',

        };
    }
    async componentDidMount() {
        const token = await AsyncStorage.getItem('userToken')
        this.setState({ token })

        await this.props.handleGetCustomer(token)
        await this.props.handleGetRoom(token)
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
                let source = {
                    uri: response.uri,
                    type: response.type,
                    name: response.fileName,
                    data: response.data
                };
                console.log('ini adalah source', source)
                this.setState({
                    imageSource: source,
                });
            }
        });
    }

    _handleClearState = () => {
        this.setState({
            id: '',
            roomname: '',
            token: '',
            AddRoomVisible: false,
            EditRoomVisible: false,
            imageSource: '',
        })
    }

    async _handleAddRoom() {
        const data = new FormData();
        const { token } = this.state;
        data.append('roomname', this.state.roomname);
        data.append('imageRoom', this.state.imageSource);


        await this.props.handleAddRoom(data, token)
        await this.props.handleGetRoom(token)
        await this.setState({ AddRoomVisible: false })
    }

    _handleShowEdit(item) {
        this.setState({ id: item.id, roomname: item.roomname })
        this.setState({ EditRoomVisible: true })
    }

    async _handleEditRoom() {
        const data = new FormData();
        const { id, token } = this.state
        data.append('roomname', this.state.roomname);
        data.append('imageRoom', this.state.imageSource);


        await this.props.handleEditRoom(id, data, token)
        await this.props.handleGetRoom(token)
        await this.setState({ EditRoomVisible: false })
    }

    render() {
        const dataRoom = this.props.dataRoom.data
        return (
            <View style={styles.pageStyle}>
                <HeaderComponent titlename='Room' />
                <StatusBar backgroundColor="#75AF34" barStyle="light-content" />
                <FlatGrid
                    items={dataRoom}
                    itemDimension={130}
                    renderItem={({ item }) =>
                        <View style={{ flexDirection: 'row', flex: 1, margin: 3, alignContent: 'flex-start', justifyContent: 'flex-start' }}>
                            <ImageBackground
                                style={styles.itemStyle}
                                imageStyle={{ borderRadius: 20 }}
                                source={{ uri: `${API_SERV}/static/` + item.imageRoom }}
                            >
                                <TouchableOpacity style={styles.itemStyleBtn} onPress={() => this._handleShowEdit(item)}>
                                    <View style={styles.textBg}>
                                        <View style={{ marginLeft: 10, marginBottom: 10 }}>
                                            <Text style={styles.textStyle}>{item.roomname}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </ImageBackground>
                        </View>
                    }
                    keyExtractor={(item, index) => index.toString()
                    } />
                <View style={styles.addButton}>
                    <Button rounded transparent onPress={() => this.setState({ AddRoomVisible: true })} style={styles.cardItem}>
                        <Icon name='add' style={{ color: 'white' }} />
                        <Text style={{ color: 'white' }}>ADD ROOM</Text>
                    </Button>
                </View>

                {/* MODAL ADD ROOM */}
                <Modal
                    visible={this.state.AddRoomVisible}
                    swipeThreshold={100} // default 100
                    onSwipeOut={(event) => {
                        this.setState({ AddRoomVisible: false });
                    }}
                    modalTitle={<ModalTitle style={{ backgroundColor: '#34afa9' }} textStyle={{ color: 'white' }} title="ADD ROOM" />}
                    footer={
                        <ModalFooter>
                            <ModalButton
                                text="CANCEL"
                                textStyle={{ color: '#000' }}
                                onPress={() => { this._handleClearState() }}
                            />
                            <ModalButton
                                style={{ backgroundColor: '#34afa9' }}
                                textStyle={{ color: 'white' }}
                                text="ADD ROOM"
                                onPress={() => { this._handleAddRoom() }}
                            />
                        </ModalFooter>
                    }
                    width={Dimensions.get('window').width * 0.80}
                >
                    <ModalContent>
                        <Item rounded style={styles.inputStyle}>
                            <Input autoCapitalize='none' returnKeyType='next' placeholder='Room Name' placeholderTextColor='black' style={styles.txtFormStyle} value={this.state.roomname} onChangeText={(roomname) => this.setState({ roomname })} />
                        </Item>
                        {
                            this.state.imageSource ? <Image source={this.state.imageSource} style={{ width: '80%', height: 200, resizeMode: 'contain', alignSelf: 'center' }} /> : <Text>Photo</Text>
                        }

                        {/* <Button
                            primary
                            // style={style.btncamera}
                            rounded
                            onPress={this.selectPhoto.bind(this)}
                        >
                            <Text>Select Photo</Text>
                        </Button> */}
                        <Icon style={{ alignSelf: 'center' }} onPress={this.selectPhoto.bind(this)} type='Ionicons' name='camera' />
                    </ModalContent>
                </Modal>
                {/* END SCRIPT ADD ROOM */}


                {/* MODAL EDIT ROOM */}
                <Modal
                    visible={this.state.EditRoomVisible}
                    swipeThreshold={100} // default 100
                    onSwipeOut={(event) => {
                        this.setState({ EditRoomVisible: false });
                    }}
                    modalTitle={<ModalTitle style={{ backgroundColor: '#34afa9' }} textStyle={{ color: 'white' }} title="EDIT ROOM" />}
                    footer={
                        <ModalFooter>
                            <ModalButton
                                text="CANCEL"
                                textStyle={{ color: '#000' }}
                                onPress={() => { this._handleClearState() }}
                            />
                            <ModalButton
                                style={{ backgroundColor: '#34afa9' }}
                                textStyle={{ color: 'white' }}
                                text="CHANGE"
                                onPress={() => { this._handleEditRoom() }}
                            />
                        </ModalFooter>
                    }
                    width={Dimensions.get('window').width * 0.80}
                >
                    <ModalContent>
                        <Item rounded style={styles.inputStyle}>
                            <Input autoCapitalize='none' returnKeyType='next' placeholder='Room Name' placeholderTextColor='black' style={styles.txtFormStyle} value={this.state.roomname} onChangeText={(roomname) => this.setState({ roomname })} />
                        </Item>

                        {
                            this.state.imageSource ? <Image source={this.state.imageSource} style={{ width: '80%', height: 200, resizeMode: 'contain', alignSelf: 'center' }} /> : <Text>Photo</Text>
                        }

                        {/* <Button
                            primary
                            // style={style.btncamera}
                            rounded
                            onPress={this.selectPhoto.bind(this)}
                        >
                            <Text>Select Photo</Text>
                        </Button> */}
                        <Icon style={{ alignSelf: 'center' }} onPress={this.selectPhoto.bind(this)} type='Ionicons' name='camera' />
                    </ModalContent>
                </Modal>
                {/* END SCRIPT EDIT ROOM */}
            </View >
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
        width: 90
    },
    itemStyle: {
        height: 120,
        width: Dimensions.get('window').width * 0.45,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#34afa9',
        borderRadius: 20
    },
    itemStyleBtn: {
        height: 120,
        width: Dimensions.get('window').width * 0.45,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(52,175,169,0.5)',
        borderRadius: 20
    },
    addButton: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#34afa9',
        borderRadius: 20,
        width: 200,
        marginVertical: 10
    },
    textStyle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white',
        alignSelf: 'flex-start',
        justifyContent: 'center',
    },
    textBg: {
        backgroundColor: '#34afa9',
        alignSelf: 'flex-start',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        width: '100 %'
    },

    //MODAL ADD ROOM
    FormView: {
        flex: 1,
    },
    inputStyle: {
        marginVertical: 10
    }
})

const mapStateToProps = state => {
    return {
        dataRoom: state.rooms
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleGetCustomer: (token) => dispatch(actionCustomer.handleGetCustomer(token)),
        handleGetRoom: (token) => dispatch(actionRoom.handleGetRoom(token)),
        handleAddRoom: (data, token) => dispatch(actionRoom.handleAddRoom(data, token)),
        handleEditRoom: (id, data, token) => dispatch(actionRoom.handleEditRoom(id, data, token)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(room);