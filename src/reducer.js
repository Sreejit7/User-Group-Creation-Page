export const initialState = {
  members: [],
  name:null,
  desc:""
}
const reducer = (state,action) => {
    switch(action.type){
      case 'ADD_MEMBER':
        return {...state, members:[...state.members, action.item]};
      case 'REMOVE_MEMBER':
        const index=state.members.findIndex(
          (item)=> item.id===action.id
        );
        let newMembers = [...state.members];
        if(index>=0){
            newMembers.splice(index,1);
        }
        return {...state, members: newMembers};
      case 'SET_NAME':
        return {...state, name: action.name};
      case 'SET_DESC':
        return {...state, desc: action.desc};
      default:
        return state;
    }
}
export default reducer;