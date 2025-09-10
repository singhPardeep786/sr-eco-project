"use client"
import React from 'react'

const About = () => {

    const projects = [
        {
            img:"/images/ongoing_projects/sree_city.jpg",
            logo: "/images/ongoing_projects/sree_city_logo.png",
            location: "Location: Agapally, Hyderabad",
            area: (
                <>
                     Area: <strong> 31</strong> Acres
                </>
            ),
            type: (
                <>
                    Type: Residential Plots | Units: <strong> 456</strong>
                </>
            ),
            plot: (
                <>
                    Plot Configurations: <strong> 1350 - 3600</strong> Sft.
                </>
            )
        },
        {
            img:"/images/ongoing_projects/rock_town.jpg",
            logo: "/images/ongoing_projects/rock_town_logo.png",
            location: "Location: Mazidpur, Hyderabad",
            area: (
                <>
                    Area: <strong>120</strong> Acres
                </>
            ),
            type: (
                <>
                    Type: Residential Plots | Units: <strong> 622</strong>
                </>
            ),
            plot: (
                <>
                    Plot Configurations:<strong>1350 - 3402</strong> Sft. 
                </>
            )
        },
        {
            img:"/images/ongoing_projects/sr_serinity.jpg",
            logo: "/images/ongoing_projects/sr_serinity_logo.png",
            location: "Location: Nadergul, Hyderabad",
            area: (
                <>
                    Area: <strong> 18,712</strong> sq. yds
                </>
            ),
            type: (
                <>
                    Type: Premium Villa Plots | Units: <strong> 86</strong>
                </>
            ),
            plot: (
                <>
                    Plot Configurations: <strong>152</strong> – <strong>413</strong> Sq. yds.
                </>
            )
        },
        {
            img:"/images/ongoing_projects/sr_aero_villas.jpg",
            logo: "/images/ongoing_projects/aero_villas_logo.png",
            location: "Location: Nadargul, Hyderabad",
            area: (
                <>
                    Area: <strong>21</strong> Acres
                </>
            ),
            type: (
                <>
                    Type: Residential Plots | Units: <strong>456</strong>
                </>
            ),
            plot: (
                <>
                    Plot Configurations: <strong>1350 - 4203</strong> Sft.
                </>
            )
        },
    ]
    
  return (
    <>
        <div id='about'></div>
        <section className='wrapper'>
            <h2 className='section_heading text-center mt-8'>about us</h2>
            <div className="heading-divider" />
            <div className='w-full md:flex items-center justify-center'>
                <div className='w-full md:w-1/2'>
                    <div className="about mx-auto">
                        <div className="about_logo">
                            <img src="/images/logo1.png" className='w-full h-full' alt="sr eco park about logo" />
                        </div>
                        <p>SR Projects SR Projects is committed to maintaining the highest standards of quality, credibility, and reputation. This commitment drives our enthusiasm for creating outstanding residential plots for individual homes, villas, and apartments</p>
                        <p>We recognize that modern home buyers have distinct objectives influenced by their unique lifestyles. With our extensive experience in property development, we continually aim to fulfill their expectations by offering a diverse range of open plots, weekend villas, villa communities, and apartments. Everything we undertake is guided by a value-driven philosophy, which remains the cornerstone of our success!</p>
                        <a href="https://srprojects.in/" target='_blank' className='explore_more inline-block mt-5'>explore more</a>
                    </div>
                </div>
                <div className='w-full md:w-1/2'>
                    <div className="about_img rounded-xl overflow-hidden">
                        <img src="/images/about_img.jpg" className='w-full h-full' alt="about image" />
                    </div>
                </div>
            </div>

            <h3 className='capitalize mt-8 text-[1.7rem] md:text-[2.3rem] text-[var(--blue)] transition-all duration-500'>Featured projects</h3>
            <div className="animated_line mb-5"></div>
            <div className='w-full h-full flex items-center justify-start gap-3 ongoing_projects_main overflow-x-auto transition-all duration-500 z-[2]'>
                    {projects.map((elem, idx) =>
                        <div key={idx} className="ongoing_project text-center transition-all duration-500">
                            <div className="project_img">
                                <img src={elem.img} className='w-full h-full transition-all duration-500 object-cover' alt="Ongoing Projects" />
                            </div>
                                <div className="project_logo">
                                    <img src={elem.logo} className='w-full h-full transition-all duration-500 mt-2' alt="Ongoing Project Logo" />
                                </div>
                                <div className='mt-2'>
                                    <p>{elem.location}</p>
                                    <p>{elem.area}</p>
                                    <p>{elem.type}</p>
                                    <p>{elem.plot}</p>
                                </div>
                        </div>
                    )}
            </div>
        </section>
    </ >
  )
}

export default About