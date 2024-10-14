import mongoose from 'mongoose';
import { BlogPost } from '../models/BlogPost';
import { ResponseType, TBlogPost } from '../types'


// 
export const createPost = async (postData : TBlogPost) : Promise<ResponseType> =>{
    
    let response : ResponseType = {
        success: true,
        status:201
    }

    try {
        const post = new BlogPost(postData)
        await post.save();
        response.data = post;
        response.msg = 'Article créé avec succès';

    } catch (error : any) {
        response.success = false;
        response.status = 500;
        response.msg = error.message;
    }


    return response;
}

export const updatePost = async (id: string, postData: TBlogPost): Promise<ResponseType> => {
    let response: ResponseType = {
        success: true,
        status: 200,
    };

    // Vérification de la validité de l'ID (utile si tu utilises MongoDB)
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return {
            success: false,
            status: 400,
            msg: 'ID invalide',
        };
    }

    try {
        const postUpdated = await BlogPost.findByIdAndUpdate(id, postData, { new: true });

        // Vérification si l'article existe
        if (!postUpdated) {
            return {
                success: false,
                status: 404,
                msg: 'Article non trouvé',
            };
        }

        response.data = postUpdated;
        response.msg = 'Article mis à jour avec succès';
    } catch (error: any) {
        response.success = false;
        response.status = 500;
        response.msg = error.message;
    }

    return response;
};


export const deletePostById = async (id: string): Promise<ResponseType> => {

    let response: ResponseType = {
        success: true,
        status: 200,
    };

    // Vérification de la validité de l'ID (utile si tu utilises MongoDB)
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return {
            success: false,
            status: 400,
            msg: 'ID invalide',
        };
    }

    try {
        const postDeleted = await BlogPost.findByIdAndDelete(id);

        // Vérification si l'article existe
        if (!postDeleted) {
            return {
                success: false,
                status: 404,
                msg: 'Article non trouvé',
            };
        }

        response.msg = 'Article supprimé avec succès';
    } catch (error: any) {
        response.success = false;
        response.status = 500;
        response.msg = error.message;
    }

    return response;
}

export const getPostById = async  (id: string) : Promise<ResponseType> => {
    
    let response : ResponseType = {
        success: true,
        status: 200,
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        response.msg = 'ID invalide'
        response.success = false
        response.status = 400
        return response;
    }

    try {
        const post = await BlogPost.findById(id);
        response.data = post;
    } catch (error : any) {
        response.success = false;
        response.status = 500;
        response.msg = error.message;
    }

    return response;
}


export const getAllPost = async  () : Promise<ResponseType> => {
    
    let response : ResponseType = {
        success: true,
        status: 200,
    }

    try {
        const posts = await BlogPost.find();
        response.data = posts || [];
    } catch (error : any) {
        response.success = false;
        response.status = 500;
        response.msg = error.message;
    }

    return response;
}
export const deleteAllPost = async  () : Promise<ResponseType> => {
    
    let response : ResponseType = {
        success: true,
        status: 200,
    }

    try {
        const posts = await BlogPost.deleteMany();
        response.msg = "Tous les articles ont été supprimé avec success"
    } catch (error : any) {
        response.success = false;
        response.status = 500;
        response.msg = error.message;
    }

    return response;
}


export const getPostBySearchTerm = async (searchTerm: string | undefined): Promise<ResponseType> => {
    let response: ResponseType = {
        success: true,
        status: 200,
    };

    if (!searchTerm) {
        response.msg = "Votre requête ne contient aucun terme, que cherchez-vous ?";
        response.success = false;
        response.status = 400;
        return response;
    }

    try {
        // Filtre les posts contenant le terme recherché dans le titre, le contenu, ou la catégorie
        const posts = await BlogPost.find({
            $or: [
                { title: { $regex: searchTerm, $options: 'i' } }, // "i" pour insensible à la casse
                { content: { $regex: searchTerm, $options: 'i' } },
                { category: { $regex: searchTerm, $options: 'i' } }
            ]
        });

        if (posts.length === 0) {
            response.msg = "Aucun article ne correspond à votre recherche.";
            response.success = false;
            response.status = 404;
        } else {
            response.data = posts;
        }

    } catch (error: any) {
        response.success = false;
        response.status = 500;
        response.msg = "Erreur serveur : " + error.message;
    }

    return response;
};
 