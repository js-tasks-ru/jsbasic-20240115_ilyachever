export default function promiseClick(button) {
  return new Promise((resolve) => {
    function handleClick(event) {
      resolve(event);
    }
    button.addEventListener("click", handleClick, { once: true });
  });
}
