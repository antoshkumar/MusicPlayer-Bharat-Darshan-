import React,{useState} from 'react'
import { View, Text, StyleSheet, Image,FlatList, } from 'react-native'
import {Checkbox} from 'react-native-paper'

const Subscription = () => {    
    const [checked, setChecked] = React.useState(true);
    return (
        <View style={styles.Conatiner}>
            <View style={styles.MainContainer}>
                <View style={styles.AppBarView}>
                    <Image source={require('../assets/back.png')} style={styles._BackIcon} />
                    <Text style={styles.AppTitle}>Podcast</Text>
                    <Image source={require('../assets/bell.png')} style={styles._BellIcon} />
                    <Image source={require('../assets/dotted-line.png')} style={styles._Dotted_Line_Icon} />
                </View>
                <View style={styles._imageView}>
                    <Image source={require('../assets/shiv.jpg')} style={styles._image} />
                </View>
            </View>
            <View style={styles._audioControlView}>

                <Text style={styles._audioSpeedTxt}>Sleep Timer</Text>
                <View style={{ marginTop: 30 }}>
                    <View style={styles._audioSpeedFormatView}>
                        <Text style={styles._speedtxt}>Off</Text>
                        <Checkbox 
                           status={checked ? 'checked' : 'unchecked'}
                           onPress={() => {
                             setChecked(!checked);
                           }}
                        />
                    </View>
                    <View style={styles._audioSpeedFormatView}>
                        <Text style={styles._speedtxt}>15 Minutes</Text>
                        <Checkbox 
                       
                        />
                    </View>
                    <View style={styles._audioSpeedFormatView}>
                        <Text style={styles._speedtxt}>30 Minutes</Text>
                        <Checkbox 
                       
                        />
                    </View>
                    <View style={styles._audioSpeedFormatView}>
                        <Text style={styles._speedtxt}>60 Minutes</Text>
                        <Checkbox 
                       
                        />
                    </View>
                </View>
            </View>
           

        </View>
    )
}

export default Subscription;


const styles = StyleSheet.create({
    Conatiner: {
        flex: 1,
    },
    MainContainer: {
        height: 350,
        backgroundColor: 'black',
        opacity: 0.6
    },
    AppBarView: {
        height: 55,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    _BackIcon: {
        height: 25,
        width: 25,
        marginLeft: 8,
    },
    AppTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 115,

    },
    _BellIcon: {
        height: 15,
        width: 20,
        marginLeft: 80,
        resizeMode: 'contain'
    },
    _Dotted_Line_Icon: {
        height: 15,
        width: 20,
        marginLeft: 10,
        resizeMode: 'contain'
    },
    _imageView: {
        height: 250,
        width: '75%',
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    _image: {
        height: '100%',
        width: '100%',
        borderRadius: 15
    },
    _audioControlView: {
        height: 400,
        width: '100%',
        backgroundColor: 'white',
        bottom: 25,
        borderRadius: 25
    },
    _audioSpeedTxt: {
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center',
        paddingTop: 10,
        color: 'black'
    },
    _audioSpeedFormatView: {
        height: 50,
        width: '75%',
        alignSelf: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    _speedtxt: {
        fontWeight: '600',
        color:'black'

    }
})