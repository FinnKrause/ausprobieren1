import React from "react";
import { TouchableOpacity, Image } from "react-native";

interface Props {
    onReturnButtonPress: () => void;
    isAbsolute: boolean;
    customStyle?: {};
}

const returnButton: React.FC<Props> = (Props) => {
    return (
        <TouchableOpacity style={Props.isAbsolute ? [{ position: "absolute", top: 40, left: 15 }, Props.customStyle] : Props.customStyle} onPress={() => Props.onReturnButtonPress()}>
            <Image source={require("../../assets/backarrow.jpg")} style={{ height: 30, width: 30 }}></Image>
        </TouchableOpacity>
    );
}

export default returnButton;