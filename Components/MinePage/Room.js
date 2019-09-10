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

//我的游记 写死的
export default class Room extends React.Component {
  constructor() {
    console.log('room.js')
    super();
    this.state = {
      index: 0,
      notesArray: [],
      username: '',
      uid: 2,
      token: '',
    }

    this._retrieveData()
  }

  _retrieveData = async () => {
    const username = await AsyncStorage.getItem('username');
    const uid = await AsyncStorage.getItem('id');
    const token = await AsyncStorage.getItem('token');

    this.setState({
      username: username,
      uid: uid,
      token: token,
    })

    let url = 'http://202.120.40.8:30454/users/travelnote/uid/' + this.state.uid;
    fetch(url, {
      method: 'GET',
    }).then(
      (result) => {
        if (result.ok) {
          console.log(result)
          result.json().then(
            (obj) => {
              console.log(obj);
              this.setState({
                notesArray: obj,
              })
              // console.log(this.state.notesArray[0].height);
            }
          )
        }
      }
    ).catch((error) => {
      console.log(error)
    })
  };

  forNavigation(key) {
    this.props.navigation.navigate('TravelNoteDetail', {
      height: this.state.notesArray[key].height,
      imageSrc: this.state.notesArray[key].note,
    })
  }

  render() {
    var arr = [];
    var notesArray = this.state.notesArray;
    for (var i = 0; i < notesArray.length; i++) {
      console.log(notesArray[i].height);
      if (i === notesArray.length - 1) {
        arr.push(
          <TouchableOpacity
            key={i}
            style={{ flex: 1, marginTop: 20, justifyContent: 'center', alignItems: 'center', height: 190, marginLeft: 10, marginRight: 10, marginBottom: 90 }}
            onPress={this.forNavigation.bind(this, i)}
          >
            <ImageBackground source={require('./Assets/MinePage/note.jpg')} style={{ width: '100%', height: '100%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', flex: 1, }}>
              <Avatar
                width={60}
                height={60}
                source={{
                  uri: 'http://cdn.sebastianj1wzyd.xyz/IMG_7948.JPG',
                }}
                style={{ marginLeft: 10, marginRight: 10 }}
                activeOpacity={0.7}
                avatarStyle={{ borderRadius: 110 / 2 }}
                overlayContainerStyle={{ backgroundColor: 'transparent' }}
              />
              <View style={{ width: 240 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontSize: 16, color: '#333030', fontWeight: 'bold' }}>{this.state.username}</Text>
                  {
                    notesArray[i].state === 0 ?
                      <Image source={require('./Assets/MinePage/mingwen.png')} style={{ marginLeft: 5 }}></Image>
                      :
                      <Image source={require('./Assets/MinePage/eyes_close.png')} style={{ marginLeft: 5 }}></Image>
                  }

                </View>
                <Text style={{ marginHorizontal: 5, flexShrink: 1 }}>

                  <Text style={{ fontFamily: 'star', fontSize: 26 }} >{notesArray[i].title}</Text>

                </Text>
              </View>


            </ImageBackground>
          </TouchableOpacity>
        )
      } else {
        arr.push(
          <TouchableOpacity
            key={i}
            style={{ flex: 1, marginTop: 20, justifyContent: 'center', alignItems: 'center', height: 190, marginLeft: 10, marginRight: 10 }}
            onPress={this.forNavigation.bind(this, i)}
          >
            <ImageBackground source={require('./Assets/MinePage/note.jpg')} style={{ width: '100%', height: '100%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', flex: 1, }}>
              <Avatar
                width={60}
                height={60}
                source={{
                  uri: 'http://cdn.sebastianj1wzyd.xyz/IMG_7948.JPG',
                }}
                style={{ marginLeft: 10, marginRight: 10 }}
                activeOpacity={0.7}
                avatarStyle={{ borderRadius: 110 / 2 }}
                overlayContainerStyle={{ backgroundColor: 'transparent' }}
              />
              <View style={{ width: 240 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontSize: 16, color: '#333030', fontWeight: 'bold' }}>{this.state.username}</Text>
                  {
                    notesArray[i].state === 0 ?
                      <Image source={require('./Assets/MinePage/mingwen.png')} style={{ marginLeft: 5 }}></Image>
                      :
                      <Image source={require('./Assets/MinePage/eyes_close.png')} style={{ marginLeft: 5 }}></Image>
                  }

                </View>
                <Text style={{ marginHorizontal: 5, flexShrink: 1 }}>

                  <Text style={{ fontFamily: 'star', fontSize: 26 }} >{notesArray[i].title}</Text>

                </Text>
              </View>


            </ImageBackground>
          </TouchableOpacity>
        )
      }

    }
    return (
      <View>
        <Header
          statusBarProps={{ barStyle: 'light-content', translucent: true, backgroundColor: 'transparent' }}
          containerStyle={{ backgroundColor: "black" }}
          placement="left"
          backgroundImage={{ uri: 'http://cdn.sebastianj1wzyd.xyz/016%20Deep%20Blue.png' }}
          leftComponent={<TouchableOpacity style={{ marginRight: 0 }} onPress={() => this.props.navigation.navigate('UserPage')}>
            <Icon
              name='arrow-left'
              type='evilicon'
              size={30}
              color='#ffffff' />
          </TouchableOpacity>}
        />
        <ScrollView>

          {arr.length === 0 ? <Image source={require('./Assets/MinePage/empty.png')} style={travelStyles.FloatingButtonStyle1} /> : arr }

        </ScrollView>

             <ActionButton buttonColor="rgba(231,76,60,1)" buttonColor='#9b59b6' offsetX={20} offsetY={100} onPress={() => this.props.navigation.navigate('TravelNoteEdit')}>
           {/* <ActionButton.Item buttonColor='#9b59b6' title="New Task" onPress={() => console.log("notes tapped!")}>
            <Icon name="md-create" style={styles.actionButtonIcon} />
           </ActionButton.Item>
           <ActionButton.Item buttonColor='#3498db' title="Notifications" onPress={() => this.props.navigation.navigate('Shop')}>
             <Icon name="md-notifications-off" style={styles.actionButtonIcon} />
           </ActionButton.Item>
           <ActionButton.Item buttonColor='#1abc9c' title="All Tasks" onPress={() => this.props.navigation.navigate('More')}>
             <Icon name="md-done-all" style={styles.actionButtonIcon} />
           </ActionButton.Item> */}
         </ActionButton>

        <View style={{ alignSelf: 'flex-end'  }}>

          
          {/* <TouchableOpacity
            // activeOpacity={0.7}
            onPress={() => this.props.navigation.navigate('TravelNoteEdit')}
          // style={styles.TouchableOpacityStyle1}
          >
            <Image
              source={require('./Assets/MinePage/note.png')}
              style={travelStyles.FloatingButtonStyle}
            />
          </TouchableOpacity> */}
        </View>

      </View>
    )
  }
}

class TravelNoteDetail extends React.Component {
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
          style={{ height: height, width: 360, marginTop: 50 }}
        ></Image>
      </ScrollView>
    )
  }
}

class TravelNoteEdit extends React.Component {
  state = {
    avatarSource: [[], [], [], [], [], [], [], [], [], []], //图片
    imgSource: [[], [], [], [], [], [], [], [], [], []],
    text: '',
    number: 5,  //纸张数
    textArray: [],  //文本
    tmpText: '',
    isEdit: true,
    currentKey: 0,
    chooseTemplate: [1, 2, 3, 2, 1], //模版样式
    slideAnimationDialog: false,     //选择模版样式
    scaleAnimationDialog: false,    //提示最多选择十张纸
    source: null,
    snapShot: null,
    isSnap: false,
    refreshing: false,
    overflowFix: false,
    selfVisible: 0,
    defaultAnimationDialog: false, //控制是否仅自己可见
    isPressed: false,
    height: 0,
    uid: 2,
  };

  constructor(props) {
    super(props);




    this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
    this.selectVideoTapped = this.selectVideoTapped.bind(this);
    //    this.state = { text: '点击输入标题' };
    this._retrieveData()
  }

  _retrieveData = async () => {
    const uid = await AsyncStorage.getItem('id');
    this.setState({
      uid: uid,
    })

    //拿之前保存的草稿
    let url = 'http://202.120.40.8:30454/users/note/find?uid=' + uid;
    fetch(url, {
      method: 'GET',
    }).then(
      (result) => {
        if (result.ok) {
          console.log(result)
          result.json().then(
            (obj) => {
              console.log(obj);
              console.log(obj._parts[0]); //imgset
              console.log(obj._parts[1]); //text
              console.log(obj._parts[2]); //template
              console.log(obj._parts[3]); //pagenumber
              console.log(obj._parts[4]); //title
              //                                    console.log(obj._parts[5]);
              console.log(obj._parts[4][1]);

              this.setState({
                avatarSource: obj._parts[0][1],
                imgSource: obj._parts[0][1],
                textArray: obj._parts[1][1],
                chooseTemplate: obj._parts[2][1],
                number: obj._parts[3][1],
                text: obj._parts[4][1],
              })
            }
          )
        }
      }
    ).catch((error) => {
      console.log(error)
    })
  };

  selectPhotoTapped(key, index) {
    console.log(key);
    console.log(index);
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        //        let source = {uri: response.uri};
        //        console.log(response.uri);
        //        console.log(response.data);

        // You can also display the image using data:
        let source = { uri: 'data:image/jpeg;base64,' + response.data };
        var avatarSource = this.state.avatarSource;
        var imgSource = this.state.imgSource;
        avatarSource[key][index] = source;
        imgSource[key][index] = response.data;

        this.setState({
          avatarSource: avatarSource,
          imgSource: imgSource,
        });
        console.log("this is selectPhotoTapped");
        console.log(this.state.avatarSource);
        console.log(this.state.avatarSource[key][index]);

      }
    });
  }

  onChangeHandler(text) {

    console.log(text);
    var textArray = this.state.textArray;
    var key = this.state.currentKey;
    textArray[key] = text;
    this.setState({
      textArray: textArray,
    });
    console.log(textArray);

  }


  selectVideoTapped() {
    const options = {
      title: 'Video Picker',
      takePhotoButtonTitle: 'Take Video...',
      mediaType: 'video',
      videoQuality: 'medium',
    };

    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled video picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        this.setState({
          videoSource: response.uri,
        });
      }
    });
  }

  onBlurHandler(key) {
    console.log("this is onBlurHandler");
    console.log(key);
    var textArray = this.state.textArray;
    textArray[key] = this.state.tmpText;
    this.setState({
      textArray: textArray,
    });
    console.log(textArray);
  }

  onPressMinus(key) {
    console.log("this is onPressMinus");
    if (this.state.number === 1) {
      this.setState({
        scaleAnimationDialog: true,
      });
      return;
    }
    var textArray = this.state.textArray;
    var avatarSource = this.state.avatarSource;
    var number = this.state.number - 1;
    var chooseTemplate = this.state.chooseTemplate;
    var imgSource = this.state.imgSource;
    textArray.splice(key, 1);
    avatarSource.splice(key, 1);
    chooseTemplate.splice(key, 1);
    imgSource.splice(key, 1);
    this.setState({
      textArray: textArray,
      avatarSource: avatarSource,
      number: number,
      chooseTemplate: chooseTemplate,
      imgSource: imgSource,
    })
  }

  onFocusHandler(key) {
    console.log("this is onFocusHandler");
    console.log(key);
    this.setState({
      currentKey: key,
    })
  }

  onPressPlus(key) {
    console.log("this is onPressPlus");
    console.log(key);
    var number = this.state.number + 1;
    var chooseTemplate = this.state.chooseTemplate;
    chooseTemplate[number - 1] = key;
    this.setState({
      number: number,
      chooseTemplate: chooseTemplate,
      slideAnimationDialog: false,
    })
    console.log(this.state.number);
    console.log(this.state.chooseTemplate);
  }

  //保存 和发布应当区分开来
  saveNotes() {
    var number = this.state.number;
    var textArray = this.state.textArray;
    var imgSource = this.state.imgSource;
    var chooseTemplate = this.state.chooseTemplate;
    var title = this.state.text;


    let url = "http://202.120.40.8:30454/users/note/body/" + this.state.uid;
    //        let url = "http://202.120.40.8:30454/users/note/body/3";

    var formData = new FormData();
    formData.append("imgSet", imgSource);
    //    formData.append("pictures", "emm-emm");
    formData.append("text", textArray);
    //    formData.append("text", "emm,emm");
    formData.append("template", chooseTemplate);
    //    formData.append("template", "1,2");
    formData.append("pagenumber", number);
    //    formData.append("pagenumber", 2);
    //    formData.append("uid", uid);
    formData.append("title", title);
    //    formData.append("state", 1);

    console.log(formData);
    console.log(JSON.stringify(formData));
    //    return;

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
      //        body: formData
    }).then(
      (result) => {
        if (result.ok) {
          console.log(result)
          result.json().then(
            (obj) => {
              console.log(obj);
              console.log(obj._parts[0]);
              console.log(obj._parts[4][1]);
            }
          )
        }
      }
    ).catch((error) => {
      console.log(error)
      //        Alert.alert('Error')
    })
  }

  Release(value) {
    this.setState({
      defaultAnimationDialog: false,
      selfVisible: value,
      isSnap: true,
      overflowFix: true,
    });

    this.timer = setTimeout(() => {
      console.log("把一个定时器的引用挂在this上");
      captureRef(this.refs.fullRef, {
        format: "jpg",
        quality: 1,
        result: "base64",
        snapshotContentContainer: true
      })
        .then(
          uri => {
            console.log("Image saved to", uri);
            var base = 'data:image/png;base64,' + uri;
            this.setState({
              snapShot: base,
              isSnap: false,
              overflowFix: false,
            })

            //                      while(this.state.defaultAnimationDialog){
            //                                 console.log("spinning");
            //                      };

            var imageSource = this.state.snapShot;
            var selfVisible = this.state.selfVisible;
            var title = this.state.text;
            console.log("selfVisible");
            console.log(selfVisible);
            console.log(imageSource);
            console.log(title);
            let url = 'http://202.120.40.8:30455/travelnote/save';

            var formData = new FormData();
            formData.append("note", imageSource);
            formData.append("title", title);
            formData.append("state", selfVisible);
            formData.append("uid", this.state.uid);
            formData.append("height", this.state.height)

            console.log(formData);
            //                             console.log(JSON.stringify(formData));

            fetch(url, {
              method: 'POST',
              body: formData
            }).then(
              (result) => {
                if (result.ok) {
                  console.log(result)
                  this.refs.toast.show('发布成功');
                  result.json().then(
                    (obj) => {
                      console.log(obj);
                      //                                                 this.refs.toast.show('请输入标题');
                    }
                  )
                }
              }
            ).catch((error) => {
              this.refs.toast.show('发布失败');
              console.log(error)
              //        Alert.alert('Error')
            })
          },
          error => {
            console.error("Oops, snapshot failed", error);
            this.setState({
              isSnap: false,
              overflowFix: false,
            })
            return;
          }
        );
    }, 5000);
  }

  onReleasePressed() {
    if (this.state.text === '') {
      this.refs.toast.show('请输入标题');
    } else {
      var chooseTemplate = this.state.chooseTemplate;
      var height = 100;
      for (let i = 0; i < chooseTemplate.length; i++) {
        if (chooseTemplate[i] === 1) {
          height += 230;
        } else if (chooseTemplate[i] === 2) {
          height += 390;
        } else {
          height += 430;
        }
      }
      console.log(height);

      this.setState({
        defaultAnimationDialog: true,
        height: height,
      })
    }


  }

  //        render() {
  //            return(
  //            <View style={{
  //                                justifyContent: 'center',
  //                                alignItems: 'center',
  //                                backgroundColor: '#F5FCFF',
  //                                height: 100,}}>
  //                              <ImageBackground source={require('./Assets/MinePage/TravelAssets/header.jpg')} style={{width: '100%', height: '100%', alignItems: 'center', }}>
  //                                    <TextInput
  //                                      style={{height: 100, fontSize: 26, fontFamily: 'star'}}
  //                                      onChangeText={(text) => this.setState({text})}
  //                                      placeholder = "点击输入标题"
  //                                      value={this.state.text}
  //                                      editable={this.state.isEdit}
  //                                    />
  //                                </ImageBackground>
  //            </View>
  //            )
  //        }

  render() {
    console.log(this.state.chooseTemplate.length);
    console.log(this.state.chooseTemplate);
    var arr = [];
    //     console.log("this.state.avatarSource[0]");
    console.log(this.state.avatarSource);
    console.log(this.state.avatarSource[0]);
    console.log(this.state.avatarSource[1]);
    console.log(screenHeight);
    console.log(screenWidth);
    console.log(this.state.number);
    console.log(this.state.textArray);
    var chooseTemplate = this.state.chooseTemplate;
    var zero = 0;
    for (var i = 0; i < this.state.number; i++) {
      if (chooseTemplate[i] === 1) {
        arr.push(
          <View key={i} style={{ flex: 1, height: 230 }}>
            <ImageBackground source={require('./Assets/MinePage/TravelAssets/body1.jpg')} style={{ width: '100%', height: '100%', flexDirection: 'row' }}>

              {this.state.isEdit ?
                <TouchableOpacity onPress={this.onPressMinus.bind(this, i)} style={{ width: 30, height: 30, marginTop: 0 }}>
                  <Image
                    style={travelStyles.button}
                    source={require('./Assets/MinePage/TravelAssets/minus.png')}
                  />
                </TouchableOpacity> :
                <TouchableOpacity onPress={() => console.log('hi')} style={{ width: 30, height: 30, marginTop: 0 }}>

                </TouchableOpacity>
              }

              <TouchableOpacity onPress={this.state.isEdit ? this.selectPhotoTapped.bind(this, i, 0) : console.log("hello")} style={{ width: 180, height: 180, }}>
                <View
                  style={[travelStyles.avatar, travelStyles.avatarContainer, { marginBottom: 15 }]}>
                  {this.state.imgSource[i][0] === undefined ? (
                    <Text>选择照片上传</Text>
                  ) : (
                      <Image style={travelStyles.avatar} source={{ uri: 'data:image/jpeg;base64,' + this.state.imgSource[i][0] }} />
                    )}
                </View>
              </TouchableOpacity>
              <TextInput
                key={i}
                style={{ height: 180, borderColor: 'gray', borderWidth: 1, width: 140, marginRight: 10, fontFamily: 'star' }}
                onChange={(event) => this.onChangeHandler(event.nativeEvent.text)}
                onFocus={this.onFocusHandler.bind(this, i)}
                //  onBlur={this.onBlurHandler.bind(this, i)}
                value={this.state.textArray[i]}
                multiline={true}
                numberOfLines={9}
                editable={this.state.isEdit}
              />
            </ImageBackground>
          </View>
        );
      }
      if (chooseTemplate[i] === 2) {
        arr.push(
          <View key={i} style={{ flex: 1, height: 390 }}>
            <ImageBackground source={require('./Assets/MinePage/TravelAssets/body2.jpg')} style={{ width: '100%', height: '100%', flexDirection: 'row' }}>

              {this.state.isEdit ?
                <TouchableOpacity onPress={this.onPressMinus.bind(this, i)} style={{ width: 30, height: 30, marginTop: 0 }}>
                  <Image
                    style={travelStyles.button}
                    source={require('./Assets/MinePage/TravelAssets/minus.png')}
                  />
                </TouchableOpacity> :
                <TouchableOpacity onPress={() => console.log('hi')} style={{ width: 30, height: 30, marginTop: 0 }}>

                </TouchableOpacity>
              }
              <TextInput
                key={i}
                style={{ height: 200, borderColor: 'gray', borderWidth: 1, width: 140, marginLeft: 10, marginTop: 150, fontFamily: 'star' }}
                onChange={(event) => this.onChangeHandler(event.nativeEvent.text)}
                onFocus={this.onFocusHandler.bind(this, i)}
                //  onBlur={this.onBlurHandler.bind(this, i)}
                value={this.state.textArray[i]}
                multiline={true}
                numberOfLines={9}
                editable={this.state.isEdit}
              />
              <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                <TouchableOpacity onPress={this.state.isEdit ? this.selectPhotoTapped.bind(this, i, 0) : console.log("hello")} style={{ width: 160, height: 180, }}>
                  <View
                    style={[travelStyles.avatar, travelStyles.avatarContainer, { marginBottom: 15 }]}>
                    {this.state.imgSource[i][0] === undefined ? (
                      <Text>选择照片上传</Text>
                    ) : (
                        <Image style={travelStyles.avatar} source={{ uri: 'data:image/jpeg;base64,' + this.state.imgSource[i][0] }} />
                      )}
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.state.isEdit ? this.selectPhotoTapped.bind(this, i, 1) : console.log("hello")} style={{ width: 160, height: 180, }}>
                  <View
                    style={[travelStyles.avatar, travelStyles.avatarContainer, { marginBottom: 15 }]}>
                    {this.state.imgSource[i][1] === undefined ? (
                      <Text>选择照片上传</Text>
                    ) : (
                        <Image style={travelStyles.avatar} source={{ uri: 'data:image/jpeg;base64,' + this.state.imgSource[i][1] }} />
                      )}
                  </View>
                </TouchableOpacity>
              </View>

            </ImageBackground>
          </View>
        );
      }
      if (chooseTemplate[i] === 3) {
        arr.push(
          <View key={i} style={{ flex: 1, height: 430 }}>
            <ImageBackground source={require('./Assets/MinePage/TravelAssets/body3.jpg')} style={{ width: '100%', height: '100%', flexDirection: 'row' }}>

              {this.state.isEdit ?
                <TouchableOpacity onPress={this.onPressMinus.bind(this, i)} style={{ width: 30, height: 30, marginTop: 0 }}>
                  <Image
                    style={travelStyles.button}
                    source={require('./Assets/MinePage/TravelAssets/minus.png')}
                  />
                </TouchableOpacity> :
                <TouchableOpacity onPress={() => console.log('hi')} style={{ width: 30, height: 30, marginTop: 0 }}>

                </TouchableOpacity>
              }
              <View style={{ flexDirection: 'column', marginTop: 30 }}>
                <TouchableOpacity onPress={this.state.isEdit ? this.selectPhotoTapped.bind(this, i, 0) : console.log("hello")} style={{ width: 160, height: 180, }}>
                  <View
                    style={[travelStyles.avatar, travelStyles.avatarContainer, { marginBottom: 15 }]}>
                    {this.state.imgSource[i][0] === undefined ? (
                      <Text>选择照片上传</Text>
                    ) : (
                        <Image style={travelStyles.avatar} source={{ uri: 'data:image/jpeg;base64,' + this.state.imgSource[i][0] }} />
                      )}
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.state.isEdit ? this.selectPhotoTapped.bind(this, i, 1) : console.log("hello")} style={{ width: 160, height: 180, }}>
                  <View
                    style={[travelStyles.avatar, travelStyles.avatarContainer, { marginBottom: 15 }]}>
                    {this.state.imgSource[i][1] === undefined ? (
                      <Text>选择照片上传</Text>
                    ) : (
                        <Image style={travelStyles.avatar} source={{ uri: 'data:image/jpeg;base64,' + this.state.imgSource[i][1] }} />
                      )}
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'column', marginTop: 30 }}>
                <TouchableOpacity onPress={this.state.isEdit ? this.selectPhotoTapped.bind(this, i, 2) : console.log("hello")} style={{ width: 160, height: 180, }}>
                  <View
                    style={[travelStyles.avatar, travelStyles.avatarContainer, { marginBottom: 15 }]}>
                    {this.state.imgSource[i][2] === undefined ? (
                      <Text>选择照片上传</Text>
                    ) : (
                        <Image style={travelStyles.avatar} source={{ uri: 'data:image/jpeg;base64,' + this.state.imgSource[i][2] }} />
                      )}
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.state.isEdit ? this.selectPhotoTapped.bind(this, i, 3) : console.log("hello")} style={{ width: 160, height: 180, }}>
                  <View
                    style={[travelStyles.avatar, travelStyles.avatarContainer, { marginBottom: 15 }]}>
                    {this.state.imgSource[i][3] === undefined ? (
                      <Text>选择照片上传</Text>
                    ) : (
                        <Image style={travelStyles.avatar} source={{ uri: 'data:image/jpeg;base64,' + this.state.imgSource[i][3] }} />
                      )}
                  </View>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>
        );
      }

    }
    console.log(arr);

    return (
      <View>
        {this.state.isEdit ?
          <NavBar>
            <NavTitle>
              {"编辑游记"}
            </NavTitle>
            <NavGroup>
              <NavButton onPress={() => {
                this.setState({
                  isEdit: false,
                });
              }}>
                <NavButtonText>
                  {"预览"}
                </NavButtonText>
              </NavButton>

            </NavGroup>
          </NavBar> :
          <NavBar>
            <NavButton
              style={{ marginLeft: 0 }}
              onPress={() => {
                this.setState({
                  isEdit: true,
                });
              }}>
              <Image style={styles.width}

                source={require('./Assets/MinePage/TravelAssets/return.png')}
              />
            </NavButton>
            <NavTitle>
              {"预览"}
            </NavTitle>
            <NavButton onPress={this.onReleasePressed.bind(this)}>
              <NavButtonText>
                {"发布"}
              </NavButtonText>
            </NavButton>
          </NavBar>
        }

        <ScrollView
          ref="fullRef"
          style={{ overflow: this.state.overflowFix ? 'visible' : 'scroll' }}
        >

          <View style={travelStyles.header}>
            <ImageBackground source={require('./Assets/MinePage/TravelAssets/header.jpg')} style={{ width: '100%', height: '100%', alignItems: 'center', backgroundColor: 'transparent' }}>
              <TextInput
                style={{ height: 100, fontSize: 26, fontFamily: 'star' }}
                onChangeText={(text) => this.setState({ text })}
                placeholder="点击输入标题"
                value={this.state.text}
                editable={this.state.isEdit}
              />
            </ImageBackground>
          </View>

          {arr}

          {this.state.isSnap ? null :
            <TouchableOpacity onPress={() => console.log('hi')} style={{ width: 360, height: 50, marginTop: 0 }}>

            </TouchableOpacity>}

        </ScrollView>
        {this.state.isEdit ?
          <View>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                this.setState({
                  slideAnimationDialog: true,
                });
              }}
              style={travelStyles.TouchableOpacityStyle}>
              <Image
                source={require('./Assets/MinePage/TravelAssets/float-add-icon.png')}
                style={travelStyles.FloatingButtonStyle}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={this.saveNotes.bind(this)}
              style={travelStyles.TouchableOpacityStyle1}>
              <Image
                source={require('./Assets/MinePage/TravelAssets/save.png')}
                style={travelStyles.FloatingButtonStyle}
              />
            </TouchableOpacity>
          </View>
          : null}


        <Dialog
          onDismiss={() => {
            this.setState({ slideAnimationDialog: false });
          }}
          onTouchOutside={() => {
            this.setState({ slideAnimationDialog: false });
          }}
          visible={this.state.slideAnimationDialog}
          dialogTitle={<DialogTitle title="选择游记模块" />}
          dialogAnimation={new SlideAnimation({ slideFrom: 'bottom' })}
        >
          {this.state.number < 10 ?
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <TouchableOpacity onPress={this.onPressPlus.bind(this, 1)} >
                <Image

                  source={require('./Assets/MinePage/TravelAssets/module1.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.onPressPlus.bind(this, 2)} >
                <Image

                  source={require('./Assets/MinePage/TravelAssets/module2.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.onPressPlus.bind(this, 3)} >
                <Image

                  source={require('./Assets/MinePage/TravelAssets/module3.png')}
                />
              </TouchableOpacity>
            </View>
            : <DialogContent>
              <Text style={{ fontSize: 26 }}>最多选择十张纸哦</Text>
            </DialogContent>
          }
        </Dialog>
        <Dialog
          onTouchOutside={() => {
            this.setState({ scaleAnimationDialog: false });
          }}
          width={0.7}
          visible={this.state.scaleAnimationDialog}
          dialogAnimation={new ScaleAnimation()}
          onHardwareBackPress={() => {
            console.log('onHardwareBackPress');
            this.setState({ scaleAnimationDialog: false });
            return true;
          }}
          dialogTitle={
            <DialogTitle
              title="提示"
              hasTitleBar={false}
            />
          }
          actions={[
            <DialogButton
              text="我知道了"
              onPress={() => {
                this.setState({ scaleAnimationDialog: false });
              }}
              key="button-1"
            />,
          ]}
        >
          <DialogContent>
            <Text style={{ fontSize: 20 }}>不能再减少了哦</Text>
          </DialogContent>
        </Dialog>
        <Dialog
          width={0.9}
          visible={this.state.defaultAnimationDialog}
          rounded
          actionsBordered
          // actionContainerStyle={{
          //   height: 100,
          //   flexDirection: 'column',
          // }}
          dialogTitle={
            <DialogTitle
              title="谁能看见"
              style={{
                backgroundColor: '#F7F7F8',
              }}
              hasTitleBar={false}
              align="left"
            />
          }
          footer={
            <DialogFooter>
              <DialogButton
                text="所有人"
                bordered
                onPress={this.Release.bind(this, 0)}
                key="button-1"
              />
              <DialogButton
                text="私密模式"
                bordered
                onPress={this.Release.bind(this, 1)}
                key="button-2"
              />
            </DialogFooter>
          }
        >
          <DialogContent
            style={{
              backgroundColor: '#F7F7F8',
            }}
          >
            <Text>请选择这篇游记的可见状态</Text>

          </DialogContent>
        </Dialog>
        <Toast ref="toast" />
      </View>
    );
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

