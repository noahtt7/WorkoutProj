import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, FlatList, Button, ScrollView, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Calendar } from 'react-native-calendars';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TextFit } from 'react-native-text'

function HomeScreen({ navigation, dateFromHomeScreen }) {

  return(
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FEEAE6' }}>
      <Calendar
          onDayPress={day => {
          console.log('selected day', day);
          navigation.navigate("Exercises");
          dateFromHomeScreen(day);
          }}
        />
      <Text></Text>
    </View>
  );
}

function ExerciseScreen({ navigation, exercises1, exerciseList }) {
  const [enteredExerciseText, setEnteredExerciseText] = useState('');
  const [exercises, setExercises] = useState([]);
  const [isEditing, setIsEditing] = useState(null);

  useEffect(() => {
    setExercises(exercises1);
  }, []);

  useEffect(() => {
    // probably use exercise1 instead of exercises
    //console.log("exercises1 " + JSON.stringify(exercises1));
    //setExercises(exercises1);
    setArray();
    //console.log("SETARRAY " + JSON.stringify(exercises));
    exerciseList(exercises);
  }, [exercises]);

  setArray = async () => {
    try {
      const jsonValue = JSON.stringify(exercises);
      await AsyncStorage.setItem('exercises', jsonValue);
      //console.log('Saved exercises:', jsonValue); // Debugging line
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
          //exercise.id === isEditing ? setEnteredExerciseText(enteredText) : exercise
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

    // setEnteredExerciseText("");
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
      {/* <Calendar
        onDayPress={day => {
        console.log('selected day', day);
        }}
      /> */}
        <TextInput 
          style={styles.input}
          placeholder='Enter exercise'
          //onChangeText={inputExerciseHandler}
          // changed this last
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
              {/* <View> */}
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
              {/* </View> */}
              <TouchableOpacity 
                style={styles.addEditIcon}
                //styles={styles.deleteIcon}
                onPress={() => handleEdit(exercise)}
                >
                {/* <View style={styles.addEditIcon}> */}
                  <Icon size={30} name="edit" color="#4caf50"></Icon>
                {/* </View> */}
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

export default function App() {
  const [date, setDate] = useState('');
  const [dateToExerciseMap, setMap] = useState([
    { date: '', exercises: [] }
  ]);

  const Stack = new createStackNavigator();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    storeData();
  }, [dateToExerciseMap]);

  storeData = async () => {
    try {
      const jsonValue = JSON.stringify(dateToExerciseMap);
      await AsyncStorage.setItem('dateExerciseMap', jsonValue);
    } catch(e) {
      // save error
      console.log("Error: Could not save exercises", e);
    }
  
    console.log('Done.')
  }

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('dateExerciseMap');
      if (value !== null) {
        setMap(JSON.parse(value));
        
        // Send up to App parent so it can store
        // exercise list
        //exerciseList(exercises);
      }
    } catch (e) {
      // error reading value
      console.log("Failed to get map", e);
    }
  };

  function getDate(day) {
    // Check if date is already stored.
    // If date already exists, update exercise list
    // Otherwise, add a new entry
    const containsDate = dateToExerciseMap.some(item => item.date === day.dateString);
    if (containsDate) {
      console.log("Already contains entry");
    } else {
      const newEntry = { date: day.dateString, exercises: [] };
      console.log("Adding date " + newEntry.date);
      setMap([...dateToExerciseMap, newEntry]);
    }

    setDate(day.dateString);
    console.log("the day is... " + day.dateString);
    //console.log("map " + JSON.stringify(dateToExerciseMap));
  }

  /*
    Called whenever the exercise list is update
    Extracts names of exercises
  */
  function getExerciseList(exerciseList) {
    setMap(
      dateToExerciseMap.map((item) =>
        item.date === date ? {...item, exercises: exerciseList} : item
      )
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
        name="Home"
        options={{
          headerStyle: {
            backgroundColor: '#ecc0c2'
          }
        }}
        >
          {(props) => <HomeScreen {...props} dateFromHomeScreen={getDate} />}
        </Stack.Screen>
        <Stack.Screen
          name="Exercises"
          options={{
            title: date + " Exercises",
            headerStyle: {
              backgroundColor: '#ecc0c2'
            }
           }}
          >
          {(props) => <ExerciseScreen {...props} exercises1={
            dateToExerciseMap.find(item => item.date === date).exercises
          } exerciseList={getExerciseList} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

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
    width: 400,
    left: 20,
    position: 'relative'
    //color: 'purple'
  },
  exerciseItem: {
    //margin: 60,
    //marginLeft: 40,
    marginRight: 130,
    marginTop: 10,
    marginBottom: 5,
    borderRadius: 6,
    backgroundColor: "#CBC3E3",
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
    //fontSize: Math.sqrt()
  }, 
  addText: {
    textAlign: "center",
    color: "white",
    size: 50
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
  repCountText: {
    left: 210,
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
  weightPlaceholder: {
    fontSize: 5
  },
  weightCountText: {
    left: 260,
    top: -10,
    fontWeight: 'bold',
    position: 'absolute'
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
  addEditIcon: {
    //textAlign: "right", 
    //width: 50,
    //padding: 10, 
    //top: -37, 
    //top: -35,
    width: 30,
    left: 320,
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

});
