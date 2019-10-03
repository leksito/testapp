import { connect } from 'react-redux'

import React from 'react';

import { Dimensions, StyleSheet, Alert, FlatList, ActivityIndicator, Text, View, Button  } from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';


import Search from './search'
import Map from './map'
import List from './list'
import Details from './details'
import Favorites from './favorites'

export default class Content extends React.Component {

  constructor(props) {
    console.log(props)
    super(props);
  }


  render () {

    if (this.props.displayType === 'SHOW_SEARCH') {
      return(
          <View style={{flex: 1, paddingTop:5}}>
            <Search />
          </View>
          )
    } else if (this.props.displayType == 'SHOW_LIST') {
      return(
        <View style={{flex: 1, paddingTop:5}}>
          <List /> 
        </View>
      )
    } else if (this.props.displayType == 'SHOW_MAP'){ 
      return (
        <View style={{flex: 1, paddingTop:5}}>
          <Map />
        </View>
      );
    } else if (this.props.displayType == 'DETAILS'){ 
      return (
        <View style={{flex: 1, paddingTop:5}}>
          <Details />
        </View>
      );
    } else if (this.props.displayType == 'REQUST'){ 
      return (
        <View style={{flex: 1, paddingTop:5}}>
          <Text> LOADING DATA </Text>
        </View>
      );
    } else if (this.props.displayType == 'FAVORITES'){ 
      return (
        <View style={{flex: 1, paddingTop:5}}>
          <Favorites />
        </View>
      );
    } else {
      return (
        <View style={{flex: 1, paddingTop:5}}>
    <Spinner visible={true} textContent={"Loading..."} overlayColor= '#079CDC' />
        </View>
          )
    }
  }

}

