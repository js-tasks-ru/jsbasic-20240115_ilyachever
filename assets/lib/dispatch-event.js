export default function dispatchEvent(rootElement, eventName, detail) {
  if (!rootElement || !eventName) return;

  const event = new CustomEvent(eventName, {
    detail,
    bubbles: true
  });

  rootElement.dispatchEvent(event);
}
