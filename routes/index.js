var express = require('express');
var router = express.Router();
var Blog = require('../models/Blogs')

/* GET home page. */
router.get('/', function(req, res, next) {
    Blog.find({}, 'blogHead blogBody', function(error, blogs) {
      if(error) {console.log(error)}
      res.send(blogs);
    })
});

router.post('/', function(req, res) {
  const post = new Blog({
    blogHead: req.body.bloghead,
    blogBody: req.body.blogbody
  });
    post.save(function(error, post) {
    if(error) {console.log(error)}
    res.send(post);
  });
});

router.put('/:id', function(req, res) {
  Blog.findById(req.params.id, 'blogHead blogBody', function(error, blogs) {
    if(error) {console.log(error)}

    blogs.blogBody = req.body.blogbody
    blogs.blogHead = req.body.bloghead
    
    blogs.save(function(error, blogs) {
      if(error) {console.log(error)}
      res.send(blogs)
    });
  })
});

module.exports = router;
