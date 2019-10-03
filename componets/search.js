import { connect } from 'react-redux'
import React from 'react';
import { TextInput, FlatList, ActivityIndicator, Text, View, Button  } from 'react-native';

import { setSearchState, fetchData, fetchPoints } from '../actions';



class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = props.state
  }


  searchAppartments(searchState){
    url = "https://ak.api.onliner.by/search/apartments"
    query = { "currency": "usd", "bounds[lb][lat]": "53.79240102879828",
      "bounds[lb][long]": "27.24289046715503", "bounds[rt][lat]": "54.012224713360794",
      "bounds[rt][long]": "27.881396709677233", "page": "1", "_": "0.21860874317233603"
    }

    query = { ...query, "price[min]": searchState.min, "price[max]": searchState.max, }
    query = [...Object.entries(query), ["rent_type[]", (searchState.button1 ? "1_room"  : undefined)],
      ["rent_type[]", (searchState.button2 ? "2_rooms" : undefined)],
      ["rent_type[]", (searchState.button3 ? "3_rooms" : undefined)],
      ["rent_type[]", (searchState.button4 ? "4_rooms" : undefined)],
      ["rent_type[]", (searchState.button5 ? "5_rooms" : undefined)],
      ["rent_type[]", (searchState.button6 ? "6_rooms" : undefined)]]
      .filter( (v, i)=> { return v[1] !== undefined } )
      .map( (i) => { return i.join("=") } )
      .join("&")

    return encodeURI(url + "?" + query)
  }

  searchPoints(searchState){
    url = "https://ak.api.onliner.by/search/points"
    query = { "currency": "usd", "bounds[lb][lat]": "53.79240102879828",
      "bounds[lb][long]": "27.24289046715503", "bounds[rt][lat]": "54.012224713360794",
      "bounds[rt][long]": "27.881396709677233", "page": "1", "_": "0.21860874317233603"
    }

    query = { ...query, "price[min]": searchState.min, "price[max]": searchState.max, }
    query = [...Object.entries(query), ["rent_type[]", (searchState.button1 ? "1_room"  : undefined)],
      ["rent_type[]", (searchState.button2 ? "2_rooms" : undefined)],
      ["rent_type[]", (searchState.button3 ? "3_rooms" : undefined)],
      ["rent_type[]", (searchState.button4 ? "4_rooms" : undefined)],
      ["rent_type[]", (searchState.button5 ? "5_rooms" : undefined)],
      ["rent_type[]", (searchState.button6 ? "6_rooms" : undefined)]]
      .filter( (v, i)=> { return v[1] !== undefined } )
      .map( (i) => { return i.join("=") } )
      .join("&")

    return encodeURI(url + "?" + query)
  }

  submit() {
    this.props.dispatch(setSearchState(this.state));
    url = this.searchAppartments(this.state);
    this.props.dispatch(fetchData(url));
    url = this.searchPoints(this.state);
    console.log("points:", url)
    this.props.dispatch(fetchPoints(url))
  }

  render () {
      return(
          <View style={{flex: 1, paddingTop:5, }}>
            <View style={{flex: 1, paddingLeft: 30, paddingRight: 30}}>
            <TextInput
              style={{height: 40, paddingTop: 10, paddingLeft: 30, paddingRight: 60}}
              placeholder={"" + this.state.min}
              onChangeText={(text) => this.setState({...this.state, min: text})}
            />
            <TextInput
              style={{height: 40, paddingTop: 10, paddingLeft: 30, paddingRight: 30}}
              placeholder={"" + this.state.max}
              onChangeText={(text) => this.setState({...this.state, max: text})}
            />
            </View>


            <View style={{flex: 1,
              flexDirection: 'row',
              height: 100, paddingTop:20, paddingLeft: 30, paddingRight: 30,
              justifyContent: 'center'
            }}>
              <View style={{ flex: 1 }}>
                <Button
                  color={ this.state.button1 ? "#72C2E5" : "#079CDC" }
                  onPress={() => { this.setState({...this.state, button1: !this.state.button1}) }}
                  title="1"
                  />
              </View>
              <View style={{ flex: 1 }}>
                <Button
                  color={ this.state.button2 ? "#72C2E5" : "#079CDC" }
                  onPress={() => { this.setState({...this.state, button2: !this.state.button2}) }}
                  title="2"
                  />
              </View>
              <View style={{ flex: 1 }}>
                <Button
                  color={ this.state.button3 ? "#72C2E5" : "#079CDC" }
                  onPress={() => { this.setState({...this.state, button3: !this.state.button3}) }}
                  title="3"
                  />
              </View>
              <View style={{ flex: 1 }}>
                <Button
                  color={ this.state.button4 ? "#72C2E5" : "#079CDC" }
                  onPress={() => { this.setState({...this.state, button4: !this.state.button4}) }}
                  title="4"
                  />
              </View>
              <View style={{ flex: 1 }}>
                <Button
                  color={ this.state.button5 ? "#72C2E5" : "#079CDC" }
                  onPress={() => { this.setState({...this.state, button5: !this.state.button5}) }}
                  title="5"
                  />
              </View>
              <View style={{ flex: 1 }}>
                <Button
                  color={ this.state.button6 ? "#72C2E5" : "#079CDC" }
                  onPress={() => { this.setState({...this.state, button6: !this.state.button6}) }}
                  title="6"
                  />
              </View>
            </View>

            <View style={{ flex: 4, paddingLeft: 50, paddingRight: 50
            }}>
              <Button
                color="#079CDC"
                onPress={this.submit.bind(this)}
                title="Submit"
                />
            </View>

          </View>
          )
  }
}

function mapStateToProps(state) {
  return {
    state: state.searchState,
    query: state.query
  }
}

export default connect(mapStateToProps)(Search)
