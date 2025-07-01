import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import '../assets/styles/adminfilter.css'

export const FilterPage = () => {
  const { category, filterType } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log(filterType)
    axios.get(`http://localhost:3000/users`)
      .then((res) => setData(res.data));
  }, [filterType]);

 


  return (
    <>
    {filterType == 'showAllUser' && 
    <div className="filter_allUsers">
        <h2>{category} filter by {filterType}</h2>

        <table className="userTable">
            <thead className="userThead">
                <th>Full Name</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Contact</th>
                <th>Actions</th>
            </thead>
            <tbody className="userTbody">
                 {data.map((el, idx) => (
                <tr key={el.id}>
                  <td>{el.fullName}</td>
                  <td>{el.email}</td>
                  <td>{el.gender}</td>
                  <td>{el.phone}</td>
                  <td>
                    <button>Update</button>
                    <button>Remove</button>
                  </td>
                  
                </tr>
              ))}
            </tbody>
        </table>
    
    </div>
    }
    </>
  )
}
