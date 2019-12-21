function sortCriteriaGenerator(accessor, { asc = true, desc = false }) {
  return (a, b) => {
    const textA = accessor(a);
    const textB = accessor(b);
    if (typeof textA === "number")
      return asc && !desc ? textA - textB : textB - textA;
    return asc && !desc
      ? textA.localeCompare(textB)
      : textB.localeCompare(textA);
  };
}

module.exports = sortCriteriaGenerator;
