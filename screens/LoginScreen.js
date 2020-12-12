import React, {useContext, useState} from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableHighlight,
  View,
} from 'react-native';
import {AuthContext} from '../navigation/AppNavigator';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';

export default function LoginScreen() {
  const [sendRequest, setSendRequest] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [input, setinput] = useState(['', '', '', '', '', '']);
  const [focusedInput, setFocusedInput] = useState(0);
  const [passCode, setPassCode] = useState('');
  const [errPhone, setErrPhone] = useState(false);
  const [confirm, setConfirm] = useState(null);
  const otpIndexes = [];
  const setIsLogged = useContext(AuthContext);

  async function signInWithPhoneNumber(phoneNumber) {
    const confirmation = await auth().signInWithPhoneNumber(
      '+91' + phoneNumber,
    );
    setConfirm(confirmation);
  }

  async function confirmCode(code) {
    try {
      await confirm
        .confirm(code)
        .then((user) => {
          AsyncStorage.setItem('user', user.user.uid, (err) => {
            if(err){
              ToastAndroid.show(err, ToastAndroid.SHORT);
            }
          }).then(()=>{
            ToastAndroid.show('Login Successful'+user.user.uid, ToastAndroid.SHORT);
            setIsLogged(true);});
        })
        .catch((error) => {
          ToastAndroid.show(error.message, ToastAndroid.SHORT);
        });
    } catch (error) {
      ToastAndroid.show('INVALID CODE', ToastAndroid.SHORT);
    }
  }

  const focusNext = (index, value) => {
    if (index < otpIndexes.length - 1 && value) {
      otpIndexes[index + 1].focus();
    }
    if (index === otpIndexes.length - 1) {
      otpIndexes[index].blur();
      setFocusedInput(null);
    }
  };

  const focusPrevious = (key, index) => {
    if (key === 'Backspace' && index !== 0) {
      otpIndexes[index - 1].focus();
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#ff4d5f" />
      <View style={styles.headerContainer}>
        <View style={{flex: 1, justifyContent: 'flex-end', width: '100%'}}>
          <View
            style={{
              flex: 1,
              padding: 5,
              alignItems: 'flex-start',
              width: '40%',
              justifyContent: 'flex-end',
            }}>
            <View
              style={{
                height: 60,
                width: '100%',
                backgroundColor: '#ffffff',
                padding: 5,
                borderRadius: 10,
              }}>
              <Image
                source={require('../assets/logo.png')}
                style={{height: '100%', width: '100%'}}
                resizeMode="contain"
                resizeMethod="resize"
              />
            </View>
          </View>
          <View
            style={{
              width: '85%',
              alignItems: 'flex-start',
              justifyContent: 'center',
              padding: 5,
              marginBottom: 10,
            }}>
            <Text
              style={{
                fontSize: 28,
                color: '#fff',
                fontWeight: 'bold',
                paddingVertical: 2,
              }}>
              Sign in to Furniture Magik
            </Text>
            <Text style={{fontSize: 14, color: '#f6f6f6', paddingVertical: 2}}>
              Login to your account using your mobile number
            </Text>
          </View>
          <View
            style={{
              width: '30%',
              height: 4,
              borderRadius: 20,
              backgroundColor: '#f2f2f2',
              elevation: 1,
              marginLeft: 5,
              marginBottom: 10,
            }}
          />
        </View>
      </View>
      <View style={styles.bodyContainer}>
        <View style={{flex: 1}}>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <View
              style={{
                height: 8,
                width: '30%',
                backgroundColor: '#dbdbdb',
                borderRadius: 20,
              }}
            />
          </View>
          <View style={{flex: 9}}>
            <View style={{flex: 1}}>
              <View
                style={{
                  flex: 7,
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                }}>
                {errPhone ? (
                  <Text style={{position: 'absolute', bottom: 0, color: 'red'}}>
                    Invalid Mobile Number
                  </Text>
                ) : null}
                <View
                  style={{
                    height: 60,
                    width: '80%',
                    flexDirection: 'row',
                    backgroundColor: '#e5e4e2a0',
                    borderRadius: 10,
                    borderWidth: errPhone ? 1 : 0,
                    borderColor: 'red',
                  }}>
                  <View
                    style={{
                      flex: 2,
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingLeft: 10,
                      borderRightWidth: 1,
                      borderColor: '#dbdbdb',
                      paddingRight: 5,
                    }}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <View
                        style={{
                          flex: 1,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Image
                          source={require('../assets/india.png')}
                          style={{height: '100%', width: '100%'}}
                          resizeMode="contain"
                        />
                      </View>
                      <View
                        style={{
                          flex: 1,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text style={{fontSize: 16, color: '#808080'}}>
                          +91
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={{flex: 8, paddingLeft: 5}}>
                    <TextInput
                      placeholder="Mobile number"
                      editable={!sendRequest}
                      caretHidden={true}
                      style={{
                        height: 60,
                        fontSize: 24,
                        textAlign: 'left',
                        textAlignVertical: 'center',
                        fontWeight: 'bold',
                      }}
                      keyboardType="number-pad"
                      scrollEnabled={true}
                      onChangeText={(value) => {
                        setPhoneNumber(value);
                      }}
                    />
                  </View>
                </View>
                {sendRequest ? (
                  <View
                    style={{
                      height: 50,
                      width: '90%',
                      justifyContent: 'center',
                    }}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <View
                        style={{
                          flex: 6,
                          alignItems: 'flex-start',
                          justifyContent: 'center',
                        }}>
                        <Text style={{fontSize: 14, color: '#404040'}}>
                          Enter the 6 digit code sent to
                        </Text>
                        <Text
                          style={{
                            fontSize: 18,
                            color: '#202020',
                            fontWeight: 'bold',
                          }}>
                          {phoneNumber}
                        </Text>
                      </View>
                      <View
                        style={{
                          flex: 4,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <TouchableHighlight
                          style={{height: 50, width: 50}}
                          onPress={() => setSendRequest(false)}>
                          <View
                            style={{
                              flex: 1,
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <Text>Edit</Text>
                          </View>
                        </TouchableHighlight>
                      </View>
                    </View>
                  </View>
                ) : null}
                {sendRequest ? (
                  <View
                    style={{
                      height: 60,
                      width: '90%',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    {input.map((value, index) => (
                      <View
                        key={index}
                        style={{
                          flex: 1,
                          backgroundColor: '#e5e4e2a0',
                          borderRadius: 10,
                          margin: 2,
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderWidth: focusedInput === index ? 1 : 0,
                          borderColor: '#ff4d5f',
                        }}>
                        <TextInput
                          ref={(input) => {
                            otpIndexes[index] = input;
                          }}
                          placeholder={value}
                          value={input[index]}
                          caretHidden={true}
                          keyboardType="number-pad"
                          onSubmitEditing={() => setFocusedInput(null)}
                          maxLength={1}
                          onFocus={() => {
                            setFocusedInput(index);
                          }}
                          selectTextOnFocus
                          onChangeText={(val) => {
                            let temp = [...input];
                            temp[index] = val;
                            setinput(temp);
                            focusNext(index, val);
                          }}
                          onKeyPress={(e) =>
                            focusPrevious(e.nativeEvent.key, index)
                          }
                          style={{
                            height: 50,
                            alignContent: 'center',
                            justifyContent: 'center',
                            fontSize: 24,
                            textAlign: 'center',
                          }}
                        />
                      </View>
                    ))}
                  </View>
                ) : null}
              </View>
              <View style={{flex: 3}}>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {sendRequest ? (
                    <TouchableHighlight
                      style={{height: 50, width: '50%', borderWidth: 1}}
                      onPress={() => {
                        let code = '';
                        input.forEach((val) => {
                          code = code.concat(val);
                        });
                        // console.log(typeof(code), code);
                        confirmCode(code);
                        // setIsLogged(true);
                      }}>
                      <View
                        style={{
                          flex: 1,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text>Confirm</Text>
                      </View>
                    </TouchableHighlight>
                  ) : (
                    <TouchableHighlight
                      style={{height: 50, width: '50%', borderWidth: 1}}
                      onPress={() => {
                        var phoneno = /^\d{10}$/;
                        if (phoneNumber.match(phoneno)) {
                          signInWithPhoneNumber(phoneNumber);
                          setSendRequest(true);
                          setErrPhone(false);
                        } else {
                          setErrPhone(true);
                        }
                      }}>
                      <View
                        style={{
                          flex: 1,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text>Proceed</Text>
                      </View>
                    </TouchableHighlight>
                  )}
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff4d5f',
  },
  headerContainer: {
    flex: 4,
    backgroundColor: '#ff4d5f',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    padding: 10,
  },
  bodyContainer: {
    flex: 6,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 50,
  },
  logo: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  headerLabel: {
    flex: 8,
  },
});
