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

export default class MainScreen extends React.Component {
  constructor() {
      super();
      this.state = {
        username: '',
        isVIP: '',
        date: '',
        display: '',
        uid: 0,
        profile_picture: '',
      }
      this._retrieveData()
    }

    _retrieveData = async () => {
      const username = await AsyncStorage.getItem('username');
      const isVIP = await AsyncStorage.getItem('vip');
      const uid = await AsyncStorage.getItem('id');
      const profile_picture = await AsyncStorage.getItem('profile_picture');
      console.log(isVIP)
      const date = await AsyncStorage.getItem('vipdate');
      this.setState({
        username: username,
        isVIP: isVIP,
        date: date,
        uid: uid,
        profile_picture: profile_picture,
      }, () => {
        let name
        if(this.state.isVIP == 0){
          name = '普通会员'
        }
        else{
          name = '超级会员'
        }
        console.log(name)
        this.setState({
          display: name
        })
      })
    };

    changePhoto = async () =>{
       const options = {
         quality: 1.0,
         maxWidth: 500,
         maxHeight: 500,
         storageOptions: {
           skipBackup: true,
         },
       };

       var photo = '';
       var uid = await AsyncStorage.getItem("id")
       var token = await AsyncStorage.getItem("userToken")

       ImagePicker.showImagePicker(options, response => {
         console.log('Response = ', response);

         if (response.didCancel) {
           console.log('User cancelled photo picker');
         } else if (response.error) {
           console.log('ImagePicker Error: ', response.error);
         } else if (response.customButton) {
           console.log('User tapped custom button: ', response.customButton);
         } else {
            let source = { uri: 'data:image/jpeg;base64,' + response.data };
            photo = response.data;
            AsyncStorage.setItem('profile_picture', photo);
            let url='http://202.120.40.8:30454/users/users/changephoto?id='+uid+'&photo='+photo;
            console.log(url);
            fetch(url, {
                method: 'GET',
                headers: new Headers({
                    'Authorization': 'Bearer '+token
                })
            }).then(
                (result) => {
                    if (result.ok) {
                        console.log(result)
                        result.text().then(
                            (obj) => {
                                this.setState({
                                    profile_picture: photo,
                                })
                                console.log(obj);
                            }
                        )
                    }
                }
            ).catch((error) => {
                console.log(error)
            })
         }
       });
    }

    render() {
      console.log(this.state.isVIP)
      console.log(this.state.display)
      return (
        <View style={styles.container}>
          <Header
            statusBarProps={{ barStyle: 'light-content', translucent: true, backgroundColor: 'transparent' }}
            containerStyle={{ backgroundColor: "black" }}
            placement="left"
            backgroundImage={{ uri: 'http://cdn.sebastianj1wzyd.xyz/016%20Deep%20Blue.png' }}
            leftComponent={<TouchableOpacity style={{ marginRight: 0 }} onPress={() => this.props.navigation.navigate('Main')}>
              <Icon
                name='arrow-left'
                type='evilicon'
                size={30}
                color='#ffffff' />
            </TouchableOpacity>}
          />
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Avatar
                size="large"

                source={{
                  uri: 'data:image/png;base64,'+this.state.profile_picture,
                }}
                showEditButton
                onPress={this.changePhoto.bind(this)}
                activeOpacity={0.7}
                avatarStyle={{ borderRadius: 145 / 2 }}
                overlayContainerStyle={{ backgroundColor: 'transparent' }}
              />
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  flex: 1,
                  marginTop: 10,
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={{
                    fontFamily: 'bold',
                    fontSize: 25,
                    color: 'rgba(98,93,144,1)',
                    marginLeft: -15,
                  }}
                >
                  {this.state.username}
                </Text>
                <Text
                  style={{
                    fontFamily: 'bold',
                    fontSize: 15,
                    color: 'rgba(98,93,144,1)',
                    marginLeft: -15,
                    marginTop: 10,
                  }}
                >
                  {this.state.display}
                </Text>
              </View>
            </View>
          </View>


          <ScrollView contentContainerStyle={styles.scrollStyle}
            showsVerticalScrollIndicator={false}
            contentInset={{ top: -200 }}
            contentOffset={{ y: 200 }}
          >
            <View style={styles.sectionStyle}>
              <TouchableOpacity onPress={() => (this.state.isVIP == 1) ? this.props.navigation.navigate('SuperMembers') : this.props.navigation.navigate('NotSuperMembers')}>
                <View style={cellStyle.containerStyle}>
                  <View style={cellStyle.leftViewStyle}>

                    <Image source={require('./Assets/MinePage/vip.png')} style={cellStyle.leftIconStyle}></Image>
                    <Text style={styles.leftTitleStyle}>了解会员特权</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.sectionStyle}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('ProDetails')}>
                <View style={cellStyle.containerStyle}>
                  <View style={cellStyle.leftViewStyle}>

                    <Image source={require('./Assets/MinePage/footprint128.png')} style={cellStyle.leftIconStyle}></Image>
                    <Text style={styles.leftTitleStyle}>我的足迹</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Room')}>
                <View style={cellStyle.containerStyle}>
                  <View style={cellStyle.leftViewStyle}>

                    <Image source={require('./Assets/MinePage/noteIcon.png')} style={cellStyle.leftIconStyle}></Image>
                    <Text style={styles.leftTitleStyle}>我的游记</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Details')}>
                <View style={cellStyle.containerStyle}>
                  <View style={cellStyle.leftViewStyle}>

                    <Image source={require('./Assets/MinePage/room.png')} style={cellStyle.leftIconStyle}></Image>
                    <Text style={styles.leftTitleStyle}>好友动态</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>

            {/* <View style={styles.sectionStyle}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('About')}>
                <View style={cellStyle.containerStyle}>
                  <View style={cellStyle.leftViewStyle}>

                    <Image source={require('./Assets/MinePage/about.png')} style={cellStyle.leftIconStyle}></Image>
                    <Text style={styles.leftTitleStyle}>使用说明</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View> */}
            <View style={styles.sectionStyle}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('ChangePass')}>
                <View style={cellStyle.containerStyle}>
                  <View style={cellStyle.leftViewStyle}>

                    <Image source={require('./Assets/MinePage/lock.png')} style={cellStyle.leftIconStyle}></Image>
                    <Text style={styles.leftTitleStyle}>修改密码</Text>
                  </View>

                </View>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity onPress={() => this._signOutAsync()}>
                <View style={cellStyle.containerStyle}>
                  <View style={cellStyle.leftViewStyle}>

                    <Image source={require('./Assets/MinePage/out.png')} style={cellStyle.leftIconStyle}></Image>
                    <Text style={styles.leftTitleStyle}>退出登录</Text>
                  </View>

                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>

          <StatusBar barStyle="default" />
        </View>
      );
    }

    _signOutAsync = async () => {
      await AsyncStorage.setItem('userToken', '');
      this.props.navigation.navigate('Auth');
    };
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