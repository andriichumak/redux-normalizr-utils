import test from 'ava';
import {createStore} from 'redux';

import {entitiesReducer} from '../../'
import {clearEntitiesAction} from '../../'

test('entities reducer should create empty store on init', t => {
	const store = createStore(entitiesReducer);

	t.deepEqual(store.getState(), {});
});

test('entities reducer should record new entities correctly', t => {
	const store = createStore(entitiesReducer, {type1: {id1: {}}});

	store.dispatch({
		type: 'whatever',
		entities: {
			type2: {
				id2: {}
			}
		}
	});

	t.deepEqual(store.getState(), {
		type1: {id1:{}},
		type2: {id2:{}}
	});
});

test('entities reducer should override older records if any', t => {
	const store = createStore(entitiesReducer, {type1:{id1:{test:0}}});

	store.dispatch({
		type: 'whatever',
		entities: {type1:{id1:{test:1}}}
	});

	t.deepEqual(store.getState(), {
		type1:{id1:{test:1}}
	});
});

test('entities reducer should not crash when there is nothing to add', t => {
	const store = createStore(entitiesReducer, {type1: {id1: {}}});

	store.dispatch({
		type: 'whatever'
	});

	t.deepEqual(store.getState(), {type1: {id1: {}}});

	store.dispatch({
		type: 'whatever',
		entities: {}
	});

	t.deepEqual(store.getState(), {type1: {id1: {}}});
});

test('entities reducer should clear entity by type', t => {
	const store = createStore(entitiesReducer, {
		type1:{id1:{}},
		type2:{id2:{}}
	});

	store.dispatch(clearEntitiesAction('type2', true));

	t.deepEqual(store.getState(), {
		type1:{id1:{}}
	});
});

test('entities reducer should clear entity by id', t => {
	const store = createStore(entitiesReducer, {
		type1:{id1:{},id2:{}}
	});

	store.dispatch(clearEntitiesAction('type1', 'id2'));

	t.deepEqual(store.getState(), {
		type1:{id1:{}}
	});
});

test('entities reducer should clear entity by array of ids', t => {
	const store = createStore(entitiesReducer, {
		type1:{id1:{},id2:{},id3:{}}
	});

	store.dispatch(clearEntitiesAction('type1', ['id1','id2']));

	t.deepEqual(store.getState(), {
		type1:{id3:{}}
	});
});

test('entities reducer should not crash if there is nothing to remove', t => {
	const store = createStore(entitiesReducer, {
		type1:{id1:{},id2:{},id3:{}}
	});

	store.dispatch(clearEntitiesAction('type2', true));

	t.deepEqual(store.getState(), {
		type1:{id1:{},id2:{},id3:{}}
	});

	store.dispatch(clearEntitiesAction('type1', 'id4'));

	t.deepEqual(store.getState(), {
		type1:{id1:{},id2:{},id3:{}}
	});

	store.dispatch(clearEntitiesAction('type1', []));

	t.deepEqual(store.getState(), {
		type1:{id1:{},id2:{},id3:{}}
	});

	store.dispatch(clearEntitiesAction('type1', ['id4','id5','id6']));

	t.deepEqual(store.getState(), {
		type1:{id1:{},id2:{},id3:{}}
	});
});
