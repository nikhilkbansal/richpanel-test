import React, { Fragment, Component } from 'react';
import {
  View, StyleSheet, FlatList, Image, ScrollView, SectionList
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import CheckBox from 'react-native-checkbox';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  Text, NavigationBar, TextInput, Button, EmptyState, FileSelector, Icon
} from '../../Components';
import { Colors, FontSizes, ApplicationStyles } from '../../Theme';
import AxiosRequest from '../../Services/HttpRequestService';
import DocumentPicker from 'react-native-document-picker';
import UploadFiles from '../../Services/UploadFilesService';
import Toast from '../../Services/ToastService';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import { CommonFunctions } from '../../Utils';
import AppActions from '../../Stores/App/Actions';
import Dialog, { DialogContent, SlideAnimation, DialogTitle } from 'react-native-popup-dialog';



const url = 'https://homepages.cae.wisc.edu/~ece533/images/arctichare.png';


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: ApplicationStyles.smokeBackground.color },
  subContainer: { flex: 1,   },
  loginContainer: {
    marginTop: hp('1%'),
    backgroundColor: ApplicationStyles.primaryColor.color,
    borderRadius: wp('2%'),
    width: wp('80%'),
    alignSelf: 'center',
    height: hp('7%'),
  },
  loginTitle: { color: ApplicationStyles.lightColor.color, textAlign: 'center', fontSize: FontSizes.h3 },
});

class SingleDonation extends Component {
  static get propTypes() {
    return {
      navigation: PropTypes.func.isRequired,
    };
  }

  constructor(props) {
    super(props);
    const { profile } = props;
    const { params } = props.navigation.state;
    const iAmDonor = (params.donation.senderId._id === profile.id);
    this.state = { 
      forPo: params && params.forPo,
      donations: [],
      donation: params.donation,
      files: [],
      file: null,
      iAmDonor,
      contactModal: false,
    };
    this.sendFile = this.sendFile.bind(this);
    this.chooseDoc = this.chooseDoc.bind(this);
    this.getFiles = this.getFiles.bind(this);
    this.updateTextInput = this.updateTextInput.bind(this);
    this.updateTransaction = this.updateTransaction.bind(this);
  }

  componentDidMount(){
    const { params } = this.props.navigation.state;
    params.donation.files && this.getFiles();
  }

  async getFiles( ) {
    const { donation } = this.state;
    try {
      const files = await AxiosRequest({
        method: 'get',
        params:{ ids: donation.files },
        url: 'files',
      });
      this.setState({ files });
      console.log('files',files)
    } catch (e) {
      console.log('eeee',e)
    }
  }

  updateTextInput(key, value) {
    this.setState({ [key]: value });
  }

  downloadFile(file){
    const { isLoading } = this.props;
    // Feel free to change main path according to your requirements.
    // IMPORTANT: A file extension is always required on iOS.
    const localFile = `${RNFS.DocumentDirectoryPath}/${file.fileOriginalName}`;
    isLoading(true);
    const options = {
      fromUrl: CommonFunctions.getFile(file._id),
      toFile: localFile,
      background:true,
    };
    RNFS.downloadFile(options).promise
    // .then(() => FileViewer.open(localFile))
    .then((space) => {
      console.log('space',space);
      FileViewer.open(localFile, {showOpenWithDialog:true});
      // success
      isLoading(false);
    })
    .catch(error => {
      // error
      isLoading(false);
      Toast('Some error occured. Please try again later');
      console.log('error',error)

    });
  }

  async chooseDoc(){
    try {
      const res = await DocumentPicker.pick({
        type:DocumentPicker.types.allFiles,
      });
      const { fileName } = this.state;
      res.name = fileName ? fileName.replace(" ", "")+'.'+res.type.split('/')[1] : res.name;
      res.path = res.uri;
      res.mime = res.type;
      this.setState({file: res}); 
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('canceld')
        // User cancelled the picker, exit any dialogs or menus and move on
      }  
    }
  }

 
  getRow(label, value, func = null){
    return <View style={{ flexDirection:'row', justifyContent:'center', alignItems:'center', alignContent:'center', paddingLeft:wp('8%')}}>
    <Text style={{ paddingVertical:hp('0.4%'),flex:1,  ...ApplicationStyles.fontStyles.body1,textAlign:'left'}}>{label}</Text>
    <Text style={{paddingVertical:hp('0.4%'),flex:1  ,...ApplicationStyles.fontStyles.body2,textAlign:'left', color:func? ApplicationStyles.primaryColor.color: ApplicationStyles.darkColor.color, }} onPress={()=>func && func()}>{value}</Text>
  </View>
  }

  async sendFile(){
    const { file, donation } = this.state;
    console.log(file)
    const filesUploaded = await UploadFiles([file]);
    donation.files.push(filesUploaded[0]._id)
    this.updateTransaction({ files: donation.files, transactionId: donation._id});
  }

  async updateTransaction(body) { 
    const { donation } = this.state;
    try { 
       await AxiosRequest({
        method: 'patch',
        data: {...body },
        url: 'payment/transaction',
      });
      this.setState({ file: null, fileName: '', donation: {...donation, files:body.files} },()=>{
        this.getFiles();
      });
    } catch (e) {
      console.log('eeee',e)
    }
  }

  render() { 

    const { navigation, navigation: { navigate } } = this.props;
    const { file, donation, iAmDonor, files, fileName, contactModal } = this.state;
 
    return (
      <View style={styles.container}>
        <NavigationBar {...navigation} title="Donation" />
        <Dialog
            visible={contactModal}
            dialogAnimation={new SlideAnimation({
              slideFrom: 'bottom',
            })}
            onTouchOutside={() => {
              this.setState({ contactModal: false });
            }}
            dialogTitle={<DialogTitle title="Contact" textStyle={{ ...ApplicationStyles.fontStyles.caption }} />}
          >
            {donation.receiverId && donation.receiverId.poInfo && <DialogContent style={{ width: wp('80%'), height: hp('15%'), paddingBottom:0,}}>
              <View style={{flex:1,flexDirection:'row', alignItems:'center', alignContent:'center' }}>
                {donation.receiverId.poInfo && donation.receiverId.poInfo.publicEmail && <Button onPress={()=>CommonFunctions.openUrl(`mailto:${donation.receiverId.poInfo.publicEmail}`)} style={{flex:1}} buttonWrapperStyle={{flex:1, justifyContent: 'center', alignItems:'center'}}>
                  <Icon name='mail' iconFamily='AntDesign' />
                  <Text style={{...ApplicationStyles.fontStyles.body2, marginTop: hp('1%')}}>{donation.receiverId.poInfo.publicEmail}</Text>
                </Button>}
                {donation.receiverId.poInfo && donation.receiverId.poInfo.publicPhone && <Button  onPress={()=>CommonFunctions.openUrl(`tel:${donation.receiverId.poInfo.publicPhone}`)} style={{flex:1}}  buttonWrapperStyle={{flex:1, justifyContent: 'center', alignItems:'center'}}>
                  <Icon name='phone' iconFamily='AntDesign' />
                  <Text style={{...ApplicationStyles.fontStyles.body2, marginTop: hp('1%')}}>{donation.receiverId.poInfo.publicPhone}</Text>
                </Button>}
                {!donation.receiverId.poInfo || (!donation.receiverId.poInfo.publicEmail && !donation.receiverId.poInfo.publicPhone) &&
                  <View style={{flex:1, justifyContent: 'center', alignItems:'center'}}>
                    <Text style={{...ApplicationStyles.fontStyles.body2, marginTop: hp('1%')}}>No shared information found!</Text>
                  </View>}
              </View>
            </DialogContent>}
          </Dialog>
        <KeyboardAwareScrollView style={styles.subContainer}>        
        <View style={{  flexDirection: 'column', marginVertical: ApplicationStyles.listItemsSpace, paddingVertical: hp('1%'),backgroundColor:ApplicationStyles.lightBackground.color,  }}>
          {this.getRow('Transaction no.',  donation.txData.orderId || 'NA' )}
          {this.getRow('Donor',   `${donation.senderId.name} (@${donation.senderId.userName})` , ()=> navigate(donation.senderId.role ==='user'? 'Profile': 'NgoProfile', {poUserId:donation.senderId._id, userId:donation.senderId._id }) )}
          {this.getRow('Philanthropy org.',  `${donation.receiverId.name} (@${donation.receiverId.userName})`, ()=>navigate(donation.receiverId.role ==='user'? 'Profile': 'NgoProfile', {poUserId:donation.receiverId._id, userId:donation.receiverId._id }))}
          {donation.postId && this.getRow('Campaign', donation.postId.title, ()=>{})}  
          {this.getRow('Date', moment(donation.createdAt).format('hh:mm A DD MMM YYYY'))}
          {this.getRow('Donated', '₹'+donation.amount)}
          {this.getRow('Deduction', '₹0')}
          {this.getRow('PO Received', '₹'+donation.amount)}
          {iAmDonor && <View style={{flexDirection: 'row', alignContent:'center', justifyContent:'space-around', paddingVertical: hp('1%')}}>
            <Button onPress={()=>this.setState({contactModal: true})} title='CONTACT PO' style={{   height:hp('5%'),  }} buttonWrapperStyle={{flex:1, }} titleStyle={{...ApplicationStyles.fontStyles.button, color:ApplicationStyles.primaryColor.color}}  ></Button>
          </View> }
        </View>

       
       { !iAmDonor && <View style={{  flexDirection: 'column', marginVertical: ApplicationStyles.listItemsSpace, paddingVertical: hp('1%'),backgroundColor:ApplicationStyles.lightBackground.color,  }}>
          <View style={{ flexDirection:'row', justifyContent:'center', alignItems:'center', alignContent:'center', paddingLeft:wp('8%')}}>
            <Text style={{ paddingVertical:hp('0.4%'),flex:1,  ...ApplicationStyles.fontStyles.caption,textAlign:'center'}}>Send Attachments</Text>
          </View>
          
          <View style={{flexDirection: 'column', paddingHorizontal: wp('4%'), alignContent:'center', justifyContent:'space-around', paddingVertical: hp('1%')}}>
            <TextInput
              label="File name"
              returnKeyType="done"
              optional
              value={fileName}
              onChangeText={text => this.updateTextInput('fileName', text)}
              placeholder="File name to identify it later i.e. taxexemption"
            />
            <Button title={file?'Choose other file (1 file selected)': 'Choose file'} onPress={this.chooseDoc} style={{   height:hp('5%'),  }} buttonWrapperStyle={{flex:1, }} titleStyle={{...ApplicationStyles.fontStyles.button, color:ApplicationStyles.primaryColor.color}} ></Button>
            {!file && <Text style={{...ApplicationStyles.fontStyles.caption, textAlign: 'center'}}>Only image(png, jpg etc) or pdf</Text>}
            {file && <Button
              style={styles.loginContainer}
              titleStyle={styles.loginTitle}
              onPress={this.sendFile}
              title="SEND"
            />}
          </View> 
        </View>}
        <View style={{  flexDirection: 'column', marginVertical: ApplicationStyles.listItemsSpace, paddingVertical: hp('1%'),backgroundColor:ApplicationStyles.lightBackground.color,  }}>
          <View style={{ flexDirection:'row', justifyContent:'center', alignItems:'center', alignContent:'center', paddingLeft:wp('8%')}}>
            <Text style={{ paddingVertical:hp('0.4%'),flex:1,  ...ApplicationStyles.fontStyles.caption,textAlign:'center'}}>{files.length === 0 && 'No'} Attachments</Text>
          </View>
          <View  >
            {files && files.map(o=>this.getRow(moment(o.createdAt).format('hh:mm A  DD MMM YYYY'), o.fileOriginalName, ()=>this.downloadFile(o)))}
          </View>
        </View>

        </KeyboardAwareScrollView>

      </View>
    );
  }
}

export default connect(
  ({ user: { profile } }) => ({ profile }), {
    isLoading: AppActions.isLoading 
  },
)(SingleDonation);
