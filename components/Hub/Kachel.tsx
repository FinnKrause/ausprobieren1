import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { ContrastColor, SchriftAufKontrast, DarkerContrast, SecoundContrast, SchriftAufSecoundContrast, DarkerSecoundContrast } from "../Grundsachen/Colors";

interface Props {
    text: string;
    image: any;
    onClick: () => void;
}

const Kachel: React.FC<Props> = (Props): JSX.Element => {
    return (
        <TouchableOpacity style={styles.KachelBody} onPress={Props.onClick}>
            <View style={styles.top}>
                <Image source={Props.image} style={styles.image}></Image>
            </View>
            <View style={styles.bottom}>
                <Text style={styles.Text}>{Props.text}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    KachelBody: {
        height: 200,
        width: "89%",
        maxWidth: 450,

        backgroundColor: ContrastColor,
        borderRadius: 20,

        marginBottom: 20,
        marginHorizontal: 10,

        justifyContent: "center",
        alignItems: "center",
    },
    top: {
        backgroundColor: DarkerContrast,
        width: "100%",
        height: 130,

        justifyContent: "center",
        alignItems: "center",

        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    bottom: {

    },
    image: {
        maxHeight: 120,
        maxWidth: 230,
        resizeMode: "cover",

    },
    Text: {
        color: SchriftAufKontrast,
        fontSize: 20,
        padding: 20,
        fontWeight: "bold",
        textTransform: "uppercase",
    }
});

export default Kachel;