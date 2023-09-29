import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    const calculator: {
      displayValue: string;
      firstOperand: number | null;
      waitingForSecondOperand: boolean;
      operator: string | null;
    } = {
      displayValue: '0',
      firstOperand: null,
      waitingForSecondOperand: false,
      operator: null,
    };

    function updateDisplay() {
      const display: HTMLInputElement | null =
        document.querySelector('.screen-calc');
      if (display) {
        display.value = calculator.displayValue;
      }
    }

    function resetCalculator() {
      calculator.displayValue = '0';
      calculator.firstOperand = null;
      calculator.waitingForSecondOperand = false;
      calculator.operator = null;
    }

    updateDisplay();

    const keys: HTMLElement | null = document.querySelector('.btn-calc');
    if (keys) {
      keys.addEventListener('click', (event) => {
        const target = event.target as HTMLButtonElement;
        if (!target.matches('button')) {
          return;
        }

        if (target.classList.contains('operator')) {
          handleOperator(target.value);
          updateDisplay();
          return;
        }

        if (target.classList.contains('decimal')) {
          inputDecimal(target.value);
          updateDisplay();
          return;
        }

        if (target.classList.contains('clear')) {
          resetCalculator();
          updateDisplay();
        }

        inputDigit(target.value);
        updateDisplay();
      });
    }

    function inputDigit(digit: string) {
      const { displayValue, waitingForSecondOperand } = calculator;

      if (waitingForSecondOperand === true) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
      } else {
        calculator.displayValue =
          displayValue === '0' ? digit : displayValue + digit;
      }
    }

    function inputDecimal(dot: string) {
      if (calculator.waitingForSecondOperand === true) {
        return;
      }
      if (!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot;
      }
    }

    const performCalculation: {
      [operator: string]: (
        firstOperand: number,
        secondOperand: number
      ) => number;
    } = {
      '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
      '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
      '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
      '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
      '=': (firstOperand, secondOperand) => secondOperand,
    };

    function handleOperator(nextOperator: string) {
      const { firstOperand, displayValue, operator } = calculator;
      const inputValue = parseFloat(displayValue);

      if (operator && calculator.waitingForSecondOperand) {
        calculator.operator = nextOperator;
        return;
      }

      if (firstOperand === null) {
        calculator.firstOperand = inputValue;
      } else if (operator) {
        const currentValue = firstOperand || 0;
        const result = performCalculation[operator](currentValue, inputValue);
        calculator.displayValue = String(result);
        calculator.firstOperand = result;
      }
      calculator.waitingForSecondOperand = true;
      calculator.operator = nextOperator;
    }
  }
}
