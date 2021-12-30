import React from "react";
import { TouchableOpacity, View, Text, StyleSheet, StyleProp, TextStyle } from "react-native";
import { SecoundBackground, Schriftfarbe, BackgroundColor, AlertColor } from "../Grundsachen/Colors";


interface Props {
    text: string
    customTextStyle?: StyleProp<TextStyle>,
    onPress: () => void
    isLast?: boolean
}
const Menubutton: React.FC<Props> = (Props): JSX.Element => {
    const style = StyleSheet.create({
        Button: {
            width: "100%",
            backgroundColor: SecoundBackground,
            borderRadius: 10,
            marginBottom: 10,
        },
        text: {
            lineHeight: 40,
            textAlign: "center",
            color: Schriftfarbe
        },
    })

    return (
        <TouchableOpacity onPress={Props.onPress} style={style.Button}>
            <Text style={[style.text, Props.customTextStyle]}>{Props.text}</Text>
        </TouchableOpacity>
    );

}


export default Menubutton;