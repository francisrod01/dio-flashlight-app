import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Torch from 'react-native-torch';

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLight: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightingOn: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 150,
    height: 150,
  },
  lightingOff: {
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: 'white',
    width: 150,
    height: 150,
  },
  dioLogo: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 250,
    height: 250,
  },
});

const App = () => {
  const [toggled, setToggled] = useState(false);

  const handleToggle = () => setToggled(value => !value);

  useEffect(() => {
    // Controls phone flash light
    Torch.switchState(toggled);
    console.log('[DEBUG] flash light changed to:', toggled);
  }, [toggled]);

  return (
    <View style={toggled ? style.containerLight : style.container} >
      <TouchableOpacity onPress={handleToggle}>
        <Image
          style={toggled ? style.lightingOn : style.lightingOff}
          source={
            toggled
              ? require('./assets/icons/eco-light.png')
              : require('./assets/icons/eco-light-off.png')
          }
        />
        <Image
          style={style.dioLogo}
          source={
            toggled
              ? require('./assets/icons/logo-dio.png')
              : require('./assets/icons/logo-dio-white.png')
          }
        />
      </TouchableOpacity>
    </View>
  );
}

export default App;
