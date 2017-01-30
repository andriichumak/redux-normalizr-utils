import { ENTITY_CLEAR } from '../constants'

/**
 *
 * @param schemaName {String}
 * @param entityIdentifier {Boolean|String|String[]}
 */
export function clearEntitiesAction(schemaName, entityIdentifier) {
	const action = {type: ENTITY_CLEAR, schemaName};

	if (entityIdentifier === true) {
		// Kill all entities
		action.removeAll = true;
	} else if (typeof entityIdentifier === 'string') {
		// Kill single entity
		action.entityIds = [entityIdentifier];
	} else if (Array.isArray(entityIdentifier)) {
		// Kill several entities by id
		action.entityIds = entityIdentifier.map(id => ('' + id).trim()).filter(id => !!id);
	}

	return action;
}