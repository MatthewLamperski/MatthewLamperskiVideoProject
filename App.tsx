import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/navigation/screens/Home';
import VideoDetail from './src/navigation/screens/VideoDetail';
import {useIsDarkMode} from './src/hooks/useIsDarkMode';
import {RootStackParams} from './src/navigation/types';
import {theme} from './src/constants';

const Stack = createNativeStackNavigator<RootStackParams>();
function App(): JSX.Element {
  const isDarkMode = useIsDarkMode();
  const {colors} = theme;
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerLargeTitle: true,
            headerTitle: 'Home',
            headerStyle: {
              backgroundColor: isDarkMode
                ? colors.background.dark
                : colors.background.light,
            },
            headerTitleStyle: {
              color: isDarkMode ? 'white' : 'black',
            },
          }}
          name="Home"
          component={Home}
        />
        <Stack.Screen
          options={{header: () => null}}
          name="VideoDetail"
          component={VideoDetail}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
