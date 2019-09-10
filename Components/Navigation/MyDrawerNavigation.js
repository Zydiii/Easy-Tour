import React from 'react';
import {
    AppRegistry,
    Text,
    View,
    Button,
    StyleSheet,
    Image,
} from 'react-native';
import TabMainScreen from "./TabMainScreen";
import DrawerSecondScreen from "./DrawerSecondScreen";
import MyStackNavigation from "./MyStackNavigation";
import UserPage from "../MinePage/Mine"
import Camera from "../CameraPage/Camera"
import { Avatar } from 'react-native-elements';
import Trans from '../TransPage/Trans'
import GPS from '../GPSPage/GPS'
import MasterPage from '../TransPage/MasterPage'

import { createDrawerNavigator, createAppContainer } from "react-navigation";

const MyDrawerNavigation = createDrawerNavigator(
    {
        UserPage: {
            screen: UserPage,
            navigationOptions: {
                drawerLabel: '        个人中心',
                drawerIcon: ({ tintColor }) => (
                    <Avatar
                        rounded
                        source={{
                            uri:
                                'http://cdn.sebastianj1wzyd.xyz/IMG_7948.JPG',
                        }}
                        size="large"
                        activeOpacity={0.7}
                        containerStyle={{ flex: 2, marginLeft: 30, marginTop:30, marginBottom: 20 }}
                    />
                ),
            },
        },
        Home: {
            screen: MyStackNavigation,
            navigationOptions: {
                drawerLabel: '主页',
                drawerIcon: ({ tintColor }) => (
                    <Image
                        source={require('../Assets/MainPage/home-icon.png')}
                        style={{tintColor: tintColor, width: 24, height: 24,}}
                    />
                ),
            },
        },
        Trans: {
            screen: Trans,
            navigationOptions: {
                drawerLabel: '机器翻译',
                drawerIcon: ({ tintColor }) => (
                    <Image
                        source={require('../Assets/TransPage/trans_icon.png')}
                        style={ {tintColor: tintColor, width: 24, height: 24,}}
                    />
                ),
            },
        },
        MasterPage: {
            screen: MasterPage,
            navigationOptions: {
                drawerLabel: '专家翻译',
                drawerIcon: ({ tintColor }) => (
                    <Image
                        source={require('../Assets/TransPage/master.png')}
                        style={ {tintColor: tintColor, width: 30, height: 30}}
                    />
                ),
            },
        },
        Camera: {
            screen: Camera,
            navigationOptions: {
                drawerLabel: '景点识别',
                drawerIcon: ({ tintColor }) => (
                    <Image
                        source={require('../Assets/CameraPage/camera_unpress.png')}
                        style={{ tintColor: tintColor, width: 23, height: 23, }}
                    />
                ),
            },
        },
        
        // GPS: {
        //     screen: GPS,
        //     navigationOptions: {
        //         drawerLabel: '定位服务',
        //         drawerIcon: ({ tintColor }) => (
        //             <Image
        //                 source={require('../Assets/GPSPage/GPS_unpress.png')}
        //                 style={ {tintColor: tintColor, width: 28, height: 28,}}
        //             />
        //         ),
        //     },
        // },
        // Drawer: {
        //     screen: DrawerSecondScreen,
        //     navigationOptions: {
        //         drawerLabel: 'DrawerSecond',
        //         drawerIcon: ({ tintColor }) => (
        //             <Image
        //                 source={require('../../images/face_unpress.png')}
        //                 style={ {tintColor: tintColor, width: 24, height: 24,}}
        //             />
        //         ),
        //     },
        // },
        
        

    },
    {
        initialRouteName: 'Home',
    }
);
export default createAppContainer(MyDrawerNavigation);



