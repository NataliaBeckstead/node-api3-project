const express = require('express');
// const router = express.Router();
const users = require("./userDb");
const posts = require("../posts/postDb");

const router = express.Router();

router.post('/', validateUser,  (req, res) => {
  users.insert(req.body)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({ message: "Error, could not add user" });
    });
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  posts.insert({ user_id: req.params.id, text: req.body.text })
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((err) => {
      res.status(500).json({ errorMessage: "Unable to save data" });
    });
});

router.get('/', (req, res) => {
  users.get(req.query)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Error retrieving data" });
  });
});

router.get('/:id', validateUserId, (req, res) => {
  users.getById(req.user)
    .then(() => {
      res.status(200).json(req.user);
    })
    .catch((err) => {
      res.status(500).json({ errorMessage: "Error retrieving data" });
    });
});

router.get('/:id/posts', validateUserId, (req, res) => {
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

router.delete('/:id', validateUserId, (req, res) => {
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
  Users.getById(req.params.id)
  .then(user => {
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(400).json({ message: "invalid user id" });
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({ message: "ERROR" });
  });
}

function validateUser(req, res, next) {
  if (req.body) {
    if (req.body.name) {
      next();
    } else {
      res.status(400).json({ message: "Needs a name" });
    }
  } else {
    res.status(400).json({ message: "Needs user data" });
  }
}

function validatePost(req, res, next) {
  if (req.body) {
    if (req.body.text) {
      next();
    } else {
      res.status(400).json({ message: "Needs a text field" });
    }
  } else {
    res.status(400).json({ message: "Data for post is missing" });
  }
}

module.exports = router;
