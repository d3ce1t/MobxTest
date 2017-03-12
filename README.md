This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app) using custom-react-scripts.

# Mobx Test
This example tests MobX behaviour when using computed values with filtered and/or sorted arrays.

In this example, MobX store has an observable array with ten items and two computed values, one for filtering the array and the other one for sorting it. The second computed value depends on the first one. Everything works as expected when the computed values return observables. If computed values return an array, abnormal behaviour is produced, i.e. sorting stops working, filtered values get sorted and reactions in autorun are not triggered as expected.

So the questions are:
- Should computed values return observables?
- Why this example doesn't work when computed values return an Array?

# Instructions

**Clone** this repo and run **npm install** and **npm start**. 

A live example is available at [https://d3ce1t.github.io/MobxTest/](https://d3ce1t.github.io/MobxTest/)