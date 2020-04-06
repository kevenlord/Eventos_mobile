import React, { useState, useEffect } from 'react';
import { withNavigation } from 'react-navigation'
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';

import api from '../services/api';

function ListaEventos({ categoria, navigation }){
    const [locais, setLocais] = useState([]);

   useEffect(() => {
        async function carregarEventos(){
            const response = await api.get('/locais', {
                params: { categoria }
            })
            
            setLocais(response.data);

        }

        carregarEventos();
   }, []);

   function handleNavigation(id){
       navigation.navigate('Reservar', { id });
   }
   
   
    return (
        <View style={styles.container}>
            <Text style={styles.title}> Eventos sobre: <Text style={styles.bold}>{categoria}</Text></Text>
            
            <FlatList
                style={styles.list}
                data={locais}
                keyExtractor={locais => locais._id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={( {item} ) => (
                    <View style={styles.listItem}> 
                        <Image style={styles.imagem} source={{ uri: item.imagem_url}}/>
                        
                        <Text style={styles.empresa}>{item.empresa}</Text>
                        <Text style={styles.data}>{item.data}</Text>
                        <Text style={styles.tipo}>{item.tipo}</Text>
                        <Text style={styles.preco}>{item.preco ? `R$${item.preco}` : 'GRATUITO'}</Text>
                        <TouchableOpacity onPress={() => handleNavigation(item._id)} style={styles.button}>
                            <Text style={styles.buttonText}>
                                Quero participar!
                            </Text>
                        </TouchableOpacity>
                        { console.log(item.imagem_url) }
                    </View>
                )}
                
            />
        </View>
    )
    
}


const styles = StyleSheet.create({
    container:{
        marginTop: 20,
    },
    title: {
        fontSize: 20,
        color: '#444',
        paddingHorizontal: 20,
        marginBottom: 15,
    },
    bold: {
        fontWeight: 'bold'
    },
    list:{
        paddingHorizontal:20,
    },
    listItem:{
        marginRight: 15,
    },
    imagem:{
        width: 150,
        height: 102,
        resizeMode: 'cover',
        borderRadius: 2,

    },
    empresa:{
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10,
    },
    preco:{
        fontSize: 15,
        color: '#999',
        marginTop: 5,
    },
    button:{
        height: 32,
        backgroundColor: '#FB585B',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginTop: 15,


    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 15,

    },

});

export default withNavigation(ListaEventos);