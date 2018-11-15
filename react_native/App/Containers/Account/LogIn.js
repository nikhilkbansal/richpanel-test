import React from 'react';
import {  ScrollView} from 'react-native';
import styles from './LogInStyle';
// import { BlurView, VibrancyView } from 'react-native-blur';
import  Container  from "../../Components/Container";
import { TextInput, View, FormGroup, Button, Caption, Text, Divider } from '@shoutem/ui';

export default function () {
  return (
    <Container>
      <View styleName="flexible vertical v-center h-center" style={{marginTop: 200}}>
        <FormGroup styleName="stretch">
          <Caption>NAME</Caption>
          <TextInput
            placeholder="Username or Email"
          />
        </FormGroup>
        <FormGroup styleName="stretch">
          <Caption>Password</Caption>
          <TextInput
            placeholder="Password"
          />
        </FormGroup>
        <Divider />
        <View styleName="horizontal">
          <Button styleName="confirmation">
            <Text>SIGNUP</Text>
          </Button>
          <Button styleName="confirmation secondary">
            <Text>LOGIN</Text>
          </Button>
        </View>
      </View>
    </Container>
  );
}