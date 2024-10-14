export type TBlogPost = {
    title: string;
    content: string;
    category: 'Technology' | 'Business' | 'Health' | 'Entertainment' | 'Sports' | 'Big Data' | 'Programming';
    tags: string[];
}