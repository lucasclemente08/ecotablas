import React from 'react'
import Sidebar from '../../components/sidebar'
import Navbar from '../../components/Navbar'
import ButtonDelete from '../../components/buttonDelete'
import ButtonEdit from '../../components/buttonEdit'
const Home = () => {
  return (
    <>

<div className="bg-slate-900  ">
<div className="block   md:hidden">
  <Navbar />
</div>

<div className="hidden md:flex flex-1 flex-row">
  <Sidebar className="" />

</div>

</div>
  
    </>
  )
}

export default Home