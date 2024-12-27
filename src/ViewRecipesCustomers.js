import './App.css';
import React , {useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Link, useLocation} from 'react-router-dom';
window.Buffer = window.Buffer || require("buffer").Buffer;

function ViewRecipesCustomers() 
{
  const navigate = useNavigate();
  const { state } = useLocation();
  const [listOfRecipes, setListOfRecipes] = useState([]);

  useEffect(() => {
    if( state == "" || state == null){
    navigate('/home');
    }
    else{
        const restaurantId = state.restaurantId
        const restaurantName = state.restaurantName
    //   setRestaurantId(state.restaurantID)
      console.log(restaurantId)

      const fetchRecipes = async () =>{
        debugger
        console.log(restaurantId)
            await fetch("https://kjsdpccsruapocfyv3ogk4r3p40cxvnp.lambda-url.us-east-1.on.aws/" , {
            method: "POST",
            body: JSON.stringify({
            restaurantId: restaurantId
            })
        })
        .then((res) => res.json()).then((res)=>{
            if(res.status){
                setListOfRecipes(res.data);
            }
            else{
            alert("Error in finiding feedbacks.")
            }
        }); 
        }
        fetchRecipes();
    }
}, []);

  return ( 
    <div>
        <div className="home_title" align = "center"><h1>Halifax Foodies</h1></div>
        <br></br>
        <div>
          <div className="home_title" align = "center"><h2>{state.restaurantName}</h2></div>

          <div align = "center">
                {listOfRecipes.map((recipes) => {return (<div class="box" align = "left"><h3>Id : {recipes.RecipeID} <br></br> Name : {recipes.RecipeName} <br></br> Price : {recipes.RecipePrice} <br></br> Description : {recipes.RecipeDescription} </h3></div>)})}
          </div>
        </div>
        </div>
  )
}
export default ViewRecipesCustomers;