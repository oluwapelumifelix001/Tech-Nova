const GNEWS_API_KEY = 'ccdae270fb3d4b96ac93ce666f011a0a';
const query = 'artificial intelligence OR machine learning OR robotics OR robots';
const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&max=10&apikey=${GNEWS_API_KEY}`;
fetch(url).then(r=>r.json()).then(console.log).catch(console.error);
