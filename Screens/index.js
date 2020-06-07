import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import loginScreen from './loginScreen';
import signupScreen from './SignupScreen';
import {connect} from 'react-redux';
import HomeScreen from './HomeScreen';
import AddTodoScreen from './AddTodoScreen';
import {checkLogin} from '../scr/actions';
const Stack = createStackNavigator();

class index extends Component {
  componentDidMount = async () => {
    await this.props.checkLogin();
  };

  render() {
    if (!this.props.isSignedIn) {
      return (
        <Stack.Navigator
          // initialRouteName="SignUp"
          screenOptions={{
            animationEnabled: false,
          }}>
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            component={loginScreen}
            name="Login"
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            component={signupScreen}
            name="SignUp"
          />
        </Stack.Navigator>
      );
    } else {
      return (
        <Stack.Navigator
          screenOptions={{
            animationEnabled: false,
          }}>
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            component={HomeScreen}
            name="Home"
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            component={AddTodoScreen}
            name="AddTodo"
          />
        </Stack.Navigator>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.details.isSignedIn,
  };
};

export default connect(mapStateToProps, {checkLogin})(index);
