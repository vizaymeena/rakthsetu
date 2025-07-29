import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AOS from "aos"
import 'aos/dist/aos.css';

import image1 from '../assets/images/homepageImages/pexels-artempodrez-6823619.jpg';
import searchBlood from '../assets/images/homepageImages/searchblood.jpg';
import bloodbank from '../assets/images/homepageImages/bloodbak.webp';
import donationcamp from '../assets/images/homepageImages/donationcamp.jpg';

import '../assets/styles/homePageHero.css';
import { bloodCompatibility } from '../data/staticdata';



export let Wallpaper = () => {
  useEffect(() => {
  AOS.init({ duration: 1000, once: true });
}, []);
  return (
    <>
      <div className='wallpaperDiv' data-aos="fade-up">
        <img src={image1} alt="" />
        <div className='positionAbs'>
          <p>
            Every 2 seconds, someone in India needs blood...
          </p>
        </div>
        <div className='clientActions'>
          <button className='request_button' data-aos="zoom-in" data-aos-delay="300">Request Blood</button>
          <Link to='/Donate' className='donor_button' data-aos="zoom-in" data-aos-delay="500">Become Donor</Link>
        </div>
        <div className='scrollIndicator'>▼</div>
      </div>

      <div style={{ height: '60vh', background: '#f5f5f5' }} data-aos="fade-up">
        <h2 style={{ padding: '2rem', textAlign: 'center' }}>Our Services</h2>
        <div className='servicesClass'>
          <div className='service' data-aos="zoom-in-up" data-aos-delay="100">
            <img src={searchBlood} alt="" />
            <h4>Blood Availibility</h4>
          </div>
          <div className='service' data-aos="zoom-in-up" data-aos-delay="200">
            <img src={bloodbank} alt="" />
            <h4>Nearest Blood Bank</h4>
          </div>
          <div className='service' data-aos="zoom-in-up" data-aos-delay="300">
            <img src={donationcamp} alt="" />
            <h4>Blood Donation Camp</h4>
          </div>
        </div>
      </div>
    </>
  );
};



export let LearnAboutBlood = () => {
  let [selectedType, setSelect] = useState('');

  let bloodTypes = Object.keys(bloodCompatibility);
  let receiveFrom = selectedType ? bloodCompatibility[selectedType].receive : [];
  let donateTo = selectedType ? bloodCompatibility[selectedType].donate : [];

  useEffect(() => {
  AOS.init({ duration: 1000, once: true });
}, []);

  return (
    <section className='bloodMainSection' data-aos="fade-up">
      <h2 className="sectionTitle">Select Your Blood Type</h2>

      <div className='bloodTypeSelector'>
        {bloodTypes.map((type, i) => (
          <span
            key={i}
            className={`bloodTypeItem ${selectedType === type ? 'active' : ''}`}
            onClick={() => setSelect(type)}
            data-aos="fade-right"
            data-aos-delay={i * 100}
          >
            {type}
          </span>
        ))}
      </div>

      {selectedType && (
        <div className="resultContainer" data-aos="fade-up">
          <div className='resultBox'>
            <h4>🩸 You can receive from:</h4>
            <div className='bloodTypeGroup'>
              {receiveFrom.map((type, i) => (
                <span className="bloodTypeResult" key={i}>{type}</span>
              ))}
            </div>
          </div>

          <div className='resultBox'>
            <h4>💉 You can donate to:</h4>
            <div className='bloodTypeGroup'>
              {donateTo.map((type, i) => (
                <span className="bloodTypeResult" key={i}>{type}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};



export let BloodDonationSteps = () => {
  useEffect(() => {
  AOS.init({ duration: 1000, once: true });
}, []);
  return (
    <div className="donationSteps" data-aos="fade-up">
      <h2 className="stepsTitle">Blood Donation Procedure</h2>
      <div className="stepsContainer">
        <div className="stepCard" data-aos="zoom-in" data-aos-delay="100">
          <div className="stepIcon">📝</div>
          <h3 className="stepTitle">Registration</h3>
          <p className="step-desc">Provide basic information and complete a quick form.</p>
        </div>

        <div className="stepArrow">→</div>

        <div className="stepCard" data-aos="zoom-in" data-aos-delay="300">
          <div className="stepIcon">🩺</div>
          <h3 className="stepTitle">Medical Checkup</h3>
          <p className="stepDesc">Get your vitals and eligibility checked by a medical professional.</p>
        </div>

        <div className="stepArrow">→</div>

        <div className="stepCard" data-aos="zoom-in" data-aos-delay="500">
          <div className="stepIcon">💉</div>
          <h3 className="stepTitle">Donation Day</h3>
          <p className="stepDesc">Comfortably donate blood and help save lives.</p>
        </div>
      </div>
    </div>
  );
};
