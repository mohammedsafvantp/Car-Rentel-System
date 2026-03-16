import React, { useContext, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getCategoryCarAPI } from '../Services/AllAPI';
import { bodyTypeContext } from '../../ContextAPI/ContextAPI';



function Category() {


    const { setBodyType } = useContext(bodyTypeContext)
    const navigate = useNavigate()



    const handleCategory = async (BodyType) => {
        const token = sessionStorage.getItem('token')
        const reqHeader = {
            'authorization': `Bearer ${token}`
        }

        if (token) {
            try {
                const result = await getCategoryCarAPI(BodyType, reqHeader)
                console.log(result);
                if (result.status == 200) {
                    setBodyType(result.data)
                    sessionStorage.setItem('BodyType', JSON.stringify(result.data))
                    navigate(`/category-cars/${BodyType}`)
                }

            }
            catch (err) {
                console.log(err);

            }
        }
        else {
            navigate('/login')
            toast.warning("Please Login to Explore")
        }

    }

    const handleAll = () => {
        const token = sessionStorage.getItem('token')
        if (token) {
            navigate('/all-cars')
        }
        else {
            toast.warning("Please Login to Explore")
            navigate('/login')

        }
    }
    useEffect(() => {
        sessionStorage.removeItem('BodyType')
    }, [])







    return (
        <>
            <div className='container text-center'>
                <div className=''>
                    <h1 className='text-center mt-3'>Choose By Body Type</h1>
                    <div className='row mt-5'>
                        <div className="col-lg-3 col-sm-12">
                            <Card className=' shadow mb-5  ' style={{ width: '17rem', height: '65vh' }}>
                                <Card.Img className='p-3' width={"250px"} height={"250px"} variant="top" src="https://as1.ftcdn.net/v2/jpg/02/52/37/18/1000_F_252371806_rV8L7d2tnTASRe0vIa02hQ3sPItNrgUY.jpg" />
                                <div className='text-center'>
                                    <Card.Body>
                                        <Card.Title>Hatch Back</Card.Title>
                                        <Button onClick={() => handleCategory('Hatchback')} className='mt-4' variant="primary">Browse</Button>
                                    </Card.Body>
                                </div>
                            </Card>
                        </div>
                        <div className="col-lg-3">
                            <Card className='shadow mb-5' style={{ width: '17rem', height: '65vh' }}>
                                <Card.Img className='p-3' width={"250px"} height={"250px"} variant="top" src="https://automobiles.honda.com/-/media/Honda-Automobiles/Vehicles/2023/Civic-Sedan/AW/Carshot/carshot_CivicSedan_front_CIVIC20L4DSPORT_2023_CrystalBlackPearl_FE2F5PEW_NH-731P.png" />
                                <div className='text-center'>
                                    <Card.Body>
                                        <Card.Title>Sedan</Card.Title>
                                        <Button onClick={() => handleCategory('Sedan')} className='mt-4' variant="primary">Browse</Button>
                                    </Card.Body>
                                </div>
                            </Card>
                        </div>
                        <div className="col-lg-3">
                            <Card className='shadow mb-5' style={{ width: '17rem', height: "65vh" }}>
                                <Card.Img className='p-3' width={"250px"} height={"250px"} variant="top" src="https://www.balearicars.com/wp-content/uploads/2023/04/mercedes-vito.jpg" />
                                <div className='text-center'>
                                    <Card.Body>
                                        <Card.Title>MPV</Card.Title>
                                        <Button onClick={() => handleCategory('MPV')} className='mt-4' variant="primary">Browse</Button>
                                    </Card.Body>
                                </div>
                            </Card>
                        </div>
                        <div className="col-lg-3">
                            <Card className='shadow mb-5' style={{ width: '17rem', height: "65vh" }}>
                                <Card.Img className='p-3' width={"250px"} height={"250px"} variant="top" src="https://th.bing.com/th/id/OIP.rEgU7j1gKFZ2D2rAesOccQHaFj?w=235&h=180&c=7&r=0&o=7&cb=ucfimgc2&dpr=1.5&pid=1.7&rm=3" />
                                <div className='text-center'>
                                    <Card.Body>
                                        <Card.Title>SUV</Card.Title>
                                        <Button onClick={() => handleCategory('SUV')} className='mt-4' variant="primary">Browse</Button>
                                    </Card.Body>
                                </div>
                            </Card>
                        </div>

                    </div>


                </div >

                <div className='text-center'>
                    <button onClick={handleAll} className='btn btn-primary mt-5'>Show All Cars</button>

                </div>


            </div >


        </>
    )
}

export default Category