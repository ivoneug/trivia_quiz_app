import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { View } from 'react-native';
import LocalizedStrings from 'react-native-localization';
import { connect } from 'react-redux';
import { categoryListFetch } from '../actions';
import { Button } from './common';
import About from './About';

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

    render() {
        const {
            containerStyle,
            buttonsContainer
        } = styles;

        return (
            <View style={containerStyle}>
                <View style={buttonsContainer}>
                </View>
                {this.renderAbout()}
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonsContainer: {
        width: 200,
        height: 230,
        justifyContent: 'space-around'
    }
};

const strings = new LocalizedStrings({
    en: {
    }
});

const mapStateToProps = (state) => {
    return {
        categories: state.categories
    };
};

export default connect(mapStateToProps, { categoryListFetch })(MainMenu);
