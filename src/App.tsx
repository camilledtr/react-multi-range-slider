import React, { useState } from 'react'

import MultiRangeSlider from './MultiRangeSlider'

function App() {
  const [values, setValues] = useState([40, 45, 15])

  const labels = ['Men', 'Women', 'Other']

  return (
    <MultiRangeSlider
      values={values}
      labels={labels}
      onChange={setValues}
      color='#142a4c80'
      secondaryColor='#142a4c40'
      min={0}
      step={5}
      unit='%'
    />
  )
}

export default App
