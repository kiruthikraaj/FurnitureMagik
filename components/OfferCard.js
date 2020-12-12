
import React, { useEffect } from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default function OfferCard({id,name,type,price,discount, image, action}) {
  useEffect(()=>{
  })
  return (
    <View style={styles.container}>
      <View style={styles.outerContainer}>
        <View style={{flex: 4}}>
          <View style={{flex: 1}}>
            <Image
              style={{height: '100%', width: '100%'}}
              resizeMode="contain"
              source={{
                uri:
                  image,
              }}
            />
          </View>
        </View>
        <View style={{flex: 7.5}}>
          <View style={{flex: 1}}>
            <View style={{flex: 1.25}}>
              <View
                style={{
                  flex: 1,
                  width: '80%',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  paddingTop: 2,
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Medium',
                    color: '#404040',
                    fontSize: 20,
                  }}
                  numberOfLines={2}>
                  {name}
                </Text>
              </View>
            </View>
            <View style={{flex: 0.5, alignItems: 'center',flexDirection: 'row'}}>
                <View style={{flex:1, justifyContent: 'flex-start'}}>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  color: '#808080',
                  fontSize: 14,
                }}
                adjustsFontSizeToFit>
                {type}
              </Text>
                </View>
            </View>
            <View style={{flex: 1.25}}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{flex: 8}}>
                  <View style={{flex: 1}}>
                    <View
                      style={{
                        flex: 1.5,
                        justifyContent: 'flex-start',
                        flexDirection: 'row',
                        alignItems:'baseline',
                      }}>
                      <Text
                        style={{fontSize: 16, paddingBottom: 10}}>
                        &#x20b9;
                      </Text>
                      <Text
                        style={{fontFamily: 'Poppins-Medium', fontSize: 26, paddingLeft: 5}}>
                        {discount}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        paddingLeft: 5,
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Poppins-Medium',
                          fontSize: 12,
                          color: 'grey',
                          textDecorationLine:'line-through',
                        }} adjustsFontSizeToFit>
                        MRP: &#x20b9; {price}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={{flex: 2}}>
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <View style={{height: 30, width: 30}}>
                      <TouchableOpacity style={{flex: 1}} onPress={()=>action(id)}>
                        <View
                          style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Image
                            style={{height: '80%', width: '80%'}}
                            source={require('../assets/delete.png')}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
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
    height: 175,
    width: '100%',
  },
  outerContainer: {
    flex: 1,
    margin: 5,
    // borderBottomWidth: 1,
    // borderColor:'#9e9e9ea0',
    // borderRadius: 20,
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
});
