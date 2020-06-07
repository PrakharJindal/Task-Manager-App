import React, {Component} from 'react';
import Index from './Screens/index';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import Reducers from './scr/reducer/index';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    console.disableYellowBox = true;
  };

  render() {
    return (
      <Provider store={createStore(Reducers, applyMiddleware(thunk))}>
        <NavigationContainer>
          <Index />
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;
