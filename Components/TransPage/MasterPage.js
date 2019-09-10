import React, { Component } from "react";
import { StyleSheet, View, Text, Image, AsyncStorage, TouchableOpacity } from "react-native";
import { ButtonGroup, ListItem, Header, Icon, Button, Avatar } from "react-native-elements"
import Dialog, {
    DialogTitle,
    DialogContent,
    DialogFooter,
    DialogButton,
    SlideAnimation,
    ScaleAnimation,
} from 'react-native-popup-dialog';

export default class MasterTrans extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visibleL: false,
            canStart: false,
            visibleK: false
        }
        // this.getName()
        this.checkValid() //1, 检查最后一个订单状态
    }

    checkValid = async () => {
        var id = await AsyncStorage.getItem('id')
        let url = 'http://202.120.40.8:30454/translate/translator/seeall/' + id;


        return fetch(url, {
            method: 'GET',
            // headers: headers,
        })
            .then(response => {
                console.log("检查最后一个订单的状态")
                // console.log(response)
                return response.json()

            })
            .then(jsons => {
                console.log(jsons)
                var length = jsons.length
                // console.log(length)


                if (length === 0) {
                    console.log("没有任何订单")
                    this.setState({
                        visibleL: false
                    })
                    return 1
                }
                else {
                    console.log('最后订单json')
                    console.log(jsons[length - 1])
                    console.log('最后订单valid状态' + jsons[length - 1].valid)
                    if (jsons[length - 1].valid === true) {
                        console.log("还没有被接单")
                        this.setState({
                            visibleL: true
                        })
                        return 0
                    }
                    else {
                        console.log("无未被接单订单")
                        if (jsons[length - 1].rating === 0.0) {
                            console.log("已经接单但是没有评价")
                            //直接跳转到聊天
                            //此处应当设定masterid
                            this.getNameImm(jsons[length - 1].translatorId).then(masterName => {
                                if (masterName != '') {
                                    console.log('获得masterName:' + masterName)
                                    AsyncStorage.setItem('masterName', masterName.toString()).then(() => {
                                        AsyncStorage.setItem("tipId", jsons[length - 1].id.toString()).then(() => {
                                            this.props.navigation.navigate("Master")

                                        })
                                    })
                                } else {
                                    console.log("出错了，masterName是空的")
                                }
                                return 1
                            })
                        }
                        else {
                            console.log("已经接单且评价，可以开始下一单了")
                            this.setState({
                                visibleL: false,
                                canStart: true
                            })
                            return 1
                        }

                        // return 1
                    }
                }

                // return 
                // return json.access_token
            })
            .catch((error) => {
                console.log(error)
            })
    }

    // getId = async () => {
    //     console.log("得到工作")
    //     var valid = await this.checkJob()
    //     console.log("valid")
    //     console.log(valid)
    //     if (valid === "ok") {
    //         return
    //     }
    //     else {
    //         await AsyncStorage.setItem("tipId", valid.toString())
    //     }
    // }

    // getName = async () => {
    //     var masterName = await this.setVison()
    //     console.log("masterName")
    //     console.log(masterName)
    //     if (masterName != '') {
    //         await AsyncStorage.setItem('masterName', masterName.toString())
    //     }
    // }

    getNameImm = async (id) => {
        console.log("专家用户名")
        // id = 1
        let url = 'http://202.120.40.8:30454/translate/translator/getname?id=' + id;
        return fetch(url, {
            method: 'GET',
            // headers: headers,
        })
            .then(response => {
                console.log("得到用户名")
                console.log(response)
                return response.text()
            })
            .then((jsons) => {
                console.log("用户名是")
                console.log(jsons)
                return jsons
            })
            .catch((error) => {
                console.log(error)
            })
    }

    // setVison = async () => {
    //     var valid = await this.checkWait()
    //     if (valid === 0) {
    //         this.setState({
    //             visibleL: true
    //         })
    //         return ''
    //     } else {
    //         this.setState({
    //             visibleL: false
    //         })
    //         console.log("专家用户名")
    //         // id = 1
    //         let url = 'http://202.120.40.8:30454/translate/translator/getname?id=' + valid;
    //         return fetch(url, {
    //             method: 'GET',
    //             // headers: headers,
    //         })
    //             .then(response => {
    //                 console.log("得到用户名")
    //                 console.log(response)
    //                 return response.text()
    //             })
    //             .then((jsons) => {
    //                 console.log("用户名")
    //                 console.log(jsons)
    //                 return jsons
    //             })
    //             .catch((error) => {
    //                 console.log(error)
    //             })
    //     }
    // }


    // checkWait = async () => {
    //     console.log("dengdai")
    //     await this.getId()
    //     var tipId = await AsyncStorage.getItem("tipId")
    //     console.log("checkJob")
    //     var id = await AsyncStorage.getItem('id')
    //     console.log("userid")
    //     console.log(id)
    //     // id = 1
    //     let url = 'http://202.120.40.8:30454/translate/translator/seeall/' + id;
    //     return fetch(url, {
    //         method: 'GET',
    //         // headers: headers,
    //     })
    //         .then(response => {
    //             console.log("检查订单")
    //             console.log(response)
    //             return response.json()

    //         })
    //         .then(jsons => {
    //             console.log(jsons)
    //             var length = jsons.length
    //             console.log(length)

    //             if (length === 0) {
    //                 console.log("bukeneng")
    //             }
    //             else {
    //                 console.log(jsons[length - 1].valid)
    //                 if (jsons[length - 1].valid === true) {
    //                     console.log("还没有被接单")
    //                     return 0
    //                 }
    //                 else {
    //                     if (jsons[length - 1].rating === 0.0) {
    //                         console.log("已经接单但是没有评价")
    //                         return jsons[length - 1].translatorId
    //                     }
    //                     else {
    //                         console.log("已经接单")
    //                         return jsons[length - 1].translatorId
    //                     }

    //                 }
    //             }

    //             // return 
    //             // return json.access_token
    //         })
    //         .catch((error) => {
    //             console.log(error)
    //         })

    // }



    // getInfo = async () => {
    //     console.log("getInfo")
    //     var tipId = await this.startJob()
    //     await AsyncStorage.setItem("tipId", tipId.toString())
    //     console.log("tipId")
    //     console.log(tipId)
    // }

    // checkJob = async () => {
    //     console.log("checkJob")
    //     var id = await AsyncStorage.getItem('id')
    //     console.log("userid")
    //     console.log(id)
    //     // id = 1
    //     let url = 'http://202.120.40.8:30454/translate/translator/seeall/' + id;
    //     return fetch(url, {
    //         method: 'GET',
    //         // headers: headers,
    //     })
    //         .then(response => {
    //             console.log("检查订单")
    //             console.log(response)
    //             return response.json()
    //         })
    //         .then(jsons => {
    //             console.log(jsons)
    //             var length = jsons.length
    //             console.log(length)

    //             if (length === 0) {
    //                 this.getInfo()
    //                 console.log("合法申请")
    //                 return "ok"
    //             }
    //             else {
    //                 console.log(jsons[length - 1].valid)
    //                 if (jsons[length - 1].valid === true) {
    //                     console.log("不合法申请")
    //                     return jsons[length - 1].id
    //                 }
    //                 else {
    //                     if (jsons[length - 1].rating === 0.0) {
    //                         console.log("用户没有结束")
    //                         return jsons[length - 1].id
    //                     }
    //                     else {
    //                         this.getInfo()
    //                         console.log("合法申请")
    //                         return "ok"
    //                     }

    //                 }
    //             }

    //             // return 
    //             // return json.access_token
    //         })
    //         .catch((error) => {
    //             console.log(error)
    //         })


    // }

    startJob = async () => {
        var id = await AsyncStorage.getItem('id')
        console.log("userid")
        console.log(id)
        // id = 1
        let url = 'http://202.120.40.8:30454/translate/translator/startjob?userid=' + id;
        var tipId

        return fetch(url, {
            method: 'GET',
            // headers: headers,
        })
            .then(response => {
                console.log("申请信息")
                console.log(response)
                return response.json()

            })
            .then(jsons => {
                console.log(jsons)
                tipId = jsons.id
                return tipId
                // return 
                // return json.access_token
            })
            .catch((error) => {
                console.log(error)
            })



    }

    render() {
        return (
            <View>
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

                />
                <Dialog
                    visible={this.state.visibleL}
                    dialogTitle={<DialogTitle title="温馨提示" />}
                    footer={
                        <DialogFooter>
                            <DialogButton
                                text="确定"
                                onPress={() => {
                                    this.setState({
                                        visibleL: false
                                    })
                                    this.props.navigation.navigate('Main')
                                }}
                            />
                        </DialogFooter>
                    }
                >
                    <DialogContent>
                        <Text>
                            尊敬的用户，您的订单正在飞速送达，请稍等片刻
                        </Text>
                    </DialogContent>
                </Dialog>
                <Dialog
                    visible={this.state.visibleK}
                    dialogTitle={<DialogTitle title="温馨提示" />}
                    footer={
                        <DialogFooter>
                            <DialogButton
                                text="确定"
                                onPress={() => {
                                    this.setState({
                                        visibleK: false
                                    })
                                    this.props.navigation.navigate('Main')
                                }}
                            />
                        </DialogFooter>
                    }
                >
                    <DialogContent>
                        <Text>
                            尊敬的用户，您的订单正在飞速送达，请稍等片刻后点击进入该界面
                        </Text>
                    </DialogContent>
                </Dialog>
                {/* <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 60,
                        marginBottom: 40
                    }}
                >
                    <Avatar
                        size="xlarge"
                        source={
                            require('../Assets/TransPage/his.png')
                        }
                        onPress={() => this.props.navigation.navigate("Master")}
                    />
                    <Text>专家翻译历史</Text>
                </View> */}
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 150,
                        marginBottom: 100
                    }}
                >
                    <Avatar
                        size="xlarge"
                        source={require('../Assets/TransPage/start.png')}
                        onPress={() => {
                            // this.getInfo()
                            // this.props.navigation.navigate("Master")
                            // if (this.canStart) {
                            this.startJob();
                            console.log("申请了新的订单")
                            this.setState({
                                visibleK: true
                            })
                            // }
                        }
                        }
                    />
                    <Text>连线专家翻译</Text>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    ButtonStyle: {
        marginTop: 20,
        marginBottom: 20
    },
    subtitleView: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingTop: 5
    },
    ratingImage: {
        height: 19.21,
        width: 100
    },
    ratingText: {
        paddingLeft: 10,
        color: 'grey'
    },
    container: {
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
})