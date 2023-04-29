class ProductManager{
  constructor(){
    this.products = []
  }

  getProducts(){
    return this.products
  }

  addProduct(title, description, price, thumbnail, code, stock){
    const products = {
      title, description, price, thumbnail, code, stock
    }
    
    const codeIndex = this.products.findIndex((products) => products.code === code);
    
    if (title == null || 
      description == null || 
      price == null || 
      thumbnail == null || 
      code == null || 
      stock == null){
        console.log('Debe completar todos los campos.')
      }
    
    if (this.products.length === 0){
      products.id = 1
    }else{
      products.id = this.products[this.products.length-1].id + 1
    }
      if (codeIndex == -1){
        this.products.push(products)
        console.log('Se agregó el producto exitosamente.')
      }else{
        console.log(`El código '${code}' ya existe.`)
      } 
    return products
  }
  
  getProductById(idProduct){
    const ip = this.products.findIndex(products=>products.id === idProduct)
        if(ip == -1){
            console.log('El id que busca no existe.')
        }else{
          console.log(this.products[ip])
        }
  }
}


const productManager = new ProductManager()

console.log(productManager.getProducts())
productManager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25)
console.log(productManager.getProducts())
productManager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25)
productManager.addProduct("producto prueba", "Este es un producto prueba", 3000, "Sin imagen", "zbc567", 25)
console.log(productManager.getProducts())
productManager.getProductById(4)
productManager.addProduct("producto prueba", "Este es un producto prueba", 3000, "zbc567", 25)