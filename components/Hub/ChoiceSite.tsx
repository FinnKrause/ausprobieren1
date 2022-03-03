import React, { VoidFunctionComponent } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { BackgroundColor, ContrastColor, SchriftAufKontrast, Schriftfarbe, SecoundBackground } from "../Grundsachen/Colors";
import Header from "../Grundsachen/Header";
import ReturnButton from "../returnButton/returnButton";

interface Choice {
    title: string;
    onClick: () => void
}

interface Props {
    title: string;
    Choices: Choice[];
    onReturn: () => void;
}

const ChoiceSite: React.FC<Props> = (Props): JSX.Element => {
    return (
        <View style={styles.Site}>
            <Header title={Props.title} onReturn={Props.onReturn}></Header>
            <View style={{ marginTop: 40, alignItems: "center" }}>
                {Props.Choices.map((i, idx) => (
                    <TouchableOpacity key={idx} style={styles.Option} onPress={i.onClick}>
                        <Text style={styles.OptionText}>{i.title}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    Site: {
        backgroundColor: BackgroundColor,
        height: "100%",
        width: "100%",
    },
    top: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: ContrastColor,
        height: 50,
    },
    Header: {
        fontSize: 20,
        color: SchriftAufKontrast,
        fontWeight: "bold"
    },
    Option: {
        backgroundColor: SecoundBackground,
        borderRadius: 5,
        marginBottom: 20,
        height: 60,
        justifyContent: "center",
        width: "90%",
    },
    OptionText: {
        color: Schriftfarbe,
        fontSize: 20,
        marginLeft: 20,
        textAlign: "center",
        textTransform: "lowercase"
    }
})

export default ChoiceSite;