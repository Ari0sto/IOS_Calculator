import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar, Platform } from 'react-native';

import Svg, { Path } from 'react-native-svg';

// кастомная иконка delete
const FigmaDeleteIcon = () => (
  <Svg width="80" height="80" viewBox="0 0 80 87" fill="none">
    <Path d="M38 49.5L49.5 38" stroke="#F8F8F8" strokeWidth="4" strokeLinecap="round" />
    <Path d="M49.5 49.5L38 38" stroke="#F8F8F8" strokeWidth="4" strokeLinecap="round" />
    <Path d="M54.9606 29.0399L37.2631 29.2721C36.4554 29.2827 35.6861 29.6186 35.1292 30.2037L24.0175 41.88C22.8953 43.0592 22.9183 44.9183 24.0694 46.0694L35.6213 57.6213C36.1839 58.1839 36.947 58.5 37.7426 58.5H55C56.6569 58.5 58 57.1569 58 55.5V32.0396C58 30.3674 56.6327 29.0179 54.9606 29.0399Z" stroke="#F8F8F8" strokeWidth="4" />
  </Svg>
);

type ButtonColor = 'dark' | 'light' | 'orange';

interface CalcButtonType {
  label: string;
  color: ButtonColor;
}

export default function CalculatorScreen() {
  const [history, setHistory] = useState<string>('1+2+3');
  const [result, setResult] = useState<string>('6');

  const buttons: CalcButtonType[] = [
    { label: 'delete', color: 'light' },
    { label: 'AC', color: 'light' },
    { label: '%', color: 'light' },
    { label: '÷', color: 'orange' },

    { label: '7', color: 'dark' },
    { label: '8', color: 'dark' },
    { label: '9', color: 'dark' },
    { label: '×', color: 'orange' },

    { label: '4', color: 'dark' },
    { label: '5', color: 'dark' },
    { label: '6', color: 'dark' },
    { label: '−', color: 'orange' },

    { label: '1', color: 'dark' },
    { label: '2', color: 'dark' },
    { label: '3', color: 'dark' },
    { label: '+', color: 'orange' },

    { label: '+/-', color: 'dark' },
    { label: '0', color: 'dark' },
    { label: ',', color: 'dark' },
    { label: '=', color: 'orange' },
  ];
  // Функция для обработки нажатия кнопки (log в консоль)
  const handleButtonClick = (label: string): void => {
    console.log(`Нажата кнопка: ${label}`);
  };

  const getBackgroundColor = (color: ButtonColor) => {
    switch (color) {
      case 'light': return '#5E5E5E';
      case 'orange': return '#FF9201';
      case 'dark': default: return '#212121';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.displayContainer}>
        <Text style={styles.historyText}>{history}</Text>
        <Text style={styles.resultText}>{result}</Text>
      </View>

      <View style={styles.buttonsContainer}>
        {buttons.map((btn, index) => {
          const isOperator = btn.color === 'orange';
          const isPlusMinus = btn.label === '+/-';

          return (
            <TouchableOpacity
              key={index}
              activeOpacity={0.7}
              style={[
                styles.button,
                { backgroundColor: getBackgroundColor(btn.color) },
                // Черная обводка (которая не работает)
                !isOperator && { borderWidth: 1, borderColor: '#000000' }
              ]}
              onPress={() => handleButtonClick(btn.label)}
            >
              {btn.label === 'delete' ? (
                <View style={styles.iconNudge}>
                  <FigmaDeleteIcon />
                </View>
              ) : (
                <Text style={[
                  styles.buttonText,
                  isOperator && styles.operatorText,
                  isPlusMinus && styles.plusMinusText,
                  // настройки размера для знака деления
                  btn.label === '÷' && {
                    fontSize: 62,
                    fontWeight: '300',
                    paddingBottom: Platform.OS === 'ios' ? 12 : 14
                  }
                ]}>
                  {btn.label}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'flex-end',
  },
  displayContainer: {
    paddingHorizontal: 24,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  historyText: {
    color: '#888888',
    fontSize: 32,
    fontWeight: '400',
    marginBottom: 10,
  },
  resultText: {
    color: '#F8F8F8',
    fontSize: 90,
    fontWeight: '300',
  },
  buttonsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 40,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 16,
  },
  button: {
    width: '22%',
    aspectRatio: 1,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#F8F8F8',
    fontSize: 38,
    fontWeight: '500',
  },
  operatorText: {
    fontSize: 48,
    paddingBottom: Platform.OS === 'ios' ? 10 : 12,
    includeFontPadding: false,
  },
  plusMinusText: {
    paddingTop: Platform.OS === 'ios' ? 4 : 2,
  },
  iconNudge: {
    paddingTop: 2,
    marginRight: 4,
  }
});