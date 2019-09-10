import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, StatusBar, ScrollView, AsyncStorage, TouchableOpacity, ImageBackground, TextInput, RefreshControl, PixelRatio, FlatList, } from 'react-native';
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
import Toast, { DURATION } from 'react-native-easy-toast';
import XPay from 'react-native-puti-pay';
import { MapView } from 'react-native-amap3d';
import ParallaxScrollView from 'react-native-parallax-scroll-view';

var Dimensions = require('Dimensions');
var screenWidth = Dimensions.get('window').width;
var screenHeight = Dimensions.get('window').height;


export default class TravelNoteDetail extends React.Component {
    render() {
      const { navigation } = this.props;
      const height = navigation.getParam('height');
      const imageSrc = navigation.getParam('imageSrc');
      console.log(height);
      console.log(imageSrc);
  
      return (
        <ScrollView style={{ width: 360 }}>
          <Image
            source={{ uri: imageSrc }}
            style={{ height: 360, width: 360, marginTop: 50 }}
          ></Image>
        </ScrollView>
      )
    }
  }

  const travelStyles = StyleSheet.create({
    header: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
      height: 100,
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    avatarContainer: {
      borderColor: '#9B9B9B',
      borderWidth: 1 / PixelRatio.get(),
      justifyContent: 'center',
      alignItems: 'center',
    },
    avatar: {
      borderRadius: 75,
      width: 150,
      height: 150,
    },
    TouchableOpacityStyle: {
      position: 'absolute',
      width: 50,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      right: 30,
      bottom: 90,
    },
    TouchableOpacityStyle1: {
      position: 'absolute',
      width: 50,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      right: 210,
      bottom: 190,
    },
    FloatingButtonStyle: {
      resizeMode: 'contain',
      width: 50,
      height: 50,
      //backgroundColor:'black'
    },
    FloatingButtonStyle1: {
      marginTop: 70,
      resizeMode: 'contain',
      width: 350,
      height: 350,
      marginBottom: 100,
      //backgroundColor:'black'
    },
    ModuleButtonStyle: {
      resizeMode: 'contain',
      width: 100,
      //backgroundColor:'black'
    },
  });
  
  
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
    TouchableOpacityStyle1: {
      position: 'absolute',
      width: 50,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      right: 30,
      bottom: 100,
    },
  });