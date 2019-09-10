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

var obj1=[];

//好友动态
export default class DetailsScreen extends React.Component {
  constructor() {
              super();
              this.state = {
                index: 0,
                notesArray: [],
                obj1: [],
              }

              this.getMoviesFromApi();
            }

            async getMoviesFromApi() {
                let url='http://202.120.40.8:30454/users/travelnote/all';
                try{
                  const token = await AsyncStorage.getItem('userToken');
                  let response = await fetch(url, {
                      method: 'GET',
                      headers: new Headers({
                          'Authorization': 'Bearer '+ token
                      })
                  })
                  let obj = await response.json();
//                  const uid = await AsyncStorage.getItem('id');

                  for(var i = 0 ; i < obj.length ; i++){
                      var curId = obj[i].uid;
                      let response1 = await fetch('http://202.120.40.8:30454/users/users/id/'+curId, {
                          method: 'GET',
                          headers: new Headers({
                              'Authorization': 'Bearer '+ token
                          })
                      })
                      let responseJson = await response1.json();
                      console.log(curId);
                      obj1[i] = responseJson;
                  }
                  this.setState({
                      notesArray: obj,
                      obj1: obj1,
                  })
                }
                catch(error){
                  console.error(error);
                }
  //              fetch(url, {
  //                  method: 'GET',
  //                  headers: new Headers({
  //                      'Authorization': 'Bearer '+token
  //                  })
  //              }).then(
  //                  (result) => {
  //                      if (result.ok) { /////
  //                          console.log(result)
  //                          result.json().then( ////
  //                              (obj) => { ///
  //                                  console.log(obj);
  //                                  obj=[];
  //
  //                                  for(var i = 0 ; i < obj.length ; i++){
  //                                      var curId = obj[i].uid;
  //                                      try{
  //                                        let response = await fetch(
  //                                          'http://202.120.40.8:30454/users/users/id/'+curId,
  //                                        );
  //                                        let responseJson = await response.json();
  //                                        obj1[curId] = responseJson;
  //                                      }
  //                                      catch (error) {
  //                                          console.error(error);
  //                                        }
  //                                  }
  //                                  console.log(obj)
  //                                  console.log(obj1);
  //                                  this.setState({
  //                                      notesArray: obj,
  //                                      obj1: obj1,
  //                                  })
  //                               }  ///
  //                            )  ////
  //                         } /////
  //
  //                      }
  //              ).catch((error) => {
  //                  console.log(error)
  //              })

  //              // 注意这里的await语句，其所在的函数必须有async关键字声明
  //              let response = await fetch(
  //                'https://facebook.github.io/react-native/movies.json',
  //              );
  //              let responseJson = await response.json();
  //              return responseJson.movies;
            }

  //          _retrieveData = async () =>{
  //            let url='http://202.120.40.8:30454/users/travelnote/all';
  //                        fetch(url, {
  //                            method: 'GET',
  //                            headers: new Headers({
  //                                'Authorization': 'Bearer '+token
  //                            })
  //                        }).then(
  //                            (result) => {
  //                                if (result.ok) { /////
  //                                    console.log(result)
  //                                    result.json().then( ////
  //                                        (obj) => { ///
  //                                            console.log(obj);
  //                                            obj=[];
  //
  //                                            for(var i = 0 ; i < obj.length ; i++){
  //                                                var curId = obj[i].uid;
  //                                                await this.getUserInfo(curId);
  //                                            }
  //                                            console.log(obj)
  //                                            console.log(obj1);
  //                                            this.setState({
  //                                                notesArray: obj,
  //                                                obj1: obj1,
  //                                            })
  //                                         }  ///
  //                                      )  ////
  //                                   } /////
  //
  //                                }
  //                        ).catch((error) => {
  //                            console.log(error)
  //                        })
  //          }
  //
  //          async getUserInfo(curId) {
  //               let url1='http://202.120.40.8:30454/users/users/id/'+curId;
  //
  //               return fetch(url1, {
  //                    method: 'GET',
  //                    headers: new Headers({
  //                        'Authorization': 'Bearer '+token
  //                    })
  //               }).then((response) => {
  //                 console.log(response)
  //                 return response.json()
  //               })
  //               .then((result) => {
  //                 obj1[curId] = result
  //                 console.log(obj1);
  //               })
  //               .catch((error) => {
  //                 console.log(error)
  //               })
  //          };


            forNavigation(key){
              this.props.navigation.navigate('TravelNoteDetail',{
                  height: this.state.notesArray[key].height,
                  imageSrc: this.state.notesArray[key].note,
              })
            }

    render() {
          var arr=[];
          var notesArray = this.state.notesArray;
          console.log(this.state.obj1);
          console.log(this.state.notesArray);
  //        var obj1 = this.state.obj1;
          for(var i = 0 ; i < notesArray.length ; i++) {
           console.log(notesArray[i].height);
           console.log(this.state.obj1[i])
           if(i === notesArray.length-1 && this.state.obj1[i] != undefined){
            arr.push(
                        <TouchableOpacity
                        key={i}
                        style={{flex: 1, marginTop: 20, justifyContent: 'center', alignItems: 'center', height: 190, marginLeft: 10, marginRight: 10, marginBottom: 90}}
                        onPress={this.forNavigation.bind(this, i)}
                        >
                            <ImageBackground source={require('./Assets/MinePage/note.jpg')} style={{width: '100%', height: '100%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', flex: 1,}}>
                                 <Avatar
                                    width={60}
                                    height={60}
                                    source={{
                                      uri: 'data:image/png;base64,'+this.state.obj1[i].profile_picture,
                                    }}
                                    style={{marginLeft: 10, marginRight: 10}}
                                    activeOpacity={0.7}
                                    avatarStyle={{ borderRadius: 110 / 2 }}
                                    overlayContainerStyle={{ backgroundColor: 'transparent' }}
                                  />
                                  <View style={{width: 240}}>
                                     <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                         <Text style={{fontSize:16, color: '#333030', fontWeight: 'bold'}}>{this.state.obj1[i].username}</Text>
                                         {
                                         notesArray[i].state === 0 ?
                                         <Image source={require('./Assets/MinePage/mingwen.png')} style={{marginLeft: 5}}></Image>
                                         :
                                         <Image source={require('./Assets/MinePage/eyes_close.png')} style={{marginLeft: 5}}></Image>
                                         }

                                     </View>
                                     <Text style={{marginHorizontal: 5, flexShrink: 1}}>

                                     <Text style={{fontFamily: 'star', fontSize: 26}} >{notesArray[i].title}</Text>

                                     </Text>
                                 </View>


                            </ImageBackground>
                        </TouchableOpacity>
                    )
          } else if(this.state.obj1[i] != undefined) {
            arr.push(
                        <TouchableOpacity
                        key={i}
                        style={{flex: 1, marginTop: 20, justifyContent: 'center', alignItems: 'center', height: 190, marginLeft: 10, marginRight: 10}}
                        onPress={this.forNavigation.bind(this, i)}
                        >
                            <ImageBackground source={require('./Assets/MinePage/note.jpg')} style={{width: '100%', height: '100%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', flex: 1,}}>
                                 <Avatar
                                    width={60}
                                    height={60}
                                    source={{
                                      uri: 'data:image/png;base64,'+this.state.obj1[i].profile_picture,
                                    }}
                                    style={{marginLeft: 10, marginRight: 10}}
                                    activeOpacity={0.7}
                                    avatarStyle={{ borderRadius: 110 / 2 }}
                                    overlayContainerStyle={{ backgroundColor: 'transparent' }}
                                  />
                                  <View style={{width: 240}}>
                                     <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                         <Text style={{fontSize:16, color: '#333030', fontWeight: 'bold'}}>{this.state.obj1[i].username}</Text>
                                         {
                                         notesArray[i].state === 0 ?
                                         <Image source={require('./Assets/MinePage/mingwen.png')} style={{marginLeft: 5}}></Image>
                                         :
                                         <Image source={require('./Assets/MinePage/eyes_close.png')} style={{marginLeft: 5}}></Image>
                                         }

                                     </View>
                                     <Text style={{marginHorizontal: 5, flexShrink: 1}}>

                                     <Text style={{fontFamily: 'star', fontSize: 26}} >{notesArray[i].title}</Text>

                                     </Text>
                                 </View>


                            </ImageBackground>
                        </TouchableOpacity>
                    )
              } else{
                  console.log("else");
              }
          }
        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
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
            <ScrollView>

                {arr}
            </ScrollView>

          </View>
        );

    }
}