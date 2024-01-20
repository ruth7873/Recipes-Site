import * as Actions from './action'

const initalseState = {
    recipes: []
}

const reducerRecipe = (state = initalseState, action) => {
    switch (action.type) {
        case Actions.SET_RECIPE:
            return { ...state, recipes: action.data }
        case Actions.ADD_RECIPE: {
            const recipes = [...state.recipes];
            recipes.push(action.data);
            return { ...state, recipes }
        }
        case Actions.EDIT_RECIPE: {
            const recipes = [...state.recipes];
            const findIndex = recipes.findIndex(x => x.Id === action.data.Id);
            recipes[findIndex] = action.data;
            return { ...state, recipes }
        }
        case Actions.DELETE_RECIPE: {
            const recipes = state.recipes.filter(x => x.Id !== action.data)
            return { ...state, recipes }
        }
        default: return { ...state }
    }
}

export default reducerRecipe;