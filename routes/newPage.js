import { createStackNavigator } from "react-navigation-stack";
import Home from '../App';

const screens = {
    Home: {
        screen: Home
    },
    ExerciseList: {

    }
}

const homeStack = createStackNavigator({screens});

export default createAppContainer(homeStack);