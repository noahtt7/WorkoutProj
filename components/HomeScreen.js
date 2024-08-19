import { StyleSheet, View, Text } from "react-native";
import { Calendar } from 'react-native-calendars';

function HomeScreen({ navigation, datesMarked, dateFromHomeScreen }) {
    const markedD = {};
  
    datesMarked.map((item) => {
      markedD[item] = {
        selected: true,
        marked: true,
        selectedColor: '#70d7c7',
      };
    });
  
    return(
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FEEAE6' }}>
        <Calendar
          style={ styles.calendar }
          onDayPress={day => {
            console.log('selected day', datesMarked);
            navigation.navigate("Exercises");
            dateFromHomeScreen(day);
          }}
          markedDates={
            markedD
          }
        />
        <Text></Text>
      </View>
    );
  }

  export default HomeScreen;

  const styles = StyleSheet.create({
    calendar: {
        height: 350,
        width: 350,
        borderColor: '#70d7c7',
        borderWidth: 5,
        borderRadius: 30
      },
  })