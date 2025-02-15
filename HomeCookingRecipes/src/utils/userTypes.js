const getUserType = (recipe, user) => {
  const isUser = !!user;
  const isOwner = user && user.id === recipe.owner.toString();
  const isLiked =
    user && recipe.recommendList.includes(user.id);

  return {
    isUser,
    isOwner,
    isLiked,
  };
};

export default getUserType;
