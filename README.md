# React Native - flash light app

... //

## Build and Release an Android app

The best doc to read about it [Flutter | Build and Release an Android app][1]

----

## Create an upload keystore

```bash
echo y | keytool -genkey -keystore ./upload-keystore.jks \
    -dname "CN=Francis Rodrigues, OU=Engineering, O=InfoTech, L=Garibaldi, ST=Rio Grande do Sul, C=BR" \
    -alias upload -keypass android  -storepass android \
    -keyalg RSA -keysize 2048 -validity 2000
```

## Reference the keystore from the app

Create a file in `~/android/local.properties` as below:

```bash
MYAPP_UPLOAD_STORE_PASSWORD=android
MYAPP_UPLOAD_KEY_PASSWORD=android
MYAPP_UPLOAD_KEY_ALIAS=upload
MYAPP_UPLOAD_STORE_FILE=./upload-keystore.jks
```

## Configure signing in gradle

Configure gradle to use your upload key when building your app in release mode by editing the [project]/android/app/build.gradle file.

1. Add the keystore information from your properties file before the android block:

```bash
def keystoreProperties = new Properties()
def keystorePropertiesFile = rootProject.file('local.properties')
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
}

android {
    ...
}
```

2. Find the `buildTypes` block and add the following signing configuration info:

```bash
signingConfigs {
    debug: {
        ....
    }
    release {
        if (keystoreProperties['MYAPP_UPLOAD_STORE_FILE']) {
            storeFile file(keystoreProperties['MYAPP_UPLOAD_STORE_FILE'])
            storePassword keystoreProperties['MYAPP_UPLOAD_STORE_PASSWORD']
            keyAlias keystoreProperties['MYAPP_UPLOAD_KEY_ALIAS']
            keyPassword keystoreProperties['MYAPP_UPLOAD_KEY_PASSWORD']
        }
    }
}
buildTypes {
    debug: {
        ...
    }
    release {
        signingConfig signingConfigs.release
    }
}
```

Release builds of your app will now be signed automatically.


3. The generated app will be located at `./android/app/build/outputs/apk/release/app-release.apk`

Install it by running `adb install <path-to-release-apk>`

```bash
Performing Streamed Install
Success
```


[1]: https://docs.flutter.dev/deployment/android
