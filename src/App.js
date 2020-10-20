import React, { useEffect, useState } from 'react';
import './App.css';
import Recipe from './Recipe';

const App = () => {

  const APP_ID = 'idHere';
  const APP_KEY = 'appKeys';

  // `` are called backticks, or template literals with them in JavaScript
  // template literals are string literals allowing embedded expressions
  // can contain placeholders (${expression}). 
  const exampleRequest = `URL here`;

  // this is how to use state in function component
  // taking data into the state, and passing them to props in <Recipe />
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('default');

  // this method works only when [arg] is changed
  useEffect(() => {
    getRecipes();
  }, [query]);

  // fetching data from external? async and await or promise and then
  const getRecipes = async () => {
    // wait for hitting API and get data
    const response = await fetch(exampleRequest);
    // formatting the response to json
    const data = await response.json();

    // it wouldve been like this with promise and then
    // fetch(exampleRequest)
    // .then(response => {
    //   response.json
    // })

    setRecipes(data.hits);
    console.log(data.hits);
  }

  const updateSearch = event => {
    setSearch(event.target.value);
    console.log(search);
  }

  const getSearch = event => {
    event.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
        <button className="search-button" type="submit">Search</button>
      </form>
      <div className="recipes">
        {recipes.map(recipe => (
          // 1. recipe = map's arg, 2. recipe = obj name fetched, 3. label = name to display
          <Recipe 
            // the key props need to be something unique
            key={recipe.recipe.label}
            title={recipe.recipe.label} 
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
            />
        ))}
      </div>
    </div>
  )
}

export default App;
