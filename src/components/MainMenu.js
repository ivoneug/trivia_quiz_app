import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {
    View,
    ScrollView,
    Text,
    TouchableOpacity
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LocalizedStrings from 'react-native-localization';
import { connect } from 'react-redux';
import { categoryListFetch, difficultySelect } from '../actions';
import { Spinner } from './common';
import About from './About';
import { CategoryButton } from './CategoryButton';
import { SegmentedControl } from './SegmentedControl';

class MainMenu extends Component {
    componentDidMount() {
        this.props.categoryListFetch();
    }

    componentWillReceiveProps(nextProps) {
        const { loaded } = nextProps;

        if (loaded && loaded !== this.props.loaded) {
            this.containerView.fadeIn(300);
        }
    }

    selectCategory(categoryId) {

    }

    renderAbout() {
        return (
            <About
                visible={this.props.showAbout}
                onBackPress={() => {
                    Actions.refresh({ showAbout: false });
                }}
            />
        );
    }

    renderHeader() {
        const {
            headerContainer,
            headerText,
            aboutContainer,
            aboutText
        } = styles;

        return (
            <View style={headerContainer}>
                <Text style={headerText}>{strings.header}</Text>
                <TouchableOpacity
                    style={aboutContainer}
                    onPress={() => {
                        Actions.refresh({ showAbout: true });
                    }}
                >
                    <Text style={aboutText}>{strings.about}</Text>
                </TouchableOpacity>
            </View>
        );
    }

    renderButtons() {
        const { buttonsRowContainer } = styles;
        const { categories } = this.props;
        const children = [];

        const createCategoryButton = (category) => {
            return (
                <CategoryButton
                    key={category.id}
                    onPress={() => this.selectCategory(category.id)}
                    text={category.name}
                    image={require('../images/instagram.png')}
                />
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

    render() {
        const { loaded, difficulty } = this.props;

        const {
            titleBarIOS,
            containerStyle,
            buttonsContainer,
            difficultyControl,
            difficultySelect
        } = styles;

        return (
            <View style={{ flex: 1 }}>
                <Animatable.View
                    useNativeDriver
                    style={{ flex: 1, opacity: 0 }}
                    ref={(view) => { this.containerView = view; }}
                >
                    <View style={titleBarIOS} />
                    <ScrollView style={containerStyle}>
                        {this.renderHeader()}

                        <Text style={difficultySelect}>{strings.difficulty}</Text>
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

                        <View style={buttonsContainer}>
                            {this.renderButtons()}
                        </View>
                    </ScrollView>
                </Animatable.View>

                {this.renderAbout()}
                <Spinner
                    visible={!loaded}
                />
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        marginTop: 20
    },
    buttonsContainer: {
        flex: 1,
        justifyContent: 'space-around'
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
    headerContainer: {
        height: 100,
        alignItems: 'center',
        justifyContent: 'center'
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
        justifyContent: 'center'
    },
    aboutText: {
        fontSize: 16
    },
    difficultyControl: {
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 20
    },
    difficultySelect: {
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
        difficulty: 'Select difficulty'
    }
});

const mapStateToProps = (state) => {
    return {
        categories: state.categories.list,
        loaded: state.categories.list.length > 0,
        difficulty: state.difficulty
    };
};

export default connect(mapStateToProps, {
    categoryListFetch,
    difficultySelect
})(MainMenu);
