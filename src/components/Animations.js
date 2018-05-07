import { Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get('window');

export const registerAnimations = () => {
    Animatable.initializeRegistryWithDefinitions({
        slideInUpCustom: {
            from: {
                translateY: height
            },
            to: {
                translateY: 0
            }
        },
        slideOutDownCustom: {
            from: {
                translateY: 0
            },
            to: {
                translateY: height
            }
        },
        slideInDownCustom: {
            from: {
                translateY: -height
            },
            to: {
                translateY: 0
            }
        },
        slideInLeftCustom: {
            from: {
                translateX: width
            },
            to: {
                translateX: 0
            }
        },
        slideOutLeftCustom: {
            from: {
                translateX: 0
            },
            to: {
                translateX: -width
            }
        }
    });
};
