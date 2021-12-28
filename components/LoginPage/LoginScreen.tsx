import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import LoginButton from "./LoginButton";

interface Props {
    isLogin: boolean,
    setLogin: (newVal: boolean) => void,
    token: string,
    setToken: (token: string) => void,
}

const LoginScreen: React.FC<Props> = (Props): JSX.Element => {

    const [LoginDetailsSite, setLoginDetailsSite] = useState<JSX.Element | undefined>();

    const ReplicaLoginDetailsSite = (Details: JSX.Element | undefined) => { }


    return (
        <View style={style.headerView} key={1}>
            {!LoginDetailsSite && <View style={style.loginViewWrapper}>
                <Image style={style.adminpanelImage} source={require("../../assets/admin_panel.png")}></Image>
                <LoginButton
                    loginText="Login with Apple"
                    logoPath={require("../../assets/apple_logo.png")}
                    isLogin={Props.isLogin}
                    setLoginPage={setLoginDetailsSite}
                    setLogin={Props.setLogin}
                    token={Props.token}
                    setToken={Props.setToken}> </LoginButton>
                <LoginButton
                    loginText="Login with Google"
                    logoPath={require("../../assets/google_logo.png")}
                    isLogin={Props.isLogin}
                    setLoginPage={setLoginDetailsSite}
                    setLogin={Props.setLogin}
                    token={Props.token}
                    setToken={Props.setToken}> </LoginButton>
                <LoginButton
                    loginText="Login with Finns-Cloud"
                    logoPath={require("../../assets/cloud_logo.png")}
                    isLogin={Props.isLogin}
                    setLoginPage={setLoginDetailsSite}
                    setLogin={Props.setLogin}
                    token={Props.token}
                    setToken={Props.setToken}> </LoginButton>
                <LoginButton
                    loginText="Manual Login"
                    logoPath={require("../../assets/manual_logo.png")}
                    isLogin={Props.isLogin}
                    setLoginPage={setLoginDetailsSite}
                    setLogin={Props.setLogin}
                    token={Props.token}
                    setToken={Props.setToken}></LoginButton>
            </View>}
            {LoginDetailsSite && LoginDetailsSite}
        </View>
    );
}

const style = StyleSheet.create({
    headerView: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center",
        width: "100%",
        height: "100%"


    },
    adminpanelImage: {
        marginTop: 10,
    },
    loginViewWrapper: {
        flexGrow: 0.5,
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    }
});

export default LoginScreen;