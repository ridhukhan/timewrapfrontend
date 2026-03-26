import React from 'react'
import Rolex from '../component/Rolex'
import Casio from '../component/Casio'
import Olevs from '../component/Olevs'

const MensWatch = () => {
  return (
    <div style={{paddingTop: '48px'}}>
      <h1 className='font-bold mt-7 text-center text-4xl underline decoration-blue-400'>ROLEX</h1>
      <Rolex/>
      <hr />
      <h1 className='font-bold text-center text-4xl underline decoration-blue-400'>CASIO</h1>
      <Casio/>
      <hr />
      <h1 className='font-bold text-center text-4xl underline decoration-blue-400'>OLEVS</h1>
      <Olevs/>
    </div>
  )
}

export default MensWatch