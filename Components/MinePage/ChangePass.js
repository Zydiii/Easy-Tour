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


//好友动态
export default class ChangePass extends React.Component {
state = {
        oldPassword: '',
        newPassword: '',
        rePassword: '',
        errMsg: null,
    };

    constructor() {
      super();
    }

    checkPass() {
        let reg = new RegExp(/^(?![^a-zA-Z]+$)(?!\D+$)/);
        var password = this.state.newPassword
        if (password == null || password.length < 6) {
          this.setState({ errMsg: '密码长度不能小于6位' })
          return false
        } else if (!reg.test(password)) {
          this.setState({ errMsg: '密码应该为不小于6位数的数字和字母组合' })
          return false
        } else {
//          status++;
          this.setState({ errMsg: '' })
          return true
        }
      }

      checkRePass() {
        var password = this.state.newPassword
        var repassword = this.state.rePassword
        if (password != repassword) {
          this.setState({ errMsg: '两次输入的密码不一致' })
          return false
        } else {
//          status++;
          this.setState({ errMsg: '' })
          return true
        }
      }

      _handleSignUp = async () => {
          this.setState({ errMsg: '修改中...' })
          var d = await this.checkPass()
          var e = await this.checkRePass()
          const uid = await AsyncStorage.getItem('id');
          const token = await AsyncStorage.getItem('userToken')
          if (d == false || e == false) {
            this.setState({ errMsg: '您提交的信息有误' })
            return;
          }
          let url='http://202.120.40.8:30454/users/users/changepassword?id='+uid+'&oldPassword='+this.state.oldPassword+'&newPassword='+this.state.newPassword;
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
                              console.log(obj);
                              if(obj === "success"){
                                this.refs.toast.show('修改成功!');
                              } else{
                                this.refs.toast.show(obj);
                              }
                          }
                      )
                  }
              }
          ).catch((error) => {
              console.log(error)
          })
        }


    render(){
    const errorMessage = this.state.errMsg ?
          <Text style={styles.errMsg}>{this.state.errMsg}</Text>
          : null
        return(
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
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
              <Card
                title='1. 验证身份'>
                <View style={{backgroundColor: 'rgba(255,255,255,.8)', borderRadius: 5, marginBottom: 10 }}>
                  <TextInput
                    style={{ width: 280,
                                height: 40,
                                paddingLeft: 15,
                                paddingRight: 15,
                                fontFamily: 'Roboto-Bold',
                                }}
                    value={this.state.oldPassword}
                    onChangeText={(text) => this.setState({ oldPassword: text })}
                    underlineColorAndroid='transparent'
                    placeholder='旧密码'
                    secureTextEntry={true}
                    placeholderTextColor='#999999'
                  />
                </View>
              </Card>
              <Card
                title='2. 设置新密码'>
                <View style={{backgroundColor: 'rgba(255,255,255,.8)', borderRadius: 5, marginBottom: 10 }}>
                  <TextInput
                    style={{ width: 280,
                                                    height: 40,
                                                    paddingLeft: 15,
                                                    paddingRight: 15,
                                                    fontFamily: 'Roboto-Bold',
                                                    }}
                    value={this.state.newPassword}
                    onChangeText={(text) => this.setState({ newPassword: text })}
                    underlineColorAndroid='transparent'
                    placeholder='新密码'
                    onBlur={() => this.checkPass()}
                    secureTextEntry={true}
                    placeholderTextColor='#999999'
                  />
                </View>
                <View style={{backgroundColor: 'rgba(255,255,255,.8)', borderRadius: 5}}>
                  <TextInput
                    style={{ width: 280,
                                                    height: 40,
                                                    paddingLeft: 15,
                                                    paddingRight: 15,
                                                    fontFamily: 'Roboto-Bold',
                                                    }}
                    value={this.state.rePassword}
                    onChangeText={(text) => this.setState({ rePassword: text })}
                    onBlur={() => this.checkRePass()}
                    underlineColorAndroid='transparent'
                    placeholder='确认密码'
                    secureTextEntry={true}
                    placeholderTextColor='#999999'
                  />
                </View>
              </Card>
              <View style={{marginTop: 15,
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: 280}}>
                <TouchableOpacity onPress={this._handleSignUp.bind(this)}>
                  <View style={{width: 280,
                                    height: 40,
                                    backgroundColor: '#17abe3',
                                    borderRadius: 5,
                                    justifyContent: 'center',
                                    alignItems: 'center'}}>
                    <Text style={{fontFamily: 'Roboto-Bold',
                                      fontSize: 20,
                                      fontWeight: 'bold',
                                      color: 'white'
                                      }}>确认</Text>
                  </View>
                </TouchableOpacity>
              </View>
              {errorMessage}
              <Toast ref="toast"/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 20
  },
  title: {
    fontSize: 25,
    fontFamily: 'MagmaWave',
    marginBottom: 10,
    color: 'rgba(255,255,255,.8)'
  },
  errMsg: {
    width: 280,
    textAlign: 'center',
    alignSelf: 'center',
    color: '#000000',
    marginBottom: 10,
    fontSize: 14,
    fontFamily: 'Roboto-Regular'
  },
  
  
})
