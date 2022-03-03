import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Schriftfarbe } from "../Grundsachen/Colors";
import Details from "./Details";
import {UserData} from "./Logins";

interface Props {
    i:UserData
    setTopLayer: (newVal: JSX.Element|undefined) => void
}

const UserLoginRow:React.FC<Props> = (Props:Props):JSX.Element => {

    return (
        <View style={{width: "100%"}}>
            <View style={style.column}>
                <Text style={style.columnItem}>{Props.i.name}</Text>
                <Text style={style.columnItem}>{Props.i.views}</Text>
                <Text style={style.columnItem}>{Props.i.statusPage}</Text>
                <Text style={[style.columnItem, {color: (():string=>{
                    if (!Props.i.ViewIPs) return Schriftfarbe
                    for (let i = 0; i < Props.i.ViewIPs.length; i++) {
                        const el = Props.i.ViewIPs[i].city
                        if (el === "Berlin") return "red"
                    }
                    return Schriftfarbe
                })()}]} onPress={() => {
                    if (!Props.i.videoClicks) return;
                    Props.setTopLayer(<Details returnToHub={() => Props.setTopLayer(undefined)} i={Props.i}></Details>)
                }}>{Props.i.videoClicks ?? "0"}</Text>
            </View>
        </View>
        );
}

const style = StyleSheet.create({
    column: {
        width: "100%",
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
    }
})

export default UserLoginRow;