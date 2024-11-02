import {Platform} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

export function getImageFromGallery(callback = () => {}) {
  ImagePicker.openPicker({
    width: 300,
    height: 300,
    cropping: true,
    cropperCircleOverlay: true,
    cropperRotateButtonsHidden: true,
    loadingLabelText: 'Processing assets...',
    useFrontCamera: true,
    waitAnimationEnd: true,
    cropperToolbarTitle: 'Profile Picture',
    avoidEmptySpaceAroundImage: true,
    includeExif: true,
    mediaType: 'photo',
  })
    .then(image => {
      const imageUri = Platform.OS === 'ios' ? image.path : image.path;

      let arr = image.path.split('/');
      let getOriginalname = arr[arr.length - 1];
      let imageObj = {
        name: getOriginalname,
        type: image.mime,
        uri:
          Platform.OS === 'android'
            ? image.path
            : image.path.replace('file://', ''),
      };

      callback({
        uri: imageUri,
        path: imageObj,
      });
    })
    .catch(err => {
      callback(false);
      console.log(err);
    });
}

export function getImageFromCamera(callback = () => {}, size) {
  ImagePicker.openCamera({
    width: 300,
    height: 300,
    cropping: true,
    cropperCircleOverlay: true,
    cropperRotateButtonsHidden: true,
    loadingLabelText: 'Processing assets...',
    useFrontCamera: true,
    waitAnimationEnd: true,
    cropperToolbarTitle: 'Profile Picture',
    avoidEmptySpaceAroundImage: true,
    includeExif: true,
    mediaType: 'photo',
  })
    .then(image => {
      const imageUri = Platform.OS === 'ios' ? image.path : image.path;

      let arr = image.path.split('/');
      let getOriginalname = arr[arr.length - 1];
      let imageObj = {
        name: getOriginalname,
        type: image.mime,
        uri:
          Platform.OS === 'android'
            ? image.path
            : image.path.replace('file://', ''),
      };

      callback({
        uri: imageUri,
        path: imageObj,
      });
    })
    .catch(err => {
      callback(false);
      console.log(err);
    });
}
