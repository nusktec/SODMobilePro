/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View} from 'react-native';
import {StyleSplash} from './../style/styling';
import Headers from "./components/headers";
import {Actions} from 'react-native-router-flux';
import {Button, Icon, Image, Text} from "react-native-elements";
import {TEXT_COLOR} from "../style/styling";
import {OpenUrl} from "./components/common";

export default class LibraryScreen extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            footerText: 'Library'
        }
    }

    render() {
        return (
            <View style={StyleSplash.container}>
                <View style={StyleSplash.container}>
                    <View style={[]}>
                        <Headers icon={'arrow-left'} title={'About App'} homeKey={() => {
                            Actions.pop();
                        }}/>
                    </View>

                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <View style={{justifyContent: 'center', alignItems: 'center'}}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Image source={require('./../src/img/rdx_tag.png')}
                                       style={{width: 100, height: 100, resizeMode: 'contain'}}/>
                            </View>
                        </View>

                        <Text style={{
                            textAlign: 'center',
                            fontSize: 28,
                            color: '#4d6271',
                            margin: 1,
                            fontWeight: 'bold'
                        }}>
                            Seeds Of Destiny
                        </Text>
                        <Text style={{
                            textAlign: 'center',
                            fontSize: 13,
                            color: '#ff1c16',
                            margin: 1,
                        }}>
                            Mobile Application
                        </Text>

                        <Text style={{
                            textAlign: 'center',
                            fontFamily: 'Black Label',
                            fontSize: 18,
                            color: '#4d6271',
                            marginTop: 20,
                        }}>
                            uDesigned By:
                        </Text>
                        <Text style={{
                            textAlign: 'center',
                            fontFamily: 'Black Label',
                            fontSize: 13,
                            color: '#4d6271',
                            fontWeight: 'bold',
                            marginTop: 13,
                        }}>
                            Reedax Technology
                        </Text>
                        <Text style={{
                            textAlign: 'center',
                            fontSize: 13,
                            color: '#4d6271',
                            marginTop: 2,
                        }}>
                            234 8164242320 | info@reedax.com
                        </Text>

                        <Button
                            onPress={() => {
                                //Open company web
                                OpenUrl("http://reedax.com");
                            }}
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
                                    name="link"
                                    size={12}
                                    color={TEXT_COLOR}
                                />
                            }
                            title=" Visit Us"
                        />

                    </View>

                </View>
            </View>
        );
    }
}
