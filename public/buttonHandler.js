// wordnikApi.js

const apiKey = 'YOUR_WORDNIK_API_KEY'; // Replace with your Wordnik API key

async function searchWord(word) {
  const apiUrl = `https://api.wordnik.com/v4/word.json/${word}/definitions?api_key=${apiKey}`;
  
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    return data;
  } catch (error) {
    console.error('Error fetching data from Wordnik API:', error);
    return null;
  }
}
