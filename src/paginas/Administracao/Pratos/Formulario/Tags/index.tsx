import React, { useEffect, useState } from "react";
import ITag from "../../../../../interfaces/ITag";
import http from "../../../../../http";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from "@mui/material";

interface Props {
  tag: string
  setTag: React.Dispatch<React.SetStateAction<string>>
}

const Tags = ({ tag, setTag }: Props) => {
  const [tags, setTags] = useState<ITag[]>([]);

  useEffect(() => {
    http.get<{ tags: ITag[] }>(`tags/`)
      .then(response => setTags(response.data.tags))
      .catch(erro => console.log(erro));
  }, []);

  return (
    <FormControl
      margin="dense"
      sx={{ margin: '5px' }}
      fullWidth
    >
      <InputLabel id='select-tag'>Tag</InputLabel>
      <Select
        labelId='select-tag'
        value={tag}
        onChange={e => setTag(e.target.value)}
      >
        {tags.map(tag => <MenuItem key={tag.id} value={tag.value}>
          {tag.value}
        </MenuItem>)}
      </Select>
    </FormControl>
  );
}

export default Tags;