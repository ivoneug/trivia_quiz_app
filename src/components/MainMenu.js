import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {
    View,
    ScrollView,
    Text,
    TouchableOpacity
} from 'react-native';
import LocalizedStrings from 'react-native-localization';
import { connect } from 'react-redux';
import { categoryListFetch } from '../actions';
import { Button } from './common';
import About from './About';
import { CategoryButton } from './CategoryButton';

class MainMenu extends Component {
    componentDidMount() {
        this.props.categoryListFetch();
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
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

        categories.forEach((category, idx) => {
            if (idx % 2 === 0) {
                children.push([]);
            }

            children[children.length - 1].push((
                <CategoryButton
                    key={category.id}
                    onPress={() => this.selectCategory(category.id)}
                    text={category.name}
                    image={require('../images/instagram.png')}
                />
            ));
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

    selectCategory(categoryId) {

    }

    render() {
        const {
            titleBarIOS,
            containerStyle,
            buttonsContainer
        } = styles;

        return (
            <View style={{ flex: 1 }}>
                <View style={titleBarIOS} />
                <ScrollView style={containerStyle}>
                    {this.renderHeader()}
                    <View style={buttonsContainer}>
                        {this.renderButtons()}
                    </View>
                    {this.renderAbout()}
                </ScrollView>
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
    }
};

const strings = new LocalizedStrings({
    en: {
        header: 'Trivia Quiz',
        about: 'About'
    }
});

const mapStateToProps = (state) => {
    return {
        categories: state.categories.list
    };
};

export default connect(mapStateToProps, { categoryListFetch })(MainMenu);
