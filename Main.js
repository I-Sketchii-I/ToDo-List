import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Pressable } from 'react-native';
import Note from './Note'

import { Audio } from 'expo-av';

// Main Component Class
export default class Main extends React.Component {
    constructor(props) {
        super(props)

        // Set initial state
        this.state = {
            // empty array to hold notes
            noteArray:[],
            // empty string to hold user input
            noteText: '',
            // boolean modal visibility varaible used to show/hide the modal
            modalVisible: false
        }
    }

    render() {

        // Delcare notes variable with noteArray, assigning a value and a key
        // that returns our 'Note' component with the previously set value and key
        // along with a delete option
        let notes = this.state.noteArray.map((val, key) => {
            return <Note key={key} keyval={key} val={val}
                    deleteMethod={()=> this.deleteNote(key)}
                    />
        })

        return (
        <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>ToDo</Text>
                </View>

                <ScrollView>
                    {notes}
                </ScrollView>

                <View style={styles.footer}>
                    <TextInput 
                        style={styles.textInput}
                        // Update noteText as user types in notes
                        onChangeText={(noteText)=> this.setState({noteText})}
                        value={this.state.noteText}
                        placeholder='Type here...'
                        placeholderTextColor='white'
                        underlineColorAndroid='transparent'
                        // ref so I can access this element outside the render
                        ref={input => { this.textInput = input }}
                    />
                </View>
                
                <Pressable onPress={this.addTask.bind(this)} style={styles.addButton} /* button to add notes to noteArray */>
                    <Text style={styles.addButtonText}>Add</Text>
                </Pressable>
        </View>
        );
    }

    // create new sound variable
    sound = new Audio.Sound();

    playPop() {
        ; (async () => {
          try {
            await Audio.setIsEnabledAsync(true);
            const sound = new Audio.Sound();
            await sound.loadAsync(require("./pop.wav"));
            await sound.playAsync();
          } catch (error) {
            console.error(error);
          }
        })();
    }

    playPlop() {
        ; (async () => {
          try {
            await Audio.setIsEnabledAsync(true);
            const sound = new Audio.Sound();
            await sound.loadAsync(require("./plop.wav"));
            await sound.playAsync();
          } catch (error) {
            console.error(error);
          }
        })();
    }

    // addTask function
    addTask() {
        // if there is user input
        if(this.state.noteText){
            // get the current date
            var date = new Date();
            // add the note to the array
            this.state.noteArray.push({
                // American style Date format
                'date': (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear(),
                'note': this.state.noteText
            });
            // update the current state
            this.setState({noteArray: this.state.noteArray});
            this.setState({noteText: this.state.noteText});

            this.textInput.clear()
            this.playPlop();
        }
    }

    // deleteNote function
    deleteNote(key) {
        // Remove 1 note from array using given key
        this.state.noteArray.splice(key, 1);
        // Update the noteArray using the updated state
        this.setState({noteArray: this.state.noteArray});

        this.playPop();
    }

}

// Stylesheet to make everything look pretty - fontFamily: 'Roboto' is specifically for OnePlus phones, remove if your phone does not support this font
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: '#a81738',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 10,
        borderBottomColor: '#ddd',
    },
    headerText: {
        fontFamily: 'Roboto',
        color: 'white',
        fontSize: 18,
        padding: 26,
    },
    scrollContainer: {
        flex: 1,
        marginBottom: 100,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10,
    },
    textInput: {
        fontFamily: 'Roboto',
        alignSelf: 'stretch',
        color: '#fff',
        padding: 20,
        backgroundColor: '#252525',
        borderTopWidth: 2,
        borderTopColor: '#ededed',
    },
    addButton: {
        position: 'absolute',
        zIndex: 11,
        right: 20,
        bottom: 90,
        backgroundColor: '#a81738',
        width: 90,
        height: 90,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 24,
        fontFamily: 'Roboto'
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    openButton: {
        backgroundColor: '#F194FF',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});
