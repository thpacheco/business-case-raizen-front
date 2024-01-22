import axios from "axios";
import Cliente from "../Models/ClienteModel";
import authHeader from "./auth-header";
const API_URL = 'https://localhost:7280/api/';

class ClienteService {
    createNewCliente(objCreate: Cliente) {
        const header = authHeader();
        return axios
            .post(API_URL + "Cliente", objCreate, header)
            .then(response => {
                if (response.data) {
                }
                return response.data;
            });
    }

    updateCliente(id: number, objCreate: Cliente) {
        const header = authHeader();
        console.log(header);
        return axios
            .put(API_URL + "Cliente/" + id, objCreate, header)
            .then(response => {
                if (response.data) {
                }
                return response.data;
            });
    }

    listAllClientes() {
        const header = authHeader();

        return axios.get(API_URL + "Cliente", header)
            .then(response => {
                return response.data
            })
            .catch((error) => {
                console.log('error ' + error);
            });
    }

    getClienteByID(id: number) {
        const header = authHeader();
        return axios.get(API_URL + "Cliente/" + id, header)
            .then(response => {
                return response.data
            })
            .catch((error) => {
                console.log('error ' + error);
            });

    }

    getCepCorreios(cep: string) {
        const header = authHeader();
        return axios.get(API_URL + "Cliente/cep/" + cep, header)
            .then(response => {
                return response.data
            })
            .catch((error) => {
                console.log('error ' + error);
            });

    }
    deleteCliente(id: number) {
        const header = authHeader();
         return axios.delete(API_URL + "Cliente/" + id, header)
            .then(response => {
                return response.data
            })
            .catch((error) => {
                console.log('error ' + error);
            });
    }

    countAllCliente() {
        const header = authHeader();
        return axios.get(API_URL + "Cliente/count", header)
            .then(response => {
                return response.data
            })
            .catch((error) => {
                console.log('error ' + error);
            });
    }
}

export default new ClienteService();