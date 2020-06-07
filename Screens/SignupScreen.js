/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, TextInput, ScrollView, Dimensions} from 'react-native';
import {Button} from 'native-base';
import * as Animatable from 'react-native-animatable';
import {signup} from '../scr/actions/index';
import {connect} from 'react-redux';

const width = Dimensions.get('window').width;

class signupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
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
              marginTop: 10,
              justifyContent: 'center',
            }}
            resizeMode="contain"
          />
          <Animatable.View
            animation={'fadeInUpBig'}
            useNativeDriver
            style={{flex: 1, paddingBottom: 55}}>
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
                Sign Up
              </Text>
              <Text style={{fontSize: 18, marginTop: 10}}>User Name</Text>
              <TextInput
                style={{
                  borderBottomWidth: 1.5,
                  height: 40,
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
              <Text style={{fontSize: 18, marginTop: 20}}>Email Id</Text>
              <TextInput
                placeholder="eg. abc@gmail.com"
                style={{
                  borderBottomWidth: 1.5,
                  height: 40,
                  fontSize: 15,
                  borderColor:
                    this.state.email == null
                      ? 'black'
                      : this.state.email == ''
                      ? 'black'
                      : 'darkblue',
                }}
                value={this.state.email}
                onChangeText={(val) => {
                  this.setState({
                    email: val,
                  });
                }}
              />
              <Text style={{fontSize: 18, marginTop: 20}}>Password</Text>
              <TextInput
                secureTextEntry
                style={{
                  borderBottomWidth: 1.5,
                  height: 40,
                  fontSize: 15,
                  borderColor:
                    this.state.password == null
                      ? 'black'
                      : this.state.password == ''
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
                  this.props.signup(this.state.username, this.state.password);
                }}>
                <Text
                  style={{fontSize: 18, textAlign: 'center', width: '100%'}}>
                  Sign Up
                </Text>
              </Button>
            </View>
            <Text
              onPress={() => {
                this.props.navigation.navigate('Login');
              }}
              style={{
                alignSelf: 'center',
                fontSize: 18,
                marginTop: 20,
                width: '95%',
                textAlign: 'center',
              }}>
              Already Registered ? Click Here to{' '}
              <Text style={{color: 'darkblue'}}>Login</Text>
            </Text>
          </Animatable.View>
        </ScrollView>
      </View>
    );
  }
}

export default connect(null, {signup})(signupScreen);
