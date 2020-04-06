import React from 'react'
import {Link} from 'react-router-dom'

const Home = () => {
  return (
    <div>
<div><Link to='/alldocs'>Wszystkie dokumenty</Link></div>
< div > < Link to = '/newdoc' > Nowy dokument </Link></div >


    </div>
  )
}

export default Home
