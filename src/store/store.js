import {db} from '../main'

const state = {
    toDoItems: null
};

const actions = {
    SET_ITEMS_ACTION ({commit}) {
        commit('SET_ITEMS')
    }
};

const mutations = {
    SET_ITEMS (state) {
        let items = [];
        db.collection('items').orderBy('createdAt').onSnapshot(snapshot => {
            items = [];
            snapshot.forEach(doc => {
                items.push({
                    id: doc.id,
                    title: doc.data().title
                });
                state.toDoItems = items;
            })
        })
    }
};

export const firstStore = {
    namespaced: true,
    state,
    actions,
    mutations
};