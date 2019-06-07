import React, {Component} from 'react';
import {Modal, Router, Scene, Tabs} from 'react-native-router-flux';

import WelcomeScreen from './screens/WelcomeScreen';
import HomeScreen from './screens/HomeScreen';
import LibraryScreen from './screens/LibraryScreen';
import AccountScreen from './screens/AccountScreen';
import PlayScreen from './screens/PlayerScreen';
import ReadScreen from './screens/ReaderScreen';
import AboutScreen from './screens/AboutScreen';

//Setting up account settings

import * as NavigationBar from "react-native-navbar-color";
import {View, StyleSheet} from "react-native";
import {Icon} from "react-native-elements";
import {BG_COLOR, COLOR1, NAV_BAR, TEXT_COLOR} from "./style/styling";

//Create a dedicated class that will manage the tabBar icon
class TabIcon extends Component {
    render() {
        let color = this.props.focused ? '#cc0c09' : TEXT_COLOR;

        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                alignItems: 'center',
                alignSelf: 'center',
                justifyContent: 'center',
            }}>
                <Icon raised type='feather' color={color} name={this.props.iconName || "circle"} size={20}/>
            </View>
        );
    }
}

export default class App extends Component<Props> {

    constructor(props) {
        super(props);

        NavigationBar.setStatusBarTheme('dark', false);
        NavigationBar.setStatusBarColor(NAV_BAR, false)
    }

    render() {
        return (
            <Router>
                <Scene key="root">

                    <Scene
                        initial
                        navTransparent={true} hideNavBar={true}
                        component={WelcomeScreen}
                    />
                    <Scene
                        key={'dashboard'}
                        navTransparent={true} hideNavBar={true}
                        component={HomeScreen}
                    />

                    <Tabs
                        tabBarStyle={{height: 60, backgroundColor: BG_COLOR}}
                        navTransparent={true}
                        hideNavBar={true}
                        type='reset'
                        animationEnabled={true}
                        swipeEnabled={true}
                        tabs={true}
                        showLabel={false}
                        key="home">

                        <Scene
                            selected
                            labelStyle={sty.tabLable}
                            icon={TabIcon}
                            iconName={'home'}
                            hideNavBar={true}
                            component={HomeScreen}
                            title="Home"
                        />

                        <Scene
                            icon={TabIcon}
                            iconName={'book-open'}
                            hideNavBar={true}
                            component={LibraryScreen}
                            title="Library"
                        />

                        <Scene
                            icon={TabIcon}
                            iconName={'user'}
                            hideNavBar={true}
                            component={AccountScreen}
                            title="Media"
                        />

                    </Tabs>

                    <Scene
                        key={'playVideo'}
                        navTransparent={true} hideNavBar={true}
                        component={PlayScreen}
                    />

                    <Scene
                        key={'readMode'}
                        navTransparent={true} hideNavBar={true}
                        component={ReadScreen}
                    />
                    <Scene
                        key={'about'}
                        navTransparent={true} hideNavBar={true}
                        component={AboutScreen}
                    />
                </Scene>
            </Router>
        );
    }
}

const sty = StyleSheet.create({
    tabLable: {
        fontFamily: 'Baloo'
    }
});