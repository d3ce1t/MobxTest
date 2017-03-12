import React from 'react';
import ReactDOM from 'react-dom';
import { observable, computed, action } from 'mobx';
import { autorun } from 'mobx';
import { observer } from 'mobx-react';

class Store {
  @observable items = [
    { id: 1, name: 'test 1', new: true },
    { id: 2, name: 'test 2', new: true },
    { id: 3, name: 'test 3', new: true },
    { id: 4, name: 'test 4', new: true },
    { id: 5, name: 'test 5', new: true },
    { id: 6, name: 'test 6', new: false },
    { id: 7, name: 'test 7', new: false },
    { id: 8, name: 'test 8', new: false },
    { id: 9, name: 'test 9', new: false },
    { id: 10, name: 'test 10', new: false },
  ];
  @observable filter = false;
  @observable sort = false;

  @computed get filtered() {
    var filtered = this.items;
    if (this.filter) {
      filtered = observable(this.items.filter( item => item.new ));
    }
    console.log('Compute filtered', filtered);
    return filtered;
  }

  @computed get sorted() {
    var sorted = this.filtered;
    if (this.sort) {
      sorted = observable(this.filtered.sort((a, b) => {
        if (a.name < b.name) {
          return 1;
        } else if (a.name > b.name) {
          return -1;
        }
        return 0;
      }));
    }
    console.log('Compute sorted', sorted);
    return sorted;
  }
  
  @action toggleSorted() {
  	this.sort = !this.sort;
  }
  @action toggleFiltered() {
  	this.filter = !this.filter;
  }
}

const store = new Store();
window.store = store;

@observer
class App extends React.Component {
  sortHandler() {
    store.toggleSorted();
  }
  filterHandler() {
  	store.toggleFiltered();
  }
  render() {
    const sorted = store.sorted.map( item => <li key={item.id}>{item.name}</li>);
    const filtered = store.filtered.map( item => <li key={item.id}>{item.name}</li>);
    return (
      <div>
        <button onClick={this.filterHandler}>Toggle Filter: {store.filter ? 'true' : 'false'}</button>
        <button onClick={this.sortHandler}>Toggle Sort: {store.sort ? 'true' : 'false'}</button>
        <h3>Filtered</h3>
        <ul>{filtered}</ul>
        <h3>Sorted</h3>
        <ul>{sorted}</ul>
      </div>
    );
  }
}

autorun(() => {
  console.log('Sorted reaction', store.sorted.length);
});

autorun(() => {
  console.log('Filtered reaction', store.filtered.length);
});

ReactDOM.render(
  <App />,
  document.getElementById('root')
);