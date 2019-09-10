/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { StyleSheet, Text, View, Button, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
let { width: winWidth, height: winHeight, scale: winScale } = Dimensions.get('window');
let WH = winHeight / 2295;
let WW = winWidth / 1243;
import JMessage from 'jmessage-react-plugin';

export default class Main extends React.Component {
  constructor() {
    super()
  //   JMessage.init({
  //     appkey: "6a8022404564c09c1622da33",
  //     isOpenMessageRoaming: false, // 是否开启消息漫游，默认不开启
  //     isProduction: true, // 是否为生产模式
  // })

  // //登录
  // JMessage.login({
  //     username: "didi",
  //     password: "123456"
  // }, () => { alert("登陆成功") }, (error) => {/*登录失败回调*/ })

  // var listener = (message) => {
  //     // 收到的消息会返回一个消息对象. 对象字段可以参考对象说明
  //     console.log(message)
  //     alert("收到消息")
  //   }
    
  // JMessage.addReceiveMessageListener(listener) // 添加监听

  }
  static navigationOptions = {
    drawerLabel: '主页',
    drawerIcon: () => (
      <Image
        source={require('../Assets/MainPage/home-icon.png')}
        style={[styles.icon]}
      />
    ),
  };

  render() {
    return (
        <ScrollView
          directionalLockEnabled={true}
          showsVerticalScrollIndicator={false}
          bounces={false}>
        <TimerPhoto></TimerPhoto>
        <MainList></MainList>
          </ScrollView>
        

    );
  }

}

class MainList extends React.Component {
  render() {
    console.log(winWidth)
    console.log(winHeight)
    return (
      <View style={{ width: winHeight, backgroundColor: 'rgba(255,255,255,1)', marginTop: 5 }}>
        
          <View style={{ flexDirection: 'row', marginBottom: 5 }}>
            <TouchableOpacity onPress={this.props.navigation.navigate('Harbin')}>
              <Image source={{ uri: 'http://cdn.sebastianj1wzyd.xyz/5.png' }} style={{ width: 170, height: 100, marginLeft: 5, marginRight: 5 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.props.navigation.navigate('HongKong')}>
              <Image source={{ uri: 'http://cdn.sebastianj1wzyd.xyz/6.png' }} style={{ width: 170, height: 100, marginLeft: 5, marginRight: 5 }} />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', marginBottom: 5 }}>
            <TouchableOpacity onPress={this.props.navigation.navigate('Chengdu')}>
              <Image source={{ uri: 'http://cdn.sebastianj1wzyd.xyz/7.png' }} style={{ width: 170, height: 100, marginLeft: 5, marginRight: 5 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.props.navigation.navigate('Macao')}>
              <Image source={{ uri: 'http://cdn.sebastianj1wzyd.xyz/8.png' }} style={{ width: 170, height: 100, marginLeft: 5, marginRight: 5 }} />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', marginBottom: 5 }}>
            <TouchableOpacity onPress={this.props.navigation.navigate('Nanjing')}>
              <Image source={{ uri: 'http://cdn.sebastianj1wzyd.xyz/9.png' }} style={{ width: 170, height: 100, marginLeft: 5, marginRight: 5 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.props.navigation.navigate('Suzhou')}>
              <Image source={{ uri: 'http://cdn.sebastianj1wzyd.xyz/10.png' }} style={{ width: 170, height: 100, marginLeft: 5, marginRight: 5 }} />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', marginBottom: 5 }}>
            <TouchableOpacity onPress={this.props.navigation.navigate('Tokyo')}>
              <Image source={{ uri: 'http://cdn.sebastianj1wzyd.xyz/11.png' }} style={{ width: 170, height: 100, marginLeft: 5, marginRight: 5 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.props.navigation.navigate('LosAngeles')}>
              <Image source={{ uri: 'http://cdn.sebastianj1wzyd.xyz/12.png' }} style={{ width: 170, height: 100, marginLeft: 5, marginRight: 5 }} />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', marginBottom: 5 }}>
            <TouchableOpacity onPress={this.props.navigation.navigate('Paris')}>
              <Image source={{ uri: 'http://cdn.sebastianj1wzyd.xyz/13.png' }} style={{ width: 170, height: 100, marginLeft: 5, marginRight: 5 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.props.navigation.navigate('London')}>
              <Image source={{ uri: 'http://cdn.sebastianj1wzyd.xyz/14.png' }} style={{ width: 170, height: 100, marginLeft: 5, marginRight: 5 }} />
            </TouchableOpacity>
          </View>
          
      </View>
    )
  }
}

class TimerPhoto extends React.Component {
  constructor() {
    super()
    this.state = {
      currentPage: 0,
    }
  }
  render() {
    return (

      <ScrollView
        ref="ScrollView"
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        onMomentumScrollEnd={(e) => this.onAnimationEnd(e)}
        style={{ height: WH * 584 }}
      >
        <Image source={{ uri: 'http://cdn.sebastianj1wzyd.xyz/1.png' }} style={{ width: winWidth, height: WH * 584 }} />
        <Image source={{ uri: 'http://cdn.sebastianj1wzyd.xyz/2.png' }} style={{ width: winWidth, height: WH * 584 }} />
        <Image source={{ uri: 'http://cdn.sebastianj1wzyd.xyz/3.png' }} style={{ width: winWidth, height: WH * 584 }} />
        <Image source={{ uri: 'http://cdn.sebastianj1wzyd.xyz/4.png'}} style={{ width: winWidth, height: WH * 584 }} />
      </ScrollView>
    )
  }
  componentDidMount() {
    this.startTimer();
  }
  onScrollBeginDrag() {
    clearInterval(this.timer)
  }
  onScrollEndDrag() {
    this.startTimer();
  }
  onAnimationEnd(e) {
    let offSetX = e.nativeEvent.contentOffset.x;
    this.setState({
      currentPage: Math.floor(offSetX / winWidth)
    })
  }



  startTimer() {
    let ScrollView = this.refs.ScrollView;
    this.timer = setInterval(() => {
      let activePage = 0;
      if (this.state.currentPage >= 4) {
        activePage = 0;
      } else {
        activePage = this.state.currentPage + 1;
      }
      this.setState({
        currentPage: activePage
      })
      let timerX = activePage * winWidth;
      ScrollView.scrollTo({
        x: timerX,
        animated: true
      })
    }, 2500)
  }

  componentWillUnmount() {
    this.timer && clearInterval(this.timer);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  icon: {
    width: 30,
    height: 30,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  listViewStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  innerListView: {
    marginLeft: (winWidth - 584 * WW * 2) / 3,
    marginTop: 5,
  },
  textstyle: {
    fontSize: 48 / 4,
    color: '#ff9cec'
  },
  navsBottom: {
    width: winWidth,
    flex: 1,
    top: 0,
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(255,255,255,0)',
  }
});




