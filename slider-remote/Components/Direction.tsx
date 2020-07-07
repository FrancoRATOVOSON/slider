import React from "react";
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    StyleProp,
    ViewStyle,
} from "react-native";

type Props = {
    orientation: string;
    styles?: StyleProp<ViewStyle>;
    onPress?: () => void;
};

export function Direction({ orientation, styles, onPress }: Props) {
    return (
        <TouchableOpacity style={styles} onPress={onPress}>
            <Text style={defaultStyles.text}>{orientation}</Text>
        </TouchableOpacity>
    );
}

const defaultStyles = StyleSheet.create({
    text: {
        fontSize: 30,
    },
});

export default Direction;
