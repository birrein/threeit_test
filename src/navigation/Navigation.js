import 'react-native-gesture-handler';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import PollScreen from '../screens/PollScreen';
import ResultsScreen from '../screens/ResultsScreen';
import AboutScreen from '../screens/AboutScreen';

const Drawer = createDrawerNavigator();

export default function Navigation() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Poll"
        component={PollScreen}
        options={{title: 'Encuesta'}}
      />
      <Drawer.Screen
        name="Results"
        component={ResultsScreen}
        options={{title: 'Resultados'}}
      />
      <Drawer.Screen
        name="About"
        component={AboutScreen}
        options={{title: 'Acerca de'}}
      />
    </Drawer.Navigator>
  );
}
