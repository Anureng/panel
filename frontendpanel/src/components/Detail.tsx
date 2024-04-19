import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
const Detail = () => {

    const [user, setUser] = useState<any>()
    const { id } = useParams();
    useEffect(() => {
        const data = async () => {
            try {
                const data = await axios.get(`http://localhost:8080/GetUser/${id}`)
                setUser(data.data)
            } catch (error) {
                console.log(error);
            }
        }
        data()
    }, [])

    console.log(user);

    return (
        <div>

            <div>{user?.Name}</div>
            <div>{user?.Date}</div>

        </div>
    )
}

export default Detail
