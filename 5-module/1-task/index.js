function hideSelf() {
  const button = document.querySelector('.hide-self-button');

  function hide() {
    this.setAttribute('hidden', true);
  }

  button.addEventListener('click', hide);
}
