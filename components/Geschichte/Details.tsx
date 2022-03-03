import React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import Header from "../Grundsachen/Header";
import ReturnButton from "../returnButton/returnButton";
import IP from "./IP";
import {UserData, IPData} from "./Logins";

interface Props {
    i: UserData
    returnToHub: () => void;
}

const Details:React.FC<Props> = (Props:Props):JSX.Element => {
    return (
        <View>
            <Header title={Props.i.name} onReturn={Props.returnToHub}></Header>
            <ScrollView contentContainerStyle={style.IPs}>
                {Props.i.ViewIPs.sort((a:IPData,b:IPData) => {
                    if (a.city==="Berlin" || a.regionName == "Land Berlin") return -1;
                    else if (b.city==="Berlin" || b.regionName == "Land Berlin") return 1;
                    else return 0;
                }).map((i, idx) => <IP data={i} key={idx}></IP>)}
            </ScrollView>
        </View>
    );
    
}

const style = StyleSheet.create({
    mainview: {
        position: "relative",
        display: "flex",
        height: "100%",
        width: "100%",
    },
    IPs: {
        width: "100%",
        flexDirection:"row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems:"center",
        paddingBottom: 200,
    }
})

export default Details;