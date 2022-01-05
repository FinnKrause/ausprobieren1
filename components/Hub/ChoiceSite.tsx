import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { BackgroundColor, ContrastColor, SchriftAufKontrast, SecoundBackground } from "../Grundsachen/Colors";
import ReturnButton from "../returnButton/returnButton";

interface Choice {
    title: string;
    onClick: () => void
}

interface Props {
    title: string;
    Choices: Choice[];
}

const ChoiceSite: React.FC<Props> = (Props): JSX.Element => {
    return (
        <View style={styles.Site}>
            <ReturnButton isAbsolute onReturnButtonPress={() => { }} customStyle={{ top: 13, zIndex: 10 }}></ReturnButton>
            <View style={styles.top}>
                <Text style={styles.Header}>{Props.title}</Text>
            </View>
            <View style={{ marginTop: 40, alignItems: "center" }}>
                {Props.Choices.map((i, idx) => (
                    <View key={idx} style={styles.Option}>
                        <Text style={styles.OptionText}>{i.title}</Text>
                    </View>
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
        fontSize: 20,
        marginLeft: 20,
        textAlign: "center",
        textTransform: "lowercase"
    }
})

export default ChoiceSite;