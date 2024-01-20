import * as Actions from './action'

const initalseState = {
    buies: [],
}
const reducerBuy = (state = initalseState, action) => {
    switch (action.type) {
        case Actions.SET_BUY: {
            return { ...state, buies: action.data.filter(x => x.Count > 0) }
        }
        case Actions.EDIT_BUY: {
            const buies = [...state.buies];
            let index = buies.findIndex(x => x.Name === action.data.Name)
            if (index === -1) {
                buies.push(action.data);
            }
            else {
                if (action.data.Count === 0) {
                    buies.splice(index, 1)
                }
                else {
                    buies[index] = action.data
                }
            }
            return { ...state, buies }

        }
        case Actions.DELETE_BUY: {
            const buies = state.buies.filter(x => x.Name !== action.data?.Name)
            return { ...state, buies }
        }
        default: return { ...state }
    }
}
export default reducerBuy;