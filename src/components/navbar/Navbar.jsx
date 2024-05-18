import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import "./Navbar.scss"

const Navbar = () => {
  let {pathname} = useLocation()
  let isLogin = localStorage.getItem("x-auth-token")
  
  if(pathname.includes("register") || pathname.includes("admin")){
    return <></>
  }

  return (
    <>
      <nav className='navbar'>
              <div className="navbar__toggle">
                  <label htmlFor="menu" aria-label="Main Navigation Menu"></label>
                  <input id="menu" className="navbar__input" name="menu" type="checkbox" aria-label="Main Navigation Menu" />
                  <span className="navbar__span navbar__span--empty"></span>
                  <span className="navbar__span"></span>
                  <span className="navbar__span"></span>
                  <ul className="navbar__menu list-menu justify-content-between">
                    <div>
                      <li className="navbar__container-logo"><h2><NavLink className="navbar__logo link-no-style h1" to="/">Product Logo</NavLink></h2></li>
                    </div>
                    <div className='d-flex '>
                      <li className="navbar__menu-item"><NavLink className="body-md link-no-style" to="/">Home</NavLink></li>
                      <li className="navbar__menu-item"><NavLink className="body-md link-no-style" to="/">About</NavLink></li>
                      <li className="navbar__menu-item"><NavLink className="body-md link-no-style" to="/">Portfolio</NavLink></li>
                      <li className="navbar__menu-item"><NavLink className="body-md link-no-style" to={isLogin ? "/admin/create" : "/register"}>{isLogin ? "Account" : "Login"}</NavLink></li>
                    </div>
                  </ul>
              </div>
          </nav>
        </>
  )
}

export default Navbar