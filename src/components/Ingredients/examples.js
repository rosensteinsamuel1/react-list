function likeIng(currentIngredients, id) {
  // const index = currentIngredients.findIndex(ing => ing.id === id);
  // const likedValue = !currentIngredients[index].isLiked;
  //   const updatedIng = {...currentIngredients[index], isLiked: likedValue}

  return currentIngredients.map(ing => {
    return ing.id === id ? { ...ing, isLiked: !ing.isLiked } : ing;
  });
}

const ingredients = [
  { amount: "10", id: 1, isLiked: false, title: "corn" },
  { amount: "22", id: 2, isLiked: false, title: "bread" }
];

console.log(likeIng(ingredients, 2));
