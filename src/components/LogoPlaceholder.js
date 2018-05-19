import React from 'react';
import { View, Text } from 'react-native';

const LogoPlaceholder = (props) => {
    const {
        circleStyle,
        textContainerStyle,
        textStyle
    } = styles;

    return (
        <View
            style={circleStyle}
        >
            <View
                style={textContainerStyle}
            >
                <Text style={textStyle}>{'QUIZ'}</Text>
            </View>
        </View>
    );
};

const styles = {
    circleStyle: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#EDE522',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textContainerStyle: {
        transform: [{ rotate: '-25deg' }]
    },
    textStyle: {
        fontSize: 21,
        fontWeight: 'bold'
    }
};

export { LogoPlaceholder };
