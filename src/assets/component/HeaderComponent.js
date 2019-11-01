import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
    Header,
    Body,
    Title,
} from "native-base";

export default class HeaderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Header style={{ backgroundColor: '#75AF34', marginBottom: 15 }}>
                <Body style={{ paddingLeft: 15 }}>
                    <Title style={styles.titleStyle}>{this.props.titlename}</Title>
                </Body>
            </Header>
        );
    }
}


const styles = StyleSheet.create({
    titleStyle: {
        color: 'white',
        alignSelf: 'center',
        fontWeight: 'bold'
    },
})