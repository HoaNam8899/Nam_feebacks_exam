const express = require("express");
const router = express.Router();
const fs = require("fs");
// get all 
router.get("/", (req, res) => {
    let feedback = fs.readFileSync(`${__dirname}/../data/feedbacks.json`);
    feedback = JSON.parse(feedback)
    res.json(feedback);
});

router.post("/", (req, res) => {
    let data = JSON.parse(fs.readFileSync(`${__dirname}/../data/feedbacks.json`));
    let newFeedback = {
        ...req.body,
        id: Math.floor(Math.random() * 100000000)
    }
    data.unshift(newFeedback);
    fs.writeFileSync(`${__dirname}/../data/feedbacks.json`, JSON.stringify(data));
    res.json({
        message: "post"
    })
});

router.patch("/:id", (req, res) => {
    let { id } = req.params
    let data = JSON.parse(fs.readFileSync(`${__dirname}/../data/feedbacks.json`));

    let feedbackIndex = data.findIndex((e, i) => e.id === +id);
    data[feedbackIndex].content = req.body.content;
    fs.writeFileSync(`${__dirname}/../data/feedbacks.json`, JSON.stringify(data));
    res.json({
        message: "Edit successfully"
    })
});
router.delete("/:id", (req, res) => {
    let { id } = req.params
    let data = JSON.parse(fs.readFileSync(`${__dirname}/../data/feedbacks.json`));
    let feedbackIndex = data.findIndex((e, i) => e.id === +id);
    data.splice(feedbackIndex, 1);
    fs.writeFileSync(`${__dirname}/../data/feedbacks.json`, JSON.stringify(data));
    res.json({
        message: "Deleted"
    })
});

module.exports = router;