import * as React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';

import { Button, Input } from '@rneui/themed';
import { useForm } from 'react-hook-form';
import DatePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';


import {
  initDB,
  saveItem
} from "../helper/fb-data";

import { useEffect, useRef, useState } from "react";

//Importing icons
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';


export default function AddPostScreen({ navigation }) {

  //Connecting DB
  useEffect(() => {
    try {
      initDB();
    } catch (err) {
      console.log(err);
    }
  }, []);


  //For Date
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setDate(currentDate);
  };

  const showDatePicker = () => {
    setShowPicker(true);
  };

  //For Time
  const [time, setTime] = useState(new Date());
  const [showTimePick, setTimePicker] = useState(false);

  const onTimeChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setTimePicker(false);
    setTime(currentDate);
  };

  const showTimePicker = () => {
    setTimePicker(true);
  };

  //For Item
  const [itemText, setItemText] = useState('');
  const [elements, setElements] = useState([]);

  const handleAddElement = () => {
    if (itemText.trim() !== '') {
      const newElement = {
        itemTitle: itemText,
        images: []
      };
      setElements([...elements, newElement]);
      setItemText('');
    }
  };

  const handleDeleteElement = (id) => {
    const updatedElements = elements.filter((element) => element.id !== id);
    setElements(updatedElements);
  };

  const pickImage = async (elementIndex) => {

    const element = elements[elementIndex];

    //Allow only upto 3 images
    if (element.images.length >= 3) {
      Alert.alert('Maximum Limit Reached', 'You can select up to three images.');
      return;
    }

    let media = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 1,
    });

    if (!media?.canceled) {
      const updatedElements = [...elements];
      updatedElements[elementIndex].images.push(media.assets[0].uri);
      setElements(updatedElements);
    }
  };

  // const deleteImage = (elementIndex, imageIndex) => {
  //   const updatedElements = [...elements];
  //   updatedElements[elementIndex].images.splice(imageIndex, 1);
  //   setElements(updatedElements);
  // };

  //Form handling
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  const Submit = (data) => {
    if (elements.length < 1) {
      Alert.alert('Please add items');
      return
    } else {
      const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
      const formattedDate = date.toLocaleDateString('en-US', options);

      const timeOpt = { hour: 'numeric', minute: 'numeric', hour12: true };
      const formattedTime = date.toLocaleTimeString('en-US', timeOpt);

      data["time"] = formattedTime;
      data["date"] = formattedDate;
      data["items"] = elements

      if (data['note'] == undefined) {
        data["note"] = '';
      }

      saveItem(data, "postAd")
    }

  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>

        {/* Post Details */}
        <View style={styles.subContainer}>
          <Text style={styles.mainLabel}>POST DETAILS</Text>
          <View style={styles.inputRow}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              type="text"
              onChangeText={(text) => setValue('title', text)}
              {...register('title', { required: true })}
              style={styles.inputText}
            />
            {errors.title && <Text style={styles.errorMessage}>This field is required.</Text>}
          </View>

          <View style={styles.inputRow}>
            <Text style={styles.label} >Description</Text>
            <TextInput
              type="text"
              onChangeText={(text) => setValue('description', text)}
              {...register('description', { required: true })}
              style={styles.inputText}
            />
            {errors.description && <Text style={styles.errorMessage}>This field is required.</Text>}
          </View>
        </View>

        {/* Timing Details */}
        <View style={styles.subContainer}>
          <Text style={styles.mainLabel} >TIMING DETAILS</Text>
          <View style={styles.inputRow}>
            <Text style={styles.label} >Address</Text>
            <TextInput
              type="text"
              onChangeText={(text) => setValue('address', text)}
              {...register('address', { required: true })}
              style={styles.inputText}
            />
            {errors.address && <Text style={styles.errorMessage} >This field is required.</Text>}
          </View>

          <View style={styles.inputRow}>
            <Text style={styles.label} >City</Text>
            <TextInput
              type="text"
              onChangeText={(text) => setValue('city', text)}
              {...register('city', { required: true })}
              style={styles.inputText}
            />
            {errors.city && <Text style={styles.errorMessage} >This field is required.</Text>}
          </View>

          <View style={styles.inputRow}>
            <Text style={styles.label} >Zip Code</Text>
            <TextInput
              type="text"
              onChangeText={(text) => setValue('zip', text)}
              {...register('zip', { required: true })}
              style={styles.inputText}
            />
            {errors.zip && <Text style={styles.errorMessage} >This field is required.</Text>}
          </View>

          <View style={styles.inputRow}>
            <Text style={styles.label} >Date</Text>
            <View>
              <TouchableOpacity style={styles.date} onPress={showDatePicker} >
                <View style={styles.dateRow}>
                  <Feather style={styles.dateElement} name="calendar" size={24} color="black" />
                  <Text
                    style={styles.dateElement}
                    type="text"
                  >{date.toDateString()}</Text>
                </View>
              </TouchableOpacity>
              {showPicker && (
                <DatePicker
                  value={date}
                  mode="date"
                  display="default"
                  onChange={onDateChange}
                />
              )}
            </View>
            {errors.date && <Text style={styles.errorMessage} >This field is required.</Text>}
          </View>

          <View style={styles.inputRow}>
            <Text style={styles.label} >Time</Text>
            <View>
              <TouchableOpacity style={styles.date} onPress={showTimePicker} >
                <View style={styles.dateRow}>
                  <Ionicons style={styles.dateElement} name="time-outline" size={24} color="black" />
                  <Text
                    type="text"
                    style={styles.dateElement}
                  >{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                </View>
              </TouchableOpacity>
              {showTimePick && (
                <DatePicker
                  value={time}
                  mode="time"
                  is24Hour={true}
                  display="default"
                  onChange={onTimeChange}
                />
              )}
            </View>
            {errors.time && <Text style={styles.errorMessage}>This field is required.</Text>}
          </View>

        </View>

        {/* Items Details */}
        <View style={styles.subContainer}>
          <Text style={styles.mainLabel} >ITEM DETAILS</Text>
          <View style={styles.itemDetail}>
            <View style={styles.itemContainer}>
              <TextInput
                placeholder="Enter the item you want to sale"
                value={itemText}
                onChangeText={setItemText}
                style={styles.input}
              />
              <TouchableOpacity style={styles.addButton} onPress={handleAddElement}>
                <Text style={styles.addButtonLabel}>Add</Text>
              </TouchableOpacity>
            </View>
            {elements.map((element, index) => (
              <View style={styles.elementContainer} key={index}>
                <Text style={styles.elementText}>{element.itemTitle}</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                  {element.images.map((imageUri, imageIndex) => (
                    <Image
                      key={imageIndex}
                      source={{ uri: imageUri }}
                      style={{ width: 50, height: 50, margin: 5 }}
                    />
                  ))}
                </View>
                <TouchableOpacity style={styles.photoButton} onPress={() => pickImage(index)}>
                  <MaterialIcons name="add-a-photo" size={24} color="#5DB075" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDeleteElement(element.id)}
                >
                  <MaterialIcons name="delete" size={30} color="red" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        {/* Additional Details*/}
        <View style={styles.subContainer}>
          <Text style={styles.mainLabel} >ADDITIONAL</Text>
          <View style={styles.inputRow}>
            <TextInput
              type="text"
              onChangeText={(text) => setValue('note', text)}
              {...register('note', { required: false })}
              style={styles.inputText}
              placeholder='Add any additional notes that you want your buyers to know!'
            />
          </View>
        </View>

        <View style={styles.buttonDiv}>
          <Button buttonStyle={styles.postButton} onPress={handleSubmit(Submit)} title="Post" />
        </View>

      </ScrollView>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFCFC',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  subContainer: {
    margin: 10,
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#a2c9a2',
  },
  inputRow: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderColor: '#F0F4F9',
    borderWidth: 1,
    margin: 10,
    borderRadius: 10,
  },
  mainLabel: {
    fontSize: 18,
    fontWeight: '500',
    color: '#5DB075'
  },
  label: {
    color: '#808080',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5
  },
  inputText: {
    borderRadius: 8,
    height: 20
  },
  postButton: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    marginBottom: 6,
    marginTop: 6,
    textAlign: 'center',
    height: 50,
    width: 100,
    backgroundColor: '#5DB075'
  },
  buttonDiv: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  date: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  dateRow: {
    flexDirection: "row"
  },
  dateElement: {
    margin: 5,
    color: '#808080',
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#F0F4F9',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    color: '#808080',
  },
  addButton: {
    backgroundColor: '#5DB075',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  addButtonLabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  elementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    height: 50,
    padding: 5
  },
  elementText: {
    flex: 1,
    fontSize: 18,
    fontStyle: 'italic'
  },
  photoButton: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    marginRight: 5,
  },
  itemDetail: {
    flex: 1,
    margin: 20,
    padding: 10
  },
  errorMessage: {
    fontSize: 12,
    fontStyle: 'italic',
    color: 'red'
  }
});
