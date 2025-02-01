function getCategories(movieCategory) {
  const categories = [
    { value: "tv-show", label: "TV Show", selected: false },
    { value: "animation", label: "Animation", selected: false },
    { value: "movie", label: "Movie", selected: false },
    { value: "documentary", label: "Documentary", selected: false },
    { value: "short-film", label: "Short Film", selected: false },
  ];

  const selCategory = categories.find((el) => el.value === movieCategory);
  if (selCategory) {
    selCategory.selected = true;
  }
  return categories;
}

export default getCategories;
