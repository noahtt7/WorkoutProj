import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, FlatList, Button, ScrollView, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

export default function App() {
  const [enteredExerciseText, setEnteredExerciseText] = useState('');
  const [exercises, setExercises] = useState([]);

  const RenderExercise = () => {
    
      {exercises.map((exercise) => 
        <View key={exercise} style={styles.exerciseItem}>
          <Text style={styles.exerciseText}>{exercise}</Text>
        </View>
      )}
  }

  const handleDelete = (id) => {
    setExercises(exercises.filter((exercise) => exercise !== id));
    // setExercises((currentExercises) => {
    //   return currentExercises.filter((exercise) => exercise !== id);
    // })
  }

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
            title="Clear All"
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
          {/* <RenderExercise/> */}
          {exercises.map((exercise) => 
            <View key={exercise} style={styles.exerciseItem}>
              <Text style={styles.exerciseText}>{exercise}</Text>
              <TouchableOpacity 
                style={styles.addIcon}
                >
                <Icon size={30} name="edit" color="#4caf50" style= {{textAlign: "right"}}>Add exer</Icon>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.deleteIcon}
                onPress={() => handleDelete(exercise)}>
                <Icon size={30} name="delete" color="#f44336" style= {{alignItems: "right"}}></Icon>
              </TouchableOpacity>
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
    height: 50,
  },
  exerciseText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20
  }, 
  addIcon: {
    height: 50,
    left: 140,
    width: 30,
    marginTop: 10,
    marginHorizontal: -5, 
    position: 'absolute'
  },
  deleteIcon: {
    height: 50,
    left: 170,
    width: 30,
    marginTop: 10,
    marginHorizontal: -5, 
    position: 'absolute'
  }

});
