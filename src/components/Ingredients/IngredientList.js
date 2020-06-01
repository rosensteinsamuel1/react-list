import React from "react";
import Heart from "../../assets/heart.svg";
import HeartSolid from "../../assets/heart-solid.svg";
import DeleteIcon from "../../assets/delete-icon.svg";

import "./IngredientList.css";

const IngredientList = React.memo(props => {
  return (
    <section className="ingredient-list">
      <h2>Loaded Ingredients</h2>
      <ul>
        {props.ingredients.map(ig => (
          <li key={ig.id}>
            <span className="ing__title">{ig.title}</span>
            <span className="ing__amount"> {ig.amount}x</span>

            <span>
              {ig.isLiked ? (
                <img
                  onClick={props.onLikeItem.bind(this, ig)}
                  src={HeartSolid}
                  alt="heart-logo"
                  className="ing__heart"
                />
              ) : (
                <img
                  onClick={props.onLikeItem.bind(this, ig)}
                  src={Heart}
                  alt="heart-logo"
                  className="ing__heart"
                />
              )}
            </span>
            <span>
              <img
                src={DeleteIcon}
                alt="delete-icon"
                className="ing__delete"
                onClick={props.onRemoveItem.bind(this, ig.id)}
              />
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
});

export default IngredientList;
