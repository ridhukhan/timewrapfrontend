import React from 'react'
import Hero from '../component/Hero'
import Rolex from '../component/Rolex'
import Casio from '../component/Casio'
import Olevs from '../component/Olevs'

const Home = () => {
  return (
    <div>
        <Hero/>
        <hr />
        <h1 className='font-bold justify-center text-center text-4xl underline decoration-blue-400'>ROLEX</h1>
 
<Rolex />  
      <hr />
        <h1 className='font-bold justify-center text-center text-4xl underline decoration-blue-400'>CASIO</h1>
 <Casio/>
 <hr />
        <h1 className='font-bold justify-center text-center text-4xl underline decoration-blue-400'>CASIO</h1>
<Olevs/>
    </div>
  )
}

export default Home