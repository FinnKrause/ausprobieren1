import React from "react";
import {StyleSheet, View, Text, TextInput, Button, TouchableOpacity, Image, Dimensions} from "react-native";
import { AlertColor, BackgroundColor, ContrastColor, DarkerContrast, PlaceHolderColor, SchriftAufKontrast, SchriftAufSecoundContrast, Schriftfarbe, SecoundBackground } from "../Grundsachen/Colors";

interface Props {
    data: Array<{date: string, header: string, content: string}>
    setData: (data: Array<{date: string, header: string, content: string}>) => void
    locked: boolean,
    sendNewData: (which: {tableData?: boolean, berlinTour?: boolean}) => void
    canUploadNew: boolean
}

const BerlinTour:React.FC<Props> = (Props: Props):JSX.Element => {
    return (
        <View style={styles.BerlinTourWrapper}>
            <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                <Text style={styles.BigText}>Abfahrt</Text>
                {Props.canUploadNew && !Props.locked && <TouchableOpacity onPress={() => Props.sendNewData({berlinTour: true})}><Image source={require("../../assets/save.png")} style={{height: 20, aspectRatio: 17/11}}></Image></TouchableOpacity>}
            </View>
            {Props.data.map((i, idx) => (               
                <View key={idx} style={styles.BerlinTourItem}>
                    <View style={{width: "100%", display: "flex", flexDirection: (Dimensions.get("window").width > 500 ? "row" : "column")}}>
                        <TextInput style={styles.TextInput} placeholderTextColor={PlaceHolderColor} placeholder="Datum/Uhrzeit" defaultValue={i.date} editable={!Props.locked} multiline value={Props.data[idx].date} onChangeText={e => {
                            let data = [...Props.data];
                            data[idx].date = e;
                            Props.setData(data)
                        }}></TextInput>
                        <TextInput style={styles.TextInput} placeholderTextColor={PlaceHolderColor} placeholder="Überschrift" defaultValue={i.header} editable={!Props.locked} multiline value={Props.data[idx].header} onChangeText={e => {
                        let data = [...Props.data];
                        data[idx].header = e;
                        Props.setData(data)
                        }}></TextInput>
                    </View>
                    <TextInput style={styles.TextInput} placeholderTextColor={PlaceHolderColor} placeholder="Beschreibung" defaultValue={i.content} editable={!Props.locked} multiline value={Props.data[idx].content} onChangeText={e => {
                       let data = [...Props.data];
                       data[idx].content = e;
                       Props.setData(data)
                    }}></TextInput>
                    {!Props.locked && <TouchableOpacity style={styles.Del} onPress={() => {
                        Props.setData(Props.data.filter((_,idxx) => idxx!==idx))
                    }}><Text style={styles.DelText}>DELETE</Text></TouchableOpacity>}
                </View>
            ))}
            
            {!Props.locked && <View>
                <TouchableOpacity onPress={() => {
                    let temp = [...Props.data]
                    temp.push({date: "", header: "", content: ""})
                    Props.setData(temp)
                }} style={styles.AddEntrie}><Text style={styles.BigText}>+</Text></TouchableOpacity>
            </View>}

            <Text style={[styles.BigText, {paddingTop: 10}]}>Ankunft-Zuhause</Text>
            
        </View>
    );
}

const styles = StyleSheet.create({
    TextStyle: {
        color: Schriftfarbe
    },
    BigText: {
        color: Schriftfarbe,
        fontSize: 20,
    },
    Del: {
        position: "absolute",
        right: 10,
        top: 10,
    },
    DelText: {
        color: AlertColor
    },
    AddEntrie: {
        height: 100,
        marginTop: 10,
        backgroundColor: SecoundBackground,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    TextInput: {
        textAlignVertical: "center",
        color: Schriftfarbe,
        margin: 5,
        padding: 10,
        paddingTop: 10,

        backgroundColor: BackgroundColor,
        borderRadius: 2.5,
    },
    BerlinTourItem: {
        minHeight: 50,
        width: "100%",
        marginVertical: 10,
        backgroundColor: SecoundBackground,
        position: "relative",
        padding: 5,
    },
    BerlinTourWrapper: {
        marginVertical: 100,
        maxWidth: 700,
        width: "90%",

        display: "flex",
        justifyContent: "center",
    }
})

export default BerlinTour;