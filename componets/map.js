import { connect } from 'react-redux'
import React from 'react';
import { Dimensions, Image, StyleSheet, Alert, FlatList, ActivityIndicator, Text, View, Button  } from 'react-native';
import MapView, { Callout, Marker, ProviderPropType  } from 'react-native-maps';

import { fetchDetails } from '../actions';

class Map extends React.Component {

  constructor(props) {
    super(props);


    latitude = (53.79240102879828 + 54.012224713360794)/2;
    longitude = (27.24289046715503 + 27.881396709677233)/2;
    latitude_delta =  0.15;
    longitude_delta = 0.15;


    this.state = {
      region: {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: latitude_delta,
        longitudeDelta: longitude_delta,
      }
    };
  }

  _onPressMarker(id) {
    this.props.dispatch(fetchDetails(id))
  }


  render () {
    return (
        <View style={styles.container}>
          <MapView
            provider={this.props.provider}
            initialRegion={this.state.region}
            style={styles.map}
          >
          {(this.props.points.features || []).map( point => (
                <Marker
                key = {point["id"]}
                onPress={ () => {this._onPressMarker(point["id"])} }
                coordinate={{
                  latitude: point["geometry"]["coordinates"][0],
                  longitude: point["geometry"]["coordinates"][1]
                }}>

                </Marker>
                ) )}
          </MapView>
      </View>
    );
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
    points: state.points,
  }
}

export default connect(mapStateToProps)(Map)
