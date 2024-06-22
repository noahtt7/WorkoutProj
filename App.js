import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, FlatList, Button, ScrollView, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

export default function App() {
  const [enteredExerciseText, setEnteredExerciseText] = useState('');
  const [exercises, setExercises] = useState([]);
  const [isEditing, setIsEditing] = useState(null);

  const RenderExercise = () => {
    
      {exercises.map((exercise) => 
        <View key={exercise} style={styles.exerciseItem}>
          <Text style={styles.exerciseText}>{exercise}</Text>
        </View>
      )}
  }

  const handleEdit = (exer) => {
    //setExercises(exercises.filter((exercise) => exercise === id));

    //setEnteredExerciseText(id);
    setIsEditing(exer.id);

    //setIsEditing(id.id);
  }

  const handleDelete = (id) => {
    setExercises(exercises.filter((exercise) => exercise !== id));
    // setExercises((currentExercises) => {
    //   return currentExercises.filter((exercise) => exercise !== id);
    // })
  }

  function inputExerciseHandler(enteredText) {
    // const exerExists = exercises.some(exer => exer.text.toLowerCase() === enteredText.text.toLowerCase());
    // console.log(exerExists);
    //console.log(exercises.filter(exer => exer.text));
    if (isEditing) {
      setExercises(
        exercises.map((exercise) => 
          //exercise.id === isEditing ? setEnteredExerciseText(enteredText) : exercise
          exercise.id === isEditing ? {...exercise, text: enteredExerciseText} : exercise
        )
      );
      console.log(enteredText + "yuh");
      setIsEditing(null);
    } else {
      // entered text in TextInput box is set
      // to enteredExerciseText state
      setEnteredExerciseText(enteredExerciseText);

      // ADDED
      const newExer = { id: Date.now().toString(), text: enteredExerciseText};
      setExercises([...exercises, newExer]);
    }
  };

  function addExerciseHandler() {
    // Add new enteredExerciseText to exercises array
    console.log(enteredExerciseText);
    //setExercises(currentExercises => [...currentExercises, enteredExerciseText]);

    const newExer = { id: Date.now().toString(), text: enteredExerciseText};
    setExercises([...exercises, newExer]);
  };

  function clearAll() {
    setExercises([]);
  }

  return (
    <View style={styles.appcontainer}>
      <StatusBar style="auto" />
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input}
          placeholder='Enter exercise'
          //onChangeText={inputExerciseHandler}
          // changed this last
          onChangeText={setEnteredExerciseText}/> 
        <View style={{ height: 50, width: 200, marginTop: 10,  }}>
          {/* <Button
            onPress={addExerciseHandler}
            title="Add exercise"
            color="#841584"
          /> */}
          <TouchableOpacity
          // changed onpress from addExerciseHandler to inputExerciseHandler
          onPress={inputExerciseHandler} color="#841584">
            <Text>{isEditing ? "Edit" : "Add"}</Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: 200 }}>
          <Button
            title="Clear All"
            color='#124234'
            onPress={clearAll}
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
            <View key={exercise.id} style={styles.exerciseItem}>
              <Text style={styles.exerciseText}>{exercise.text}</Text>
              <TouchableOpacity 
                style={styles.addIcon}
                onPress={() => handleEdit(exercise)}
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
