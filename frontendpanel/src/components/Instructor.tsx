import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Instructor = () => {


    const [user, setUser] = useState<any>([])

    useEffect(() => {
        const data = async () => {
            try {
                const data = await axios.get('http://localhost:8080/allUser')
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


            <p>{user.map((el: any) => (
                <>
                    <div>
                        <a href={`Detail/${el._id}`} >
                            <div>
                                Name :- {el.Name}
                            </div>
                            <div className='flex '>
                                Date :- {el.Date ? (
                                    <div>
                                        {el.Date}
                                    </div>
                                ) : (
                                    <div>Not assigned</div>
                                )}
                            </div>
                        </a>
                    </div>
                </>
            ))}</p>
        </div>
    )
}

export default Instructor
