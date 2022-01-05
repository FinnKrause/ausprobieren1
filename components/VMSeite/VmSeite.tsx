import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import ReturnButton from "../returnButton/returnButton";
import { SecoundBackground, ContrastColor, DarkerContrast, Schriftfarbe, PlaceHolderColor, SecoundContrast, SchriftAufSecoundContrast, DarkerSecoundContrast, SchriftAufKontrast, AlertColor } from "../Grundsachen/Colors";

import VM from "./VM";

interface Props {
    setTopLayer: () => void
}

enum VMStatus {
    NOTCHECKED = "NOTCHECKED", ONLINE = "ONLINE", OFFLINE = "OFFLINE"
}

interface VM {
    id: number,
    name: string;
    onlineStatus: VMStatus,
    viewURL: string;
    startURL: string;
    checkURL: string;
}

const VmSeite: React.FC<Props> = (Props): JSX.Element => {

    const [VMs, setVMs] = useState<VM[]>([
        { id: 1, name: "Windows 10", onlineStatus: VMStatus.NOTCHECKED, viewURL: "https://vm.finnkrause.com/?host=vm.finnkrause.com/mainvm&port=80&path=tightvnc", startURL: "https://start.finnkrause.com/mainvm", checkURL: "https://check.finnkrause.com/mainvm" },
        { id: 2, name: "Windows 11", onlineStatus: VMStatus.NOTCHECKED, viewURL: "https://vm.finnkrause.com/?host=vm.finnkrause.com/win11vm&path=tightvnc", startURL: "https://start.finnkrause.com/win11vm", checkURL: "https://check.finnkrause.com/win11vm" },
        { id: 3, name: "Kali Linux", onlineStatus: VMStatus.NOTCHECKED, viewURL: "https://vm.finnkrause.com/?host=vm.finnkrause.com/kalivm8&port=80", startURL: "https://check.finnkrause.com/kalivm", checkURL: "https://vm.finnkrause.com/?host=vm.finnkrause.com/kalivm8&port=80" },
    ])

    useEffect(() => {
        for (const vmss of VMs) {
            fetch(vmss.checkURL).then(value => value.text()).then(data => {
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

    return (
        <View>
            <ReturnButton onReturnButtonPress={Props.setTopLayer} isAbsolute={false} customStyle={{ marginTop: 40, marginLeft: 20, marginBottom: 20 }}></ReturnButton>
            <ScrollView style={{ overflow: "visible", height: "100%" }}>
                <View style={{ height: "100%", overflow: "visible", flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
                    {VMs.map((i, idx) => {
                        return < VM key={idx} ViewURL={i.viewURL} name={i.name} startURL={i.startURL} status={i.onlineStatus} />
                    })}
                </View>
            </ScrollView >
        </View >
    )
}

export default VmSeite;
export type { VMStatus };