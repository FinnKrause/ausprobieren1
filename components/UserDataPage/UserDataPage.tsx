import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import OneIP from "./OneIP";
import ReturnButton from "../returnButton/returnButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Props {
    goBack: () => void
    token: string
}

enum DIRS {
    ESC = "ESC", DESC = "DESC"
}


const UserDataPage: React.FC<Props> = (Props: Props): JSX.Element => {

    const getFetchDir = () => {
        let returnValue: DIRS = DIRS.ESC;
        AsyncStorage.getItem("dir").then(value => {
            returnValue = (value === DIRS.DESC) ? DIRS.DESC : DIRS.ESC;
        });
        return returnValue
    }

    const [usrData, setUsrData] = useState<Array<{}>>([{}]);
    const [dir, setdir] = useState<DIRS>(getFetchDir());

    useEffect(() => {
        fetch(`https://api.finnkrause.com/userData/getData:${Props.token}`).then(response => response.json()).then(data => {
            setUsrData(data);
        })
    }, [])

    const deleteEntry = (ip: any) => {
        fetch(`https://api.finnkrause.com/userData/remove/${ip}/${Props.token}`).then(response => response.json()).then(data => {
            const tempData = { ...usrData };
            delete tempData[ip];
            setUsrData(tempData);
        })
    }

    const SortData = (a1: any, b1: any): number => {
        const a: any = usrData[a1];
        const b: any = usrData[b1];
        if ((dir === DIRS.DESC)) {
            if (a["lastlogin"] > b["lastlogin"]) return 1;
            else if (a["lastlogin"] < b["lastlogin"]) return -1;
            else return 0;
        } else {
            if (a["admin"] && b["admin"]) return 0;

            else if (!a["admin"] && !b["admin"]) {
                if (a["lastlogin"] >= b["lastlogin"]) return -1;
                else return 1;
            }
            else if ((a["admin"] && !b["admin"])) return -1;
            else return 1;
        }
    }

    return (
        <View style={style.mainview}>
            <ReturnButton isAbsolute={false} onReturnButtonPress={Props.goBack} customStyle={{ marginTop: 40, marginLeft: 15, zIndex: 10 }}></ReturnButton>
            <ScrollView style={{ height: "100%", overflow: "scroll" }} contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}>
                {Object.keys(usrData).sort(SortData).map((key: any, idx: number) => {
                    const dateForThisIP = usrData[key];
                    return <OneIP key={idx} KeyValue={key} data={dateForThisIP}></OneIP>
                })}
            </ScrollView>
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