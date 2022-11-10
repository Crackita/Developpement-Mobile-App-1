import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native";
import { Router } from "./src/routes/Router";

export default function App() {
    return (
      <NavigationContainer>
        <Router/>
      </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: "blue",
        fontSize: 50,
    },
});
