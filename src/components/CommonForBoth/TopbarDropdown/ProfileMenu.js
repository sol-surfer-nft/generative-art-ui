import React, { useState, useEffect } from "react"
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap"
import styled from "styled-components"

// Redux
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { Identicon } from "../../Identicon"
import { useWallet } from "@solana/wallet-adapter-react"
import { getCurrentUser, logoutUser } from "../../../utils/authentication"
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui"
import { shortenAddress } from "../../../utils/utils"

const StyledProfileMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 10;
  padding-right: 10;

  .profile-inner {
    display: flex;
    align-items: center;
  }

  .identicon-container {
    display: flex;
    align-items: center;
    cursor: pointer;

    .wallet-key {
      display: flex;
      align-items: center;
      flex: 1;
      padding: 0.1rem 0.5rem 0.1rem 0.7rem;
      margin-left: 0.3rem;
      border-radius: 0.5rem;
    }
  }
`

const ProfileMenu = props => {
  const { t } = useTranslation()
  const walletContext = useWallet()

  const [menu, setMenu] = useState(false)

  // Change to address
  const [username, setusername] = useState("User")

  useEffect(() => {
    // console.log("wallet info:", walletContext)
  }, [walletContext])

  const {
    connected,
    wallet,
    signTransaction,
    sendTransaction,
    signAllTransactions,
    publicKey,
  } = walletContext

  return (
    // Connect
    <StyledProfileMenu>
      <div className="profile-inner">
        {!connected && <WalletMultiButton />}
        {connected && (
          <Dropdown
            isOpen={menu}
            toggle={() => setMenu(!menu)}
            className="d-inline-block"
          >
            <DropdownToggle
              className="btn header-item"
              id="page-header-user-dropdown"
              tag="button"
            >
              <div className="identicon-container">
                <div className="wallet-key">
                  <Identicon address={publicKey.toBase58()} />
                  <p style={{ marginBottom: 0, marginLeft: 4 }}>
                    {shortenAddress(`${publicKey}`)}
                  </p>
                </div>
                <i className="mdi mdi-chevron-down me-2" />
              </div>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end">
              <DropdownItem tag="a" href="/profile">
                {" "}
                <i className="bx bx-user font-size-16 align-middle me-1" />
                {t("Profile")}{" "}
              </DropdownItem>
              <DropdownItem tag="a" href="/crypto-wallet">
                <i className="bx bx-wallet font-size-16 align-middle me-1" />
                {t("My Wallet")}
              </DropdownItem>
              <DropdownItem tag="a" href="#">
                <span className="badge bg-success float-end">11</span>
                <i className="bx bx-wrench font-size-16 align-middle me-1" />
                {t("Settings")}
              </DropdownItem>
              <div className="dropdown-divider" />
              <DropdownItem className="dropdown-item" onClick={logoutUser}>
                <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />
                <span>{t("Disconnect")}</span>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}
        {/* {wallet && <WalletDisconnectButton startIcon={<i className="mdi mdi-close-thick me-2" />} style={{ marginLeft: 8 }} />} */}
      </div>
    </StyledProfileMenu>
  )
  // return (
  //   <React.Fragment>
  //     <Dropdown
  //       isOpen={menu}
  //       toggle={() => setMenu(!menu)}
  //       className="d-inline-block"
  //     >
  //       <DropdownToggle
  //         className="btn header-item "
  //         id="page-header-user-dropdown"
  //         tag="button"
  //       >
  //         <Identicon address={publicKey.toBase58()}  />
  //         {/* <img
  //           className="rounded-circle header-profile-user"
  //           src={user1}
  //           alt="Header Avatar"
  //         /> */}
  //         <span className="d-none d-xl-inline-block ms-2 me-1">{username}</span>
  //         <i className="mdi mdi-chevron-down d-none d-xl-inline-block"/>
  //       </DropdownToggle>
  //       <DropdownMenu className="dropdown-menu-end">
  //         <DropdownItem tag="a" href="/profile">
  //           {" "}
  //           <i className="bx bx-user font-size-16 align-middle me-1"/>
  //           {t("Profile")}{" "}
  //         </DropdownItem>
  //         <DropdownItem tag="a" href="/crypto-wallet">
  //           <i className="bx bx-wallet font-size-16 align-middle me-1"/>
  //           {t("My Wallet")}
  //         </DropdownItem>
  //         <DropdownItem tag="a" href="#">
  //           <span className="badge bg-success float-end">11</span>
  //           <i className="bx bx-wrench font-size-16 align-middle me-1"/>
  //           {t("Settings")}
  //         </DropdownItem>
  //         <DropdownItem tag="a" href="auth-lock-screen">
  //           <i className="bx bx-lock-open font-size-16 align-middle me-1"/>
  //           {t("Lock screen")}
  //         </DropdownItem>
  //         <div className="dropdown-divider"/>
  //         <Link to="/logout" className="dropdown-item">
  //           <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger"/>
  //           <span>{t("Logout")}</span>
  //         </Link>
  //       </DropdownMenu>
  //     </Dropdown>
  //   </React.Fragment>
  // )
}

export default ProfileMenu
