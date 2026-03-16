import React, { useEffect, useState } from 'react'
import UserCarCards from '../Components/UserCarCards'
import { viewAllCarAPI } from '../Services/AllAPI'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


function AllCars() {
    const [carDetails, setCarDetails] = useState([])
    console.log(carDetails);
    const [search, setSearch] = useState("")

    const navigate = useNavigate()





    const getAllCar = async () => {

        const token = sessionStorage.getItem('token')
        console.log(token);

        if (token) {
            try {

                const result = await viewAllCarAPI(search)
                console.log(result.data);
                if (result.status == 200) {
                    setCarDetails(result.data)

                }
            } catch (err) {
                console.log(err);

            }
        }
        else {
            navigate('/login')

        }


    }
    useEffect(() => {

        getAllCar()
    }, [search])





    return (
        <>

            <div className='container'>
                <div className='d-flex justify-content-center mt-4'>
                    <input onChange={(e) => { setSearch(e.target.value) }} placeholder='Search by car name' className='form-control w-50' type="search" name="" id="" />
                </div>
                <div className='container ms-5'>
                    <UserCarCards carDetails={carDetails} />
                </div>

            </div>



        </>
    )
}

export default AllCars