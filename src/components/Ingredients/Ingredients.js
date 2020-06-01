import React, { useCallback, useReducer } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import ErrorModal from "../UI/ErrorModal";
import Search from "./Search";

/**
 *
 * TODO:
 *  - loading indicator when applicable
 *
 */

const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case "SET":
      console.log("SET: " + action.ingredients);
      return action.ingredients;
    case "ADD":
      return [...currentIngredients, action.ingredient];
    case "DELETE":
      return currentIngredients.filter(ing => ing.id !== action.id);
    case "TOGGLE_LIKE":
      return currentIngredients.map(ing => {
        return ing.id === action.id ? { ...ing, isLiked: !ing.isLiked } : ing;
      });
    default:
      throw new Error("Should not get here [Ingredients.js]");
  }
};

const httpReducer = (curHttpState, action) => {
  switch (action.type) {
    case "SEND":
      return { ...curHttpState, loading: true };
    case "RESPONSE":
      return { ...curHttpState, loading: false };
    case "ERROR":
      return { loading: false, error: action.errorData };
    case "CLEAR":
      return { ...curHttpState, error: null };
    default:
      throw new Error("[HTTP Reducer, shouldn't get here!");
  }
};

function Ingredients() {
  const [userIngredients, dispatch] = useReducer(ingredientReducer, []);
  const [httpState, dispatchHttp] = useReducer(httpReducer, {
    loading: false,
    error: null
  });

  const { loading } = httpState;

  const addIngredientHandler = useCallback(ingredient => {
    dispatchHttp({ type: "SEND" });
    fetch("https://react-hooks-f5455.firebaseio.com/ingredients.json", {
      method: "POST",
      body: JSON.stringify(ingredient),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => {
        dispatchHttp({ type: "RESPONSE" });
        return res.json();
      })
      .then(responseData => {
        dispatch({
          type: "ADD",
          ingredient: { id: responseData.name, ...ingredient }
        });
      });
  }, []);

  const removeIngredientHandler = useCallback(id => {
    dispatchHttp({ type: "SEND" });
    fetch(`https://react-hooks-f5455.firebaseio.com/ingredients/${id}.json`, {
      method: "DELETE"
    })
      .then(res => {
        dispatchHttp({ type: "RESPONSE" });
        dispatch({ type: "DELETE", id: id });
      })
      .catch(err => {
        dispatchHttp({ type: "ERROR", errorData: "Something went wrong!" });
      });
  }, []);

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    dispatch({ type: "SET", ingredients: filteredIngredients });
  }, []);

  /**
   * Update Firebase
   * Change @isLiked in @state
   */
  const likeIngredientHandler = useCallback(ing => {
    console.log("ing: " + ing);
    dispatchHttp({ type: "SEND" });
    fetch(
      `https://react-hooks-f5455.firebaseio.com/ingredients/${ing.id}/isLiked.json`,
      {
        method: "PUT",
        body: JSON.stringify(!ing.isLiked),
        headers: { "Content-Type": "application/json" }
      }
    )
      .then(res => {
        console.log(res);
        if (res.status === 400) {
          dispatchHttp({
            type: "ERROR",
            errorData: "400 Error when updating isLiked"
          });
        }
        dispatchHttp({ type: "RESPONSE" });
        dispatch({ type: "TOGGLE_LIKE", id: ing.id });
      })
      .catch(err => {
        dispatchHttp({ type: "ERROR", errorData: "Can't update isLiked" });
      });
  });

  const closeError = () => {
    dispatchHttp({ type: "CLEAR" });
  };

  return (
    <div className="App">
      {httpState.error && (
        <ErrorModal onClose={closeError}>{httpState.error}</ErrorModal>
      )}

      <IngredientForm
        onAddIngredient={addIngredientHandler}
        loading={loading}
      />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList
          ingredients={userIngredients}
          onLikeItem={likeIngredientHandler}
          onRemoveItem={removeIngredientHandler}
        />
      </section>
    </div>
  );
}

export default Ingredients;
