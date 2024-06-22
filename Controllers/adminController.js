//We placed the functions related to admin
const Employees = require('../models/employees');
const express = require('express');
const router = express.Router();
const PostForSale = require('../models/PostForSale');

const getEmp=(req, res) => {
    Employees.find()
      .then(result => {
        res.render('viewAll', { employees: result, user: (req.session.user === undefined ? "" : req.session.user) });
      })
      .catch(err => {
        console.log(err);
      });
}
  
const addEmp=(req, res) => {
    const emp = new Employees({
      UserName: 'Mostafa',
      Password: '123',
      Image: 'aaa',
      Type: 'client'
    })
    emp.save()
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log(err);
      });
} 
  
const findEmp=(req, res) => { 
   Employees.findById('6649d794e7d44fafbe244882')
   .then(result => {
    res.send(result);
   })
   .catch(err => {
    console.log(err);
  })
}

module.exports={getEmp,addEmp,findEmp};
// Route to display admin panel
router.get('/panel', async (req, res) => {
  try {
      const posts = await PostForSale.find({ status: 'pending' });
      res.render('adminPanel', { posts });
  } catch (err) {
      res.status(500).send('Error loading admin panel');
  }
});

// Route to approve a post
router.post('/approve-post', async (req, res) => {
  try {
      const { postId } = req.body;
      await PostForSale.findByIdAndUpdate(postId, { status: 'approved' });
      res.redirect('/admin/panel');
  } catch (err) {
      res.status(500).send('Error approving post');
  }
});

// Route to reject a post
router.post('/reject-post', async (req, res) => {
  try {
      const { postId } = req.body;
      await PostForSale.findByIdAndUpdate(postId, { status: 'rejected' });
      res.redirect('/admin/panel');
  } catch (err) {
      res.status(500).send('Error rejecting post');
  }
});

module.exports = router;