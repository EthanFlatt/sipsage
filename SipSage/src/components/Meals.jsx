import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Meals = () => {
  const [meals, setMeals] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getMeals = async () => {
      try {
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef');
        setMeals(response.data.meals);
        console.log(response);
      } catch (error) {
        console.error('Error fetching meals:', error);
      }
    };

    getMeals();
  }, []);

  const showMeals = (meal) => {
    navigate(`${meal.idMeal}`);
  };

  const mealListStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '20px',
    marginTop: '20px',
    maxWidth: '800px',
    
  };

  const mealCardStyle = {
    cursor: 'pointer',
    padding: '10px',
    backdropFilter: 'blur(5px)',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: '5px',
    textAlign: 'center',
  };

  const mealTitleStyle = {
    fontSize: '16px',
    marginBottom: '10px',
  };
  const headingStyle = {
    fontSize: '24px',  
    marginBottom: '10px',
    color: 'white',
    backdropFilter: 'blur(5px)',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  };

  return meals ? (
    <div className="mealListPage">
      <h2 style={headingStyle}>Meals</h2>
      <div style={mealListStyle}>
        {meals.map((meal) => (
          <div style={mealCardStyle} onClick={() => showMeals(meal)} key={meal.idMeal}>
            <h3 style={mealTitleStyle}>{meal.strMeal}</h3>
            <img src={meal.strMealThumb} alt={meal.strMeal} />
          </div>
        ))}
      </div>
    </div>
  ) : (
    <h3>Getting hungry...</h3>
  );
};

export default Meals;
