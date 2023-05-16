import React, { useState } from 'react'
import Navbar from '../Navbar'
import ScrollToTop from '../ScrollToTop'
import Sidebar from '../Sidebars/Sidebar'
import Footer from '../Footer'
import Heading from './Heading'
import LogoutModal from '../LogoutModal'
import Product from '../ComponentsPage/ProductPage/Product'

const Dashboard = () => {
  const [sidebarToggle, setSidebarToggle] = useState(true)
  const handleSidebar = () => {
    setSidebarToggle((prevSidebarToggle) => !prevSidebarToggle)
  }
  return (
    <div>
      <Product />
    </div>
  )
}

export default Dashboard
