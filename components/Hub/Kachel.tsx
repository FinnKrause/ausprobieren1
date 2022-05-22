import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, TouchableNativeFeedbackBase } from "react-native";
import { TouchableRipple } from "react-native-paper";
import { ContrastColor, SchriftAufKontrast, DarkerContrast, SecoundContrast, SchriftAufSecoundContrast, DarkerSecoundContrast } from "../Grundsachen/Colors";

interface Props {
    text: string;
    image: any;
    onClick: () => void;
}

const Kachel: React.FC<Props> = (Props:Props): JSX.Element => {
    return (
        <View style={styles.KachelBody}>
            <View style={styles.top}>
                <Image source={Props.image} style={styles.image}></Image>
            </View>
            <TouchableRipple style={styles.bottom} onPress={Props.onClick}>
                <Text style={styles.Text}>{Props.text}</Text>
            </TouchableRipple>
        </View>
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
        width: "100%",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        alignItems: "center",
        backgroundColor: ContrastColor
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