import React from 'react'
import Hero from '../component/Hero'
import Rolex from '../component/Rolex'

const Home = () => {
  return (
    <div>
        <Hero/>
        <hr />
        <h1 className='font-bold justify-center text-center text-4xl underline decoration-blue-400'>ROLEX</h1>
 
<Rolex />  
    
    </div>
  )
}

export default Home