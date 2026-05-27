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

  const[nomeComumPais, setNomeComumPais] = useState('');
  const[nomeOficialPais, setNomeOficialPais] = useState('');
  const[nomeRussoPais, setNomeRussoPais] = useState('');
  const[fotoPais, setFotoPais] = useState('');

  const [nomePaisPesquisa, setNomePaisPesquisa] = useState<string>('');

  const[nomeCapitalPesquisa, setNomeCapitalPesquisa] = useState<string>('');
  const[nomeOficialPais2, setNomeOficialPais2] = useState('');
  const[bandeiraPais, setBandeiraPais] = useState('');
  const[altBandeiraPais, setAltBandeiraPais] = useState('');

  const buscarTodos = () => {
  setCarregando(true);
    restcountriesClient.get('all', {
      params: {
        fields: 'name,capital,translations,maps'
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

const buscarNome = (nomePaisPesquisa: string) =>{
  setCarregando(true);
    restcountriesClient.get(`name/${nomePaisPesquisa}`, {
      params: {
        fields: 'name,capital,translations,maps'
      }
    })
  .then(result => {
    console.log(result.data);
    setNomeComumPais(result.data[0].name.common)
    setNomeOficialPais(result.data[0].name.official)
    setNomeRussoPais(result.data[0].translations.rus.common)
    setFotoPais(result.data[0].maps.openStreetMaps)
  })
  .catch(e => {
    console.log('Erro:', e);
  })
  .finally(() => {
    setCarregando(false);
  });
}
// fim entrega 1

const buscarCapital = (nomeCapitalPesquisa: string) =>{
    setCarregando(true);
    restcountriesClient.get(`capital/${nomeCapitalPesquisa}`, {
      params: {
        fields: 'name,flags'
      }
    })
  .then(result => {
    console.log(result.data);
    setBandeiraPais(result.data[0].flags.png)
    setNomeOficialPais2(result.data[0].name.official)
    setAltBandeiraPais(result.data[0].flags.alt)
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
        placeholder='O nome do Pais a ser pesquisado'
        onChangeText={setNomePaisPesquisa}
        value={nomePaisPesquisa}
        />

      <Pressable
      style={styles.button}
      onPress={() => buscarNome(nomePaisPesquisa)}>
      <text
      style={styles.buttonText}>Pesquisar nome</text>
      </Pressable>


      <View>
        <text>
          {nomeComumPais}
        </text>
        <text>
          {nomeOficialPais}
        </text>
        <text>
          {nomeRussoPais}
        </text>
        <text>
          {fotoPais}
        </text>
      </View>
    {/* Entrega 1 */}

      <TextInput
        style={styles.estilo1}
        placeholder='O nome da capital a ser pesquisada'
        onChangeText={setNomeCapitalPesquisa}
        value={nomeCapitalPesquisa}
        />

      <Pressable
      style={styles.button}
      onPress={() => buscarCapital(nomeCapitalPesquisa)}>
      <text
      style={styles.buttonText}>Pesquisar Capital</text>
      </Pressable>

      <View>
        <text>
          {nomeOficialPais2}
        </text>
        <img src={bandeiraPais} alt={altBandeiraPais} />
      </View>

    </View>
  );


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  estilo1:{
    width: '80%',
    borderColor:'gray',
    borderWidth: 1,
    marginBottom:12,
    marginTop:12,
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
