import React, {Component} from "react";
import {TouchableOpacity} from "react-native";
import {Header, Icon} from "react-native-elements";
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
            <Header
                statusBarProps={{barStyle: 'light-content'}}
                barStyle="light-content" // or directly
                leftComponent={
                    <TouchableOpacity onPress={() => {
                        this.props.homeKey();
                    }}>
                        <Icon type={'feather'} name="arrow-left" size={24} color="#4d6271"/>
                    </TouchableOpacity>
                }
                centerComponent={{text: this.props.title, style: {color: '#4d6271', fontWeight: 'bold', fontSize: 24}}}
                containerStyle={{
                    backgroundColor: '#fff',
                    justifyContent: 'center',
                    alignContent: 'center',
                    height: 70,
                }}
            />
        );
    }
}