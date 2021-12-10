import React from 'react'
import {View,Text} from 'react-native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import ProfileScreen from '../Screens/ProfileScreen'
import HomeScreen from '../Screens/HomeScreen'
import TabNavigate from './TabNavigate'
import PlayerMusic from '../Screens/playerMusic'


const Stack=createNativeStackNavigator();

const StackNavigation=()=>{
    return(
       <NavigationContainer>
           <Stack.Navigator >
               <Stack.Screen name="TabNavigate" component={TabNavigate}  options={{headerShown:false}} /> 
               <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{headerShown:false}}/>
               <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}} />
               <Stack.Screen name="PlayerMusic" component={PlayerMusic} options={{headerShown:false}}/>
               {/* <Stack.Screen name="" component={} /> */}
               {/* <Stack.Screen name="" component={} /> */}
               {/* <Stack.Screen name="" component={} />  */}
           </Stack.Navigator>
       </NavigationContainer>
    )
}

export default StackNavigation;