import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, Alert, ScrollView, FlatList } from 'react-native';
import axios from 'axios';
import base64 from 'base-64';
import QueryString from 'query-string';

import Tweet from './components/Tweet';

let consumerKey = '<<Insert your Twitter Consumer Key here>>';
let consumerSecret = '<<Insert your Twitter Consumer Secret here>>';


export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      accessToken: '',
      tweets: [
     ]
    }

    let encodedCredentials = base64.encode(consumerKey + ':' + consumerSecret);
    axios({
      method: 'post',
      url: 'https://api.twitter.com/oauth2/token',
      data: QueryString.stringify({
        'grant_type': 'client_credentials'

      }),
      headers: {
        'authorization': 'Basic ' + encodedCredentials,
        'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    })
    .then(response => {
      this.setState(previous => {
        return {
          accessToken: response.data['access_token']
        }
      });
    });

  }
  updateQuery = (text) => {
    this.setState({
        query: text
    });
  }
  search = () => {
    let text = this.state.query;
   axios({
      'method': 'get',
      'url': 'https://api.twitter.com/1.1/search/tweets.json',
      'params': {
        'q': this.state.query
      },
      'headers': {
        'authorization': 'Bearer ' + this.state.accessToken
      }
    })
    .then((response) => {
      this.setState({
          tweets: response.data.statuses
      });
    })

    .catch((error) => {
      console.log(error.response);
    });

  }
  render() {
    let pic = {
      uri: 'https://cdn.pixabay.com/photo/2016/11/29/09/49/adventure-1868817_960_720.jpg'
    };
    return (
      <View style={styles.container}>

        <TextInput onChangeText={this.updateQuery} style={{ backgroundColor: 'white', width: '100%', height: 40 }} placeholder="Search Twitter" />
        <Button onPress={this.search} title="Search" />
        <FlatList data={this.state.tweets} keyExtractor={(item, index) => {return item.id}} renderItem={({ item }) => {
          return (<Tweet username={item.user.screen_name} content={item.text} avatarUri={item.user.profile_image_url} />)
        }} />
      </View>
    );


  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8,
    backgroundColor: '#fff'
  },
});

