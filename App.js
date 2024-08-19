import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, FlatList, Button, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/HomeScreen';
import ExerciseScreen from './components/ExerciseScreen';

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
          title: "Home",
          headerTitleAlign: 'center',
          headerSize: 50,
          headerStyle: {
            backgroundColor: '#ecc0c2'
          },
          headerTitleStyle: {
            fontSize: 30
          }
        }}
        >
          {(props) => <HomeScreen {...props}
          datesMarked={
            dateToExerciseMap.map((item) =>
              item.date
            )
          }
          dateFromHomeScreen={getDate} />}
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
  item: {
    padding: 10,
    height: 44
  },
  weightPlaceholder: {
    fontSize: 5
  },
});
