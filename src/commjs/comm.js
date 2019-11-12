/*
 * @Description: 
 * @Author: wangfpp
 * @LastEditors: wangfpp
 * @Date: 2019-04-16 16:53:28
 * @LastEditTime: 2019-04-16 16:55:57
 */
let fileDownload = require('js-file-download')
const _$ = {
    isObjectValueEqual(a, b) {
        // Of course, we can do it use for in Create arrays of property names
        var aProps = Object.getOwnPropertyNames(a);
        var bProps = Object.getOwnPropertyNames(b);
        // If number of properties is different, objects are not equivalent
        if (aProps.length != bProps.length) {
          return false;
        }
        for ( var i = 0; i < aProps.length; i++ ) {
          var propName = aProps[i];
          // If values of same property are not equal, objects are not equivalent
          if (a[propName] !== b[propName]) {
            return false;
          }
        }
        // If we made it this far, objects are considered equivalent
        return true;
    },
	distinct_arr_element( arr ){
        if( !arr ) return null ;
        var resultArr = [];
       for(var i = 0; i < arr.length; i++) {
           var notExist = true ;
           var el = arr[i]
           for(var j = 0; j < resultArr.length; j++){
               var element = resultArr[j]
            if( _$.isObjectValueEqual( el, element ) ){
              notExist = false ;
              continue
            }   
           }
          if( notExist ) 
            resultArr.push( el );
       }
        return resultArr ;
    },
    deepCopy(o) { //　数组或对象的深拷贝
        if (o instanceof Array) {
            var n = []
            for (var i = 0; i < o.length; ++i) {
                n[i] = this.deepCopy(o[i])
            }
            return n

        } else if (o instanceof Object) {
            if (o instanceof Date) {
                let [year, month, day, hour, minute, seconds, mill] = [o.getFullYear(), o.getMonth() + 1, o.getDate(), o.getHours(), o.getMinutes(), o.getSeconds(), o.getMilliseconds()];
                let ndate = new Date(year,month,day,hour,minute,seconds, mill)
                return ndate;
            } else {
                var n = {}
                for (var i in o) {
                    n[i] = this.deepCopy(o[i])
                }
                return n
            }
        } else {
            return o
        }
    },
    calTime(num) {
        let [hour, min, sec] = [_$.doubleNum(parseInt(num / 3600) % 24) , _$.doubleNum(parseInt(num / 60) % 60) , _$.doubleNum(parseInt(num % 60))]
        if (parseInt(hour) > 0) {
            return `${hour}:${min}:${sec}`;
        } else {
            return `${min}:${sec}`;
        }
    },
    doubleNum(num) { // 返回两位实数
        if (num < 10) {
            return String('0' + num);
        } else {
            return num;
        }
    },
    getWeekNumber(y, m, d) {
        var targetDay = new Date(y, m - 1, d);
        var year = targetDay.getFullYear();
        var days = targetDay.getDate();
        var Dateday = targetDay.getDay() === 0 ? 7 : targetDay.getDay();
        // 那一天是 那一年中的第多少天
        for (var i = 1; i < m; i++) {
            days += _$.getMonthDays(year, i);
        }
        // 那一年第一天是星期几
        // var yearFirstDay = new Date(year, 0, 1).getDay();
        // 计算是第几周
        // days += yearFirstDay;
        var week = Math.ceil(days / 7);
        return { weekIndex: week, weekNum: Dateday };
    },
    /**
     *判断年份是否为润年
     */
    isLeapYear(year) {
        return (year % 400 === 0) || (year % 4 === 0 && year % 100 !== 0);
    },
    /**
     *获取某年某月的天数
     */
    getMonthDays(year, month) {
        return [31, (_$.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1];
    },
    getTreeData(arr) { // 处理成Iview Tree能直接使用的数据
        for (let index = arr.length - 1; index >= 0; index--) {
            let ele = arr[index];
            if (ele.type) {
                ele.selected = index === 0 ? true : false;
                if (ele.bindings && ele.children) {
                    delete ele.children;
                    ele.children = ele.bindings;
                    this.getTreeData(ele.bindings);
                }
            } else {
                arr.splice(index, 1);
            }
        }
        return arr;
    },
    createStamp(date, type) { // 产生时间戳S以秒为单位m以毫秒为单位
        let timeStamp = date.getTime();
        switch (type) {
            case 's':
                return timeStamp / 1000;
            case 'm':
                return timeStamp;
        }
    },
    filterObj(obj) { // 过滤Object
        for (const key in obj) {
            if (obj[key] === '' || obj[key] === null || obj[key] === undefined) {
                delete obj[key]
            }
        }
        return _$.deepCopy(obj);
    },
    fileDownload(res, name) { // 下载流文件
        let fileName = '';
        if (name) {
            fileName = name;
        } else {
            fileName = res.headers['content-disposition'].split(";")[1].split("=")[1];
            fileName = decodeURI(fileName, 'utf-8');
        }
        fileDownload(res.data, fileName);
    },
    hasOneOf(targetarr, arr) {
        return targetarr.some(_ => arr.indexOf(_) > -1)
    },
    getTime(date, sec = false) {
        let year = date.getFullYear(),
            month = _$.doubleNum(date.getMonth() + 1),
            day = _$.doubleNum(date.getDate()),
            hour = _$.doubleNum(date.getHours()),
            minute = _$.doubleNum(date.getMinutes()),
            seconds = _$.doubleNum(date.getSeconds());
        return sec ? `${year}-${month}-${day}  ${hour}:${minute}:${seconds}` : `${year}-${month}-${day}  ${hour}:${minute}`;
    },
    convertBase64UrlToBlob(urlData, type) {   // base64TOBolb
        var bytes=window.atob(urlData.split(',')[1]);        //去掉url的头，并转换为byte  
        //处理异常,将ascii码小于0的转换为大于0  
        var ab = new ArrayBuffer(bytes.length);  
        var ia = new Uint8Array(ab);  
        for (var i = 0; i < bytes.length; i++) {  
            ia[i] = bytes.charCodeAt(i);  
        }
        return new Blob( [ab] , {type : type}); 
    },
    dataURLtoFile(dataurl, filename) {//将base64转换为文件
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type:mime});
    }
};
// module.exports = { _$ };
export { _$ };