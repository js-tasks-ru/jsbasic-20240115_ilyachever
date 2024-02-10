function hideSelf() {
  const button = document.querySelector('.hide-self-button');

  function hideSelf() {
    this.setAttribute('hidden', true);
  }

  button.addEventListener('click', hideSelf);
}
