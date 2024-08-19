import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, FlatList, Button, ScrollView, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

function ExerciseScreen({ navigation, exercises1, exerciseList }) {
    const [enteredExerciseText, setEnteredExerciseText] = useState('');
    const [exercises, setExercises] = useState([]);
    const [isEditing, setIsEditing] = useState(null);
  
    useEffect(() => {
      setExercises(exercises1);
    }, []);
  
    useEffect(() => {
      setArray();
      exerciseList(exercises);
    }, [exercises]);
  
    setArray = async () => {
      try {
        const jsonValue = JSON.stringify(exercises);
        await AsyncStorage.setItem('exercises', jsonValue);
      } catch(e) {
        // save error
        console.log("Error: Could not save exercises", e);
      }
    
      console.log('Done.')
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
            exercise.id === isEditing ? {...exercise, text: enteredExerciseText} : exercise
          )
        );
        setIsEditing(null);
      } else {
        // entered text in TextInput box is set
        // to enteredExerciseText state
        setEnteredExerciseText(enteredExerciseText);
  
        const newExer = { id: Date.now().toString(), text: enteredExerciseText, repCount: 0, weight: 0 };
        setExercises([...exercises, newExer]);
      }
      
      // Send up to App parent so it can store
      // exercise list
      exerciseList(exercises);
    };
  
    function clearAll() {
      setExercises([]);
      console.log("CLEARED.");
    }
  
    function setRepCount(id, text) {
      console.log("exd :" + id + " " + text);
      setExercises(
        exercises.map((item) =>
          item.id === id ? {...item, repCount: text} : item
        )
      );
    }
  
    function setWeight(id, text) {
        setExercises(
          exercises.map((item) =>
            item.id == id ? {...item, weight: text} : item
          )
        );
    }
  
    return (
      <View style={styles.appcontainer}>
        <StatusBar style="auto" />
        <View
        >
          <TextInput 
            style={styles.input}
            placeholder='Enter exercise'
            onChangeText={setEnteredExerciseText}/> 
          <View style={{ height: 50, width: 200, marginTop: 10,  }}>
            <TouchableOpacity
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
            {exercises.map((exercise) => 
              <View key={exercise.id} style={styles.exerciseItem}>
                <Text style={styles.exerciseText} adjustsFontSizeToFit>{exercise.text}</Text>
                  <Text style={styles.repCountText}>
                    Rep #
                  </Text>
                  <Text style={styles.weightCountText}>
                    Weight
                  </Text>
                  <TextInput 
                    style={styles.repCountInput}
                    placeholder='Rep #' 
                    value={exercise.repCount} 
                    onChangeText={text => setRepCount(exercise.id, text)}
                  >
                  </TextInput>
                  <TextInput
                    style={styles.weightInput}
                    placeholder='Weight'
                    value={exercise.weight}
                    onChangeText={text => setWeight(exercise.id, text)}
                  >
                  </TextInput>
                <TouchableOpacity 
                  style={styles.addEditIcon}
                  onPress={() => handleEdit(exercise)}
                  >
                    <Icon size={30} name="edit" color="#4caf50"></Icon>
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

  export default ExerciseScreen;

  const styles = StyleSheet.create({
    appcontainer: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 16,
        backgroundColor: '#FEEAE6',
        alignItems: 'center',
        justifyContent: 'center',
      },
      input: {
        borderColor: '#e4d0ff',
        borderWidth: 5,
        borderRadius: 10,
        color: '#120438',
        width: 200,
        marginRight: 8,
        height: 50,
        // borderBottomWidth: 1,
        // borderBottomColor: '#cccccc',
        backgroundColor: 'white',
        textAlign: 'center'
      },
      addIcon: {
        backgroundColor: "green",
        height: 40,
        left: 5,
        width: 200,
        padding: 10,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: 'gray',
        marginBottom: 10,
        marginHorizontal: -5, 
        position: 'absolute'
      },
      addText: {
        textAlign: "center",
        color: "white",
        size: 50
      },
      exerciseContainer: {
        flex: 4,
        width: 400,
        left: 20,
        position: 'relative'
      },
      exerciseItem: {
        //margin: 60,
        //marginLeft: 40,
        marginRight: 130,
        marginTop: 10,
        marginBottom: 5,
        borderRadius: 6,
        //backgroundColor: "#CBC3E3",
        backgroundColor: "#70d7c7",
        width: 200,
        height: 50,
      },
      exerciseText: {
        flex: 0,
        color: 'white',
        marginTop: 10,
        marginLeft: 5,
        textAlign: 'left',
        fontSize: 20
      }, 
      repCountText: {
        left: 210,
        top: -10,
        fontWeight: 'bold',
        position: 'absolute'
      },
      repCountInput: {
        borderWidth: 3,
        borderColor: 'black',
        borderRadius: 5, 
        marginLeft: 205, 
        padding: 5,
        bottom: -20,
        height: 40,
        width: 50, 
        marginTop: 5, 
        margin: 20, 
        position: 'absolute'
      },
      weightCountText: {
        left: 260,
        top: -10,
        fontWeight: 'bold',
        position: 'absolute'
      },
      weightInput: {
        borderWidth: 3,
        borderColor: 'black',
        borderRadius: 5,
        marginLeft: 260,
        padding: 5,
        bottom: -20,
        height: 40,
        width: 50, 
        marginTop: 5, 
        margin: 20, 
        fontSize: 12,
        position: 'absolute'
      },
      addEditIcon: {
        width: 30,
        left: 318,
        marginTop: 10,
        marginHorizontal: -5,
        position: 'absolute'
      },
      deleteIcon: {
        height: 50,
        left: 345,
        width: 30,
        marginTop: 10,
        marginHorizontal: -5, 
        position: 'absolute'
      }
  })