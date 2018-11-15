import React,{Component} from 'react';
import { Text, ScrollView, Animated } from 'react-native';
import { Examples, Screen, TextInput, Card, View, FormGroup, Switch, Caption } from '@shoutem/ui';

export default class Scroll extends Component  {
    constructor(props) {
        super(props);
        this.state = {
            scrollY: new Animated.Value(0)
        };
    }
    render() {
    return (
        <Animated.ScrollView
            scrollEventThrottle={16}
            onScroll={Animated.event(
                [
                    {
                        nativeEvent: { contentOffset: { y: this.state.scrollY } }
                    }
                ],
                {
                    useNativeDriver: true  // <- Native Driver used for animated events
                }
            )}
        >
            <View styleName="space-between">
                {this.props.children}
            </View>
        </Animated.ScrollView>

    );
}
}