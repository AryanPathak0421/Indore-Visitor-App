import express from 'express';

const router = express.Router();

// Chat endpoint using direct REST API
router.post('/ask', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    console.log('Testing API key:', process.env.GEMINI_API_KEY ? 'Key exists' : 'Key missing');

    // Use direct REST API approach since it's working
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are a helpful travel assistant for Indore, India. Provide friendly, informative, and detailed responses about Indore's tourist attractions, food, hotels, transport, events, and general travel information. Be conversational and provide comprehensive information. Include specific details, recommendations, tips, and helpful context. Always complete your thoughts and provide full, complete answers. Aim for responses between 200-400 words to be thorough and helpful. Make sure to finish your response completely without cutting off mid-sentence.\n\nUser: ${message}\n\nAssistant:`
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          },
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
        console.log('✅ Success with real Gemini API!');
        
        res.json({ 
          success: true, 
          response: text.trim() 
        });
      } else {
        throw new Error(data.error?.message || `API Error: ${response.status}`);
      }
    } catch (error) {
      console.log('Gemini API failed, using mock response:', error.message);
      
      // Fallback mock responses
      const mockResponses = [
        "Indore is the largest city in Madhya Pradesh and known as the 'Food Capital of India'. It's famous for its street food, particularly Poha, Samosa, and Garadu. The city has a rich cultural heritage with landmarks like Rajwada Palace and Lal Bagh Palace.",
        "Indore offers a variety of attractions including the Kanch Mandir (Glass Temple), Khajrana Ganesh Temple, and the Central Museum. Don't miss trying the local street food at Sarafa Bazaar, which transforms into a food market at night.",
        "For accommodation in Indore, you can find various options from luxury hotels like Sayaji Hotel and Marriott to budget-friendly guesthouses. The city is well-connected by road, rail, and air, making it easily accessible.",
        "The best time to visit Indore is during the winter months from October to March when the weather is pleasant. The city hosts several festivals and events, including the Rang Panchami festival which is celebrated with great enthusiasm."
      ];

      // Return a relevant mock response based on keywords
      let mockResponse = mockResponses[0]; // default
      
      const lowerMessage = message.toLowerCase();
      if (lowerMessage.includes('food') || lowerMessage.includes('eat') || lowerMessage.includes('poha')) {
        mockResponse = mockResponses[0];
      } else if (lowerMessage.includes('place') || lowerMessage.includes('visit') || lowerMessage.includes('temple')) {
        mockResponse = mockResponses[1];
      } else if (lowerMessage.includes('hotel') || lowerMessage.includes('stay') || lowerMessage.includes('accommodation')) {
        mockResponse = mockResponses[2];
      } else if (lowerMessage.includes('weather') || lowerMessage.includes('time') || lowerMessage.includes('when')) {
        mockResponse = mockResponses[3];
      }

      res.json({ 
        success: true, 
        response: mockResponse + "\n\n*Note: Currently using demo responses due to API issues. Real AI responses will be available shortly.*"
      });
    }

  } catch (error) {
    console.error('Chat API Error:', error);
    
    let errorMessage = "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.";
    
    if (error.message) {
      if (error.message.includes("403") || error.message.includes("Permission") || error.message.includes("API_KEY_INVALID")) {
        errorMessage = "API access denied. Please check if the API key is valid and has the necessary permissions. Make sure the Gemini API is enabled in your Google Cloud Console.";
      } else if (error.message.includes("404")) {
        errorMessage = "The API endpoint was not found. Please verify the API configuration.";
      } else if (error.message.includes("429")) {
        errorMessage = "Too many requests. Please wait a moment and try again.";
      } else if (error.message.includes("500") || error.message.includes("503")) {
        errorMessage = "The service is temporarily unavailable. Please try again in a few moments.";
      }
    }

    res.status(500).json({ 
      success: false, 
      error: errorMessage 
    });
  }
});

export default router;
