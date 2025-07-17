const express = require("express");
const axios = require("axios");
const router = express.Router();
require("dotenv").config();


async function summarizeText(text) {
    const HF_API_TOKEN = process.env.HuggingFaceKey;
    const MODLE_URL = 'https://api-inference.huggingface.co/models/facebook/bart-large-cnn';
    try {
        console.log("send to the LLM")
        const response = await axios.post(
            MODLE_URL,
            {inputs: text},
            {
                headers: {
                    Authorization : `Bearer ${HF_API_TOKEN}`,
                    'content-type': 'application/json'
            },
                timeout: 30000,
            });
        console.log("back from the LLM");
        //console.log(response);
        return response.data[0].summary_text;
    }catch(err) {
        console.log(err);
    }
}

router.get("/group/:groupId", async (req, res) => {
    const groupId = req.params.groupId;
try {
    const response = await axios.get(`http://localhost:5000/api/posts/getAllPostsOfgroup/${groupId}`);
    const posts = response.data;
    const postsText = posts.map(post => post.body).join(' ').slice(0, 1024);
    if (!postsText) {
        res.status(400).json({error:'No post content found for this group'});
    }
    const summarizedText = await summarizeText(postsText);
    return res.status(200).json(summarizedText);
}catch (err){
    console.log(err);
    res.status(500).json({error:'Something went wrong'});
}
})
router.post("/post", async (req, res) => {
    console.log("start summarize post")
    try {
        const textToSummarize = req.body.text;
        if (!textToSummarize) {
            return res.status(400).json({error:'No text found to summarize'});
        }else {
            const summarizedText = await summarizeText(textToSummarize);
            return res.status(200).json(summarizedText);
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Something went wrong'});
    }

})
module.exports = router;