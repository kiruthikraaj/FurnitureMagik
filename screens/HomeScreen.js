import AsyncStorage from '@react-native-community/async-storage';
import React, {useCallback, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  StatusBar,
  FlatList,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import OfferCard from '../components/OfferCard';
import {useInterval} from '../components/useInterval';

export default function HomeScreen({navigation}) {
  const [data, setData] = useState([]);
  const [storeKey, setStoreKey] = useState('');
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const getUser = useCallback(async () => {
    try {
      AsyncStorage.getItem('user').then((response) => {
        if (response !== null) {
          setStoreKey(response);
        }
      });
    } catch (e) {}
  }, []);

  useInterval(async () => {
    // getoffers();
    try {
      await AsyncStorage.getItem(storeKey, (err, res) => {
        if (err) {
          console.log(err);
        }
        if (res) {
          let offers = JSON.parse(res);
          setData(offers);
        }
      });
    } catch (e) {
      console.log(e);
    }
  }, 1000);

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) {
      setInterval(() => {
        setLoader(false);
      }, 2000);
    }
    return () => {
      isSubscribed = false;
    };
  });

  const deleteOffer = async (id) => {
    const temp = [...data];
    temp.splice(id, 1);
    setData(temp);
    try {
      await AsyncStorage.setItem(storeKey, JSON.stringify(temp), (err) => {
        if (err) {
          console.log('Error Deleting Data');
        } else {
          ToastAndroid.show('Removed Offer', ToastAndroid.SHORT);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  const _renderItem = (item, index) => {
    return (
      <OfferCard
        id={index}
        action={deleteOffer}
        name={item.name}
        type={item.type}
        image={item.image}
        price={item.price}
        discount={item.discount}
      />
    );
  };

  return loader ? (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
      }}>
      <ActivityIndicator size="large" color="#ff4d5f" />
    </View>
  ) : (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      {data.length > 0 ? (
        <View style={{flex: 1}}>
          <View
            style={{
              height: 50,
              borderBottomWidth: 1,
              justifyContent: 'center',
              borderBottomColor: '#dbdbdb',
              paddingLeft: 10,
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Medium',
                color: '#404040',
                marginLeft: 5,
                marginTop: 5,
                fontSize: 20,
                textAlignVertical: 'bottom',
              }}>
              Your Offers
            </Text>
          </View>
          <FlatList
            data={data}
            style={{flex: 1, marginTop: 5}}
            renderItem={({item, index}) => _renderItem(item, index)}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      ) : (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Image
            source={require('../assets/empty.png')}
            style={{height: '50%', width: '50%'}}
            resizeMode="contain"
          />
          <Text
            style={{
              fontFamily: 'Poppins-Medium',
              color: '#808080',
              fontSize: 20,
            }}>
            No Offers To Display
          </Text>
        </View>
      )}
      <View
        style={{
          height: 80,
          width: '100%',
          position: 'absolute',
          bottom: 0,
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}>
        <View
          style={{
            height: 70,
            width: 70,
            borderRadius: 35,
            backgroundColor: '#fff',
            elevation: 5,
            overflow: 'hidden',
          }}>
          <TouchableHighlight
            style={{flex: 1}}
            onPress={() => {
              navigation.navigate('Add Offer');
            }}
            underlayColor="#ff4d5fa0">
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={require('../assets/add.png')}
                style={{height: 32, width: 32}}
              />
            </View>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
