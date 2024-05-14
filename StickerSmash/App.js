import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const CalculatorApp = () => {
  const [displayValue, setDisplayValue] = useState('0');

  const handleNumericPress = (value) => {
    setDisplayValue((prevValue) => {
      if (prevValue === '0') {
        return value;
      } else {
        return prevValue + value;
      }
    });
  };

  const handleOperationPress = (value) => {
    setDisplayValue((prevValue) => {
      if (prevValue.endsWith('+') || prevValue.endsWith('-') || prevValue.endsWith('*') || prevValue.endsWith('/')) {
        return prevValue.slice(0, -1) + value;
      } else {
        return prevValue + value;
      }
    });
  };

  const handleEqualPress = () => {
    setDisplayValue((prevValue) => {
      try {
        // eslint-disable-next-line no-eval
        return String(eval(prevValue));
      } catch (error) {
        return 'Error';
      }
    });
  };

  const handleClearPress = () => {
    setDisplayValue('0');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.display}>{displayValue}</Text>
      <View style={styles.keypad}>
        <View style={styles.row}>
          <NumericKey value="1" onPress={handleNumericPress} />
          <NumericKey value="2" onPress={handleNumericPress} />
          <NumericKey value="3" onPress={handleNumericPress} />
          <OperationKey value="+" onPress={handleOperationPress} />
        </View>
        <View style={styles.row}>
          <NumericKey value="4" onPress={handleNumericPress} />
          <NumericKey value="5" onPress={handleNumericPress} />
          <NumericKey value="6" onPress={handleNumericPress} />
          <OperationKey value="-" onPress={handleOperationPress} />
        </View>
        <View style={styles.row}>
          <NumericKey value="7" onPress={handleNumericPress} />
          <NumericKey value="8" onPress={handleNumericPress} />
          <NumericKey value="9" onPress={handleNumericPress} />
          <OperationKey value="*" onPress={handleOperationPress} />
        </View>
        <View style={styles.row}>
          <NumericKey value="0" onPress={handleNumericPress} />
          <TouchableOpacity style={styles.key} onPress={handleEqualPress}>
            <Text style={styles.keyText}>=</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.key} onPress={handleClearPress}>
            <Text style={styles.keyText}>C</Text>
          </TouchableOpacity>
          <OperationKey value="/" onPress={handleOperationPress} />
        </View>
      </View>
    </View>
  );
};

const Display = ({ value }) => {
  return <Text style={styles.display}>{value}</Text>;
};

const NumericKey = ({ value, onPress }) => {
  return (
    <TouchableOpacity style={styles.key} onPress={() => onPress(value)}>
      <Text style={styles.keyText}>{value}</Text>
    </TouchableOpacity>
  );
};

const OperationKey = ({ value, onPress }) => {
  return (
    <TouchableOpacity style={[styles.key, styles.operationKey]} onPress={() => onPress(value)}>
      <Text style={[styles.keyText, styles.operationKeyText]}>{value}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  display: {
    fontSize: 36,
    marginBottom: 20,
  },
  keypad: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  key: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  keyText: {
    fontSize: 24,
  },
  operationKey: {
    backgroundColor: '#ff8c00',
  },
  operationKeyText: {
    color: '#ffffff',
  },
});

export default CalculatorApp;
