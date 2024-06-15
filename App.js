import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, FlatList, Button } from 'react-native';

export default function App() {
  const [enteredExerciseText, setEnteredExerciseText] = useState('');
  const [exercises, setExercises] = useState([]);

  function inputExerciseHandler(enteredText) {
    // entered text in TextInput box is set
    // to enteredExerciseText state
    setEnteredExerciseText(enteredText);
  };

  function addExerciseHandler() {
    // Add new enteredExerciseText to exercises array
    console.log(enteredExerciseText);
    setExercises(currentExercises => [...currentExercises, enteredExerciseText]);
  };

  return (
    <View style={styles.appcontainer}>
      <StatusBar style="auto" />
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input}
          placeholder='Enter exercise'
          onChangeText={inputExerciseHandler}/>
        <Button
          onPress={addExerciseHandler}
          title="Add exercise"
          color="#841584"
        />
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
      <View style={styles.exerciseContainer}>
        <Text>List of exercises</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appcontainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderColor: '#e4d0ff',
    borderWidth: 1,
    color: '#120438',
    width: '70%',
    marginRight: 8,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc'
  },
  item: {
    padding: 10,
    height: 44
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between  '
  },
  exerciseContainer: {
    flex: 4
  }
});
