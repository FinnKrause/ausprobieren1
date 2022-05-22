import React from "react";
import { View, Text, StyleSheet} from "react-native";
import ReturnButton from "../returnButton/returnButton";
import { ContrastColor, SchriftAufKontrast, SecoundBackground } from "./Colors";

interface Props {
    title:string;
    onReturn: () => void
}

const Header:React.FC<Props> =(Props:Props):JSX.Element => {
    return (
        <View style={styles.top}>
            <ReturnButton isAbsolute={false} onReturnButtonPress={Props.onReturn}></ReturnButton>
            <Text style={styles.Header}>{Props.title}</Text>
        </View>
    );
}

export default Header;

const styles = StyleSheet.create({
    top: {

        backgroundColor: SecoundBackground,
        flexDirection: "row",

        height: 50,
        borderRadius: 10,
        width: "90%",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: 20,

        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 30,

        marginBottom: 10,
    },
    Header: {
        fontSize: 20,
        color: SchriftAufKontrast,
        fontWeight: "bold",
        paddingRight: 20,
    },
})