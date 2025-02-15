const getUserType = (device, user) => {
  const isUser = !!user;
  const isOwner = user && user.id === device.owner.toString();
  const isLiked =
    user && device.preferredList.includes(user.id);

  return {
    isUser,
    isOwner,
    isLiked,
  };
};

export default getUserType;
