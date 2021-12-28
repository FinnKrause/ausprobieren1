import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { ContrastColor, SchriftAufKontrast } from "../Grundsachen/Colors";

interface Props {
    text: string;
    image: any;
    onClick: () => void;
}

const Kachel: React.FC<Props> = (Props): JSX.Element => {
    return (
        <TouchableOpacity style={styles.KachelBody} onPress={Props.onClick}>
            <Image source={Props.image} style={styles.image}></Image>
            <Text style={styles.Text}>{Props.text}</Text>
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
        alignItems: "center"
    },
    image: {
        maxHeight: 130,
        maxWidth: 230,
    },
    Text: {
        color: SchriftAufKontrast,
        fontSize: 20,
        padding: 20,
    }
});

export default Kachel;