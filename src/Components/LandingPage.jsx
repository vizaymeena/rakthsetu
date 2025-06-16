import { useEffect,useRef } from 'react';

import image1 from '../assets/images/homepageImages/pexels-artempodrez-6823619.jpg';
import searchBlood from '../assets/images/homepageImages/searchblood.jpg'
import bloodbank from '../assets/images/homepageImages/bloodbak.webp'
import donationcamp from '../assets/images/homepageImages/donationcamp.jpg'
import '../assets/styles/landingPage.css'
import process_registration from '../assets/images/homepageImages/registration.jpg'
import process_medicalCheck from '../assets/images/homepageImages/medicalcheckup.jpg'
import process_donationDay from '../assets/images/homepageImages/donationday.jpg'

let Wallpaper=()=>{
    // const nextSectionRef = useRef(null)
    // useEffect(() => {
    //     document.body.classList.add('lock-scroll');
    //     return () => document.body.classList.remove('lock-scroll')
    // }, []);

    // let handleScrollClick = () => {
    //     document.body.classList.remove('lock-scroll');
    //     nextSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
    // }

     return(
    <>
    <div className='wallpaperDiv'>  {/* Relative */}
        <img src={image1} alt="" />
        <div className='positionAbs'>  {/* Absolute */}
            <p>
                Every 2 seconds, someone in India needs blood, yet less than 1% of the population donates regularly. 
                With over 12,000 people dying each day due to the unavailability of blood, <strong>your single donation can save up to 3 lives</strong>. 
                Be the reason someone sees tomorrow. Join our growing community of heroes—because donating blood isn't just an act of kindness, it's a lifeline. 
                Step forward, be a donor, and help turn urgency into hope.
            </p>
        </div>
        <div className='clientActions'>
            <button className='request_button'>Request Blood</button>
            <button className='donor_button'>Become Donor</button>
        </div>
        <div className='scrollIndicator'>▼</div>
    </div>

     {/* This is the section to scroll to */}
      <div style={{ height: '60vh', background: '#f5f5f5' }}>
        <h2 style={{ padding: '2rem',textAlign:'center'}}>Our Services</h2>
        <div className='servicesClass'>

            <div className='service'>
                <img src={searchBlood} alt="" />
                 <h4>Blood Availibility </h4>
            </div>
            <div className='service'>
                <img src={bloodbank} alt="" />
                <h4>Nearest Blood Bank </h4>
            </div>
            <div className='service'>
                <img src={donationcamp} alt="" />
                <h4>Blood Donation Camp</h4>
            </div>

        </div>
      </div>
    </>
   )
};
export default Wallpaper 


export let LearnAboutBlood=()=>{
    return(
        <>
        <section>
        <div className='selectBloodClass'>           
            <div className='bloodCategory'>   
                <div className='bloodGroup'>
                    <span className='selectHeading'>Select Your Blood Type</span>
                    <div className='bloodGroupInner'>
                        <span className='bloodType'>A+</span>
                        <span className='bloodType'>O+</span>
                        <span className='bloodType'>B+</span>
                        <span className='bloodType'>AB+</span>
                        <span className='bloodType'>A-</span>
                        <span className='bloodType'>O-</span>
                        <span className='bloodType'>B-</span>
                        <span className='bloodType'>AB-</span>
                    </div>
                    <div className='takeFrom'>
                         <p>You can take from</p>
                         <div>

                         </div>
                    </div>
                    <div className='giveTo'>
                         <p>You can give to</p>
                         <div>

                         </div>
                    </div>
                </div>
            </div>
        </div>
        </section>

        <section>

        <h2>How donation works?</h2>  

        <section class="step">
          <div class="text">
            <h2>1. Registration</h2>
            <p>Fill out a simple form with your personal and contact information. Ensure you carry a valid ID proof for verification.</p>
             <ul>
                <li>Providing a government-issued ID</li>
                <li>Completing a donor registration form</li>
                <li>Receiving information about the donation process</li>
            </ul>
                        
            <div class="requirements">
                <div class="requirements-title">What you'll need:</div>
                <ul>
                    <li>Valid photo ID (driver's license, passport, etc.)</li>
                    <li>List of medications you're taking</li>
                    <li>Knowledge of your travel history</li>
                </ul>
                </div>
          </div>
          <div class="image">
            <img src={process_registration} alt="Registration process" />
          </div>
        </section>

        <section class="step reverse">
          <div class="text">
            <h2>2. Medical Checkup</h2>
            <p>A quick health screening is done to ensure you're fit to donate. It includes blood pressure, hemoglobin level, and general health review.</p>
            <ul>
                <li>Review of your health history</li>
                <li>Checking your temperature, pulse, and blood pressure</li>
                <li>Testing a drop of blood to ensure you have enough iron to donate</li>
            </ul>
            <div class="requirements-title">Eligibility Requirements:</div>
            <ul>
                 <li>At least 17 years old (16 with parental consent in some states)</li>
                 <li>Weigh at least 110 pounds</li>
                 <li>In good general health</li>
            </ul>
          </div>
          <div class="image">
            <img src={process_medicalCheck} alt="Medical checkup" />
          </div>
        </section>

        <section class="step">
          <div class="text">
            <h2>3. Donation Day</h2>
            <p>Relax on a comfortable chair while our team collects your blood safely and hygienically. The process takes just 15-20 minutes.</p>
            <ul>
                <li>You'll be seated comfortably in a reclining chair</li>
                <li>A sterile needle is inserted into a vein in your arm</li>
                <li>About one pint of blood is collected</li>
            </ul>
          </div>
          <div class="image">
            <img src={process_donationDay} alt="Blood donation" />
          </div>
            
        </section>

          </section>
        </>
    )
}




