import PropTypes from "prop-types"
import React, { useState, useEffect } from "react"
import { Collapse, DropdownItem } from "reactstrap"
import { Link, withRouter } from "react-router-dom"
import classname from "classnames"

//i18n
import { useTranslation } from "react-i18next"

import { connect } from "react-redux"

const Navbar = props => {
  const { t } = useTranslation()
  const [dashboard, setdashboard] = useState(false)
  const [order, setOrder] = useState(false)
  const [preview, setPreview] = useState(false)
  const [info, setInfo] = useState(false)
  const [publish, setPublish] = useState(false)
  const [app, setapp] = useState(false)

  // useEffect(() => {
  //   var matchingMenuItem = null
  //   var ul = document.getElementById("navigation")
  //   var items = ul.getElementsByClassName("navbar-dropdown-item")
  //   for (var i = 0; i < items.length; ++i) {
  //     if (props.location.pathname === items[i].pathname) {
  //       matchingMenuItem = items[i]
  //       break
  //     }
  //   }
  //   if (matchingMenuItem) {
  //     activateParentDropdown(matchingMenuItem)
  //   }
  // })
  
  // function activateParentDropdown(item) {
  //   item.classList.add("active")
  //   const parent = item.parentElement
  //   if (parent) {
  //     parent.classList.add("active") // li
  //     const parent2 = parent.parentElement
  //     parent2.classList.add("active") // li
  //     const parent3 = parent2.parentElement
  //     if (parent3) {
  //       parent3.classList.add("active") // li
  //       const parent4 = parent3.parentElement
  //       if (parent4) {
  //         parent4.classList.add("active") // li
  //         const parent5 = parent4.parentElement
  //         if (parent5) {
  //           parent5.classList.add("active") // li
  //           const parent6 = parent5.parentElement
  //           if (parent6) {
  //             parent6.classList.add("active") // li
  //           }
  //         }
  //       }
  //     }
  //   }
  //   return false
  // }

  return (
    <React.Fragment>
      <div className="topnav">
        <div className="container-fluid">
          <nav
            className="navbar navbar-light navbar-expand-lg topnav-menu"
            id="navigation"
          >
            <Collapse
              isOpen={props.leftMenu}
              className="navbar-collapse"
              id="topnav-menu-content"
            >
              <ul className="navbar-nav" style={{marginRight: "auto"}}>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle arrow-none"
                    onClick={() => setdashboard(prevDashboard => !prevDashboard)}
                    to="/dashboard"
                  >
                    <i className="fas fa-file-upload me-2"></i>
                    {t("Assets")}
                  </Link>
                </li>

                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle arrow-none"
                    onClick={() => setOrder(prevOrder => !prevOrder)}
                    to="/build"
                  >
                    <i className="mdi mdi-tools me-2"></i>
                    {t("Build")}
                  </Link>
                </li>

                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle arrow-none"
                    onClick={() => setPreview(prevPreview => !prevPreview)}
                    to="/preview"
                  >
                    <i className="mdi mdi-eye-outline me-2"></i>
                    {t("Preview")}
                  </Link>
                </li>

                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle arrow-none"
                    onClick={() => setPublish(prevPublish => !prevPublish)}
                    to="/publish"
                  >
                    <i className="bx bx-comment-check me-2"></i>
                    {t("Publish")}
                  </Link>
                </li>
              </ul>

              <ul className="navbar-nav">
                <li className="nav-item dropdown">
                    <Link
                      to="/more"
                      onClick={e => {
                        e.preventDefault()
                        setapp(!app)
                      }}
                      className="nav-link dropdown-togglez arrow-none navbar-dropdown-item"
                    >
                      {/* <i className="bx bx-dots-horizontal-rounded me-2"></i> */}
                      {t("More")}
                      <div className="arrow-down"></div>
                    </Link>
                    <div className={classname("dropdown-menu dropdown-menu-end", { show: app })}>
                      <Link
                        to="/info"
                        onClick={e => {
                          setInfo(true)
                          setapp(false)
                        }}
                        className="dropdown-item navbar-dropdown-item"
                      >
                        {/* Info Icon */}
                        <i className="bx bx-info-circle me-2"></i>
                        {t("App Info")}
                      </Link>
                      <DropdownItem divider />
                      {/* External Links: */}
                      <a
                        href="https://solsurfer.xyz"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="dropdown-item navbar-dropdown-item"
                      >
                        {/* Info Icon */}
                        <i className="bx bx-link me-2"></i>
                        {t("Website")}
                      </a>
                      <a
                        href="https://app.solsurfer.xyz"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="dropdown-item navbar-dropdown-item"
                      >
                        {/* Info Icon */}
                        <i className="bx bx-link me-2"></i>
                        {t("Marketplace")}
                      </a>
                      <DropdownItem divider />
                      <a
                        href="https://twitter.com/solsurfer_xyz"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="dropdown-item navbar-dropdown-item"
                      >
                        {/* Info Icon */}
                        <i className="bx bxl-twitter me-2"></i>
                        {t("Twitter")}
                      </a>
                      <a
                        href="https://github.com/sol-surfer-nft"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="dropdown-item navbar-dropdown-item"
                      >
                        {/* Info Icon */}
                        <i className="bx bxl-github me-2"></i>
                        {t("GitHub")}
                      </a>
                    </div>
                  </li>
                </ul>
            </Collapse>
          </nav>
        </div>
      </div>
    </React.Fragment>
  )
}

Navbar.propTypes = {
  leftMenu: PropTypes.any,
  location: PropTypes.any,
  menuOpen: PropTypes.any,
  t: PropTypes.any,
}

const mapStatetoProps = state => {
  const { leftMenu } = state.Layout
  return { leftMenu }
}

export default withRouter(
  connect(mapStatetoProps, {})((Navbar))
)
