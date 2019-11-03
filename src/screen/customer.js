import React, { Component } from 'react';
import { View, Text, FlatList, AsyncStorage, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Header, Body, Title, Button, Image, Icon, Fab, Item, Input } from "native-base";
import Modal, { ModalContent, ModalTitle, ModalButton, ModalFooter } from 'react-native-modals';

import HeaderComponent from '../assets/component/HeaderComponent'

import { connect } from 'react-redux'
import * as actionCustomer from './../redux/actions/actionCustomer'

class customer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            idNumber: '',
            phone: '',
            token: '',
            AddCustomer: false,
            editCustomer: false,
        };
    }

    async componentDidMount() {
        const token = await AsyncStorage.getItem('userToken')
        this.setState({ token })

        await this.props.handleGetCustomer(token)
    }

    async _handleAddCustomer() {
        const { name, idNumber, phone, token } = this.state
        const data = await {
            name, idNumber, phone
        }
        await this.props.handleAddCustomer(data, token)
        await this.props.handleGetCustomer(token)
        await this.setState({ AddCustomer: false })

    }

    _handleShowEditCustomer(item) {
        const { name, idNumber, phone } = this.state
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
            name, idNumber, phone
        }
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
                <ScrollView style={styles.scrollViewStle}>
                    <FlatList
                        data={dataCustomer}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) =>
                            <View style={{ flexDirection: 'row', flex: 1, margin: 3 }}>
                                <TouchableOpacity style={styles.cardItem} onPress={() => this._handleShowEditCustomer(item)} >
                                    <View style={styles.imgStyle}>
                                        <Icon name="contact" style={{ color: '#2f3640', fontSize: 75 }} />
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
                                onPress={() => this.setState({ AddCustomer: false })}
                            // onPress={() => { this._handleClearState() }}
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
                                onPress={() => this.setState({ EditCustomer: false })}
                            // onPress={() => { this._handleClearState() }}
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
        borderWidth: 2,
        borderRadius: 20,
        width: 360,
        height: 100,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fdcb6e'
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
        fontSize: 15,
        fontWeight: 'bold'
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