import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
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
                <View style={style.columnItem}><Text style={{color: Schriftfarbe}}>{Props.i.name}</Text></View>
                <View style={style.columnItem}><Text style={{color: Schriftfarbe}}>{Props.i.views}</Text></View>
                <View style={style.columnItem}><Text style={{color: Schriftfarbe}}>{Props.i.statusPage}</Text></View>
                <TouchableOpacity style={style.columnItem} onPress={() => {
                    if (!Props.i.videoClicks) return;
                    Props.setTopLayer(<Details returnToHub={() => Props.setTopLayer(undefined)} i={Props.i}></Details>)
                }}><Text style={ {color: (():string=>{
                    if (!Props.i.ViewIPs) return Schriftfarbe
                    for (let i = 0; i < Props.i.ViewIPs.length; i++) {
                        const el = Props.i.ViewIPs[i].city
                        if (el === "Berlin") return "red"
                    }
                    return Schriftfarbe
                })()}}>{Props.i.videoClicks ?? "0"}</Text></TouchableOpacity>
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
        borderColor: "gray",
        borderWidth: 1,
        height: "100%",
        

        display: "flex",
        justifyContent: "center",
        alignItems: "center",        
    },
})

export default UserLoginRow;