import React, { useEffect, useState } from "react";
import {StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, TextInput} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {AlertColor, ContrastColor, Schriftfarbe, SecoundBackground } from "../Grundsachen/Colors";
import ReturnButton from "../returnButton/returnButton";
import {Lehrer} from "../Hub/Hub";
import { CheckBox } from "react-native-elements";
import Svg, {Path, Rect, Circle} from "react-native-svg";
import Logins from "./Logins";
import Posts from "./Posts";
import Logs from "./Logs";
import BerlinTour from "./BerlinTour";

interface Props {
    goHome: () => void
}

const openLock = <Svg width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke={ContrastColor} fill="none" stroke-linecap="round" stroke-linejoin="round"><Path stroke="none" d="M0 0h24v24H0z" fill="none"/><Rect x="5" y="11" width="14" height="10" rx="2" /><Circle cx="12" cy="16" r="1" /><Path d="M8 11v-5a4 4 0 0 1 8 0" /></Svg>
const closedLock = <Svg width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke={AlertColor} fill="none" stroke-linecap="round" stroke-linejoin="round"><Path stroke="none" d="M0 0h24v24H0z" fill="none"/><Rect x="5" y="11" width="14" height="10" rx="2" /><Circle cx="12" cy="16" r="1" /><Path d="M8 11v-4a4 4 0 0 1 8 0v4" /></Svg>

const GeschichteSeite:React.FC<Props> = (Props: Props):JSX.Element => {

    const [tableData, setTableData] = useState<Lehrer[]>([]);
    const [canUploadNew, setCanUploadNew] = useState<boolean>(true);
    const [locked, setLocked] = useState<boolean>(true);

    const [userData, setUserData] = useState<Array<any> | undefined>(undefined)
    const [posts, setPosts] = useState<Array<any> | undefined>(undefined)
    const [logs, setLogs] = useState<Array<{date:string,message:string}>|undefined>(undefined);
    const [BerlinTourData, setBerlinTourData] = useState<Array<{date: string, header: string, content: string}>>();

    const [topLayer, setTopLayer] = useState<JSX.Element|undefined>();


    const getData = (which:{tableData?: boolean, WaitingPosts?:boolean, userData?:boolean,Logs?:boolean, BerlinTour?:boolean}) => {
        which.tableData && fetch("https://api.klasse10c.de/getTableData/app").then(res => res.json()).then((response:{data: Lehrer[]}) => {
            AsyncStorage.setItem("TableData", JSON.stringify(response))
            setCanUploadNew(true)
            setTableData(response.data);
        }).catch(err => {
            setCanUploadNew(false)
            AsyncStorage.getItem("TableData").then(value => {
                setTableData(JSON.parse(value ?? "[]"))
            })
        })
        which.WaitingPosts && fetch("https://api.klasse10c.de/getAllWaitingPosts/").then(res => res.json()).then((response) => {
            if (!response || JSON.stringify(response.data) === "[]") return;
            AsyncStorage.setItem("WaitingPosts", JSON.stringify(response.data))
            setCanUploadNew(true)
            setPosts(response)
        }).catch(err => {
                setCanUploadNew(false)
                AsyncStorage.getItem("WaitingPosts").then(value => {
                if (!value) return;
                setPosts(JSON.parse(value))
            })
        })
        which.userData && fetch("https://api.klasse10c.de/getUserData/app").then(res => res.json()).then((response) => {
            if (!response) return;
            AsyncStorage.setItem("UserData", JSON.stringify(response.data))
            setCanUploadNew(true)
            setUserData(response.data)
        }).catch(err => {
                setCanUploadNew(false)
                AsyncStorage.getItem("UserData").then(value => {
                if (!value) return;
                setUserData(JSON.parse(value))
            })
        })
        which.Logs && fetch("https://api.klasse10c.de/getAllLogs/true").then(res => res.json()).then((response) => {
            if (!response) return;
            AsyncStorage.setItem("Logs", JSON.stringify(response.data))
            setCanUploadNew(true)
            setLogs(response.data)
        }).catch(err => {
                setCanUploadNew(false)
                AsyncStorage.getItem("Logs").then(value => {
                if (!value) return;
                setLogs(JSON.parse(value))
            })
        })

        which.BerlinTour && fetch("https://api.klasse10c.de/getBerlinTour/app").then(res => res.json()).then(response => {
            if (!response) return;
            AsyncStorage.setItem("BerlinTour", JSON.stringify(response.data));
            setCanUploadNew(true)
            setBerlinTourData(response.data)
        }).catch(_ => {
            setCanUploadNew(false)
            AsyncStorage.getItem("BerlinTour").then(value => {
                if (!value) return;
                setBerlinTourData(JSON.parse(value))
            })
        })
    }

    const sendNewData = (which: {tableData?: boolean, berlinTour?: boolean}) => {
        if (locked) {
            alert("Unlock the site to publish new information!")
            return;
        }

        const doAPIUpdateRequest = (urlToPost: string, data: any, name:string) => {
            fetch(urlToPost, {
                method: 'POST',
                headers : {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify(data),
            }).then(res => res.json()).then(res => {
                if (res.success) {alert(`${name} updated!`); setCanUploadNew(true)}
                else {alert(`Error while updating ${name}!`);  setCanUploadNew(false)}
            }).catch(err => {
                setCanUploadNew(false)
            })
        } 

        which.tableData && doAPIUpdateRequest("https://api.klasse10c.de/setTableData/app", tableData, "Tabelle")

        if (which.berlinTour) {
            if (BerlinTourData?.filter(i => i.date&&i.header&&i.content).length == BerlinTourData?.length) {
                which.berlinTour && doAPIUpdateRequest("https://api.klasse10c.de/setBerlinTour/app", BerlinTourData, "BerlinTour")
            }
            else {
                alert("Ein Eintrag für die Berlintour ist noch nicht vollständig ausgefüllt!")
            }
        }


    }

    useEffect(() => {
        getData({tableData: true, WaitingPosts: true, userData: true, Logs: true, BerlinTour: true});
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
                    {!canUploadNew && <Text style={{fontWeight: "bold", color: AlertColor}}>Offline Data</Text>}
                </View>
                <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center", marginRight: 10}}>
                    <TouchableOpacity onPress={()=>getData({tableData: true, WaitingPosts: true, userData: true, Logs: true})}><Image source={require("../../assets/refresh.jpg")} style={{height: 25, width: 25, marginRight: canUploadNew ? 20 : 0}}></Image></TouchableOpacity>
                    {canUploadNew && <TouchableOpacity onPress={() => setLocked(!locked)}>{locked ? closedLock : openLock}</TouchableOpacity>}
                </View>
            </View>}

            {<ScrollView style={{marginTop: 30}} contentContainerStyle={{justifyContent: "center", alignItems: "center"}}>
                <Text style={{fontSize: 40, padding: 20, color: Schriftfarbe}}>Interviews</Text>
                <View style={[styles.column, {marginTop: 20}]}>
                    <View style={[styles.columnItem, (canUploadNew && !locked) ? {} : {borderWidth: 0}]} >{canUploadNew && !locked && <TouchableOpacity onPress={() => sendNewData({tableData: true})}><Image source={require("../../assets/save.png")} style={{height: 27, aspectRatio: 17/11}}></Image></TouchableOpacity>}</View>
                    <View style={styles.columnItem}><Text style={{color: Schriftfarbe}}>Angefragt</Text></View>
                    <View style={styles.columnItem}><Text style={{color: Schriftfarbe}}>Termin fest	</Text></View>
                    <View style={styles.columnItem}><Text style={{color: Schriftfarbe}}>Abgedreht</Text></View>
                </View>
                {tableData?.map((i, idx) => {
                    return <View style={styles.column} key={idx}>
                        <View style={styles.columnItem}>
                            <TextInput style={{color: Schriftfarbe}} multiline={true} defaultValue={i.Name} editable={!locked} onChangeText={(e) => {
                                if (locked) return;
                                const data = [...tableData];
                                data[idx].Name = e;
                                setTableData(data);
                            }}/>
                        </View>
                        <View style={styles.columnItem}><CheckBox checkedColor={ContrastColor} checked={i.angefragt} onPress={() => {
                            if (locked) return;
                            const data = [...tableData];
                            data[idx].angefragt = !data[idx].angefragt;
                            setTableData(data);
                        }}></CheckBox></View>
                        <View style={styles.columnItem}>
                            <TextInput style={{color: Schriftfarbe}} multiline={true} defaultValue={i.InterviewTermin} editable={!locked} onChangeText={(e) => {
                                const data = [...tableData];
                                data[idx].InterviewTermin = e;
                                setTableData(data);
                            }}/>
                        </View>
                        <View style={styles.columnItem}><CheckBox checkedColor={ContrastColor} checked={i.abgedreht} onPress={() => {
                            if (locked) return;
                            const data = [...tableData];
                            data[idx].abgedreht = !data[idx].abgedreht;
                            setTableData(data);
                        }}/></View>
                    </View>
                })}
                <Logins userData={userData} setUserData={setUserData} setTopLayer={setTopLayer}></Logins>
                {posts && <Posts locked={locked} posts={posts} setPosts={setPosts} reloadData={() => {getData({Logs: true, WaitingPosts: true, tableData: false, userData: false})}}/>}
                {BerlinTourData && <BerlinTour data={BerlinTourData} setData={setBerlinTourData} locked={locked} sendNewData={sendNewData} canUploadNew={canUploadNew}/>}
                <Logs logs={logs}></Logs>
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
        borderColor: "gray",
        borderWidth: 1,
        height: "100%",
        

        display: "flex",
        justifyContent: "center",
        alignItems: "center",        
    },

})

export default GeschichteSeite;