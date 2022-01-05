import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ContrastColor, SchriftAufKontrast } from "../Grundsachen/Colors";

interface Props {
    KeyValue: string
    data: any
}

const OneIP: React.FC<Props> = (Props): JSX.Element => {
    return (
        <View style={styles.OneIP}>
            <Text style={{ color: SchriftAufKontrast, marginBottom: 20, fontSize: 20 }}>
                {Props.KeyValue}
            </Text>
            <Text style={{ color: SchriftAufKontrast }}>
                {JSON.stringify(Props.data, null, 2)}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    OneIP: {
        height: undefined,
        width: "80%",
        backgroundColor: ContrastColor,
        marginBottom: 20,

    }
})

export default OneIP;
