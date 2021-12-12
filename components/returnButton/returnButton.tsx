import React from "react";
import {TouchableOpacity, Image} from "react-native";

interface Props {
    onReturnButtonPress: () => void
}

const returnButton:React.FC<Props> = (Props) => {
    return (
        <TouchableOpacity style={{position: "absolute", top: 40, left: 15}} onPress={() => Props.onReturnButtonPress()}>
            <Image source={require("../../assets/backarrow.jpg")} style={{height: 30, width: 30}}></Image>
        </TouchableOpacity>
    );
}

export default returnButton;