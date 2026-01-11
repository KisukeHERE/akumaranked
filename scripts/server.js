const cors = require('cors')
const express = require('express')

const port = process.env.PORT || 8080;
const app = express()

app.use(cors({
    origin: ['https://akumaranked.vercel.app/']
}))

app.get('/', (req, res) => {
    res.send('Hello from express')
})

app.get('/about', (req, res) => {
    res.send('This is the baout page')
})

app.get('/products', (req, res) => {
    res.json([
        { id: 1, name: 'coucou', price: 667},
        { id: 2, name: 'pascoucou', price: 345}
    ])
})

app.get('/products/:id', (req, res) => {
    const id = Number(req.params.id)

    const products = [
        { id: 1, name: 'coucou', price: 667},
        { id: 2, name: 'pascoucou', price: 345}
    ]

    const requestedProduct = products.find((product) => product.id === id)
    res.json(requestedProduct)
})

app.get('/message', (req, res) => {
    res.json({message: "Hello from ur xpress backend"})
})

app.get('/apikeyakumaranked', (req, res) => {
    res.json('RGAPI-e6ecc8e0-6c2e-42b4-818a-40fc871210da')
})

app.listen(port, () => {
    console.log('The server is running')
})