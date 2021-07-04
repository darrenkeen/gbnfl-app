import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { tailwind } from '../utils/tailwind';
import { ProfileModal } from './ProfileModal';

export const PlayerHeaderLeft: React.FC = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <View style={tailwind('pr-5')}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <View style={tailwind('justify-start flex-row items-center')}>
            <Icon name="chevron-left" size={38} color="white" />
            <Text style={tailwind('text-white font-rubik')}>Home</Text>
          </View>
        </TouchableOpacity>
      </View>
      <ProfileModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </>
  );
};
