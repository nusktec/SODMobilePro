/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {BackHandler, Dimensions, NetInfo, ScrollView, Share, TouchableOpacity, View} from 'react-native';
import {StyleSplash} from './../style/styling';
import Headers from "./components/headers";
import axios from 'axios';
import {Icon, Image, Text} from "react-native-elements";
import base64 from "react-native-base64";
import {BG_COLOR, BG_COLOR2, COLOR2, Flavours2} from "../style/styling";
import {getMonthLetter, marketLink} from './components/common';
import {Actions} from 'react-native-router-flux';
import SEED_CARD from './components/cardSeeds';
import Toast from 'react-native-simple-toast';
import FooterCredit from './components/FooterCredit';

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
export default class HomeScreen extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            isNetwork: true,
            loaded: false,
            sd: [DUMMY_DATA, DUMMY_DATA, DUMMY_DATA, DUMMY_DATA], //SOD data all in array and base64 encoded
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

    render() {
        return (
            <View style={[StyleSplash.container, {padding: 0}]}>
                <View style={[]}>
                    <Headers icon={'monitor'} homeKey={() => {
                        //Invite button clicked / closed
                        BackHandler.exitApp();
                    }} reload={true} btnReload={() => {
                        Actions.refresh({});
                    }}/>
                </View>

                <View style={[{
                    height: 200,
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
                        <Text style={[{alignSelf: 'center', fontFamily: 'Remachine Script Personal Use', color: BG_COLOR2, fontSize: 25}]}>
                            Seeds Of Destiny
                        </Text>
                        <Text style={[{
                            marginTop: -2,
                            alignSelf: 'center',
                            fontFamily: 'The Foregen',
                            color: BG_COLOR2,
                            fontSize: 35
                        }]}>
                            TODAY
                        </Text>
                        <View style={{justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={[{alignSelf: 'center', fontFamily: 'Baloo', color: BG_COLOR2, fontSize: 20}]}>
                                Day {this.state.topCard.day}
                            </Text>
                            <Text style={[{
                                alignSelf: 'center',
                                fontFamily: 'Baloo',
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
                                fontFamily: 'Black Label',
                                color: BG_COLOR2,
                                fontSize: 15
                            }]}>
                                {this.state.topCard.month + "." + this.state.topCard.year}
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={this.state.isNetwork ? hidden : null}>
                    <Text style={[{
                        backgroundColor: '#ff022c',
                        padding: 8,
                        color: '#fff'
                    }]}>Internet not connected.!!! </Text>
                </View>

                <View style={[{
                    flexDirection: 'row',
                    borderRadius: 10,
                    marginRight: 10,
                    marginLeft: 10,
                    marginTop: 10,
                    backgroundColor: '#fff',
                    overflow: 'hidden',
                    borderWidth: 1,
                    borderColor: BG_COLOR,
                    height: 80
                }, Flavours2.shadow(1)]}>
                    <View style={{flex: 1, overflow: 'hidden', flexDirection: 'column'}}>
                        <Image blurRadius={8} resizeMode={'cover'}
                               style={{position: 'absolute', width: windowWidth / 2, height: 150}} source={
                            this.state.loaded ? require('./../src/img/watch.jpg') : require('./../src/img/watch.jpg')
                        }/>
                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            backgroundColor: 'rgba(0,0,0,0.8)'
                        }}>
                            <Text style={[{alignSelf: 'center', fontFamily: 'Arial', color: COLOR2, fontSize: 25}]}>
                                Now Playing
                            </Text>
                            <Text style={[{alignSelf: 'center', fontFamily: 'Arial', color: COLOR2, fontSize: 12}]}>
                                Seeds Of Destiny
                            </Text>
                        </View>
                    </View>


                    <View style={{backgroundColor: BG_COLOR, flex: 1, alignContent: 'center'}}>
                        <Image blurRadius={5} resizeMode={'cover'}
                               style={{position: 'absolute', width: windowWidth / 2, height: 150, top: 0}} source={
                            this.state.loaded ? require('./../src/img/watch.jpg') : require('./../src/img/watch.jpg')
                        }/>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => {
                            Actions.push('playVideo');
                        }} style={{
                            alignSelf: 'center',
                            justifyContent: 'center',
                            top: 0,
                            bottom: 0,
                            position: 'absolute'
                        }}>
                            <Icon
                                raised
                                size={30}
                                name='play-circle'
                                type='feather'
                                color={COLOR2}
                            />
                        </TouchableOpacity>
                    </View>
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
                        fontFamily: 'Happy Sunday',
                        fontWeight: '800',
                        color: 'rgba(84, 100, 115, 0.51)',
                        fontSize: 13
                    }]}>
                        Previous Seeds
                    </Text>
                    <Icon
                        size={14}
                        name='book-open'
                        type='feather'
                        color={'rgba(84, 100, 115, 0.51)'}
                    />
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
                                            sdate={getMonthLetter(parseInt(base64.decode(d.created).split(" ")[0].split("-")[1])) + "." + base64.decode(d.created).split(" ")[0].split("-")[0]}
                                            img={base64.decode(d.image)}
                                            stitle={base64.decode(d.title)}
                                            btnClick={() => {
                                                //Open reader mode
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
                                                        if (wm < month) {
                                                            //we are still in the same month
                                                            Actions.push("readMode", {data: d});
                                                        } else {
                                                            //the current month
                                                            if (wday<=day && month===wm) {
                                                                Actions.push("readMode", {data: d});
                                                            }else {
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
                <FooterCredit/>
                <Text style={{
                    textAlign: 'center',
                    fontFamily: 'Black Label',
                    fontSize: 10,
                    color: '#4d6271',
                    margin: 5,
                    fontWeight: 'bold'
                }}>
                    www.rscbyte.com
                </Text>
            </View>
        );
    }
}

const hidden = {
    overflow: 'hidden',
    width: 0, height: 0
};