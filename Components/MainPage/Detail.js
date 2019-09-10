/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Slider, Image, AsyncStorage, ImageBackground, ScrollView} from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
var Dimensions = require('Dimensions');
var screenWidth = Dimensions.get('window').width;
import { Avatar, Header, Card, ListItem, Button, Icon, Rating, PricingCard } from 'react-native-elements';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      result1: [],
      result2: [],
    }
//    const { navigation } = this.props;
//    const id = navigation.getParam('id', );
//    console.log(id);
    this._getScenery();
  }

    _getScenery(){
     const { navigation } = this.props;
     const id = navigation.getParam('id', );
     console.log(id);
//    const id = 4;
    let url1 = 'http://202.120.40.8:30454/users/behavior/getscene?id='+id;
    fetch(url1, {
        method: 'GET',
    }).then(
        (result) => {
            if (result.ok) {
                result.json().then(
                    (obj) => {
                        console.log(obj);
                        console.log(obj.overview);
                        this.setState({
                            result1: obj,
                        })
                    }
                )
            }
        }
    ).catch((error) => {
        console.log(error)
    })

    let url2 = 'http://202.120.40.8:30454/users/behavior/getimg?id='+id;
    fetch(url2, {
        method: 'GET',
    }).then(
        (result) => {
            if (result.ok) {
                result.json().then(
                    (obj) => {
                        console.log(obj);
                        console.log(obj.middleimage);
                        this.setState({
                            result2: obj,
                        })
                    }
                )
            }
        }
    ).catch((error) => {
        console.log(error)
    })

  }

  onPressTitle(){
    console.log("我被点击了");
  }

  render() {
    const { onScroll = () => { } } = this.props;
    const block = "        ";
    var imageSource = 'https://img1.qunarzz.com/travel/d5/1603/49/e90d38c02ba958f7.jpg';
    const none = "暂无";

    if(this.state.result2.length===0){
        imageSource = 'http://cdn.sebastianj1wzyd.xyz/nothings.png'
    } else {
        imageSource = this.state.result2.middleimage
    }

    return (
      <ParallaxScrollView
        onScroll={onScroll}
        headerBackgroundColor="#333"
        stickyHeaderHeight={STICKY_HEADER_HEIGHT}
        parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
        backgroundSpeed={10}
        renderBackground={() => (
          <View key="background">
            <Image source={{ uri: imageSource, width: screenWidth, height: 350 }} />

          </View>
        )}

        renderForeground={() => (
          <View key="parallax-header" style={styles.parallaxHeader}>
            <Text style={styles.sectionTitleText}>
              {this.state.result1.attract}
            </Text>
            {this.state.result2.length===0?<Text style={{color: 'white', fontSize: 16, paddingVertical: 5, marginTop: 120}}>暂时还没有图片</Text>:null}
          </View>
        )}

        renderStickyHeader={() => (
          <View key="sticky-header" style={styles.stickySection}>
            <ImageBackground source={{uri: 'http://cdn.sebastianj1wzyd.xyz/016%20Deep%20Blue.png'}} style={{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
              <Text style={styles.stickySectionText}>{this.state.result1.attract}</Text>
            </ImageBackground>
          </View>
        )}

        renderFixedHeader={() => (
          <View key="fixed-header" style={styles.fixedSection}>
            <Text style={styles.fixedSectionText}>
            </Text>
          </View>
        )}>
        <ScrollView style={{ marginTop: 35 }}>
          <Text style={{ fontSize: 16, fontFamily: 'detail' }}>{block}{this.state.result1.overview}</Text>

          <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 5, marginTop: 15}}>
             <Image source={require('./Assets/location-2.png')} style={{ width: 24, height: 24, marginRight: 5}}></Image>
             <Text style={{color: '#3E4348', fontSize: 15, fontWeight: 'bold'}}>地址</Text>
          </View>
          <Text style={{fontFamily: 'detail', fontSize: 16, marginLeft: 34}}>
            {this.state.result1.address === "" ? none : this.state.result1.address}
          </Text>

          <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 5, marginTop: 15}}>
             <Image source={require('./Assets/season.png')} style={{ width: 24, height: 24, marginRight: 5}}></Image>
             <Text style={{color: '#3E4348', fontSize: 15, fontWeight: 'bold'}}>适宜季节</Text>
          </View>
          <Text style={{fontFamily: 'detail', fontSize: 16, marginLeft: 34}}>
            {this.state.result1.season === "" ? none : this.state.result1.season}
          </Text>

          <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 5, marginTop: 15}}>
             <Image source={require('./Assets/ticket.png')} style={{ width: 24, height: 24, marginRight: 5}}></Image>
             <Text style={{color: '#3E4348', fontSize: 15, fontWeight: 'bold'}}>门票</Text>
          </View>
          <Text style={{fontFamily: 'detail', fontSize: 16, marginLeft: 34}}>
            {this.state.result1.scene  === "" ? none : this.state.result1.scene}
          </Text>

          <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 5, marginTop: 15}}>
             <Image source={require('./Assets/phone.png')} style={{ width: 24, height: 24, marginRight: 5}}></Image>
             <Text style={{color: '#3E4348', fontSize: 15, fontWeight: 'bold'}}>联系电话</Text>
          </View>
          <Text style={{fontFamily: 'detail', fontSize: 16, marginLeft: 34}}>
            {this.state.result1.phone  === "" ? none : this.state.result1.phone}
          </Text>

           <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 5, marginTop: 15}}>
              <Image source={require('./Assets/bus-2.png')} style={{ width: 24, height: 24, marginRight: 5}}></Image>
              <Text style={{color: '#3E4348', fontSize: 15, fontWeight: 'bold'}}>交通</Text>
           </View>
           <Text style={{fontFamily: 'detail', fontSize: 16, marginLeft: 34}}>
             {this.state.result1.traffic  === "" ? none : this.state.result1.traffic}
           </Text>

           <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 5, marginTop: 15}}>
              <Image source={require('./Assets/icon33.png')} style={{ width: 24, height: 24, marginRight: 5}}></Image>
              <Text style={{color: '#3E4348', fontSize: 15, fontWeight: 'bold'}}>用时参考</Text>
           </View>
           <Text style={{fontFamily: 'detail', fontSize: 16, marginLeft: 34}}>
             {this.state.result1.hours  === "" ? none : this.state.result1.hours}
           </Text>

           <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 5, marginTop: 15}}>
              <Image source={require('./Assets/tip.png')} style={{ width: 24, height: 24, marginRight: 5}}></Image>
              <Text style={{color: '#3E4348', fontSize: 15, fontWeight: 'bold'}}>游玩建议</Text>
           </View>
           <Text style={{fontFamily: 'detail', fontSize: 16, marginLeft: 34}}>
             {this.state.result1.tip  === "" ? none : this.state.result1.tip}
           </Text>

           <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 5, marginTop: 15}}>
              <Image source={require('./Assets/website.png')} style={{ width: 24, height: 24, marginRight: 5}}></Image>
              <Text style={{color: '#3E4348', fontSize: 15, fontWeight: 'bold'}}>网址</Text>
           </View>
           <Text style={{fontFamily: 'detail', fontSize: 16, marginLeft: 34}}
           >
             {this.state.result1.website  === "" ? none : this.state.result1.website}
           </Text>
        </ScrollView>

      </ParallaxScrollView>


    );
  }
}

const window = Dimensions.get('window');

const AVATAR_SIZE = 120;
const ROW_HEIGHT = 60;
const PARALLAX_HEADER_HEIGHT = 350;
const STICKY_HEADER_HEIGHT = 70;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: window.width,
    height: PARALLAX_HEADER_HEIGHT
  },
  stickySection: {
    height: STICKY_HEADER_HEIGHT,
    width: 360,
    justifyContent: 'flex-end'
  },
  stickySectionText: {
    color: 'white',
    fontSize: 20,
//    margin: 10
  },
  fixedSection: {
    position: 'absolute',
    bottom: 10,
    right: 10
  },
  fixedSectionText: {
    color: '#999',
    fontSize: 20,
  },
  parallaxHeader: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    paddingTop: 100
  },
  avatar: {
    marginBottom: 10,
    borderRadius: AVATAR_SIZE / 2
  },
  sectionSpeakerText: {
    color: 'white',
    fontSize: 24,
    paddingVertical: 5
  },
  sectionTitleText: {
    color: 'white',
    fontSize: 25,
    paddingVertical: 5
  },
  row: {
    overflow: 'hidden',
    paddingHorizontal: 10,
    height: ROW_HEIGHT,
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderBottomWidth: 1,
    justifyContent: 'center'
  },
  rowText: {
    fontSize: 20
  }
});