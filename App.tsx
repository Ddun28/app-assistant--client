import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { StackRouter } from './src/router/StackRouter';
import { PaperProvider } from 'react-native-paper';


export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider theme={{ dark: true }}>
        <StackRouter />
      </PaperProvider>
    </NavigationContainer>
  );
}
