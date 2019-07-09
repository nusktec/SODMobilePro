/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {ScrollView, View, Dimensions, TouchableOpacity, Clipboard, Share} from 'react-native';
import {StyleSplash} from './../style/styling';
import Headers from "./components/headers";
import {Actions} from 'react-native-router-flux';
import {Button, Divider, Icon, Text} from "react-native-elements";
import FooterCredit from './components/FooterCredit';
import {BG_COLOR, Flavours2, TEXT_COLOR} from "../style/styling";
import base64 from "react-native-base64";
import HTML from 'react-native-render-html';
import {getDateString} from './components/common';
import Toast from "react-native-simple-toast";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class ReaderScreen extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            loaded: true,
            ready: false,
            body1: "<p></p>",
            body2: "<p></p>",
            title: "",
            date: "",
            cdata: "",
        }
    }

    componentDidMount() {
        try{
            let body1, body2, date, title, cdata;

            body1 = base64.decode(this.props.data.introtext);
            body2 = base64.decode(this.props.data.fulltext);
            title = base64.decode(this.props.data.title);
            date = base64.decode(this.props.data.created);
            cdata = base64.decode(this.props.data.copydata);
            //assign all to it views
            this.setState({
                ready: true,
                body1: body1,
                body2: body2,
                title: title,
                cdata: cdata,
                date: getDateString(date.split(" ")[0])
            })
        }catch (e){
            Toast.show("Something went wrong, please try again");
        }
    }

    shareSeeds = () => {
        if(!this.state.ready){
            Toast.show("No data to share");
            return;
        }
        Toast.show("Copied & Share with friends");
        let sharedata = "*SEEDS OF DESTINY*\n\n";
        sharedata = sharedata + "*" + this.state.title + "*\n";
        sharedata = sharedata + "" + this.state.date + "\n\n";
        sharedata = sharedata + "" + this.state.cdata+ "\n\n";
        Clipboard.setString(sharedata);
        Share.share({message: sharedata}).then(()=>{
            //Keep silence
        })
    };

    render() {
        return (
            <View style={StyleSplash.container}>
                <View style={[StyleSplash.container, {flexDirection: 'column'}]}>
                    <View style={[]}>
                        <Headers homeKey={() => {
                            if (this.state.loaded) {
                                Actions.pop();
                            } else {
                                //show toast
                            }
                        }} icon={'arrow-left'} title={'Reading'}/>
                    </View>

                    <View style={[{
                        borderBottomLeftRadius: 10,
                        padding: 10,
                        width: windowWidth,
                        flexDirection: 'row',
                        borderBottomWidth: 0,
                    }, Flavours2.shadow(1)]}>
                        <View style={{flex: 2}}>
                            <Text style={[{fontSize: 18, color: TEXT_COLOR, fontFamily: 'Black Label', fontWeight: 'bold'}]}>
                                {this.state.title}
                            </Text>
                            <Text style={[{fontSize: 13, color: TEXT_COLOR, fontFamily: 'Black Label', fontStyle: 'italic'}]}>
                                {this.state.date}
                            </Text>
                        </View>
                        <View style={{
                            flexWrap: 'wrap',
                            overflow: 'hidden',
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}
                                              onPress={() => this.shareSeeds()}>
                                <Icon
                                    type={'feather'}
                                    name="message-circle"
                                    size={12}
                                    color={'#008208'}
                                    containerStyle={{marginRight: 10,}}
                                />

                                <Icon
                                    type={'feather'}
                                    name="facebook"
                                    size={12}
                                    color={'#004795'}
                                    containerStyle={{marginRight: 10,}}
                                />

                                <Icon
                                    type={'feather'}
                                    name="twitter"
                                    size={12}
                                    color={'#001327'}
                                    containerStyle={{marginRight: 10,}}
                                />

                                <Icon
                                    type={'feather'}
                                    name="instagram"
                                    size={12}
                                    color={'#ff1c16'}
                                />
                            </TouchableOpacity>
                            <Button
                                onPress={() => this.shareSeeds()}
                                type={'outline'}
                                buttonStyle={{
                                    height: 30,
                                    width: 100,
                                    marginTop: 5,
                                    marginBottom: 2,
                                }}
                                titleStyle={{fontSize: 10, color: TEXT_COLOR}}
                                icon={
                                    <Icon
                                        type={'feather'}
                                        name="copy"
                                        size={12}
                                        color={TEXT_COLOR}
                                    />
                                }
                                title=" Copy & Share"
                            />
                        </View>
                    </View>

                    <ScrollView howsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}
                                style={{flex: 1}}>

                        <HTML containerStyle={[{paddingLeft: 10, paddingRight: 10}]} html={this.state.body1}
                              baseFontStyle={{
                                  textAlign: 'justify',
                                  fontSize: 15,
                                  fontStyle: 'italic',
                                  fontWeight: '800',
                                  lineHeight: 30,
                                  color: '#000',
                                  fontFamily: 'Expressway'
                              }}/>

                        <HTML containerStyle={[{paddingLeft: 10, paddingRight: 10}]} html={this.state.body2}
                              baseFontStyle={{
                                  textAlign: 'justify',
                                  fontSize: 18,
                                  fontWeight: 'bold',
                                  lineHeight: 30,
                                  color: TEXT_COLOR,
                                  fontFamily: 'Arial'
                              }}/>

                    </ScrollView>

                    <Divider style={{}}/>
                    <View style={[{
                        height: 80,
                        width: windowWidth,
                        padding: 5,
                        borderTopRightRadius: 10,
                        borderBottomWidth: 0
                    }]}>
                        <FooterCredit/>
                    </View>

                </View>

            </View>
        );
    }
}
