import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, FlatList } from 'react-native';

export default function App() {
  return (
    <View style={styles.appcontainer}>
      <Text>Open up App.js to start !</Text>
      <StatusBar style="auto" />
      <TextInput 
        style={styles.input}
        placeholder='Enter exercise'/>
        <FlatList>
          
        </FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  appcontainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderColor: '#e4d0ff',
    borderWidth: 1,
    color: '#120438',
    height: 40,
  }
});
