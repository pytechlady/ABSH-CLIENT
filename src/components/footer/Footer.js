import React from 'react'
import Logo from '../../assets/images/Logo.png'

const Footer = () => {
  return (
    <footer className="text-center text-lg-start mt-4">
  <div className="container p-5">
    <div className="row">
      <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
        <img src={Logo} alt="footer-logo" className='mb-3'/>
        <div className="divider mb-3"></div>

        <p>
        Healthcare with Heart: Nurturing Wellness in a Safe and Caring Environment.
        </p>
      </div>

      <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
        <h5 className="text-uppercase">Quick Links</h5>

        <ul className="list-unstyled mb-0">
          <li>
            <a href="#!" >Our Team</a>
          </li>
          <li>
            <a href="#!" >About</a>
          </li>
          <li>
            <a href="#!" >Contact</a>
          </li>
          <li>
            <a href="#!" >Blog</a>
          </li>
          <li>
            <a href="#!" >FAQ</a>
          </li>
          <li>
            <a href="#!" >Terms & Conditions</a>
          </li>
        </ul>
      </div>
      <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
        <h5 className="text-uppercase mb-0">Our Socials</h5>

        <ul className="list-unstyled">
          <li>
            <a href="#!">Instagram</a>
          </li>
          <li>
            <a href="#!">Facebook</a>
          </li>
          <li>
            <a href="#!">TikTok</a>
          </li>
          <li>
            <a href="#!">Twitter</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div className="text-center p-3" style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}>
    © 2023 Copyright:
    <a  href="/">ABSH.COM</a>
  </div>
</footer>
  )
}

export default Footer