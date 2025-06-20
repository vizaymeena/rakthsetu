// function gets call on every refresh
  async function getStateCity (lat,lon){
   try{
       let res = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)

       let address = res.data.address
       let state = address.state
       let city = address.city || address.town || address.village

       setform(prev=> ({
        ...prev,
        state:state||'',
        city: city ||''
       }))
   }
   catch(error){
        console.log("Error while reverse geocoding",error)
      }
  }

// Runs on every refresh
  useEffect(()=>{
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(
        (pos)=>{
          let lat = pos.coords.latitude
          let lon = pos.coords.longitude
          console.log(`The latitude is : ${lat} and longitude is : ${lon}`)

          getStateCity(lat,lon)
        },
        (error) => console.log("geolocation error , user denied to access location")
      )
    }
  },[])