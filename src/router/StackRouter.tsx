import { createStackNavigator } from "@react-navigation/stack"
import Auth from "../screens/auth/auth";
import Loading from "../screens/loading";
import Home from "../screens/home/home";
import { TeacherHome } from "../screens/home/teacher/TeacherHome";
import { StudentHome } from "../screens/home/student/StudentHome";

const Stack = createStackNavigator();
export const StackRouter = () => {
  return (
    <Stack.Navigator 
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Loading"
    >
      <Stack.Screen name="Loading" component={Loading} />
      <Stack.Screen name="Auth" component={Auth} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="TeacherHome" component={TeacherHome} />
      <Stack.Screen name="StudentHome" component={StudentHome} />
    </Stack.Navigator>
  )
}