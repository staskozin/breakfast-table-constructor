export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('btc-state');
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
}

export const saveState = state => {
  try {
    localStorage.setItem('btc-state', JSON.stringify(state));
  } catch {}
}
