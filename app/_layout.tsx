import {useEffect} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from '@/hooks/useColorScheme';
import Home from './index'; 
import Details from './details';
import Cart from './Cart';
import { BookProvider } from './panier/bookProvider';
import Panier from './panier/panier';
import AddBook from './AddBooks';
import EditBook from './EditBook';


type RootStackParamList = {
  index: undefined;
  Details: { bookId: string }; 
  AddBook: undefined;
  EditBook: { bookId: string };
};

const Stack = createStackNavigator<RootStackParamList>();

SplashScreen.preventAutoHideAsync()
  .then(() => console.log('SplashScreen.preventAutoHideAsync() resolved'))
  .catch(console.warn);

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      console.log('Fonts loaded');
      const hideSplashScreen = async () => {
        await SplashScreen.hideAsync();
        console.log('SplashScreen.hideAsync() resolved');
      };

      setTimeout(hideSplashScreen, 3000);
    } else {
      console.log('Fonts not loaded yet');
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <BookProvider>
      <Stack.Navigator>
        <Stack.Screen
          name="index"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{ title: 'Book Details' }}
        />
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{ title: 'Panier' }}
        />
        <Stack.Screen
          name="Panier"
          component={Panier}
          options={{ title: 'Panier' }}
        />
        <Stack.Screen
          name="AddBook"
          component={AddBook}
          options={{ title: 'Add Book' }}
        />
        <Stack.Screen
          name="EditBook"
          component={EditBook}
          options={{ title: 'Edit Book' }}
        />
      </Stack.Navigator>
    </BookProvider>
  );
}
