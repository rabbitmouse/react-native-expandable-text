
# react-native-expandable-text

## Getting started

`$ npm install react-native-expandable-text --save`

### Mostly automatic installation

`$ react-native link react-native-expandable-text`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-expandable-text` and add `RNExpandableText.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNExpandableText.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.reactlibrary.RNExpandableTextPackage;` to the imports at the top of the file
  - Add `new RNExpandableTextPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-expandable-text'
  	project(':react-native-expandable-text').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-expandable-text/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-expandable-text')
  	```


## Usage
```javascript
import RNExpandableText from 'react-native-expandable-text';

// TODO: What to do with the module?
RNExpandableText;
```
  