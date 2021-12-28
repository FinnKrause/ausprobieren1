import React, { useEffect, useState } from "react";
import { BackgroundColor, ContrastColor, ContrastToBackgroundColor, SchriftAufKontrast, Schriftfarbe } from "../Grundsachen/Colors";
import { View, Text, Button, StyleSheet, Image, ScrollView, Linking, TouchableOpacity } from "react-native";
import UserDataPage from "../UserDataPage/UserDataPage";
import Kachel from "./Kachel";
import ReturnButton from "../returnButton/returnButton";

interface Props {

}

interface Kachel {
    image: any,
    text: string;
    onClick: () => void;
}

const Hub: React.FC<Props> = (Props): JSX.Element => {

    const [topLayer, setTopLayer] = useState<JSX.Element | undefined>();
    const [setting, setSettings] = useState<boolean>();
    const Kacheln: Kachel[] = [
        { text: "User Data", image: require("../../assets/data.png"), onClick: () => setTopLayer(<UserDataPage goBack={() => { setTopLayer(undefined) }}></UserDataPage>) },
        { text: "Admin Web Page", image: require("../../assets/admin.png"), onClick: () => { } }, //Linking.openURL("https://finnkrause.com/?Sprachentable=true&h=secret&p=jsonwebtoken4finn").catch(err => alert(err)) 
        { text: "Admin Web Page", image: require("../../assets/grafana.png"), onClick: () => { } },
    ]

    return (
        <View style={styles.HubWrapper}>
            {topLayer && <View>{topLayer}</View>}

            {setting && <View style={sstyle.body}>
                <ReturnButton isAbsolute={false} onReturnButtonPress={() => setSettings(false)}></ReturnButton>
                <TouchableOpacity>
                    <Text style={sstyle.text}>Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={sstyle.text}>Logout</Text>
                </TouchableOpacity>
            </View>}

            {!topLayer && <View style={styles.HubWrapper}>
                <View style={styles.TopBar}>
                    <TouchableOpacity onPress={() => setSettings(true)}>
                        <Image source={require("../../assets/Finn.jpg")} style={styles.ProfilePicture}></Image>
                    </TouchableOpacity>

                    <View style={styles.Admin}>
                        <Text style={{ color: SchriftAufKontrast, fontWeight: "bold", marginRight: 20 }}>ADMIN</Text>
                    </View>
                </View>
                <ScrollView>
                    <View style={styles.Kacheln}>
                        {Kacheln.map((i, idx) => <Kachel key={idx} image={i.image} text={i.text} onClick={i.onClick}></Kachel>)}
                    </View>
                </ScrollView>
            </View>}
        </View >
    );

}

const sstyle = StyleSheet.create({
    body: {
        position: "absolute",
        backgroundColor: ContrastToBackgroundColor,
        borderRadius: 20,
        zIndex: 10,

        width: "90%",
        maxWidth: 800,
        height: "90%",
        maxHeight: 700,

        alignSelf: "center",
        bottom: 1,
    },
    text: {
        color: Schriftfarbe
    },
});

const styles = StyleSheet.create({
    HubWrapper: {
        height: "100%",
    },
    TopBar: {
        flexDirection: "row",
        justifyContent: "space-between",

        height: 50,
        width: "95%",
        alignSelf: "center",
        borderRadius: 25,
        backgroundColor: ContrastColor,
        marginTop: 20,
    },
    ProfilePicture: {
        height: 45,
        width: 45,
        borderRadius: 45 / 2,
        marginTop: 2.5,
        marginLeft: 10,
    },
    Admin: {
        display: "flex",
        justifyContent: "center"
    },
    Kacheln: {
        width: "100%",
        minHeight: "100%",

        marginTop: 20,

        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",

        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",

        overflow: "visible",
    }
});

export default Hub;