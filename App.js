import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react'
import DefaultController from './application/DefaultController';

export default function App() {
  console.log("Initializing TYard Sale App")
  return (
    <DefaultController/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
