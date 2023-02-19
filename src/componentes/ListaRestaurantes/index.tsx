import axios, { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import IRestaurante from '../../interfaces/IRestaurante';
import { IPaginacao } from '../../interfaces/IPaginacao';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import { Button, MenuItem, Select, TextField } from '@mui/material';
import IParametrosBusca from '../../interfaces/IParametrosBusca';

const ListaRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [paginaSeguinte, setPaginaSeguinte] = useState('');
  const [paginaAnterior, setPaginaAnterior] = useState('');

  const [ordenarPor, setOrdernarPor] = useState('');
  const [textoPesquisa, setTextoPesquisa] = useState('');

  const opcoesOrdenacao = [{
    value: '',
    label: 'Padrão'
  }, {
    value: 'id',
    label: 'Por ID'
  }, {
    value: 'nome',
    label: 'Por nome'
  }];

  useEffect(() => {
    carregarRestaurantes('http://localhost:8000/api/v1/restaurantes/');
  }, []);

  const carregarRestaurantes = (endpoint: string, opcoes: AxiosRequestConfig = {}) => {
    axios.get<IPaginacao<IRestaurante>>(endpoint, opcoes)
      .then(resposta => {
        setRestaurantes(resposta.data.results);
        setPaginaSeguinte(resposta.data.next);
        setPaginaAnterior(resposta.data.previous);
      })
      .catch(erro => console.log(erro));
  };

  const buscar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const opcoes = {
      params: { } as IParametrosBusca
    };

    if (textoPesquisa) {
      opcoes.params.search = textoPesquisa;
    }

    if (ordenarPor) {
      opcoes.params.ordering = ordenarPor;
    }

    carregarRestaurantes('http://localhost:8000/api/v1/restaurantes/', opcoes);
  };

  return (<section className={style.ListaRestaurantes}>
    <h1>Os restaurantes mais <em>bacanas</em>!</h1>
    <form onSubmit={buscar}>
      <TextField
        label='Digite aqui'
        variant='standard'
        value={textoPesquisa}
        onChange={e => setTextoPesquisa(e.target.value)}
      />
      <Button type='submit' variant='outlined'>
        Buscar
      </Button>
      <Select
        label='Ordenar por'
        value={ordenarPor}
        onChange={e => setOrdernarPor(e.target.value)}
      >
        {opcoesOrdenacao.map((opcao, index) => (
          <MenuItem key={index} value={opcao.value}>
            {opcao.label}
          </MenuItem>
        ))}
      </Select>
    </form>
    {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}
    {paginaSeguinte && <button onClick={() => carregarRestaurantes(paginaSeguinte)}>
      Próximo
    </button>}
    {paginaAnterior && <button onClick={() => carregarRestaurantes(paginaAnterior)}>
      Anterior
    </button>}
  </section>)
}

export default ListaRestaurantes