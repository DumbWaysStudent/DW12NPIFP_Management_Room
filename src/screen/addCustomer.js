import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, AsyncStorage } from 'react-native';
import { Header, Body, Title, Input, Item, Button } from 'native-base';

import { connect } from 'react-redux'
import * as actionCustomer from './../redux/actions/actionCustomer'

class addCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            idNumber: '',
            phone: '',
            token: ''
        };
    }

    async componentDidMount() {
        const token = await AsyncStorage.getItem('userToken')
        this.setState({ token })
    }

    _handleAddCustomer() {
        const { name, idNumber, phone, token } = this.state
        const data = {
            name, idNumber, phone
        }
        this.props.handleAddCustomer(data, token)
        this.props.navigation.navigate('customer')
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View>
                    <Header style={{ backgroundColor: '#01CB75', marginBottom: 15 }}>
                        <Body style={{ paddingLeft: 15 }}>
                            <Title style={styles.titleStyle}>Add Customer</Title>
                        </Body>
                    </Header>
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
                    <Button rounded style={styles.buttonLogin} onPress={() => this._handleAddCustomer()}>
                        <Text style={styles.textButtonSignIn}> Submit </Text>
                    </Button>
                    <Button rounded style={styles.buttonLogin} onPress={() => this.props.navigation.goBack()}>
                        <Text style={styles.textButtonSignIn}> Cancel </Text>
                    </Button>
                </View>
            </View>
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
    }
})

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleAddCustomer: (data, token) => dispatch(actionCustomer.handleAddCustomer(data, token)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(addCustomer);

