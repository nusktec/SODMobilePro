import React, {Component} from 'react';
import {TouchableOpacity, View, Share} from "react-native";
import {Header, Icon, Text} from "react-native-elements";
import * as NavigationBar from "react-native-navbar-color";
import {BG_COLOR, COLOR1, COLOR2, Flavours, NAV_BAR, TEXT_COLOR} from "../../style/styling";
import OptionsMenu from 'react-native-options-menu';
import {OpenUrl} from "./common";
import {Actions} from 'react-native-router-flux';


//Create a dedicated class that will manage the tabBar icon
export default class Headers extends Component {

    constructor(props) {
        super(props);
    }


    componentDidMount(){

    }

    render() {
        let color = this.props.selected ? '#1a1f23' : '#3d505d';
        NavigationBar.setStatusBarColor(NAV_BAR, true);
        NavigationBar.setStatusBarTheme('dark', true);
        return (
            <View style={[]}>
                <Header
                    barStyle={'dark-content'}
                    leftComponent={<TouchableOpacity onPress={this.props.homeKey}>
                        <Icon type='feather' color={TEXT_COLOR} name={this.props.icon ? this.props.icon : "monitor"} size={24}/>
                    </TouchableOpacity>}
                    placement="left"
                    centerComponent={
                        <View style={{alignItems: 'center'}}>
                            <Text style={{ color: TEXT_COLOR , fontFamily: 'dina', fontSize: 28}}>
                                {this.props.title ? this.props.title : 'Sod Mobile'}
                            </Text>
                        </View>
                    }
                    rightComponent={this.props.noMenu ? null : <TouchableOpacity>
                        <OptionsMenu
                            button={require('./../../src/img/menu.png')}
                            buttonStyle={{ width: 24, height: 24, margin: 7.5, resizeMode: "contain" }}
                            destructiveIndex={1}
                            options={["About", "Pay Online", "Help","Reload", "Invite A Friend"]}
                            actions={[()=>{
                                //About
                                Actions.about();
                            }, ()=>{
                                //Pay online
                                OpenUrl("http://dunamisgospel.org/pay")
                            }, ()=>{
                                //Help
                                OpenUrl("http://dunamisgospel.org/")
                            }, this.props.reload ? this.props.btnReload : ()=>{}, ()=>{
                                Share.share({message: "Iam now using Mobile Seeds Of Destiny Pro version\nDownload now and enjoy\nhttps://play.google.com/store/apps/details?id=com.nsc.sodapp"})
                                    .then(()=>{

                                    });
                            }]}/>
                    </TouchableOpacity>}
                    containerStyle={[{
                        paddingTop: -20,
                        height: 60,
                        backgroundColor: BG_COLOR,
                        justifyContent: 'space-around',
                    }, Flavours.shadow]}
                />
            </View>
        );
    }
}