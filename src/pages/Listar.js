import React, { useState, useEffect } from 'react';
import { View,SafeAreaView, Platform,StyleSheet,Text, Image,AsyncStorage, TextInput} from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';

import ListaEventos from '../components/ListaEventos';


import logo from '../../assets/logo_transparent.png';


export default function Listar({navigation}){
    const [ novo, setNovo ] = useState('');
    const [categoria, setCategoria] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('cat').then(storageCategoria => {
            const catArray = storageCategoria.split(',').map(cate => cate.trim());

            setCategoria(catArray);
        })
    }, []);

    async function handleSubmit(){
            AsyncStorage.clear();

            navigation.navigate('Login');
    }


    async function atualizar(){
        

        await AsyncStorage.setItem('cat', novo);

        navigation.navigate('Login');

    }

    
                 
    return (
        <SafeAreaView style={styles.container}>      
            <Image style={styles.logo} source={logo}/>
            <View style={styles.linha}>
            <TextInput
                    style={styles.input}
                    placeholder="Cursos de interesse"
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    value={novo}
                    onChangeText={ setNovo }

                />
            <TouchableOpacity onPress={atualizar} style={styles.buttonb}>
                    <Text style={styles.buttonText}>Procurar!</Text>
            </TouchableOpacity>
            </View>
            

            <ScrollView>
                {categoria.map(categoria => <ListaEventos key={categoria} categoria={categoria} />)}
            </ScrollView>
            
                 
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Sair</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
   container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 25 : 0, //Android ja vem padrão nehnhenhé... O karai q vem! Aproveita e enfia o scrollview  no rabo tbm!

   },

   logo:{
        height: 120,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 10,
        
   },

   button:{
        height: 42,
        backgroundColor: '#FB585B',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginTop: 30,


    },
    buttonb:{
        height: 44,
        backgroundColor: '#FB585B',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginLeft: 5,
        
        
        


    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
        

    },
    input:{
        borderWidth: 1,
        borderColor: "#FB585B",
        paddingHorizontal: 60,
        fontSize: 16,
        color: "#444",
        height: 44,
        marginBottom: 2,
        borderRadius: 2,
        

    },
    linha: {
        flexDirection:'row',

    },

});
