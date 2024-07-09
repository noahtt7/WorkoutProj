import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, FlatList, Button, ScrollView, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Calendar } from 'react-native-calendars';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//const [dateExerciseMap, setMap] = useState([]); 
  
function HomeScreen({ navigation, dateFromHomeScreen }) {

  return(
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Calendar
          onDayPress={day => {
          console.log('selected day', day);
          navigation.navigate("Exercises");
          dateFromHomeScreen(day);
          //this.App.getDate(day);
          }}
        />
      <Text></Text>
    </View>
  );
}

function ExerciseScreen({ navigation, exerciseList }) {
  const [enteredExerciseText, setEnteredExerciseText] = useState('');
  const [exercises, setExercises] = useState([]);
  const [isEditing, setIsEditing] = useState(null);

  useEffect(() => {
    getExercises();
  }, []);

  useEffect(() => {
    setArray();
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

  const getExercises = async () => {
    try {
      const value = await AsyncStorage.getItem('exercises');
      //console.log('Loaded exercises:', value); // Debugging line
      if (value !== null) {
        setExercises(JSON.parse(value));
        
        // Send up to App parent so it can store
        // exercise list
        exerciseList(exercises);
      }
    } catch (e) {
      // error reading value
      console.log("Failed to get exercises", e);
    }
  };

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

      const newExer = { id: Date.now().toString(), text: enteredExerciseText, repCount: 0};
      setExercises([...exercises, newExer]);
    }

    // Send up to App parent so it can store
    // exercise list
    exerciseList(exercises);

    // setEnteredExerciseText("");
  };

  function addExerciseHandler() {
    // Add new enteredExerciseText to exercises array
    console.log(enteredExerciseText);

    const newExer = { id: Date.now().toString(), text: enteredExerciseText};
    setExercises([...exercises, newExer]);

    // For canceling an edit
    setEnteredExerciseText("");
  };

  function clearAll() {
    setExercises([]);
  }

  function setRepCount(id, text) {
    console.log("exd :" + id + " " + text);
    setExercises(
      exercises.map((item) =>
        item.id === id ? {...item, repCount: text} : item
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
              <Text style={styles.exerciseText}>{exercise.text}</Text>
              {/* <View> */}
                <TextInput 
                  style={styles.repCountInput}
                  placeholder='Rep #' 
                  value={exercise.repCount} 
                  onChangeText={text => setRepCount(exercise.id, text)}
                >
                </TextInput>
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

export default function App() {
  const [date, setDate] = useState('');
  const [currentExerciseList, setExerciseList] = useState([]);
  const [dateToExerciseMap, setMap] = useState([
    { date: '', exercises: [] }
  ]);

  const Stack = new createStackNavigator();

  function getDate(day) {
    // setDate(day.dateString);

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
    // if (date === day.dateString) {
    //   console.log("cuh");
    // }
    setDate(day.dateString);
    console.log("the day is... " + day.dateString);
    console.log("map " + dateToExerciseMap);
    //console.log("lll " + dateToExerciseMap[3].date);
  }

  /*
    Called whenever the exercise list is update
    Extracts names of exercises
  */
  function getExerciseList(exerciseList) {
    const exerTextMap = exerciseList.map((item) => item.text);
    setExerciseList(exerTextMap);
    const repCountList = exerciseList.map((item) => item.repCount);
    console.log("The current list is... " + currentExerciseList + " from " + date);
    console.log("Rep counts " + repCountList);

    //result = {};
    //exerTextMap.map((item, index) => result[item] = repCountList[index]);
    //result = Object.fromEntries(exerTextMap.map((k, i) => [k, repCountList[i]]));
    const result = exerTextMap.map((item, index) => {
      return { exercise: item, repCount: repCountList[index] };
    });
    console.log("Result f" + JSON.stringify(result));
    setMap(
      dateToExerciseMap.map((item) =>
        item.date === date ? {...item, exercises: result} : item
      )
    );

    console.log("I get it now " + JSON.stringify(dateToExerciseMap));
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home">
          {(props) => <HomeScreen {...props} dateFromHomeScreen={getDate} />}
        </Stack.Screen>
        {/* <Stack.Screen name="Home" component={HomeScreen} dateFromHomeScreen={getDate} /> */}
        <Stack.Screen name="Exercises">
          {(props) => <ExerciseScreen {...props} exerciseList={getExerciseList} />}
        </Stack.Screen>
        {/* <Stack.Screen name="Exercises" component={ExerciseScreen} /> */}
      </Stack.Navigator>
      {/* <HomeScreen dateFromHomeScreen={getDate} /> */}
    </NavigationContainer>
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
  repCountInput: {
    borderWidth: 3,
    borderColor: 'black',
    borderRadius: 5, 
    marginLeft: 205, 
    padding: 5,
    width: 50, 
    marginTop: 5, 
    margin: 20, 
    position: 'absolute'
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
