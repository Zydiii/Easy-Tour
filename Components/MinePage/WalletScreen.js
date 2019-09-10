import React, {Fragment, Component} from 'react';
import { StyleSheet, Text, View, Image, StatusBar, ScrollView, AsyncStorage, TouchableOpacity } from 'react-native';
import { Avatar, Divider, Card, ListItem, Button, Icon, Rating, PricingCard } from 'react-native-elements';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import LottieView from 'lottie-react-native';

var Dimensions = require('Dimensions');
var screenWidth = Dimensions.get('window').width;

//表示是否是vip的变量
var isVIP = 1;
var username = 'Arwen';
var date = '2019-10-11';

const onButtonPress = async () => {
  console.log('在钱包里面');
  // try {
  //   var id = await AsyncStorage.getItem('id');
  //   if (id !== null) {
  //     // We have data!!
  //     console.log(id);
  //   }
  // } catch (error) {
  //   console.log('error');
  // }
  var id = '1'
  console.log(id)
  let url = 'http://2493s0p911.zicp.vip:15832/alipay.trade.wap.pay-java-utf-8/wappay/pay.jsp?guid='+id;
  Linking.addEventListener('url', this._handleOpenURL);
  Linking.openURL(url);
  console.log(url)
  this.timer = setInterval(() => {
    console.log("把一个定时器的引用挂在this上");
    let url1 = "http://202.120.40.8:30454/users/users/id/"+id;
    console.log(id)
    let formData = new FormData();
    formData.append("id", id);
    fetch(url1, {
        method: 'GET',
        headers: {
         'Authorization': "bearer c13ecc9d-21b2-4ce1-9399-501e9672b35d"
        },
    }).then((response) => {
        return response.text()
    }).then((result)=>{
        console.log(result.vip);
        console.log(result.vipdate);
        AsyncStorage.setItem('date', result.vipdate).then(() => {
              setTimeout(()=> {
            }, 1000)
        });
        AsyncStorage.setItem('vip', result.vip).then(() => {
               setTimeout(()=> {
             }, 1000)
         });
    }).catch((error) => {
        console.log(error)
    });
  }, 30000);
//  let url = "http://202.120.40.8:30454/user/users/improvip;
//            let formData = new FormData();
//            formData.append("id", id);
//            console.log(id);
//
//   fetch(url, {
//       method: 'POST',
//       headers: {
//           'Authorization': "bearer c13ecc9d-21b2-4ce1-9399-501e9672b35d"
//       },
//       body: formData,
//   })
//       .then((response) => {
//           return response.text()
//       })
//       .then((result) => {
//           console.log(result)
//           console.log(result.isVIP);
//           console.log(result.date);
//           await AsyncStorage.setItem('date', result.date).then(() => {
//                 setTimeout(()=> {
//               }, 1000)
//           });
//            await AsyncStorage.setItem('isVIP', 1).then(() => {
//                  setTimeout(()=> {
//                }, 1000)
//            });
//       })
//       .catch((error) => {
//           console.log(error)
//       });


};

export default class WalletScreen extends React.Component {
  _retrieveData = async () => {
    try {
      const username = await AsyncStorage.getItem('username');
      const isVIP = await AsyncStorage.getItem('isVIP');
      const date = await AsyncStorage.getItem('date');
      if (username !== null) {
        // We have data!!
        console.log(value);
      }
    } catch (error) {
      console.log('error');
      console.log(username);
    }
  };

  render() {
  this._retrieveData();
  let Str = '超级会员'+date;
  let display = isVIP ? Str: '您还不是VIP会员';
  let display1 = isVIP ? '续费会员' : '开通会员';
  let display2 = isVIP ? '立即续费': '立即开通';
      return (
          <View>
              <Card
                   style={{backgroundColor: '#dae9f4'}}
               >
               <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: 10}}>
                   <Avatar
                      width={60}
                      height={60}
                      source={{
                        uri: 'http://cdn.sebastianj1wzyd.xyz/IMG_7948.JPG',
                      }}
                      activeOpacity={0.7}
                      avatarStyle={{ borderRadius: 145 / 2 }}
                      overlayContainerStyle={{ backgroundColor: 'transparent' }}
                    />
                    <View>
                       <Text style={{fontSize:20, color: '#333030'}}>{username}</Text>
                       <Text style={{fontSize:14, color: '#333030'}}>{display}</Text>
                    </View>
                    <View>
                       <Image style={{width: 60, height: 60}}></Image>
                    </View>
                </View>
                </Card>
           <View style={{marginTop: 20}}>
            <PricingCard
              color="#4f9deb"
              title={display1}
              price="¥12"
              info={['1个月', '所有功能特权']}
              button={{ title: display2 }}
              onButtonPress={onButtonPress}
            />
           </View>
          </View>
      )
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#e8e8e8',
  },
  icon: {
      width: 24,
      height: 24,
  },
  scrollStyle: {
      marginTop: 0,
  },
  sectionStyle: {
      marginTop: 20,
  },
});

const cellStyle = StyleSheet.create({
  containerStyle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'rgba(255,255,255,.3)',
      height: 44,
      width: screenWidth,
      borderBottomColor: '#e8e8e8',
      borderBottomWidth: 0.5,
  },
  leftViewStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 5,
  },
  leftIconStyle: {
      width: 24,
      height: 24,
      marginRight: 5,
  },
  leftTitleStyle: {
      color: '#3E4348',
      fontSize: 15
  },
  rightViewStyle: {
      flexDirection: 'row',
      alignItems: 'center',
  },
  rightIconStyle: {
      width: 24,
      height: 24,
  },
  newStyle: {
      // width: 30,
      // height: 24,
      borderRadius: 18,
      backgroundColor: 'red',
      paddingLeft: 3,
      paddingRight: 3,
      paddingTop: 1,
      paddingBottom: 1,
  }
});