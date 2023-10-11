import { createStore } from "vuex"
import axios from 'axios'

const store = createStore({
    state: {
        users: []
    },
    mutations: {
        updateUsers(state, data) {
            state.users = data
        }
    },
    actions: {
        async loadUsers(context, { value, type, onComplete }) {
            let searchParams = ''
            if (value.includes(',')) {
                const values = value.replace(/\s/g, '').split(',')

                values.map((value, index) => {
                    if (value) {
                        let param = '?'
                        if (index > 0) {
                            param = '&'
                        }
                        searchParams += `${param}${type}=${value}`
                    }
                })
            } else {
                searchParams = `?${type}=${value}`
            }

            const res = await axios.get('https://jsonplaceholder.typicode.com/users' + searchParams)
            if (res.data) {
                setTimeout(() => {
                    context.commit('updateUsers', res.data)
                    onComplete()
                }, 250)
            } else {
                setTimeout(() => {
                    context.commit('updateUsers', [])
                    onComplete()
                }, 250)
            }
        }
    }
})

export default store