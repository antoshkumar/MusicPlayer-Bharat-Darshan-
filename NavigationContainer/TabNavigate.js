import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/HomeScreen'
import ProfileScreen from '../Screens/ProfileScreen'
import MyOrderScreen from '../Screens/MyOrderScreen'
import DarsanScreen from '../Screens/DarsanScreen'
import SubscriptionScreen from '../Screens/SubscriptionScreen'
import { TouchableOpacity } from 'react-native-gesture-handler';
const Tab = createBottomTabNavigator();
const VipButton = ({ children, onPress }) => (
  <TouchableOpacity style={{ top: -20, justifyContent: 'center', alignItems: 'center' }} onPress={onPress}>
    <View style={{ width: 50, height: 50, borderRadius: 50, backgroundColor: '#ff9900' }}>
      {children}
    </View>
    <Text style={{ color: '#748c94', fontSize: 11, fontWeight: 'bold', marginTop: 15 }}>Darsan</Text>
  </TouchableOpacity>
);

export default function MyTab() {

  return (
    // <View>
    //  <NavigationContainer>
      <Tab.Navigator
        initialRouteName={"Home"}
        tabBarOptions={{
          showLabel: false,
          style: {
            position: 'absolute',
            // bottom: 75, left: 8, right: 8,
            elevation: 0,
            backgroundColor: 'white',
            borderRadius: 15,
            height: 80
          }
        }}

      >
        <Tab.Screen name="Home" component={HomeScreen} options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ justifyContent: 'center', alignContent: 'center' }}>
              <Image source={require('../assets/home.png')} resizeMode={"contain"} style={{ width: 25, height: 25, tintColor: focused ? '#e32f45' : '#748c94' }} />
              <Text style={{ color: focused ? '#e32f45' : '#748c94', fontSize: 10, fontWeight: 'bold' }}>Home</Text>
            </View>
          )
        }}
        />
        <Tab.Screen name="Profile" component={ProfileScreen} options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ justifyContent: 'center', alignContent: 'center' }}>
              <Image source={require('../assets/user.png')} resizeMode={"contain"} style={{ width: 25, height: 25, tintColor: focused ? '#e32f45' : '#748c94' }} />
              <Text style={{ color: focused ? '#e32f45' : '#748c94', fontSize: 10, fontWeight: 'bold' }}>Profile</Text>
            </View>
          )
        }}
        />
        <Tab.Screen name="Darsan" component={DarsanScreen} options={{
          tabBarIcon: ({ focused }) => (

            <Image source={require('../assets/vip.png')} resizeMode={"contain"} style={{ width: 30, height: 30, tintColor: 'white' }} />


          ),
          tabBarButton: (props) => (
            <VipButton {...props} />
          )


        }}
        />
        <Tab.Screen name="MyOrder" component={MyOrderScreen} options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ justifyContent: 'center', alignContent: 'center' }}>
              <Image source={require('../assets/layer.png')} resizeMode={"contain"} style={{ width: 25, height: 25, tintColor: focused ? '#e32f45' : '#748c94' }} />
              <Text style={{ color: focused ? '#e32f45' : '#748c94', fontSize: 10, fontWeight: 'bold' }}>MyOrder</Text>
            </View>
          )
        }}

        />
        <Tab.Screen name="Subscription" component={SubscriptionScreen} options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
              <Image source={require('../assets/clipboard.png')} resizeMode={"contain"} style={{ width: 25, height: 25, tintColor: focused ? '#e32f45' : '#748c94' }} />
              <Text style={{ color: focused ? '#e32f45' : '#748c94', fontSize: 10, fontWeight: 'bold' }}>Subscription</Text>
            </View>
          )
        }}
        />
      </Tab.Navigator>
    //   // play......................... *
    //   {/* <View style={styles.View_Card}>
    //     <View style={styles.Image_View}>
    //       <Image style={styles._Image}
    //         source={require('../assets/shiv.jpg')}
    //       />
    //     </View>
    //     <View style={styles.Title_View}>
    //       <View style={styles.Title_Container}>
    //         <Text style={styles.Title_Text}>Shiv sankar ko jisne ...</Text>
    //         <Text style={{ fontSize: 10, color: 'white' }}>The Ardhanarisvara concept co-mingles god Shiva</Text>
    //       </View>
    //     </View>
    //     <View style={styles.Play_Button_View}>
    //       <Image source={require('../assets/play-button.png')} style={styles._PlayButton} />
    //       <Image source={require('../assets/play-next-button.png')} style={styles._NextButton} />
    //     </View>
    //   </View> */}

    // // </NavigationContainer> 
    

  )

}

const styles = StyleSheet.create({

  View_Card: {
    height: 70,
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: '#262626'
  },
  Image_View: {
    height: 70,
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  _Image: {
    height: 55,
    width: '85%',
    resizeMode: 'cover',
    borderRadius: 5
  },
  Title_View: {
    height: 70,
    width: '48%',

  },
  Title_Container: {
    height: 80,
    width: '100%',
    marginTop: 10,
  },
  Title_Text: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'white',
  },
  RatingView: {
    height: 15,
    marginTop: 8,
    width: '25%',
    borderRadius: 8,
    marginLeft: 5,
    backgroundColor: '#00cc00',
    flexDirection: 'row',
  },
  Play_Button_View: {
    height: 70,
    width: '27%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  _PlayButton: {
    height: 30,
    width: 30,
    right: 10,
    resizeMode: 'contain',
    tintColor: '#ff9900'

  },
  _NextButton: {
    height: 18,
    width: 20,
    tintColor: 'white',
    resizeMode: 'contain'
  }

})