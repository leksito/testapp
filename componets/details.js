import { connect } from 'react-redux'
import React from 'react';
import { TouchableOpacity, StyleSheet, TextInput, Image, Dimensions, FlatList, ActivityIndicator, Text, View, ScrollView, Button  } from 'react-native';

import ImageSlider from 'react-native-image-slider';

import { fetchDetails } from '../actions';

import Communications from 'react-native-communications';

import MapView, { Callout, Marker, ProviderPropType  } from 'react-native-maps';


const { width  } = Dimensions.get('window');
const height = width * 0.5

class Details extends React.Component {

  constructor(props) {
    super(props);

    latitude = this.props.details.coordinate.latitude
    longitude = this.props.details.coordinate.longitude
    latitude_delta =  0.1;
    longitude_delta = 0.1;

    this.state = {
      region: {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: latitude_delta,
        longitudeDelta: longitude_delta,
      }
    };

    console.log("DETAILS", this.props.details)

  }

  details(id) {
    this.props.dispatch(fetchDetails(id))
  }

  render () {
      return(
          <ScrollView>
            <View style={styles.container}>
            <View style={styles.container}>
              <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
              >
                {this.props.details.images.map(image => (
                  <Image style={{width, height}} source={{uri: image}} />
                ))}
              </ScrollView>
            </View>

            <View style={{flexDirection: 'row'}}>
            <View style={{flex: 3, padding: 5}}>
            {this.props.details.phone.split(",").map( phone => (
                  <TouchableOpacity onPress={() => Communications.phonecall(phone, true)}>
                    <View>
                      <Text style={{color: "#079CDC", fontWeight: 'bold', fontSize: 20}}> {phone} </Text>
                    </View>
                   </TouchableOpacity>
                  ) )}
              </View>
              <View style={{flex:1, padding: 5}}>
                <Text style={{fontSize: 20, color: "#AB1E22"}}> {this.props.details.price} </Text>
              </View>
            </View>

            <View style={{padding: 10}}>
              <Text style={{fontWeight: 'bold', fontSize: 20}}> {this.props.details.address} </Text>
            </View>

            <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1}}></View>
              <View style={{flex: 2, backgroundColor: "#88CC88", justifyContent: 'center', alignItems: 'center'}}>
              {this.props.details.bulletsWith.map( (bullet) => (
                    <Text style={{fontSize: 8}}> {bullet} </Text>
                    ) )}
              </View>
              <View style={{flex: 2, backgroundColor: "#FFAAAA", justifyContent: 'center', alignItems: 'center'}}>
              {this.props.details.bulletsWithout.map( (bullet) => (
                    <Text  style={{fontSize: 8}}> {bullet} </Text>
                    ) )}
              </View>
                <View style={{flex: 1}}></View>
            </View>
            <View style={{padding: 10}}>
            <Text style={{fontSize: 14}}> {this.props.details.description} </Text>
            </View>
            </View>
        <View style={{height: 150}}>
          <MapView
            provider={this.props.provider}
            initialRegion={this.state.region}
            style={styles.map}
          >
            <Marker
              key={this.props.details.id}
              coordinate={this.props.details.coordinate}
              ></Marker>
          </MapView>
      </View>

          </ScrollView>
          )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
  },
  map: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

function mapStateToProps(state) {
  return {
    details: state.details,
    points: state.points
  }
}

export default connect(mapStateToProps)(Details)
