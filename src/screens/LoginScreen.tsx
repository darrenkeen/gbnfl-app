import React, { useState, useContext } from 'react';
import { View, Image, ScrollView } from 'react-native';
import { Input } from 'react-native-elements';

import { AuthContext } from '../context/AuthContext';
import LogoImage from '../assets/images/logo.png';
import { tailwind } from '../utils/tailwind';
import { Button } from '../components/Button';
import { useNavigation } from '@react-navigation/native';

export const LoginScreen: React.FC = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { signIn } = useContext(AuthContext);
  return (
    <ScrollView style={tailwind('pt-20')}>
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
          onPress={async () => {
            const signInRes = await signIn({ username, password });
            if (signInRes) {
              navigation.navigate('Home');
            }
          }}
        />
      </View>
    </ScrollView>
  );
};
