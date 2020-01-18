import React, {Component} from "react";
import {TouchableOpacity, View, Dimensions} from "react-native";
import {Icon, Text} from "react-native-elements";
import * as NavigationBar from "react-native-navbar-color";
import {NAV_BAR} from "../../style/styling";
//Create a dedicated class that will manage the tabBar icon
export default class Headers extends Component {

    constructor(props) {
        super(props);
    }


    componentDidMount() {

    }

    render() {
        let color = this.props.selected ? '#1a1f23' : '#3d505d';
        NavigationBar.setStatusBarColor(NAV_BAR, true);
        NavigationBar.setStatusBarTheme('dark', true);
        return (
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: '#fff',
                width: Dimensions.get('window').width,
                padding: 10,
            }}>
                <TouchableOpacity onPress={() => {
                    this.props.homeKey();
                }}>
                    <Icon type={'feather'} name="arrow-left" size={24} color="#4d6271"/>
                </TouchableOpacity>
                <Text style={{fontWeight: 'bold', fontSize: 20, marginEnd: 10}}>{this.props.title}</Text>
            </View>
        );
    }
}