import React, { Component } from 'react'
import logo from "../image/logo.jpeg"
import { Outlet } from 'react-router-dom'
import { topBar } from '../style/page/TopBar'

class Topbar extends Component {
  render() {
    return (
        <>
        <div style={topBar.container}>
          <img style={topBar.logo} src={logo} alt="logo"/>
          <span>Invent Analytics</span>
        </div>
          <Outlet/>
        </>
    )
  }
}
export default Topbar
