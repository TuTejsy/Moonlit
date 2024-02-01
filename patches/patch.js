const fs = require('fs');

const fileData = fs.readFileSync('./patches/react-native/RCTPullToRefreshViewComponentView.mm');
const reactNativePullToRefreshPath = './node_modules/react-native/React/Fabric/Mounting/ComponentViews/ScrollView/RCTPullToRefreshViewComponentView.mm';
fs.writeFileSync(reactNativePullToRefreshPath, fileData);

console.log('patch succeed');
