import React, { useEffect, useState } from 'react'
import { addBookingAPI, viewBookedDateAPI } from '../Services/AllAPI';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


function Checkout() {
    const navigate = useNavigate()

    const [carInfo, setCarInfo] = useState(JSON.parse(sessionStorage.getItem('CarInfo')))
    console.log(carInfo);

    const [userInfo, setUserInfo] = useState(JSON.parse(sessionStorage.getItem('user')))
    console.log(userInfo);

    const [bookedRanges, setBookedRanges] = useState([]);
    const [blockedDates, setBlockedDates] = useState(new Set());


    const [bookingDetails, setBookingDetails] = useState({ ...carInfo, ...userInfo, address: "", StartDate: "", EndDate: "", userId: userInfo._id })
    console.log(bookingDetails);
    const [days, setDays] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);


    const { RegNo, CarName, name, phoneNo, email, address, StartDate, EndDate, userId } = bookingDetails




    const addBooking = async () => {
        if (RegNo && CarName && name && phoneNo && email && address && StartDate && EndDate) {
            try {
                const result = await addBookingAPI(bookingDetails)
                console.log(result);
                if (result.status == 200) {
                    toast.success("Car Booked Successfully , A Confirmation Email Will Be Sent To The Registered Email")
                    navigate('/')

                }
                else if (result.status == 403) {
                    toast.error(result.response.data)
                    navigate('/all-cars')
                }


            }
            catch (err) {
                console.log(err);

            }
        }
        else {
            toast.warning("Please Fill The Form")

        }
    }



    const getBookedDate = async () => {
        try {
            const result = await viewBookedDateAPI(RegNo);
            if (result.status === 200) {
                setBookedRanges(result.data);

                // Flatten date ranges into individual dates
                const blocked = new Set();
                result.data.forEach(({ StartDate, EndDate }) => {
                    let current = new Date(StartDate);
                    const end = new Date(EndDate);
                    while (current <= end) {
                        blocked.add(current.toISOString().split("T")[0]);
                        current.setDate(current.getDate() + 1);
                    }
                });
                setBlockedDates(blocked);
            }
        } catch (err) {
            console.log("Error fetching booked dates:", err);
        }
    };


    useEffect(() => {
        getBookedDate()
    }, [RegNo])

    useEffect(() => {
        const { StartDate, EndDate } = bookingDetails;
        if (StartDate && EndDate) {
            const start = new Date(StartDate);
            const end = new Date(EndDate);
            const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
            if (diff > 0) {
                setDays(diff);
                setTotalPrice(diff * carInfo.Price);
            } else {
                setDays(0);
                setTotalPrice(0);
            }
        }
    }, [bookingDetails.StartDate, bookingDetails.EndDate]);




















    return (
        <>
            <div className='container'>
                <div className='row my-5'>
                    <div className="col-lg-6 my-3">
                        <h1 className='text-decoration-underline ms-5'>Car Information</h1>
                        <p>Car Name : <input className='form-control' value={carInfo.CarName} disabled type="text" name="" id="" /></p>
                        <p>Registration Number : <input className='form-control' value={carInfo.RegNo} disabled type="text" name="" id="" /></p>
                        <p>Price / Day : <input className='form-control' value={carInfo.Price} disabled type="text" name="" id="" /></p>
                        <p>Total Price : <input className='form-control' value={totalPrice} disabled type="text" name="" id="" /></p>








                    </div>
                    <div className="col-lg-6">
                        <h3>User Information</h3>
                        <input disabled value={userInfo.name} className='form-control mt-3' placeholder='Name' type="text" name="" id="" />
                        <input disabled value={userInfo.email} className='form-control mt-3' placeholder='Email' type="text" name="" id="" />
                        <input disabled value={userInfo.phoneNo} className='form-control mt-3' placeholder='Phone Number' type="text" name="" id="" />
                        <input value={bookingDetails.address} onChange={(e) => setBookingDetails({ ...bookingDetails, address: e.target.value })} className='form-control mt-3' placeholder='Address' type="text" name="" id="" />
                        <h3 className='mt-3'>Start Date</h3>
                        <input
                            type="date"
                            className="form-control"
                            name=""
                            id=""
                            value={bookingDetails.StartDate}
                            min={new Date().toISOString().split("T")[0]}
                            onKeyDown={(e) => e.preventDefault()}
                            onInput={(e) => {
                                if (blockedDates.has(e.target.value)) {
                                    toast.error("This date is already booked");
                                    e.target.value = "";
                                }
                            }}
                            onChange={(e) => setBookingDetails({ ...bookingDetails, StartDate: e.target.value })}
                        />
                        <h3 className='mt-3'>End Date : </h3>
                        <input
                            type="date"
                            className="form-control"
                            name=""
                            id=""
                            value={bookingDetails.EndDate}
                            min={bookingDetails.StartDate} // ensures EndDate is after StartDate
                            onKeyDown={(e) => e.preventDefault()}
                            onInput={(e) => {
                                if (blockedDates.has(e.target.value)) {
                                    toast.error("This date is already booked");
                                    e.target.value = "";
                                }
                            }}
                            onChange={(e) => setBookingDetails({ ...bookingDetails, EndDate: e.target.value })}
                        />
                    </div>

                </div>

                <div className='d-flex justify-content-center align-items-center mt-4'>
                    <button onClick={addBooking} className='btn btn-primary'>Confirm Booking</button>
                </div>


            </div>
        </>
    )
}

export default Checkout