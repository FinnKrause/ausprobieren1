import React, { useEffect, useState } from "react";
import { BackgroundColor, ContrastColor, SecoundBackground, SchriftAufKontrast, Schriftfarbe } from "../Grundsachen/Colors";
import { View, Text, Button, StyleSheet, Image, ScrollView, Linking, TouchableOpacity } from "react-native";
import UserDataPage from "../UserDataPage/UserDataPage";
import Kachel from "./Kachel";
import ClickOnProfilePicture from "../Menu/ClickOnProfilePicture";
import VmSeite from "../VMSeite/VmSeite";
import ChoiceSite from "./ChoiceSite";

interface Props {
    removeLogin: () => void
    token: string;
}

interface Kachel {
    image: any,
    text: string;
    onClick: () => void;
}

enum VMStatus {
    NOTCHECKED = "NOTCHECKED", ONLINE = "ONLINE", OFFLINE = "OFFLINE", STARTING = "STARTING"
}

interface VM {
    id: number,
    name: string;
    onlineStatus: VMStatus,
    viewURL: string;
    startURL: string;
    checkURL: string;
}

const StandardVMs = [
    { id: 1, name: "Windows 10", onlineStatus: VMStatus.NOTCHECKED, viewURL: "https://vm.finnkrause.com/?host=vm.finnkrause.com/mainvm&port=80&path=tightvnc", startURL: "https://start.finnkrause.com/mainvm", checkURL: "https://check.finnkrause.com/mainvm" },
    { id: 2, name: "Windows 11", onlineStatus: VMStatus.NOTCHECKED, viewURL: "https://vm.finnkrause.com/?host=vm.finnkrause.com/win11vm&path=tightvnc", startURL: "https://start.finnkrause.com/win11vm", checkURL: "https://check.finnkrause.com/win11vm" },
    { id: 3, name: "Kali Linux", onlineStatus: VMStatus.NOTCHECKED, viewURL: "https://vm.finnkrause.com/?host=vm.finnkrause.com/kalivm8&port=80", startURL: "https://check.finnkrause.com/kalivm", checkURL: "https://vm.finnkrause.com/?host=vm.finnkrause.com/kalivm8&port=80" },
]

const Hub: React.FC<Props> = (Props): JSX.Element => {

    const [topLayer, setTopLayer] = useState<JSX.Element | undefined>();
    const [ProfilePictureClicked, setProfilePictureClicked] = useState<boolean>();

    const [VMs, setVMs] = useState<VM[]>(StandardVMs)

    const Kacheln: Kachel[] = [
        { text: "User Data", image: require("../../assets/data.png"), onClick: () => setTopLayer(<UserDataPage goBack={() => { setTopLayer(undefined) }} token={Props.token}></UserDataPage>) },
        { text: "Geschichte Management", image: require("../../assets/brandenburger_tor.png"), onClick: () => { } },
        { text: "Admin Web Page", image: require("../../assets/admin.png"), onClick: () => { Linking.openURL("https://finnkrause.com/?Sprachentable=true&h=secret&p=jsonwebtoken4finn").catch(err => alert(err)) } },
        { text: "VMs", image: require("../../assets/VMs.png"), onClick: () => setTopLayer(<VmSeite setTopLayer={returnToHub} VMs={VMs} setVMs={(val: VM[]) => setVMs(val)} getIndex={getIndex}></VmSeite>) },
        { text: "DNS", image: require("../../assets/DNS.png"), onClick: () => { 
            setTopLayer(<ChoiceSite onReturn={returnToHub} 
            title="DNS Servers" 
            Choices={[
                {title: "192.168.178.62", onClick: () => {Linking.openURL("https://dns16862.finnkrause.com/")}},
                {title: "192.168.178.47", onClick: () => {Linking.openURL("https://dns16847.finnkrause.com/")}}
            ]}></ChoiceSite>)}},
        { text: "Performance Monitor", image: require("../../assets/performance.png"), onClick: () => { } },
    ]

    useEffect(() => {
        for (const vmss of VMs) {
            vmss.onlineStatus === VMStatus.NOTCHECKED && fetch(vmss.checkURL).then(value => value.text()).then(data => {
                if (data === "alive") getOnline(vmss);
                else getOffline(vmss);
            }).catch(err => getOffline(vmss))
        }
    }, [])

    const getOnline = (vmss: VM) => {
        const tmp = [...VMs];
        const index = getIndex(vmss.id);

        let ToWorkVM = tmp[index];
        ToWorkVM.onlineStatus = VMStatus.ONLINE;
        tmp[index] = ToWorkVM;
        setVMs(tmp);
    }

    const getOffline = (vmss: VM) => {
        const tmp = [...VMs];
        const index = getIndex(vmss.id);

        let ToWorkVM = tmp[index];
        ToWorkVM.onlineStatus = VMStatus.OFFLINE;
        tmp[index] = ToWorkVM;
        setVMs(tmp);
    }

    const getIndex = (ID: number): number => {
        let j = 0;
        for (let i of VMs) {
            if (i.id === ID) return j;
            j++;
        }
        return j;
    }

    const returnToHub = () => setTopLayer(undefined);

    return (
        <View style={styles.HubWrapper}>
            {topLayer && <View>{topLayer}</View>}

            {ProfilePictureClicked && <ClickOnProfilePicture removeLogin={Props.removeLogin} setSettings={setProfilePictureClicked} />}

            {!topLayer && <View style={styles.HubWrapper}>
                <View style={styles.TopBar}>
                    <TouchableOpacity onPress={() => setProfilePictureClicked(true)}>
                        <Image source={require("../../assets/Finn.jpg")} style={styles.ProfilePicture}></Image>
                    </TouchableOpacity>

                    <View style={styles.Admin}>
                        <Text style={{ color: SchriftAufKontrast, fontWeight: "bold", marginRight: 20 }}>ADMIN</Text>
                    </View>
                </View>
                <ScrollView>
                    <View style={styles.Kacheln}>
                        {Kacheln.map((i, idx) => <Kachel key={idx} image={i.image} text={i.text} onClick={i.onClick}></Kachel>)}
                    </View>
                </ScrollView>
            </View>}
        </View >
    );

}

const styles = StyleSheet.create({
    HubWrapper: {
        height: "100%",
    },
    TopBar: {
        flexDirection: "row",
        justifyContent: "space-between",

        height: 50,
        width: "95%",
        alignSelf: "center",
        borderRadius: 25,
        backgroundColor: ContrastColor,
        marginTop: 20,
    },
    ProfilePicture: {
        height: 45,
        width: 45,
        borderRadius: 45 / 2,
        marginTop: 2.5,
        marginLeft: 10,
    },
    Admin: {
        display: "flex",
        justifyContent: "center"
    },
    Kacheln: {
        width: "100%",
        minHeight: "100%",

        marginTop: 20,

        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",

        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",

        overflow: "visible",
    }
});

export default Hub;
export { VM, VMStatus, StandardVMs }