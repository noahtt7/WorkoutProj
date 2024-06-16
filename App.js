import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, FlatList, Button, ScrollView } from 'react-native';

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
        <View style={{ height: 50, width: 200, marginTop: 10,  }}>
          <Button
            onPress={addExerciseHandler}
            title="Add exercise"
            color="#841584"
          />
        </View>
        <View style={{ width: 200 }}>
          <Button
            title="Delete"
            color='#124234'
          />
        </View>
        {/* <FlatList
        data={exercises}
        renderItem={({item}) => <Text style={styles.item}>
          {item.key}</Text>}
        /> */}
      </View>
      <View style={styles.exerciseContainer}>
        <ScrollView>
          {exercises.map((exercise) => 
            <View key={exercise} style={styles.exerciseItem}>
              <Text style={styles.exerciseText}>{exercise}</Text>
            </View>
          )}
        </ScrollView>
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
    width: 200,
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
    flex: 4,
    //color: 'purple'
  },
  exerciseItem: {
    margin: 8,
    borderRadius: 6,
    backgroundColor: "#CBC3E3",
    width: 200,
    height: 30
  },
  exerciseText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20
  }
});
