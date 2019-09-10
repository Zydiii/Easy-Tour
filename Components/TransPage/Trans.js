import React, { Component } from 'react'
import AudioRecord from 'react-native-audio-record';
import { Buffer } from 'buffer'
// import { NativeModules, NativeEventEmitter } from 'react-native';


import {
    StyleSheet,
    View,
    Alert,
    Dimensions,
    Button,
    Platform,
    Image,
    StatusBar,
    TouchableOpacity,
    AsyncStorage,
    Text,
    Modal
} from 'react-native'
import ImageViewer from 'react-native-image-zoom-viewer';

import Dialog, {
    DialogTitle,
    DialogContent,
    DialogFooter,
    DialogButton,
    SlideAnimation,
    ScaleAnimation,
} from 'react-native-popup-dialog';
import JMessage from 'jmessage-react-plugin';
import { SearchBar, Header, Icon } from 'react-native-elements';
import { createBottomTabNavigator, createAppContainer, DrawerActions } from "react-navigation";

var RNFS = require('react-native-fs')
var forge = require('node-forge');

var ReactNative = require('react-native')
import IMUI from 'aurora-imui-react-native'
var InputView = IMUI.ChatInput
var MessageListView = IMUI.MessageList
const AuroraIController = IMUI.AuroraIMUIController
const window = Dimensions.get('window')
var themsgid = 1

// const images = [{
//     // Simplest usage.
//     url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460',
//     props: {
//         // headers: ...
//     }
// }]

function constructNormalMessage() {

    var message = {}
    message.msgId = themsgid.toString()
    themsgid += 1
    message.status = "send_succeed"
    message.isOutgoing = true
    var date = new Date()
    message.timeString = date.getHours() + ":" + date.getMinutes()
    var user = {
        userId: "didi",
        displayName: "didi",
        avatarPath: "http://cdn.sebastianj1wzyd.xyz/IMG_7948.JPG"
    }
    // if (Platform.OS === "ios") {
    //     user.avatarPath = RNFS.MainBundlePath + '/default_header.png'
    // }
    message.fromUser = user

    return message
}

var imageUrlArray = [
    //        "https://www.lsc-online.com/wp-content/uploads/2017/05/bigstock-151229657.jpg"
    //        "https://www.iconspng.com/images/coniglio-rabbit-small/coniglio-rabbit-small.jpg",
    // "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1534943746996&di=ad157c6f6cf0559b272718793c5af048&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fphotoblog%2F1206%2F21%2Fc2%2F12078509_12078509_1340246370201.jpg"
]

class CustomVew extends Component {
    constructor(props) {
        super(props);
        this.state = {
            base64Image: ''
        };
    }
    render() {
        return (<img src={`${RNFS.MainBundlePath}/default_header.png`}></img>)
    }
}

export default class TestRNIMUI extends Component {
    // static navigationOptions = {
    //     tabBarVisible: false,
    //     tabBarLabel: '翻译',
    //     headerTitle: 'Second',
    //     tabBarIcon: ({ tintColor }) => (
    //         <Image
    //             source={require('../Assets/TransPage/trans_icon.png')}
    //             style={[styles.icon, { tintColor: tintColor }]}
    //         />
    //     ),
    // };

    constructor(props) {
        super(props);
        let initHeight;
        if (Platform.OS === "ios") {
            initHeight = 46
        } else {
            initHeight = 50
        }
        this.state = {
            inputLayoutHeight: initHeight,
            messageListLayout: { flex: 1, width: window.width, margin: 0 },
            inputViewLayout: { width: window.width, height: initHeight, },
            isAllowPullToRefresh: true,
            navigationBar: {},
            customBackgroundDialog: false,
            defaultAnimationDialog: false,
            scaleAnimationDialog: false,
            slideAnimationDialog: false,
            pic: '',
            images: [],
            visible: false,
            audioFile: '',
            recording: false,
            paused: true,
            loaded: false
        }

        this.updateLayout = this.updateLayout.bind(this);
        this.onMsgClick = this.onMsgClick.bind(this);
        this.messageListDidLoadEvent = this.messageListDidLoadEvent.bind(this);

        const options = {
            sampleRate: 16000,
            channels: 1,
            bitsPerSample: 16,
            wavFile: 'test.wav'
        };

        AudioRecord.init(options);

        AudioRecord.on('data', data => {
            const chunk = Buffer.from(data, 'base64');
            console.log('chunk size', chunk.byteLength);
            // do something with audio chunks
        });

        this.getVip()
    }

    async getVip() {
        const vip = await AsyncStorage.getItem('vip', '');
        if (vip == 1) {
            this.setState({
                visible: false
            })
        }
        else {
            this.setState({
                visible: true
            })
        }
        console.log(this.state.visible)
    }

    componentDidMount() {
        /**
         * Android only
         * Must set menu height once, the height should be equals with the soft keyboard height so that the widget won't flash.
         * 在别的界面计算一次软键盘的高度，然后初始化一次菜单栏高度，如果用户唤起了软键盘，则之后会自动计算高度。
         */
        if (Platform.OS === "android") {
            this.refs["ChatInput"].setMenuContainerHeight(316)
        }
        this.resetMenu()
        AuroraIController.addMessageListDidLoadListener(this.messageListDidLoadEvent);
    }

    messageListDidLoadEvent() {
        this.getHistoryMessage()
    }

    getHistoryMessage() {
        var messages = []
        for (var index in imageUrlArray) {
            var message = constructNormalMessage()
            message.fromUser.avatarUrl = "http://cdn.sebastianj1wzyd.xyz/IMG_7948.JPG",//1
                message.msgType = 'image'
            message.mediaPath = imageUrlArray[index]
            message.contentSize = { 'height': 100, 'width': 200 }
            message.extras = { "extras": "fdfsf" }
            messages.push(message)
            // AuroraIController.appendMessages([message])
            // AuroraIController.scrollToBottom(true)
        }
        AuroraIController.appendMessages(messages)
        AuroraIController.scrollToBottom(true)
    }

    onInputViewSizeChange = (size) => {
        console.log("onInputViewSizeChange height: " + size.height + " width: " + size.width)
        if (this.state.inputLayoutHeight != size.height) {
            this.setState({
                inputLayoutHeight: size.height,
                inputViewLayout: { width: window.width, height: size.height },
                messageListLayout: { flex: 1, width: window.width, margin: 0 }
            })
        }
    }

    componentWillUnmount() {
        AuroraIController.removeMessageListDidLoadListener(this.messageListDidLoadEvent)
    }

    resetMenu() {
        if (Platform.OS === "android") {
            this.refs["ChatInput"].showMenu(false)
            this.setState({
                messageListLayout: { flex: 1, width: window.width, margin: 0 },
                navigationBar: { height: 64, justifyContent: 'center' },
            })
            this.forceUpdate();
        } else {
            AuroraIController.hidenFeatureView(true)
        }
    }

    /**
     * Android need this event to invoke onSizeChanged 
     */
    onTouchEditText = () => {
        this.refs["ChatInput"].showMenu(false)
    }

    onFullScreen = () => {
        console.log("on full screen")
        this.setState({
            messageListLayout: { flex: 0, width: 0, height: 0 },
            inputViewLayout: { flex: 1, width: window.width, height: window.height },
            navigationBar: { height: 0 }
        })
    }

    onRecoverScreen = () => {
        // this.setState({
        //   inputLayoutHeight: 100,
        //   messageListLayout: { flex: 1, width: window.width, margin: 0 },
        //   inputViewLayout: { flex: 0, width: window.width, height: 100 },
        //   navigationBar: { height: 64, justifyContent: 'center' }
        // })
    }

    onAvatarClick = (message) => {
        // Alert.alert("删除消息")
        // AuroraIController.removeMessage(message.msgId)
    }

    onMsgClick(message) {
        console.log(message)
        if (message.msgType == 'image' && message.isOutgoing == false) {
            this.setState({
                slideAnimationDialog: true,
                pic: message.mediaPath,
                images: [{
                    // Simplest usage.
                    url: message.mediaPath,
                    props: {
                        // headers: ...
                    }
                }]
            })
        }

        // Alert.alert("message", JSON.stringify(message))
    }

    onMsgLongClick = (message) => {
        // Alert.alert('message bubble on long press', 'message bubble on long press')
    }

    onStatusViewClick = (message) => {
        // message.status = 'send_succeed'
        // AuroraIController.updateMessage(message)
    }

    onBeginDragMessageList = () => {
        this.resetMenu()
        AuroraIController.hidenFeatureView(true)
    }

    onTouchMsgList = () => {
        AuroraIController.hidenFeatureView(true)
    }

    onPullToRefresh = () => {
        console.log("on pull to refresh")
        var messages = []
        // for (var i = 0; i < 3; i++) {
        //     var message = constructNormalMessage()
        //     // if (index%2 == 0) {
        //     message.msgType = "text"
        //     message.text = "" + i
        //     // }

        //     if (i % 3 == 0) {
        //         message.msgType = "video"
        //         message.text = "" + i
        //         message.mediaPath = "/storage/emulated/0/ScreenRecorder/screenrecorder.20180323101705.mp4"
        //         message.duration = 12
        //     }
        //     messages.push(message)
        // }
        AuroraIController.insertMessagesToTop(messages)
        if (Platform.OS === 'android') {
            this.refs["MessageList"].refreshComplete()
        }

    }

    onSendText = (text) => {
        var message = constructNormalMessage()
        var evenmessage = constructNormalMessage()

        message.msgType = 'text'
        message.text = text

        AuroraIController.appendMessages([message])

        var getResult = this.getTextTranslationFromApiAsync(text)

        console.log(getResult)

    }

    // getTextTranslationFromApiAsync(text) {

    //     var appid = '20190718000319144';
    //     var md = forge.md.md5.create();
    //     var salt = '123';
    //     var key = 'S3PZKNS_brMlFuxMCNP5';
    //     var sign = appid + text + salt + key;
    //     md.update(sign);
    //     var password = md.digest().toHex();

    //     fetch('https://fanyi-api.baidu.com/api/trans/vip/translate?q=' + text + '&from=' + 'en' +
    //         '&to=' + 'zh' + '&appid=' + '20190718000319144' + '&salt=' + '123' + '&sign=' + password)
    //         .then((response) => {
    //             if (!response.ok) {
    //                 throw new Error('Invalid')
    //             }
    //             console.log(response)
    //             return response.json()
    //         })
    //         .then((responseJson) => {
    //             console.log(responseJson);
    //             return responseJson.trans_result[0].dst
    //         })
    //         .then((getResult) => {
    //             var message = constructNormalMessage()
    //             message.msgType = "custom"
    //             message.msgId = "10"
    //             message.status = "send_going"
    //             message.isOutgoing = false
    //             message.content = '翻译结果：' + getResult
    //             // message.contentSize = { 'height': 100, 'width': 200 }
    //             message.extras = { "extras": "fdfsf" }
    //             var user = {
    //                 userId: "",
    //                 displayName: "",
    //                 avatarPath: ""
    //             }
    //             user.displayName = ""
    //             user.avatarPath = "http://cdn.sebastianj1wzyd.xyz/Qs.Picture.view.png"
    //             message.fromUser = user
    //             AuroraIController.appendMessages([message]);
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //             var message = constructNormalMessage()
    //             message.msgType = "custom"
    //             message.msgId = "10"
    //             message.status = "send_going"
    //             message.isOutgoing = false
    //             message.content = '哎呀，出错啦'
    //             // message.contentSize = { 'height': 100, 'width': 200 }
    //             message.extras = { "extras": "fdfsf" }
    //             var user = {
    //                 userId: "",
    //                 displayName: "",
    //                 avatarPath: ""
    //             }
    //             user.displayName = ""
    //             user.avatarPath = "http://cdn.sebastianj1wzyd.xyz/Qs.Picture.view.png"
    //             message.fromUser = user
    //             AuroraIController.appendMessages([message]);
    //         });
    // }

    getTextTranslationFromApiAsync = async (text) => {

        let url = 'http://202.120.40.8:30454/translate/translate/text'
        const from = await AsyncStorage.getItem('from')
        console.log(from)
        const to = await AsyncStorage.getItem('to')
        console.log(to)
        const iid = await AsyncStorage.getItem('id')
        const id = parseFloat(iid)
        let formData = new FormData()
        formData.append("sentence", text)
        formData.append("from", from)
        formData.append("to", to)
        formData.append("id", id)
        const userToken = await AsyncStorage.getItem('userToken', '');
        console.log('userToken')
        console.log(userToken)

        return fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + userToken
            },
            body: formData
        })
            .then((response) => {
                if (!response.ok) {
                    console.log(response)
                    throw new Error('Invalid')
                }
                console.log(response)
                return response.text()
            })
            .then((result) => {
                console.log('翻译结果')
                console.log(result)
                var message = constructNormalMessage()
                message.msgType = "custom"
                message.msgId = "10"
                message.status = "send_going"
                message.isOutgoing = false
                message.content = result
                // message.contentSize = { 'height': 100, 'width': 200 }
                message.extras = { "extras": "fdfsf" }
                var user = {
                    userId: "",
                    displayName: "",
                    avatarPath: ""
                }
                user.displayName = ""
                user.avatarPath = "http://cdn.sebastianj1wzyd.xyz/Qs.Picture.view.png"
                message.fromUser = user
                AuroraIController.appendMessages([message]);
            })
            .catch((error) => {
                console.log(error)
                var message = constructNormalMessage()
                message.msgType = "custom"
                message.msgId = "10"
                message.status = "send_going"
                message.isOutgoing = false
                message.content = '哎呀，出错啦'
                // message.contentSize = { 'height': 100, 'width': 200 }
                message.extras = { "extras": "fdfsf" }
                var user = {
                    userId: "",
                    displayName: "",
                    avatarPath: ""
                }
                user.displayName = ""
                user.avatarPath = "http://cdn.sebastianj1wzyd.xyz/Qs.Picture.view.png"
                message.fromUser = user
                AuroraIController.appendMessages([message]);
            })
    }

    onTakePicture = (media) => {
        console.log("media " + JSON.stringify(media))
        var message = constructNormalMessage()
        message.msgType = 'image'
        message.mediaPath = media.mediaPath
        AuroraIController.appendMessages([message])
        this.resetMenu()
        AuroraIController.scrollToBottom(true)
        this.UploadPic(media.mediaPath)
    }

    onStartRecordVoice = (e) => {
        console.log("on start record voice")
        AudioRecord.start();
    }

    onFinishRecordVoice = async (mediaPath, duration) => {

        const res = await AudioRecord.stop()

        console.log(res)
        this.UploadVoice(res)
        var message = constructNormalMessage()
        message.msgType = "voice"
        message.mediaPath = res
        message.duration = duration

        AuroraIController.appendMessages([message])
        console.log("on finish record voice")

        // console.log(audioFile)

    }

    UploadVoice = async (pathTo) => {
        const userToken = await AsyncStorage.getItem('userToken', '');
        const from = await AsyncStorage.getItem('from')
        const to = await AsyncStorage.getItem('to')
        const iid = await AsyncStorage.getItem('id')
        const id = parseFloat(iid)


        RNFS.readFile(pathTo, 'base64')
            .then((content) => {
                // console.log("base64::")
                // console.log(content)
                const appKey = '3732bd9603c078bc'
                const salt = '123'  //这里最好用随机盐（随机字符串）保证安全
                const key = 'rI86cdVLfXWGMhRGkfyFYz000Y62fJCY'
                let q = content
                var sign = appKey + q + salt + key
                var md = forge.md.md5.create();
                md.update(sign);
                var password = md.digest().toHex();

                // let url = "http://openapi.youdao.com/speechtransapi?q=" + content + '&from=' + "zh-CHS" +
                //     '&to=' + "en" + '&appKey=' + appKey + '&salt=' + '123' + '&sign=' + password +
                //     '&format=' + 'wav' + '&rate=' + '8000' + '&channel=' + '1' + '&type=' + '1'
                let url = "http://openapi.youdao.com/speechtransapi"

                let formData = new FormData();
                formData.append("q", q);
                formData.append("salt", salt);
                formData.append("sign", password);
                formData.append("from", from);   // 记得修改这里
                formData.append("to", to);         // 记得修改这里
                formData.append("appKey", appKey);
                formData.append("format", "wav");
                formData.append("type", "1");
                formData.append("channel", "1");
                formData.append("rate", "16000");

                fetch(url, {
                    method: 'POST',
                    body: formData
                }).then((response) => {
                    console.log(response)
                    return response.json();
                })
                    .then((myJson) => {
                        console.log(myJson)
                        return myJson.translation
                    })
                    .then((result) => {
                        console.log(result[0])
                        return result[0]
                    })
                    .then((getResult) => {
                        var message = constructNormalMessage()
                        message.msgType = "custom"
                        message.msgId = "10"
                        message.status = "send_going"
                        message.isOutgoing = false
                        message.content = getResult
                        // message.contentSize = { 'height': 100, 'width': 200 }
                        message.extras = { "extras": "fdfsf" }
                        var user = {
                            userId: "",
                            displayName: "",
                            avatarPath: ""
                        }
                        user.displayName = ""
                        user.avatarPath = "http://cdn.sebastianj1wzyd.xyz/Qs.Picture.view.png"
                        message.fromUser = user
                        AuroraIController.appendMessages([message]);
                    })
                    .catch((error) => {
                        console.log(error)
                        var message = constructNormalMessage()
                        message.msgType = "custom"
                        message.msgId = "10"
                        message.status = "send_going"
                        message.isOutgoing = false
                        message.content = '哎呀，出错啦'
                        // message.contentSize = { 'height': 100, 'width': 200 }
                        message.extras = { "extras": "fdfsf" }
                        var user = {
                            userId: "",
                            displayName: "",
                            avatarPath: ""
                        }
                        user.displayName = ""
                        user.avatarPath = "http://cdn.sebastianj1wzyd.xyz/Qs.Picture.view.png"
                        message.fromUser = user
                        AuroraIController.appendMessages([message]);
                    })

            });
        // RNFS.readFile(pathTo, 'base64')
        // .then((content) => {
        //     console.log(content)
        //     let url = "http://202.120.40.8:30454/translate/translate/voice"
        //     let formData = new FormData();
        //     this.tmp = content
        //     formData.append("voice", this.tmp);
        //     formData.append("id", id);
        //     formData.append("from", from)
        //     formData.append("to", to)

        //     fetch(url, {
        //         credentials: 'include',
        //         method: 'POST',
        //         headers: {
        //             // 'Content-Type': 'application/x-www-form-urlencoded',
        //             'Authorization': 'Bearer ' + userToken
        //         },
        //         body: formData
        //     }).then((response) => {
        //         return response.json();
        //     })
        //         .then((myJson) => {
        //             console.log(myJson)
        //             return myJson.translation
        //         })
        //         .then((result) => {
        //             console.log(result[0])
        //             return result[0]
        //         })
        //         .then((getResult) => {
        //             var message = constructNormalMessage()
        //             message.msgType = "custom"
        //             message.msgId = "10"
        //             message.status = "send_going"
        //             message.isOutgoing = false
        //             message.content = getResult
        //             // message.contentSize = { 'height': 100, 'width': 200 }
        //             message.extras = { "extras": "fdfsf" }
        //             var user = {
        //                 userId: "",
        //                 displayName: "",
        //                 avatarPath: ""
        //             }
        //             user.displayName = ""
        //             user.avatarPath = "http://cdn.sebastianj1wzyd.xyz/Qs.Picture.view.png"
        //             message.fromUser = user
        //             AuroraIController.appendMessages([message]);
        //         })
        //         .catch((error) => {
        //             console.log(error)
        //             var message = constructNormalMessage()
        //             message.msgType = "custom"
        //             message.msgId = "10"
        //             message.status = "send_going"
        //             message.isOutgoing = false
        //             message.content = '哎呀，出错啦'
        //             // message.contentSize = { 'height': 100, 'width': 200 }
        //             message.extras = { "extras": "fdfsf" }
        //             var user = {
        //                 userId: "",
        //                 displayName: "",
        //                 avatarPath: ""
        //             }
        //             user.displayName = ""
        //             user.avatarPath = "http://cdn.sebastianj1wzyd.xyz/Qs.Picture.view.png"
        //             message.fromUser = user
        //             AuroraIController.appendMessages([message]);
        //         })

        // });
    }

    onCancelRecordVoice = () => {
        AudioRecord.stop()
        console.log("on cancel record voice")
    }

    onStartRecordVideo = () => {
        console.log("on start record video")
    }

    onFinishRecordVideo = (video) => {
        // var message = constructNormalMessage()

        // message.msgType = "video"
        // message.mediaPath = video.mediaPath
        // message.duration = video.duration
        // AuroraIController.appendMessages([message])
    }

    onSendGalleryFiles = (mediaFiles) => {
        /**
         * WARN: This callback will return original image, 
         * if insert it directly will high memory usage and blocking UI。
         * You should crop the picture before insert to messageList。
         * 
         * WARN: 这里返回的是原图，直接插入大会话列表会很大且耗内存.
         * 应该做裁剪操作后再插入到 messageListView 中，
         * 一般的 IM SDK 会提供裁剪操作，或者开发者手动进行裁剪。
         * 
         * 代码用例不做裁剪操作。
         */
        // Alert.alert('fas', JSON.stringify(mediaFiles))
        for (index in mediaFiles) {
            var message = constructNormalMessage()
            if (mediaFiles[index].mediaType == "image") {
                message.msgType = "image"
            } else {
                message.msgType = "video"
                message.duration = mediaFiles[index].duration
            }

            message.mediaPath = mediaFiles[index].mediaPath
            message.timeString = ""
            message.status = "send_succeed"
            AuroraIController.appendMessages([message])
            AuroraIController.scrollToBottom(true)
            this.UploadPic(message.mediaPath)
        }

        this.resetMenu()
    }

    UploadPic = async (pathTo) => {
        const userToken = await AsyncStorage.getItem('userToken', '');
        const from = await AsyncStorage.getItem('from')
        const to = await AsyncStorage.getItem('to')
        const iid = await AsyncStorage.getItem('id')
        const id = parseFloat(iid)
        var message = constructNormalMessage()
        message.msgType = "custom"
        message.status = "send_succeed"
        message.isOutgoing = false
        message.content = '小游正在努力翻译中，请稍作等待 > <'
        // message.contentSize = { 'height': 100, 'width': 200 }
        message.extras = { "extras": "fdfsf" }
        var user = {
            userId: "",
            displayName: "",
            avatarPath: ""
        }
        user.displayName = ""
        user.avatarPath = "http://cdn.sebastianj1wzyd.xyz/Qs.Picture.view.png"
        message.fromUser = user
        AuroraIController.appendMessages([message]);

        RNFS.readFile(pathTo, 'base64')
            .then((content) => {
                let url = "http://202.120.40.8:30454/translate/translate/photo"
                let formData = new FormData();
                this.tmp = content
                formData.append("picture", this.tmp);
                formData.append("id", id);
                formData.append("from", from)
                formData.append("to", to)
                // userToken = '2e447211-3c19-426c-ad3c-82ee1365c08f'
                console.log(content)

                fetch(url, {
                    credentials: 'include',
                    method: 'POST',
                    headers: {
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': 'Bearer ' + userToken
                    },
                    body: formData
                }).then((response) => {
                    if (!response.ok) {
                        throw ('bad')
                    }
                    return response.text();
                })
                    .then((myJson) => {
                        console.log("result");
                        console.log(myJson);
                        var message = constructNormalMessage()
                        var uri = 'data:image/png;base64,' + myJson
                        message.msgType = "image"
                        message.status = "send_succeed"
                        message.isOutgoing = false
                        message.mediaPath = uri
                        // message.content = '翻译结果：' + getResult
                        // message.contentSize = { 'height': 100, 'width': 200 }
                        message.extras = { "extras": "fdfsf" }
                        var user = {
                            userId: "",
                            displayName: "",
                            avatarPath: ""
                        }
                        user.displayName = ""
                        user.avatarPath = "http://cdn.sebastianj1wzyd.xyz/Qs.Picture.view.png"
                        message.fromUser = user
                        AuroraIController.appendMessages([message]);
                        AuroraIController.scrollToBottom(true)
                    })
                    .catch((error) => {
                        console.log(error)
                        var message = constructNormalMessage()
                        message.msgType = "custom"
                        message.status = "send_succeed"
                        message.isOutgoing = false
                        message.content = '哎呀，出错啦'
                        // message.contentSize = { 'height': 100, 'width': 200 }
                        message.extras = { "extras": "fdfsf" }
                        var user = {
                            userId: "",
                            displayName: "",
                            avatarPath: ""
                        }
                        user.displayName = ""
                        user.avatarPath = "http://cdn.sebastianj1wzyd.xyz/Qs.Picture.view.png"
                        message.fromUser = user
                        AuroraIController.appendMessages([message]);
                    })
            });
    }

    onSwitchToMicrophoneMode = () => {
        AuroraIController.scrollToBottom(true)
    }

    onSwitchToEmojiMode = () => {
        AuroraIController.scrollToBottom(true)
    }
    onSwitchToGalleryMode = () => {
        AuroraIController.scrollToBottom(true)
    }

    onSwitchToCameraMode = () => {
        AuroraIController.scrollToBottom(true)
    }

    onShowKeyboard = (keyboard_height) => {
    }

    updateLayout(layout) {
        this.setState({ inputViewLayout: layout })
    }

    onInitPress() {
        console.log('on click init push ');
        this.updateAction();
    }

    onClickSelectAlbum = () => {
        console.log("on click select album")
    }

    onCloseCamera = () => {
        console.log("On close camera event")
        this.setState({
            inputLayoutHeight: 100,
            messageListLayout: { flex: 1, width: window.width, margin: 0 },
            inputViewLayout: { flex: 0, width: window.width, height: 100 },
            navigationBar: { height: 64, justifyContent: 'center' }
        })
    }

    /**
     * Switch to record video mode or not
     */
    switchCameraMode = (isRecordVideoMode) => {
        console.log("Switching camera mode: isRecordVideoMode: " + isRecordVideoMode)
        // If record video mode, then set to full screen.
        if (isRecordVideoMode) {
            this.setState({
                messageListLayout: { flex: 0, width: 0, height: 0 },
                inputViewLayout: { flex: 1, width: window.width, height: window.height },
                navigationBar: { height: 0 }
            })
        }
    }

    render() {
        console.log(this.state.images)
        return (
            <View style={styles.container}>

                <Dialog
                    visible={this.state.visible}
                    dialogTitle={<DialogTitle title="温馨提示" />}
                    footer={
                        <DialogFooter>
                            <DialogButton
                                text="取消"
                                onPress={() => {
                                    this.setState({
                                        visible: false
                                    })
                                    this.props.navigation.navigate('Main')
                                }
                                }
                            />
                            <DialogButton
                                text="确定"
                                onPress={() => {
                                    this.setState({
                                        visible: false
                                    })
                                    this.props.navigation.navigate('NotSuperMembers')
                                }}
                            />
                        </DialogFooter>
                    }
                >
                    <DialogContent>
                        <Text>
                            尊敬的用户，您还没有开通此功能。是否前往充值页面进行充值解锁此功能？
                        </Text>
                    </DialogContent>
                </Dialog>
                <Header
                    statusBarProps={{ barStyle: 'light-content', translucent: true, backgroundColor: 'transparent' }}
                    containerStyle={{ backgroundColor: "black" }}
                    placement="left"
                    backgroundImage={{ uri: 'http://cdn.sebastianj1wzyd.xyz/016%20Deep%20Blue.png' }}
                    // leftComponent={{ icon: 'menu', color: '#fff' }}
                    // centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
                    // rightComponent={{ icon: 'home', color: '#fff' }}
                    leftComponent={<TouchableOpacity style={{ marginRight: 0 }} onPress={() => this.props.navigation.goBack()}>
                        <Icon
                            name='arrow-left'
                            type='evilicon'
                            size={30}
                            color='#ffffff' />
                    </TouchableOpacity>}
                    // centerComponent={<MyCustomCenterComponent />}
                    rightComponent={<TouchableOpacity onPress={() => this.props.navigation.navigate('ChangeLang')}>
                        <Icon
                            name='dots-three-vertical'
                            type='entypo'
                            size={15}
                            color='#ffffff' />
                    </TouchableOpacity>}
                />
                <Modal visible={this.state.slideAnimationDialog} transparent={true}>
                    <Header
                        statusBarProps={{ barStyle: 'light-content', translucent: true, backgroundColor: 'transparent' }}
                        containerStyle={{ backgroundColor: "white" }}
                        placement="left"
                        backgroundImage={{ uri: 'http://cdn.sebastianj1wzyd.xyz/016%20Deep%20Blue.png' }}
                        // leftComponent={{ icon: 'menu', color: '#fff' }}
                        // centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
                        // rightComponent={{ icon: 'home', color: '#fff' }}
                        leftComponent={<TouchableOpacity style={{ marginRight: 0 }} onPress={() => this.setState({ slideAnimationDialog: false })}>
                            <Icon
                                name='arrow-left'
                                type='evilicon'
                                size={30}
                                color='#ffffff' />
                        </TouchableOpacity>}
                    // centerComponent={<MyCustomCenterComponent />}
                    // rightComponent={<TouchableOpacity onPress={() => this.props.navigation.navigate('ChangeLang')}>
                    //     <Icon
                    //         name='dots-three-vertical'
                    //         type='entypo'
                    //         size={15}
                    //         color='#ffffff' />
                    // </TouchableOpacity>}
                    />
                    <ImageViewer imageUrls={this.state.images} backgroundColor="white" saveToLocalByLongPress={false} s />
                </Modal>
                <Dialog
                    onDismiss={() => {
                        this.setState({ slideAnimationDialog: false });
                    }}
                    onTouchOutside={() => {
                        this.setState({ slideAnimationDialog: false });
                    }}
                    visible={this.state.slideAnimationDialog}
                    dialogTitle={<DialogTitle title="翻译结果" />}
                    dialogAnimation={new SlideAnimation({ slideFrom: 'bottom' })}
                >
                    <DialogContent>
                        <Image
                            style={{
                                width: 360,
                                height: 500,
                                resizeMode: 'contain',
                            }}
                            source={{
                                uri: this.state.pic
                            }}
                        />
                    </DialogContent>
                </Dialog>
                <MessageListView style={this.state.messageListLayout}
                    ref="MessageList"
                    isAllowPullToRefresh={true}
                    onAvatarClick={this.onAvatarClick}
                    onMsgClick={this.onMsgClick}
                    onStatusViewClick={this.onStatusViewClick}
                    onTouchMsgList={this.onTouchMsgList}
                    onTapMessageCell={this.onTapMessageCell}
                    onBeginDragMessageList={this.onBeginDragMessageList}
                    onPullToRefresh={this.onPullToRefresh}
                    avatarSize={{ width: 30, height: 30 }}
                    avatarCornerRadius={25}
                    messageListBackgroundColor={"#f3f3f3"}
                    sendBubbleTextSize={15}
                    sendBubbleTextColor={"#000000"}
                    sendBubblePadding={{ left: 10, top: 2, right: 15, bottom: 2 }}
                    receiveBubbleTextSize={15}
                    datePadding={{ left: 5, top: 5, right: 5, bottom: 5 }}
                    dateBackgroundColor={"#F3F3F3"}
                    dateTextColor="#000000"
                    photoMessageRadius={5}
                    maxBubbleWidth={0.7}
                    videoDurationTextColor={"#ffffff"}
                />
                <InputView style={this.state.inputViewLayout}
                    ref="ChatInput"
                    onSendText={this.onSendText}
                    onTakePicture={this.onTakePicture}
                    onStartRecordVoice={this.onStartRecordVoice}
                    onFinishRecordVoice={this.onFinishRecordVoice}
                    onCancelRecordVoice={this.onCancelRecordVoice}
                    onStartRecordVideo={this.onStartRecordVideo}
                    onFinishRecordVideo={this.onFinishRecordVideo}
                    onSendGalleryFiles={this.onSendGalleryFiles}
                    onSwitchToEmojiMode={this.onSwitchToEmojiMode}
                    onSwitchToMicrophoneMode={this.onSwitchToMicrophoneMode}
                    onSwitchToGalleryMode={this.onSwitchToGalleryMode}
                    onSwitchToCameraMode={this.onSwitchToCameraMode}
                    onShowKeyboard={this.onShowKeyboard}
                    onTouchEditText={this.onTouchEditText}
                    onFullScreen={this.onFullScreen}
                    onRecoverScreen={this.onRecoverScreen}
                    onSizeChange={this.onInputViewSizeChange}
                    closeCamera={this.onCloseCamera}
                    switchCameraMode={this.switchCameraMode}
                    showSelectAlbumBtn={true}
                    showRecordVideoBtn={false}
                    onClickSelectAlbum={this.onClickSelectAlbum}
                    inputPadding={{ left: 8, top: 0, right: 8, bottom: 0 }}
                    inputTextSize={15}
                    galleryScale={0.5}//default = 0.5
                    compressionQuality={0.6}
                    cameraQuality={0.5}//default = 0.5
                    customLayoutItems={{
                        left: [''],
                        right: ['send'],
                        bottom: ['gallery', 'camera']
                    }}
                />
                {/* <ActionButton buttonColor="#e85a71" size={30} offsetX={5} offsetY={5} verticalOrientation="down" >
                    <ActionButton.Item buttonColor='#fc9d9a' title="主页" onPress={() => this.props.navigation.goBack()}>
                        <Icon name="ios-home" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#f9cdad' title="语种选择" onPress={() => this.props.navigation.navigate('ChangeLang')}>
                        <Icon name="ios-brush" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#c8c8a9' title="专家翻译" onPress={() => this.props.navigation.navigate('MasterPage')}>
                        <Icon name="md-contacts" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                </ActionButton> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    sendCustomBtn: {

    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    inputView: {
        backgroundColor: 'green',
        width: window.width,
        height: 100,
    },
    btnStyle: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#3e83d7',
        borderRadius: 8,
        backgroundColor: '#3e83d7'
    },
    icon: {
        width: 26,
        height: 26,
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white'
    }
});



