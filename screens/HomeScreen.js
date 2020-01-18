/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from "react";
import {
    ActivityIndicator, Alert, AlertIOS, BackHandler, Dimensions, NetInfo, ScrollView, Share,
    View
} from "react-native";
import {StyleSplash} from "./../style/styling";
import axios from "axios";
import {Icon, Image, ListItem, Text} from "react-native-elements";
import base64 from "react-native-base64";
import {BG_COLOR2} from "../style/styling";
import {getMonthLetter, marketLink, OpenUrl} from "./components/common";
import {Actions} from "react-native-router-flux";
import SEED_CARD from "./components/cardSeeds";
import Toast from "react-native-simple-toast";
import OptionsMenu from 'react-native-options-menu';

const BASE_URL = "http://dunamisgospel.org/api/sod/read.php?cmd=all";
const BASE_URL_ASSET = "http://dunamisgospel.org/api/sod/assets.php"; //param 'direct==true to redirect image
const DOMAIN = "http://dunamisgospel.org";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const netStatus = NetInfo.fetch();

const place_holder = require('./../src/img/watch.jpg');
const DUMMY_DATA = {
    created: 'TG9hZGluZy0wMC0wMCAwMDowMDowMA==',
    title: 'UGxlYXNlIFdhaXQ=',
    image: 'aHR0cDovL2R1bmFtaXNnb3NwZWwub3JnL2FwaS9zb2QvaW1ncy9pbWFnZV81LmpwZw=='
};

const myIcon = (<Icon type={'feather'} name="more-vertical" size={20} color="#fff"/>);

export default class HomeScreen extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            isNetwork: true,
            loaded: false,
            sd: [DUMMY_DATA, DUMMY_DATA], //SOD data all in array and base64 encoded
            st: {}, //SOD today in objects (`created`,`introtext`,`fulltext`,`title`,`alias`)
            topImage: DOMAIN + "/api/sod/imgs/image_1.jpg",
            topCard: {day: '00', month: 'Month', year: 'Year', title: 'Loading'}
        }
    }

    //Initialize on mounted
    componentDidMount() {
        this.main();
        NetInfo.isConnected.addEventListener('connectionChange', () => {
                this.main();
            }
        );

    }

    main = () => {
        try {
            //first load from db if not, use network
            NetInfo.isConnected.fetch().then(isConnected => {
                if (!isConnected) {
                    Toast.show("Internet not connected.!!!");
                    this.setState({
                        isNetwork: false,
                    });
                } else {
                    //Toast.show("Internet connected.!!! ")
                    this.setState({
                        isNetwork: true,
                    });
                    Toast.show("Content loading...");
                    this.loadSOD();
                    this.fetchTopImage();
                }

            });
        } catch (e) {
            Toast.show("Something went wrong, please try again...")
        }
        //check internet
    }

    //load today seeds
    loadSOD = () => {
        axios.get(BASE_URL)
            .then(resp => {
                let obj = resp.data;
                this.setState({
                    sd: obj.previous,
                    st: obj.today,
                    loaded: true,
                });
                this.filterToday();
                render(); //call render method
            }).catch(err => {
            console.log(err)
        })
    };

    //load top Image
    fetchTopImage = () => {
        axios.get(BASE_URL_ASSET)
            .then(resp => {
                let obj = resp.data;
                this.setState({
                    topImage: obj.image
                });
            }).catch(err => {
            console.log(err)
        })
    };

    //filter and arrange today's sod
    filterToday = () => {
        let d = this.state.st;
        let title64 = base64.decode(d.title);
        let day64 = base64.decode(d.created).split(" ")[0];
        day64 = day64.split("-");
        this.setState({
            topCard: {title: title64, day: day64[2], month: getMonthLetter(parseInt(day64[1])), year: day64[0]}
        })
    };

    //filter sod and read
    readSOD = (d) => {
        if (this.state.loaded) {
            //Ready to read
            let day = parseInt(new Date().getDate());  //Current Date
            let month = parseInt(new Date().getMonth() + 1); //Current Month
            let year = parseInt(new Date().getFullYear()); //Current Year

            let ww = base64.decode(d.created).split(" ")[0].split("-");

            let wday = parseInt(ww[2]);
            let wyear = parseInt(ww[0]);
            let wm = parseInt(ww[1]);

            if (year >= wyear) {
                //we in this year
                if ((wm < month) || (year > wyear)) {
                    //we are still in the same month
                    Actions.push("readMode", {data: d});
                } else {
                    //the current month
                    if (wday <= day && month === wm) {
                        Actions.push("readMode", {data: d});
                    } else {
                        //the days of the month is ahead
                        Toast.show("Not allowed to read future contents", Toast.SHORT);
                    }
                }
            } else {
                //last year contents
                Actions.push("readMode", {data: d});
            }

        } else {
            Toast.show("Content still loading...", Toast.SHORT);
        }
    }

    render() {
        if (this.state.loaded) {
            return (
                <View style={[StyleSplash.container, {padding: 0}]}>

                    <View style={{
                        position: 'absolute',
                        padding: 10,
                        right: 0,
                        top: 0,
                        backgroundColor: 'transparent',
                        zIndex: 999999,
                    }}>
                        <OptionsMenu
                            customButton={myIcon}
                            buttonStyle={{width: 18, height: 18, margin: 7.5, resizeMode: "contain"}}
                            destructiveIndex={1}
                            options={["About", "Pay Online", "Help", "Reload", "Invite A Friend", "Quit"]}
                            actions={[() => {
                                //About
                                Actions.about();
                            }, () => {
                                //Pay online
                                OpenUrl("http://dunamisgospel.org/pay")
                            }, () => {
                                //Help
                                OpenUrl("http://dunamisgospel.org/")
                            }, this.props.reload ? this.props.btnReload : () => {
                            }, () => {
                                Share.share({message: "Iam now using Mobile Seeds Of Destiny Pro version\nDownload now and enjoy\nhttps://play.google.com/store/apps/details?id=com.nsc.sodapp"})
                                    .then(() => {

                                    });
                            },
                                () => {
                                    //quit the app
                                    //BackHandler.exitApp();
                                    Alert.alert(
                                        'Exit App',
                                        'Do you want to exit?',
                                        [
                                            {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                            {text: 'Yes', onPress: () => BackHandler.exitApp()},
                                        ],
                                        {cancelable: false});
                                }]}/>
                    </View>

                    <View style={[{
                        height: 250,
                        justifyItems: 'center',
                        alignItems: 'center',
                        borderBottomLeftRadius: 0,
                        borderBottomRightRadius: 0,
                        padding: 0,
                        overflow: 'hidden'
                    }]}>
                        <Image
                            blurRadius={0}
                            style={{
                                position: 'absolute',
                                alignSelf: 'center',
                                height: 250,
                                width: Dimensions.get('window').width + 1,
                            }}
                            source={{uri: this.state.topImage}}
                        />
                        <View style={[{
                            flex: 1,
                            width: windowWidth,
                            justifyContent: 'center',
                            backgroundColor: 'rgba(0,0,0,.6)'
                        }]}>
                            <Text style={[{
                                alignSelf: 'center',
                                fontFamily: 'Poppins',
                                color: BG_COLOR2,
                                fontSize: 25
                            }]}>
                                Seeds Of Destiny
                            </Text>
                            <Text style={[{
                                marginTop: -2,
                                alignSelf: 'center',
                                fontFamily: 'Poppins',
                                color: BG_COLOR2,
                                fontSize: 35
                            }]}>
                                TODAY
                            </Text>
                            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={[{
                                    alignSelf: 'center',
                                    fontFamily: 'Poppins',
                                    color: BG_COLOR2,
                                    fontSize: 20
                                }]}>
                                    Day {this.state.topCard.day}
                                </Text>
                                <Text style={[{
                                    alignSelf: 'center',
                                    fontFamily: 'Poppins',
                                    color: BG_COLOR2,
                                    fontSize: 20,
                                    paddingRight: 20,
                                    paddingLeft: 20
                                }]}>
                                    {this.state.topCard.title}
                                </Text>
                                <Text style={[{
                                    marginTop: 0,
                                    alignSelf: 'center',
                                    fontFamily: 'Poppins',
                                    color: BG_COLOR2,
                                    fontSize: 15
                                }]}>
                                    {this.state.topCard.month + " " + this.state.topCard.year}
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={this.state.isNetwork ? hidden : null}>
                        <Text style={[{
                            backgroundColor: '#ff022c',
                            padding: 8,
                            color: '#fff'
                        }]}>No Internet Connections !</Text>
                    </View>


                    <View style={{
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        flexDirection: 'row',
                        paddingLeft: 14,
                        paddingTop: 10
                    }}>
                        <Text style={[{
                            marginRight: 5,
                            flexWrap: 'wrap',
                            zIndex: 0,
                            alignSelf: 'flex-start',
                            fontFamily: 'Poppins',
                            fontWeight: '800',
                            color: 'rgba(84, 100, 115, 0.51)',
                            fontSize: 13
                        }]}>
                            Previous Seeds
                        </Text>
                    </View>

                    <View style={{marginBottom: 10}}>
                        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}
                                    horizontal={true} style={{marginTop: 0}}>
                            {
                                //img, sday, sdate, stitle, btnShare, btnClick
                                this.state.sd.map(
                                    (d, k) => {
                                        //Date filtering here

                                        //end of data filtering
                                        return (
                                            <SEED_CARD
                                                key={k}
                                                sday={base64.decode(d.created).split(" ")[0].split("-")[2]}
                                                sdate={getMonthLetter(parseInt(base64.decode(d.created).split(" ")[0].split("-")[1])) + " " + base64.decode(d.created).split(" ")[0].split("-")[0]}
                                                img={base64.decode(d.image)}
                                                stitle={base64.decode(d.title)}
                                                btnClick={() => {
                                                    //Open reader mode
                                                    this.readSOD(d);
                                                }}
                                                btnShare={() => {
                                                    //Open reader mode
                                                    let sharedata =
                                                        "Download SOD Mobile Pro (Seeds Of Destiny)\nTo continue reading....\n*" +
                                                        base64.decode(d.title) + "*\n\n" +
                                                        marketLink;
                                                    Share.share({message: sharedata}).then(() => {
                                                        //keep your secrete
                                                    })
                                                }}
                                            />
                                        )
                                    })
                            }
                        </ScrollView>
                    </View>
                    <View style={{
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        flexDirection: 'row',
                        paddingLeft: 14,
                        paddingTop: 10
                    }}>
                        <Text style={[{
                            marginRight: 5,
                            flexWrap: 'wrap',
                            zIndex: 0,
                            alignSelf: 'flex-start',
                            fontFamily: 'Poppins',
                            fontWeight: '800',
                            color: 'rgba(84, 100, 115, 0.51)',
                            fontSize: 13
                        }]}>
                            SOD List
                        </Text>
                        <Icon
                            size={14}
                            name='list'
                            type='feather'
                            color={'rgba(84, 100, 115, 0.51)'}
                        />
                    </View>

                    <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}
                                style={{marginTop: 20}}>
                        <View style={{flex: 1}}>
                            {
                                this.state.sd.map((d, k) => (
                                    <ListItem
                                        key={k}
                                        leftAvatar={{source: {uri: base64.decode(d.image)}}}
                                        title={'Day ' + base64.decode(d.created).split(" ")[0].split("-")[2] + ", " + getMonthLetter(parseInt(base64.decode(d.created).split(" ")[0].split("-")[1])) + " " + base64.decode(d.created).split(" ")[0].split("-")[0]}
                                        subtitle={base64.decode(d.title)}
                                        bottomDivider
                                        chevron={true}
                                        titleStyle={{fontWeight: 'bold', fontFamily: 'Poppins'}}
                                        subtitleStyle={{fontWeight: 'bold', fontSize: 15}}
                                        onPress={() => {
                                            this.readSOD(d);
                                        }}
                                    />
                                ))
                            }
                        </View>
                    </ScrollView>
                </View>
            );
        } else {
            return (
                <View style={{
                    flex: 1,
                    backgroundColor: '#fff',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <ActivityIndicator size="large" color="#000"/>
                    <Text style={{fontSize: 20, fontWeight: 'bold', margin: 10, color: '#000'}}>Loading seeds</Text>
                    <Text style={{
                        fontSize: 15,
                        margin: 10,
                        color: '#ef3244'
                    }}>{this.state.isNetwork ? "" : "Turn on mobile data and try again !"}</Text>
                </View>
            )
        }
    }
}

const hidden = {
    overflow: 'hidden',
    width: 0, height: 0
};