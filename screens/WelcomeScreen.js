/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Text, View, Dimensions} from 'react-native';
import {StyleSplash} from './../style/styling';
import {Image} from "react-native-elements";
import {Actions} from 'react-native-router-flux';

export default class WelcomeScreen extends Component<Props> {

    constructor(props) {
        super(props);
        this.state = {
            footerText: 'Reedax Technology'
        };

        const TEMP_ACC = "account";

        //check if logged in to go to home
        setTimeout(() => {
            //Actions.replace('dashboard');
            // (async()=>{
            //     try {
            //         const value = await AsyncStorage.getItem(TEMP_ACC);
            //         if(value!==null){
            //             //is logged
            //             Actions.home();
            //         }else{
            //             //not logged in
            //             Actions.signin();
            //         }
            //     }catch (error){
            //         //go to sign in
            //         Actions.signin();
            //     }
            // })();
        }, 3000)
    }

    render() {
        return (
            <View style={StyleSplash.container}>
                <Image source={require('./../src/img/bg_yellow_min.jpg')}
                       style={{width: Dimensions.get('window').width, resizeMode: 'stretch', opacity: 0.1}}/>
                <View style={[StyleSplash.view1, {
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                }]}>
                    <Image style={{width: 100, resizeMode: 'contain'}}
                           source={require('./../src/img/ic_launcher_round.png')}/>
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
                    </Text>
                </View>
                <View style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Image style={{width: 80, height: 50, resizeMode: 'contain'}}
                           source={require('./../src/img/rdx_tag_2.png') }/>
                </View>

            </View>
        );
    }
}
