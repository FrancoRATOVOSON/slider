import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import {
    createStackNavigator,
    StackScreenProps,
} from "@react-navigation/stack";

import Home from "./../Pages/Home";
import Command from "./../Pages/Command";

type StackParamList = {
    Accueil: {} | undefined;
    Command: {} | undefined;
};

export type Props = StackScreenProps<StackParamList>;

const Stack = createStackNavigator();

export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Accueil">
                <Stack.Screen name="Accueil" component={Home} />
                <Stack.Screen name="Command" component={Command} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
