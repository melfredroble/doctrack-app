import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  MainContainer,
  LogoImg,
  SidebarLinks,
  SidebarLink,
  SidebarHeader,
  LogoText,
  Container,
  HeaderText,
} from "./styles";
import {
  FaRegBuilding,
  FaRegUser,
  FaUserShield,
  FaTachometerAlt,
  FaRegFolder,
  FaUserCog,
  FaRegFileAlt,
  FaArrowRight,
  FaArrowLeft,
  FaStop,
  FaCog,
  FaFolderOpen,
  FaRegSquare,
} from "react-icons/fa";
import logo from "../../assets/img/logo.png";

const Sidebar = () => {
  const url = useLocation();

  const user = JSON.parse(localStorage.getItem("userData"));
  const userRole = user.role;

  return (
    <>
      <MainContainer>
        <SidebarHeader>
          <LogoImg src={logo} />
          <LogoText>
            {/* <h1 style={{ textAlign: "center", color: "#2d3436" }}> */}
            <h1
              style={{
                textAlign: "center",
                color: "#ffffff",
                fontSize: "14px",
              }}
            >
              EVSU-OC DocTrack
            </h1>
          </LogoText>
        </SidebarHeader>
        {userRole === "admin" ? (
          <SidebarLinks>
            <SidebarLink>
              <Link
                to="/admin-dashboard"
                style={{
                  backgroundColor:
                    url.pathname === "/admin-dashboard" && "#1e282c",
                  color: url.pathname === "/admin-dashboard" && "#ffffff",
                }}
              >
                <FaTachometerAlt /> Dashboard
              </Link>
            </SidebarLink>
            <Container>
              <HeaderText>Manage</HeaderText>
              <SidebarLink>
                <Link
                  to="/offices"
                  style={{
                    backgroundColor: url.pathname === "/offices" && "#1e282c",
                    color: url.pathname === "/offices" && "#ffffff",
                  }}
                >
                  <FaRegBuilding /> Offices
                </Link>
              </SidebarLink>
              <SidebarLink>
                <Link
                  to="/users"
                  style={{
                    backgroundColor: url.pathname === "/users" && "#1e282c",
                    color: url.pathname === "/users" && "#ffffff",
                  }}
                >
                  <FaRegUser /> Users
                </Link>
              </SidebarLink>
              <SidebarLink>
                <Link
                  to="/type"
                  style={{
                    backgroundColor: url.pathname === "/type" && "#1e282c",
                    color: url.pathname === "/type" && "#ffffff",
                  }}
                >
                  <FaRegFileAlt /> Doc type
                </Link>
              </SidebarLink>
            </Container>
            <Container>
              <HeaderText>Settings</HeaderText>
              {/* <SidebarLink>
                          <Link to="/app-setting" style={{backgroundColor: url.pathname === '/app-setting' && '#272d3f', color: url.pathname === '/app-setting' && '#ffffff'}}> <FaCog/> App settings</Link>
                      </SidebarLink> */}
              <SidebarLink>
                <Link
                  to="/account-setting"
                  style={{
                    backgroundColor:
                      url.pathname === "/account-setting" && "#1e282c",
                    color: url.pathname === "/account-setting" && "#ffffff",
                  }}
                >
                  <FaUserCog style={{ fontSize: "32px" }} /> Account settings
                </Link>
              </SidebarLink>
              <SidebarLink>
                <Link
                  to="/security-setting"
                  style={{
                    backgroundColor:
                      url.pathname === "/security-setting" && "#1e282c",
                    color: url.pathname === "/security-setting" && "#ffffff",
                  }}
                >
                  <FaUserShield style={{ fontSize: "32px" }} /> Security
                  settings
                </Link>
              </SidebarLink>
            </Container>
          </SidebarLinks>
        ) : (
          <SidebarLinks>
            <SidebarLink>
              <Link
                to="/dashboard"
                style={{
                  backgroundColor: url.pathname === "/dashboard" && "#1e282c",
                  color: url.pathname === "/dashboard" && "#ffffff",
                }}
              >
                <FaTachometerAlt /> Dashboard
              </Link>
              <Link
                to="/my-documents"
                style={{
                  backgroundColor:
                    url.pathname === "/my-documents" && "#1e282c",
                  color: url.pathname === "/my-documents" && "#ffffff",
                }}
              >
                <FaFolderOpen /> My documents
              </Link>
              <Link
                to="/receivedDoc"
                style={{
                  backgroundColor: url.pathname === "/receivedDoc" && "#1e282c",
                  color: url.pathname === "/receivedDoc" && "#ffffff",
                }}
              >
                <FaFolderOpen /> Received documents
              </Link>
              <Link
                to="/incomingDoc"
                style={{
                  backgroundColor: url.pathname === "/incomingDoc" && "#1e282c",
                  color: url.pathname === "/incomingDoc" && "#ffffff",
                }}
              >
                <FaArrowRight /> Incoming Documents
              </Link>
              <Link
                to="/outgoingDoc"
                style={{
                  backgroundColor: url.pathname === "/outgoingDoc" && "#1e282c",
                  color: url.pathname === "/outgoingDoc" && "#ffffff",
                }}
              >
                <FaArrowLeft /> Outgoing Documents
              </Link>
              <Link
                to="/dashboard"
                style={{
                  backgroundColor: url.pathname === "/" && "#1e282c",
                  color: url.pathname === "/" && "#ffffff",
                }}
              >
                <FaStop /> Tagged as terminal
              </Link>
              <Link
                to="/dashboard"
                style={{
                  backgroundColor: url.pathname === "/" && "#1e282c",
                  color: url.pathname === "/" && "#ffffff",
                }}
              >
                <FaCog /> Account settings
              </Link>
            </SidebarLink>
          </SidebarLinks>
        )}
      </MainContainer>
      <Outlet />
    </>
  );
};

export default Sidebar;
