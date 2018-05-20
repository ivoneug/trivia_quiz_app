import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    Platform
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LocalizedStrings from 'react-native-localization';
import { connect } from 'react-redux';
import {
    categoryListFetch,
    difficultySelect,
    categorySelect,
    requestToken,
    getQuiz,
    clearQuiz
} from '../actions';
import { Spinner, Alert } from './common';
import About from './About';
import Quiz from './Quiz';
import { CategoryButton } from './CategoryButton';
import { SegmentedControl } from './SegmentedControl';
import MainPlaceholder from './MainPlaceholder';

class MainMenu extends Component {
    state = {
        showAbout: false,
        showQuiz: false
    }

    componentWillReceiveProps(nextProps) {
        const { loaded, token } = nextProps;

        if (loaded && loaded !== this.props.loaded) {
            this.containerView.fadeIn(300).then(() => {
                this.headerTextView.fadeInDown(600).then(() => {
                    this.aboutButtonView.bounceIn(1000);
                });
                this.difficultyControlView.fadeIn(1000);
                this.buttonsView.fadeInUpBig(600);
            });
        }

        // request token if it's not obtained
        if (!token) {
            this.props.requestToken();
        }
    }

    onPressCategoryButton(categoryId) {
        let category = this.props.categories.find(item => item.id === categoryId);
        if (categoryId === -1) {
            const idx = Math.floor(Math.random() * (this.props.categories.length - 1)) + 1;
            category = this.props.categories[idx];
        }

        this.props.categorySelect(category);
        this.setState({ showQuiz: true });

        this.startQuizRequest(category);
    }

    startQuizRequest(category) {
        const {
            selectedCategory,
            difficulty,
            token
        } = this.props;

        this.props.getQuiz(category ? category.id : selectedCategory.id, difficulty, token);
    }

    renderQuiz() {
        return (
            <Quiz
                visible={this.state.showQuiz}
                onBackPress={() => {
                    this.setState({ showQuiz: false });
                    this.props.clearQuiz();
                }}
                onQuizShouldReload={() => {
                    this.startQuizRequest();
                }}
            />
        );
    }

    renderAbout() {
        return (
            <About
                visible={this.state.showAbout}
                onBackPress={() => {
                    this.setState({ showAbout: false });
                }}
            />
        );
    }

    renderHeader() {
        const {
            headerContainer,
            headerAnimationContainer,
            headerText,
            aboutContainer,
            aboutText
        } = styles;

        return (
            <View style={headerContainer}>
                <Animatable.View
                    useNativeDriver
                    style={headerAnimationContainer}
                    ref={(view) => {
                        this.headerTextView = view;
                    }}
                >
                    <Text style={headerText}>{strings.header}</Text>
                </Animatable.View>

                <Animatable.View
                    useNativeDriver
                    style={aboutContainer}
                    ref={(view) => {
                        this.aboutButtonView = view;
                    }}
                >
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({ showAbout: true });
                        }}
                    >
                        <Text style={aboutText}>{strings.about}</Text>
                    </TouchableOpacity>
                </Animatable.View>
            </View>
        );
    }

    renderButtons() {
        const {
            buttonsRowContainer,
            categoryImageStyle,
            categoryImageIOSStyle
        } = styles;
        const { categories } = this.props;
        const children = [];

        const categoryTextStyle = [categoryImageStyle];
        if (Platform.OS === 'ios') {
            categoryTextStyle.push(categoryImageIOSStyle);
        }

        const createCategoryButton = (category) => {
            return (
                <CategoryButton
                    key={category.id}
                    onPress={() => this.onPressCategoryButton(category.id)}
                    text={category.name}
                >
                    <Text style={categoryTextStyle}>{category.image}</Text>
                </CategoryButton>
            );
        };

        const randomCategory = categories.find(category => category.id === -1);
        if (randomCategory) {
            children.push([createCategoryButton(randomCategory)]);
        }

        categories.filter(category => category.id !== -1)
            .forEach((category, idx) => {
                // for random category we should create additional row
                if (category.id === -1) return;
                if (idx % 2 === 0) {
                    children.push([]);
                }

                children[children.length - 1]
                    .push(createCategoryButton(category));
            });

        return children.map((items, idx) => {
            return (
                <View
                    key={idx}
                    style={buttonsRowContainer}
                >
                    {items}
                </View>
            );
        });
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
                    this.props.categoryListFetch();
                }}
            />
        );
    }

    render() {
        const { loaded, difficulty } = this.props;

        const {
            titleBarIOS,
            containerStyle,
            containerIOSStyle,
            buttonsContainer,
            difficultyControl,
            difficultySelectStyle
        } = styles;

        const containerStyles = [containerStyle];
        if (Platform.OS === 'ios') {
            containerStyles.push(containerIOSStyle);
        }

        return (
            <View style={{ flex: 1 }}>
                <Animatable.View
                    useNativeDriver
                    style={{ flex: 1, opacity: 0 }}
                    ref={(view) => { this.containerView = view; }}
                >
                    {Platform.OS === 'ios' ? <View style={titleBarIOS} /> : null}
                    <ScrollView style={containerStyles}>
                        {this.renderHeader()}

                        <Animatable.View
                            style={{ opacity: 0 }}
                            useNativeDriver
                            ref={(view) => {
                                this.difficultyControlView = view;
                            }}
                        >
                            <Text style={difficultySelectStyle}>{strings.difficulty}</Text>
                            <SegmentedControl
                                style={difficultyControl}
                                sections={[
                                    strings.easy,
                                    strings.medium,
                                    strings.hard,
                                    strings.random
                                ]}
                                selectedSection={difficulty}
                                onSectionChange={(section) => {
                                    this.props.difficultySelect(section);
                                }}
                            />
                        </Animatable.View>

                        <Animatable.View
                            style={buttonsContainer}
                            useNativeDriver
                            ref={(view) => {
                                this.buttonsView = view;
                            }}
                        >
                            {this.renderButtons()}
                        </Animatable.View>
                    </ScrollView>
                </Animatable.View>

                {this.renderQuiz()}
                {this.renderAbout()}
                <Spinner
                    color='#000000'
                    visible={!loaded}
                />
                {this.renderNetworkAlert()}

                <MainPlaceholder
                    onFinish={() => {
                        this.props.categoryListFetch();
                    }}
                />
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1
    },
    containerIOSStyle: {
        marginTop: 20
    },
    buttonsContainer: {
        flex: 1,
        justifyContent: 'space-around',
        opacity: 0
    },
    buttonsRowContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 25,
        marginRight: 25
    },
    categoryImageStyle: {
        height: 40,
        fontSize: 32,
        textAlign: 'center',
        marginBottom: 3
    },
    categoryImageIOSStyle: {
        marginLeft: 3,
        marginBottom: 0
    },
    headerContainer: {
        height: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerAnimationContainer: {
        opacity: 0
    },
    headerText: {
        fontSize: 38
    },
    titleBarIOS: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 20,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2
    },
    aboutContainer: {
        position: 'absolute',
        right: 0,
        top: 0,
        width: 80,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0
    },
    aboutText: {
        fontSize: 16
    },
    difficultyControl: {
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 20
    },
    difficultySelectStyle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 5
    }
};

const strings = new LocalizedStrings({
    en: {
        header: 'Trivia Quiz',
        about: 'About',
        easy: 'Easy',
        medium: 'Medium',
        hard: 'Hard',
        random: 'Random',
        difficulty: 'Select difficulty',
        alertTitle: 'Unable to load data',
        alertDescription: 'Looks like there is no internet connection at this time.',
        alertButton: 'Try Again'
    }
});

const mapStateToProps = (state) => {
    return {
        categories: state.categories.list,
        selectedCategory: state.categories.selectedCategory,
        loaded: state.categories.list.length > 0,
        difficulty: state.difficulty,
        token: state.token,
        failed: state.categories.failed
    };
};

export default connect(mapStateToProps, {
    categoryListFetch,
    difficultySelect,
    categorySelect,
    requestToken,
    getQuiz,
    clearQuiz
})(MainMenu);
