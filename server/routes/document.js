

const express = require('express');
const Document = require('../document');
const documentRouter = express.Router();
const auth = require('../middelweres/auth_middelwere');


documentRouter.post('/doc/create', auth, async (req, res) => {
    try {
        const { createdAt } = req.body;
        let document = new Document({
            uid: req.uid,
            title: "Untitled Document",
            createdAt,
        });

        document = await document.save();
        res.json(document);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

module.exports = documentRouter;