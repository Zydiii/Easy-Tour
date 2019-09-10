import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, StatusBar, ScrollView, AsyncStorage, TouchableOpacity, ImageBackground, TextInput, RefreshControl, PixelRatio, FlatList,} from 'react-native';
import { Avatar, Header, Divider, Card, ListItem, Button, Icon, Rating, PricingCard } from 'react-native-elements';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import LottieView from 'lottie-react-native';
import { DrawerActions } from 'react-navigation';
import TabNavigator from 'react-native-tab-navigator';
import ImagePicker from 'react-native-image-picker';
import ActionButton from 'react-native-action-button';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
  SlideAnimation,
  ScaleAnimation,
} from 'react-native-popup-dialog';
import NavBar, { NavGroup, NavButton, NavButtonText, NavTitle } from 'react-native-nav';
import ViewShot, { captureScreen, captureRef } from "react-native-view-shot";
import Toast, {DURATION} from 'react-native-easy-toast';
import XPay from 'react-native-puti-pay';
import { MapView } from 'react-native-amap3d';
import ParallaxScrollView from 'react-native-parallax-scroll-view';

var Dimensions = require('Dimensions');
var screenWidth = Dimensions.get('window').width;
var screenHeight = Dimensions.get('window').height;

var date = '2019-10-11';
var json = ''

const onButtonPress = async () => {
        console.log("点击进行支付");
        var uid = AsyncStorage.getItem("id")
        let url='http://192.119.70.60:8080/orderinfo?price=12';
        fetch(url, {
                method: 'GET',
            }).then(
                (result) => {
                    if (result.ok) {
                        console.log(result)
                        result.text().then(
                            (obj) => {
                                console.log(obj);
                                let orderInfo = obj;
                                XPay.setAlipaySandbox(true)
                                 //支付宝支付
                                 //orderInfo是后台拼接好的支付参数
                                XPay.alipay(orderInfo,
                                res => {
                                    console.log('回调', res);
                                    const {result, memo, resultStatus} = res;
                                    if (resultStatus === '9000') {
                                        console.log('充值成功');
                                        let url = 'http://202.120.40.8:30454/users/un/improvip/'+uid;
                                         fetch(url, {
                                             method: 'GET',
                                         }).then(
                                             (result) => {
                                                 if (result.ok) {
                                                     console.log(result)
                                                     result.json().then(
                                                         (obj) => {
                                                            console.log(obj);
                                                            this.getInfo()
                                                            // this.props.navigation.navigate("Main")
                                                         }
                                                     )
                                                 }
                                             }
                                         ).catch((error) => {
                                             console.log(error)
                                         })
                                    } else {
                                        console.log('充值失败')
                                    }
                                })
                            }
                        )
                    }
                }
            ).catch((error) => {
                console.log(error)
            })
}

//会员的的界面
export default class SuperMembers extends React.Component {

  constructor() {
    super();
    this.state = {
      username: '',
      isVIP: '',
      date: '',
      display: '',
      profile_picture: ''
    }
    this._retrieveData()
  }



  _retrieveData = async () => {
    const username = await AsyncStorage.getItem('username');
    const isVIP = await AsyncStorage.getItem('vip');
    console.log(isVIP)
    const date = await AsyncStorage.getItem('vipdate');
    const profile_picture = await AsyncStorage.getItem('profile_picture');
    this.setState({
      username: username,
      isVIP: isVIP,
      date: date,
      profile_picture: profile_picture
    }, () => {
      let name
      if (this.state.isVIP == 0) {
        name = '普通会员'
      }
      else {
        name = '超级会员'
      }
      console.log(name)
      this.setState({
        display: name
      })
    })
  };

  async updateInfo() {
    await AsyncStorage.setItem('vip', json.vip.toString())
    await AsyncStorage.setItem('vipdate', json.vipdate.toString())
  }

  async getInfo() {
    const userToken = await AsyncStorage.getItem('userToken', '');
    const username = await AsyncStorage.getItem('username');

    let url = 'http://202.120.40.8:30454/users/users/username/' + username;
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + userToken);
    

    return fetch(url, {
      method: 'GET',
      headers: headers,
    })
      .then(response => {
        console.log(response)

        if (!response.ok) {
          throw new Error('Failed to Log in')
        }
        return response.json()

      })
      .then(jsons => {
        console.log(jsons.id)
        json = jsons
        console.log("更新信息")
        console.log(json.vipdate)
        this.updateInfo()
        // return 
        // return json.access_token
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    return (
      <View>
        <Header
          statusBarProps={{ barStyle: 'light-content', translucent: true, backgroundColor: 'transparent' }}
          containerStyle={{ backgroundColor: "black" }}
          placement="left"
          backgroundImage={{ uri: 'http://cdn.sebastianj1wzyd.xyz/016%20Deep%20Blue.png' }}
          // leftComponent={{ icon: 'menu', color: '#fff' }}
          // centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
          // rightComponent={{ icon: 'home', color: '#fff' }}
          leftComponent={<TouchableOpacity style={{ marginRight: 0 }} onPress={() => {
            this.getInfo()
            this.props.navigation.navigate('UserPage')
          }
          }>
            <Icon
              name='arrow-left'
              type='evilicon'
              size={30}
              color='#ffffff' />
          </TouchableOpacity>}
        // centerComponent={<MyCustomCenterComponent />}
        // rightComponent={<TouchableOpacity onPress={() => this.props.navigation.navigate('GPS')}>
        //   <Icon
        //     name='location'
        //     type='evilicon'
        //     size={30}
        //     color='#ffffff' />
        // </TouchableOpacity>}
        />
        <ScrollView>
          <Card
            style={{ backgroundColor: '#dae9f4' }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: 10 }}>
              <Avatar
                width={60}
                height={60}
                source={{
                  uri: 'data:image/png;base64,'+this.state.profile_picture,
                }}
                activeOpacity={0.7}
                avatarStyle={{ borderRadius: 145 / 2 }}
                overlayContainerStyle={{ backgroundColor: 'transparent' }}
              />
              <View>
                <Text style={{ fontSize: 20, color: '#333030' }}>{this.state.username}</Text>
                <Text style={{ fontSize: 14, color: '#333030' }}>超级会员：{this.state.date}</Text>
              </View>
              <View>
                <Image source={require('./Assets/MinePage/QQ20190726-0.jpg')} style={{ width: 60, height: 60 }}></Image>
              </View>
            </View>
          </Card>
          <Card
            title='我的会员特权'
          >
            <ScrollView horizontal={true}>
              <View style={{ width: 140, }}>
                <View style={{ width: 100, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', }}>
                  <Avatar
                    width={40}
                    height={40}
                    source={require('./Assets/MinePage/landmarksphinx.png')}
                    activeOpacity={0.7}
                    avatarStyle={{ borderRadius: 145 / 2 }}
                    overlayContainerStyle={{ backgroundColor: 'transparent' }}
                  />
                  <View>
                    <Text style={{ fontSize: 16, color: '#f9a11b' }}>景点识别</Text>
                  </View>

                </View>
                <Text style={{ fontSize: 12, color: '#333030', marginLeft: 5, marginTop: 5 }}>千万景点快速识别</Text>
              </View>

              <View style={{ width: 140, }}>
                <View style={{ width: 100, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', }}>
                  <Avatar
                    width={40}
                    height={40}
                    source={require('./Assets/MinePage/yuyin.png')}
                    activeOpacity={0.7}
                    avatarStyle={{ borderRadius: 145 / 2 }}
                    overlayContainerStyle={{ backgroundColor: 'transparent' }}
                  />
                  <View>
                    <Text style={{ fontSize: 16, color: '#f9a11b' }}>语音翻译</Text>
                  </View>

                </View>
                <Text style={{ fontSize: 12, color: '#333030', marginLeft: 5, marginTop: 5 }}>多语种语音翻译</Text>
              </View>
              <View style={{ width: 140, }}>
                <View style={{ width: 100, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', }}>
                  <Avatar
                    width={40}
                    height={40}
                    source={require('./Assets/MinePage/weibiaoti556.png')}
                    activeOpacity={0.7}
                    avatarStyle={{ borderRadius: 145 / 2 }}
                    overlayContainerStyle={{ backgroundColor: 'transparent' }}
                  />
                  <View>
                    <Text style={{ fontSize: 16, color: '#f9a11b' }}>文字翻译</Text>
                  </View>

                </View>
                <Text style={{ fontSize: 12, color: '#333030', marginLeft: 5, marginTop: 5 }}>上传图片自动翻译</Text>
              </View>
              <View style={{ width: 140, }}>
                <View style={{ width: 100, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', }}>
                  <Avatar
                    width={40}
                    height={40}
                    source={require('./Assets/MinePage/ad.png')}
                    activeOpacity={0.7}
                    avatarStyle={{ borderRadius: 145 / 2 }}
                    overlayContainerStyle={{ backgroundColor: 'transparent' }}
                  />
                  <View>
                    <Text style={{ fontSize: 16, color: '#f9a11b' }}>广告特权</Text>
                  </View>

                </View>
                <Text style={{ fontSize: 12, color: '#333030', marginLeft: 5, marginTop: 5 }}>自动隐藏广告</Text>
              </View>
              <View style={{ width: 140, }}>
                <View style={{ width: 100, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', }}>
                  <Avatar
                    width={40}
                    height={40}
                    source={require('./Assets/MinePage/zhuanjiafudao.png')}
                    activeOpacity={0.7}
                    avatarStyle={{ borderRadius: 145 / 2 }}
                    overlayContainerStyle={{ backgroundColor: 'transparent' }}
                  />
                  <View>
                    <Text style={{ fontSize: 16, color: '#f9a11b' }}>专家翻译</Text>
                  </View>

                </View>
                <Text style={{ fontSize: 12, color: '#333030', marginLeft: 5, marginTop: 5 }}>专家翻译准确率更高</Text>
              </View>
            </ScrollView>

          </Card>
          <View style={{ marginTop: 3, marginBottom: 50 }}>
            <PricingCard
              color="#4f9deb"
              title="续费会员"
              price="¥12"
              info={['1个月', '所有功能特权']}
              button={{ title: '立即续费' }}
              onButtonPress={
                onButtonPress
              }
            />
          </View>
        </ScrollView>
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