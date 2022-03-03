import React, { useEffect, useState } from "react";
import {StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, TextInput} from "react-native";
import {AlertColor, ContrastColor, Schriftfarbe, SecoundBackground } from "../Grundsachen/Colors";
import ReturnButton from "../returnButton/returnButton";
import {Lehrer} from "../Hub/Hub";
import { CheckBox } from "react-native-elements";
import Svg, {Path, Rect, Circle} from "react-native-svg";
import Logins from "./Logins";
import Posts from "./Posts";
import Logs from "./Logs";

interface Props {
    goHome: () => void
}

const openLock = <Svg width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke={ContrastColor} fill="none" stroke-linecap="round" stroke-linejoin="round"><Path stroke="none" d="M0 0h24v24H0z" fill="none"/><Rect x="5" y="11" width="14" height="10" rx="2" /><Circle cx="12" cy="16" r="1" /><Path d="M8 11v-5a4 4 0 0 1 8 0" /></Svg>
const closedLock = <Svg width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke={AlertColor} fill="none" stroke-linecap="round" stroke-linejoin="round"><Path stroke="none" d="M0 0h24v24H0z" fill="none"/><Rect x="5" y="11" width="14" height="10" rx="2" /><Circle cx="12" cy="16" r="1" /><Path d="M8 11v-4a4 4 0 0 1 8 0v4" /></Svg>

const GeschichteSeite:React.FC<Props> = (Props: Props):JSX.Element => {

    const [tableData, setTableData] = useState<Lehrer[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [canUploadNew, setCanUploadNew] = useState<boolean>(true);
    const [locked, setLocked] = useState<boolean>(true);

    const [userData, setUserData] = useState<Array<any> | undefined>(undefined)
    const [posts, setPosts] = useState<Array<any> | undefined>(undefined)
    const [logs, setLogs] = useState<Array<{date:string,message:string}>|undefined>(undefined);

    const [topLayer, setTopLayer] = useState<JSX.Element|undefined>();


    const getData = () => {
        setLoading(true)
        fetch("https://api.klasse10c.de/getTableData/app").then(res => res.json()).then((response:Lehrer[]) => {
            setTableData(response);
            setCanUploadNew(true);
            setLoading(false);
        }).catch(err => {
            setCanUploadNew(false);
        })
        fetch("https://api.klasse10c.de/getAllWaitingPosts/").then(res => res.json()).then((response) => {
            if (!response || JSON.stringify(response) === "[]") return;
            setPosts(response)
        })
        fetch("https://api.klasse10c.de/getUserData/app").then(res => res.json()).then((response) => {
            if (!response) return;
            setUserData(response)
        })
        fetch("https://api.klasse10c.de/getAllLogs/true").then(res => res.json()).then((response) => {
            if (!response || response.error) return;
            setLogs(response)
        })
    }

    const sendNewData = () => {
        if (locked) {
            alert("Unlock the site to publish new information!")
            return;
        }
        fetch("https://api.klasse10c.de/setTableData/app", {
            method: 'POST',
            headers : {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(tableData),
        }).then(res => res.text()).then(res => {
            if (res === "DONE") {alert("Tabelle erfolgreich geupdated!"); setCanUploadNew(true)}
            else {alert("Tabelle konnte nicht geupdatet werden!");  setCanUploadNew(false)}
        }).catch(err => {
            setCanUploadNew(false)
        })
    }

    useEffect(() => {
        getData();
        fetch("https://api.klasse10c.de/imon/app/true")
    }, [])

    return (
        <View style={{height: "100%", width: "100%"}}>
            {topLayer && <View style={{height: "100%", width: "100%"}}>
                {topLayer}
            </View>}

            {<View style={styles.controls}>
                <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center", marginRight: 10}}>
                    <ReturnButton onReturnButtonPress={Props.goHome} isAbsolute={false}></ReturnButton>
                </View>
                <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center", marginRight: 10}}>
                    {canUploadNew && !locked && <TouchableOpacity onPress={sendNewData}><Image source={require("../../assets/save.png")} style={{height: 27, aspectRatio: 17/11, marginRight: 20}}></Image></TouchableOpacity>}
                    <TouchableOpacity onPress={getData}><Image source={require("../../assets/refresh.jpg")} style={{height: 25, width: 25, marginRight: 20}}></Image></TouchableOpacity>
                    <TouchableOpacity onPress={() => setLocked(!locked)}>{locked ? closedLock : openLock}</TouchableOpacity>
                </View>
            </View>}

            {<ScrollView style={{marginTop: 30}} contentContainerStyle={{justifyContent: "center", alignItems: "center"}}>
                <Text style={{fontSize: 40, padding: 20, color: Schriftfarbe}}>Interviews</Text>
                <View style={[styles.column, {marginTop: 20}]}>
                    <Text style={[styles.columnItem, {borderWidth: 0}]}></Text>
                    <Text style={styles.columnItem}>Angefragt</Text>
                    <Text style={styles.columnItem}>Termin fest	</Text>
                    <Text style={styles.columnItem}>Abgedreht</Text>
                </View>
                {!loading && tableData.map((i, idx) => {
                    return <View style={styles.column} key={idx}>
                        <TextInput style={styles.columnItem} multiline={true} defaultValue={i.Name} editable={!locked} onChangeText={(e) => {
                            if (locked) return;
                            const data = [...tableData];
                            data[idx].Name = e;
                            setTableData(data);
                        }}/>
                        <View style={styles.columnItem}><CheckBox checkedColor={ContrastColor} checked={i.angefragt} onPress={() => {
                            if (locked) return;
                            const data = [...tableData];
                            data[idx].angefragt = !data[idx].angefragt;
                            setTableData(data);
                        }}></CheckBox></View>

                        <TextInput style={styles.columnItem} multiline={true} defaultValue={i.InterviewTermin} editable={!locked} onChangeText={(e) => {
                            const data = [...tableData];
                            data[idx].InterviewTermin = e;
                            setTableData(data);
                        }}/>
                        <View style={styles.columnItem}><CheckBox checkedColor={ContrastColor} checked={i.abgedreht} onPress={() => {
                            if (locked) return;
                            const data = [...tableData];
                            data[idx].abgedreht = !data[idx].abgedreht;
                            setTableData(data);
                        }}/></View>
                    </View>
                })}
                <Logins userData={userData} setUserData={setUserData} setTopLayer={setTopLayer}></Logins>
                <Logs logs={logs}></Logs>
                <Posts locked={locked} posts={posts} setPosts={setPosts} reloadData={() => {getData()}}></Posts>
            </ScrollView> }
        </View>
    );
}

const styles = StyleSheet.create({
    MainView: {
        minHeight: "100%",
    },
    controls: {
        backgroundColor: SecoundBackground,
        flexDirection: "row",

        height: 50,
        borderRadius: 10,
        width: "90%",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: 20,

        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 30,
    },
    ueberschrift: {
        color: Schriftfarbe, 
        fontSize: 15,
        padding: 10,
        backgroundColor: SecoundBackground,
        borderRadius: 10,
        marginTop: 20
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
        borderColor: "white",
        height: "100%",
        textAlign: "center",
        textAlignVertical: "center",
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
    },

})

export default GeschichteSeite;