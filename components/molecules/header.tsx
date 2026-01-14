import React from 'react';
import { View, Text } from 'react-native';
import { header } from '@/constants/colores';
import { SafeAreaView } from 'react-native-safe-area-context';

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => (
  <View>
        <SafeAreaView style={header.headerContainer}>
            <Text style={header.title}>{title}</Text>
       </SafeAreaView>
  </View>
);

export default Header;