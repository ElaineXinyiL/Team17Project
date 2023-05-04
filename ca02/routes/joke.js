const express = require('express');
const router = express.Router();
// const User = require('../models/User')
const { openai } = require("../util");

router.get("/joke", (req, res) => {
  res.render("joke");
});

router.post("/joke", async (req, res) => {
  const prompt = req.body.prompt;
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.8,
    });
    // pass prompt and answer parameters
    res.render(
      "/joke/result", 
      {prompt: prompt, answer: completion.data.choices[0].text}
    )
  } catch(error) {
    console.log(error);
  }
});

module.exports = router;