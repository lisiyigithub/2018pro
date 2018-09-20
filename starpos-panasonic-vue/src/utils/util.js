export default {
  //切割url后的参数 格式 ?key1=val1&key2=val2
  //切割url后的参数 格式 ?key1=val1&key2=val2
  getUrlParams(param) {
    var qs = location.search.length > 0 ? location.search.substring(1) : ""
    var args = {}
    var name = null
    var value = null

    //以&为界，切割字符串
    var item1 = qs.length ? qs.split("&") : []
    var item2 = null;

    //遍历数组，二次切割，以=为界
    for (var i = 0; i < item1.length; i++) {
      item2 = item1[i].split("=")
      name = decodeURIComponent(item2[0])
      value = decodeURIComponent(item2[1])
      if (item2.length) {
        args[name] = value
      }
    }
    return args[param];
  },
  //判断星期几 字符串格式20170910
  date2week_string(str) {
    var date = new Date(str.substr(str.length - 8, 4) + '-' + str.substr(str.length - 4, 2) + '-' + str.substr(str.length - 2, 2))
    var week;
    if (date.getDay() == 0) week = "周日"
    if (date.getDay() == 1) week = "周一"
    if (date.getDay() == 2) week = "周二"
    if (date.getDay() == 3) week = "周三"
    if (date.getDay() == 4) week = "周四"
    if (date.getDay() == 5) week = "周五"
    if (date.getDay() == 6) week = "周六"
    return week;
  },
  //判断星期几 时间戳格式
  date2week_date(value) {
    var date = new Date(value)
    var weekday = []

    weekday[0] = "周日"
    weekday[1] = "周一"
    weekday[2] = "周二"
    weekday[3] = "周三"
    weekday[4] = "周四"
    weekday[5] = "周五"
    weekday[6] = "周六"

    var w = weekday[date.getDay()]
    return w
  },
  //将所有金额保留两位小数
  changeFloat(x) {
    var f_x = parseFloat(x);
    if (isNaN(f_x)) {
      return 0;
    }
    var f_x = Math.round(x * 100) / 100;
    var s_x = f_x.toString();
    var pos_decimal = s_x.indexOf(".");
    if (pos_decimal < 0) {
      pos_decimal = s_x.length;
      s_x += ".";
    }
    while (s_x.length <= pos_decimal + 2) {
      s_x += "0";
    }
    return s_x;
  },
  //加逗号
  formatNum(str) {
    str = str.toString();
    var newStr = "";
    var count = 0;

    if (str.indexOf(".") == -1) {
      //   for (var i = str.length - 1; i >= 0; i--) {
      //     if (count % 3 == 0 && count != 0) {
      //       newStr = str.charAt(i) + "," + newStr;
      //     } else {
      //       newStr = str.charAt(i) + newStr;
      //     }
      //     count++;
      //   }
      //   str = newStr + ".00"; //自动补小数点后两位
      //   return str;
    } else {
      for (var i = str.indexOf(".") - 1; i >= 0; i--) {
        if (count % 3 == 0 && count != 0) {
          newStr = str.charAt(i) + "," + newStr;
        } else {
          newStr = str.charAt(i) + newStr; //逐个字符相接起来
        }
        count++;
      }
      str = newStr + (str + "00").substr((str + "00").indexOf("."), 3);
      return str;
    }
  },
  //时间戳转换
  timeTrans(value, t) {
    if (value) {
      var date = new Date(value)
      var Y = date.getFullYear()
      var m = date.getMonth() + 1
      var d = date.getDate()
      var H = date.getHours()
      var i = date.getMinutes()
      var s = date.getSeconds()
      if (m < 10) {
        m = '0' + m
      }
      if (d < 10) {
        d = '0' + d
      }
      if (H < 10) {
        H = '0' + H
      }
      if (i < 10) {
        i = '0' + i
      }
      if (s < 10) {
        s = '0' + s
      }

      var t1 = Y + '-' + m + '-' + d + ' ' + H + ':' + i + ':' + s
      var t2 = Y + '/' + m + '/' + d
      var t3 = date
      var t4 = Y + '-' + m + '-' + d

      var ObjTime = {
        "all": t1,
        "ymd": t2,
        "dateObj": t3,
        "yymmdd": t4,
      }
      if (t) {
        switch (t) {
          case 't1':
            return t1
            break;
          case 't2':
            return t2
            break;
          case 't3':
            return t3
            break;
          case 't4':
            return t4
            break;
        }
      } else {
        return t1
      }
    } else {
      return ''
    }
  },
  GetAge(identityCard) {
    var len = (identityCard + "").length;
    var strBirthday = "";
    if (len == 18) //处理18位的身份证号码从号码中得到生日和性别代码
    {
      strBirthday = identityCard.substr(6, 4) + "/" + identityCard.substr(10, 2) + "/" + identityCard.substr(12, 2);
    }
    if (len == 15) {
      strBirthday = "19" + identityCard.substr(6, 2) + "/" + identityCard.substr(8, 2) + "/" + identityCard.substr(10, 2);
    }
    //时间字符串里，必须是“/”
    var birthDate = new Date(strBirthday);
    var nowDateTime = new Date();
    var age = nowDateTime.getFullYear() - birthDate.getFullYear();
    //再考虑月、天的因素;.getMonth()获取的是从0开始的，这里进行比较，不需要加1
    if (nowDateTime.getMonth() < birthDate.getMonth() || (nowDateTime.getMonth() == birthDate.getMonth() && nowDateTime.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  },
  //弹出框函数
  massage(that, str, title) {
    if (str) {
      that.$alert(str, title, {
        confirmButtonText: "确定",
        type: "info",
        customClass: "loan-box",
        closeOnClickModal: true,
      });
    } else {
      that.$alert("服务器开小差了，请稍后再试", "", {
        confirmButtonText: "确定",
        type: "info",
        customClass: "loan-box",
        closeOnClickModal: true,
      });
    }

  },
  //sesstion存取数据（有就创建，没有返回false）
  sesstionData(obj) {
    let dataObj = JSON.parse(window.sessionStorage.getItem(obj));
    console.log(dataObj);
    if (dataObj !== null) {
      console.log(`sesstion中有${dataObj}对象`);
      return dataObj;
    } else {
      // let obj = {
      //   merId: this.merId, //商户id
      //   merName: this.merName //商户名称
      // };
      // obj = JSON.stringify(obj);
      // window.sessionStorage.setItem("dataObj", obj);
      console.log(`sesstion中没有${dataObj}对象`);
      return false;
    }
  },

  //扫码进件 获取设备参数(参数名字，字符串网址)
  getsmParams(name,result){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var yurl = result; //"http://pospay.starpos.com.cn/sys/432.do?sn_no=SP1806&jigou=216boya&stat=on6";
    var surl = yurl.split("?")[1];
    var r = surl.substr(0).match(reg);
    if (r!=null) return unescape(r[2]); return null;
  },
  
}
