import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import './home.css'
import { Button } from 'react-bootstrap'
import { productContext } from '../contextAPI/Context'

const Product = () => {

    const [products, setProducts] = useState([])

    const { token, getcart } = useContext( productContext )

    const fetchData = async () => {
        await axios.get("/api/getproducts")
            .then(res => setProducts(res.data))
    }

    useEffect(() => {
        fetchData()
    }, [])

    const getProduct = (image,title,company,price) =>{
        const headers = {
            Authorization: `Bearer ${token}`,
          };
        console.log(image,title,company,price);
        axios.post("/api/addfav", {
            image,title,company,price
          },{
            headers
          })
          .then(function (response) {
            console.log(response);
            if(response.status === 202)
            {
                alert("already in fav list")
            }
            else {
                alert("Item Added to fav")
                getFav()
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    const addtoCart = (image,title,company,price) =>{
        console.log(token);
        
        axios.post("/api/addcart", {
            image,title,company,price
          },{
            headers : {
                Authorization: `Bearer ${token}`,
              }
          })
          .then(function (response) {
            console.log(response);
            if(response.status === 202)
            {
                alert("already in cart");
            }
            else {
                alert("Item Added to cart");
               Getcart();
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    }


    return (
        <div className='product'>
            <h3 className='text-center p-4'>Products</h3>


            <div className="pro-layout">
                {
                    products && products.length > 0 ?

                        products.map(li => {
                            return <div className='cardz' key={li._id}>
                                <img src={li.image} className='image' alt="" />
                                <p className="title">{li.title}</p>
                                <div className="comrice">
                                <p className="company">{li.company}</p>
                                <p className="price text-dark">Rs:{li.price}</p>
                                </div>
                                <div className="btns">
    <Button
        variant="success"
        className="px-4"
        onClick={() => {
            console.log("Add to Cart clicked!");
            addtoCart(
                li.image,
                li.title,
                li.company,
                li.price
            );
        }}
    >
        Add to Cart
    </Button>
</div>
                            </div>
                        })

                        : <div>
                            <p>no product found</p>
                        </div>
                }
            </div>


        </div>
    )
}

export default Product