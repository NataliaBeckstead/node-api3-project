const express = require('express');

const router = express.Router();

const Posts = require("./postDb");

router.get('/', (req, res) => {
  Posts.get(req.query)
  .then((posts) => {
    res.status(200).json(posts)
  })
  .catch((error) => {
    res.status(500).json({
      message: "Error, coudn't get posts"
    });
  });
});

router.get('/:id', validatePostId, (req, res) => {
  Posts.getById(req.params.id)
  .then((post) => {
    res.status(200).json(post);
  })
  .catch((error) => {
    res.status(500).json({message: "Error, coudn't get post"});
  });
});

router.delete('/:id', validatePostId, (req, res) => {
  Posts.remove(req.params.id)
  .then((count) => {
    if (count > 0) {
      res.status(200).json({message: "post has been deleted"})
    } else{
      res.status(400).json({message: 'cannot find post'})
    }
  })
  .catch((error) => {
    res.status(500).json({message: "server error"});
  });
});

router.put('/:id', [validatePost, validatePostId], (req, res) => {
  const { id } = req.params;

  Posts.update(id, req.body)
  .then(()=> {
    res.status(200).json({success: "updated successfully", info: req.body})
  })
  .catch((error) => {
    res.status(500).json({message: "can't udate post"});
  });
});

function validatePost(req, res, next) {
  const { text } = req.body;

  Object.entries(req.body).length === 0
  ? res.status(400).json({message: "No data"})
  : !text
  ? res.status(400).json({message: "missing requirements"})
  : next();

}

function validatePostId(req, res, next) {
  const { id } = req.params;
  Posts.getById(id)
  .then((post) => {
    if (post) {
      req.post = post;
      next();
  } else {
    res.staus(404).json({message: "Can't find"})
  }
  })
  .catch((err) => {
    res.status(500).json({message: "No such id"})
  });
}

module.exports = router;