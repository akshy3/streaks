import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useState } from "react";
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import uuid from 'react-native-uuid';


export default function AddActivityScreen(props: { navigation: any; }) {
    const { navigation } = props
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [dateInput, setDateInput] = useState(Number(new Date().setHours(0, 0, 0, 0)))
    const [titleInput, setTitleInput] = useState('')


    const storeData = async (value: { id: string | number[]; title: string; date: number; history: Number[] }) => {
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
        if (titleInput !== "") {
            if (dateInput <= Date.now()) {

                await storeData({ id: uuid.v4(), title: titleInput, date: dateInput, history: [dateInput] })
                navigation.navigate('Home')
            }
        }
    }
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = (date: Date) => {
        setDatePickerVisibility(false);

    };

    const handleConfirm = (date: Date) => {
        setDateInput(Date.parse(date.toString()))
        hideDatePicker(date);

    };



    return (<View style={styles.container}>
        <TextInput style={styles.textInput} placeholder="Enter activity name" value={titleInput} onChangeText={text => setTitleInput(text)} />
        <TouchableOpacity style={styles.selectDateButton} onPress={showDatePicker}><Text style={styles.selectDateButtonText}>Select date</Text></TouchableOpacity>
        <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
        />
        <TouchableOpacity style={styles.addActivityButton} onPress={handleSubmit}><Text style={styles.addActivityButtonText}>Add activity</Text></TouchableOpacity>

    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#03071E',
        color: 'white',
        padding: 10,
        flex: 1,
    }
    ,
    text: {
        color: 'white',
    },
    textInput: {
        color: 'black',
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 2,
        padding: 5,
        paddingLeft: 10,

    },
    selectDateButton: {
        backgroundColor: '#03071E',
        borderWidth: 0.5,
        borderColor: 'white',
        padding: 10,
        width: '40%',
        marginTop: 10,
        marginBottom: 10,
    },
    selectDateButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    addActivityButton: {
        backgroundColor: '#03071F',
        borderWidth: 1,
        borderColor: 'white',
        padding: 10,
        width: '80%',
        marginTop: 10,
        marginBottom: 10,
    },
    addActivityButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
})