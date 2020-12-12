import React, { useContext } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import AddOffer from '../screens/AddOffer';
import {Alert, Image, Text, ToastAndroid, TouchableOpacity, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { AuthContext } from './AppNavigator';

const Stack = createStackNavigator();

export default function MainNavigation() {
    const setIsLogged = useContext(AuthContext);
  function HomeHeader({navigation}) {
    return (
      <View
        style={{
          height: 55,
          backgroundColor: '#fff',
          borderWidth: 0,
          elevation: 0,
          padding: 5,
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <View
          style={{
            marginLeft: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={require('../assets/logo.png')}
            style={{height: 100, width: 100}}
            resizeMode="contain"
          />
        </View>
        <View
          style={{
            marginRight: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={{height: 50, width: 50}}
            onPress={() => {
              Alert.alert(
                'Logout',
                'Are you sure want to Logout',
                [
                  {
                    text: 'Cancel',
                    onPress: () => {},
                    style: 'cancel',
                  },
                  {
                    text: 'OK',
                    onPress: () => {
                        AsyncStorage.removeItem('user', (err)=>{
                            if(err){
                                ToastAndroid.show('Error Logging Out. Try Again', ToastAndroid.SHORT);
                            }
                            else{
                                ToastAndroid.show('Logout Successful', ToastAndroid.SHORT);
                            }
                        }).then(()=>{setIsLogged(false);})
                    },
                  },
                ],
                {cancelable: false},
              );
            }}>
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={require('../assets/logout.png')}
                style={{height: '50%', width: '50%'}}
                resizeMode="center"
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function OffersHeader({navigation}) {
    return (
      <View
        style={{
          height: 55,
          backgroundColor: '#ff4d5f',
          borderWidth: 0,
          elevation: 0,
          padding: 5,
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <View
          style={{
            marginLeft: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              height: 50,
              width: 50,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              style={{height: '100%', width: '100%'}}
              onPress={() => navigation.navigate('Home')}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                }}>
                <Image
                  source={require('../assets/left.png')}
                  style={{height: '50%', width: '50%'}}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>
          </View>
          <Text
            style={{
              fontFamily: 'Poppins-Medium',
              color: '#fff',
              marginLeft: 5,
              marginTop: 5,
              fontSize: 20,
              textAlignVertical: 'bottom',
            }}>
            Add Offers
          </Text>
        </View>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{}}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{header: HomeHeader}}
        />
        <Stack.Screen
          name="Add Offer"
          component={AddOffer}
          options={{header: OffersHeader}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
