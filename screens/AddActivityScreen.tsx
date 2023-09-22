import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Button, Chip, Snackbar, TextInput } from "react-native-paper";
import uuid from 'react-native-uuid';


export default function AddActivityScreen(props: { navigation: any; }) {
    const { navigation } = props
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [dateInput, setDateInput] = useState(Number(new Date().setHours(0, 0, 0, 0)))
    const [titleInput, setTitleInput] = useState('')
    const [incompleteCredentialsSnackVisible, setIncompleteCredentialsSnackVisible] = useState(false)


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
        else {
            setIncompleteCredentialsSnackVisible(true)
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
        <TextInput
            mode="outlined"
            label="Activity name"
            value={titleInput}
            onChangeText={text => setTitleInput(text)}
        />
        <Chip
            onPress={showDatePicker}
            style={styles.selectDateButton}
            icon="calendar">{new Date(dateInput).toDateString()} </Chip>

        <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
        />
        <Button style={styles.addActivityButton} icon="check-outline" mode="contained" onPress={handleSubmit}>Add</Button>
        <Snackbar
            visible={incompleteCredentialsSnackVisible}
            onIconPress={() => { setIncompleteCredentialsSnackVisible(!incompleteCredentialsSnackVisible) }}
            onDismiss={() => { setIncompleteCredentialsSnackVisible(false) }}
        >
            Please fill all the details.
        </Snackbar>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
    },
    selectDateButton: {
        marginTop: 10,
        marginBottom: 10,
    },

    addActivityButton: {
        marginTop: 10,
        marginBottom: 10,
    },

})