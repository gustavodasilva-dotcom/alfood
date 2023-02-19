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
import IPrato from "../../../interfaces/IPrato";

const AdmPratos = () => {
  const [pratos, setPratos] = useState<IPrato[]>([]);

  useEffect(() => {
    http.get<IPrato[]>('http://localhost:8000/api/v2/pratos/')
      .then(resposta => setPratos(resposta.data))
      .catch(erro => console.log(erro));
  }, []);

  const excluir = (id: number) => {
    http.delete(`http://localhost:8000/api/v2/pratos/${id}/`)
      .then(() => {
        const listaAtualizada = pratos.filter(x => x.id !== id);
        setPratos([...listaAtualizada]);
      })
      .catch(error => console.log(error));
  };

  return (
    <>
      <Link to='/admin/pratos/novo' style={{ textDecoration: 'none' }}>
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
                Tag
              </TableCell>
              <TableCell>
                Imagem
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
            {pratos.map(prato => (
              <TableRow key={prato.id}>
                <TableCell>
                  {prato.nome}
                </TableCell>
                <TableCell>
                  {prato.tag}
                </TableCell>
                <TableCell>
                  <a
                    href={prato.imagem}
                    target='_blank'
                    rel="noreferrer"
                    style={{ textDecoration: 'none' }}
                  >
                    <Button variant='outlined' color='primary'>
                      Visualizar
                    </Button>
                  </a>
                </TableCell>
                <TableCell>
                  <Link
                    to={`/admin/pratos/${prato.id}`}
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
                    onClick={() => excluir(prato.id)}
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

export default AdmPratos;