import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

const CategoryButton = ({ onPress, style, image, text }) => {
    const {
        containerStyle,
        textStyle,
        roundedContainer,
        imageStyle
    } = styles;

    return (
        <TouchableOpacity
            style={[containerStyle, style]}
            onPress={onPress}
        >
            <View style={roundedContainer}>
                {image ? <Image style={imageStyle} source={image} /> : null}
            </View>
            <Text style={textStyle}>{text}</Text>
        </TouchableOpacity>
    );
};

const styles = {
    containerStyle: {
        width: 86,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textStyle: {
        fontSize: 16,
        textAlign: 'center'
    },
    roundedContainer: {
        width: 86,
        height: 86,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        borderColor: 'rgba(128, 128, 128, 0.5)',
        borderWidth: 1,
        borderRadius: 43,
        // overflow: 'hidden',

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0,
        shadowRadius: 2
    },
    imageStyle: {

    }
};

export { CategoryButton };
