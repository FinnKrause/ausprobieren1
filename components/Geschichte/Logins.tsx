import React from "react";
import {Text, View, ScrollView, StyleSheet} from "react-native";
import { Schriftfarbe } from "../Grundsachen/Colors";
import UserLoginRow from "./UserLoginRow";

interface Props {
    userData:any;
    setTopLayer: (newVal: JSX.Element|undefined) => void
    setUserData: (newData:any) => void
}

interface IPData {
    message?:string, 
    ip: string, 
    videoClicks?:number,
    country: string,
    regionName:string,
    city: string, 
    zip:string
}

interface UserData {
    name: string, views: number, videoClicks?:number, statusPage: number, ViewIPs: Array<IPData>
}

const Logins:React.FC<Props> = (Props: Props):JSX.Element => {
    
    return (
        <View style={style.Container}>
            <Text style={[style.text, {fontSize: 40, padding: 20, marginTop: 100}]}>Logins</Text>
            <View style={style.column}>
                <Text style={[style.columnItem, {borderWidth: 0}]}></Text>
                <View style={style.columnItem}><Text style={{color: Schriftfarbe}}>Mainseite aufgerufen</Text></View>
                <View style={style.columnItem}><Text style={{color: Schriftfarbe}}>Statusseite aufgerufen</Text></View>
                <View style={style.columnItem}><Text style={{color: Schriftfarbe}}>Videobutton gedrückt</Text></View>
            </View>
            {Props.userData && Props.userData.sort((a:any,b:any) => {
                if (a.views > b.views) return -1;
                else return 1;
            }).map((i:UserData, idx:number) => {
                return <View key={idx} style={style.column}>
                    <UserLoginRow key={idx} i={i} setTopLayer={Props.setTopLayer}></UserLoginRow>
                </View>
            })}
        </View>
    );
}

const style = StyleSheet.create({
    Container: {
        width: "100%",
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
        borderColor: "gray",
        borderWidth: 1,
        height: "100%",
        

        display: "flex",
        justifyContent: "center",
        alignItems: "center",        
    },
})

export default Logins;
export {UserData, IPData}