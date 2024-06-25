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
    setIsEditing(exer.id);
  }

  const handleDelete = (id) => {
    setExercises(exercises.filter((exercise) => exercise !== id));
  }

  function inputExerciseHandler() {
    if (isEditing && enteredExerciseText != null) {
      setExercises(
        exercises.map((exercise) => 
          //exercise.id === isEditing ? setEnteredExerciseText(enteredText) : exercise
          exercise.id === isEditing ? {...exercise, text: enteredExerciseText} : exercise
        )
      );
      setIsEditing(null);
    } else {
      // entered text in TextInput box is set
      // to enteredExerciseText state
      setEnteredExerciseText(enteredExerciseText);

      // ADDED
      const newExer = { id: Date.now().toString(), text: enteredExerciseText};
      setExercises([...exercises, newExer]);
    }
    // setEnteredExerciseText("");
  };

  function addExerciseHandler() {
    // Add new enteredExerciseText to exercises array
    console.log(enteredExerciseText);
    //setExercises(currentExercises => [...currentExercises, enteredExerciseText]);

    const newExer = { id: Date.now().toString(), text: enteredExerciseText};
    setExercises([...exercises, newExer]);

    // For canceling an edit
    setEnteredExerciseText("");
  };

  function clearAll() {
    setExercises([]);
  }

  return (
    <View style={styles.appcontainer}>
      <StatusBar style="auto" />
      <View //style={styles.inputContainer}
      >
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
          onPress={inputExerciseHandler} color="#841584" style={styles.addIcon}>
            <Text style={styles.addText}>{isEditing ? "Edit" : "Add"}</Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: 200 }}>
          <Button
            title="Clear All"
            color='#124234'
            onPress={clearAll}
          />
        </View>
      </View>
      <View style={styles.exerciseContainer}>
        <ScrollView>
          {/* <RenderExercise/> */}
          
          {exercises.map((exercise) => 
            <View key={exercise.id} style={styles.exerciseItem}>
              <Text style={styles.exerciseText}>{exercise.text}</Text>
              {/* <View> */}
                <TextInput style={{borderWidth: 3, borderColor: 'black', borderRadius: 5, marginLeft: 205, width: 50, marginTop: 10, margin: 20, position: 'absolute'}} placeholder='hi'></TextInput>
              {/* </View> */}
              <TouchableOpacity 
                //style={styles.addIcon}
                styles={styles.deleteIcon}
                onPress={() => handleEdit(exercise)}
                >
                <View style={styles.addEditIcon}>
                  <Icon size={30} name="edit" color="#4caf50"></Icon>
                </View>
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
    margin: 60,
    marginLeft: 40,
    marginTop: 10,
    marginBottom: 5,
    borderRadius: 6,
    backgroundColor: "#CBC3E3",
    width: 200,
    height: 50,
  },
  exerciseText: {
    color: 'white',
    marginTop: 10,
    marginLeft: 5,
    textAlign: 'left',
    fontSize: 20
  }, 
  addText: {
    textAlign: "center",
    color: "white",
    size: 50
  },
  addIcon: {
    backgroundColor: "green",
    height: 40,
    left: 5,
    width: 200,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    marginHorizontal: -5, 
    position: 'absolute'
  },
  addEditIcon: {
    textAlign: "right", 
    width: 50,
    padding: 10, 
    top: -37, 
    left: 130
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
