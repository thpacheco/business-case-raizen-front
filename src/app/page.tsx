'use client';
import React, { useEffect, useState } from 'react';
import styles from "./page.module.css";
import { TextField, Button, Container, Grid, FormControl, InputLabel, Input, FormHelperText, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Alert } from '@mui/material';
import Cliente from "./Models/ClienteModel";
import ClienteService from '../../src/app/Services/cliente.service';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';

import { blue, red } from '@mui/material/colors';

export const Cliente: Cliente = {
  idCliente: 0,
  nome: '',
  email: '',
  dataNascimento: '',
  cep: '',
};

export default function Home() {
  const [listClientes, setlistClientes] = useState([Cliente]);
  const [clienteCreate, setclienteCreate] = useState(Cliente);
  const [idCliente, setIdCliente] = useState(0);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [cep, setCep] = useState('');
  const [logradouro, setlogradouro] = useState('');
  const [bairro, setbairro] = useState('');
  const [visibleMsg, setvisibleMsg] = useState(false);

  useEffect(() => {
    getListAllClientes();
  }, []);

  const GetBindEditCliente = (id: number) => {
    ClienteService.getClienteByID(id).then(
      (response) => {
        BindClientEdit(response.data);
      });
  }
  const ExcluirCliente = (id: number) => {
    ClienteService.deleteCliente(id).then(
      () => {
        getListAllClientes();
        BindMsgNotification();
      });
  }
  const AtualizarCliente = (id: number) => {

    const objEdit: Cliente = {
      idCliente: idCliente,
      nome: nome,
      email: email,
      dataNascimento: dataNascimento,
      cep: cep
    }
    ClienteService.updateCliente(id, objEdit).then(
      () => {
        setclienteCreate(clienteCreate);
        getListAllClientes();
        BindMsgNotification();
        EmptyFields();
        setIdCliente(0);
      }
      , () => {
        console.log("Erro ao cadastrar novo cliente")
      })
  }
  const EmptyFields = () => {
    setNome('');
    setEmail('');
    setDataNascimento('');
    setCep('');
  }

  const BindClientEdit = (bindCliente: Cliente) => {
    setIdCliente(bindCliente.idCliente)
    setNome(bindCliente.nome)
    setEmail(bindCliente.email)
    setDataNascimento(bindCliente.dataNascimento.substring(0, 10))
    setCep(bindCliente.cep)
  }
  const BindMsgNotification = () => {
    setvisibleMsg(true);
    setTimeout(() => {
      setvisibleMsg(false);
    }, 3000);
  }
  const GetCepCorreios = (cep: string) => {
    ClienteService.getCepCorreios(cep.replace('-', '')).then(
      (response) => {
        setlogradouro(response.data.logradouro)
        setbairro(response.data.bairro)
      });
  }
  const ClienteSalve = () => {
    const objCreate = clienteCreate;
    objCreate.nome = nome;
    objCreate.email = email;
    objCreate.dataNascimento = dataNascimento.substring(0, 10);
    objCreate.cep = cep;

    ClienteService.createNewCliente(objCreate).then(
      () => {
        setclienteCreate(objCreate);
        getListAllClientes();
        BindMsgNotification();
        EmptyFields();
      }
      , () => {
        console.log("Erro ao cadastrar novo cliente")
      })
  }

  const getListAllClientes = () => {
    ClienteService.listAllClientes().then(
      (response) => {
        setlistClientes(response.data)
      });
  }
  return (
    <main className={styles.main}>
      <Container>
        {visibleMsg &&
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Alert variant="filled" icon={<CheckIcon fontSize="inherit" />} severity="success">
                Operação realizado com sucesso.
              </Alert>
            </Grid>
            <Grid item xs={12}></Grid>
          </Grid>
        }
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Nome"
              variant="outlined"
              fullWidth
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="E-mail"
              variant="outlined"
              fullWidth
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Data de Nascimento"
              variant="outlined"
              fullWidth
              type="date"
              required
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="CEP"
              variant="outlined"
              fullWidth
              required
              value={cep}
              onBlur={(e) => GetCepCorreios(e.target.value)}
              onChange={(e) => setCep(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Endereço"
              variant="outlined"
              fullWidth
              required
              value={logradouro}
              onChange={(e) => setCep(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Bairro"
              variant="outlined"
              fullWidth
              required
              value={bairro}
              onChange={(e) => setbairro(e.target.value)}
            />
          </Grid>
          <Grid item xs={10}>
          </Grid>
          <Grid item xs={2}>
            {
              idCliente > 0 ? <Button type="submit" variant="contained" color="success" onClick={() => AtualizarCliente(idCliente)}>
                Editar
              </Button> : <Button type="submit" variant="contained" color="primary" onClick={() => ClienteSalve()}>
                Salvar
              </Button>
            }
          </Grid>
          <Grid item xs={12}></Grid>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 300 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>Nome</TableCell>
                  <TableCell align="center">E-mail</TableCell>
                  <TableCell align="center">Data Nascimento</TableCell>
                  <TableCell align="center">Cep</TableCell>
                  <TableCell align="center">Editar</TableCell>
                  <TableCell align="center">Ecluir</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listClientes.map((row) => (
                  <TableRow
                    key={row.idCliente}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.idCliente}
                    </TableCell>
                    <TableCell align="right">{row.nome}</TableCell>
                    <TableCell align="right">{row.email}</TableCell>
                    <TableCell align="center">{row.dataNascimento.substring(0, 10)}</TableCell>
                    <TableCell align="right">{row.cep}</TableCell>
                    <TableCell align="right"><Button size="small" onClick={() => GetBindEditCliente(row.idCliente)} variant="outlined" startIcon={<EditIcon fontSize="small" sx={{ color: blue[500] }} />}>Editar</Button></TableCell>
                    <TableCell align="right"><Button size="small" onClick={() => ExcluirCliente(row.idCliente)} variant="outlined" startIcon={<DeleteIcon fontSize="small" sx={{ color: red[500] }} />}>Excluir</Button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Container>
    </main>
  );
}
