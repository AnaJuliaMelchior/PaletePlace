
import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Button, CheckBox, Input, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../style/MainStyle';
import usuarioService from '../services/UsuarioService';
//import CustomDialog from '../components/CustomDialog';
import { Button as PaperButton, Dialog, Portal, Provider, Paragraph} from 'react-native-paper';

export default function Cadastro({navigation}) {

  const [email, setEmail] = useState(null)
  const [nome, setNome] = useState(null)
  const [telefone, setTelefone] = useState(null)
  const [senha, setSenha] = useState(null)
  const [isSelected, setSelected] = useState(false)
  const [errorEmail, setErrorEmail] = useState(null)
  const [errorNome, setErrorNome] = useState(null)
  const [errorTelefone, setErrorTelefone] = useState(null)
  const [errorSenha, setErrorSenha] = useState(false)
  const [isLoading, setLoading] = useState(false)

  //const [visible, setVisible] = useState(false);
  //const showDialog = () => setVisible(true);
  //const hideDialog = () => setVisible(false);
 
  //daqui para baixo aula 26 custom dialog: 30-44

  const [visibleDialog, setVisibleDialog] = useState(false);
  const [titulo, setTitulo] = useState(null)
  const [mensagem, setMensagem] = useState(null)
  const [tipo, setTipo] = useState(null)

  const showDialog = (titulo, mensagem, tipo) => {
    setVisibleDialog(true)
    setTitulo(titulo)
    setMensagem(mensagem)
    setTipo(tipo)
  }

  const hideDialog = (status) => {
    setVisibleDialog(status)
  }

  const validar = () => {
    let error = false
    setErrorEmail(null)
    
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    
    if (!re.test(String(email).toLowerCase())){
      setErrorEmail("Preencha seu e-mail corretamente")
      error = true
    }
    if (telefone == null){
      setErrorTelefone("Preencha seu telefone corretamente")
      error = true
    }
    if (senha == null){
      setErrorSenha("Preencha a senha")
      error = true
    }
    return !error
  }

  /*const salvar = () => {
    if (validar()){
      setLoading(true)
      
      let data = {
        email: email,
        nome: nome,
        telefone: telefone,
        senha: senha
      }
      
      usuarioService.cadastrar(data)
      .then((response) => {
        setLoading(false)
        const titulo = (response.data.status) ? "Sucesso" : "Erro"
        //showDialog(titulo, response.data.mensagem, "SUCESSO")
        Alert.alert(titulo, response.data.mensagem)          
      })
      .catch((error) => {
        setLoading(false)
        //showDialog("Erro","Houve um erro inesperado", "ERRO")
        Alert.alert("Erro", "Houve um erro inesperado")
      })
    }
}*/

  //CONST SALVAR AULA 26

  //MEU CONST SALVAR
  const salvar = () => {
        if (validar()){
          setLoading(true)
           let data = {
            email: email,
            nome: nome,
            telefone: telefone,
            senha: senha,
           } 
           usuarioService.cadastrar(data)
           .then((response) => {
            setLoading(false)
            const titulo = (response.data.status) ? "Sucesso" : "Erro"
            Alert.alert(titulo, response.data.mensagem)
            console.log(response.data)
            //showDialog()
           })
           .catch((error) => {
            setLoading(false)
            Alert.alert("Erro", "Houve um erro inesperado!")
            console.log(error)
            //showDialog()
           })
        }
    }  

  return (
    <View style={[styles.container, specificStyle.specificContainer]}>
      <Text h2>Cadastre-se</Text>
      <Input
        placeholder="E-mail"
        onChangeText={value => {
            setEmail(value)
            setErrorEmail(null)
        }}
        keyboardType="email-address"
        errorMessage={errorEmail}        
        />

        <Input
            placeholder="Nome"
            onChangeText={value => setNome(value)}
            errorMessage={errorNome}
            />

        <Input
            placeholder='Telefone'
            onChangeText={value => {
              setTelefone(value)
              setErrorTelefone(null)
            }}
            keyboardType='number-pad'
            returnKeyType='done'
            />
        <Text style={styles.errorMessage}>{errorTelefone}</Text>
        <Input
          placeholder="Senha"
          onChangeText={value => setSenha(value)}
          errorMessage={errorSenha}
          secureTextEntry={true}
          />

        <CheckBox
            title="Aceito os termos de uso"
            checkedIcon="check"
            uncheckedIcon="square-o"
            checkedColor='green'
            uncheckedColor='red'
            checked={isSelected}
            onPress={()=> setSelected(!isSelected)}
            />

        { isLoading &&
          <Text>Carregando...</Text>
        }



        { !isLoading &&       
        <Button
            icon={
            <Icon
            name="check"
            size={15}
            color="white"
            />
        }
        title=" Salvar"
        buttonStyle={specificStyle.button}
        onPress={() => salvar()}
           />
 //AULA 26: 191 - 198     
      }

  { visibleDialog && 
      <CustomDialog titulo={titulo} 
      mensagem={mensagem} 
      tipo={tipo} 
      visible={visibleDialog} 
      onClose={hideDialog}>
      </CustomDialog>
    }

    </View>
  );
}

const specificStyle = StyleSheet.create ({
  specificContainer: {
    backgroundColor: "#fff",
    pdding: 10
  },
  button: {
    width: "100%",
    marginTop: 10,
  }
})

/* DIALOG PARA INSERIR LINHA 141 CASO NECESSARIO
<Provider>
<Portal>
<Dialog visible={visible} onDismiss={hideDialog}>
<Dialog.Title>Alert</Dialog.Title>
<Dialog.Content>
<Paragraph>This is simple dialog</Paragraph>
</Dialog.Content>
<Dialog.Actions>
<PaperButton onPress={hideDialog}>Done</PaperButton>
</Dialog.Actions>
</Dialog>
</Portal>
</Provider>*/