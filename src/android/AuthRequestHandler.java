package com.msopentech.authDialog;

import android.util.Log;

import org.apache.cordova.*;

public class AuthRequestHandler extends CordovaPlugin {
    public boolean onReceivedHttpAuthRequest(CordovaWebView view, final ICordovaHttpAuthHandler handler, String host, String realm) {
        String username = this.getPluginVariableFromConfiguration("basic_auth_username");
        String password = this.getPluginVariableFromConfiguration("basic_auth_password");
        Log.v("basic auth", "username=" + username + " password=" + password);
        handler.proceed(username, password);
        return true;
    }

    private String getPluginVariableFromConfiguration(String key) {
        //thanks https://github.com/Wizcorp/phonegap-facebook-plugin/blob/5dbb1583168558b4447a13235283803151cb04ec/platforms/android/src/org/apache/cordova/facebook/ConnectPlugin.java
        int appResId = cordova.getActivity().getResources().getIdentifier(key, "string", cordova.getActivity().getPackageName());
        return cordova.getActivity().getString(appResId);
    }
}
