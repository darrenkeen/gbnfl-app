import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { tailwind } from '../utils/tailwind';
import { ProfileModal } from './ProfileModal';

export const HeaderRight: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <View style={tailwind('pr-5')}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Icon name="person" size={30} color="white" />
        </TouchableOpacity>
      </View>
      <ProfileModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </>
  );
};
