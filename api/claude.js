// Vercel Serverless Function
// Calls OpenAI instead of Anthropic, but reshapes the response to match
// what the frontend already expects: { content: [{ type: "text", text: "..." }] }
// This means index.html needs ZERO changes beyond pointing at "/api/claude".

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error: 'Server is missing OPENAI_API_KEY. Add it in your Vercel project Settings -> Environment Variables, then redeploy.'
    });
  }

  try {
    const { system, messages, max_tokens } = req.body || {};

    if (!messages) {
      return res.status(400).json({ error: 'Request body must include "messages".' });
    }

    // OpenAI expects the system prompt as the first message in the array,
    // rather than as a separate field like Anthropic does.
    const openaiMessages = [
      { role: 'system', content: system || '' },
      ...messages
    ];

    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // cheap + fast + plenty capable for explanations/quizzes/chat
        max_tokens: max_tokens || 500,
        messages: openaiMessages
      })
    });

    const data = await openaiResponse.json();

    if (!openaiResponse.ok) {
      return res.status(openaiResponse.status).json({
        error: (data && data.error && data.error.message) || 'OpenAI API request failed.'
      });
    }

    const text = data.choices && data.choices[0] && data.choices[0].message
      ? data.choices[0].message.content
      : '';

    if (!text) {
      return res.status(500).json({ error: 'OpenAI returned an empty response.' });
    }

    // Reshape into the same format the frontend already parses,
    // so index.html doesn't need to know or care which AI provider answered.
    return res.status(200).json({
      content: [{ type: 'text', text: text }]
    });
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Unexpected server error.' });
  }
}
