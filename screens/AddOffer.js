import AsyncStorage from '@react-native-community/async-storage';
import {Picker} from '@react-native-picker/picker';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Image,
  PermissionsAndroid,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {color} from 'react-native-reanimated';
export default function AddOffer({navigation}) {
  const [response, setResponse] = useState(null);
  const [errName, setErrName] = useState(false);
  const [errImage, setErrImage] = useState(false);
  const [errPrice, setErrPrice] = useState(false);
  const [errDiscount, setErrDiscount] = useState(false);
  const [errType, setErrType] = useState(false);
  const [productName, setProductName] = useState('');
  const [type, setType] = useState('Beds');
  const [originalPrice, setOriginalPrice] = useState('');
  const [discountPrice, setDiscountPrice] = useState('');
  const [storeKey, setStoreKey] = useState('');

  const getUser = useCallback(async () => {
    try {
      AsyncStorage.getItem('user').then((response) => {
        if (response !== null) {
          setStoreKey(response);
          console.log(storeKey);
        }
      });
    } catch (e) {}
  }, []);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const chooseFile = () => {
    let options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        let source = {
          uri: 'data:image/jpeg;base64,' + response.data,
        };
        setResponse(source);
      }
    });
  };

  const saveOffer = async (newOffer) => {
    try {
      await AsyncStorage.getItem(storeKey, (err, res) => {
        if (err) {
          console.error(err);
        } else {
          // console.log("Res",res);
          if (res === null) {
            AsyncStorage.setItem(
              storeKey,
              JSON.stringify([newOffer]),
              (err) => {
                if (err) {
                  ToastAndroid.show(err, ToastAndroid.SHORT);
                }
              },
            );
          } else {
            AsyncStorage.setItem(
              storeKey,
              JSON.stringify([...JSON.parse(res), newOffer]),
              (err) => {
                if (err) {
                  ToastAndroid.show('Failed to Add', ToastAndroid.SHORT);
                } else {
                  ToastAndroid.show('Offer Added', ToastAndroid.SHORT);
                  console.log(JSON.parse(res).length);
                }
              },
            );
          }
        }
      }).then(navigation.navigate('Home'));
    } catch (e) {
      console.log(e);
    }
  };
  //  const saveImage = async() =>{
  //   try{
  //     AsyncStorage.setItem('image', response.uri, (err)=>{
  //       console.log("Error",err);
  //     });
  //   }catch(e){
  //     console.log(e);
  //   }
  // }

  // const getImage = async() =>{
  //   try{
  //     AsyncStorage.getItem('image', (err, res)=>{
  //       if(!err){
  //         setGet(res);
  //       }
  //     });
  //   }catch(e){
  //     console.log(e);
  //   }
  // }
  return (
    <View style={styles.conatiner}>
      <StatusBar backgroundColor="#ff4d5f" barStyle="dark-content" />
      <View style={{flex: 3}}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#ff4d5f',
            borderBottomRightRadius: 50,
          }}>
          <View
            style={{
              height: '70%',
              width: '40%',
              borderWidth: 1,
              borderRadius: 10,
              borderColor: '#ffffff',
              borderStyle: 'dashed',
              overflow: 'hidden',
            }}>
            <TouchableOpacity style={{flex: 1}} onPress={() => chooseFile()}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {response === null ? (
                  <Text
                    style={{
                      fontFamily: 'Poppins-Medium',
                      color: '#ffffff',
                      fontSize: 18,
                    }}
                    adjustsFontSizeToFit>
                    Add Image
                  </Text>
                ) : (
                  <Image
                    source={{uri: response.uri}}
                    style={{height: '100%', width: '100%'}}
                  />
                )}
              </View>
            </TouchableOpacity>
          </View>
          {errImage ? (
            <Text
              style={{
                fontSize: 10,
                color: '#fff',
                fontFamily: 'Poppins-Regular',
              }}>
              Add Product Image
            </Text>
          ) : null}
        </View>
      </View>
      <View style={{flex: 7}}>
        <View style={{flex: 1}}>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <View style={{width: '90%'}}>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: 24,
                  paddingLeft: 5,
                  color: '#404040',
                }}>
                Product Name
              </Text>
              <TextInput
                caretHidden={false}
                style={{
                  height: 50,
                  fontSize: 18,
                  textAlign: 'left',
                  paddingLeft: 10,
                  textAlignVertical: 'bottom',
                  fontFamily: 'Poppins-Regular',
                  color: '#202020',
                  borderColor: '#e5e4e2a0',
                  borderWidth: 1,
                  borderRadius: 10,
                }}
                keyboardType="default"
                scrollEnabled={true}
                onChangeText={(value) => {
                  setProductName(value);
                }}
              />
              {errName ? (
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    fontSize: 12,
                    color: '#FE5F55',
                  }}>
                  Product Name Required
                </Text>
              ) : null}
            </View>
          </View>
          <View
            style={{
              flex: 0.5,
              alignItems: 'flex-start',
              justifyContent: 'center',
              paddingLeft: 10,
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 20,
                paddingLeft: 5,
                color: '#404040',
              }}>
              Select Type
            </Text>
            <View
              style={{
                height: 50,
                width: '50%',
                backgroundColor: '#e5e4e2a0',
                borderRadius: 10,
                justifyContent: 'center',
              }}>
              <Picker
                selectedValue={type}
                mode="dialog"
                dropdownIconColor="#ff4d5f"
                style={{flex: 1}}
                onValueChange={(itemValue, itemIndex) => setType(itemValue)}>
                <Picker.Item label="Beds" value="Beds" />
                <Picker.Item label="Chairs" value="Chairs" />
                <Picker.Item label="Decors" value="Decors" />
                <Picker.Item label="Tables" value="Tables" />
                <Picker.Item label="Sofas" value="Sofas" />
                <Picker.Item label="Mattress" value="Mattress" />
                <Picker.Item label="Lightnings" value="Lightnings" />
              </Picker>
            </View>
            {errType ? (
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: 12,
                  color: '#FE5F55',
                }}>
                Type Required
              </Text>
            ) : null}
          </View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <View
                style={{
                  width: '80%',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    fontSize: 18,
                    paddingLeft: 5,
                    color: '#404040',
                  }}
                  adjustsFontSizeToFit>
                  Original price
                </Text>
              </View>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View style={{width: '80%', marginTop: 5}}>
                  <TextInput
                    caretHidden={false}
                    style={{
                      height: 60,
                      fontSize: 20,
                      textAlign: 'left',
                      paddingLeft: 10,
                      textAlignVertical: 'bottom',
                      fontFamily: 'Poppins-Regular',
                      color: '#202020',
                      borderColor: '#e5e4e2a0',
                      borderWidth: 1,
                      borderRadius: 10,
                    }}
                    keyboardType="numeric"
                    scrollEnabled={true}
                    onChangeText={(value) => {
                      setOriginalPrice(value);
                    }}
                  />
                  {errPrice ? (
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                        fontSize: 12,
                        color: '#FE5F55',
                      }}>
                      Required
                    </Text>
                  ) : null}
                </View>
              </View>
            </View>
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <View
                style={{
                  width: '80%',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    fontSize: 18,
                    paddingLeft: 5,
                    color: '#404040',
                  }}
                  adjustsFontSizeToFit>
                  Discount price
                </Text>
              </View>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View style={{width: '80%', marginTop: 5}}>
                  <TextInput
                    caretHidden={false}
                    style={{
                      height: 60,
                      fontSize: 20,
                      textAlign: 'left',
                      paddingLeft: 10,
                      textAlignVertical: 'bottom',
                      fontFamily: 'Poppins-Regular',
                      color: '#202020',
                      borderColor: '#e5e4e2a0',
                      borderWidth: 1,
                      borderRadius: 10,
                    }}
                    keyboardType="numeric"
                    scrollEnabled={true}
                    onChangeText={(value) => {
                      setDiscountPrice(value);
                    }}
                  />
                  {errDiscount ? (
                    <Text
                      style={{
                        fontFamily: 'Poppins-Regular',
                        fontSize: 12,
                        color: '#FE5F55',
                      }}>
                      Discount Required
                    </Text>
                  ) : null}
                </View>
              </View>
            </View>
          </View>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <View
              style={{
                width: '70%',
                height: 60,
                backgroundColor: '#ff4d5f',
                borderRadius: 10,
                overflow: 'hidden',
              }}>
              <TouchableHighlight
                style={{flex: 1}}
                onPress={() => {
                  if (
                    productName !== '' &&
                    type !== '' &&
                    response !== null &&
                    originalPrice !== '' &&
                    discountPrice !== ''
                  ) {
                    let data = {
                      name: productName,
                      image: response.uri,
                      type: type,
                      price: originalPrice,
                      discount: discountPrice,
                    };
                    saveOffer(data);
                  } else {
                    if (productName === '') {
                      setErrName(true);
                    } else {
                      setErrName(false);
                    }
                    if (response === null) {
                      setErrImage(true);
                    } else {
                      setErrImage(false);
                    }
                    if (type === '') {
                      setErrType(true);
                    } else {
                      setErrType(false);
                    }
                    if (originalPrice === '') {
                      setErrPrice(true);
                    } else {
                      setErrPrice(false);
                    }
                    if (discountPrice === '') {
                      setErrDiscount(true);
                    } else {
                      setErrDiscount(false);
                    }
                    // console.log('Error');
                  }
                  // if(data.name!==''&&data.type!==''&&data.price!==''&&data.discount!==''){
                  //   console.log('Success');
                  // }
                  // else{console.log('Failure');}
                  // saveOffer(data);
                  // console.log({
                  //   name: productName,
                  //   image: response.uri,
                  //   type: type,
                  //   price: originalPrice,
                  //   discount: discountPrice,
                  // });
                }}
                underlayColor="#ff4d5f">
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Medium',
                      fontSize: 24,
                      color: '#ffffff',
                    }}>
                    Save
                  </Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: '#fff',
  },
  response: {
    flex: 1,
  },
});
