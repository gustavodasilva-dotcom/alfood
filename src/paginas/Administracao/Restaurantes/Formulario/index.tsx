import {
  Box,
  Button,
  TextField,
  Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import IRestaurante from "../../../../interfaces/IRestaurante";
import http from "../../../../http";

const Formulario = () => {
  const [nome, setNome] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      http.get<IRestaurante>(`restaurantes/${id}/`)
        .then(response => setNome(response.data.nome))
        .catch(erro => console.log(erro));
    }
  }, []);

  const salvar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let url = 'restaurantes/';
    let method = 'POST';

    if (id) {
      method = 'PUT';
      url += `${id}/`;
    }

    http.request({
      url,
      method,
      data: {
        nome
      }
    })
      .then(() => navigate('/admin/restaurantes'))
      .catch(erro => console.log(erro));
  };

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      flexGrow: 1
    }}
    >
      <Typography component='h1' variant='h6'>
        Formulário de Restaurantes
      </Typography>
      <Box component='form' sx={{ width: '100%' }} onSubmit={salvar}>
        <TextField
          label="Nome do restaurante"
          value={nome}
          onChange={e => setNome(e.target.value)}
          variant="standard"
          sx={{ margin: '5px' }}
          fullWidth
          required />
        <Button
          type="submit"
          variant="outlined"
          sx={{ margin: '5px' }}
          fullWidth
        >
          Salvar
        </Button>
      </Box>
    </Box>
  );
}

export default Formulario;