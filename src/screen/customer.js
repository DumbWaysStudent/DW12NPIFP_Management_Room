import React, { Component } from 'react';
import { View, Text, FlatList, AsyncStorage, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Header, Body, Title, Button, Image, Icon, Fab } from "native-base";

import { connect } from 'react-redux'
import * as actionCustomer from './../redux/actions/actionCustomer'

class customer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            isDisabled: false,
            swipeToClose: true,
        };
    }

    async componentDidMount() {
        const token = await AsyncStorage.getItem('userToken')

        await this.props.handleGetCustomer(token)
    }

    render() {
        const dataCustomer = this.props.dataCustomer.data
        console.log(dataCustomer)
        return (
            <View style={{ flex: 1 }}>
                <Header style={{ backgroundColor: '#01CB75', marginBottom: 15 }}>
                    <Body style={{ paddingLeft: 15 }}>
                        <Title style={styles.titleStyle}>Customer</Title>
                    </Body>
                </Header>
                <ScrollView style={styles.scrollViewStle}>
                    <FlatList
                        data={dataCustomer}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) =>
                            <View style={{ flexDirection: 'row', flex: 1, margin: 3 }}>
                                <TouchableOpacity style={styles.cardItem} onPress={() => this.props.navigation.navigate('editCustomer', {
                                    id: item.id,
                                    name: item.name,
                                    idNumber: item.idNumber,
                                    phone: item.phone,
                                })}>
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
                        style={{ backgroundColor: '#01CB75', alignSelf: 'flex-end' }}
                        position="bottomRight"
                        onPress={() => this.props.navigation.navigate('addCustomer')}
                    >
                        <Icon name="add" />
                    </Fab>
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
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(customer);