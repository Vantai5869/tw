import React from 'react';
import { StyleSheet, View, Image, Text, TextInput } from 'react-native';
import { colors } from '../constants/colors';

interface Props {
  label: string;
  style?: object;
  placeholder: string;
  onChangeText: (value: string) => void;
  value?: string;
}

const Input = React.memo((props: Props) => (
  <View style={[props.style, styles.view]}>
    <View style={styles.viewLabel}>
      <Text style={styles.label}>{props.label}</Text>
    </View>
    <TextInput
      {...props}
      placeholderTextColor={colors.c_A5A5A5}
      style={styles.input}
    />
  </View>
));

const styles = StyleSheet.create({
  viewLeft: {
    justifyContent: 'center',
  },
  buttonEye: {
    justifyContent: 'center',
    width: 25,
    height: 25,
  },
  viewLabel: {
    position: 'absolute',
    top: -11,
    left: 22,
    zIndex: 2,
    paddingHorizontal: 4,
    justifyContent: 'center',
    alignContent: 'center',
    height: 22,
    backgroundColor: colors.c_ffffff
  },
  label: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 22,
    color: colors.c_1f1f1f
  },
  view: {
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.12)',
    position: 'relative'
  },
  input: {
    flex: 1,
    paddingHorizontal: 20
  }
});

export default Input;
