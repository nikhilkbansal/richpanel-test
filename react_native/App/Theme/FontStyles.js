
import { material } from 'react-native-typography';
import RF from 'react-native-responsive-fontsize';

// Finds fontsize from object make it responsive
function rf(style) {
  const newStyle = { ...style };
  const percentageFactor = 6.5;
  if (newStyle.fontSize) {
    newStyle.fontSize = RF(newStyle.fontSize / percentageFactor);
  }
  return newStyle;
}

export default {
  display4: { ...rf(material.display4Object) },
  display3: { ...rf(material.display3Object) },
  display2: { ...rf(material.display2Object) },
  display1: { ...rf(material.display1Object) },
  headline: { ...rf(material.headlineObject) },
  subheading: { ...rf(material.subheadingObject) },
  title: { ...rf(material.titleObject) },
  body2: { ...rf(material.body2Object) },
  body1: { ...rf(material.body1Object) },
  caption: { ...rf(material.captionObject) },
  button: { ...rf(material.buttonObject) },
};
