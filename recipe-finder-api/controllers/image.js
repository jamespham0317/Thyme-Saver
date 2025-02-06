const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyCrBud7_xvLaRAVMBtSTgHCOl1Nm0vJzwk");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const handleApiCall = async (req, res) => {
  const prompt = "Explain how AI works";
  try {
    const result = await model.generateContent(prompt);
    const generatedText = result.response.text();  // Use .text()!
    // console.log("Generated Text:", generatedText);
    res.json({ text: generatedText }); // Send just the text to the client (or the whole result if needed)
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: "Error calling Gemini API" });
  }
}

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    // If you are using knex.js version 1.0.0 or higher this now returns an array of objects. Therefore, the code goes from:
    // entries[0] --> this used to return the entries
    // TO
    // entries[0].entries --> this now returns the entries
    res.json(entries[0].entries);
  })
  .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
  handleImage,
  handleApiCall
}