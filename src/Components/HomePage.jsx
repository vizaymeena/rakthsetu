import { useEffect,useState } from 'react';

import image1 from '../assets/images/homepageImages/pexels-artempodrez-6823619.jpg';
import searchBlood from '../assets/images/homepageImages/searchblood.jpg'
import bloodbank from '../assets/images/homepageImages/bloodbak.webp'
import donationcamp from '../assets/images/homepageImages/donationcamp.jpg'
import '../assets/styles/landingPage.css'


let Wallpaper=()=>{
    
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




import { bloodCompatibility } from '../data/staticData';
let LearnAboutBlood=()=>{

  let[selectedType,setSelect] = useState('')

  let bloodTypes = Object.keys(bloodCompatibility)
  let receiveFrom = selectedType ? bloodCompatibility[selectedType].receive : [] 
  let donateTo = selectedType ? bloodCompatibility[selectedType].donate : []
  
  
  
    return (
    <section className='bloodMainSection'>
      <h2 className="sectionTitle">Select Your Blood Type</h2>

      <div className='bloodTypeSelector'>
        {bloodTypes.map((type, i) => (
          <span
            key={i}
            className={`bloodTypeItem ${selectedType === type ? 'active' : ''}`}
            onClick={() => setSelect(type)}
          >
            {type}
          </span>
        ))}
      </div>

      {selectedType && (
        <div className="resultContainer">
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

    
    
}


let BloodDonationSteps = () => {
  return (
    <div className="donationSteps">
      <h2 className="stepsTitle">Blood Donation Procedure</h2>
      <div className="stepsContainer">
        
        <div className="stepCard">
          <div className="stepIcon">📝</div>
          <h3 className="stepTitle">Registration</h3>
          <p className="step-desc">Provide basic information and complete a quick form.</p>
        </div>

        <div className="stepArrow">→</div>

        <div className="stepCard">
          <div className="stepIcon">🩺</div>
          <h3 className="stepTitle">Medical Checkup</h3>
          <p className="stepDesc">Get your vitals and eligibility checked by a medical professional.</p>
        </div>

        <div className="stepArrow">→</div>

        <div className="stepCard">
          <div className="stepIcon">💉</div>
          <h3 className="stepTitle">Donation Day</h3>
          <p className="stepDesc">Comfortably donate blood and help save lives.</p>
        </div>

      </div>
    </div>
  )
}

export {Wallpaper,LearnAboutBlood,BloodDonationSteps}




