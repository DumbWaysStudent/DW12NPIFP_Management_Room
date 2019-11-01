import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    AsyncStorage,
    TouchableOpacity,
    Alert,
    TouchableHighlight,
    Dimensions,
    Picker
} from 'react-native';
import { Button, Item, Input } from 'native-base';
import HeaderComponent from '../assets/component/HeaderComponent'
import Modal, { ModalContent, ModalTitle, ModalButton, ModalFooter } from 'react-native-modals';
import { FlatGrid } from 'react-native-super-grid';
import { connect } from 'react-redux'
import * as actionOrder from './../redux/actions/actionOrder'
import * as actionCustomer from './../redux/actions/actionCustomer'

class checkin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // idOrder: '',
            idRoom: '',
            roomname: '',
            nameCustomer: '',
            idCustomer: '',
            duration: '',
            is_booked: '',
            is_done: '',
            CheckInVisible: false,
            CheckOutVisible: false,
        };
    }

    async componentDidMount() {
        const token = await AsyncStorage.getItem('userToken')

        await this.props.handleGetOrder(token)
        await this.props.handleGetCustomer(token)
    }

    //Handle color style in button
    _handleColor(item) {
        if (item.Orders != undefined) {
            const isBooked = item.Orders.map((item) => {
                var status = item.is_booked;
                return status;
            });
            if (isBooked[0] == true) {
                return styles.itemStyleGrey
            } else {
                return styles.itemStyleGreen
            }
        } else {
            return styles.itemStyleGreen
        }
    }

    _handleCheck = (item) => {
        if (item.Orders != undefined) {
            const isBooked = item.Orders.map((item) => {
                var status = item.is_booked;
                return status;
            });
            if (isBooked[0] == true) {
                this.setState({ idOrder: item.Orders[0].id })
                this.setState({ idRoom: item.id })
                this.setState({ CheckOutVisible: true })
            } else {
                this.setState({ idRoom: item.id })
                this.setState({ roomname: item.roomname })
                this.setState({ CheckInVisible: true })
            }
        } else {
            this.setState({ idRoom: item.id })
            this.setState({ roomname: item.roomname })
            this.setState({ CheckInVisible: true })
        }
    }
    _handleClearState() {

        this.setState({ idRoom: '' })
        this.setState({ roomname: '' })
        this.setState({ idCustomer: '' })
        this.setState({ nameCustomer: '' })
        this.setState({ duration: '' })
        this.setState({ CheckInVisible: false })
    }

    async _handleAddCheckIn() {
        // alert(this.state.idCustomer)
        this.setState({ is_booked: 'true', is_done: 'false' })
        const token = await AsyncStorage.getItem('userToken')
        const { idRoom, idCustomer, duration, is_booked, is_done } = this.state
        const data = await {
            idRoom, idCustomer, duration, is_booked, is_done
        }
        console.log(data)
        await this.props.handleAddCheckIn(data, token)
        await this.props.handleGetOrder(token)
        await this.setState({ CheckInVisible: false })
    }

    async _handleAddCheckOut() {
        const token = await AsyncStorage.getItem('userToken')
        const { idRoom } = this.state
        const data = {
            idRoom
        }
        console.log(data)
        console.log(token)
        await this.props.handleAddCheckOut(data, token)
        await this.props.handleGetOrder(token)
        await this.setState({ CheckOutVisible: false })

    }

    render() {
        const dataOrder = Object.values(this.props.dataOrder.data)
        const dataCustomer = this.props.dataCustomer.data
        // console.log(dataCustomer)
        return (
            <View style={styles.pageStyle}>
                <HeaderComponent titlename='Check In' />
                <FlatGrid
                    items={dataOrder}
                    itemDimension={90}
                    renderItem={({ item }) =>
                        <View style={{ flexDirection: 'row', flex: 1, margin: 3 }}>
                            <TouchableOpacity style={this._handleColor(item)} onPress={() => this._handleCheck(item)} >
                                <Text style={styles.textStyle}>{item.roomname}</Text>
                            </TouchableOpacity>
                        </View>
                    }
                    keyExtractor={(item, index) => index.toString()
                    } />

                {/* MODAL ADD CHECK IN */}
                <Modal
                    visible={this.state.CheckInVisible}
                    swipeThreshold={100} // default 100
                    onSwipeOut={(event) => {
                        this.setState({ CheckInVisible: false });
                    }}
                    modalTitle={<ModalTitle style={{ backgroundColor: '#75AF34' }} textStyle={{ color: 'white' }} title="CHECK IN" />}
                    footer={
                        <ModalFooter>
                            <ModalButton
                                text="CANCEL"
                                textStyle={{ color: '#000' }}
                                onPress={() => { this._handleClearState() }}
                            />
                            <ModalButton
                                style={{ backgroundColor: '#75AF34' }}
                                textStyle={{ color: 'white' }}
                                text="CHECK IN"
                                onPress={() => { this._handleAddCheckIn() }}
                            />
                        </ModalFooter>
                    }
                    width={Dimensions.get('window').width * 0.80}
                >
                    <ModalContent>
                        <View style={{ margin: 5 }}>
                            <Text>Room Name</Text>
                            <Item inlineLabel style={{ backgroundColor: '#95a5a6' }} >
                                <Input disabled value={this.state.roomname} />
                            </Item>
                            <Text>Customer</Text>
                            <Picker
                                style={{ height: 50, width: Dimensions.get('window').width * 0.60 }}
                                selectedValue={this.state.idCustomer}
                                onValueChange={(itemValue) =>
                                    this.setState({ idCustomer: itemValue })
                                }>
                                {dataCustomer.map((item, index) =>
                                    <Picker.Item key={item.id} label={`${item.name} - ${item.phone}`} value={item.id} />
                                )}
                            </Picker>
                            <Text>Duration (minutes)</Text>
                            <Item inlineLabel >
                                <Input placeholder='Duration' keyboardType={'numeric'} value={this.state.duration} onChangeText={(duration) => this.setState({ duration })} />
                            </Item>
                        </View>
                    </ModalContent>
                </Modal>
                {/* END SCRIPT ADD CHECK IN */}

                {/* MODAL CHECK OUT */}
                <Modal
                    visible={this.state.CheckOutVisible}
                    swipeThreshold={100} // default 100
                    onSwipeOut={(event) => {
                        this.setState({ CheckOutVisible: false });
                    }}
                    modalTitle={<ModalTitle style={{ backgroundColor: '#2c3e50' }} textStyle={{ color: 'white' }} title="CHECK OUT" />}
                    footer={
                        <ModalFooter>
                            <ModalButton
                                text="CANCEL"
                                textStyle={{ color: '#000' }}
                                onPress={() => { this.setState({ CheckOutVisible: false }) }}
                            />
                            <ModalButton
                                style={{ backgroundColor: '#2c3e50' }}
                                textStyle={{ color: 'white' }}
                                text="CHECK OUT"
                                onPress={() => { this._handleAddCheckOut() }}
                            />
                        </ModalFooter>
                    }
                    width={Dimensions.get('window').width * 0.80}
                >
                    <ModalContent>
                        <View style={{ margin: 5 }}>
                            <Text>Room Name</Text>
                            <Item inlineLabel style={{ backgroundColor: '#95a5a6' }} >
                                <Input disabled value={this.state.roomname} />
                            </Item>
                            <Text>Customer</Text>
                            <Picker
                                style={{ height: 50, width: Dimensions.get('window').width * 0.60 }}
                                selectedValue={this.state.idCustomer}
                                onValueChange={(itemValue) =>
                                    this.setState({ idCustomer: itemValue })
                                }>
                                {dataCustomer.map((item, index) =>
                                    <Picker.Item key={item.id} label={`${item.name} - ${item.phone}`} value={item.id} />
                                )}
                            </Picker>
                            <Text>Duration (minutes)</Text>
                            <Item inlineLabel >
                                <Input placeholder='Duration' keyboardType={'numeric'} value={this.state.duration} onChangeText={(duration) => this.setState({ duration })} />
                            </Item>
                        </View>
                    </ModalContent>
                </Modal>
                {/* END SCRIPT CHECK OUT */}
            </View >


        );
    }
}

const styles = StyleSheet.create({

    modal: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    modal3: {
        height: 400,
        width: 400
    },
    btn: {
        margin: 10,
        backgroundColor: "#3B5998",
        color: "white",
        padding: 10
    },


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
    },
    itemStyleGrey: {
        height: 120,
        width: Dimensions.get('window').width * 0.30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
        borderRadius: 190
    },
    itemStyleGreen: {
        height: 120,
        width: Dimensions.get('window').width * 0.30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#75AF34',
        borderRadius: 190
    },
    fontRoom: {
        color: 'white'
    },
    textStyle: {
        fontSize: 14,
        alignSelf: 'center',
        justifyContent: 'center',
        color: 'white'
    },
})

const mapStateToProps = state => {
    return {
        dataOrder: state.orders,
        dataCustomer: state.customers,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleGetOrder: (token) => dispatch(actionOrder.handleGetOrder(token)),
        handleGetCustomer: (token) => dispatch(actionCustomer.handleGetCustomer(token)),
        handleAddCheckIn: (data, token) => dispatch(actionOrder.handleAddCheckIn(data, token)),
        handleAddCheckOut: (data, token) => dispatch(actionOrder.handleAddCheckOut(data, token)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(checkin);