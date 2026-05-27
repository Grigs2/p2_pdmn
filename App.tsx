// import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { 
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable
} from 'react-native';
import restcountriesClient from './utils/restcountriesClient';



export default function App() {

  const [carregando, setCarregando] = useState(false);




  const [nomePais, setNomePais] = useState<string>('');

  const buscarTodos = () => {
  setCarregando(true);
    restcountriesClient.get('all', {
      params: {
        fields: 'name,capital'
      }
    })
  .then(result => {
    console.log(result.data); 
  })
  .catch(e => {
    console.log('Erro:', e);
  })
  .finally(() => {
    setCarregando(false);
  });
  }



  return (
    <View style={styles.container}>

      <Pressable
      style={styles.button}
      onPress={buscarTodos}>
      <text
      style={styles.buttonText}>Pesquisar todos</text>
      </Pressable>


        <TextInput
        style={styles.estilo1}
        placeholder='Digite Algo...'
        onChangeText={setNomePais}
        value={nomePais}
        />

      <Pressable
      style={styles.button}>
      <text
      style={styles.buttonText}>Pesquisar nome</text>
      </Pressable>
    
    </View>
  );


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  estilo1:{
    width: '80%',
    borderColor:'gray',
    borderWidth: 1,
    marginBottom:12,
    padding:8,
    textAlign: 'center',
    borderRadius: 4
  },

  button:{
    borderColor:'gray',
    backgroundColor:'pink',
    borderWidth: 1,
    marginBottom:12,
    padding:8,
    textAlign: 'center',
    borderRadius: 18
  },

  buttonText:{
    fontFamily: 'arial',
    textAlign: 'center'
  }
});
