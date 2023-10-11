import React from "react";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function MuiSelection(props) {
  return (
    <FormControl sx={{}} className={props.containerStyle}>
      <InputLabel id={props.id}>{props.name}</InputLabel>
      <Select
        labelId={props.id}
        id="demo-simple-select"
        value={props.value}
        defaultValue={props.defaultValue}
        label={props.id}
        onChange={props.onChange}
        className={props.className}
      >
        {props.options.map((item, index) => (
          <MenuItem
            key={index}
            value={item.name}
            className={props.itemClassName}
          >
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default MuiSelection;
