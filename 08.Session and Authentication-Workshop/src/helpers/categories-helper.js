function getCategories(movieCategory) {
  const categories = [
    { value: "tv-show", label: "TV Show"},
    { value: "animation", label: "Animation"},
    { value: "movie", label: "Movie"},
    { value: "documentary", label: "Documentary"},
    { value: "short-film", label: "Short Film"},
  ];

  const selCategory = categories.find((el) => el.value === movieCategory);
  if (selCategory) {
    selCategory.selected = 'selected';
  }
  return categories;
}

export default getCategories;
