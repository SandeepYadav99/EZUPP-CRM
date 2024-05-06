import React from 'react'
import Navbar from '../../components/NavBarHorizon/NavBarHorizon'
import dashboardRoutes from '../../routes/dashboard'

function HorizontalNav() {
  return (
    <div>
        <Navbar routes={dashboardRoutes}/>
    </div>
  )
}

export default HorizontalNav