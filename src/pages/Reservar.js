import React, { useState } from 'react';
import { View, Text, SafeAreaView, Alert,StyleSheet, TextInput, Platform, TouchableOpacity, AsyncStorage } from 'react-native';

import api from '../services/api';

export default function Reservar({ navigation }){
    const [motivo, setMotivo] = useState('');
    const id = navigation.getParam('id');

    async function handleSubmit() {
        const user_id = await AsyncStorage.getItem('usuario');
        
        await api.post(`/locais/${id}/reservas`, { 
            motivo 
        }, {
            headers: { user_id }
        })

        Alert.alert('Obrigador por se cadastrar!');
        navigation.navigate('Listar');
        
    }
    function handleCancel() {
        navigation.navigate('Listar');
    }


    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.label}>INFORME O MOTIVO DA INSCRIÇÃO</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Informe o motivo"
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                    value={motivo}
                    onChangeText={ setMotivo }

                />

                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>Continuar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleCancel} style={styles.cencelarbtn}>
                    <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
        </SafeAreaView>
    );
    
}

const styles = StyleSheet.create({
    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
        marginTop:30,
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

    cencelarbtn:{
        height: 42,
        backgroundColor: '#CCC',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginTop: 10,
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,

    },
    container: {
        margin:30,
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 25 : 0, //Android ja vem padrão nehnhenhé... O karai q vem! Aproveita e enfia o scrollview  no rabo tbm!

   },

});
