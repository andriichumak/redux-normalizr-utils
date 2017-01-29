import test from 'ava';

import {clearEntitiesAction} from '../../'
import {ENTITY_CLEAR} from '../../constants'

test('clearEntitiesAction must support "true" as 2nd argument', t => {
	const action1 = clearEntitiesAction('schemaName', true);

	t.deepEqual(action1, {
		type: ENTITY_CLEAR,
		schemaName: 'schemaName',
		removeAll: true
	});
});

test('clearEntitiesAction must support String as 2nd argument', t => {
	const action1 = clearEntitiesAction('schemaName', '123');

	t.deepEqual(action1, {
		type: ENTITY_CLEAR,
		schemaName: 'schemaName',
		entityIds: ['123']
	});
});

test('clearEntitiesAction must support String[] as 2nd argument', t => {
	const action1 = clearEntitiesAction('schemaName', ['123', '456']);

	t.deepEqual(action1, {
		type: ENTITY_CLEAR,
		schemaName: 'schemaName',
		entityIds: ['123', '456']
	});
});