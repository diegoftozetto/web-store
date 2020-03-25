import { http } from './config'

export default {
    list: () => {
        return http.get('pessoas')
    },

    save: (person) => {
        return http.post('pessoas', person)
    },

    update: (person) => {
        return http.put('pessoas/' + person.id, person)
    },

    delete: (person) => {
        return http.delete('pessoas/' + person.id, person)
    }
}