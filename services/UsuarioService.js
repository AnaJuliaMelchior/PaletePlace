import axios from "axios"

class UsuarioService{

    async cadastrar(data){
        return axios({
            url: "http://192.168.1.2:3000/usuario/cadastrar",
            method: "POST",
            timeout: 5000,
            data: data,
            headers: {
                Accept: 'application/json'
            }
        })
        .then((response) => {
            return Promise.resolve(response)
        })
        .catch((error) => {
            return Promise.reject(error)
        })
    }

    async login(data){
        return axios({
            url: "http://192.168.1.2:3000/usuario/login",
            method: "POST",
            timeout: 5000,
            data: data,
            headers: {
                Accept: 'application/json'
            }
        })
        .then((response) => {
            console.log(response)
            return Promise.resolve(response)
            //aula32 AsyncStorage.setItem("TOKEN", reponse.acess_token)
        })
        .catch((error) => {
            return Promise.reject(error)
        })
    }
}

const usuarioService = new UsuarioService()
export default usuarioService