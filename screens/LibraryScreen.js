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
                        <Headers title={'My Library'}/>
                    </View>

                    <View>

                    </View>
                </View>
            </View>
        );
    }
}
