import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import ReturnButton from "../returnButton/returnButton";

interface Props {
    goBack: () => void
}

const UserDataPage: React.FC<Props> = (Props: any): JSX.Element => {

    const [data, setData] = useState<any>({});

    return (
        <View style={style.mainview}>
            <ReturnButton onReturnButtonPress={Props.goBack} isAbsolute={false}></ReturnButton>
        </View>
    );
}

export default UserDataPage;

const style = StyleSheet.create({
    mainview: {
        position: "relative",
        display: "flex",
        height: "100%",
        width: "100%",
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