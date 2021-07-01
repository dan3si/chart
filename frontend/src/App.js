import React, { useState } from 'react'
import Chart from './components/Chart'
import WSProvider from './containers/WSProvider'

const App = () => {
  const [points, setPoints] = useState([])

  return (
    <WSProvider setPoints={setPoints}>
      <Chart data={points} />
    </WSProvider>
  );
}

export default App;
