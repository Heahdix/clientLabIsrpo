import { $host } from "./index";

export const getAllSuppliers = async () => {
    const {data} = await $host.get('/getSupplier')
    return data
}

export const getAllProducts = async () => {
    const {data} = await $host.get('/getProduct')
    return data
}

export const getProduct = async (id) => {
    try{
        const {data} = await $host.get('/getProduct/' + id)
        return data
    }
    catch (err) {
        alert(err.name);
        console.log(err);
    }
}

export const deleteProduct = async (id) => {
    await $host.delete('/deleteProduct/' + id)
}

export const addProduct = async (product) => {
    try{
        await $host.post('/addProduct/' + product.name + '&&' + product.price + '&&' + product.supplierId)
    }
    catch(err){
        alert(err.name);
        console.log(err);
    }
}

export const updateProduct = async (product) => {
    await $host.put('/updateProduct/'+ product.productId + '&&' + product.name + '&&' + product.price + '&&' + product.supplierId)
}