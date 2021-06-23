import React, { useState, useContext } from 'react';
import { View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Input } from 'react-native-elements';

import { AuthContext } from '../context/AuthContext';
import LogoImage from '../assets/images/logo.png';
import { tailwind } from '../utils/tailwind';
import { Button } from '../components/Button';

export const LoginScreen: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { signIn } = useContext(AuthContext);
  return (
    <SafeAreaView style={tailwind('bg-background-1000 flex-1')}>
      <View style={tailwind('justify-center items-center')}>
        <Image
          source={LogoImage}
          style={tailwind('w-40 h-40')}
          resizeMode="contain"
        />
      </View>
      <View style={tailwind('px-5 mt-10')}>
        <Input
          style={tailwind('text-white')}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <Input
          style={tailwind('text-white')}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          secureTextEntry
        />
        <Button
          title="Sign in"
          onPress={() => signIn({ username, password })}
        />
      </View>
    </SafeAreaView>
  );
};
