import { Router } from 'express';
import { createPost, deleteAllPost, deletePostById, getAllPost, getPostById, getPostBySearchTerm, updatePost } from '../controllers';
import { TBlogPost } from '../types';
import { BlogPost } from '../models';

export const BlogPostRouter = Router();

BlogPostRouter.post('/', async (req, res) => {
    const { title, content, category, tags } = req.body as TBlogPost;
    
    // Validation des champs requis
    if (!title || !content || !category) {
        return res.status(400).json({ success: false, msg: 'Les champs title, content et category sont requis' });
    }

    // Vérification de l'existence d'un article au titre similaire
    const isExist = await BlogPost.findOne({ title: title});
    if (isExist) {
        return res.status(400).send({ success: false, msg: 'Un article avec ce titre existe déjà' });
    }

    // Appeler la fonction pour créer un article
    try {
        const response = await createPost({ title, content, category, tags });

        if (response.success) {
            res.status(Number(response.status)).send(response); 
        } else {
            res.status(response.status || 500).send(response);
        }
    } catch (error : any) {

        res.status(500).send({ success: false, msg: 'Erreur lors de la création de l’article, Veuillez contactez les développeurs.' });
    }
});


BlogPostRouter.put('/:id', async (req, res) => {
    const { id } = req.params;
    const response = await updatePost(id, req.body);
    res.status(response.status as number).send(response);
})

BlogPostRouter.delete('/', async (req, res) => {
    const response = await deleteAllPost()
    res.status(response.status as number).send(response);
})


BlogPostRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const response = await deletePostById(id)
    res.status(response.status as number).send(response);
})

BlogPostRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    const response = await getPostById(id);
    res.status(response.status as number).send(response);
})


BlogPostRouter.get('/', async (req, res) => {
    const term: string = req.query.term as string; 
    const response = await getPostBySearchTerm(term);
    res.status(response.status as number).send(response);
})

BlogPostRouter.get('/', async (req, res) => {
    const response = await getAllPost();
    res.status(response.status as number).send(response);
})