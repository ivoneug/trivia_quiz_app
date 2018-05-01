import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Modal,
    Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import LocalizedStrings from 'react-native-localization';
import Question from './Question';
import { Spinner } from './common';

const { width, height } = Dimensions.get('window');
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
    }
});

class Quiz extends Component {
    state = { completed: 0 }

    renderBackButton() {
        const {
            backButtonStyle,
            backButtonImageStyle
        } = styles;

        const { onBackPress } = this.props;

        const onBackPressAction = () => {
            this.contentView.slideOutDownCustom(300)
                .then(() => this.backgroundView.fadeOut(300))
                .then(onBackPress);
        };

        return (
            <Animatable.View
                animation='bounceIn'
                delay={800}
                useNativeDriver
                style={backButtonStyle}
            >
                <TouchableOpacity
                    onPress={onBackPressAction}
                >
                    <Image
                        style={backButtonImageStyle}
                        source={require('../images/arrow-left.png')}
                    />
                </TouchableOpacity>
            </Animatable.View>
        );
    }

    renderHeader() {
        const {
            headerStyle,
            headerTextStyle
        } = headerStyles;

        const { category } = this.props;

        return (
            <View style={headerStyle}>
                <Text style={headerTextStyle}>{category.name}</Text>
            </View>
        );
    }

    renderQuestions() {
        const { mainContainerStyle } = styles;
        const { completed } = this.state;

        const question = {
            index: 0,
            total: 10,
            text: 'This is question text. Actually here might be a lot of text!',
            answers: [
                { text: 'Answer 1', correct: false },
                { text: 'Answer 2', correct: false },
                { text: 'Answer 3', correct: true },
                { text: 'Answer 4', correct: false }
            ]
        };

        return (
            <View style={mainContainerStyle}>
                <Question
                    question={question}
                    onComplete={() => {
                        this.setState({ completed: completed + 1 });
                    }}
                />
            </View>
        );
    }

    render() {
        const {
            backgroundStyle,
            containerStyle
        } = styles;

        let { visible } = this.props;
        visible = visible || false;

        return (
            <Modal
                transparent
                animationType={'none'}
                visible={visible}
                onRequestClose={() => {}}
            >
                <Animatable.View
                    animation='fadeIn'
                    duration={300}
                    useNativeDriver
                    style={backgroundStyle}
                    ref={(view) => { this.backgroundView = view; }}
                />
                <Animatable.View
                    animation='slideInUpCustom'
                    duration={300}
                    useNativeDriver
                    style={containerStyle}
                    ref={(view) => { this.contentView = view; }}
                >
                    {this.renderHeader()}
                    {this.renderQuestions()}

                    {/* <Spinner
                        visible
                    /> */}

                    {this.renderBackButton()}
                </Animatable.View>
            </Modal>
        );
    }
}

const styles = {
    backgroundStyle: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width,
        height,
        backgroundColor: 'rgba(0, 0, 0, 0.75)'
    },
    containerStyle: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 20,
        marginTop: 20,
        marginRight: 20,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        backgroundColor: 'white',
        alignItems: 'center',
        overflow: 'hidden'
    },
    mainContainerStyle: {
        flex: 1,
        justifyContent: 'space-around'
    },
    backButtonStyle: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 65,
        height: 65,
        alignItems: 'center',
        justifyContent: 'center'
    },
    backButtonImageStyle: {
        width: 35,
        height: 35
    },
};

const headerStyles = {
    headerStyle: {
        width,
        height: 64,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2
    },
    headerTextStyle: {
        fontSize: 18,
        textAlign: 'center'
    }
};

const strings = new LocalizedStrings({
    en: {
    }
});

const mapStateToProps = (state) => {
    return {
        category: state.categories.selectedCategory
    };
};

export default connect(mapStateToProps)(Quiz);
