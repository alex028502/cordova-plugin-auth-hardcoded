Apache Cordova Auth Dialog
=============================
Adds support for authentication dialogs into Apache Cordova.

####Supported Platforms####

- Android
- iOS
- Windows (includes Windows Phone 8.1)
- Windows Phone 8.0

####Supported Authentication Methods####

- Basic
- Digest
- NTLM
 
##Platform quirks##

####Android####

**Pending the following PR to be merged and released to have this working**:
https://github.com/apache/cordova-android/pull/143

No additional set up is required. Implementation is based on providing custom handler for [WebViewClient.onReceivedHttpAuthRequest](http://developer.android.com/reference/android/webkit/WebViewClient.html#onReceivedHttpAuthRequest(android.webkit.WebView, android.webkit.HttpAuthHandler, java.lang.String, java.lang.String)) which is automatically triggered when it is necessary during navigation or sending XmlHttpRequests.

Credentials are NOT persisted between app sessions so you need to enter them once per application start.

InAppBrowser plugin is NOT currently supported.

####iOS####

Requires manually executing the following method before accessing protected space (navigation or XmlHttpRequests).

```authDialog.authenticate(uri, /*optional*/ successCallback, /*optional*/ errorCallback,  /*optional*/ userName,  /*optional*/ password,  /*optional*/ maxAttempts)```

Credentials are automatically cached by UIWebView so you do NOT need to enter them every app start. In this case ```authDialog.authenticate``` is executed w/o showing any credentials pop-up dialog.

After authentication is you can do XmlHttpRequests or display protected space via ```window.location = 'some protected uri' ``` or using InAppBrowser plugin.

####Windows####

On Windows Tablet/PC (Windows 8.0 and Windows 8.1) native authentication dialog works out of the box so this functionality is not required (skipped).

On Windows Phone 8.1 authentication dialog is automatically showed for XmlHttpRequests only, InAppBrowser plugin is NOT currently supported.

Plugin overrides default XmlHttpRequest via custom wrapper based on original one to automatically show credentials dialog when it is necessary. Credentials dialog is html based and does not support hardware back button.

Credentials are NOT persisted between app sessions so you need to enter them once per application start.

####Window Phone 8.0####

Plugins supports XmlHttpRequests and opening protected space in Cordova View. InAppBrowser plugin is NOT currently supported.

Plugin overrides default XmlHttpRequest via custom wrapper based on original one to automatically show credentials dialog when it is necessary. Credentials dialog is XAML-based (native) and correctly supports hardware back button.

Credentials are NOT persisted between app sessions so you need to enter them once per application start.

There is a known issue with XmlHttpRequest to secured sites: When request receives a response with status 401 and "WWW-Authenticate" header, the whole Javascript layer freezes. This makes this plugin and XHR unusable for accessing resources that requires authentication on WP8 devices. However WP8.1 is not affected by this issue.

## Copyrights ##
Copyright (c) Microsoft Open Technologies, Inc. All rights reserved.

Licensed under the Apache License, Version 2.0 (the "License"); you may not use these files except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

## Try it out...

You can try this out with a local server and sample project as follows:

```bash
cordova --version #make sure you have at least cordova 6, or the sample project might have circular import issues
cd sample # go into sample cordova project
cordova prepare #add platforms and plugins
cordova run android #or whatever
cd ../sample-server #or use a different terminal tab!
npm install
npm start # or node main.js <port # if you don't like 1337>
```

Then if you are on a live android device, go to chrome://inspect and add the following entry to port forwarding:
1337 -> localhost:1337

-press "Make XHR to link" on the test page
-put in sample username and password.  (Which are written in the dialog box and the test server startup message.)

### on ios

```bash
cordova --version #make sure you have at least cordova 6, or the sample project might have circular import issues
cd sample # go into sample cordova project
cordova prepare #add platforms and plugins
cordova build ios
open ./platforms/ios/Auth\ Dialog\ Sample.xcodeproj
cd ../sample-server #or use a different terminal tab!
npm install
npm start # or node main.js <port # if you don't like 1337>
#run in the simulator
#the "Make XHR to link" button will not work until you press "Authenticate (ios only)"
```



