import React, { Fragment } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Animated,
  Easing,
  TouchableOpacity
} from 'react-native';

import LottieView from 'lottie-react-native';
import { Avatar, Header, Card, ListItem, Button, Icon, Rating, PricingCard } from 'react-native-elements';



export default class NothingScreen extends React.Component {
  componentDidMount() {
    // this.animation.play();
    // Or set a specific startFrame and endFrame with:
    this.animation.play(30, 120);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          statusBarProps={{ barStyle: 'light-content', translucent: true, backgroundColor: 'transparent' }}
          containerStyle={{ backgroundColor: "black" }}
          placement="left"
          backgroundImage={{ uri: 'http://cdn.sebastianj1wzyd.xyz/016%20Deep%20Blue.png' }}
          // leftComponent={{ icon: 'menu', color: '#fff' }}
          // centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
          // rightComponent={{ icon: 'home', color: '#fff' }}
          leftComponent={<TouchableOpacity style={{ marginRight: 0 }} onPress={() => this.props.navigation.navigate('Camera')}>
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
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <LottieView
            ref={animation => {
              this.animation = animation;
            }}
            style={{ flex: 1 }}
            source={require('../../app/animations/sad')}
          />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center', paddingBottom: 100 }}>
          <Text
            style={{ fontSize: 20, fontWeight: 'bold', fontFamily: 'Cochin' }}>
            什么都没有识别到
               </Text>
        </View>
      </View>

    )
  }
}