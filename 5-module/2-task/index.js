function toggleText() {
  const trigger = document.querySelector('.toggle-text-button');

  if (!trigger) return;

  trigger.addEventListener('click', toggleElementVisibility);
}

function toggleElementVisibility() {
  const textElement = document.querySelector('#text');

  if (!textElement) return;

  textElement.hidden = !textElement.hidden;
}
