import React, {Component} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';


const style = StyleSheet.create({
    card: {
        flex: 1,
        flexDirection: 'row'
    }
});

export default class Tweet extends Component {

    render() {
        return (
            <View style={style.card}>
                <Image source={{ uri: this.props.avatarUri }} style={{width: 50, height: 50, marginRight: 8}} />
                <View style={{flexDirection: 'column'}}>
                    <Text style={{fontWeight: 'bold'}}>{this.props.username}</Text>
                    <Text style={{width: 270}}>{this.props.content}</Text>
                </View>
            </View>
        )
    }
}

