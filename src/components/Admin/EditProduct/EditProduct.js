import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Menu from '../Menu/Menu';
import './EditProduct.css';

const EditProduct = () => {
    const [product, setProduct] = useState({});
    const {name, weight, price, photo} = product;
    const {id} = useParams();
    const [update, setUpdate] = useState(false);
    useEffect(() => {
        fetch('https://pumpkin-crisp-14693.herokuapp.com/product/'+id, {
            method: 'GET',
        })
        .then(res => res.json())
        .then(products => setProduct(products[0]))
    },[id, update]);
    const handleUpdateChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const newProduct = {...product};
        newProduct[name] = value;
        setProduct(newProduct);
    };
    const handleUpdateSubmit = (e) => {
        if(!(name === null || weight === null || price === null)){
            fetch('https://pumpkin-crisp-14693.herokuapp.com/product/update/'+id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            })
            .then(res => res.json)
            .then(data => {
                console.log(data);
                setUpdate(!update);
            })
        }
        e.preventDefault();
    }
    
    return (
        <div>
            <Menu/>
            <div className="edit-product">
                <form onSubmit={handleUpdateSubmit}>
                    <div className="form-group p-preview">
                        <h2>Edit Product</h2>
                        <img src={photo} alt="" width="200" height="250"/>
                    </div> 
                    <div className="form-group">
                        <input type="text" className="form-control" name="name" onChange={handleUpdateChange} value={name} required/>
                    </div>
                    <div className="form-group">
                        <input type="number" className="form-control" name="weight" onChange={handleUpdateChange} value={weight} required/>
                    </div>
                    <div className="form-group">
                        <input type="number" className="form-control" name="price" onChange={handleUpdateChange} value={price} required/>
                    </div>
                    <div className="form-group">
                        <input type="submit" class="btn btn-success float-right" value="Update Changes"/>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProduct;