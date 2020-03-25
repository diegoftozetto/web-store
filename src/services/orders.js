import {http} from './config'

export default{
    list: () => {
        return http.get('pedidos')
    },

    save: (order) => {
        return http.post('pedidos', order)
    },

    update: (order) => {
        return http.put('pedidos/' + order.id, order)
    },

    delete: (order) => {
        return http.delete('pedidos/' + order.id, order)
    }
}