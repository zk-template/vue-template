/*
 * @Description: 
 * @Author: wangfpp
 * @LastEditors: wangfpp
 * @Date: 2019-04-16 17:05:04
 * @LastEditTime: 2019-04-16 17:05:42
 */
import { _$ } from '@js/comm.js';
export default {
    install(Vue, options) {
        // if (options.developmentOff && process.env.NODE_ENV === 'development') return
        Vue.config.errorHandler = (error, vm, mes) => {
            console.log(error, error.message, mes);
            let info = {
                levelname: 'ERROR',
                dt: _$.getTime(new Date(), true),
                type: 'Forend',
                code: 0,
                msg: error,
                exc_text: error.message,
                exc_info: error.name,
                name: window.location.href,
                module: 'web'
            };
        }
    }
};