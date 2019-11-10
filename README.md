# CRDT Continuous Sequence

## Install

```
npm i -s crdt-continuous-sequence
```

## Usage with plain array

```js
import { ContinuousSequence } from 'crdt-continuous-sequence'

const cs = new ContinuousSequence();

const todos = [
    {
        id: 1
        name: "Groceries"
    },
    {
        id: 2,
        name: "Cleaning"
    },
    {
        id: 3,
        name: "Admin"
    }
]

// move 'Admin' between 'Groceries' and 'Cleaning'
cs.move(todos[2], todos[0], todos[1]);
cs.sort(todos);
console.log(todos);
```

## Usage with GUN

```js
import Gun from 'gun/gun'
import { GunContinuousSequence } from 'crdt-continuous-sequence'

const gun = Gun();

cs = new GunContinuousSequence(gun);

// Initialize sequence
gun.get('todos')
    .set({ name: "Groceries" })
    .set({ name: "Cleaning"})
    .set({ name: "Admin" })

// Load items
const todos = [];
gun.get('todos').map().on(todo => {
    let index
    if ((index = todos.findIndex(todo['_']['#'])) > -1) {
        todos[index] = {...todos[index], todo}
    } else {
        todos.push(todo)
    }
    cs.sort(todos);
})

// Later

// move 'Admin' between 'Groceries' and 'Cleaning'
cs.move(todos[3], todos[0], todos[1])
```
