import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import http from "../../../http";
import IRestaurante from "../../../interfaces/IRestaurante";

const AdmRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

  useEffect(() => {
    http.get<IRestaurante[]>('http://localhost:8000/api/v2/restaurantes/')
      .then(resposta => setRestaurantes(resposta.data))
      .catch(erro => console.log(erro));
  }, []);

  const excluir = (id: number) => {
    http.delete(`http://localhost:8000/api/v2/restaurantes/${id}/`)
      .then(() => {
        const listaAtualizada = restaurantes.filter(x => x.id !== id);
        setRestaurantes([...listaAtualizada]);
      })
      .catch(error => console.log(error));
  };

  return (
    <>
      <Link to='/admin/restaurantes/novo' style={{ textDecoration: 'none' }}>
        <Button variant='contained' color='primary'>
          Novo
        </Button>
      </Link>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Nome
              </TableCell>
              <TableCell>
                Editar
              </TableCell>
              <TableCell>
                Excluir
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {restaurantes.map(restaurante => (
              <TableRow key={restaurante.id}>
                <TableCell>
                  {restaurante.nome}
                </TableCell>
                <TableCell>
                  <Link
                    to={`/admin/restaurantes/${restaurante.id}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <Button variant='outlined' color='primary'>
                      Editar
                    </Button>
                  </Link>
                </TableCell>
                <TableCell>
                  <Button
                    variant='outlined'
                    color='error'
                    onClick={() => excluir(restaurante.id)}
                  >
                    Excluir
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default AdmRestaurantes;