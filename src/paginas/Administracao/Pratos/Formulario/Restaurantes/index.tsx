import React, { useEffect, useState } from "react";
import http from "../../../../../http";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from "@mui/material";
import IRestaurante from "../../../../../interfaces/IRestaurante";

interface Props {
  restaurante: string
  setRestaurante: React.Dispatch<React.SetStateAction<string>>
}

const Restaurantes = ({ restaurante, setRestaurante }: Props) => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

  useEffect(() => {
    http.get<IRestaurante[]>(`restaurantes/`)
      .then(response => setRestaurantes(response.data))
      .catch(erro => console.log(erro));
  }, []);

  return (
    <FormControl
      margin="dense"
      sx={{ margin: '5px' }}
      fullWidth
    >
      <InputLabel id='select-restaurante'>Restaurante</InputLabel>
      <Select
        labelId='select-restaurante'
        value={restaurante}
        onChange={e => setRestaurante(e.target.value)}
      >
        {restaurantes.map(restaurante => <MenuItem key={restaurante.id} value={restaurante.id}>
          {restaurante.nome}
        </MenuItem>)}
      </Select>
    </FormControl>
  );
}

export default Restaurantes;