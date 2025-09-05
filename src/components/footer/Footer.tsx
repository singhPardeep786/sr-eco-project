"use client";
import React from "react";
import { Icon } from '@iconify/react';

const Footer = () => {

    const year = new Date().getFullYear();

  return (
    <>
        <div id='contact'></div>
        <section className="w-full mt-8">
        <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7619.393593178645!2d78.53933274893623!3d17.281897805226347!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcba3c5d0a32dc9%3A0x70e18b6d9be4713c!2sSR%20GROUP!5e0!3m2!1sen!2sus!4v1756724798910!5m2!1sen!2sus"
        width={"100%"}
        height={450}
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        </section>
        <footer className="w-full bg-gradient-to-r from-[var(--maincolor2)] to-[var(--maincolor)] footer py-8 text-white text-center">
            <section className="wrapper">
                <div className="md:flex">
                    <div className="w-full md:1/2">
                        <div className="footer_part">
                            <h3>CORPORATE ADDRESS -</h3>
                            <p className="mt-4">H.No.9, Vijayalaxmi Nagar | Near MVSR Engineering College | Nadargul Village(V), Balapur Mandal(M) | Ranga Reddy(D), Telangana–501510.</p>
                            {/* <p>Near MVSR Engineering College,</p>
                            <p>Nadargul Village(V), Balapur Mandal(M),</p>
                            <p>Ranga Reddy(D), Telangana–501510.</p> */}
                        </div>
                    </div>
                    <div className="w-full md:1/2 mt-4 md:mt-0">
                        <div className="footer_part md:ms-5">
                            <h3 className="uppercase">Connect -</h3>
                            <a href="mailto: Srprojects.contact@gmail.com" className="mt-4 email">Srprojects.contact@gmail.com</a>
                            {/* <div className="footer_icons flex gap-2 mt-3">
                                <a href="https://www.facebook.com/people/SR-Projects/61560460591510/" target="_blank" className="footer_icon"><Icon icon="ri:facebook-fill"  /></a>
                                <a href="https://www.instagram.com/srprojects.in/" target="_blank" className="footer_icon"><Icon icon="ri:instagram-line"  /></a>
                                <a href="https://www.youtube.com/@srprojectsindia" target="_blank" className="footer_icon"><Icon icon="iconoir:youtube"  /></a>
                            </div> */}
                        </div>
                    </div>
                    <div className="w-full md:1/2 mt-4 md:mt-0">
                        <div className="footer_part">
                        {/* <h3 className="uppercase">Locate Us -</h3>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d578436.7077557492!2d78.537683!3d17.282616!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcba3c5d0a32dc9%3A0x70e18b6d9be4713c!2sSR%20GROUP!5e1!3m2!1sen!2sus!4v1756722717352!5m2!1sen!2sus"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe> */}
                            <h3 className="uppercase">Social -</h3>
                            <div className="footer_icons flex gap-2 mt-3 justify-center">
                                <a href="https://www.facebook.com/people/SR-Projects/61560460591510/" target="_blank" className="footer_icon"><Icon icon="ri:facebook-fill"  /></a>
                                <a href="https://www.instagram.com/srprojects.in/" target="_blank" className="footer_icon"><Icon icon="ri:instagram-line"  /></a>
                                <a href="https://www.youtube.com/@srprojectsindia" target="_blank" className="footer_icon"><Icon icon="iconoir:youtube"  /></a>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="w-full mt-4">
                    <div className="copyright text-center">
                        <p className="mt-3">&copy; <span id="year">{year}</span> <span className="medium"> SR PROJECTS</span>. All Rights Reserved</p>
                    </div>
                </div>
            </section>
        </footer>
    </>
  );
};

export default Footer;
