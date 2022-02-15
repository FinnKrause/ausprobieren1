import React, { useEffect, useState } from "react";
import {Text, View, ScrollView, StyleSheet} from "react-native";
import { Schriftfarbe } from "../Grundsachen/Colors";

interface Props {

}

const Logins:React.FC<Props> = (Props: Props):JSX.Element => {

    const [userData, setUserData] = useState<Array<any> | undefined>(undefined)

    useEffect(() => {
        fetch("https://api.klasse10c.de/getUserData/app").then(res => res.json()).then((response) => {
            if (!response) return;
            setUserData(response)
        })
    }, [])

    return (
        <View style={style.Container}>
            <Text style={[style.text, {fontSize: 40, padding: 20, marginTop: 100}]}>Logins</Text>
            <View style={style.column}>
                <Text style={[style.columnItem, {borderWidth: 0}]}></Text>
                <Text style={style.columnItem}>Main Seite aufgerufen</Text>
                <Text style={style.columnItem}>Statusseite aufgerufen</Text>
            </View>
            {userData && userData.sort((a,b) => {
                if (a.views > b.views) return -1;
                else return 1;
            }).map((i, idx) => {
                return <View key={idx} style={style.column}>
                    <Text style={style.columnItem}>{i.name}</Text>
                    <Text style={style.columnItem}>{i.views}</Text>
                    <Text style={style.columnItem}>{i.statusPage}</Text>
                </View>
            })}
        </View>
    );
}

const style = StyleSheet.create({
    Container: {
        width: "100%"
    },
    text: {
        color: Schriftfarbe,
        textAlign: "center",

    },
    column: {
        width: "90%",
        maxWidth: 700,
        height: 60,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "auto",
        marginRight: "auto"
    },
    columnItem: {
        flex: 1,
        color: Schriftfarbe,
        borderColor: "white",
        height: "100%",
        textAlign: "center",
        textAlignVertical: "center",
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
    },
})

export default Logins;