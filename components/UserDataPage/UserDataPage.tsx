import React, {useState, useEffect} from "react";
import {View, ScrollView, Text, StyleSheet, Button} from "react-native";
import ReturnButton from "../returnButton/returnButton";


interface Props {
    token: string;
    goBack: () => void
}

const UserDataPage:React.FC<Props> = (Props):JSX.Element => {

    const [data, setData] = useState<any>({});

    useEffect(() => {
        fetch("https://api.finnkrause.com/userData/getData:"+Props.token).then(res => res.json()).then(data => {
            setData(data);
        }).catch(err => {})
    }, [])

    return (
        <View style={style.mainview}>
            <ReturnButton onReturnButtonPress={() => Props.goBack()}></ReturnButton>
            <ScrollView style={{marginTop: 100}}>
                {Array.from(Object.keys(data)).map((i, idx) => {
                const cd = data[i];
                return (
                    <View style={style.viewStyle} key={idx}>
                        <Text style={{ color: "black" }}>{i}</Text>
                        <Text style={{ backgroundColor: "dodgerblue", color: "white" }}>
                            {JSON.stringify(cd, null, 2)}
                        </Text>
                    </View>
                );
                })}
            </ScrollView>
        </View>
    );
} 

export default UserDataPage;

const style = StyleSheet.create({
    mainview: {
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        position: "relative",
    },
    viewStyle: {
        paddingTop: 10,
        paddingBottom: 10,
      },
    Scrollview: {
        display: "flex",
        alignContent: "center",

        height: "100%",
        width: "90%",
    },
    dataholder: {
        display: "flex",
        alignContent: "center",
        alignItems: "center",
    },
    header: {
        fontSize: 20,
        fontWeight: "700"
    },
    DataView: {
        backgroundColor: "blue"
    },
    TextInDataView: {
        color: "white"
    }
})