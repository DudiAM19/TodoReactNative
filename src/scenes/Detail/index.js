import React from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
const {width} = Dimensions.get('window');

const arrow = require('../../assets/Arrow.png');

const Detail = ({route, navigation}) => {
  const image = route.params.image;

  return (
    <View style={styles.Container}>
      {console.log('image' + image)}
      <View style={styles.Header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={arrow} style={styles.Left} />
        </TouchableOpacity>
        <Text style={styles.TextDetail}>Detail</Text>
      </View>
      <Image source={JSON.stringify(image)} style={styles.Img} />
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  Container: {
    backgroundColor: '#555555',
    flex: 1,
  },
  Header: {
    flexDirection: 'row',
    width: width,
    height: width * 0.15,
    backgroundColor: '#333333',
    alignItems: 'center',
  },
  Left: {
    width: width * 0.05,
    height: width * 0.05,
    marginHorizontal: width * 0.06,
  },
  TextDetail: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
  },
  Img: {
    marginVertical: width * 0.2,
    width: width,
    height: width * 0.8,
  },
});
