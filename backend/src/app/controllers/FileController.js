const Post = require('../models/File');

class FileController {

    async index (req,res) {
        const posts = await Post.find();

        return res.json(posts);
    }

    async store (req, res) {
        console.log(req.file);
        const { originalname: name, size, key, location: url = '' } = req.file;

        const post = await Post.create({
            name,
            size,
            key,
            url
        });

        return res.json(post);
    }

    async delete (req,res) {
        const post = await Post.findById(req.params.id);

        await post.remove();

        return res.json({message: 'Excluido com sucesso'});
    }
}

module.exports = new FileController();