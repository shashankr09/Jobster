import React, { useEffect, useState } from "react";
import { getData } from "../api/apiHandler";
import { FaBriefcase } from 'react-icons/fa';

function Dashboard() {
    const [response, setResponse] = useState([]);

    useEffect(() => {
        getData('/job/stats')
            .then((res) => {
                setResponse(res.data);
            })
    }, [])

    return (
        <>
        {
            response.length>0?
            <div className="dashboard-stats">
        {
             response.map((item, index) => {
                return (
                    <>
                        <article>
                            <header>
                                <span>{item.totalCount}</span>
                                <span><FaBriefcase /></span>

                            </header>
                            <h2>{item._id.toUpperCase()}</h2>
                        </article>
                    </>
                )
            })

        }
               
           
        </div>
        :<h3 style={{textAlign:'center'}}>No Jobs Found</h3>
        

    }
        </>
    
    )
}

export default Dashboard;