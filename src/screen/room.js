import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, AsyncStorage, TouchableOpacity, Dimensions } from 'react-native';
import { Item, Button, Input, Icon } from "native-base";

import HeaderComponent from '../assets/component/HeaderComponent'

import { FlatGrid } from 'react-native-super-grid';
import Modal, { ModalContent, ModalTitle, ModalButton, ModalFooter } from 'react-native-modals';

import { connect } from 'react-redux'
import * as actionRoom from './../redux/actions/actionRoom'

class room extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            roomname: '',
            token: '',
            AddRoomVisible: false,
            EditRoomVisible: false,

        };
    }
    async componentDidMount() {
        const token = await AsyncStorage.getItem('userToken')
        this.setState({ token })

        await this.props.handleGetRoom(token)
    }

    _handleClearState = () => {

        this.setState({ AddRoomVisible: false, roomname: '' })
    }

    async _handleAddRoom() {
        const { roomname, token } = this.state
        const data = {
            roomname
        }
        await this.props.handleAddRoom(data, token)
        await this.props.handleGetRoom(token)
        await this.setState({ AddRoomVisible: false })
    }

    _handleShowEdit(item) {
        this.setState({ id: item.id, roomname: item.roomname })
        this.setState({ EditRoomVisible: true })
    }

    async _handleEditRoom() {
        const { id, roomname, token } = this.state
        const data = {
            roomname
        }
        await this.props.handleEditRoom(id, data, token)
        await this.props.handleGetRoom(token)
        await this.setState({ EditRoomVisible: false })
    }

    render() {
        const dataRoom = this.props.dataRoom.data
        return (
            <View style={styles.pageStyle}>
                <HeaderComponent titlename='Room' />
                <FlatGrid
                    items={dataRoom}
                    itemDimension={90}
                    renderItem={({ item }) =>
                        <View style={{ flexDirection: 'row', flex: 1, margin: 3, alignContent: 'flex-start', justifyContent: 'flex-start' }}>
                            <TouchableOpacity style={styles.itemStyle} onPress={() => this._handleShowEdit(item)}>
                                <Text style={{ color: 'white', fontSize: 14 }}>{item.roomname}</Text>
                            </TouchableOpacity>
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
                                onPress={() => this.setState({ EditRoomVisible: false })}
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
        width: Dimensions.get('window').width * 0.30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#34afa9',
        borderRadius: 190
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
        alignSelf: 'center',
        justifyContent: 'center',
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
        handleGetRoom: (token) => dispatch(actionRoom.handleGetRoom(token)),
        handleAddRoom: (data, token) => dispatch(actionRoom.handleAddRoom(data, token)),
        handleEditRoom: (id, data, token) => dispatch(actionRoom.handleEditRoom(id, data, token)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(room);