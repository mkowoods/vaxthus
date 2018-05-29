import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons'
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'

import firebase from 'firebase'
require('firebase/firestore')

import NavigationService from './src/NavigationService'

import {fetchPlants} from './src/actions'
import reducers from './src/reducers'

import PlantList from './src/components/PlantList'
import Settings from './src/components/Settings'
import Search from './src/components/Search'
import Detail from './src/components/Detail'
import CreatePlant from './src/components/CreatePlant'
import Camera from './src/components/Camera'

import {firebaseConfig} from './src/secret-config'

const store = createStore(
  reducers,
  applyMiddleware(thunk)
);


const HomeStack = createStackNavigator({
  Home: PlantList,
  Detail: Detail,
});

const Router = createBottomTabNavigator(
  {
    Home: HomeStack,    
    Camera: Camera,
    Search: Search,
    Settings: Settings,
    CreatePlant: CreatePlant,
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch(routeName){
          case 'Home':
            iconName = `ios-home${focused ? '' : '-outline'}`;
            break;
          case 'Settings':
            iconName = `ios-options${focused ? '' : '-outline'}`;  
            break;    
          case 'Search':
            iconName = `ios-search${focused ? '' : '-outline'}`;   
            break; 
          case 'CreatePlant':
            iconName = `ios-add-circle${focused ? '' : '-outline'}`;   
            break; 
          case 'Camera':
            iconName = `ios-camera${focused ? '' : '-outline'}`;
            break;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'green',
      inactiveTintColor: 'gray',
    },
  }
);


class App extends Component { 

  constructor(props){
    super(props);
    firebase.initializeApp(firebaseConfig);
    const firestore = firebase.firestore()
    firestore.settings({timestampsInSnapshots: true});
  }
    
  componentDidMount(){
    console.log('***** App Mounted ******');
    //this is sync and blocking
  }

  render(){
      return(
          <Provider store={store}>
              <Router ref={navigatorRef => {NavigationService.setTopLevelNavigator(navigatorRef)}} />
          </Provider>
      )
  }
}

export default App;