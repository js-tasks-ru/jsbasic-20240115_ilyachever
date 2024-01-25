let calculator = {
  read(a, b) {
    this.a = this.getInputValue(a);
    this.b = this.getInputValue(b);
  },
  sum() {
    return this.a + this.b;
  },
  mul() {
    return this.a * this.b;
  },
  getInputValue(value) {
    value = parseFloat(value);

    if (!value || !isFinite(value)) {
      return 0;
    }

    return value;
  }
};

// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально
