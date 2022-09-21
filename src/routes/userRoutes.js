import PostsModel from "../models/posts";
import { protectRoute } from '../middlewares/auth'

const userRoute = (app) => {

    app.route('/posts/:id?')
        .get( protectRoute, async (req, res) => {
            const { id } = req.params
            const query = {};

            if (id) {
                query._id = id
            }

            try {
                const posts = await PostsModel.find(query)
                res.send({ posts })

            } catch (error) {
                res.status(400).send({ error: 'Falha ao encontrar post'})
            }
        })
        .post(async (req, res) => {
            try {
                const post = new PostsModel(req.body)
                await post.save()

                res.status(201).send('POST')
            } catch(error) {
                res.send(error)
            }
        })
        .put(async (req, res) => {
            const { id } = req.params

            if(!id) {
                return res.status(400).send({ error: 'Post ID não encontrado'})
            }
             try {
                const updatePost = await PostsModel.findOneAndUpdate({ _id: id }, req.body, {
                    new: true,
                });

                console.log(updatePost)

                if(updatePost) {
                    return res.status(200).send('OK!')
                }

                res.status(400).send({ error: 'Não é possível atualizar post'})

             } catch (error) {
                res.send(error)
             }
            })
            .delete(async (req, res) => {
               const { id } = req.params

               if(!id) {
                    return res.status(400).send({ error: 'Post ID não encontrado'})
               }

               try {
                const deletePost = await PostsModel.deleteOne({ _id: id })
                if (deletePost.deletedCount) {
                    return res.send('Deletado')

                }

                res.status(400).send({ error: 'Não foi possível deletar post' })

               } catch (error) {
                res.send(error)
               }
        })
}

module.exports = userRoute