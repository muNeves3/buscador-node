//simplificação.js


function generateTags(movie) {
  const regex = /[\s,\,;:\(\)\-']/;
  let tags = [];
  tags.push(...movie.title.toUpperCase().split(regex));
  tags.push(movie.year.toString());

  if(movie.cast)
    tags = tags.concat(...movie.cast.map(actor=> actor.toUpperCase().split(regex)));

  if(movie.countries)
    tags = tags.concat(...movie.countries.map(country=> country.toUpperCase().split(regex)));

  if(movie.directors) 
    tags = tags.concat(...movie.directors.map(director=> director.toUpperCase().split(regex)));

  if(movie.genres)
    tags = tags.concat(...movie.genres.map(genre=> genre.toUpperCase().split(regex)));

  return tags;
}


function updateMovies(movies) {
  movies.map((movie)=> {
    console.log(movie.title);
    movie.tags = generateTags(movie);
    global.conn.collection('netflix2').insertOne(movie);
  })
}


function findAllMovies() {
  return global.conn.collection('netflix').find({}).toArray();
}

const mongoClient = require('mongodb').MongoClient;
mongoClient.connect('mongodb://localhost:27017/netflix')
  .then(conn=> {
    global.conn = conn.db('netflix');
    return findAllMovies();
  })
  .then(arr=> updateMovies(arr))
  .catch(err=> console.log(err));

module.exports = {}