import React from 'react'
import Sidebar from '../../components/sidebar'
import Navbar from '../../components/Navbar'

const Home = () => {
  return (
    <>

<div className="bg-slate-900 flex flex-col min-h-screen">

  <Navbar className="block md:hidden" />

  <div className="flex flex-row flex-1">

    <Sidebar className="hidden  w-1/4" />
    <div className="flex-1 p-4">
   
    </div>
  </div>
</div>

    </>
  )
}

export default Home