import { Schema, model } from 'mongoose'


const blogPostSchema = new Schema({
    title : {
        type : String,
        required : true,
        trim : true
    },
    content : {
        type : String,
        required : true,
        trim : true
    },
    category : {
        type : String,
        required : true,
        trim : true,
        enum : ['Technology', 'Business', 'Health', 'Entertainment', 'Sports', 'Big Data', 'Programming']
    },
    tags:{
        type : [String],
        required : true,
        trim : true,
    }
})

blogPostSchema.set('timestamps', true)

export const BlogPost = model('BlogPost', blogPostSchema);