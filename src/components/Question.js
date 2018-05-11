import React, { Component } from 'react';
import {
    View,
    Text,
    Image
} from 'react-native';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import { Button } from './common';

class Question extends Component {
    state = {
        disabled: false,
        correct: false,
        resultWidth: 0,
        resultHeight: 0
    }

    renderHeader() {
        const {
            headerContainerStyle,
            headerStyle
        } = styles;
        const { index, total } = this.props.question;

        return (
            <View style={headerContainerStyle}>
                <Text style={headerStyle}>{`${index + 1} of ${total}`}</Text>
            </View>
        );
    }

    renderQuestion() {
        const {
            questionContainerStyle,
            questionStyle,
            questionResultContainerStyle,
            questionResultImage
        } = styles;
        const { text } = this.props.question;
        const {
            correct,
            resultWidth,
            resultHeight
        } = this.state;

        const resultImage = correct
                                ? require('../images/success-circle.png')
                                : require('../images/failed-circle.png');

        return (
            <View
                style={questionContainerStyle}
                onLayout={(e) => {
                    this.setState({
                        resultWidth: e.nativeEvent.layout.width,
                        resultHeight: e.nativeEvent.layout.height,
                    });
                }}
            >
                <Animatable.View
                    useNativeDriver
                    ref={(view) => {
                        this.questionView = view;
                    }}
                >
                    <Text style={questionStyle}>{text}</Text>
                </Animatable.View>

                <Animatable.View
                    useNativeDriver
                    style={[questionResultContainerStyle, {
                        width: resultWidth,
                        height: resultHeight
                    }]}
                    ref={(view) => {
                        this.successView = view;
                    }}
                >
                    <Image
                        style={questionResultImage}
                        source={resultImage}
                    />
                </Animatable.View>
            </View>
        );
    }

    renderAnswers() {
        const {
            buttonsContainer,
            buttonStyle
        } = styles;
        const { answers } = this.props.question;
        const { onComplete } = this.props;
        const { disabled } = this.state;

        const views = [];
        const buttons = answers.map((answer, idx) => {
            return (
                <Animatable.View
                    useNativeDriver
                    key={idx}
                    correct={answer.correct}
                    ref={(view) => views.push(view)}
                >
                    <Button
                        style={buttonStyle}
                        color='rgba(90, 90, 90, 1.0)'
                        disabled={disabled}
                        onPress={() => {
                            answerSelect(idx, answer.correct);
                        }}
                    >
                        {answer.text}
                    </Button>
                </Animatable.View>
            );
        });

        const answerSelect = (idx, correct) => {
            this.setState({ disabled: true, correct });

            views.forEach((view) => {
                if (view.props.correct) {
                    return;
                }

                view.transition(
                    { opacity: 1.0 },
                    { opacity: 0.2 },
                    600);
            });

            this.questionView.flipOutY(400)
                .then(() => {
                    return this.successView.bounceIn();
                }).then(() => {
                    setTimeout(() => {
                        this.contentView.slideOutLeftCustom(300)
                            .then(() => {
                                if (onComplete) {
                                    onComplete(correct);
                                }
                            });
                    }, 300);
                });
        };

        return (
            <View style={buttonsContainer}>
                {buttons}
            </View>
        );
    }

    render() {
        const { containerStyle } = styles;
        const { index } = this.props.question;

        return (
            <Animatable.View
                animation='slideInLeftCustom'
                duration={300}
                delay={index === 0 ? 1000 : 300}
                useNativeDriver
                style={containerStyle}
                ref={(view) => { this.contentView = view; }}
            >
                {this.renderHeader()}
                {this.renderQuestion()}
                {this.renderAnswers()}
            </Animatable.View>
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    headerContainerStyle: {
        flex: 0.2,
        height: 64,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerStyle: {
        fontSize: 22,
        textAlign: 'center'
    },
    questionContainerStyle: {
        flex: 0.8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    questionStyle: {
        fontSize: 20,
        marginLeft: 25,
        marginRight: 25,
        textAlign: 'center'
    },
    questionResultContainerStyle: {
        position: 'absolute',
        top: 0,
        left: 0,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0
    },
    questionResultImage: {
        width: 140,
        height: 140
    },
    buttonsContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonStyle: {
        width: 200,
        height: 40,
        marginTop: 10,
        marginBottom: 10
    }
};

export default connect()(Question);
