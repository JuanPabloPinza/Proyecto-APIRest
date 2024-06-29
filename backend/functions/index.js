const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const admin = require('firebase-admin');
const express = require("express");
const app = express();

var serviceAccount = require("./credentials-firebase.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

app.use(express.json()); // Middleware para parsear JSON en las solicitudes

// Crear un producto
app.post('/api/products', async (req, res) => {
    try {
        const productsRef = db.collection('products');
        const snapshot = await productsRef.orderBy('id', 'desc').limit(1).get();
        
        let newId;
        if (snapshot.empty) {
            newId = 1; // Si no hay documentos, comienza desde 1
        } else {
            const lastDoc = snapshot.docs[0];
            const lastId = parseInt(lastDoc.id, 10);
            newId = lastId + 1;
        }

        await productsRef.doc(newId.toString()).set({
            id: newId, // Guardamos el ID como un campo del documento
            name: req.body.name,
            price: req.body.price,
            details: req.body.details
        });

        return res.status(204).json();
    } catch (error) {
        logger.error("Error creating product:", error);
        return res.status(500).json({ error: "Error creating product" });
    }
});
/*
async function addProducts() {
    try {
        const products = [
            { name: 'iPhone 13 Pro', price: 999, details: 'Último modelo de iPhone con pantalla Super Retina XDR y chip A15 Bionic.' },
            { name: 'Samsung Galaxy S21 Ultra', price: 1199, details: 'Teléfono Android con pantalla Dynamic AMOLED 2X y cámara cuádruple de 108 MP.' },
            { name: 'MacBook Pro 16"', price: 2399, details: 'Portátil potente con procesador M1 Pro/M1 Max y pantalla Retina XDR.' },
            { name: 'Sony PlayStation 5', price: 499, details: 'Consola de juegos de última generación con soporte para juegos en 4K.' },
            { name: 'Nintendo Switch', price: 299, details: 'Consola híbrida que se puede usar como consola de sobremesa o portátil.' },
            { name: 'Samsung QLED 4K TV', price: 1299, details: 'Televisor 4K con tecnología QLED y sistema operativo Tizen.' },
            { name: 'DJI Mavic Air 2', price: 799, details: 'Dron con cámara de 48 MP y capacidad de grabación de video 4K.' },
            { name: 'Apple Watch Series 7', price: 399, details: 'Reloj inteligente con pantalla siempre activa y detección de caídas.' },
            { name: 'Bose QuietComfort 45', price: 329, details: 'Auriculares con cancelación de ruido activa y hasta 24 horas de duración de la batería.' },
            { name: 'Canon EOS R5', price: 3899, details: 'Cámara mirrorless de alta resolución con capacidad de grabación de video 8K.' },
            { name: 'LG UltraGear 27GL850-B', price: 449, details: 'Monitor gaming Nano IPS de 27" con resolución QHD y frecuencia de actualización de 144Hz.' },
            { name: 'GoPro HERO10 Black', price: 499, details: 'Cámara de acción con video 5.3K y fotos de 23 MP, resistente al agua.' },
            { name: 'Microsoft Surface Laptop 4', price: 1299, details: 'Portátil ligero con procesador Intel Core de 11ª generación y pantalla táctil PixelSense.' },
            { name: 'Segway Ninebot MAX', price: 799, details: 'Patinete eléctrico con autonomía de hasta 40.4 millas y velocidad máxima de 18.6 mph.' },
            { name: 'Nespresso Vertuo Next', price: 199, details: 'Máquina de café con tecnología Centrifusion para preparar espresso y café tradicional.' },
            { name: 'Razer BlackWidow V3 Pro', price: 229, details: 'Teclado mecánico inalámbrico con switches verdes y retroiluminación RGB.' },
            { name: 'Garmin Forerunner 945', price: 599, details: 'Reloj GPS para correr y triatlón con monitoreo avanzado de rendimiento.' },
            { name: 'Xbox Series X', price: 499, details: 'Consola de juegos con soporte para juegos en 4K y capacidad de 1TB de almacenamiento SSD.' },
            { name: 'Amazon Kindle Oasis', price: 279, details: 'E-reader con pantalla de 7" y resistencia al agua, ideal para leer bajo el sol.' },
            { name: 'Sonos Move', price: 399, details: 'Altavoz inteligente portátil con sonido de calidad premium y resistencia al agua.' }
        ];

        const batch = db.batch();
        let id = 1; 
        
        products.forEach((product, index) => {
            const newDocRef = db.collection('products').doc(id.toString()); // Convertir id a string para usar como ID del documento
            batch.set(newDocRef, {
                name: product.name,
                price: product.price,
                details: product.details
            });
            id++;
        });

        await batch.commit();
        console.log('Productos agregados exitosamente.');
    } catch (error) {
        console.error('Error al agregar productos:', error);
    }
}

addProducts();

*/
  

// Obtener todos los productos
app.get('/api/products', async (req, res) => {
    try {
        const snapshot = await db.collection('products').get();
        let products = [];
        snapshot.forEach(doc => {
            products.push({
                id: doc.id,
                data: doc.data()
            });
        });
        return res.status(200).json(products);
    } catch (error) {
        logger.error("Error fetching products:", error);
        return res.status(500).json({ error: "Error fetching products" });
    }
});

// Obtener un producto por su ID
app.get('/api/products/:id', async (req, res) => {
    try {
        const doc = await db.collection('products').doc(req.params.id).get();
        if (!doc.exists) {
            return res.status(404).json({ error: "Product not found" });
        }
        const item = doc.data();
        return res.status(200).json(item);
    } catch (error) {
        logger.error("Error fetching product:", error);
        return res.status(500).json({ error: "Error fetching product" });
    }
});

// Actualizar un producto por su ID
app.put('/api/products/:id', async (req, res) => {
    try {
        const docRef = db.collection('products').doc(req.params.id);
        await docRef.update({
            name: req.body.name,
            price: req.body.price,
            details: req.body.details
        });
        return res.status(204).json();
    } catch (error) {
        logger.error("Error updating product:", error);
        return res.status(500).json({ error: "Error updating product" });
    }
});

// Eliminar un producto por su ID
app.delete('/api/products/:id', async (req, res) => {
    try {
        const docRef = db.collection('products').doc(req.params.id);
        await docRef.delete();
        return res.status(204).json();
    } catch (error) {
        logger.error("Error deleting product:", error);
        return res.status(500).json({ error: "Error deleting product" });
    }
});

exports.app = onRequest(app);
