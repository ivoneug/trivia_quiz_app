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
import { answerQuestion } from '../actions';
import Question from './Question';
import Results from './Results';
import { Spinner, Alert } from './common';

const { width, height } = Dimensions.get('window');

class Quiz extends Component {
    onBackPressAction() {
        const { onBackPress } = this.props;

        this.contentView.slideOutDownCustom(300)
            .then(() => this.backgroundView.fadeOut(300))
            .then(onBackPress);
    }

    renderBackButton() {
        const {
            backButtonStyle,
            backButtonImageStyle
        } = styles;
        const { failed } = this.props;

        return (
            <Animatable.View
                animation='bounceIn'
                delay={800}
                useNativeDriver
                style={backButtonStyle}
            >
                <TouchableOpacity
                    onPress={this.onBackPressAction.bind(this)}
                    disabled={failed}
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

        const {
            loaded,
            index,
            total,
            items,
            correctCount
        } = this.props.quiz;

        const question = {
            index,
            total,
            ...items[index]
        };

        const renderQuizData = () => {
            return index < total ? <Question
                key={index}
                question={question}
                onComplete={(correct) => {
                    this.props.answerQuestion(index, correct);
                }}
            />
            : <Results
                successCount={correctCount}
                totalCount={total}
                onComplete={this.onBackPressAction.bind(this)}
            />;
        };

        return (
            <View style={mainContainerStyle}>
                {loaded ? renderQuizData() : null}
            </View>
        );
    }

    renderNetworkAlert() {
        const { failed } = this.props;

        return (
            <Alert
                visible={failed}
                title={strings.alertTitle}
                description={strings.alertDescription}
                buttonText={strings.alertButton}
                buttonColor='rgba(90, 90, 90, 1.0)'
                onConfirm={() => {
                    this.props.onQuizShouldReload();
                }}
            />
        );
    }

    render() {
        const {
            backgroundStyle,
            containerStyle
        } = styles;

        const { quiz } = this.props;
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

                    <Spinner
                        color='#000000'
                        visible={!quiz.loaded}
                    />

                    {this.renderBackButton()}
                    {this.renderNetworkAlert()}
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
        justifyContent: 'center',
        elevation: 1,
        zIndex: 1
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
        shadowRadius: 2,
        elevation: 1,
        zIndex: 1
    },
    headerTextStyle: {
        fontSize: 18,
        textAlign: 'center'
    }
};

const strings = new LocalizedStrings({
    en: {
        alertTitle: 'Unable to load data',
        alertDescription: 'Looks like there is no internet connection at this time.',
        alertButton: 'Try Again'
    }
});

const mapStateToProps = (state) => {
    return {
        category: state.categories.selectedCategory,
        quiz: state.quiz,
        failed: state.quiz.failed
    };
};

export default connect(mapStateToProps, {
    answerQuestion
})(Quiz);
