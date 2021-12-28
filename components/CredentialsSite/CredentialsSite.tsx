import React, { useState } from "react";
import { View, TextInput, StyleSheet, Button, Image, Text, TouchableOpacity } from "react-native";
import { CheckBox } from "react-native-elements/dist/checkbox/CheckBox";
import { ContrastColor, SchriftAufKontrast, Schriftfarbe, BackgroundColor, AlertColor, PlaceHolderColor } from "../Grundsachen/Colors";
import ReturnButton from "../returnButton/returnButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Props {
    setLogin: (newVal: boolean) => void;
    Logo: any;
    Text: string;
    reset: (newVal: JSX.Element | undefined) => void;

    settoken: (newVal: string) => void
    token: string
}

const CredentialsSite: React.FC<Props> = (Props) => {

    const [currentUsername, setCUsername] = useState<string>();
    const [currentPassword, setCPassword] = useState<string>();
    const [keep, setkeep] = useState<boolean>(false);
    const [hasErr, setErr] = useState<boolean>(false);


    const TryLogin = () => {
        if (!currentUsername || !currentPassword) {
            setErr(true)
            return;
        }

        fetch(`https://api.finnkrause.com/login/${currentUsername}/${currentPassword}`).then(response => response.json()).then(data => {
            if (data.valid && data.token) {
                Props.setLogin(true);
                Props.settoken(data.token);
                if (keep) AsyncStorage.setItem("token", data.token).then(value => console.log("Set token to: " + value));
                setErr(false);
            } else {
                setErr(true);
            }
        })
    }

    return (
        <View style={style.view}>
            <ReturnButton onReturnButtonPress={() => Props.reset(undefined)} isAbsolute={true}></ReturnButton>

            <View style={style.ImageAndHeaderWrapper}>
                <Image source={Props.Logo} style={style.logo}></Image>
                <Text style={style.header}>{Props.Text}</Text>
            </View>

            <View style={[style.view, style.credentialsWrapper]}>

                <View style={style.inputFieldWrapper}>
                    <Image style={{ height: 20, width: 20, marginRight: 10 }} source={require("../../assets/user.png")}></Image>
                    <TextInput style={style.input} placeholder="Username" placeholderTextColor={PlaceHolderColor} onChangeText={e => setCUsername(e)} textContentType="username"></TextInput>
                </View>

                <View style={style.inputFieldWrapper}>
                    <Image style={{ height: 20, width: 20, marginRight: 10 }} source={require("../../assets/key.png")}></Image>
                    <TextInput style={style.input} placeholder="Password" placeholderTextColor={PlaceHolderColor} onChangeText={e => setCPassword(e)} textContentType="password" secureTextEntry={true}></TextInput>
                </View>

                {hasErr && <Text style={{ color: AlertColor, fontWeight: "700" }}>Username oder Passwort sind falsch!</Text>}

                <View style={style.checkboxView}>
                    <CheckBox
                        title={"Keep me signed in"}
                        onPress={() => setkeep(!keep)}
                        checked={keep}
                        checkedColor={ContrastColor}
                        containerStyle={{ backgroundColor: "transparent", borderWidth: 0 }}
                        textStyle={{ color: Schriftfarbe }}
                    />
                </View>

                <TouchableOpacity style={style.button} onPress={() => { TryLogin() }}>
                    <Text style={{ color: SchriftAufKontrast, fontWeight: "700" }}>LOGIN</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}

const style = StyleSheet.create({
    checkboxView: {
        display: "flex",
        width: "70%",

        marginBottom: 20,
    },
    inputFieldWrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",

        borderColor: "gray",
        borderBottomWidth: 1,
        width: "70%",

        marginTop: 10,
        marginBottom: 10,
    },
    view: {
        height: "100%",
        width: "100%",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
    },
    ImageAndHeaderWrapper: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",

        fontWeight: "700",
    },
    header: {
        fontSize: 30,
        width: "100%",
        display: "flex",
        textAlign: "center",
        textAlignVertical: "center",

        color: Schriftfarbe,
    },
    logo: {
        height: 200,
        width: 200,
        marginBottom: 20,

    },
    credentialsWrapper: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        height: 300,
    },
    input: {
        height: 40,
        flexGrow: 1,
        color: Schriftfarbe
    },
    button: {
        width: "80%",
        backgroundColor: ContrastColor,
        height: 40,
        borderRadius: 20,

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",

        marginTop: 30,
    },
});

export default CredentialsSite;