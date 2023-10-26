import React, { useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, View, Text, StyleSheet, TextInput, Alert, Image, TouchableOpacity, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Picker} from '@react-native-picker/picker';


const styles = StyleSheet.create({
  container: {
     width: '70%',
     height: '50%',
     backgroundColor: '#ff8c00',
     alignItems: 'center',
     justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    margin: 5,
  },
 });





 
 

function HomeScreen({ navigation }) {
  const [bookName, setBookName] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [totalPages, setTotalPages] = useState('');
  const [pagesRead, setPagesRead] = useState('');
 
  useEffect(() => {
     const fetchData = async () => {
       try {
         const value = await AsyncStorage.getItem('book');
         if (value !== null) {
           const book = JSON.parse(value);
           setBookName(book.bookName);
           setAuthor(book.author);
           setGenre(book.genre);
           setTotalPages(book.totalPages);
           setPagesRead(book.pagesRead);
         }
       } catch (error) {
         console.log('Error fetching book data:', error);
       }
     };
 
     fetchData();

     const calculateAveragePagesRead = () => {
 const pagesLeftToRead = totalPages - pagesRead;
 const totalWordCount = totalPages * 25;
 const wordsRead = pagesRead * 25;
 const wordsLeftToRead = totalWordCount - wordsRead;
 const pagesLeftToReadInWords = wordsLeftToRead / 25;
 return pagesLeftToReadInWords;
};
  }, []);
 
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
     
     <Image
            style={{ width: 600, height: 150,}}
            source={require('./Pic/bookaholic.png')}
            />
     <View style={styles.container}>
            
       <Text style={styles.text}>Book name: {bookName}</Text>
       <Text style={styles.text}>Author: {author}</Text>
       <Text style={styles.text}>Genre: {genre}</Text>
       <Text style={styles.text}>Total pages: {totalPages}</Text>
       <Text style={styles.text}>Pages Read: {pagesRead}</Text>
       <Text style={styles.text}>Average reading : 50 words/minute</Text>
       <Button
         title="Go to Enter Book"
         onPress={() => navigation.navigate('EnterBook')}
       />
       <Button
         title="Go to History"
         onPress={() => navigation.navigate('History')}
       />
       <Button
         title="Go to Genre"
         onPress={() => navigation.navigate('Genre')}
       />
     </View>
    </View>
  );
 }
 
 

 function EnterBookScreen({ navigation }) {
  const [bookName, setBookName] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [totalPages, setTotalPages] = useState('');
  const [pagesRead, setPagesRead] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const genreInputRef = useRef(null);
 
  const genres = ['Fantasy', 'Science Fiction', 'Mystery', 'Romance', 'Thriller'];
 
  const saveBook = async () => {
    try {
      const book = {
        bookName,
        author,
        genre,
        totalPages,
        pagesRead,
      };
      await AsyncStorage.setItem('book', JSON.stringify(book));
      handleSuccess();
    } catch (error) {
      console.log('Error saving book:', error);
    }
  };
 
  const handleSuccess = () => {
    Alert.alert(
      'Success',
      'Book information has been saved successfully.',
      [
        { text: 'OK', onPress: () => navigation.navigate('Home') },
      ],
      { cancelable: false },
    );
  };
 
  const selectGenre = (selectedGenre) => {
    setGenre(selectedGenre);
    setShowDropdown(false);
  };
 
  const renderGenres = genres.map((g, index) => (
<TouchableOpacity key={index} onPress={() => selectGenre(g)}>
<Text>{g}</Text>
</TouchableOpacity>
  ));
 
  const styles = {
    container: {
      backgroundColor: 'orange',
      paddingTop: 70,
      paddingBottom: 50,
      paddingLeft: 160, 
      paddingRight: 160, 
      marginTop: 20, 
      borderRadius: 10, 
    },
    text: {
      fontSize: 33, 
      marginTop: 20,
    },
    input: {
      borderColor: 'black',
      borderWidth: 5, 
      borderRadius: 5,
      paddingLeft: 10, // Reduced padding for better fit
      marginTop: 10,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 20,
    },
    dropdownContainer: {
      borderColor: 'black',
      borderWidth: 5,
      borderRadius: 5,
      marginTop: 10,
      maxHeight: showDropdown ? 120 : 0,
      overflow: 'hidden',
    },
    dropdownItem: {
      padding: 10,
    },
  };
 
  return (
<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
<View style={styles.container}>
<Text style={styles.text}>Book Name</Text>
<TextInput
          style={styles.input}
          placeholder="Enter book name"
          onChangeText={(text) => setBookName(text)}
        />
 
        <Text style={styles.text}>Author</Text>
<TextInput
          style={styles.input}
          placeholder="Enter author name"
          onChangeText={(text) => setAuthor(text)}
        />
 
        <Text style={styles.text}>Genre</Text>
<View>
<TextInput
            ref={genreInputRef}
            style={styles.input}
            placeholder="Select genre"
            onFocus={() => setShowDropdown(true)}
            value={genre}
          />
<View style={styles.dropdownContainer}>
<ScrollView>{renderGenres}</ScrollView>
</View>
</View>
 
        <Text style={styles.text}>Total pages</Text>
<TextInput
          style={styles.input}
          placeholder="Enter total pages"
          onChangeText={(text) => setTotalPages(text)}
        />
 
        <Text style={styles.text}>Pages Read</Text>
<TextInput
          style={styles.input}
          placeholder="Enter pages read"
          onChangeText={(text) => setPagesRead(text)}
        />
 
        <View style={{ marginTop: 20 }}>
<Button title="Save Book" onPress={saveBook} />
</View>
</View>
<View style={styles.buttonContainer}>
<Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
<Button title="Go to History" onPress={() => navigation.navigate('History')} />
<Button title="Go to Genre" onPress={() => navigation.navigate('Genre')} />
</View>
</View>
  );
}



function GenreScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Go to History"
        onPress={() => navigation.navigate('History')}
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

function HistoryScreen({ navigation }) {
  const [book, setBook] = useState(null);
 
  const getBook = async () => {
     try {
       const book = await AsyncStorage.getItem('book');
       if (book !== null) {
         setBook(JSON.parse(book));
       }
     } catch (error) {
       console.log('Error getting book:', error);
     }
  };
 
  useEffect(() => {
     getBook();
  }, []);
 
  return (
     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
       {book && (
         <View>
           <Text>Book Name: {book.bookName}</Text>
           <Text>Author: {book.author}</Text>
           <Text>Genre: {book.genre}</Text>
           <Text>Total Pages: {book.totalPages}</Text>
           <Text>Pages Read: {book.pagesRead}</Text>
         </View>
       )}
       <Button title="Go back" onPress={() => navigation.goBack()} />
     </View>
  );
 };


const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Genre" component={GenreScreen} />
      <Stack.Screen name="EnterBook" component={EnterBookScreen} />
      <Stack.Screen name="History" component={HistoryScreen} />
    </Stack.Navigator>
  );
}

export default function () {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

  
 