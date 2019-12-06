export function removeStore() {
  localStorage.removeItem("ideas");
}

export function set(ideas) {
  removeStore();
  localStorage.setItem("ideas", JSON.stringify(ideas));
  return true;
}

export function get() {
  const ideas = JSON.parse(localStorage.getItem("ideas") || "[]");
  return ideas;
}
