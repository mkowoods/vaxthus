//Handle Image upload
import RNFetchBlob from 'react-native-fetch-blob';
import firebase from 'firebase';
import {TEST_USER_ID} from '../secret-config';

const storage = firebase.storage()

const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

export const uploadImageBase64 = (b64, mime = 'image/jpeg') => {
  return new Promise((resolve, reject) => {
    // const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
    // const sessionId = new Date().getTime()
    let uploadBlob = null
    const imageRef = storage.ref('images').child()

    fs.readFile(uploadUri, 'base64')
      .then((data) => {
        return Blob.build(data, { type: `${mime};BASE64` })
      })
      .then((blob) => {
        uploadBlob = blob
        return imageRef.put(blob, { contentType: mime })
      })
      .then(() => {
        uploadBlob.close()
        return imageRef.getDownloadURL()
      })
      .then((url) => {
        resolve(url)
      })
      .catch((error) => {
        reject(error)
    })
  })
}