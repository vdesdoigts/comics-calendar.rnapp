package com.comicscalendar;

import android.app.Application;
import android.util.Log;
import android.support.annotation.Nullable;

import com.facebook.react.ReactApplication;
import com.mehcode.reactnative.splashscreen.SplashScreenPackage;
import com.i18n.reactnativei18n.ReactNativeI18n;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.reactnativenavigation.NavigationApplication;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new SplashScreenPackage(),
            new ReactNativeI18n()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public boolean isDebug() {
    // Make sure you are using BuildConfig from your own application
    return BuildConfig.DEBUG;
  }

  @Nullable
  @Override
  public List<ReactPackage> createAdditionalReactPackages() {
    // Add the packages you require here.
    // No need to add RnnPackage and MainReactPackage
    return null;
  }
}
