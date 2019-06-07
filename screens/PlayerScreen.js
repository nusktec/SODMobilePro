/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Text, TouchableOpacity, View, Linking} from 'react-native';
import {StyleSplash} from './../style/styling';
import Headers from "./components/headers";
import YouTube from "react-native-youtube";
import {Actions} from 'react-native-router-flux';
import {SocialIcon} from "react-native-elements";
import Toast from "react-native-simple-toast";

export default class LibraryScreen extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
        }
    }

    openBrowser = (url) => {
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                Toast.show("Unable to links");
            }
        });
    };

    render() {
        return (
            <View style={StyleSplash.container}>
                <View style={StyleSplash.container}>
                    <View style={[]}>
                        <Headers homeKey={()=>{
                            if(this.state.loaded){
                                Actions.pop();
                            }else {
                                //show toast
                            }
                        }} icon={'arrow-left'} title={'Now Playing'}/>
                    </View>

                    <View>
                        <YouTube
                            controls={2}
                            apiKey='AIzaSyDkVP3ddux3_W1_QyzCXzpD66oreimkG1A'
                            playlistId={'UUrDg-KgwTtv88H32I4KEZcw'}   // The YouTube video ID
                            play={true}
                            loop={false}            // control whether the video should loop when ended
                            onReady={()=>{
                                this.setState({loaded: true})
                            }}
                            lightboxMode={true}
                            style={{alignSelf: 'stretch', height: 250, zIndex: 0}}
                        />
                    </View>

                    <View>
                        <Text style={{textAlign: 'center', fontSize: 25, fontFamily: 'black', color: 'black', margin: 10}}>
                            Social Connects
                        </Text>
                    </View>

                    <View style={{padding: 30, flexDirection: 'column'}}>
                        <TouchableOpacity activeOpacity={0.8} onPress={()=>{
                            this.openBrowser('http://facebook.com/drbeckyenenche')
                        }}>
                        <SocialIcon
                            raised
                            title='Connect On Facebook'
                            button
                            type='facebook'
                        />
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={0.8} onPress={()=>{
                            this.openBrowser('http://twitter.com/drbeckyenenche');
                        }}>
                        <SocialIcon
                            raised
                            title='Connect On Twitter'
                            button
                            type='twitter'
                        />
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={0.8} onPress={()=>{
                            this.openBrowser('http://instagram.com/drbeckyenenche');
                        }}>
                        <SocialIcon
                            raised
                            title='Connect On Instagram'
                            button
                            type='instagram'
                        />
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity activeOpacity={0.8} onPress={()=>{
                    this.openBrowser("http://rscbyte.com");
                }}>
                <Text style={{textAlign: 'center', fontSize: 10, color: 'black', margin: 10}}>
                    RSC Byte() Codes
                </Text>
                </TouchableOpacity>

            </View>
        );
    }
}
