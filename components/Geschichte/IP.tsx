import React from "react";
import {View, Text, StyleSheet} from "react-native";
import { ContrastColor, DarkerContrast, SchriftAufKontrast, Schriftfarbe } from "../Grundsachen/Colors";
import {IPData} from "./Logins";
import Svg, {Path, Line, Polyline} from "react-native-svg";


interface Props {
    data: IPData;
}   

const CITY = <Svg width="25" height="25" viewBox="0 0 24 24" strokeWidth="1.5" stroke={SchriftAufKontrast} fill="none" stroke-linecap="round" strokeLinejoin="round"><Path stroke="none" d="M0 0h24v24H0z" fill="none"/><Path d="M3 21v-13l9 -4l9 4v13" /><Path d="M13 13h4v8h-10v-6h6" /><Path d="M13 21v-9a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v3" /></Svg>
const COUNTRY = <Svg width="25" height="25" viewBox="0 0 24 24" strokeWidth="1.5" stroke={SchriftAufKontrast} fill="none" strokeLinecap="round" strokeLinejoin="round"><Path stroke="none" d="M0 0h24v24H0z" fill="none"/><Path d="M6 7h12a2 2 0 0 1 2 2v9a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-2a4 4 0 0 0 -8 0v2a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-9a2 2 0 0 1 2 -2" /></Svg>
const CLICKS = <Svg width="25" height="25" viewBox="0 0 24 24" strokeWidth="1.5" stroke={SchriftAufKontrast} fill="none" strokeLinecap="round" strokeLinejoin="round"><Path stroke="none" d="M0 0h24v24H0z" fill="none"/><Path d="M8 13v-8.5a1.5 1.5 0 0 1 3 0v7.5" /><Path d="M11 11.5v-2a1.5 1.5 0 0 1 3 0v2.5" /><Path d="M14 10.5a1.5 1.5 0 0 1 3 0v1.5" /><Path d="M17 11.5a1.5 1.5 0 0 1 3 0v4.5a6 6 0 0 1 -6 6h-2h.208a6 6 0 0 1 -5.012 -2.7l-.196 -.3c-.312 -.479 -1.407 -2.388 -3.286 -5.728a1.5 1.5 0 0 1 .536 -2.022a1.867 1.867 0 0 1 2.28 .28l1.47 1.47" /><Path d="M5 3l-1 -1" /><Path d="M4 7h-1" /><Path d="M14 3l1 -1" /><Path d="M15 6h1" /></Svg>
const ZIP = <Svg width="25" height="25" viewBox="0 0 24 24" strokeWidth="1.5" stroke={SchriftAufKontrast} fill="none" strokeLinecap="round" strokeLinejoin="round"><Path stroke="none" d="M0 0h24v24H0z" fill="none"/><Path d="M6 20.735a2 2 0 0 1 -1 -1.735v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2h-1" /><Path d="M11 17a2 2 0 0 1 2 2v2a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-2a2 2 0 0 1 2 -2z" /><Line x1="11" y1="5" x2="10" y2="5" /><Line x1="13" y1="7" x2="12" y2="7" /><Line x1="11" y1="9" x2="10" y2="9" /><Line x1="13" y1="11" x2="12" y2="11" /><Line x1="11" y1="13" x2="10" y2="13" /><Line x1="13" y1="15" x2="12" y2="15" /></Svg>
const AREA =<Svg width="25" height="25" viewBox="0 0 24 24" strokeWidth="1.5" stroke={SchriftAufKontrast} fill="none" strokeLinecap="round" strokeLinejoin="round"><Path stroke="none" d="M0 0h24v24H0z" fill="none"/><Polyline points="4 19 8 13 12 15 16 10 20 14 20 19 4 19" /><Polyline points="4 12 7 8 11 10 16 4 20 8" /></Svg>
const ALERT = <Svg width="25" height="25" viewBox="0 0 24 24" strokeWidth="1.5" stroke={SchriftAufKontrast} fill="none" strokeLinecap="round" strokeLinejoin="round"><Path stroke="none" d="M0 0h24v24H0z" fill="none"/><Path d="M14 3v4a1 1 0 0 0 1 1h4" /><Path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" /><Line x1="12" y1="17" x2="12.01" y2="17" /><Line x1="12" y1="11" x2="12" y2="14" /></Svg>


const IP:React.FC<Props> = (Props:Props):JSX.Element => {
    return (
        <View style={style.body}>
            <Text style={[style.text, style.ip]}>{Props.data.ip}</Text>
            <View style={style.data}>
                <View style={style.column}>   
                    <View style={style.Item}>
                        {CITY}
                        <Text style={[style.text, {color: (():string => {
                            if (Props.data.city === "Berlin") return "red";
                            else return Schriftfarbe;
                        })()}]}>City: {Props.data.city}</Text>
                    </View>
                    <View style={style.Item}>
                        {COUNTRY}
                        <Text style={[style.text]}>Country: {Props.data.country}</Text>
                    </View>                
                    <View style={style.Item}>
                        {CLICKS}
                        <Text style={[style.text]}>Clicks: {Props.data.videoClicks ?? 1}</Text>
                    </View>
                </View>
                <View style={style.column}>       
                    <View style={style.Item}>
                        {AREA}
                        <Text style={[style.text]}>Region: {Props.data.regionName ?? "None"}</Text>
                    </View>
                    <View style={style.Item}>
                        {ZIP}
                        <Text style={[style.text]}>ZIP-Code: {Props.data.zip ?? "None"}</Text>
                    </View>  
                    <View style={style.Item}>
                        {ALERT}
                        <Text style={[style.text]}>{Props.data.message ?? "No Errors"}</Text>
                    </View>          
                </View>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    body:  {
        width: "90%",
        maxWidth: 400,
        backgroundColor: ContrastColor,
        marginBottom: 30,
        borderRadius: 10,
        overflow: "hidden",
        margin: 30,
    },
    column:  {
        justifyContent: "space-around"
    },
    Item: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        height: 40,
    },
    text:  {
        color: Schriftfarbe,
        padding: 3,
        paddingTop: 5,
    },
    data: {
        padding: 10,
        justifyContent: "space-around",
        flexDirection: "row",
        backgroundColor: DarkerContrast,
    },
    ip: {
        fontSize: 25,
        padding: 10,
        fontWeight: "bold",
        textAlign: "left"
    }
})

export default IP;