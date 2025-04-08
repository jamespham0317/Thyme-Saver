const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs').promises;
const Base64 = require('base64-js');
const path = require('path');

require('dotenv').config();
const apiKey = process.env.API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const handleApiCall = async (req, res) => {
  try {
    const imagePath = path.join(__dirname, '..', 'uploads', 'uploaded-file.jpg');
    const fileBuffer = await fs.readFile(imagePath);
    const imageBase64 = Base64.fromByteArray(new Uint8Array(fileBuffer));

    let contents = [
      {
        role: 'user',
        parts: [
          { inline_data: { mime_type: 'image/jpeg', data: imageBase64, } },
          { text: 'Determine whether the image depicts a food item. If it does not, respond with "There is no food in this image." If it does, respond with what the food item is and respond with a recipe for the food item.' }
        ]
      }
    ];

    const result = await model.generateContentStream({ contents });
    let fullResult = '';
    for await (let response of result.stream) {
      fullResult += response.text();
    }
    res.json(fullResult);
  } catch (err) {
    console.log("Error calling API:", err);
  }
}

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0].entries);
  })
  .catch(err => res.status(400).json('Error getting entries:', err))
}

module.exports = {
  handleImage,
  handleApiCall
}