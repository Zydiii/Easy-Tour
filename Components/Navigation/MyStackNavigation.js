import React, { Component } from 'react';
import {
    AppRegistry,
    Button,
    TouchableOpacity,
    Image
} from 'react-native';
import { createStackNavigator, createAppContainer, DrawerActions } from 'react-navigation';
import ThirdScreen from "./ThirdScreen";
import TabMainScreen from "./TabMainScreen";
import MainPage from "../MainPage/Main"
import Camera from "../CameraPage/Camera"
import DetailScreen from "../CameraPage/DetailScreen"
import NothingScreen from "../CameraPage/NothingScreen"
import UserPage from "../MinePage/Mine"
import Trans from "../TransPage/Trans"
import ChangeLang from "../TransPage/ChangeLang"
import GPS from "../GPSPage/GPS"
import MasterPage from "../TransPage/MasterPage"
import Shop from "../GPSPage/Shop"
import Food from "../GPSPage/Food"
import Hotel from "../GPSPage/Hotel"
import Settings from "../MinePage/DetaisScreen"
import About from "../MinePage/About"
import Route from "../MinePage/Route"
import WalletScreen from "../MinePage/WalletScreen"
import NotSupperMembers from "../MinePage/NotSupperMembers"
import SuperMenmbers from "../MinePage/SuperMembers"
import Room from "../MinePage/Room"
import Chengdu from "../Travels/Chengdu"
import HongKong from "../Travels/HongKong"
import London from "../Travels/London"
import LosAngeles from "../Travels/LosAngeles"
import Macao from "../Travels/Macao"
import Nanjing from "../Travels/Nanjing"
import Paris from "../Travels/Paris"
import Suzhou from "../Travels/Suzhou"
import Tokyo from "../Travels/Tokyo"
import Harbin from "../Travels/Harbin"
import Master from "../TransPage/Master"
import TravelNoteEdit from "../MinePage/NoteEdit"
import TravelNoteDetail1 from "../MinePage/NoteDetail"
import ProDetails from "../MinePage/ProDetails"
import ChangePass from "../MinePage/ChangePass"
import Details from "../MinePage/DetaisScreen"
import TravelNoteDetail from "../MinePage/TravelNoteDetail"
import Detail from "../MainPage/Detail"

const MyStackNavigation = createStackNavigator({
    Main: {
        screen: TabMainScreen,
        navigationOptions: ({ navigation }) => ({
            header: null
        }),
    },
    Third: {
        screen: ThirdScreen,
        navigationOptions: ({ navigation }) => ({
            headerTitleStyle: {
                alignSelf: 'center',
            },
            headerLeft: (
                <Button
                    title='Menu'
                    onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                />
            ),
        }),
    },

    Trans: {
        screen: Trans,
        navigationOptions: ({ navigation }) => ({
            headerTitleStyle: {
                alignSelf: 'center',
            },
            header: null,
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        source={require('../Assets/NavigationPage/back_icon.png')}
                        style={{ width: 30, height: 30 }}
                    />
                </TouchableOpacity>
            ),
        }),
    },

    Camera: {
        screen: Camera,
        navigationOptions: ({ navigation }) => ({
            headerTitleStyle: {
                alignSelf: 'center',
            },
            header: null,
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        source={require('../Assets/NavigationPage/back_icon.png')}
                        style={{ width: 30, height: 30 }}
                    />
                </TouchableOpacity>
            ),
        }),
    },

    Detail: {
        screen: Detail,
        navigationOptions: ({ navigation }) => ({
            headerTitleStyle: {
                alignSelf: 'center',
            },
            header: null,
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        source={require('../Assets/NavigationPage/back_icon.png')}
                        style={{ width: 30, height: 30 }}
                    />
                </TouchableOpacity>
            ),
        }),
    },


    Chengdu: {
        screen: Chengdu,
        navigationOptions: ({ navigation }) => ({
            headerTitleStyle: {
                alignSelf: 'center',
            },
            header: null,
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        source={require('../Assets/NavigationPage/back_icon.png')}
                        style={{ width: 30, height: 30 }}
                    />
                </TouchableOpacity>
            ),
        }),
    },

    Harbin: {
        screen: Harbin,
        navigationOptions: ({ navigation }) => ({
            headerTitleStyle: {
                alignSelf: 'center',
            },
            header: null,
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        source={require('../Assets/NavigationPage/back_icon.png')}
                        style={{ width: 30, height: 30 }}
                    />
                </TouchableOpacity>
            ),
        }),
    },

    HongKong: {
        screen: HongKong,
        navigationOptions: ({ navigation }) => ({
            headerTitleStyle: {
                alignSelf: 'center',
            },
            header: null,
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        source={require('../Assets/NavigationPage/back_icon.png')}
                        style={{ width: 30, height: 30 }}
                    />
                </TouchableOpacity>
            ),
        }),
    },

    London: {
        screen: London,
        navigationOptions: ({ navigation }) => ({
            headerTitleStyle: {
                alignSelf: 'center',
            },
            header: null,
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        source={require('../Assets/NavigationPage/back_icon.png')}
                        style={{ width: 30, height: 30 }}
                    />
                </TouchableOpacity>
            ),
        }),
    },

    LosAngeles: {
        screen: LosAngeles,
        navigationOptions: ({ navigation }) => ({
            headerTitleStyle: {
                alignSelf: 'center',
            },
            header: null,
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        source={require('../Assets/NavigationPage/back_icon.png')}
                        style={{ width: 30, height: 30 }}
                    />
                </TouchableOpacity>
            ),
        }),
    },

    Macao: {
        screen: Macao,
        navigationOptions: ({ navigation }) => ({
            headerTitleStyle: {
                alignSelf: 'center',
            },
            header: null,
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        source={require('../Assets/NavigationPage/back_icon.png')}
                        style={{ width: 30, height: 30 }}
                    />
                </TouchableOpacity>
            ),
        }),
    },

    Nanjing: {
        screen: Nanjing,
        navigationOptions: ({ navigation }) => ({
            headerTitleStyle: {
                alignSelf: 'center',
            },
            header: null,
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        source={require('../Assets/NavigationPage/back_icon.png')}
                        style={{ width: 30, height: 30 }}
                    />
                </TouchableOpacity>
            ),
        }),
    },

    Paris: {
        screen: Paris,
        navigationOptions: ({ navigation }) => ({
            headerTitleStyle: {
                alignSelf: 'center',
            },
            header: null,
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        source={require('../Assets/NavigationPage/back_icon.png')}
                        style={{ width: 30, height: 30 }}
                    />
                </TouchableOpacity>
            ),
        }),
    },

    Suzhou: {
        screen: Suzhou,
        navigationOptions: ({ navigation }) => ({
            headerTitleStyle: {
                alignSelf: 'center',
            },
            header: null,
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        source={require('../Assets/NavigationPage/back_icon.png')}
                        style={{ width: 30, height: 30 }}
                    />
                </TouchableOpacity>
            ),
        }),
    },

    Tokyo: {
        screen: Tokyo,
        navigationOptions: ({ navigation }) => ({
            headerTitleStyle: {
                alignSelf: 'center',
            },
            header: null,
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        source={require('../Assets/NavigationPage/back_icon.png')}
                        style={{ width: 30, height: 30 }}
                    />
                </TouchableOpacity>
            ),
        }),
    },

    DetailScreen: {
        screen: DetailScreen,
        navigationOptions: ({ navigation }) => ({
            headerTitleStyle: {
                alignSelf: 'center',
            },
            header: null,
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        source={require('../Assets/NavigationPage/back_icon.png')}
                        style={{ width: 30, height: 30 }}
                    />
                </TouchableOpacity>
            ),
        }),
    },

    TravelNoteEdit: {
        screen: TravelNoteEdit,
        navigationOptions: ({ navigation }) => ({
            headerTitleStyle: {
                alignSelf: 'center',
            },
            header: null,
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        source={require('../Assets/NavigationPage/back_icon.png')}
                        style={{ width: 30, height: 30 }}
                    />
                </TouchableOpacity>
            ),
        }),
    },

    TravelNoteDetail1: {
        screen: TravelNoteDetail1,
        navigationOptions: ({ navigation }) => ({
            headerTitleStyle: {
                alignSelf: 'center',
            },
            header: null,
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        source={require('../Assets/NavigationPage/back_icon.png')}
                        style={{ width: 30, height: 30 }}
                    />
                </TouchableOpacity>
            ),
        }),
    },

    ProDetails: {
        screen: ProDetails,
        navigationOptions: ({ navigation }) => ({
            headerTitleStyle: {
                alignSelf: 'center',
            },
            header: null,
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        source={require('../Assets/NavigationPage/back_icon.png')}
                        style={{ width: 30, height: 30 }}
                    />
                </TouchableOpacity>
            ),
        }),
    },


    Settings: {
        screen: Settings,
        navigationOptions: ({ navigation }) => ({
            headerTitleStyle: {
                alignSelf: 'center',
            },
            header: null,
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        source={require('../Assets/NavigationPage/back_icon.png')}
                        style={{ width: 30, height: 30 }}
                    />
                </TouchableOpacity>
            ),
        }),
    },

    GPS: {
        screen: GPS,
        navigationOptions: ({ navigation }) => ({
            headerTitleStyle: {
                alignSelf: 'center',
            },
            header: null,
            title: '定位服务',
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        source={require('../Assets/NavigationPage/back_icon.png')}
                        style={{ width: 30, height: 30 }}
                    />
                </TouchableOpacity>
            ),
        }),
    },

    Route: {
        screen: Route,
        navigationOptions: ({ navigation }) => ({
            headerTitleStyle: {
                alignSelf: 'center',
            },
            header: null,
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.goBack('UserPage')}>
                    <Image
                        source={require('../Assets/NavigationPage/back_icon.png')}
                        style={{ width: 30, height: 30 }}
                    />
                </TouchableOpacity>
            ),
        }),
    },

    ChangePass: {
        screen: ChangePass,
        navigationOptions: ({ navigation }) => ({
            headerTitleStyle: {
                alignSelf: 'center',
            },
            header: null,
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.goBack('UserPage')}>
                    <Image
                        source={require('../Assets/NavigationPage/back_icon.png')}
                        style={{ width: 30, height: 30 }}
                    />
                </TouchableOpacity>
            ),
        }),
    },

    Room: {
        screen: Room,
        navigationOptions: ({ navigation }) => ({
            headerTitleStyle: {
                alignSelf: 'center',
            },
            header: null,
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        source={require('../Assets/NavigationPage/back_icon.png')}
                        style={{ width: 30, height: 30 }}
                    />
                </TouchableOpacity>
            ),
        }),
    },

    TravelNoteDetail: {
        screen: TravelNoteDetail,
        navigationOptions: ({ navigation }) => ({
            headerTitleStyle: {
                alignSelf: 'center',
            },
            header: null,
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        source={require('../Assets/NavigationPage/back_icon.png')}
                        style={{ width: 30, height: 30 }}
                    />
                </TouchableOpacity>
            ),
        }),
    },

    Details: {
        screen: Details,
        navigationOptions: ({ navigation }) => ({
            headerTitleStyle: {
                alignSelf: 'center',
            },
            header: null,
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        source={require('../Assets/NavigationPage/back_icon.png')}
                        style={{ width: 30, height: 30 }}
                    />
                </TouchableOpacity>
            ),
        }),
    },

    SuperMembers: {
        screen: SuperMenmbers,
        navigationOptions: ({ navigation }) => ({
            headerTitleStyle: {
                alignSelf: 'center',
            },
            header: null,
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        source={require('../Assets/NavigationPage/back_icon.png')}
                        style={{ width: 30, height: 30 }}
                    />
                </TouchableOpacity>
            ),
        }),
    },

    NotSuperMembers: {
        screen: NotSupperMembers,
        navigationOptions: ({ navigation }) => ({
            headerTitleStyle: {
                alignSelf: 'center',
            },
            header: null,
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        source={require('../Assets/NavigationPage/back_icon.png')}
                        style={{ width: 30, height: 30 }}
                    />
                </TouchableOpacity>
            ),
        }),
    },

    Wallet: {
        screen: WalletScreen,
        navigationOptions: ({ navigation }) => ({
            headerTitleStyle: {
                alignSelf: 'center',
            },
            header: null,
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        source={require('../Assets/NavigationPage/back_icon.png')}
                        style={{ width: 30, height: 30 }}
                    />
                </TouchableOpacity>
            ),
        }),
    },


    About: {
        screen: About,
        navigationOptions: ({ navigation }) => ({
            headerTitleStyle: {
                alignSelf: 'center',
            },
            header: null,
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        source={require('../Assets/NavigationPage/back_icon.png')}
                        style={{ width: 30, height: 30 }}
                    />
                </TouchableOpacity>
            ),
        }),
    },

    UserPage: {
        screen: UserPage,
        navigationOptions: ({ navigation }) => ({
            headerTitleStyle: {
                alignSelf: 'center',
            },
            header: null,
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        source={require('../Assets/NavigationPage/back_icon.png')}
                        style={{ width: 30, height: 30 }}
                    />
                </TouchableOpacity>
            ),
        }),
    },

    NothingScreen: {
        screen: NothingScreen,
        navigationOptions: ({ navigation }) => ({
            headerTitleStyle: {
                alignSelf: 'center',
            },
            header: null,
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        source={require('../Assets/NavigationPage/back_icon.png')}
                        style={{ width: 30, height: 30 }}
                    />
                </TouchableOpacity>
            ),
        }),
    },

    ChangeLang: {
        screen: ChangeLang,
        navigationOptions: ({ navigation }) => ({
            headerTitleStyle: {
                alignSelf: 'center',
            },
            title: '语种选择',
            header: null,
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        source={require('../Assets/NavigationPage/back_icon.png')}
                        style={{ width: 30, height: 30 }}
                    />
                </TouchableOpacity>
            ),
        }),
    },

    Master: {
        screen: Master,
        navigationOptions: ({ navigation }) => ({
            headerTitleStyle: {
                alignSelf: 'center',
            },
            title: '专家翻译',
            header: null,
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        source={require('../Assets/NavigationPage/back_icon.png')}
                        style={{ width: 30, height: 30 }}
                    />
                </TouchableOpacity>
            ),
        }),
    },

    MasterPage: {
        screen: MasterPage,
        navigationOptions: ({ navigation }) => ({
            headerTitleStyle: {
                alignSelf: 'center',
            },
            title: '专家翻译',
            header: null,
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        source={require('../Assets/NavigationPage/back_icon.png')}
                        style={{ width: 30, height: 30 }}
                    />
                </TouchableOpacity>
            ),
        }),
    },

    ShopPage: {
        screen: Shop,
        navigationOptions: ({ navigation }) => ({
            headerTitleStyle: {
                alignSelf: 'center',
            },
            title: '购物中心',
            header: null,
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        source={require('../Assets/NavigationPage/back_icon.png')}
                        style={{ width: 30, height: 30 }}
                    />
                </TouchableOpacity>
            ),
        }),
    },

    HotelPage: {
        screen: Hotel,
        navigationOptions: ({ navigation }) => ({
            headerTitleStyle: {
                alignSelf: 'center',
            },
            title: '附近酒店',
            header: null,
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        source={require('../Assets/NavigationPage/back_icon.png')}
                        style={{ width: 30, height: 30 }}
                    />
                </TouchableOpacity>
            ),
        }),
    },

    FoodPage: {
        screen: Food,
        navigationOptions: ({ navigation }) => ({
            headerTitleStyle: {
                alignSelf: 'center',
            },
            title: '周边美食',
            header: null,
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        source={require('../Assets/NavigationPage/back_icon.png')}
                        style={{ width: 30, height: 30 }}
                    />
                </TouchableOpacity>
            ),
        }),
    },


});
export default createAppContainer(MyStackNavigation);