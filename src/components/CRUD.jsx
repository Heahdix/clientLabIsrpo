import React from "react";
import{
    getAllProducts,
    getProduct,
    deleteProduct,
    addProduct,
    updateProduct,
    getAllSuppliers,
} from "../api/articleApi"
import { Button, Form, Table } from "react-bootstrap";

const CRUD = () => {
    const [productIdForFind, setProductIdForFind] = React.useState(0);

    const [productData, setProductData] = React.useState();
    const [productsData, setProductsData] = React.useState([]);

    const [supplierData, setSupplierData] = React.useState([]);

    const [productDataToAdd, setProductDataToAdd] = React.useState({name:"", price:"", supplierId:"1"});

    const [productToDataToUpdate, setProductDataToUpdate] = React.useState({productId:"", name:"", price:"", supplierId:""});


    React.useEffect(() => {
        (async () => await Load())();
    }, []);

    async function Load(){
        getAllProducts().then((data) => {
            setProductsData(data)
        })
        getAllSuppliers().then((data) => {
            setSupplierData(data);
        })
    }

    const handleFind = (event) => {
        event.preventDefault();
        if (productIdForFind !== ""){
            getProduct(productIdForFind).then((data) => {
                setProductData(data)
            });
        }
        else{
            alert("Введите ID");
        }
    }


    const handleDelete = async (id, event) => {
        event.preventDefault();
        setProductDataToUpdate({productId:"", name:"", price:"", supplierId:""});
        await deleteProduct(id);
        if (id === productData.productId){
            setProductData(undefined);                                                                                
        }
        await Load();
    }

    const handleAdd = async (event) => {
        if (productDataToAdd.name === "" || productDataToAdd.price === "" || productDataToAdd.supplierId === ""){
            alert("Заполнены не все данные");
        }
        else{
            event.preventDefault();
            await addProduct(productDataToAdd);
            setProductDataToAdd({name: "", price: "", supplierId: "1"});
            await Load();
        }
    }

    const handleSelectProductToUpdate = (product, event) => {
        setProductDataToUpdate(product);
    }

    const handleUpdate = async (event) => {
        if (productToDataToUpdate.name === "" || productToDataToUpdate.price === "" || productToDataToUpdate.supplierId === ""){
            alert("Заполнены не все данные");
        }
        else{
            event.preventDefault();
            await updateProduct(productToDataToUpdate);
            setProductDataToUpdate({productId: "", name: "", price: "", supplierId: ""});
            if (productData != null){
                getProduct(productData.productId).then((data) => {
                    setProductData(data)
                });
            }
            await Load();
        }
    }

    return(
        <div>
            <Table bordered hover>
            <tbody>
                <tr>
                    <th>№</th>
                    <th>Название</th>
                    <th>Цена</th>
                    <th>Индекс поставщика</th>
                    <th></th>
                    <th></th>
                </tr>
                {productsData.map((item) => (
                    <tr key={item.productId}>
                        <td>{item.productId}</td>
                        <td>{item.name}</td>
                        <td>{item.price}₽</td>
                        <td>{item.supplierId}</td>
                        <td>
                            <Button variant="primary" onClick={(event) => handleSelectProductToUpdate(item, event)}>
                                Изменить
                            </Button>
                        </td>
                        <td>
                            <Button variant="danger" onClick={(event) => handleDelete(item.productId, event)}>
                                Удалить
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
            </Table>
            <hr></hr>
            <h2>Поиск</h2>
            <Form>
                <Form.Control className="inputForData" required id="id" placeholder="id" type="number" min={0} onChange={(e) => setProductIdForFind(e.target.value)}/>
                <Button className="formButton" variant="primary" onClick={handleFind}>Найти</Button>
            </Form>
            {productData && (
            <div>
                <p className="dataText"><b>Название:</b> {productData.name}</p>
                <p className="dataText"><b>Цена:</b> {productData.price}₽</p>
                <p className="dataText"><b>Индекс поставщика:</b> {productData.supplierId}</p>
            </div>
            )}
            <hr></hr>
            <h2>Добавление</h2>
            <Form>
                <Form.Control required className="d-block inputForName" placeholder="Название" value={productDataToAdd.name} onChange={(e) => setProductDataToAdd({...productDataToAdd, name: e.target.value})}/>
                <Form.Control required className="d-block inputForPrice" placeholder="Цена" type="number" min={0} value={productDataToAdd.price} onChange={(e) => setProductDataToAdd({...productDataToAdd, price: e.target.value})}/>
                <Form.Select required className="d-block inputForSupplier" value={productDataToAdd.supplierId} onChange={(e) => setProductDataToAdd({...productDataToAdd, supplierId: e.target.value})}>
                    {supplierData.map((item) => (
                        <option key={item.supplierId} value={item.supplierId}>{item.name}</option>
                    ))}
                </Form.Select>
                <Button className="d-block formButton"  onClick={handleAdd}>Добавить</Button>
            </Form>
            {productToDataToUpdate.productId !== "" && (
                <div>
                    <hr></hr>
                <h2>Изменение</h2>
                <Form>
                  <Form.Control className="d-block inputForData" required disabled value={productToDataToUpdate.productId}/>
                  <Form.Control className="d-block inputForName" required placeholder="Название" value={productToDataToUpdate.name} onChange={(e) => setProductDataToUpdate({...productToDataToUpdate, name: e.target.value})}/>
                  <Form.Control className="d-block inputForPrice" required placeholder="Цена" value={productToDataToUpdate.price} type="number" min={0} onChange={(e) => setProductDataToUpdate({...productToDataToUpdate, price: e.target.value})}/>
                  <Form.Select className="d-block inputForSupplier" required value={productToDataToUpdate.supplierId} onChange={(e) => setProductDataToUpdate({...productToDataToUpdate, supplierId: e.target.value})}>
                      {supplierData.map((item) => (
                          <option key={item.supplierId} value={item.supplierId}>{item.name}</option>
                      ))}
                  </Form.Select>
                  <Button className="d-block formButton" onClick={handleUpdate}>Изменить</Button>
                </Form>
                </div>
            )}
        </div>
    );
};

export default CRUD;