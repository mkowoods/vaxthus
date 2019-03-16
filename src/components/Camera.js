
import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AlertIOS
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import RNFetchBlob from 'react-native-fetch-blob'
import firebase from 'firebase';


'use strict';

const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];
  
  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);
    
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    
    const byteArray = new Uint8Array(byteNumbers);
    
    byteArrays.push(byteArray);
  }
  
  const blob = new Blob(byteArrays, {type: contentType});
  return blob;
}



class Camera extends Component {
  render() {
    return (
      <View style={styles.container}>
        <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style = {styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
        />
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',}}>
        <TouchableOpacity
            onPress={this.takePicture.bind(this)}
            style = {styles.capture}
        >
            <Text style={{fontSize: 14}}> SNAP </Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  }

  takePicture = async function() {
    const mime = 'image/jpeg'
    const name = 'test-2.jpeg'
    let uploadBlob = null;
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options)
      console.log(data.base64)
      console.log(data.uri)
      const imageRef = firebase.storage().ref('/jobs')
      // Blob.clearCache();
      // Blob.build(data.base64, {type: `${mime};BASE64`})
      // .then(blob => {
      //   uploadBlob = blob;
      //   // console.log(uploadBlob)
      //   return imageRef.put(blob, { contentType: mime, name: name });
      // })

      const blob = b64toBlob(data.base64, 'image/jpeg;base64')

      imageRef.put(blob, { contentType: mime, name: name })
        .then(() => {
          console.log("image Ref uploaded")
          return imageRef.getDownloadURL();
        })
        .then(url => {
          console.log("download url", url)
          AlertIOS.alert(url)
        })
        .catch(error => {
          AlertIOS.alert(error)
        })
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
  }
});

export default Camera;