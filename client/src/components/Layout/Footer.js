import React from "react";
import "./Footer.css";
import { Row, Col } from "react-bootstrap";
import { BiPhone } from "react-icons/bi";
import { AiOutlineInstagram } from "react-icons/ai";
import { FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { CgFacebook } from "react-icons/cg";
import { TbMail } from "react-icons/tb";

const Footer = () => {
  return (
    <div className="footer">
      <h4 className="text-center">All Right Reserved &copy; ShoeShop </h4>
      <Row className="justify-content-md-center" md={4}>
        <Col>
          <h6>About</h6>
          <p>Here is about the company details shared to you.</p>
        </Col>
        <Col>
          <h6>Contact</h6>
          <p>
            <TbMail size={18} /> shoeshoporg@gmail.com
          </p>
          <p>
            <BiPhone /> +91 805037791
          </p>
        </Col>
        <Col>
          <h6>Privacy Policy</h6>
        </Col>
      </Row>
      <hr />
      <div className="footerIcon">
        <div>
          <CgFacebook size={17} />
        </div>
        &nbsp;&nbsp;
        <div>
          <FaTwitter />
        </div>
        &nbsp;&nbsp;
        <div>
          <AiOutlineInstagram size={17} />
        </div>
        &nbsp;&nbsp;
        <div>
          <FaLinkedinIn />
        </div>
      </div>
    </div>
  );
};
export default Footer;
