// Registration form
export let stateCityData = [
  { state: "Madhya Pradesh", cities: ["Bhopal", "Indore", "Jabalpur", "Gwalior", "Ujjain"] },
  { state: "Maharashtra", cities: ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad"] },
  { state: "Uttar Pradesh", cities: ["Lucknow", "Kanpur", "Varanasi", "Agra", "Prayagraj"] },
  { state: "Rajasthan", cities: ["Jaipur", "Udaipur", "Jodhpur", "Ajmer", "Kota"] },
  { state: "Tamil Nadu", cities: ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem"] },
  { state: "Karnataka", cities: ["Bengaluru", "Mysuru", "Hubli", "Mangalore", "Belgaum"] },
  { state: "Gujarat", cities: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar"] },
  { state: "West Bengal", cities: ["Kolkata", "Asansol", "Siliguri", "Durgapur", "Howrah"] },
  { state: "Bihar", cities: ["Patna", "Gaya", "Muzaffarpur", "Bhagalpur", "Darbhanga"] },
  { state: "Punjab", cities: ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda"] }
];


// Homepage

export let bloodCompatibility = {
  'A+': {
    receive: ['A+', 'A-', 'O+', 'O-'],
    donate: ['A+', 'AB+']
  },

  'O+': {
    receive: ['O+', 'O-'],
    donate: ['O+', 'A+', 'B+', 'AB+']
  },

  'B+': {
    receive: ['B+', 'B-', 'O+', 'O-'],
    donate: ['B+', 'AB+']
  },

  'AB+': {
    receive: ['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-'],
    donate: ['AB+']
  },

  'A-': {
    receive: ['A-', 'O-'],
    donate: ['A+', 'A-', 'AB+', 'AB-']
  },

  'O-': {
    receive: ['O-'],
    donate: ['Anyone']
  },

  'B-': {
    receive: ['B-', 'O-'],
    donate: ['B+', 'B-', 'AB+', 'AB-']
  },

  'AB-': {
    receive: ['A-', 'B-', 'AB-', 'O-'],
    donate: ['AB+', 'AB-']
  }
}

