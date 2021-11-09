const Post = require("../Models/Post");

module.exports.addPost_post = async (req, res) => {
  const newPost = new Post(req.body);

  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
};
module.exports.removePost_delete = async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await Post.findById(postId);
    if (post.author === res.locals.user.username) {
      try {
        await post.delete();
        res.status(201).json("post has been deleted!");
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(401).json("you should delete your posts");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
module.exports.editPost_put = async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await Post.findById(postId);
    if (post.author === res.locals.user.username) {
      try {
        const newPost = await Post.findByIdAndUpdate(
          postId,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(201).json(newPost);
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(401).json("you should update your posts");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.getAllPosts_get = async (req, res) => {
  const author = req.query.user;
  const cat = req.query.cat;
  try {
    let posts;
    if (author) {
      posts = await Post.find({ author });
    } else if (cat) {
      posts = await Post.find({
        categories: {
          $in: [cat],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.getPostById_get = async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await Post.findById(postId);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};