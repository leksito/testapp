import { connect } from 'react-redux'
import React from 'react';
import { Image, TextInput, FlatList, ActivityIndicator, Text, View, ScrollView, Button  } from 'react-native';

import { fetchDetails } from '../actions';




class List extends React.Component {

  constructor(props) {
    super(props);
    this.state = props.state
  }

  details(id) {
    console.log(id);
    this.props.dispatch(fetchDetails(id))

  }

  render () {
      return(
          <ScrollView style={{flex: 1, paddingTop:5, }}>
            {(this.props.appartments || []).map( appartment => (
                  <View key={appartment.id}>
                    <View style={{flexDirection: "row"}}>
                      <View style={{flex:2, padding: 2}}>
                        <Image style={{width: 100, height: 100}} source={{uri: appartment["photo"]}} />
                      </View>
                      <View style={{flex:5, paddingRight: 5, paddingLeft: 5}}>
                        <Text style={{fontWeight: 'bold', fontSize: 14}}> {appartment["location"]["address"]} </Text>
                        <View style={{flexDirection: "row"}}>
                        <Text style={{color: "#AB1E22"}}> {appartment["price"]["amount"] + " " + appartment["price"]["currency"]} </Text>
                        <Text > { appartment["rent_type"] ? "Комнат: "+ appartment["rent_type"].match(/\d+/i)[0] : "" } </Text>
                        </View>
                        <Button
                          color = "#079CDC"
                          onPress = { ()=> { this.details(appartment.id) } }
                          title = "Details"
                          />
                      </View>
                    </View>
                  </View>
                  ) )}
          </ScrollView>
          )
  }
}

function mapStateToProps(state) {
  return {
    appartments: state.json["apartments"],
  }
}

export default connect(mapStateToProps)(List)
