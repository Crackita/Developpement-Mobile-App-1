import { useEffect, useState } from "react";
import {
    View,
    Image,
    ActivityIndicator,
    Text,
    StyleSheet,
    Animated,
    Dimensions,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Card_Height = 250;
const { height: wheight } = Dimensions.get("window");
export const height = wheight - 64;

export function Card({ pokemon, y, index }) {
    const [isLoading, setLoading] = useState(false);
    const [image, setImage] = useState("");
    const [pokemonId, setPokemonId] = useState("");

    const fetchDetails = async () => {
        try {
            const response = await fetch(pokemon.url);
            const json = await response.json();
            setImage(json.sprites.front_default);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const getPokemonId = () => {
        setPokemonId(pokemon.url.split("/")[6]);
    };

    const addToFavorites = async () => {
        try {
            let response = await AsyncStorage.getItem("favoritesPokmons");
            if (response !== null) {
                response = response.split(",");
            } else {
                response = [];
            }
            response.push(pokemonId);
            console.log(response);
            let unique = [...new Set(response)];
            console.log(unique);
            await AsyncStorage.setItem("favoritesPokmons", unique.toString());
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        console.log(index);
        fetchDetails();
        getPokemonId();
    }, []);

    const translateY = Animated.add(y, y.interpolate({
        inputRange: [0, 0.00001 + index * Card_Height],
        outputRange: [0, -index * Card_Height],
        extrapolateRight: "clamp",
    }));

    const position = Animated.subtract(index * Card_Height, y);

    const isDisappearing = -Card_Height;
    const isTop = 0;
    const isBottom = height - Card_Height;
    const isAppearing = height;
    const scale = position.interpolate({
        inputRange: [isDisappearing, isTop, isBottom, isAppearing],
        outputRange: [0.5, 1, 1, 0.5],
        extrapolateRight: "clamp"
    })
    const opacity = position.interpolate({
        inputRange: [isDisappearing, isTop, isBottom, isAppearing],
        outputRange: [0.5, 1, 1, 0.5],
    })

    return (
        <Animated.View
            style={[styles.container, { opacity, transform: [{ translateY }, { scale }] }]}
        >
            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <>
                    <Image
                        style={styles.image}
                        source={{ uri: image ? image : null }}
                    />
                    <Text style={styles.text}>
                        {pokemon.name.charAt(0).toUpperCase() +
                            pokemon.name.slice(1)}
                    </Text>
                    <Ionicons
                        onPress={addToFavorites}
                        name="star-outline"
                        size={32}
                        color="yellow"
                    />
                </>
            )}
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "black",
        borderRadius: 20,
        margin: 20,
        height: 210
    },
    image: {
        width: 200,
        height: 200,
    },
    text: {
        color: "white",
    },
});
