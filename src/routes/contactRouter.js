const express = require('express');
const router = express.Router();
const multer = require('multer')
const {Contact} = require('../models/contact');

const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error('invalid image type');

        if(isValid){
            uploadError = null
        }
        cb(uploadError, 'public/upload')
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.split(' ');
        const extension = FILE_TYPE_MAP[file.mimetype];
        cb(null, `${Date.now()}.${extension}`);
    }
})
const upload = multer({ storage: storage })

router.get('/', async (req, res) => {
    const pageOptions = {
        page: parseInt(req.query.page, 10) || 0,
        limit: parseInt(req.query.limit, 10) || 10
    }

    let search = {};
    const q = req.query.search
    if(q) {
        search = { "$or": [
            { name: {$regex: new RegExp(q)} },
            { phoneNumber: { $regex: new RegExp(q) } }
        ]}
    }
    const ContactList = await Contact.find(search).skip(pageOptions.page * pageOptions.limit)
        .limit(pageOptions.limit);

    if(!ContactList) {
        res.status(500).json({success: false});
    }
    res.send(ContactList);
});

router.get('/:id', async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact)
        return res.status(404).send('The contact with the given ID was not found.');

    res.status(200).send(contact);
})

router.post(`/`, upload.single('picture'), async (req, res) => {
    const fileName = req.file.filename;
    const basePath = `${req.protocol}://${req.get('host')}/public/upload/`
    const contact = new Contact({
        name: req.body.name,
        picture: `${basePath}${fileName}`,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address
    });

    const contacts = await contact.save()

    if(!contacts)
    return res.status(404).send('The contact cannot be created!');

    res.status(200).send(contacts);
});

router.put('/:id', async (req, res) => {
    const contact = await Contact.findByIdAndUpdate(
        req.params.id, {
            name: req.body.name,
            picture: req.body.picture,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address
        },
        { new: true }
    );

    if (!contact)
        return res.status(404).send('The contact cannot be updated!');

    res.status(200).send(contact);
})

router.delete('/:id', (req, res) => {
    Contact.findByIdAndRemove(req.params.id)
    .then(contact=>{
        if(contact){
            return res.status(200).json({
                success: true,
                message: 'Contact deleted successfully.'
            })
        } else {
            return res.status(404).json({
                success: false,
                message: 'Contact id not found'
            })
        }
    })
    .catch(err => res.status(500).json({
        success: false,
        error: err
    }))
});

module.exports = router;