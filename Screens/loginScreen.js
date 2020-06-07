/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, Image, TextInput, Dimensions} from 'react-native';
import {Button} from 'native-base';
import axios from 'axios';
import * as Animatable from 'react-native-animatable';
import {ScrollView} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {login} from '../scr/actions/index';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

class loginScreen extends Component {
  constructor(props) {
    console.log(height, '  ', width);
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView style={{flex: 1, bottom: 0}}>
          <Animatable.Image
            animation={'fadeIn'}
            duration={3000}
            source={require('../assets/icon.png')}
            style={{
              width: width * 0.35,
              height: width * 0.35,
              alignSelf: 'center',
              marginTop: 20,
              justifyContent: 'center',
            }}
            resizeMode="contain"
          />
          <Animatable.View
            animation={'fadeInUpBig'}
            useNativeDriver
            style={{flex: 1, paddingBottom: 30}}>
            <View
              style={{
                width: '95%',
                borderRadius: 30,
                marginTop: 30,
                backgroundColor: '#85e8f2',
                paddingLeft: 20,
                paddingRight: 20,
                paddingTop: 10,
                paddingBottom: 20,
                alignSelf: 'center',
              }}>
              <Text
                style={{alignSelf: 'center', fontSize: 30, marginBottom: 20}}>
                Login
              </Text>
              <Text style={{fontSize: 18, marginTop: 10}}>User Name</Text>
              <TextInput
                style={{
                  borderBottomWidth: 1.5,
                  height: 50,
                  fontSize: 15,
                  borderColor:
                    this.state.username == null
                      ? 'black'
                      : this.state.username == ''
                      ? 'black'
                      : 'darkblue',
                }}
                value={this.state.username}
                onChangeText={(val) => {
                  this.setState({
                    username: val,
                  });
                }}
              />
              <Text style={{fontSize: 18, marginTop: 20}}>Password</Text>
              <TextInput
                style={{
                  borderBottomWidth: 1.5,
                  height: 50,
                  fontSize: 15,
                  borderColor:
                    this.state.username == null
                      ? 'black'
                      : this.state.username == ''
                      ? 'black'
                      : 'darkblue',
                }}
                value={this.state.password}
                onChangeText={(val) => {
                  this.setState({
                    password: val,
                  });
                }}
              />
              <Button
                rounded
                info
                style={{marginTop: 30}}
                onPress={() => {
                  this.props.login(this.state.username, this.state.password);
                }}>
                <Text
                  style={{fontSize: 18, textAlign: 'center', width: '100%'}}>
                  Login
                </Text>
              </Button>
            </View>
            <Text
              onPress={() => {
                this.props.navigation.navigate('SignUp');
              }}
              style={{
                alignSelf: 'center',
                fontSize: 18,
                marginTop: 20,
                width: '95%',
                textAlign: 'center',
              }}>
              Not Registered ? Click Here to{' '}
              <Text style={{color: 'darkblue'}}>SignUp</Text>
            </Text>
          </Animatable.View>
        </ScrollView>
      </View>
    );
  }
}

export default connect(null, {login})(loginScreen);
