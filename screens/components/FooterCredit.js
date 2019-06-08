/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Linking, Text, TouchableOpacity, View, Dimensions, Share} from 'react-native';
import {StyleSplash} from './../../style/styling';
import {Icon} from "react-native-elements";
import {COLOR2} from "../../style/styling";
import Toast from 'react-native-simple-toast';

const windowWidth = Dimensions.get('window').width;

export default class FooterCredit extends Component<Props> {

    constructor(props) {
        super(props);
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
                <View style={{height: 50, width: windowWidth , marginBottom: 5}}>

                    <Text style={{textAlign: 'center', fontFamily: 'black', fontSize: 10, color: '#4d6271', marginTop: 5}}>
                        Social Connects
                    </Text>

                    <View style={{padding: 5, flexDirection: 'row', alignItems: 'space-between', justifyContent: 'center'}}>
                        <TouchableOpacity activeOpacity={0.5} onPress={()=>{
                            this.openBrowser('http://instagram.com/drbeckyenenche')
                        }}>
                            <Icon
                                raised
                                size={15}
                                color={'#ff3138'}
                                name={'instagram'}
                                type='feather'
                            />
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={0.5} onPress={()=>{
                            this.openBrowser('http://instagram.com/drbeckyenenche')
                        }}>
                            <Icon
                                raised
                                size={15}
                                color={'#008208'}
                                name={'twitter'}
                                type='feather'
                            />
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={0.5} onPress={()=>{
                            this.openBrowser('http://twitter.com/drbeckyenenche')
                        }}>
                            <Icon
                                raised
                                size={15}
                                color={'#3c5eaa'}
                                name={'facebook'}
                                type='feather'
                            />
                        </TouchableOpacity>

                    </View>
                </View>

            </View>
        );
    }
}
