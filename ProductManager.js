import fs from 'fs'

class ProductManager{
    constructor(){
        this.patch = './file/productos.json'
        this.products = []
    }

    getProducts = async () => {
        if(fs.existsSync(this.patch)){
            const view = await fs.promises.readFile(this.patch, "utf-8")
            console.log(view)
            const products = JSON.parse(view)
            return products
        }else{
            return []
        }
    }

    addProducts = async (title, description, price, thumbnail, code, stock) => {
        const newProduct = {title, description, price, thumbnail, code, stock}
        const file = await this.getProducts();
        if (file.length == 0){
            newProduct.id = 1
        }else{
            newProduct.id = file[file.length-1].id + 1
        }
        
        this.products.push(newProduct)

        if (file.length == 0){
            await fs.promises.writeFile(this.patch, JSON.stringify(this.products, null, '\t'))
        }else{
            const update = [...file, newProduct]
            await fs.promises.writeFile(this.patch, JSON.stringify(update, null, '\t'));
        } 
    }
    
    updateProduct = async ({id, ...productos}) => {
        const dell = await this.deleteProduct(id);
        if (dell != `El id: ${id} no existe.`){
            const read = await this.getProducts();
            const update = [{...productos, id}, ...read]
            await fs.promises.writeFile(this.patch, JSON.stringify(update, null, '\t'));
            console.log(`El producto con id: ${id} fue actualizado`)
        }
   }

    getProductsById = async (id) => {
        const read = await this.getProducts();
        const ip = read.find(product => product.id === id)
        if(!ip){
            console.log('El id que busca no existe.')
        }else{
          console.log(ip)
        }
    }

    deleteProduct = async (id) => {
        const read = await this.getProducts();
        const idp = read.find(products => products.id === id)
        if (idp != undefined){
            const ip = read.filter(products => products.id != id)
            await fs.promises.writeFile(this.patch, JSON.stringify(ip, null, '\t'));
            console.log(`El producto con id: ${id} ha sido eliminado`)
        } else {
            console.log(`El id: ${id} no existe.`)
            return `El id: ${id} no existe.`
        }
    }
}

const productos = new ProductManager 


//productos.addProducts("producto prueba", "Este es un producto prueba", 2003, "Sin imagen", "abc123", 42)
//productos.getProductsById(1)
//productos.getProducts()
//productos.deleteProduct(3)
/*productos.updateProduct({
    title: 'producto ACTUALIZADO ID:4',
    description: 'Este es un producto prueba',
    price: 5000,
    thumbnail: 'Sin imagen',
    code: 'abc123',
    stock: 88,
    id: 2
})*/

