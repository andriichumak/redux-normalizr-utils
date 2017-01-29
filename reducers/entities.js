import {ENTITY_CLEAR} from '../constants'

const defaultState = {};

/**
 * A generic reducer to handle store of entities
 * @param state
 * @param action
 * @returns {*}
 */
export function entitiesReducer (state, action) {
	if (!state) {
		state = defaultState;
	}

	if (action.type === ENTITY_CLEAR) {
		// Drop some part of the entity storage
		state = dropEntity(state, action);
	}

	if (action.entities) {
		// Add some entities to the store
		state = mergeEntities(state, action);
	}

	return state;
}

/**
 * Remove entity from store
 */
function dropEntity(state, {schemaName, entityIds = [], removeAll = false}) {
	if (!state[schemaName])
		return state;

	if (removeAll) {
		state = {...state};
		delete state[schemaName];
		return state;
	}

	if (!entityIds.length)
		return state;

	// Clone current state
	state = {...state, [schemaName]: {...state[schemaName]}};
	entityIds.forEach(entityId => {
		delete state[schemaName][entityId];
	});

	return state;
}

/**
 * Simply merge all new entities to the store
 */
function mergeEntities(state, {entities}) {
	const entityNames = Object.keys(entities);

	if (!entityNames.length)
		return state;

	state = {...state};

	for (let entityName of entityNames) {
		state[entityName] = {...state[entityName], ...entities[entityNames]};
	}

	return state;
}