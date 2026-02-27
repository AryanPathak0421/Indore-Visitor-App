import { config } from 'dotenv';

// Load environment variables
config();

const API_KEY = process.env.GEMINI_API_KEY;
console.log('Listing available models for key:', API_KEY ? 'Key exists' : 'Key missing');

async function listModels() {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`);
    
    console.log('Response status:', response.status);
    
    const data = await response.json();
    
    if (response.ok) {
      console.log('\n✅ Available Models:');
      if (data.models && data.models.length > 0) {
        data.models.forEach(model => {
          console.log(`- ${model.name} (${model.displayName})`);
          console.log(`  Methods: ${model.supportedGenerationMethods?.join(', ') || 'None'}`);
          console.log('');
        });
      } else {
        console.log('No models found. Gemini API may not be enabled.');
      }
    } else {
      console.log('\n❌ Failed to list models:');
      console.log(JSON.stringify(data, null, 2));
      
      if (data.error?.message) {
        console.log('\n🔧 This usually means:');
        console.log('1. Gemini API is not enabled for this project');
        console.log('2. The API key is from a different project');
        console.log('3. Billing needs to be enabled');
        
        console.log('\n🔧 TO FIX:');
        console.log('1. Go to https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com');
        console.log('2. Enable the Gemini API for your project');
        console.log('3. Make sure the API key is from the correct project');
      }
    }
    
  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
  }
}

listModels();
