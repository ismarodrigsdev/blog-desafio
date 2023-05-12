const Post = require('../models/Post');
const mongoose = require('mongoose');

const createPost = async (req, res) => {
  const { title, content } = req.body;
  try {
    const user = req.user;

    // Verifica se os campos foram preenchidos
    if (!title) {
      return res.status(400).json({ msg: 'Campo title não informado' });
    }
    if (!content) {
      return res.status(400).json({ msg: 'Campo content não informado' });
    }

    const post = await Post.create({
      title,
      content,
      author: user.user_id
    });
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const updatePost = async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.params;
  try {
    const user = req.user;
    // Verifica se os campos foram preenchidos
    if (!title) {
      return res.status(400).json({ msg: 'Campo title não informado' });
    }
    if (!content) {
      return res.status(400).json({ msg: 'Campo content não informado' });
    }
    // Verifica o ID passado na URL
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: 'ID invalido' });
    }
    // Verifica se a postagem existe e pertence ao usuário autenticado
    const post = await Post.findOne({ _id: id, author: user.user_id });
    if (!post) {
      return res.status(404).json({ msg: 'Postagem nao encontrada ou pertence a outro usuario' });
    }
    // Atualiza a postagem
    post.title = title;
    post.content = content;
    await post.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const getPosts = async (req, res) => {
  try {
    const user = req.user;
    let filter = {};
    const { asc, onlyOwn } = req.query;

    // Verifica se é ascendente a ordem
    const sort = asc ? 1 : -1;

    // Filtra as postagens pelo autor
    if (onlyOwn) {
      filter = { author: user.user_id };
    }
    // Busca as postagens no banco de dados
    const posts = await Post.find(filter)
      .populate('author', 'first_name last_name email')
      .sort({ createdAt: sort });

    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  try {

    // Verifica o ID passado na URL
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: 'ID invalido' });
    }

    // Busca a postagem no banco de dados
    const post = await Post.findById(id).populate('author', 'first_name last_name email');
    if (!post) {
      return res.status(404).json({ msg: 'Post não encontrado' });
    }

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const user = req.user;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ msg: 'Post não encontrado' });
    }

    // Verifica se o usuário é o autor da postagem
    if (post.author.id !== user.user_id) {
      return res.status(401).json({ msg: 'Esse Post não pertence ao seu usuario' });
    }

    // Remove a postagem
    await post.remove();

    res.json({ msg: 'Post deletado com sucesso!' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  createPost,
  updatePost,
  getPosts,
  getPostById,
  deletePost
};