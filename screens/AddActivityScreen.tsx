import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import uuid from 'react-native-uuid';


export default function AddActivityScreen({ navigation }) {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [dateInput, setDateInput] = useState(Date.parse(Date.now()))
    const [data, setData] = useState([])

    // const getData = async () => {
    //     try {
    //       const jsonValue = await AsyncStorage.getItem('@activities')
    //       let res= jsonValue != null ? JSON.parse(jsonValue) : null;
    //       storeData(res)
    //       console.log(res,data)
    //     } catch (e) {
    //       // error reading value
    //     }
    //   }
    const storeData = async (value) => {
        try {
            const jsonValue = await AsyncStorage.getItem('@activities')
            if (jsonValue == null) {
                await AsyncStorage.setItem('@activities', JSON.stringify([value]))
            }
            else {

                var val = JSON.parse(jsonValue)
                val = [...val, value]
                await AsyncStorage.setItem('@activities', JSON.stringify(val))

            }


        } catch (e) {
            // saving error
        }
    }
    const handleSubmit = async () => {
        await storeData({ "id": uuid.v4(), "title": titleInput, "date": dateInput })
        navigation.navigate('Home')
    }
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setDateInput(Date.parse(date))
        hideDatePicker();
    };

    const [titleInput, setTitleInput] = useState('Title')


    return (<View style={styles.container}>
        <Text style={styles.text}>Form</Text>
        <TextInput style={styles.textInput} value={titleInput} onChangeText={text => setTitleInput(text)} />
        <Button title="Show Date Picker" onPress={showDatePicker} />
        <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
        />
        <Button title="Add activity" onPress={handleSubmit} />
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        color: 'white',
    }
    ,
    text: {
        color: 'white',
    },
    textInput: {
        color: 'white',
        backgroundColor: 'red'

    }
})