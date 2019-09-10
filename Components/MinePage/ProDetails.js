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

var cols = 3;
var boxW = 100;
var vMargin  = (screenWidth - cols*boxW)/(cols + 1);
var hMargin = 40;
const AVATAR_SIZE = 120;
const ROW_HEIGHT = 60;
//const PARALLAX_HEADER_HEIGHT = 350;
const PARALLAX_HEADER_HEIGHT = 200;
const STICKY_HEADER_HEIGHT = 70;

export default class ProDetailsScreen extends React.Component {
    constructor() {
        super();
        this.state = {
          result: [],
          obj: [],
          obj1: [],
          obj2: [],
          data: [],
          uid: 2,
          token: '',
        }
  
  
  
        this._retrieveData();
      }
  
      _retrieveData = async () => {
       const uid = await AsyncStorage.getItem('id');
             const token = await AsyncStorage.getItem('userToken');
  
             this.setState({
              uid: uid,
              token: token,
             })
        console.log("detail");
        let url = "http://202.120.40.8:30454/imgidentify/imgidentify/lmkhis/"+ uid;
        fetch(url, {
                method: 'GET',
                headers: new Headers({
                    'Authorization': 'Bearer '+ token
                })
            }).then(
                (result) => {
                    console.log(result)
                    if (result.ok) {
  
                        console.log(result)
  
                        result.json().then(
                            (obj) => {
  //                              console.log(obj);
  //                              console.log(obj.length);
                                if(obj.length === 0){
                                  return;
                                }
  
                                for(var m = 0 ; m < obj.length ; m++){
                                  obj[m].image='data:image/png;base64,'+ obj[m].image;
                                }
                                this.setState({
                                  obj: obj,
                                });
                                var data = [];
                                var number = 0;
                                for(var n = 0 ; n < obj.length ; n++){
                                  if(data.indexOf(obj[n].proname) === -1){
                                      data.push(obj[n].proname);
                                      number++;
                                  }
                                }
                                console.log("data")
                                console.log(data)
  //                              console.log("this is ProNumber");
  //                              console.log(number);
                                this.setState({
                                  data: data,
                                });
  //                              console.log(this.state.data);
                            }
                        )
                    }
                }
            ).catch((error) => {
                console.log(error)
        //        Alert.alert('Error')
            })
      };
  
     _onInfoWindowPress = () => Alert.alert('onInfoWindowPress')
  
     _coordinates = [
      {
          proname: '\"天津\"',
          coor:
          {
            latitude: 39.13,
            longitude: 117.2,
          }
       },
      {
          proname: '\"北京\"',
          coor:
          {
            latitude: 39.90,
            longitude: 116.40,
          },
      },
      {
          proname: '\"西藏\"',
          coor:
          {
            latitude: 29.65,
            longitude: 91.13,
          }
      },
      {
          proname: '\"河北\"',
          coor:
          {
            latitude: 38.03,
            longitude: 114.48,
          }
       },
      {
              proname: '\"山西\"',
          coor:
          {
            latitude: 37.87,
            longitude: 112.53,
          },
      },
      {
          proname: '\"内蒙古\"',
          coor:
          {
            latitude: 40.82,
            longitude: 111.65,
          }
      },
      {
          proname: '\"辽宁\"',
          coor:
          {
            latitude: 41.8,
            longitude: 123.38,
          }
       },
      {
          proname: '\"吉林\"',
          coor:
          {
            latitude: 43.88,
            longitude: 125.35,
          },
      },
      {
          proname: '\"黑龙江\"',
          coor:
          {
            latitude: 45.75,
            longitude: 126.63,
          }
      },
      {
          proname: '\"上海\"',
          coor:
          {
            latitude: 31.22,
            longitude: 121.48,
          }
       },
      {
          proname: '\"江苏\"',
          coor:
          {
            latitude: 32.04,
            longitude: 118.78,
          },
      },
      {
          proname: '\"浙江\"',
          coor:
          {
            latitude: 30.26,
            longitude: 120.19,
          }
      },
      {
          proname: '\"安徽\"',
          coor:
          {
            latitude: 31.86,
            longitude: 117.27,
          }
       },
      {
          proname: '\"福建\"',
          coor:
          {
            latitude: 26.08,
            longitude: 119.3,
          },
      },
      {
          proname: '\"江西\"',
          coor:
          {
            latitude: 28.68,
            longitude: 115.89,
          }
      },
      {
          proname: '\"山东\"',
          coor:
          {
            latitude: 36.65,
            longitude: 117,
          }
       },
      {
          proname: '\"河南\"',
          coor:
          {
            latitude: 34.76,
            longitude: 113.65,
          },
      },
      {
          proname: '\"湖北\"',
          coor:
          {
            latitude: 30.52,
            longitude: 114.31,
          }
      },
      {
          proname: '\"湖南\"',
          coor:
          {
            latitude: 28.21,
            longitude: 113,
          }
       },
      {
          proname: '\"广东\"',
          coor:
          {
            latitude: 23.16,
            longitude: 113.23,
          },
      },
      {
          proname: '\"广西\"',
          coor:
          {
            latitude: 22.84,
            longitude: 108.33,
          }
      },
       {
           proname: '\"海南\"',
           coor:
           {
             latitude: 20.02,
             longitude: 110.35,
           }
        },
       {
           proname: '\"重庆\"',
           coor:
           {
             latitude: 29.59,
             longitude: 106.54,
           },
       },
       {
           proname: '\"四川\"',
           coor:
           {
             latitude: 30.67,
             longitude: 104.06,
           }
       },
       {
           proname: '\"贵州\"',
           coor:
           {
             latitude: 26.57,
             longitude: 106.71,
           }
        },
       {
           proname: '\"云南\"',
           coor:
           {
             latitude: 25.04,
             longitude: 102.73,
           },
       },
       {
           proname: '\"陕西\"',
           coor:
           {
             latitude: 34.27,
             longitude: 108.95,
           }
       },
       {
           proname: '\"甘肃\"',
           coor:
           {
             latitude: 36.03,
             longitude: 103.73,
           }
        },
       {
           proname: '\"青海\"',
           coor:
           {
             latitude: 36.56,
             longitude: 101.74,
           },
       },
       {
           proname: '\"宁夏\"',
           coor:
           {
             latitude: 38.47,
             longitude: 106.27,
           }
       },
       {
           proname: '\"新疆\"',
           coor:
           {
             latitude: 43.77,
             longitude: 87.68,
           }
       },
       {
           proname: '\"台湾\"',
           coor:
           {
             latitude: 24.9,
             longitude: 121.6,
           }
        },
       {
           proname: '\"香港\"',
           coor:
           {
             latitude: 22.20,
             longitude: 114.10,
           },
       },
       {
           proname: '\"澳门\"',
           coor:
           {
             latitude: 22.20,
             longitude: 113.50,
           }
       },
    ];
  
    init(){
          console.log("this is init");
          
          let url = "http://202.120.40.8:30454/imgidentify/imgidentify/lmkhis/"+this.state.uid;
          fetch(url, {
                  method: 'GET',
                  headers: new Headers({
                      'Authorization': 'Bearer '+this.state.token
                  })
              }).then(
                  (result) => {
                      if (result.ok) {
                          console.log(result)
                          result.json().then(
                              (obj) => {
                                  console.log(obj);
                                  console.log(obj.length);
  
                                  for(var m = 0 ; m < obj.length ; m++){
                                    obj[m].image='data:image/png;base64,'+ obj[m].image;
                                  }
                                  this.setState({
                                    obj: obj,
                                  });
                                  var obj1=[];
                                  var obj2=[];
                                  for(var n = 0 ; n < obj.length ; n++){
                                      if(obj[n].result==='{"landmark":"八达岭熊乐园"}'){
                                          obj1.push(obj[n]);
                                      }
                                      else obj2.push(obj[n]);
                                  }
                                  this.setState({
                                      obj1: obj1,
                                      obj2: obj2,
                                  })
                                  console.log(obj1);
                                  console.log(obj2);
                                  console.log(obj[0].result);
                                  console.log(typeof(obj[0].result));
                                  console.log(obj[0].result["landmark"]);
                                  console.log(obj[0].result.landmark);
    //                              console.log(obj._parts[4][1]);
                              }
                          )
                      }
                  }
              ).catch((error) => {
                  console.log(error)
          //        Alert.alert('Error')
              })
      }
  
    render() {
      var markerData = [];
      console.log()
      for(var n = 0 ; n < this.state.data.length ; n++){
          for(var i = 0 ; i < this._coordinates.length; i++){
              if(this._coordinates[i].proname === this.state.data[n]){
                  var tmp = this._coordinates[i].coor;
                  markerData.push(
                      <MapView.Marker image='logo64' coordinate={tmp} key={i}>
                        <TouchableOpacity activeOpacity={0.9} onPress={this._onInfoWindowPress}>
                          <View style={fishStyles.customInfoWindow}>
                            <Text>{this.state.data[n]}</Text>
                          </View>
                        </TouchableOpacity>
                      </MapView.Marker>
                  )
              }
          }
      }
      console.log("markerData")
      console.log(markerData)
  
      var allData = [];
      var obj = this.state.obj;
      console.log(obj);
      for(var j = 0 ; j < this.state.data.length ; j++){
          var tmp = [];
          for(var k = 0 ; k < obj.length ; k++){
              console.log(obj[k].proname);
              console.log(this.state.data[j]);
              if(obj[k].proname === this.state.data[j]){
                  tmp.push(obj[k]);
              }
          }
          console.log(this.state.data[j]);
          console.log(tmp);
          allData.push(
          <View key={j}>
              <Text style={{fontWeight: 'bold', marginTop: 10}} >{this.state.data[j]}</Text>
              <FlatList
                  data={tmp}
                  numColumns ={3} // 一行3个
                  renderItem={({item})=><SpotList url={item.image} text={item.result}/>}
              />
          </View>
          )
      }
  
  
      return (
        <ScrollView>
          <MapView
             style={{width :360, height: 300}}
             coordinate={{
               latitude: 39.90,
               longitude: 116.40,
             }}
           >
           {markerData}
          </MapView>
          {allData}
        </ScrollView>
      );
    }
  }

  const fishStyles = StyleSheet.create({

    container: {
           flexDirection:'row', //设置主轴方向
  //         flexWrap:'wrap', //超出换行
           backgroundColor: 'yellow',
           width:screenWidth,  //宽度等于屏幕宽度
           height:screenHeight },
      outViewS:{
          backgroundColor:'gray',
          alignItems:'center',   //交叉轴的对齐方式
           width:boxW,
           height:boxW,
           marginLeft:vMargin,
           marginBottom: 10,
          marginTop:hMargin    },
    engine: {
      position: 'absolute',
      right: 0,
    },
  
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
  //    color: Colors.black,
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
  //    color: Colors.dark,
    },
    highlight: {
      fontWeight: '700',
    },
    footer: {
  //    color: Colors.dark,
      fontSize: 12,
      fontWeight: '600',
      padding: 4,
      paddingRight: 12,
      textAlign: 'right',
    },
    avatar: {
        marginBottom: 10,
        borderRadius: AVATAR_SIZE / 2
    },
    stickySection: {
        height: STICKY_HEADER_HEIGHT,
        width: 300,
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center'
      },
      stickySectionText: {
          color: 'black',
          fontSize: 20,
          margin: 10
        },
        sectionSpeakerText: {
            color: 'black',
            fontSize: 24,
            paddingVertical: 5
          },
          sectionTitleText: {
            color: 'white',
            fontSize: 18,
            paddingVertical: 5
          },
           parallaxHeader: {
              alignItems: 'center',
              flex: 1,
              flexDirection: 'column',
              paddingTop: 100
            },
            fixedSection: {
                position: 'absolute',
                bottom: 10,
                right: 10
              },
              fixedSectionText: {
                color: '#999',
                fontSize: 20
              },customIcon: {
                    width: 40,
                    height: 40,
                  },
                  customInfoWindow: {
                    backgroundColor: '#8bc34a',
                    padding: 10,
                    borderRadius: 10,
                    elevation: 4,
                    borderWidth: 2,
                    borderColor: '#689F38',
                    marginBottom: 5,
                  },
                  customMarker: {
                    backgroundColor: '#009688',
                    alignItems: 'center',
                    borderRadius: 5,
                    padding: 5,
                  },
                  markerText: {
                    color: '#fff',
                  },
  });

  class SpotList extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      return (
        <View style={fishStyles.outViewS}>
            <TouchableOpacity onPress={this.onPress}>
                  <ImageBackground source={{uri: this.props.url}} style={{width: 100, height: 100, justifyContent: 'flex-end'}}>
                       <Text style={{color: 'white', fontWeight: 'bold'}}>{this.props.text}</Text>
                  </ImageBackground>
            </TouchableOpacity>
        </View>
      )
    }
  }