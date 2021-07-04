import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useContext } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AuthContext } from '../context/AuthContext';

import { tailwind } from '../utils/tailwind';
import { ProfileModal } from './ProfileModal';

export const HeaderRight: React.FC = () => {
  const { state } = useContext(AuthContext);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <View style={tailwind('pr-5')}>
        {state.user ? (
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Icon name="person" size={30} color="white" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <View style={tailwind('flex-row items-center')}>
              <Text style={tailwind('mr-2 text-white font-rubik')}>Login</Text>
              <Icon name="login" size={30} color="white" />
            </View>
          </TouchableOpacity>
        )}
      </View>
      <ProfileModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </>
  );
};
