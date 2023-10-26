import * as React from 'react';
import {useState} from 'react';
import {View, Button} from 'react-native'

function EnterBookScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Go to Genre"
          onPress={() => navigation.navigate('Genre')}
        />
        <Button title="Go back" onPress={() => navigation.goBack()} />
      </View>
    );
  }
export default EnterBookScreen;  
