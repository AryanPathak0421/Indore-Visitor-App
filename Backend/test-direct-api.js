import { config } from 'dotenv';

// Load environment variables
config();

const API_KEY = process.env.GEMINI_API_KEY;
console.log('Testing direct REST API with key:', API_KEY ? 'Key exists' : 'Key missing');
console.log('API Key:', API_KEY);

async function testDirectAPI() {
  try {
    // Try with gemini-2.5-flash which we know is available
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: "Hello, can you tell me about Rajwada Palace in Indore? Keep it brief."
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      }),
    });

    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);

    const data = await response.json();
    console.log('Response data:', JSON.stringify(data, null, 2));

    if (response.ok) {
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      console.log('\n✅ SUCCESS! Direct API is working.');
      console.log('Response:', text);
    } else {
      console.log('\n❌ Direct API failed');
      if (data.error?.message) {
        console.log('Error message:', data.error.message);
        
        if (data.error.message.includes('API_KEY_INVALID')) {
          console.log('\n🔧 TO FIX THIS:');
          console.log('1. The API key is invalid or expired');
          console.log('2. Create a new API key at https://makersuite.google.com/app/apikey');
          console.log('3. Make sure Gemini API is enabled for the project');
        } else if (data.error.message.includes('quota')) {
          console.log('\n🔧 QUOTA ISSUE:');
          console.log('Free quota exceeded. Enable billing or wait for reset.');
        }
      }
    }

  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
  }
}

testDirectAPI();
