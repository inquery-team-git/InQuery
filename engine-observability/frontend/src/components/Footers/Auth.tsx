/*eslint-disable*/
import React from "react";
import { Nav, Row, Col, Button } from "reactstrap";
import inquerySmallLogo from "@/assets/images/brand/inquery_small_dark.png";
import BrandSmall from "@/components/Brand/small";
import Link from "next/link";

function AuthFooter() {
  return (
    <footer className="footer">
      <Row className="align-items-center justify-content-xl-between flex-column">
        <Col
          xs="6"
          className="justify-content-center"
          style={{ display: "flex" }}
        >
          <div className="copyright text-center text-xl-left text-muted">
            © {new Date().getFullYear()}{" "}
            <BrandSmall
              logo={{
                innerLink: "/",
                imgSrc: inquerySmallLogo,
                imgAlt: "Inquery Logo",
              }}
            />
          </div>
        </Col>

        <Col
          xs="6"
          className="justify-content-center flex-row"
          style={{ display: "flex" }}
        >
          <Nav className="nav-footer justify-content-center justify-content-xl-end">
            <Link
              href={"/"}
              style={{
                cursor: "pointer",
                marginLeft: "15px",
              }}
            >
              <Button
                style={{
                  textTransform: "none",
                }}
              >
                Home
              </Button>
            </Link>
            <Link
              href="https://github.com/optnio-labs/dashboard-app"
              rel="noopener noreferrer"
              target="_blank"
              style={{
                cursor: "pointer",
                marginLeft: "15px",
              }}
            >
              <Button
                style={{
                  textTransform: "none",
                }}
              >
                About Us
              </Button>
            </Link>

            <Link
              href="https://github.com/optnio-labs/dashboard-app"
              rel="noopener noreferrer"
              target="_blank"
              style={{
                cursor: "pointer",
                marginLeft: "15px",
              }}
            >
              <Button
                style={{
                  textTransform: "none",
                }}
              >
                Blog
              </Button>
            </Link>
          </Nav>
        </Col>
      </Row>
    </footer>
  );
}

export default AuthFooter;
