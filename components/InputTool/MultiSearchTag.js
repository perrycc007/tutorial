import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export default function MultiSearchTag(props) {
  return (

      <Autocomplete
        multiple
        id="tags-outlined"
        options={props.list}
        getOptionLabel={(option) => option.title}
        // defaultValue={[top100Films[13]]}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            label="filterSelectedOptions"
            placeholder="Favorites"
          />
        )}
      />

  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top

