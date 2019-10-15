import React, { Fragment, Component } from 'react';
import {
  View, StyleSheet, ScrollView, 
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import CheckBox from 'react-native-checkbox';
import {
  NavigationBar, TextInput, Button, Text
} from '../../Components';
import {
  Colors, FontSizes, Fonts, FontStyles, ApplicationStyles,
} from '../../Theme';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: ApplicationStyles.smokeBackground.color },
  subContainer: {
    width: 100,
    height: 100,
    margin: 2,
    borderColor: 'black',
    borderWidth: StyleSheet.hairlineWidth,
  },
  mainContainer: { flex: 1, flexWrap: 'wrap', flexDirection: 'row' },
});

const colors = [
  '#222222' /** '#1e1e1e' */, '#fff', '#949ea7', '#757e90', '#179ce1' /** '#00aced' */, '#989898' /** '#9b9b9b' */, '#484848', '#333333'/** '#343434' */,
  '#27282b',
  '#000000',
];

const iconsColors = ['#fff', '#979797', '#e6bd17', '#9eb5c1', '#179ce1'];
const backgroundColors = ['#fff', 'rgba(0,0,0,0.050980392156862744)' /* 3 hours ago bg on dashboard */, '#F2F2F2'/* dashboard bg */, '#D93842'/** edit profile delete image icon */];
const fontWeights2 = [
  'Roboto-Bold',
  'Roboto-Medium',
  'Roboto-Light',
  'Roboto-Thin',
];

class StyleGuide extends Component {
  static get propTypes() {
    return {
      navigation: PropTypes.func.isRequired,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: ApplicationStyles.lightColor.color
    };
    this.getViewWithBgColor = this.getViewWithBgColor.bind(this);
  }

  textWithStyle(style={}, label='', custom = {}){
    return <Text style={[style, {padding: 10}, {...custom}]}>{label +":  "}A few minutes later they all marched in and took their places at the table</Text>
  }

  getViewWithBgColor(bgColor, label=''){
  return <View style={[styles.subContainer, { backgroundColor: bgColor.color }]} >
      <Text onPress={()=>this.setState({backgroundColor: bgColor.color})} style={[{padding: 10, }]}>{label}</Text>
    </View>
  }
  
  getCardWithBgElevation(elevationStyle, label=''){
    return <View style={[styles.subContainer, {borderColor: 'transparent', backgroundColor: ApplicationStyles.lightBackground.color, ...elevationStyle }]} >
        <Text   style={[{padding: 10, }]}>{label}</Text>
      </View>
    }

  getTextWithColor(bgColor, label='',){
    return <View style={[styles.subContainer, ]} >
        <Text style={[{color:  bgColor.color, }]}>{label}</Text>
      </View>
    }


  render() {
    const { navigation } = this.props;
    const { backgroundColor } = this.state;
    return (
      <ScrollView style={styles.container,{backgroundColor }}>
        <NavigationBar {...navigation} showLeftSection={false} title="Style guide" />

       
        <Text>Background Colors: </Text>
        <View style={styles.mainContainer}>

          {this.getViewWithBgColor(ApplicationStyles.smokeBackground, 'smokeBackground')}
          {this.getViewWithBgColor(ApplicationStyles.lightBackground, 'lightBackground')}
          {this.getViewWithBgColor(ApplicationStyles.grayishBackground, 'grayishBackground')}
          {this.getViewWithBgColor(ApplicationStyles.primaryBackground, 'primaryBackground')}

        </View>

       
        <Text>Cards: </Text>
        <View style={styles.mainContainer}>

          {this.getCardWithBgElevation(ApplicationStyles.elevationS, 'elevationS')} 
          {this.getCardWithBgElevation(ApplicationStyles.elevationM, 'elevationM')} 
          {this.getCardWithBgElevation(ApplicationStyles.elevationL, 'elevationL')} 
          {this.getCardWithBgElevation(ApplicationStyles.elevationXL, 'elevationXL')} 

        </View>
        


        <Text>Font/Icons Colors: </Text>
        <View style={styles.mainContainer}>
        {this.getTextWithColor(ApplicationStyles.primaryColor, 'primaryColor')}
        {this.getTextWithColor(ApplicationStyles.warningColor, 'warningColor')}
        {this.getTextWithColor(ApplicationStyles.disabledColor, 'disabledColor')}
        {this.getTextWithColor(ApplicationStyles.darkColor, 'darkColor')}
        {this.getTextWithColor(ApplicationStyles.lightColor, 'lightColor')}

        {this.getTextWithColor(ApplicationStyles.loveColor, 'loveColor')}
        {this.getTextWithColor(ApplicationStyles.celebrateColor, 'celebrateColor')}
        {this.getTextWithColor(ApplicationStyles.insightFulColor, 'insightFulColor')}
        {this.getTextWithColor(ApplicationStyles.sadColor, 'sadColor')}
        </View>

        
        {this.textWithStyle(ApplicationStyles.headline, 'headline')}
        {this.textWithStyle(ApplicationStyles.headline2,'headline2')}

        {this.textWithStyle(ApplicationStyles.headline3,'headline3')/** nero */}

        {this.textWithStyle(ApplicationStyles.subHeadline,'subHeadline')/** Slategrey */}

        {this.textWithStyle(ApplicationStyles.textInputLabel,'textInputLabel')}
        {this.textWithStyle(ApplicationStyles.textInputValue,'textInputValue')}
        {this.textWithStyle(ApplicationStyles.button,'button')}
        {this.textWithStyle(ApplicationStyles.body,'body')}
        {this.textWithStyle(ApplicationStyles.body2,'body2')}
        {this.textWithStyle(ApplicationStyles.body3,'body3')}
        {this.textWithStyle(ApplicationStyles.info,'info')}
        {this.textWithStyle(ApplicationStyles.info1,'info1')}
        {this.textWithStyle(ApplicationStyles.info2,'info2')}
        {this.textWithStyle(ApplicationStyles.info3,'info3')}
        {this.textWithStyle(ApplicationStyles.link,'link')}
        {this.textWithStyle(ApplicationStyles.primaryInfo,'primaryInfo')}
        {this.textWithStyle(ApplicationStyles.avatarTitle,'avatarTitle')}
        {this.textWithStyle(ApplicationStyles.avatarSubtitle,'avatarSubtitle')}
        {/* {this.textWithStyle(ApplicationStyles.bodyHeading,'bodyHeading')} */}
        {this.textWithStyle(ApplicationStyles.bodySubHeading,'bodySubHeading')}
        {this.textWithStyle(ApplicationStyles.bodySubHeading2,'bodySubHeading2')}
        {this.textWithStyle(ApplicationStyles.tabLabelStyle,'tabLabelStyle')}

        <Text>Font Weights: </Text>
        <View style={{ flex: 1, flexWrap: 'wrap', height: 300 }}>
          {
            fontWeights2.map(o => (
              <View style={{
                backgroundColor: '#fff',
                width: 100,
                margin: 2,
                borderColor: 'black',
                borderWidth: StyleSheet.hairlineWidth,
                alignContent: 'center',
                justifyContent: 'center',
              }}
              >
                <Text style={{ fontFamily: o, fontSize: 23, }}>
                Text
                  {' '}
                  {o}
                </Text>
              </View>
            ))
          }
        </View>
      </ScrollView>
    );
  }
}


export default StyleGuide;

/**
 *
 *
 * Login:
font-size: 66px;
color: #27282b;
font-family: "Roboto";
font-weight: 700;


Get started with:
font-size: 46px;
color: #757e90;
font-family: "Open Sans";
font-weight: 300;


Label:
font-size: 36px;
color: #757e90;
font-family: "Roboto";
font-weight: 400;


Value:
font-size: 50px;
color: #27282b;
font-family: "Roboto";
font-weight: 700;


Remember Pass:
font-size: 40px;
color: #27282b;
font-family: "Roboto";
font-weight: 400;


Continue to login:
font-size: 43px;
color: #;;
font-family: "Open Sans";
font-weight: 700;
text-align: center;


Don't have a account:
font-size: 50px;
line-height: 55px;
color: #949ea7;
font-family: "Roboto";
font-weight: 400;


//////////////// notification:
message:
font-size: 40px;
line-height: 50px;
color: #00aced;
font-family: "Roboto";
font-weight: 400;

time:
font-size: 35px;
line-height: 66px;
color: #989898;
font-family: "Roboto";
font-weight: 400;


////////////////homepage
Awatar name:
font-size: 51px;
color: #000000;
font-family: "Roboto";
font-weight: 500;

3h ago:
font-size: 38px;
color: #000000;
font-family: "Roboto";
font-weight: 400;

Title:
font-size: 44px;
line-height: 57px;
color: #000000;
font-family: "Roboto";
font-weight: 400;


10 People raised:
font-size: 36px;
color: #484848;
font-family: "Roboto";
font-weight: 500;


total raised:
font-size: 36px;
color: #757e90;
font-family: "Roboto";
font-weight: 400;

light gray 10000:
font-size: 53px;
color: #757e90;
font-family: "Roboto";
font-weight: 400;


blue 12500:
font-size: 66px;
color: #179ce1;
font-family: "Roboto";
font-weight: 400;

//////////////// Post Detail
Small headline:
font-size: 39px;
color: #757e90;
font-family: "Roboto";
font-weight: 400;


Ghana resident fund: title:
font-size: 72px;
color: #27282b;
font-family: "Roboto";
font-weight: 400;

Decription:
font-size: 43px;
line-height: 93px;
color: #757e90;
font-family: "Roboto";
font-weight: 400;


Donate to this button Button:
font-size: 47px;
color: #ffffff;
font-family: "Open Sans";
font-weight: 700;
text-align: center;


//Edit Profile:
Change Picture :
font-size: 45px;
line-height: 80px;
color: #1e1e1e;
font-family: "Roboto";
font-weight: 500;
text-align: center;


Post: page title:
letter-spacing: 1px;
line-height: 137px;
color: #333333;
font-family: "Roboto";
font-weight: 700;
text-align: center;


/// Profile ////
User Name:
font-size: 60px;
line-height: 80px;
color: #222222;
font-family: "Roboto";
font-weight: 500;


Fitness model:
font-size: 45px;
letter-spacing: 1px;
line-height: 80px;
color: #9b9b9b;
font-family: "Roboto";
font-weight: 400;

Male, California, address:
font-size: 45px;
line-height: 80px;
color: #222222;
font-family: "Roboto";
font-weight: 400;

My Posts
font-size: 50px;
letter-spacing: 1px;
line-height: 80px;
color: #222222;
font-family: "Roboto";
font-weight: 500;


See all:
font-size: 45px;
line-height: 80px;
color: #179ce1;
font-family: "Roboto";
font-weight: 500;

Why do we use it: post title:
font-size: 45px;
line-height: 80px;
color: #222222;
font-family: "Roboto";
font-weight: 400;


// Payment page:
Stuff name, one time payment, Monthly payment
font-size: 50px;
line-height: 43px;
color: #343434;
font-family: "Roboto";
font-weight: 400;
text-align: center;
 */
