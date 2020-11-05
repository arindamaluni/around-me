export default function promotions(promos = [], action) {
  switch (action.type) {
    case "SET_PROMOS":
      return action.payload;
    default:
      return promos;
  }
}
