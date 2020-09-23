# spreadsheet

This is a simple web based spreadsheet.
## Supported Formulas:

Note thatn formulas   **MUST** begin with `=` otherwise, they will be treated as text.

- ### Sum of range e.g `=SUM(A1:A4)`
  This gets the sum from `A1 to A4`


- ### Sum of cells e.g `=SUM(A1, A2, A3)`
  This gets the sum of `A1`, `A2` and `A3`  
  **Note**: You can chain functions e.g `=SUM(SUM(A1:A4), A5, A6)`

- ### Average of range e.g `=AVG(A1:A4)`
  This gets the average from `A1 to A4`
  **Note**: You can chain functions e.g `=AVG(SUM(A1:A4), SUM(A2, A4, A5))`

- ### Simple arithmetic operations e.g `=A1 + A4 * A5 / A3`
  This solves the arithmetic operation following precedence rules.
  **Note**: You could also do `=SUM(A1:A4) + AVG(A2, A3, A4) / A8 * A9`

## Limitations:

I was not able to achieve mainly due to time was reactivity. Where a cell should react to changes of any cell that it Is dependent on. I will be working on this and will resubmit if the deadline is not reached by then. For now you have to click on the cell, then click elsewhere for it to update itself.

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```
Then navigate to `localhost:8080` on your favourite browser.

### Compiles and minifies for production
```
yarn build
```

### Run your unit tests
```
yarn test:unit
```

### Run your end-to-end tests
```
yarn test:e2e
```

### Lints and fixes files
```
yarn lint
```
