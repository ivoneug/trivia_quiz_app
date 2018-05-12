import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import LocalizedStrings from 'react-native-localization';
import { Button } from './common';

class Results extends Component {
    render() {
        const {
            containerStyle,
            headerTextStyle,
            questionResultStyle,
            resultsContainerStyle,
            resultsTextStyle,
            buttonStyle
        } = styles;

        const {
            successCount,
            totalCount,
            onComplete
        } = this.props;

        let headerText = strings.bad;
        let resultEmoji = '😭';

        const mid = Math.floor(totalCount / 2);
        if (successCount > mid + 1) {
            headerText = strings.good;
            resultEmoji = '👏';
        } else if (successCount >= mid - 1) {
            headerText = strings.avg;
            resultEmoji = '😏';
        }

        const correctText = `👍 ${successCount} ${strings.correct}`;
        const incorrectText = `👎 ${totalCount - successCount} ${strings.incorrect}`;

        return (
            <Animatable.View
                animation='slideInDownCustom'
                duration={1500}
                delay={300}
                useNativeDriver
                style={containerStyle}
            >
                <Text style={headerTextStyle}>
                    {headerText}
                </Text>

                <Animatable.Text
                    animation='pulse'
                    easing='ease-out'
                    iterationCount='infinite'
                    useNativeDriver
                    style={questionResultStyle}
                >
                    {resultEmoji}
                </Animatable.Text>

                <View style={resultsContainerStyle}>
                    <Text style={resultsTextStyle}>{correctText}</Text>
                    <Text style={resultsTextStyle}>{incorrectText}</Text>
                </View>

                <View>
                    <Button
                        style={buttonStyle}
                        color='rgba(90, 90, 90, 1.0)'
                        onPress={onComplete}
                    >
                        {strings.ok}
                    </Button>
                </View>
            </Animatable.View>
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    headerTextStyle: {
        fontSize: 30,
        textAlign: 'center'
    },
    questionResultStyle: {
        fontSize: 120,
        height: 150,
        alignItems: 'center',
        justifyContent: 'center'
    },
    resultsContainerStyle: {
        width: 180,
        alignItems: 'flex-start'
    },
    resultsTextStyle: {
        fontSize: 22,
        textAlign: 'center',
        marginBottom: 5
    },
    buttonStyle: {
        width: 200,
        height: 40,
        marginTop: 10,
        marginBottom: 10
    }
};

const strings = new LocalizedStrings({
    en: {
        bad: '💣 Not so Good 💣',
        avg: '🍭 That\'s Okay! 🍭',
        good: '🎉 Good Job! 🎉',
        correct: 'is correct',
        incorrect: 'is incorrect',
        ok: 'OK'
    }
});

export default connect()(Results);
