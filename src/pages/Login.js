import React, { useState, useEffect } from 'react';
import { View, AsyncStorage,KeyboardAvoidingView, Image, Text, TextInput, StyleSheet } from 'react-native';

import api from '../services/api';

import logo from '../../assets/logo_transparent.png';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';

export default function Login({ navigation }){
    const [ email, setEmail ] = useState('');
    const [ categoria, setCategoria ] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('usuario').then( usuario => {
            if(usuario){
                navigation.navigate('Listar');
            }
        })
    }, []);

    async function handleSubmit(){
        const response = await api.post('/sessao', {
            email
        })

        const { _id } = response.data;

        await AsyncStorage.setItem('usuario', _id);
        await AsyncStorage.setItem('cat', categoria);

        navigation.navigate('Listar');
    }

    return (
       //Inserir o buscar eventos dentro da listagem de eventos!
       //adicionar SENHA!!!!!!
    <KeyboardAvoidingView style ={styles.container}  behavior = 'padding'  enabled> 
        
        <Image source={logo} />
            <View style={styles.form}>
                <Text style={styles.label}>INFORME SEU E-MAIL</Text>
                <TextInput
                    style={styles.input}
                    placeholder="exemplo@gmail.com"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={ setEmail }

                />

                <Text style={styles.label}>CATEGORIA</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Cursos de interesse"
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    value={categoria}
                    onChangeText={ setCategoria }

                />

                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>Encontrar Eventos!</Text>
                </TouchableOpacity>
     
            </View>    
            
    </KeyboardAvoidingView>
    
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'

    },

    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginBottom: 30,
    },

    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
    },

    input:{
        borderWidth: 1,
        borderColor: "#ddd",
        paddingHorizontal: 20,
        fontSize: 16,
        color: "#444",
        height: 44,
        marginBottom: 20,
        borderRadius: 2

    },

    button:{
        height: 42,
        backgroundColor: '#FB585B',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,


    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,

    },
});