import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
  SafeAreaView,
  TextInput,
  Alert,
} from 'react-native';
import CircleCheckBox from 'react-native-circle-checkbox';
const {width} = Dimensions.get('window');
import axios from 'axios';

const DATA = [
  {
    id: 1,
    image: require('../../assets/pizza1.jpeg'),
    name: 'Pizza_1',
    price: 8,
  },
  {
    id: 2,
    image: require('../../assets/pizza2.jpg'),
    name: 'Pizza_2',
    price: 10,
  },
  {
    id: 3,
    image: require('../../assets/pizza3.jpeg'),
    name: 'Pizza_3',
    price: 12,
  },
];

const SIZE = ['Small', 'Medium', 'Large'];

const ContactItem = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        margin: 20,
        width: width * 0.5,
        backgroundColor: 'white',
        height: width * 0.14,
        justifyContent: 'center',
        paddingLeft: width * 0.03,
        borderRadius: 12,
        flexDirection: 'row',
      }}>
      <View style={{flex: 1}}>
        <Text>{props.name}</Text>
        <Text>{props.email}</Text>
      </View>
      <TouchableOpacity
        onPress={props.onDelete}
        style={{
          backgroundColor: 'yellow',
          width: width * 0.04,
          height: width * 0.14,
          borderTopRightRadius: 12,
          borderBottomRightRadius: 12,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <Text style={{color: 'red'}}>X</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

// const Item = props => {
//   return (
//     <TouchableOpacity style={styles.MenuBtn}>
//       <TouchableOpacity style={styles.MenuImageBtn} onPress={props.onPress}>
//         <Image source={props.image} style={styles.MenuImage} />
//       </TouchableOpacity>
//       <Text style={styles.TextInfo}>{props.name}</Text>
//       <Text style={styles.TextInfo}>{'$' + props.price}</Text>
//     </TouchableOpacity>
//   );
// };

const Pizza = ({navigation}) => {
  // const [checked, setChecked] = useState(false);
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [button, setButton] = useState('Simpan');
  const [selectedUser, setSelectedUser] = useState({});

  const url = 'https://61571c4b8f7ea600179850ae.mockapi.io/contact';

  const getData = () => {
    axios
      .get(url)
      .then(function (response) {
        // console.log(response.data);
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const submit = () => {
    const Data = {
      name,
      email,
    };

    if (button === 'Simpan') {
      axios.post(url, Data).then(response => {
        // console.log('response', response);
        // console.log('data', Data);
        setName('');
        setEmail('');
        getData();
      });
    } else if (button === 'Update') {
      axios
        .put(
          `https://61571c4b8f7ea600179850ae.mockapi.io/contact/${selectedUser.id}`,
          Data,
        )
        .then(response => {
          console.log(response);
          setName('');
          setEmail('');
          getData();
          setButton('Simpan');
        })
        .catch(error => console.log(error));
    }
  };

  const SelectItem = item => {
    console.log('selected item ', item);
    setName(item.name);
    setEmail(item.email);
    setButton('Update');
  };

  const DeleteItem = item => {
    console.log(item);
    axios
      .delete(`https://61571c4b8f7ea600179850ae.mockapi.io/contact/${item.id}`)
      .then(response => {
        console.log(response.data);
        getData();
      });
  };

  return (
    <SafeAreaView style={styles.Container}>
      <Text style={styles.Text}>To do app</Text>
      {/* <View style={{alignItems: 'center'}}>
        <FlatList
          data={DATA}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3}
          renderItem={({item}) => (
            <Item
              image={item.image}
              name={item.name}
              price={item.price}
              onPress={() => navigation.navigate('Detail', {image: item.image})}
            />
          )}
        />
      </View> */}
      <View style={styles.SizeSection}>
        {/* <Text style={styles.TextSize}>Size</Text>
        <View style={styles.CheckBoxSection}>
          {SIZE.map((item, index) => (
            <CircleCheckBox
              key={index}
              checked={checked === index ? true : false}
              onToggle={() => {
                setChecked(index);
              }}
              styleCheckboxContainer={{marginHorizontal: 10}}
              label="Medium"
              outerColor="white"
              filterColor="#555555"
              innerColor="white"
              styleLabel={{color: 'white'}}
              // labelPosition={LABEL_POSITION.LEFT}
            />
          ))}
        </View> */}
        <View style={styles.ToppingSection}>
          <Text>Toppings</Text>
        </View>
        <FormInput
          value1={name}
          value2={email}
          onChangeText1={value => setName(value)}
          onChangeText2={value => setEmail(value)}
          onPress={submit}
          textBtn={button}
        />
      </View>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <ContactItem
            name={item.name}
            email={item.email}
            onPress={() => SelectItem(item)}
            onDelete={() =>
              Alert.alert('Peringatan', 'Anda yakin akan menghapus?', [
                {text: 'Tidak', onPress: () => console.log('tidak jadi')},
                {text: 'Ya', onPress: () => DeleteItem(item)},
                ,
              ])
            }
          />
        )}
      />
    </SafeAreaView>
  );
};

const FormInput = props => {
  return (
    <View>
      <TextInput
        style={styles.Form}
        placeholder="name"
        value={props.value1}
        onChangeText={props.onChangeText1}
      />
      <TextInput
        style={styles.Form}
        placeholder="email"
        value={props.value2}
        onChangeText={props.onChangeText2}
      />
      <TouchableOpacity style={styles.Submit} onPress={props.onPress}>
        <Text style={styles.TextSubmit}>{props.textBtn}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Pizza;

const styles = StyleSheet.create({
  Container: {
    backgroundColor: '#555555',
    flex: 1,
    // alignItems: 'center',
  },
  Text: {
    color: 'white',
    margin: width * 0.03,
    fontSize: 15,
  },
  MenuBtn: {
    margin: width * 0.02,
    backgroundColor: '#606060',
    width: width * 0.29,
    alignItems: 'center',
  },
  MenuImageBtn: {},
  MenuImage: {
    width: width * 0.22,
    height: width * 0.2,
    marginVertical: width * 0.05,
  },
  TextInfo: {
    color: 'white',
    marginBottom: width * 0.03,
  },
  SizeSection: {
    margin: width * 0.03,
  },
  TextSize: {
    color: 'white',
    fontSize: 15,
  },
  CheckBoxSection: {
    flexDirection: 'row',
    marginHorizontal: width * 0.04,
    marginVertical: width * 0.07,
  },
  Form: {
    borderWidth: 1,
    marginVertical: width * 0.02,
    backgroundColor: 'white',
    borderRadius: 7,
  },
  Submit: {
    borderWidth: 2,
    width: width * 0.3,
    height: width * 0.1,
    backgroundColor: '#a7eb96',
    borderColor: 'white',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextSubmit: {
    color: 'white',
    fontWeight: 'bold',
  },
});
