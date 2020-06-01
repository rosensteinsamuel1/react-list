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
          <li key={ig.id} onClick={props.onRemoveItem.bind(this, ig.id)}>
            <span className="ing__title">{ig.title}</span>
            <span className="ing__amount"> {ig.amount}x</span>

            <span>
              {ig.isLiked ? (
                <img src={HeartSolid} alt="heart-logo" className="ing__heart" />
              ) : (
                <img src={Heart} alt="heart-logo" className="ing__heart" />
              )}
            </span>
            <span>
              <img src={DeleteIcon} alt="delete-icon" className="ing__delete" />
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
});

export default IngredientList;
