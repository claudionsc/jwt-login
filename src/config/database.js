import mongoose from 'mongoose'

mongoose.Promise = global.Promise

const config = {
  uri: 'mongodb://localhost:27017/node-mongoose-jwt',
  options: {
    useNewUrlParser: true,
    useFindAndModify: false,
  },
}

mongoose.connection.on('open', () => {
  console.log('Conectado')
})

mongoose.connection.on('error', () => {
  throw new Error('Falha')
})

export default {
  connect: () => mongoose.connect(config.uri, config.options)
}
