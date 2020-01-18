import React, {Component} from 'react';
import {TouchableOpacity, View, StyleSheet} from "react-native";
import {Icon, Image, Text} from "react-native-elements";
import {BG_COLOR, Flavours2} from "../../style/styling";

export default class cardSeeds extends Component<props> {

    constructor(props) {
        super(props);
    }

    render() {
        //img, sday, sdate, stitle, btnShare, btnClick
        return (
            <View>
                <TouchableOpacity style={[{margin: 5, borderRadius: 10}, Flavours2.shadow(0)]} activeOpacity={0.8}
                                  onPress={this.props.btnClick}>
                    <View style={[{
                        overflow: 'hidden',
                        borderWidth: 1,
                        borderColor: '#fff',
                        flexDirection: 'column',
                        backgroundColor: '#fff',
                        height: 80,
                        width: 180,
                        borderRadius: 10,
                        padding: 0
                    }]}>
                        <Image blurRadius={10} style={{
                            resizeMode: 'cover',
                            position: 'absolute',
                            height: 80,
                            width: 180,
                            top: 0,
                            bottom: 0,
                            padding: -5
                        }} source={
                            this.props.img ? {uri: this.props.img} : require('./../../src/img/card_child_pray.jpg')
                        }/>

                        <View style={{
                            flexDirection: 'column',
                            height: 80,
                            width: 180,
                            padding: 6,
                            backgroundColor: 'rgba(0,0,0,.3)'
                        }}>
                            <Text style={[{
                                flex: 1,
                                justifyContent: 'center',
                                textTransform: 'capitalize',
                                fontSize: 17,
                                color: BG_COLOR,
                                fontFamily: 'Baloo',
                                marginTop: 5,
                                marginLeft: 5
                            }, shadow.txtSh]}>
                                {this.props.stitle ? this.props.stitle.substr(0, 50) : 'Message Loading'.substr(0, 50)}
                            </Text>
                            <Text style={[{
                                fontSize: 12,
                                color: BG_COLOR,
                                fontFamily: 'Black Label',
                                marginTop: -5,
                                marginLeft: 5,
                                marginBottom: 10,
                                fontWeight: '400'
                            }, shadow.txtSh]}>
                                {this.props.sdate ? this.props.sday + ", " + this.props.sdate : 'Please wait'}
                            </Text>
                            <TouchableOpacity onPress={this.props.btnShare} activeOpacity={0.5}
                                              style={{position: 'absolute', bottom: 0, right: 0}}>
                                <Icon
                                    raised
                                    size={10}
                                    name='share-2'
                                    type='feather'
                                    color={'black'}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )

    }

}

const shadow = StyleSheet.create({
    txtSh: {}
});