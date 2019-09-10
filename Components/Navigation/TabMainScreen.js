import React from 'react';
import {
    AppRegistry,
    Text,
    View,
    Button,
    StyleSheet,
    Image,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    Platform,
    TextInput,
    AsyncStorage
} from 'react-native';
import SecondScreen from "./SecondScreen";
import Camera from "../CameraPage/Camera"
import Trans from "../TransPage/Trans"
import GPS from "../GPSPage/GPS"
import { createBottomTabNavigator, createAppContainer, DrawerActions } from "react-navigation";
let { width: winWidth, height: winHeight, scale: winScale } = Dimensions.get('window');
let WH = winHeight / 2295;
let WW = winWidth / 1243;
import { SearchBar, Header, Icon } from 'react-native-elements';
import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';
import Main from "../MainPage/Main"
import Icon1 from 'react-native-vector-icons/Ionicons';
let list = []
let imgs = ['http://cdn.sebastianj1wzyd.xyz/nothing.png', 'http://cdn.sebastianj1wzyd.xyz/nothing.png', 'http://cdn.sebastianj1wzyd.xyz/nothing.png', 'http://cdn.sebastianj1wzyd.xyz/nothing.png', 'http://cdn.sebastianj1wzyd.xyz/nothing.png', 'http://cdn.sebastianj1wzyd.xyz/nothing.png', 'http://cdn.sebastianj1wzyd.xyz/nothing.png', 'http://cdn.sebastianj1wzyd.xyz/nothing.png']
let names = ['', '', '', '', '', '', '', '']
let intros = ['', '', '', '', '', '', '', '']

class TabMainScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            vip: '',
            search: '',
            imgs: ['http://cdn.sebastianj1wzyd.xyz/nothing.png', 'http://cdn.sebastianj1wzyd.xyz/nothing.png', 'http://cdn.sebastianj1wzyd.xyz/nothing.png', 'http://cdn.sebastianj1wzyd.xyz/nothing.png', 'http://cdn.sebastianj1wzyd.xyz/nothing.png', 'http://cdn.sebastianj1wzyd.xyz/nothing.png', 'http://cdn.sebastianj1wzyd.xyz/nothing.png', 'http://cdn.sebastianj1wzyd.xyz/nothing.png']
        };
        this.getVip()
        this.getRec()

    }

    async getVip() {
        const vip = await AsyncStorage.getItem('vip')
        this.setState({
            vip: vip
        })
    }

    async getRec() {
        const id = await AsyncStorage.getItem('id')
        let url = 'http://202.120.40.8:30454/users/behavior/getinterest?id=' + id;
        return fetch(url, {
            method: 'GET',
            // headers: headers,
        })
            .then(response => {
                console.log("获得推荐")
                console.log(response)
                return response.json()

            })
            .then(jsons => {
                console.log(jsons)
                list = jsons
                console.log("list")
                console.log(list[0])
                for (var i = 0; i < 8; i++) {
                    this.getPic(i)
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    async getPic(i) {
        let url1 = 'http://202.120.40.8:30454/users/behavior/getimg?id=' + list[i]
        let url2 = 'http://202.120.40.8:30454/users/behavior/getscene?id=' + list[i]

        fetch(url1, {
            method: 'GET',
            // headers: headers,
        })
            .then(response => {
                if (response.ok) {
                    console.log("获得图片")
                    console.log(response)
                    return response.json()
                }
                else {
                    console.log("没有图片")
                    imgs[i] = 'http://cdn.sebastianj1wzyd.xyz/nothing.png'
                    this.setState({
                        imgs: imgs
                    })
                }

            })
            .then(jsons => {
                console.log("i")
                console.log(i)
                console.log(jsons)
                console.log(jsons.url)
                imgs[i] = jsons.url
                this.setState({
                    imgs: imgs
                })

                fetch(url2, {
                    method: 'GET',
                    // headers: headers,
                })
                    .then(response => {

                        console.log("获得详情")
                        console.log(response)
                        return response.json()

                    })
                    .then(jsons => {
                        console.log(jsons.attract)
                        names[i] = jsons.attract
                        // names[i] = jsons.attract
                        // intros[i] = json.over
                    })
                    .catch((error) => {
                        console.log(error)
                    })
                // names[i] = jsons.attract
                // intros[i] = json.over
            })
            .catch((error) => {
                console.log(error)
            })
    }

    updateSearch = search => {
        this.setState({ search });
    };

    static navigationOptions = {
        tabBarLabel: '主页',
        headerTitle: 'Main',
        tabBarVisible: false,
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('../Assets/MainPage/home-icon.png')}
                style={[styles.icon, { tintColor: tintColor }]}
            />
        ),

    };

    render() {
        console.log("景点")
        console.log(names)
        console.log(imgs)
        const { search } = this.state;
        console.log("vip")
        console.log(this.state.vip)
        let photo
        if (this.state.vip == 0) {
            photo = <TimerPhoto1></TimerPhoto1>
        }
        else {
            photo = <TimerPhoto></TimerPhoto>
        }

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
                    leftComponent={<TouchableOpacity style={{ marginRight: 0 }} onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}>
                        <Icon
                            name='menu'
                            color='#ffffff' />
                    </TouchableOpacity>}
                    // centerComponent={<MyCustomCenterComponent />}
                    rightComponent={<TouchableOpacity onPress={() => this.props.navigation.navigate('GPS')}>
                        <Icon
                            name='location'
                            type='evilicon'
                            size={30}
                            color='#ffffff' />
                    </TouchableOpacity>}
                />
                <ScrollableTabView
                    initialPage={0}
                    renderTabBar={() => <ScrollableTabBar />}
                >
                    <View tabLabel="主页">
                        <ScrollView
                            directionalLockEnabled={true}
                            showsVerticalScrollIndicator={false}
                            bounces={false}>
                            {/* <TimerPhoto></TimerPhoto> */}
                            {photo}
                            <View style={{ width: winHeight, backgroundColor: 'rgba(255,255,255,1)', marginTop: 5 }}>

                                <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Harbin')}>
                                        <Image source={{ uri: 'http://cdn.sebastianj1wzyd.xyz/5.png' }} style={{ width: 170, height: 100, marginLeft: 5, marginRight: 5 }} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('HongKong')}>
                                        <Image source={{ uri: 'http://cdn.sebastianj1wzyd.xyz/6.png' }} style={{ width: 170, height: 100, marginLeft: 5, marginRight: 5 }} />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Chengdu')}>
                                        <Image source={{ uri: 'http://cdn.sebastianj1wzyd.xyz/7.png' }} style={{ width: 170, height: 100, marginLeft: 5, marginRight: 5 }} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Macao')}>
                                        <Image source={{ uri: 'http://cdn.sebastianj1wzyd.xyz/8.png' }} style={{ width: 170, height: 100, marginLeft: 5, marginRight: 5 }} />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Nanjing')}>
                                        <Image source={{ uri: 'http://cdn.sebastianj1wzyd.xyz/9.png' }} style={{ width: 170, height: 100, marginLeft: 5, marginRight: 5 }} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Suzhou')}>
                                        <Image source={{ uri: 'http://cdn.sebastianj1wzyd.xyz/10.png' }} style={{ width: 170, height: 100, marginLeft: 5, marginRight: 5 }} />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Tokyo')}>
                                        <Image source={{ uri: 'http://cdn.sebastianj1wzyd.xyz/11.png' }} style={{ width: 170, height: 100, marginLeft: 5, marginRight: 5 }} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('LosAngeles')}>
                                        <Image source={{ uri: 'http://cdn.sebastianj1wzyd.xyz/12.png' }} style={{ width: 170, height: 100, marginLeft: 5, marginRight: 5 }} />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Paris')}>
                                        <Image source={{ uri: 'http://cdn.sebastianj1wzyd.xyz/13.png' }} style={{ width: 170, height: 100, marginLeft: 5, marginRight: 5 }} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('London')}>
                                        <Image source={{ uri: 'http://cdn.sebastianj1wzyd.xyz/14.png' }} style={{ width: 170, height: 100, marginLeft: 5, marginRight: 5 }} />
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </ScrollView>
                    </View>
                    <View tabLabel="为您推荐">
                        <ScrollView
                            directionalLockEnabled={true}
                            showsVerticalScrollIndicator={false}
                            bounces={false}>
                            {/* <TimerPhoto></TimerPhoto> */}
                            {/* {photo} */}
                            <View style={{ width: winHeight, backgroundColor: 'rgba(255,255,255,1)', marginTop: 5 }}>

                                <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Detail', {
                                        id: list[0],
                                    })}>
                                        <Image source={{ uri: this.state.imgs[0] }} style={{ width: 170, height: 100, marginLeft: 5, marginRight: 5 }} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Detail', {
                                        id: list[1],
                                    })}>
                                        <Image source={{ uri: this.state.imgs[1] }} style={{ width: 170, height: 100, marginLeft: 5, marginRight: 5 }} />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Detail', {
                                        id: list[2],
                                    })}>
                                        <Image source={{ uri: this.state.imgs[2] }} style={{ width: 170, height: 100, marginLeft: 5, marginRight: 5 }} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Detail', {
                                        id: list[3],
                                    })}>
                                        <Image source={{ uri: this.state.imgs[3] }} style={{ width: 170, height: 100, marginLeft: 5, marginRight: 5 }} />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Detail', {
                                        id: list[4],
                                    })}>
                                        <Image source={{ uri: this.state.imgs[4] }} style={{ width: 170, height: 100, marginLeft: 5, marginRight: 5 }} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Detail', {
                                        id: list[5],
                                    })}>
                                        <Image source={{ uri: this.state.imgs[5] }} style={{ width: 170, height: 100, marginLeft: 5, marginRight: 5 }} />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Detail', {
                                        id: list[6],
                                    })}>
                                        <Image source={{ uri: this.state.imgs[6] }} style={{ width: 170, height: 100, marginLeft: 5, marginRight: 5 }} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Detail', {
                                        id: list[7],
                                    })}>
                                        <Image source={{ uri: this.state.imgs[7] }} style={{ width: 170, height: 100, marginLeft: 5, marginRight: 5 }} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </ScrollableTabView>
            </View>

            //     <View style={{ width: winHeight, backgroundColor: 'rgba(255,255,255,1)' }}>
            //         <TimerPhoto />
            //         <ScrollView
            //             directionalLockEnabled={true}
            //             showsVerticalScrollIndicator={false}
            //             bounces={false}>
            //             <View style={{ width: winWidth, flexDirection: 'row', flexWrap: 'wrap' }}>
            //                 <TouchableOpacity
            //                     activeOpacity={0.8}
            //                     onPress={() => { this.pushToDetail() }} >
            //                     <View style={styles.innerListView}>
            //                         <Image source={{ uri: 'https://images.pexels.com/photos/1457691/pexels-photo-1457691.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' }} style={{ width: WW * 584, height: WH * 288 }} resizeMode="contain" />
            //                     </View>
            //                 </TouchableOpacity>
            //                 <TouchableOpacity
            //                     activeOpacity={0.8}
            //                     onPress={() => { this.pushToDetail() }} >
            //                     <View style={styles.innerListView}>
            //                         <Image source={{ uri: 'https://images.pexels.com/photos/408503/pexels-photo-408503.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' }} style={{ width: WW * 584, height: WH * 288 }} resizeMode="contain" />
            //                     </View>
            //                 </TouchableOpacity>
            //                 <TouchableOpacity
            //                     activeOpacity={0.8}
            //                     onPress={() => { this.pushToDetail() }} >
            //                     <View style={styles.innerListView}>
            //                         <Image source={{ uri: 'https://images.pexels.com/photos/163185/old-retro-antique-vintage-163185.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' }} style={{ width: WW * 584, height: WH * 288 }} resizeMode="contain" />
            //                     </View>
            //                 </TouchableOpacity>
            //                 <TouchableOpacity
            //                     activeOpacity={0.8}
            //                     onPress={() => { this.pushToDetail() }} >
            //                     <View style={styles.innerListView}>
            //                         <Image source={{ uri: 'https://images.pexels.com/photos/614484/pexels-photo-614484.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500' }} style={{ width: WW * 584, height: WH * 288 }} resizeMode="contain" />
            //                     </View>
            //                 </TouchableOpacity>

            //             </View>
            //         </ScrollView>
            //     </View>
            // </View>

        );
    }

    pushToDetail() {

    }
}

// class MyCustomLeftComponent extends React.Component {

//     render() {

//         return (
//             <TouchableOpacity style={{ marginRight: 0 }} onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}>
//                 <Icon
//                     name='menu'
//                     color='#ffffff' />
//             </TouchableOpacity>
//         )
//     }
// }
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
                <Image source={{ uri: 'http://cdn.sebastianj1wzyd.xyz/4.png' }} style={{ width: winWidth, height: WH * 584 }} />
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

class TimerPhoto1 extends React.Component {
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
                <Image source={{ uri: 'http://cdn.sebastianj1wzyd.xyz/5d173e825eabf.jpg' }} style={{ width: winWidth, height: WH * 584 }} />
                <Image source={{ uri: 'http://cdn.sebastianj1wzyd.xyz/20141009122608_92648.jpg' }} style={{ width: winWidth, height: WH * 584 }} />
                <Image source={{ uri: 'http://cdn.sebastianj1wzyd.xyz/about-1.jpg' }} style={{ width: winWidth, height: WH * 584 }} />
                <Image source={{ uri: 'http://cdn.sebastianj1wzyd.xyz/132035zo7lod23xujqm7v9.png' }} style={{ width: winWidth, height: WH * 584 }} />
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

class MyCustomCenterComponent extends React.Component {
    state = {
        search: '',
    };

    updateSearch = search => {
        this.setState({ search });
    };

    render() {
        const { search } = this.state;

        return (
            <SearchBar
                platform="android"
                lightTheme="true"
                containerStyle={{ backgroundColor: "transparent" }}
                placeholder="点击输入"
                onChangeText={this.updateSearch}
                value={search}
                placeholderTextColor="#ffffff"
                inputStyle={styles.inputStyle}

            />
        );
    }
}

class MyCustomRightComponent extends React.Component {
    render() {
        return (
            <TouchableOpacity>
                <Icon
                    name='user'
                    type='evilicon'
                    size={30}
                    color='#ffffff' />
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container1: {
        marginTop: 30,
    },
    icon1: {
        width: 300,
        height: 300,
        alignSelf: 'center',
    },
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
    inputStyle: {
        fontSize: 15,
        color: '#ffffff',
        marginLeft: 8,
        marginRight: 0,
    },
    icon: {
        width: 26,
        height: 26,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,1)',
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
        marginTop: WH * 15,
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
    },
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

const TabMainScreenNavigator = createBottomTabNavigator(
    {
        Main: { screen: TabMainScreen },
        // Trans: { screen: Trans },
        // Camera: { screen: Camera },
        // GPS: { screen: GPS },
        // Second: { screen: SecondScreen },

    },
    {
        tabBarPosition: 'bottom',
        animationEnabled: true,
        tabBarOptions: {
            activeTintColor: '#e91e63',
            showIcon: 'true',
            indicatorStyle: { height: 0 },
        },
    }
);

export default createAppContainer(TabMainScreenNavigator);