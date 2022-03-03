import React, { useEffect, useState } from "react";
import {Text, View, ScrollView, StyleSheet, TouchableOpacity, Alert} from "react-native";
import { AlertColor, BackgroundColor, ContrastColor, DarkerContrast, Schriftfarbe, SecoundBackground } from "../Grundsachen/Colors";

interface Props {
    locked: boolean;
    posts: Array<any> | undefined;
    setPosts: (val: any) => void;
    reloadData: () => void
}

const Posts:React.FC<Props> = (Props: Props):JSX.Element => {

    return (
        <View style={style.Container}>
            {Props.posts && <Text style={[style.text, {fontSize: 40, padding: 20}]}>Auf der Warteliste</Text>}
            {Props.posts && Props.posts.map((i:any, idx:number) => {
                return <View key={idx} style={style.Post}>
                    <Text style={[style.text, {fontSize: 20, padding: 20}]}>{i.Überschrift}</Text>
                    <Text style={[style.text, {paddingLeft: 20, paddingRight:20, marginBottom: 30}]}>{i.Beschreibung}</Text>
                    <Text style={[style.text, {paddingLeft: 20, paddingRight:20, marginBottom: 30}]}>©️ {(i.user as string).substr(0,1).toUpperCase()+i.user.substr(1,i.user.lenght)}</Text>
                    {!Props.locked && <TouchableOpacity onPress={() => {
                        fetch("https://api.klasse10c.de/approvePost/"+i.Überschrift, {method: "POST"}).then(res=>res.json).then((response:any) => {
                            if (!response.error) alert("Successfully added \""+i.Überschrift+"\" to the Website!")
                            else alert("An error occured! #MicrosoftWarning")
                            Props.reloadData();

                        })
                    }} style={[style.button, {backgroundColor: ContrastColor}]}><Text style={[style.text, {fontWeight: "bold"}]}>Confirm</Text></TouchableOpacity>}
                    {!Props.locked &&  <TouchableOpacity onPress={() => {
                        fetch("https://api.klasse10c.de/declinePost/"+i.Überschrift, {method: "POST"}).then(res=>res.json).then((response:any) => {
                            if (!response.error) alert("Successfully removed!")
                            else alert("An error occured! #MicrosoftWarning")
                            Props.reloadData();
                        })
                    }} style={[style.button, {backgroundColor: AlertColor}]}><Text style={[style.text, {fontWeight: "bold"}]}>Reject</Text></TouchableOpacity>}
                    
                </View>
            })}
        </View>
    );
}

const style = StyleSheet.create({
    Container: {
        width: "90%",
        maxWidth: 700,
        marginTop: 100,
        marginBottom: 30,

        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
    },
    text: {
        color: Schriftfarbe,
        textAlign: "center",
    },
    Post:  {
        width: "100%",
        justifyContent: "space-between",
        backgroundColor: SecoundBackground, 
        borderRadius: 10,
        overflow: "hidden",
        marginBottom: 30,
    },
    button: {
        paddingTop: 20,
        paddingBottom: 20,
        justifyContent: "center",
        alignItems: "center",
    },
})

export default Posts;