import { connect } from 'react-redux'
import React from 'react';
import { Alert, FlatList, ActivityIndicator, Text, View, Button  } from 'react-native';

import {DisplayType, swipeRight, toFavorites, swipeLeft, comeBack, addToFavorites} from '../actions'

import Content from './content'

import Expo, { SQLite  } from 'expo';

const db = SQLite.openDatabase('db.db');

class Screen extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    db.transaction(tx => {
      tx.executeSql(
        'create table if not exists favorites (id integer primary key not null, address text);'
      );
    });
    db.transaction(tx => {
      tx.executeSql('select * from favorites', [], (_, { rows: { _array } }) => {
        this.props.dispatch(toFavorites(_array))
      });
    });
  }

  _swipeLeft() {
    this.props.dispatch(swipeLeft(this.props.displayType))
  }

  _swipeRight() {
    this.props.dispatch(swipeRight(this.props.displayType))
  }

  _comeback() {
    this.props.dispatch(comeBack())
  }

  _favorites(id, name, price) {
    console.log(id, name, price)
  }

  _addToFavorites(id, address) {
    console.log(id, address)
    db.transaction(tx => {
      tx.executeSql('insert or ignore into favorites (id, address) values (?, ?);', [id, address]);
    });
    this.props.dispatch(addToFavorites(id, address))
  }

  render () {

    console.log(this.props.displayType);
    if(this.props.displayType === 'DETAILS') {
      return(
          <View style={{flex: 1, paddingTop:5}}>
            <View style={{flex: 1,
              flexDirection: 'row',
              height: 50, paddingTop:20,
              justifyContent: 'center'
            }}>
              <View style={{ flex: 6 }}>
                <Button
                  onPress={this._comeback.bind(this)}
                  title="<<"
                  />
              </View>
              <View style={{ flex: 1 }}>
                <Button
                  onPress={this._addToFavorites.bind(this, this.props.details.id, this.props.details.address)}
                  title="★"
                  />
              </View>
            </View>
            <View style={{flex: 19}}>
            <Content
              displayType={this.props.displayType}
            />
            </View>
          </View>
          )

    }

    if(
        this.props.displayType !== 'SHOW_MAP' &&
        this.props.displayType !== 'SHOW_LIST' &&
        this.props.displayType !== 'SHOW_SEARCH' &&
        this.props.displayType !== 'FAVORITES'
        ) {
      return(
          <View style={{flex: 1, paddingTop:5}}>
            <View style={{flex: 19}}>
            <Content
              displayType={this.props.displayType}
            />
            </View>
          </View>
          )

    }

    header = "header";
    if (this.props.displayType === 'SHOW_LIST') {
      header = "List"
    } else if (this.props.displayType === 'SHOW_MAP') {
      header = "Map"
    } else if (this.props.displayType === 'SHOW_SEARCH') {
      header = "Search"
    } else if (this.props.displayType === 'FAVORITES') {
      header = "Favorites"
    } else {
      header = this.props.displayType
    }

    return(
        <View style={{flex: 1, paddingTop:5 }}>
          <View style={{flex: 1,
            flexDirection: 'row',
            height: 50, paddingTop:20,
            justifyContent: 'center'
          }}>
            <View style={{ flex: 1 }}>
              <Button
                onPress={this._swipeLeft.bind(this)}
                title="<"
                />
            </View>
            <View style={{
              flex: 4,
              backgroundColor: "#079CDC",
            }}>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 24, textAlign: 'center'}}> { header } </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Button
                onPress={this._swipeRight.bind(this)}
                title=">"
                />
            </View>
          </View>
          <View style={{flex: 17}}>
          <Content
            displayType={this.props.displayType}
          />
          </View>
        </View>
        )
  }

}

function mapStateToProps(state) {
  return {
    displayType: state.displayType,
    left_button_title: state.left_button,
    right_button_title: state.right_button,
    details: state.details
  }
}


export default connect(mapStateToProps)(Screen)
