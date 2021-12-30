import React from "react";
import { Text, Image, StyleSheet, TouchableOpacity, ProgressViewIOSComponent } from "react-native";
import CredentialsSite from "../CredentialsSite/CredentialsSite";
import { ContrastColor, SecoundBackground, Schriftfarbe } from "../Grundsachen/Colors";

interface Props {
    loginText: string,
    logoPath: any,
    isLogin: boolean,
    setLoginPage: (Site: JSX.Element | undefined) => void,
    setLogin: (newVal: boolean) => void,

    token: string,
    setToken: (token: string) => void,
}

const LoginButton: React.FC<Props> = (Props): JSX.Element => {
    const logoPath = Props.logoPath;

    if (Props.isLogin) {
        Props.setLoginPage(
            <CredentialsSite
                reset={Props.setLoginPage}
                settoken={Props.setToken}
                token={Props.token}
                setLogin={Props.setLogin}
                Logo={Props.logoPath}
                Text={Props.loginText}>
            </CredentialsSite>
        )
    }

    return (
        <TouchableOpacity style={style.button} onPress={() => Props.setLoginPage(
            <CredentialsSite
                reset={Props.setLoginPage}
                settoken={Props.setToken}
                token={Props.token}
                setLogin={Props.setLogin}
                Logo={Props.logoPath}
                Text={Props.loginText}>
            </CredentialsSite>
        )}>
            <Image source={Props.logoPath} style={style.image}></Image>
            <Text style={style.text}>{Props.loginText}</Text>
        </TouchableOpacity>
    );
}

const style = StyleSheet.create({
    button: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

        width: "80%",

        padding: 50,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: SecoundBackground,
        borderRadius: 10,
        marginBottom: 10,
    },
    image: {
        height: 35,
        width: 35,
    },
    text: {
        fontSize: 17,
        margin: 0,
        padding: 0,
        textAlignVertical: "center",
        flexGrow: 1,
        textAlign: "center",
        color: Schriftfarbe,

        marginLeft: 10,
    }
});

export default LoginButton;