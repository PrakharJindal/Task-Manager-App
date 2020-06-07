/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, StatusBar, Text} from 'react-native';
import {Title, Button, Header, Body, Right} from 'native-base';
import {logout} from '../scr/actions';
import {connect} from 'react-redux';

class SettingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar backgroundColor="black" />
        <Header>
          <Body style={{alignContent: 'center', justifyContent: 'center'}}>
            <Title style={{fontSize: 26, textAlign: 'center', width: '100%'}}>
              Setting
            </Title>
          </Body>
        </Header>
        <Button
          info
          rounded
          onPress={() => {
            this.props.logout();
          }}
          style={{marginTop: 50, width: '50%', alignSelf: 'center'}}>
          <Text style={{textAlign: 'center', width: '100%', fontSize: 18}}>
            Log-Out
          </Text>
        </Button>
      </View>
    );
  }
}

export default connect(null, {logout})(SettingScreen);
