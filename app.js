const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const path = require('path');
const livereload = require('livereload');
const connectLiveReload = require('connect-livereload');
const multer = require('multer');
const session = require('express-session');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());

const indexRoutes = require('./routes/userRoutes');
const PostForSale = require("./models/PostForSale");
const adminRoutes = require('./routes/admin');
const MeetingRequest = require("./models/schedule"); 
const passport = require('./passport-config');
const Feedback = require("./models/feedback");


// Middleware for live reload
app.use(connectLiveReload());

const User = require('./models/Users');

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/img', express.static(path.join(__dirname, 'public/img')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Set view engine
app.set('views', './views');
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
    res.render('Dashboard2', { title: 'Real Estate' });
});
app.get('/index.ejs', (req, res) => {
    res.render('index', { title: 'Real Estate' });
});

app.get('/Dashboard2.ejs', (req, res) => {
    res.render('Dashboard2', { title: 'Real Estate' });
});

app.get('/orders.ejs', (req, res) => {
    res.render('orders', { title: 'Real Estate' });
});

app.get('/AdminVillas.ejs', (req, res) => {
    res.render('AdminVillas', { title: 'Real Estate' });
});

app.get('/schaduled.ejs', (req, res) => {
    res.render('schaduled', { title: 'Real Estate' });
});

app.get('/customers.ejs', (req, res) => {
    res.render('customers', { title: 'Real Estate' });
});

app.get('/com.ejs', (req, res) => {
    res.render('com', { title: 'Real Estate' });
});

app.get('/Apartments.ejs', (req, res) => {
    res.render('Apartments', { title: 'Real Estate' });
});

app.get('/contactUs.ejs', (req, res) => {
    res.render('contactUs', { title: 'Real Estate' });
});

app.get('/Login1.ejs', (req, res) => {
    res.render('Login1', { title: 'Real Estate' });
});

app.get('/Signup1.ejs', (req, res) => {
    res.render('Signup1', { title: 'Real Estate' });
});

app.get('/Villas.ejs', (req, res) => {
    res.render('Villas', { title: 'Real Estate' });
});

app.get('/aboutUs.ejs', (req, res) => {
    res.render('aboutUs', { title: 'Real Estate' });
});

app.get('/map.ejs', (req, res) => {
    res.render('map', { title: 'Real Estate' });
});

app.get('/AdminPage.ejs', (req, res) => {
    res.render('AdminPage', { title: 'Real Estate' });
});

app.get('/ScheduleMeeting.ejs', (req, res) => {
    res.render('ScheduleMeeting', { title: 'Real Estate' });
});

app.get('/feedback.ejs', (req, res) => {
    res.render('feedback', { title: 'Real Estate' });
});

app.get('/sell.ejs', (req, res) => {
    res.render('sell', { title: 'Real Estate' });
});

app.get('/postForSale.ejs', (req, res) => {
    res.render('postForSale', { title: 'Real Estate' });
});
app.get('/page.ejs', (req, res) => {
    res.render('page', { title: 'Real Estate' });
});

app.get('/sellerGuide.ejs', (req, res) => {
    res.render('sellerGuide', { title: 'Real Estate' });
});

app.get('/sellerGuide1.ejs', (req, res) => {
    res.render('sellerGuide1', { title: 'Real Estate' });
});

app.get('/homeVestimator.ejs', (req, res) => {
    res.render('homeVestimator', { title: 'Real Estate' });
});
app.get('/agent.ejs', (req, res) => {
    res.render('agent', { title: 'Real Estate' });
});

app.get('/payment.ejs', (req, res) => {
    res.render('payment', { title: 'Real Estate' });
});

app.get('/privacy-policy.ejs', (req, res) => {
    res.render('privacy-policy', { title: 'Real Estate' });
});

app.get('/adminAgents.ejs', (req, res) => {
    res.render('adminAgents', { title: 'Real Estate' });
});

const URL = "mongodb+srv://RealStateProject:F2TP4UiebwSv2zKA@databrs.fu7gdx6.mongodb.net/?retryWrites=true&w=majority&appName=DATABRS";

// MongoDB connection
mongoose.connect(URL)
    .then(() => {
        const server = app.listen(port, () => {
            console.log(`Server is running at http://localhost:${port}`);
        });

        // Setting up livereload
        const liveReloadServer = livereload.createServer();
        liveReloadServer.watch(path.join(__dirname, 'public'));

        liveReloadServer.server.once("connection", () => {
            setTimeout(() => {
                liveReloadServer.refresh("/");
            }, 100);
        });
    })
    .catch((err) => {
        console.log(err);
    });


// POST route to handle signup
app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            if (existingUser.email === email) {
                return res.status(400).json({ field: 'email', message: 'Email already exists.' });
            }
            if (existingUser.username === username) {
                return res.status(400).json({ field: 'username', message: 'Username already exists.' });
            }
        }

        const newUser = new User({ username, email, password });
        await newUser.save();

        console.log('New user saved:', newUser);
        res.status(200).json({ message: 'Successfully signed up!' });
    } catch (err) {
        console.error('Error saving user:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// POST route to handle login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, password });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        res.status(200).json({ message: 'Successfully logged in' });
    } catch (err) {
        console.error('Error logging in:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


// POST route to handle form submission
app.post('/index', (req, res) => {
    const meetingRequest = new MeetingRequest(req.body);
    meetingRequest.save()
        .then(() => {
            res.redirect('/');
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Internal Server Error');
        });
});

//===============================sell requests and posts======================================

app.post('/submit-form', (req, res) => {
    const { title, description, price, location } = req.body;

    let imageFile = req.files.image; 

    const newPost = new PostForSale({
        title,
        description,
        price: parseInt(price), 
        location,
        imagePath: imageFile ? `/uploads/${imageFile.name}` : null 
    });

    // Save to MongoDB
    newPost.save()
        .then(savedPost => {
            // Move the uploaded file to uploads folder
            if (imageFile) {
                imageFile.mv(path.join(__dirname, 'uploads', imageFile.name), (err) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.send('Form submitted successfully! waiting for admin response');
                });
            } else {
                res.send('Form submitted successfully!');
            }
        })
        .catch(err => {
            console.error('Error saving post:', err);
            res.status(500).send('Internal Server Error');
        });
});

app.post('/admin/approve-post', (req, res) => {
    const postId = req.body.postId;
    PostForSale.findByIdAndUpdate(postId, { status: 'approved' }, { new: true })
        .then(updatedPost => {
            res.send('Post approved successfully');
        })
        .catch(err => {
            console.error('Error approving post:', err);
            res.status(500).send('Internal Server Error');
        });
});

app.post('/admin/reject-post', (req, res) => {
    const postId = req.body.postId;
    PostForSale.findByIdAndUpdate(postId, { status: 'rejected' }, { new: true })
        .then(updatedPost => {
            res.send('Post rejected successfully');
        })
        .catch(err => {
            console.error('Error rejecting post:', err);
            res.status(500).send('Internal Server Error');
        });
});

app.get('/sellRequests.ejs', async (req, res) => {
    try {
        const posts = await PostForSale.find({}) || []; 
        console.log('Posts:', posts); 
        res.render('sellRequests', { title: 'Sell Requests', posts: posts });
    } catch (err) {
        console.error('Error fetching posts:', err);
        res.status(500).send('Internal Server Error');
    }
});

//==========================feedback setion===========================

app.post('/submit-feedback', async (req, res) => {
    console.log('Received feedback submission:', req.body);

    const { type, email, name, feedbackType, comment } = req.body;
    const newFeedback = new Feedback({
        type,
        email,
        name,
        feedbackType,
        comment
    });

    console.log('New feedback object:', newFeedback);

    newFeedback.save()
        .then(savedFeedback => {
            console.log('Feedback saved successfully:', savedFeedback);
            res.send('Form submitted successfully!');
        })
        .catch(err => {
            console.error('Error saving feedback:', err);
            res.status(500).send('Internal Server Error');
        });
});

app.get('/clientFeedback.ejs', async (req, res) => {
    try {
        const feedbacks = await Feedback.find({}) || [];     
        console.log("feedbacks: ",feedbacks)    
        res.render('clientFeedback', { feedbacks: feedbacks });
    } catch (err) {
        console.error('Error fetching feedbacks:', err);
        res.status(500).send('Internal Server Error');
    }
});


//============================================================================================


// Import and use adminRoutes
app.use('/admin', adminRoutes);

// Catch-all route for non-existent routes
app.use((req, res) => {
    res.status(404).send('Page not found');
});


// app.use(session({
//     secret: 'your-secret-key',
//     resave: false,
//     saveUninitialized: false
// }));
// app.use(passport.initialize());
// app.use(passport.session());
// const authRoutes = require('./routes/authRoutes');
// app.use('/auth', authRoutes);

// const postRoutes = require('./routes/postRoutes'); 
// app.use('/posts', postRoutes);


