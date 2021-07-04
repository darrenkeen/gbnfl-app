import React from 'react';
import { useContext } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Button } from '../components/Button';
import { AuthContext } from '../context/AuthContext';
import { getPlatformType } from '../utils/getPlatformType';
import { tailwind } from '../utils/tailwind';

interface InfoRowProps {
  label: string;
  value: string;
}

const InfoRow: React.FC<InfoRowProps> = ({ label, value }) => {
  return (
    <View style={tailwind('flex-row justify-between mb-2')}>
      <Text style={tailwind('text-white font-rubik-bold text-lg')}>
        {label}
      </Text>
      <Text style={tailwind('text-white font-rubik text-lg')}>{value}</Text>
    </View>
  );
};

export const ProfileScreen: React.FC = () => {
  const { state, signOut } = useContext(AuthContext);
  console.log(state);
  if (!state.user) {
    return null;
  }
  return (
    <View style={tailwind('mt-10 h-full')}>
      <ScrollView>
        <View style={tailwind('mt-10')}>
          <Text
            style={tailwind(
              'text-2xl font-bold text-white text-center font-rubik',
            )}
          >
            {state.user?.player.name}
          </Text>
          <Text style={tailwind('text-red-100 text-center font-rubik')}>
            {getPlatformType(state.user?.player.platformType)}
          </Text>
        </View>
        <View style={tailwind('mt-10 px-5')}>
          <InfoRow
            label="Full name"
            value={`${state.user.firstName} ${state.user.lastName}`}
          />
          <InfoRow label="Player name" value={state.user.player.name} />
          <InfoRow label="Platform ID" value={state.user.player.platformId} />
          <InfoRow
            label="Platform"
            value={getPlatformType(state.user.player.platformType)}
          />
        </View>
        <View style={tailwind('px-5 mt-10')}>
          <Button title="Logout" onPress={() => signOut()} />
        </View>
      </ScrollView>
    </View>
  );
};
