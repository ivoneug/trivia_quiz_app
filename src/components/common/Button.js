import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, children, color, style, textStyle, disabled }) => {
    const { textBaseStyle, buttonStyle } = styles;

    const textColorStyle = color ? { color } : {};
    const buttonColorStyle = color ? { borderColor: color } : {};

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[buttonStyle, buttonColorStyle, style]}
            disabled={disabled}
        >
            <Text style={[textBaseStyle, textColorStyle, textStyle]}>{children}</Text>
        </TouchableOpacity>
    );
};

const styles = {
    textBaseStyle: {
        alignSelf: 'center',
        color: '#007aff',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10,
        flexWrap: 'wrap'
    },
    buttonStyle: {
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#007aff',
        marginLeft: 5,
        marginRight: 5
    }
};

export { Button };
