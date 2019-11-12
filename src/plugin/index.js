/*
 * @Description: 
 * @Author: wangfpp
 * @LastEditors: wangfpp
 * @Date: 2019-04-16 17:02:55
 * @LastEditTime: 2019-04-16 17:27:08
 */
import { plugin } from '@conf/plugin.js';
export default (Vue) => {
    for (let name in plugin) {
        const value = plugin[name]
        Vue.use(require(`./${name}`).default, typeof value === 'object' ? value : undefined)
    }
};