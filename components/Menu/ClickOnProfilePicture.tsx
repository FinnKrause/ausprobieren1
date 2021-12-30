import React from "react";
import { TouchableOpacity, View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { SecoundBackground, Schriftfarbe, BackgroundColor, AlertColor } from "../Grundsachen/Colors";
import ReturnButton from "../returnButton/returnButton";
import Menubutton from "./Menubutton"


interface Props {
    setSettings: (newval: boolean) => void
    removeLogin: () => void
}

const isBig = Dimensions.get("window").width > 1000;

const ClickOnProfilePicture: React.FC<Props> = (Props): JSX.Element => {
    return (
        <View style={style.body}>
            <ReturnButton isAbsolute={true} onReturnButtonPress={() => Props.setSettings(false)}></ReturnButton>

            <View style={style.actualContent}>
                <View style={style.Top}>
                    <Image source={require("../../assets/Finn.jpg")} style={style.ProfilePictureBig} />
                    <Text style={{ textAlign: "center", fontSize: 15, marginTop: 10, color: Schriftfarbe }}>Angemeldet als: <Text style={{ fontWeight: "bold", color: Schriftfarbe }}>Finn Krause</Text></Text>
                </View>
                <View style={style.Bottom}>
                    <Menubutton onPress={() => { }} text="Settings" />
                    <Menubutton onPress={Props.removeLogin} customTextStyle={{ color: AlertColor, fontWeight: "bold", letterSpacing: 4 }} text="LOGOUT" isLast />
                </View>
            </View>
        </View >
    );
}

export default ClickOnProfilePicture;

const style = StyleSheet.create({
    body: {
        position: "absolute",
        backgroundColor: BackgroundColor,
        borderRadius: 20,
        zIndex: 10,

        width: "100%",
        height: "100%",

        alignSelf: "center",
        bottom: 1,
    },
    actualContent: {
        height: "100%",
        width: "100%",
        flex: 1,
        alignItems: "center",
    },
    ProfilePictureBig: {
        height: 200,
        width: 200,
        borderRadius: 200,
        alignSelf: "center",
        marginTop: 100,
    },
    Top: {
    },
    Bottom: {
        height: "100%",
        width: "80%",
        alignItems: "center",
        maxWidth: 600,
        marginTop: 50,
    },
    text: {
        color: Schriftfarbe
    },
});
