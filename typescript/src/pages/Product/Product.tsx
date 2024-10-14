import React, { useEffect, useState } from 'react'
import { Container, Table } from '../../components';
import { products } from '../../utils';
import './Product.scss'

type Product = {
    name: string;
    price: number;
    stock: number;
};

export const Product : React.FC = () => {
    const headers : Array<string> = ["name", "price","stock"];
    const [productsItems, setProductsItems] = useState<Array<Product>>(products);
    const [productItem, setProductItem] = useState<Product>({ name : "", price : 0, stock : 0 });
    
    /**
     * Travailler les formlualires 
     * Comment changer la valeur du formulaire
     * comment reset les champs
    */
    
   const onChange = (e : React.ChangeEvent<HTMLInputElement>) =>{
        const { name, value} = e.target
        setProductItem((prev) => ({
            ...prev,
            [name]: name === "price" || name === "stock"  ? Number(value) : value
        }))
   }
    const onSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(productItem.name && productItem.price > 0 || productItem.stock > 0){
            setProductsItems((prev) => [...prev, productItem]);
            setProductItem({ name: '', price: 0, stock: 0 });
        }else{
            alert('Veuillez remplir tous les champs correctement.');
        }
    }


    
    return (
        <Container>
            <div className='product-container'>
                <h1>Ajouter un produit</h1>
                <form onSubmit={onSubmit}>
                    <input onChange={onChange}  name='name' type="text" value={productItem.name} placeholder='Nom produit' />
                    <input onChange={onChange} name='price' type="number" value={productItem.price}  placeholder='100' />
                    <input onChange={onChange}  name='stock' type="number" value={productItem.stock} placeholder='200' />
                    <button type="submit">Enregistrez</button>
                </form>
            </div>
            <div>
                <h1 style={{ color : "#fff", marginBottom : "2rem" }}>Liste des produits</h1>
                <Table headers={headers} data={productsItems}/>
            </div>
        </Container>
    )
}
