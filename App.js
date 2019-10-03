import React from 'react';
import { Alert, FlatList, ActivityIndicator, Text, View, Button  } from 'react-native';


import { createStore, applyMiddleware } from 'redux'
import {appartmentApp, initialState} from './redusers'


import { Provider  } from 'react-redux'

import Screen from './componets/nav'
import Content from './componets/content'

import thunkMiddleware from 'redux-thunk'

const store = createStore(appartmentApp,
    applyMiddleware( thunkMiddleware)
    );

export default class App extends React.Component {

  constructor(props){
    super(props);
  }


  render(){
    return(
      <Provider store={store}>
        <Screen />
      </Provider>
    );
  }
}

