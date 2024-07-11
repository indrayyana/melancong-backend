/* eslint-disable quote-props */
/* eslint-disable object-shorthand */
/* eslint-disable no-useless-escape */
/* eslint-disable no-restricted-syntax */
const { VertexAI } = require('@google-cloud/vertexai');

// Initialize Vertex with your Cloud project and location
const vertex_ai = new VertexAI({ project: 'melanc0ng', location: 'asia-southeast1' });
const model = 'gemini-1.5-flash-001';

// Instantiate the models
const generativeModel = vertex_ai.preview.getGenerativeModel({
  model: model,
  generationConfig: {
    'maxOutputTokens': 8192,
    'temperature': 1,
    'topP': 0.95,
  },
  safetySettings: [
    {
      'category': 'HARM_CATEGORY_HATE_SPEECH',
      'threshold': 'BLOCK_MEDIUM_AND_ABOVE',
    },
    {
      'category': 'HARM_CATEGORY_DANGEROUS_CONTENT',
      'threshold': 'BLOCK_MEDIUM_AND_ABOVE',
    },
    {
      'category': 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
      'threshold': 'BLOCK_MEDIUM_AND_ABOVE',
    },
    {
      'category': 'HARM_CATEGORY_HARASSMENT',
      'threshold': 'BLOCK_MEDIUM_AND_ABOVE',
    },
  ],
});

const giveRecommend = async (prompt) => {
  const text1 = {
    text: `You are a chatbot for a website offering travel tips and information about Bali. Provide specific and detailed travel tips based on the user's query.

    User's query: ${prompt}

    Offer recommendations on cultural experiences, local cuisine, and travel tips. Ensure your suggestions are easy to understand and practical for travelers. Write in a structured paragraph format without mentioning specific tourist destinations, especially Ulun Danu Beratan Temple`,
  };

  const req = {
    contents: [{ role: 'user', parts: [text1] }],
  };

  const streamingResp = await generativeModel.generateContentStream(req);
  let aggregatedResponse = '';

  for await (const item of streamingResp.stream) {
    if (item.candidates && item.candidates.length > 0) {
      aggregatedResponse += item.candidates[0].content.parts[0].text;
    }
  }

  // Clean the response
  const cleanResponse = aggregatedResponse
    // .replace(/\\n/g, ' ') // Replace \n with space
    .replace(/\*\*/g, '') // Remove **
    .replace(/\*/g, '') // Remove *
    // .replace(/\\\"/g, '\"') // Replace escaped quotes
    // .replace(/\n/g, ' ') // Replace actual newlines with space
    // .replace(/\s\s+/g, ' ') // Replace multiple spaces with a single space
    // .replace(/^#+\s*/, '') // Remove leading #
    .trim();

  return cleanResponse;
};

module.exports = {
  giveRecommend,
};
