import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

class SegmentedControl extends Component {
    state = { selectedSection: 0 }

    componentWillReceiveProps(nextProps) {
        this.setState({
            selectedSection: nextProps.selectedSection
        });
    }

    render() {
        const { style, onSectionChange } = this.props;
        let { sections } = this.props;
        if (sections == null) sections = ['Empty Section'];

        const sectionItems = sections.map((sectionName, idx) => {
            const sectionStyle = [styles.sectionStyle];
            let textStyle = styles.deselectedText;

            if (idx === this.state.selectedSection) {
                sectionStyle.push(styles.selectedSection);
                textStyle = styles.selectedText;
            } else {
                sectionStyle.push(styles.deselectedSection);
            }
            if (idx === 0) {
                sectionStyle.push(styles.sectionFirstItem);
            }

            return (
                <TouchableOpacity
                    key={idx}
                    style={sectionStyle}
                    onPress={() => {
                        if (idx === this.state.selectedSection) {
                            return;
                        }

                        this.setState({
                            selectedSection: idx
                        });

                        if (onSectionChange) {
                            onSectionChange(idx);
                        }
                    }}
                >
                    <Text style={textStyle}>{sectionName}</Text>
                </TouchableOpacity>
            );
        });

        return (
            <View style={[styles.containerStyle, style]}>
                {sectionItems}
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        flexDirection: 'row',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        backgroundColor: 'white',
        borderColor: 'rgba(128, 128, 128, 1)',
        borderWidth: 1,
    },
    sectionStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 5,
        paddingBottom: 5,
        borderLeftWidth: 1,
        borderColor: 'rgba(128, 128, 128, 1)'
    },
    sectionFirstItem: {
        borderLeftWidth: 0
    },
    selectedSection: {
        backgroundColor: 'rgba(128, 128, 128, 1)'
    },
    deselectedSection: {

    },
    selectedText: {
        fontSize: 16,
        color: 'white'
    },
    deselectedText: {
        fontSize: 16,
        color: 'rgba(128, 128, 128, 1)'
    }
};

export { SegmentedControl };
