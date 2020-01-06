const express = require('express')
require('../db/mongoose')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()
const sharp = require('sharp')
const { sendWelcomeEmail, sendCancelEmail } = require('../emails/account')
const multer = require('multer')
const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Upload a image file'))
        }

        cb(undefined, true)
    }
})

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({width: 250, height: 250}).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) =>{
    res.status(400).send({ error: error.message})
})

router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()

    res.send()
})

router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user || !user.avatar) {
            throw new Error()
        }

        res.set('Content-type', 'image/png')
        res.send(user.avatar)

    } catch (e) {
        res.status(404).send()
    }
})


router.post('/users/login', async (req, res) =>{
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        
        res.send({user, token})
    } catch (e) {
        res.status(400).send()
    }
})

router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        sendWelcomeEmail(user.email, user.name)
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    } catch (e) {
        res.status(400).send(e)
    }
    // user.save().then((result) => {
    //     res.status(201).send(result)
    // }).catch((error) => {
    //     res.status(400).send(error)
    // })
})

router.post('/users/logout', auth, async(req, res) => {
    const user = req.user
    try {
        user.tokens = user.tokens.filter(token => {return token.token !== req.token})
        await user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async(req, res) => {
    const user = req.user

    try {
        user.tokens = []
        await user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/users/me', auth, async (req, res) => {
    // try {
    //     const users = await User.find({})
    //     res.send(users)
    // } catch (e) {
    //     res.status(500).send()
    // }
    // User.find({}).then((result) => {
    //     res.send(result)
    // }).catch((error) => {
    //     res.status(500).send()
    // })
    res.send(req.user)
})

// router.get('/users/:id', async (req, res) => {
//     const _id = req.params.id

//     try {
//         const user = await User.findById(_id)
//         if (!user) {
//             return res.status(404).send()
//         }
//         res.send(user)
//     } catch (e) {
//         res.status(500).send()
//     }
    
//     // User.findById(_id).then((result) => {
//     //     if (!result) {
//     //         return res.status(404).send()
//     //     }
//     //     res.send(result)
//     // }).catch((error) => {
//     //     res.status(500).send()
//     // })
    
// })

router.patch('/users/me', auth, async (req,res) => {
    // const _id = req.params.id
    const allowedUpdates = ['name', 'password', 'email', 'age']
    const updates = Object.keys(req.body)
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid Updates'})
    }

    try {
        // const user = await User.findById(_id)
        const user = req.user

        updates.forEach(update => {
            user[update] = req.body[update]
        });

        await user.save()
        // const user = await User.findByIdAndUpdate(_id, req.body, {new: true, runValidators: true})

        // if (!user) {
        //     return res.status(404).send()
        // }

        res.send(user)

    } catch (e) {
        res.status(400).send(e)
    }

})

router.delete('/users/me', auth, async (req, res) => {
    // const _id = req.user._id

    try {
        // const user = await User.findByIdAndDelete(_id)
        
        // if (!user) {
        //     return res.status(404).send()
        // }
        await req.user.remove()
        sendCancelEmail(req.user.email, req.user.name)
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router