import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useContext } from 'react';
import { Modal, View, Text, Alert, TouchableOpacity } from 'react-native';
import { Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AuthContext } from '../context/AuthContext';
import { tailwind } from '../utils/tailwind';

export const ProfileModal: React.FC<any> = ({
  modalVisible,
  setModalVisible,
}) => {
  const navigate = useNavigation();
  const {
    state: { user },
    signOut,
  } = useContext(AuthContext);
  if (!user) {
    return null;
  }
  return (
    <Overlay
      isVisible={modalVisible}
      overlayStyle={tailwind('bg-background-1000 rounded-md')}
      onBackdropPress={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={tailwind('items-end')}>
        <TouchableOpacity onPress={() => setModalVisible(false)}>
          <Icon name="close" size={30} color="white" />
        </TouchableOpacity>
      </View>
      <View style={tailwind('px-10 my-10')}>
        <Text style={tailwind('font-rubik-bold text-white text-2xl mb-5')}>
          Hi, {user.firstName} {user.lastName}
        </Text>
        <View>
          {/* <View style={tailwind('mb-2')}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                navigate.navigate('Profile');
              }}
            >
              <Text
                style={tailwind('font-rubik text-white text-center text-lg')}
              >
                Edit profile
              </Text>
            </TouchableOpacity>
          </View>
          <View style={tailwind('mb-2')}>
            <TouchableOpacity onPress={() => {}}>
              <Text
                style={tailwind('font-rubik text-white text-center text-lg')}
              >
                Change password
              </Text>
            </TouchableOpacity>
          </View> */}
          <View style={tailwind('mb-2')}>
            <TouchableOpacity
              onPress={() => {
                signOut();
              }}
            >
              <Text
                style={tailwind('font-rubik text-white text-center text-lg')}
              >
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Overlay>
  );
};
