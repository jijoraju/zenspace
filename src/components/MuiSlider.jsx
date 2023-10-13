import React from 'react'

// components
import Slider from '@mui/material/Slider';

const marks = [
  {
    value: 0,
    label: 0,
  },
  {
    value: 20,
    label: 20,
  },
  {
    value: 37,
    label: 37,
  },
  {
    value: 100,
    label: 100,
  },
];

function valuetext(value) {
  return `${value}°C`;
}

function MuiSlider() {
  return (
    <Slider
      aria-label="Custom marks"
      defaultValue={20}
      getAriaValueText={valuetext}
      step={10}
      valueLabelDisplay="auto"
      marks={marks}
      min={0}
      max={200}
    />
  )
}

export default MuiSlider
