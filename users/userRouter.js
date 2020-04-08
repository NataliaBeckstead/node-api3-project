const express = require('express');
const users = require("./userDb");

const router = express.Router();

router.post('/', (req, res) => {
  users.insert(req.body)
    .then(() => {
      res.status(201).json(req.body);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        messge: "There was an error while saving the post to the database",
    });
  });
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  users.get(req.query)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Error retrieving posts" });
  });
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.get('/:id/posts', (req, res) => {
  users.getUserPosts(req.params.id)
    .then((posts) => {
      if (posts) {
        res.status(200).json(posts);
      } else {
        res.status(404).json({ message: "post not found" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Error processing request" });
  });
});

router.delete('/:id', (req, res) => {
  users.remove(req.params.id)
    .then((user) => res.status(200).json(user))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "The user could not be removed" });
  });
});

router.put('/:id', (req, res) => {
  users.update(req.params.id, req.body)
    .then(res.status(200).json(req.body))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error processing request" });
  });
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
