import React, {useState} from "react";
import {View, TextInput, StyleSheet, Button, Image, Text, TouchableOpacity, ScrollView} from "react-native";
import ReturnButton from "../returnButton/returnButton";

interface Props {
    setLogin: (newVal: boolean) => void;
    Logo: any;
    Text: string;
    reset: (newVal: JSX.Element|undefined) => void;

    settoken: (newVal: string) => void
    token: string
}

const CredentialsSite:React.FC<Props> = (Props) => {

    const [currentUsername, setCUsername] = useState<string>();
    const [currentPassword, setCPassword] = useState<string>();
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
                setErr(false);
            } else {
                setErr(true);
            }
        })
    }

    return (
        <View style={style.view}>
            <ReturnButton onReturnButtonPress={() => Props.reset(undefined)}></ReturnButton>

            <View style={style.ImageAndHeaderWrapper}>
                <Image source={Props.Logo} style={style.logo}></Image>
                <Text style={style.header}>{Props.Text}</Text>
            </View>
            
            <View style={[style.view, style.credentialsWrapper]}>

                <View style={style.inputFieldWrapper}>
                    <Image style={{height: 20, width: 20, marginRight: 10}} source={require("../../assets/user.png")}></Image>
                    <TextInput style={style.input} placeholder="Username" onChangeText={e => setCUsername(e)} textContentType="username"></TextInput>
                </View>

                <View style={style.inputFieldWrapper}>
                    <Image style={{height: 20, width: 20, marginRight: 10}} source={require("../../assets/key.png")}></Image>
                    <TextInput style={style.input} placeholder="Password" onChangeText={e => setCPassword(e)} textContentType="password" secureTextEntry={true}></TextInput>
                </View>

                {hasErr && <Text style={{color: "red", fontWeight: "700"}}>Username oder Passwort sind falsch!</Text>}

                <TouchableOpacity style={style.button} onPress={() => {TryLogin()}}> 
                    <Text style={{color: "white", fontWeight: "700"}}>LOGIN</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}

const style = StyleSheet.create({
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
    },
    logo: {
        height: 200,
        width: 200,
        marginBottom: 20,

    },
    credentialsWrapper:  {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        height: 300,
    },
    input:  {
        height: 40,
        flexGrow: 1,
    },
    button: {
        width: "80%",
        backgroundColor: "#D73E34",
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