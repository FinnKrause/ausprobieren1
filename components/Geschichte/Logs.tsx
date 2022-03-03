import React, { useState } from "react";
import { StyleSheet, View, Text, Touchable, TouchableOpacity } from "react-native";
import { Schriftfarbe, SecoundBackground } from "../Grundsachen/Colors";

interface Props {
    logs: Array<{date:string,message:string}>|undefined
}

const Logs:React.FC<Props> = (Props:Props):JSX.Element => {
    const [lenght, setLength] = useState<number>(5)

    return (
        <View style={style.container}>
            <Text style={style.Header}>Logs</Text>
            {Props.logs && [...Props.logs].slice(0,lenght).map((i:{date:string, message:string}, idx:number) => 
                <View style={style.row}>
                    <Text style={[style.text, {fontWeight: "bold"}]}>{i.date}</Text>
                    <Text style={style.text}>{i.message.replace("\x1b[35m", "").replace("\x1b[0m","")}</Text>
                    <Text style={style.text}>{}</Text>
                </View>
            )}
            <TouchableOpacity onPress={() => setLength(lenght+5)}><Text style={{color: Schriftfarbe}}>View more</Text></TouchableOpacity>
        </View>
    );
}

export default Logs;

const style = StyleSheet.create({
    Header: {
        fontSize: 20,
        color: Schriftfarbe,
        marginBottom: 20,
    },
    container: {
        width: "90%",
        marginTop: 40,
        borderRadius: 10,
        padding: 10,
        overflow: "hidden",
        backgroundColor: SecoundBackground,
    },
    text:  {
        color: Schriftfarbe
    },
    row: {
        flexDirection: "column"
    }
})