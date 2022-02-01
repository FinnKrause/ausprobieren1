import React, { useEffect, useState } from "react";
import { View, ScrollView, TouchableOpacity, Text } from "react-native";
import ReturnButton from "../returnButton/returnButton";
import { VM, VMStatus, StandardVMs } from "../Hub/Hub";
import Vm from "./VM";
import { Schriftfarbe, SecoundBackground } from "../Grundsachen/Colors";

interface Props {
    setTopLayer: () => void
    VMs: VM[]
    setVMs: (neu: VM[]) => void
    getIndex: (ID: number) => number
}

const VmSeite: React.FC<Props> = (Props): JSX.Element => {

    const setOnlineStatus = (ID: number, onlineStatus: VMStatus) => {
        const index = Props.getIndex(ID);
        const oldData = [...Props.VMs];
        oldData[index].onlineStatus = onlineStatus;
        Props.setVMs(oldData);
    }

    return (
        <View>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", height: 80 }}>
                <ReturnButton onReturnButtonPress={Props.setTopLayer} isAbsolute={false} customStyle={{ marginTop: 40, marginLeft: 20, marginBottom: 20 }}></ReturnButton>
                {/* <TouchableOpacity style={{ alignContent: "center", justifyContent: "center", alignItems: "flex-end", padding: 10, backgroundColor: SecoundBackground, marginRight: 20, marginTop: 10 }} onPress={() => {
                    Props.setVMs(StandardVMs)
                }}>
                    <Text style={{ color: Schriftfarbe, fontSize: 15 }}>REFRESH</Text>
                </TouchableOpacity> */}
            </View>
            <ScrollView style={{ overflow: "visible", height: "100%" }}>
                <View style={{ height: "100%", overflow: "visible", flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
                    {Props.VMs.map((i, idx) => {
                        return <Vm id={i.id} key={idx} ViewURL={i.viewURL} name={i.name} startURL={i.startURL} status={i.onlineStatus} setOnlineStatus={setOnlineStatus} />
                    })}
                </View>
            </ScrollView >
        </View >
    )
}

export default VmSeite;