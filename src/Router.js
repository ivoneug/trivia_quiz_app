import React, { Component } from 'react';
import {
    Scene,
    Router,
    Actions
} from 'react-native-router-flux';
import SplashScreen from 'react-native-splash-screen';
import LocalizedStrings from 'react-native-localization';
import MainMenu from './components/MainMenu';

class RouterComponent extends Component {
    componentDidMount() {
        setTimeout(() => {
            SplashScreen.hide();
        }, 500);
    }

    render() {
        return (
            <Router
                sceneStyle={{ backgroundColor: 'white' }}
            >
                <Scene
                    key='root'
                    activeBackgroundColor='black'
                    inactiveBackgroundColor='white'
                >
                    <Scene
                        initial
                        key='mainMenu'

                        title={strings.title}

                        rightTitle={strings.about}
                        rightButtonTextStyle={{ color: 'black', paddingLeft: 5 }}
                        onRight={() => Actions.refresh({ showAbout: true })}

                        component={MainMenu}
                    />
                </Scene>
            </Router>
        );
    }
}

const strings = new LocalizedStrings({
    en: {
        title: 'Trivia Quiz',
        about: 'About',
        back: 'Back'
    }
});

export default RouterComponent;
