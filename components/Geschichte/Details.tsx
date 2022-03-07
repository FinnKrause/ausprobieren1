import React, { useState } from "react";
import { View, StyleSheet, Text, ScrollView, TextInputComponent, TextInputBase, TextInput } from "react-native";
import Svg, { Circle, Line, Path } from "react-native-svg";
import { ContrastColor, DarkerContrast, PlaceHolderColor, Schriftfarbe, SecoundBackground, SecoundContrast } from "../Grundsachen/Colors";
import Header from "../Grundsachen/Header";
import ReturnButton from "../returnButton/returnButton";
import IP from "./IP";
import {UserData, IPData} from "./Logins";

interface Props {
    i: UserData
    returnToHub: () => void;
}

const Details:React.FC<Props> = (Props:Props):JSX.Element => {

    const [searchquerie, setSearchQuerie] = useState<string|null>(null);
    const [summary, setSummary] = useState<boolean>(true);

    const getStädte = (Array: IPData[]):Array<{text: {city: string, country:  string}, amount: number}> => {
        const newArr:Array<{text: {city: string, country:  string}, amount: number}> = []
        for (const data of Array) {
            const toStoreValue = {city: data.city, country: data.country};
            let index = null;
            for (let i = 0; i < newArr.length; i++) {
                if (newArr[i].text.city === toStoreValue.city) index=i;
            }
            if (index) {
                newArr[index].amount = newArr[index].amount+1;
            } else {
                newArr.push({text: toStoreValue, amount: 1})
            }
        }
        return newArr
    }

    return (
        <View>
            <Header title={Props.i.name} onReturn={Props.returnToHub}></Header>
            <ScrollView contentContainerStyle={style.IPs}>
                {!searchquerie && summary &&  Props.i.ViewIPs.length > 1 && <View style={style.summary}>
                    <Text style={{color: Schriftfarbe, fontSize: 20, padding: 10, fontWeight: "bold"}}>Summary</Text>
                    {getStädte(Props.i.ViewIPs).map((i, idx) => 
                        <Text key={idx} style={{color: Schriftfarbe, paddingHorizontal: 20}}>{`${i.text.city} (${i.amount})`}</Text>
                    )}
                    <View style={{marginTop: 30}}></View>
                    <Text style={{color: Schriftfarbe, padding: 10}} onPress={() => setSummary(false)}>Close Summary</Text>
                </View>}
                {Props.i.ViewIPs.length > 1 && <View style={style.SearchView}>
                    <View style={{width:"100%", backgroundColor: SecoundBackground, height: 45, marginTop: 10, borderRadius: 22.5, justifyContent: "space-between", alignItems: "center", flexDirection: "row"}} >
                        <TextInput placeholder="Suche" placeholderTextColor={PlaceHolderColor} style={{flex: 1, marginLeft: 40, color: Schriftfarbe}} onChangeText={(e) => {
                            setSearchQuerie(e.toLowerCase() || null)
                        }}></TextInput>
                        <Svg style={{marginHorizontal: 20}} width="30" height="30" viewBox="0 0 24 24" strokeWidth="1.5" stroke={ContrastColor} fill="none" strokeLinecap="round" strokeLinejoin="round"><Path stroke="none" d="M0 0h24v24H0z" fill="none"/><Circle cx="10" cy="10" r="7" /><Line x1="21" y1="21" x2="15" y2="15" /></Svg>
                    </View>
                </View>}
                {!searchquerie && Props.i.ViewIPs.map((i, idx) => <IP data={i} key={idx}></IP>)}

                {searchquerie && Props.i.ViewIPs.filter(a => {
                    if (!searchquerie) return true;
                    return a.city.toLowerCase().includes(searchquerie) || a.country.toLowerCase().includes(searchquerie) || a.ip.toLowerCase().includes(searchquerie) || a.regionName.toLowerCase().includes(searchquerie)
                }).map((i, idx) => <IP data={i} key={idx}></IP>)}
            </ScrollView>
        </View>
    );
    
}

const style = StyleSheet.create({
    summary:  {
        width: "90%",
        backgroundColor: DarkerContrast,
        marginTop: 20,
        borderRadius: 15,
    },
    SearchView:  {
        height: 50,
        width: "90%"
    },
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