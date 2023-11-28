const http = require('http');

const apiKey = 'f19t7bxksz6iy0kfbbkerrmczfnv4r3davqplbn33ysrl7ses'; // Replace with your Wordnik API key

function fetchData(url) {
  return new Promise((resolve, reject) => {
    const request = http.get(url, (response) => {
      let data = '';

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        resolve(JSON.parse(data));
      });
    });

    request.on('error', (error) => {
      reject(error);
    });

    request.end();
  });
}

async function getRandomWord() {
  const url = `http://api.wordnik.com:80/v4/words.json/randomWord?api_key=${apiKey}`;
  try {
    const response = await fetchData(url);
    return response.word;
  } catch (error) {
    console.error('Error fetching random word:', error.message);
    throw error;
  }
}

async function getWordOfTheDay() {
  const url = `http://api.wordnik.com:80/v4/words.json/wordOfTheDay?api_key=${apiKey}`;
  try {
    const response = await fetchData(url);
    return response.word;
  } catch (error) {
    console.error('Error fetching word of the day:', error.message);
    throw error;
  }
}

// Example usage:
// Uncomment and run the following lines to test the functions

// getRandomWord().then(word => console.log('Random Word:', word));
// getWordOfTheDay().then(word => console.log('Word of the Day:', word));

module.exports = {
  getRandomWord,
  getWordOfTheDay,
};
