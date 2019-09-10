/**
 * this is the sign in form of the login screen
 */

import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  BackAndroid,
  Platform,
  TouchableOpacity,
  LayoutAnimation,
  UIManager,
  StyleSheet,
  AsyncStorage
} from 'react-native'
// import { connect } from 'react-redux'
import { signIn } from '../../actions'
import { getColor } from '../config'
// import { firebaseApp } from '../../firebase'
import * as Animatable from 'react-native-animatable'
import { BackHandler } from 'react-native';
var token = ''
var status = 0
var json = ''

export default class SignInForm extends Component {
  constructor(props) {
    super(props)

    this._handleBackBtnPress = this._handleBackBtnPress.bind(this)

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true)
    }

    this.state = {
      init: true,
      errMsg: null,
      forgotPass: false,
      email: '',
      password: ''
    }
  }

  componentDidMount() {
    BackHandler.addEventListener('backBtnPressed', this._handleBackBtnPress)
  }

  componentDidUpdate() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('backBtnPressed', this._handleBackBtnPress)
  }

  render() {
    const animation = this.state.init ? 'bounceInUp' : 'bounceOutDown'
    const errorMessage = this.state.errMsg ? <Text style={styles.errMsg}>{this.state.errMsg}</Text> : null

    return (
      <Animatable.View
        animation={animation}
        style={styles.container}
        onAnimationEnd={this._handleAnimEnd.bind(this)}>
        <Text style={styles.title}>Sign In</Text>
        {errorMessage}
        <View style={[styles.inputContainer, { marginBottom: 10 }]}>
          <TextInput
            style={styles.inputField}
            underlineColorAndroid='transparent'
            placeholder='用户名'
            keyboardType='email-address'
            placeholderTextColor='#999999'
            value={this.state.email}
            onChangeText={(text) => this.setState({ email: text })}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputField}
            underlineColorAndroid='transparent'
            placeholder='密码'
            secureTextEntry={true}
            placeholderTextColor='#999999'
            value={this.state.password}
            onChangeText={(text) => this.setState({ password: text })}
          />
        </View>
        <View style={styles.btnContainers}>
          <TouchableOpacity onPress={this._handleForgotPassword.bind(this)}>
            <View style={styles.fogotBtnContainer}>
              <Text style={styles.forgotBtn}>{'忘记密码?'}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._handleSignIn.bind(this)}>
            <View style={styles.submitBtnContainer}>
              <Text style={styles.submitBtn}>{'登录'}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    )
  }

  _handleForgotPassword() {
    this.setState({ init: false, forgotPass: true })
  }

  async LogAction() {

    let base64 = require('base-64');
    let url = 'http://202.120.40.8:30458/oauth/token';
    let username1 = 'eagleeye';
    let password1 = 'thisissecret';
    let headers = new Headers();
    headers.append('Authorization', 'Basic ' + base64.encode(username1 + ":" + password1));
    // headers.append('Content-Type', 'application/x-www-form-urlencoded');
    console.log("登录信息")
    console.log('Basic ' + base64.encode(username1 + ":" + password1))
    let formData = new FormData();
    formData.append("username", this.state.email);
    formData.append("password", this.state.password);
    formData.append("grant_type", "password");
    formData.append("scope", "webclient");

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: formData
      });
      if (!response.ok) {
        // alert("用户名或密码错误")
        // this.setState({ errMsg: error.message });
        this.setState({ errMsg: '用户名或密码错误' })
        throw new Error('Failed to Log in');
      }
      console.log(response);
      const json = await response.json();
      console.log(json);
      const result = json.access_token;
      console.log(result);
      // this.setState({
      //   token: result
      // })
      token = result;
      status = 1;
    }
    catch (error) {
      console.log(error);
    }

  };

  async getInfo(userToken) {

    let url = 'http://202.120.40.8:30454/users/users/username/' + this.state.email;
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
        console.log("信息")
        console.log(json.id)
        // return 
        // return json.access_token
      })
      .catch((error) => {
        console.log(error)
      })
  }


  _handleSignIn = async () => {
    // TODO: do something
    this.setState({ errMsg: '登录中...' })
    await this.LogAction()
    await AsyncStorage.setItem('userToken', token)
    // .then(() => {
    //   setTimeout(() => {
    //     this._handleGoBack()
    //   }, 1000)
    // });
    const userToken = await AsyncStorage.getItem('userToken', '');
    console.log('userToken')
    console.log(userToken)
    token = ''
    if (userToken != null) {
      await this.getInfo(userToken)
      console.log('得到信息')
      console.log(json.id)
      await AsyncStorage.setItem('username', json.username.toString())      
      await AsyncStorage.setItem('id', json.id.toString())
      await AsyncStorage.setItem('vip', json.vip.toString())
      await AsyncStorage.setItem('vipdate', json.vipdate.toString())
      await AsyncStorage.setItem('from', 'auto')
      await AsyncStorage.setItem('to', 'zh-CHS')
      await AsyncStorage.setItem('profile_picture', json.profile_picture.toString())

      const id = await AsyncStorage.getItem('from', '');
      console.log('from')
      console.log(id)

      this.props.goToHomeScreen()
    }


    // firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    //   .then(() => {
    //     this.props.goToHomeScreen()
    //     setTimeout(()=> {
    //       this._handleGoBack()
    //     }, 1000)
    //   })
    //   .catch((error) => {
    //     this.setState({ errMsg: error.message })
    //   })
    // this.props.goToHomeScreen()
  }

  _handleGoBack() {
    this.setState({ init: false })
  }

  _handleBackBtnPress() {
    this._handleGoBack()
    return true
  }

  _handleAnimEnd() {
    if (this.state.forgotPass) {
      this.props.onForgotPass()
    } else if (!this.state.init) {
      this.props.onBackFromSignIn()
    }
  }
}

function mapStateToProps(state) {
  return { currentUser: state.currentUser }
}

// export default connect(mapStateToProps, {signIn})(SignInForm)

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
    color: '#ffffff',
    marginBottom: 10,
    fontSize: 14,
    fontFamily: 'Roboto-Regular'
  },
  inputContainer: {
    backgroundColor: 'rgba(255,255,255,.8)',
    borderRadius: 5
  },
  inputField: {
    width: 280,
    height: 40,
    paddingLeft: 15,
    paddingRight: 15,
    fontFamily: 'Roboto-Bold',
    color: getColor()
  },
  btnContainers: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 280
  },
  fogotBtnContainer: {

  },
  forgotBtn: {
    fontFamily: 'Roboto-Bold',
    fontSize: 12,
    color: '#ffffff'
  },
  submitBtnContainer: {
    width: 120,
    height: 40,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  submitBtn: {
    fontFamily: 'Roboto-Bold',
    fontSize: 12,
    color: getColor()
  }
})
