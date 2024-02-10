function toggleText() {
  const trigger = document.querySelector('.toggle-text-button');

  if (!trigger) return;

  trigger.addEventListener('click', toggleElementVisibility);
}

function toggleElementVisibility() {
  const textElement = document.querySelector('#text');

  if (!textElement) return;

  if (textElement.hasAttribute('hidden')) {
    textElement.removeAttribute('hidden');
  } else {
    textElement.setAttribute('hidden', true);
  }
}
