import React, { useEffect, useState } from "react";
import { BackgroundColor, ContrastColor, SchriftAufKontrast } from "../Grundsachen/Colors";
import { View, Text, Button, StyleSheet, Image, ScrollView, Linking } from "react-native";
import UserDataPage from "../UserDataPage/UserDataPage";
import Kachel from "./Kachel";

interface Props {

}

interface Kachel {
    image: any,
    text: string;
    onClick: () => void;
}

const Hub: React.FC<Props> = (Props): JSX.Element => {

    const [topLayer, setTopLayer] = useState<JSX.Element | undefined>();
    const Kacheln: Kachel[] = [
        { image: require("../../assets/data.png"), onClick: () => setTopLayer(<UserDataPage goBack={() => { setTopLayer(undefined) }}></UserDataPage>), text: "User Data" },
        {
            image: require("../../assets/admin.png"), onClick: () => {
                Linking.openURL("https://finnkrause.com/?Sprachentable=true").catch(err => alert(err))
            }, text: "Admin Web Page"
        },
        { image: require("../../assets/admin.png"), onClick: () => setTopLayer(<UserDataPage goBack={() => { setTopLayer(undefined) }}></UserDataPage>), text: "Admin Web Page" },
        { image: require("../../assets/admin.png"), onClick: () => setTopLayer(<UserDataPage goBack={() => { setTopLayer(undefined) }}></UserDataPage>), text: "Admin Web Page" },
    ]

    useEffect(() => {

    })

    return (
        <View style={styles.HubWrapper}>
            {topLayer && <View>{topLayer}</View>}
            {!topLayer && <View style={styles.HubWrapper}>
                <View style={styles.TopBar}>
                    <Image source={require("../../assets/Finn.jpg")} style={styles.ProfilePicture}></Image>
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