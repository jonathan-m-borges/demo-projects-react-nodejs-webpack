import React, { useState, useEffect } from 'react';
import { SafeAreaView, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import api from './services/api';

export default function App() {
    const [projects, setProjects] = useState([{ id: '1', title: 'p1' }]);

    useEffect(() => {
        console.log('buscando projetos...');
        api.get('/projects').then(response => {
            console.log(response.data);
            setProjects(response.data);
        });
    }, [])

    async function handleAddProject() {
        const response = await api.post('/projects', {
            title: `Project ${Date.now()}`,
            owner: 'Jonathan M Borges'
        });
        const project = response.data;
        setProjects([...projects, project]);
    }

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="red" />
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={projects}
                    keyExtractor={p => p.id}
                    renderItem={({item}) => (
                        <Text style={styles.title}>{item.title}</Text>
                    )}
                />
                <TouchableOpacity activeOpacity={0.6} style={styles.button} onPress={handleAddProject}>
                    <Text style={styles.buttonText}>Adicionar Projeto</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7159c1'
    },
    title: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold'
    },
    button: {
        backgroundColor: '#fff',
        borderRadius: 16,
        margin: 20,
        padding: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonText: {
        fontWeight: "bold",
        fontSize: 20
    }
})