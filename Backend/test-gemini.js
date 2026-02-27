import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from 'dotenv';

// Load environment variables
config();

// Test the Gemini API key
const API_KEY = process.env.GEMINI_API_KEY;
console.log('Testing API Key:', API_KEY ? 'Key exists' : 'Key missing');
console.log('API Key length:', API_KEY?.length || 0);

if (!API_KEY) {
  console.error('No API key found in environment variables');
  console.log('Available env vars:', Object.keys(process.env).filter(key => key.includes('GEMINI')));
  process.exit(1);
}

async function testGeminiAPI() {
  try {
    console.log('Initializing Gemini AI...');
    const genAI = new GoogleGenerativeAI(API_KEY);
    
    // Try different model names that are more likely to work
    const models = [
      'gemini-1.5-flash-latest',
      'gemini-1.5-flash-001',
      'gemini-pro-vision',
      'gemini-1.5-pro-latest',
      'gemini-1.5-pro-001'
    ];
    
    for (const modelName of models) {
      try {
        console.log(`Testing with ${modelName} model...`);
        const model = genAI.getGenerativeModel({ model: modelName });
        
        console.log('Sending test request...');
        const result = await model.generateContent('Hello, can you tell me about Rajwada Palace in Indore? Keep it brief.');
        const response = await result.response;
        const text = response.text();
        
        console.log(`\n✅ SUCCESS with ${modelName}! Gemini API is working.`);
        console.log('Response:', text);
        return modelName; // Return the working model name
        
      } catch (modelError) {
        console.log(`❌ ${modelName} failed:`, modelError.message);
        continue; // Try next model
      }
    }
    
    console.log('\n❌ All models failed. API key may not have Gemini API enabled or quota exceeded.');
    
  } catch (error) {
    console.error('\n❌ ERROR: Gemini API failed');
    console.error('Error details:', error.message);
    
    if (error.message.includes('API_KEY_INVALID')) {
      console.log('\n🔧 TO FIX THIS:');
      console.log('1. Go to https://makersuite.google.com/app/apikey');
      console.log('2. Create a new API key or verify your existing one');
      console.log('3. Enable the Gemini API at https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com');
      console.log('4. Make sure billing is set up for your Google Cloud project');
      console.log('5. Update the GEMINI_API_KEY in your .env file');
    } else if (error.message.includes('403') || error.message.includes('Permission')) {
      console.log('\n🔧 TO FIX THIS:');
      console.log('1. Enable the Gemini API at: https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com');
      console.log('2. Make sure billing is enabled for your project');
      console.log('3. Check if your API key has the right permissions');
    }
  }
}

testGeminiAPI();
