import { connect } from 'react-redux'
import React from 'react';
import { TextInput, FlatList, ActivityIndicator, Text, View, ScrollView, Button  } from 'react-native';

import { fetchDetails } from '../actions';

import Expo, { SQLite  } from 'expo';

const db = SQLite.openDatabase('db.db');

class Favorites extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  details(id) {
    this.props.dispatch(fetchDetails(id))
  }


  render () {
      console.log("FAVORITES PROPS")
      console.log(this.props.favorites)
      return(
          <ScrollView style={{flex: 1, paddingTop:5, }}>
          {this.props.favorites.map( ({id, address}) => (
                  <Button
                    color = "#079CDC"
                    key = {id}
                    onPress = { ()=> { this.details(id) } }
                    title = {address}
                    />

           ) )}

          </ScrollView>
          )
  }
}

function mapStateToProps(state) {
  return {
    favorites: state.favorites
  }
}

export default connect(mapStateToProps)(Favorites)
