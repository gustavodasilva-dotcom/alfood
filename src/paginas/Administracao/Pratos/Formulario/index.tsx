import {
  Box,
  Button,
  TextField,
  Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import http from "../../../../http";
import IPrato from "../../../../interfaces/IPrato";
import Restaurantes from "./Restaurantes";
import Tags from "./Tags";

const Formulario = () => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tag, setTag] = useState('');
  const [restaurante, setRestaurante] = useState('');
  const [imagem, setImagem] = useState<File | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      http.get<IPrato>(`pratos/${id}/`)
        .then(response => {
          setNome(response.data.nome);
          setDescricao(response.data.descricao);
          setTag(response.data.tag);
          setRestaurante(response.data.restaurante.toString());
        })
        .catch(erro => console.log(erro));
    }
  }, []);

  const salvar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let url = 'pratos/';
    let method = 'POST';

    if (id) {
      method = 'PUT';
      url += `${id}/`;
    }

    const formData = new FormData();

    formData.append('nome', nome);
    formData.append('descricao', descricao);
    formData.append('tag', tag);
    formData.append('restaurante', restaurante);

    if (imagem) {
      formData.append('imagem', imagem);
    }

    http.request({
      url,
      method,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: formData
    })
      .then(() => navigate('/admin/pratos'))
      .catch(erro => console.log(erro));
  };

  const selecionarArquivo = (evento: React.ChangeEvent<HTMLInputElement>) => {
    if (evento.target.files?.length) {
      setImagem(evento.target.files[0]);
    } else {
      setImagem(null);
    }
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
        Formulário de Pratos
      </Typography>
      <Box component='form' sx={{ width: '100%' }} onSubmit={salvar}>
        <TextField
          label="Nome do prato"
          value={nome}
          onChange={e => setNome(e.target.value)}
          variant="standard"
          sx={{ margin: '5px' }}
          fullWidth
          required
          margin="dense" />
        <TextField
          label="Descrição"
          value={descricao}
          onChange={e => setDescricao(e.target.value)}
          variant="standard"
          sx={{ margin: '5px' }}
          fullWidth
          required
          margin="dense" />
        <Tags tag={tag} setTag={setTag} />
        <Restaurantes restaurante={restaurante} setRestaurante={setRestaurante} />
        <input type='file' id='imagem' onChange={selecionarArquivo} style={{ margin: '5px' }} />
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