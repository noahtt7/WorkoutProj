import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, FlatList } from 'react-native';

export default function App() {
  const [exercises, setExercises] = useState([]);

  return (
    <View style={styles.appcontainer}>
      <Text>Open up App.js to start !</Text>
      <StatusBar style="auto" />
      <View style={styles.listcontainer}>
        <TextInput 
          style={styles.input}
          placeholder='Enter exercise'/>
        <FlatList
        data={[
          {key: 'Incline bench'},
          {key: 'Squat'},
        ]}
        renderItem={({item}) => <Text style={styles.item}>
          {item.key}</Text>}
        />
        <Text height={300}>HIIIIIII</Text>
      </View>
        
          
        
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
  },
  item: {
    padding: 10,
    height: 44
  },
  listcontainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between  '
  }
});
