# redux-normalizr-utils
[![Build Status: Linux](https://travis-ci.org/andreychumak/redux-normalizr-utils.svg?branch=master)](https://travis-ci.org/andreychumak/redux-normalizr-utils)

## Motivation

When working with redux + normalizr to load data from server, developers have to write a LOT of boilerplate code.

## Solution

A set of simple utilities to reduce boilerplate and allow developer concentrate on business logic.

## Disclaimer

You might want to read [this](http://redux.js.org/docs/recipes/ReducingBoilerplate.html) before you include any utils to your code.

This project was created for specific use case and might not fit your set up. Plenty of similar projects lurking out there in the wild. Try them out if this one does not cover your use case.

## Usage

```javascript
// Somewhere in ./reducers/index.js
import { combineReducers } from 'redux'
import { entityReducer } from 'redux-normalizr-utils'

import * as myReducers from './myReducers'

// Set-up reducer along with your own
export default combineReducers({
    ...myReducers,
    entities: entityReducer
});
```

Now any action that has ```entities``` key will be processed by reducer. Entities will be saved to store. It's expected that ```entities``` is produced by normalizr or have exactly same structure as normalizr would provide.

This way you can dispatch your actions, handle them with your reducers in order to e.g. set loading state, but entity storage will be managed automatically for you. 

And this is how you clear entities, that are not needed anymore:
```javascript
import { clearEntitiesAction } from 'redux-normalizr-utils'

const store = getStoreFromSomewhere();

// Kill all entities of schema 'nameOfSchema'
store.dispatch(clearEntitiesAction('nameOfSchema', true));

// Kill only one entity by it's name of schema and ID
store.dispatch(clearEntitiesAction('nameOfSchema', id));

// Kill several entities by schema name and ids array
store.dispatch(clearEntitiesAction('nameOfSchema', [id1, id2, id3]));
```

## Include only what's needed

You can use only what you need and avoid including complete library. For example:

```javascript
// Load only action
import { clearEntitiesAction } from 'redux-normalizr-utils/actions/entity'

// Load only reducer
import { entityReducer } from 'redux-normalizr-utils/reducers/entity'
```
