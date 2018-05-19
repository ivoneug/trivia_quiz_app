import React, { Component } from 'react';
import { Text } from 'react-native';
import * as Animatable from 'react-native-animatable';

class MainPlaceholder extends Component {
    constructor() {
        super();

        Animatable.initializeRegistryWithDefinitions({
            mainPlaceholderTextAnimation: {
                0: {
                    opacity: 0,
                    rotate: '-10deg'
                },
                0.5: {
                    opacity: 0.5,
                    rotate: '-17.5deg'
                },
                1: {
                    opacity: 1,
                    rotate: '-25deg'
                }
            },
            mainPlaceholderZoomOut: {
                0: {
                    opacity: 1,
                    scale: 1
                },
                0.5: {
                    opacity: 1,
                    scale: 0.5
                },
                1: {
                    opacity: 0,
                    scale: 0
                }
            }
        });
    }

    componentDidMount() {
        const { onFinish } = this.props;

        setTimeout(() => {
            this.circleView.mainPlaceholderZoomOut(1500).then(() => {
                this.containerView.fadeOut(500).then(onFinish);
            });
        }, 3000);
    }

    render() {
        const {
            containerStyle,
            circleStyle,
            textContainerStyle,
            textStyle
        } = styles;

        return (
            <Animatable.View
                useNativeDriver
                style={containerStyle}
                ref={(view) => {
                    this.containerView = view;
                }}
                pointerEvents='none'
            >
                <Animatable.View
                    animation='bounceIn'
                    duration={1500}
                    useNativeDriver
                    style={circleStyle}
                    ref={(view) => {
                        this.circleView = view;
                    }}
                >
                    <Animatable.View
                        animation='mainPlaceholderTextAnimation'
                        duration={1500}
                        delay={700}
                        useNativeDriver
                        style={textContainerStyle}
                    >
                        <Text style={textStyle}>{'QUIZ'}</Text>
                    </Animatable.View>
                </Animatable.View>
            </Animatable.View>
        );
    }
}

const styles = {
    containerStyle: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    circleStyle: {
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: '#EDE522',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textContainerStyle: {
        transform: [{ rotate: '-25deg' }]
    },
    textStyle: {
        fontSize: 60,
        fontWeight: 'bold'
    }
};

export default MainPlaceholder;
