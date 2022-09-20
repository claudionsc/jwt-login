import Express from 'express'
import bodyParser from 'body-parser'
import database from './config/database'
import userRoute from './routes/userRoutes'

import {
    verifyToken,
    protectRoute
} from './middlewares/auth'
import { generateToken } from './services/auth'

const app = Express()
const port = 3000

app.set('json spaces', 2);
app.use(bodyParser.urlencoded({ extended: false }))
app.use(verifyToken)

userRoute(app)

app.get('/', (req, res) => res.send('Olá mundo pelo Express com JWT!'))

app.post('/login', (req, res) => {
    const { username, password } = req.body

    if (username !== 'admin' || password !== '123456') {
        return res.status(400).send({ error: 'Usuário ou senha inválidos!' })
    }

    const payload = {
        sub: 1,
        name: 'Nome Usuário',
        roles: ['admin']
    }
    const token = generateToken(payload)

    res.send({
        token
    })
})

app.get('/posts', protectRoute, (req, res) => res.send(req.decoded))

database.connect.then(() => {
    app.listen(port, () => console.log('Api rodando na porta 3000'))
})