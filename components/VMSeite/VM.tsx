import React, { useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Linking } from "react-native";
import { VMStatus } from "../Hub/Hub";
import { SecoundBackground, ContrastColor, DarkerContrast, Schriftfarbe, PlaceHolderColor, SecoundContrast, SchriftAufSecoundContrast, DarkerSecoundContrast, SchriftAufKontrast } from "../Grundsachen/Colors";

interface Props {
    id: number,
    status: VMStatus;
    name: string;
    ViewURL: string;
    startURL: string;
    setOnlineStatus: (ID: number, status: VMStatus) => void
}

const Vm: React.FC<Props> = (Props): JSX.Element => {

    const styles = StyleSheet.create({
        All: {
            height: 180,
            width: "80%",
            maxWidth: 400,
            backgroundColor: SecoundBackground,
            margin: 10,
            alignSelf: "center",
            borderRadius: 15,
            overflow: "hidden",

        },
        Top: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            borderBottomWidth: 1,
            borderColor: PlaceHolderColor,
            backgroundColor: ContrastColor,
        },
        TopText: {
            color: SchriftAufKontrast,
            fontSize: 25,
            fontWeight: "bold",
        },
        Bottom: {
            height: "40%",
            position: "relative",
        },
        DownElements: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
        },
        TextDown: {
            textAlignVertical: "center",
            zIndex: 2,
            color: Schriftfarbe,
        }
    })

    const start = () => {
        fetch(Props.startURL).then(value => value.text()).then(data => data)
        Props.setOnlineStatus(Props.id, VMStatus.STARTING);
    }

    return (
        <View style={styles.All}>
            <View style={styles.Top}>
                <Text style={styles.TopText}>{Props.name}</Text>
            </View>
            <View style={styles.Bottom}>

                {(Props.status === VMStatus.NOTCHECKED) && <View style={styles.DownElements}>
                    <Text style={styles.TextDown}>Loading...</Text>
                </View>}

                {(Props.status === VMStatus.STARTING) && <View style={[styles.DownElements, { flexDirection: "row" }]}>
                    <View style={{ backgroundColor: "purple", height: 20, width: 20, borderRadius: 10, marginRight: 10 }}></View>
                    <Text style={styles.TextDown}>Starting...</Text>
                </View>}

                {(Props.status === VMStatus.ONLINE) && <View style={[styles.DownElements, { flexDirection: "row" }]}>
                    <View style={{ backgroundColor: "lightgreen", height: 20, width: 20, borderRadius: 10, marginRight: 10 }}></View>
                    <TouchableOpacity onPress={() => Linking.openURL(Props.ViewURL)}><Text style={styles.TextDown}>Launch in Browser</Text></TouchableOpacity>
                </View>}

                {(Props.status === VMStatus.OFFLINE) && <View style={{ flexDirection: "row", height: "100%" }}>
                    <View style={[styles.DownElements, { borderRightWidth: 1, borderColor: PlaceHolderColor, flexDirection: "row", justifyContent: "center" }]}>
                        <View style={{ backgroundColor: "red", height: 20, width: 20, borderRadius: 10, marginRight: 10 }}></View>
                        <Text style={styles.TextDown}>offline</Text>
                    </View>
                    <TouchableOpacity style={styles.DownElements} onPress={start}><Text style={styles.TextDown}>Start {Props.name}</Text></TouchableOpacity>
                </View>}

            </View>
        </View>
    );
}


export default Vm;