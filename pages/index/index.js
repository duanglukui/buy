
const JSONbig = require('../../miniprogram_npm/json-bigint/index.js');//引入npm下载的文件         miniprogram_npm/json-bigint/index.js
const decode = require( "../../utils/base64.js");

var app = getApp();          
Page({
  data:{
    banquan: app.globalData.banquan,
    ip: '',
    show_r: '',
    show_img: 'yes',
    imageBase64Str: '',
    location: '',
    height: '100%'
  },  
 
  banquan: function () {
    
  },
  
  queryIp: function (res) {
    let that = this;
    // 允许从相机和相册扫码
    wx.scanCode({
      success(res) {
        console.log(res);
        var location_text = "";

        if (res.result == "*" || res.result == ""){
          location_text = "【二维码内容】：" + decode(res.rawData);
        }else{
          location_text = "【二维码内容】：" + res.result;          
        }        

        function getCaption(obj,state) {
          var index=obj.lastIndexOf(" ");
          if(state==0){
          obj=obj.substring(0,index);
          }else {
          obj=obj.substring(index+1,obj.length);
          }
          return obj;
          }
          


          
          location_text = location_text + "\r\n\n【数字签名是否正确】：" ;
          var qian = res.result
          var hou = res.result
          var data = res.result
         
          //截取符号前面部分
          qian=getCaption(data,0) //输出aaa
          //截取符号后面部分
          hou=getCaption(data,1) //输出bbb */;
          
          var miwen = JSONbig.parse(qian);
          var qianming = JSONbig.parse(hou);

        //  qian = BigInteger(qian)  
        //  hou = BigInteger(hou)
          // 
          
          // Math.pow(qian,3) % 2491     e=3 d=1595 n=2491
           
          function mi( x,  y, mod) {  
            var res = 1;  
            while(y)  
            {  
                if(y & 1) {
                    res =  (res * x) % mod; 
                }
                x = (x * x) % mod;  
                y = y / 2;  
            }  
            return res;  
        }  

          // function mi(a,b,m)
          // {
          //     var r=1;
          //     a %=m;
          //     while(b>1)
          //     {
          //         if((b&1)!=0)
          //             r = Math.pow(r*a)%m;
          //         a = Math.pow(a*a)%m;
          //         b/=2;    
          //     }
          //     return Math.pow(r*a)%m;    
          // }     e=3 d=1595 n=2491
          // 大数 BigInteger                   5  773  2021

          // if(Math.pow(miwen ,5) % 2021 == qianming  ){location_text = location_text+"正确";}else{location_text = location_text+"错误";}
          //if(Math.pow(qianming ,773) % 2021 == miwen  ){location_text = location_text+"正确";}else{location_text = location_text+"错误";} 
          // if(Math.pow(1234 ,5) % 2021 == 1001 ){location_text = location_text+"正确";}else{location_text = location_text+"错误";} 
          //if(mi(qianming ,773,2021) == miwen ){location_text = location_text+"正确";}else{location_text = location_text+"错误";}
          if(mi(miwen,5,2021) == qianming ){location_text = location_text+"正确";}else{location_text = location_text+"错误";}

          //签名用  5,773,2021    加密用 3 1595 2491    e d n
          location_text = location_text + "\r\n\n【产品编号】："+mi(miwen,1595,2491);

          //if(qian%1==50){location_text = location_text+"真品";}else{location_text = location_text+"赝品";}


       /*  location_text = location_text + "\r\n\n【数字签名是否正确】：" ;

        if (res.scanType == "QR_CODE" || res.scanType == "DATA_MATRIX" || res.scanType == "PDF_417"){
          location_text = location_text+"（二维码）";
        } else if (res.scanType == "WX_CODE"){
          location_text = location_text + "（小程序码）";
        }else{
          location_text = location_text + "（一维码）";
        } */


       /*  location_text = location_text + "\r\n\n【字符集】：" + res.charSet;
        if (res.path != "undefined" && res.path != "" && res.path != null ){
          location_text = location_text + "\r\n\n【Path】：" + res.path;
        } */

        that.setData({
          show_r: 'yes',
          show_img: '',
          location: location_text
        })
      },
      fail(res) {
        console.log(res);
        /*that.setData({
          show_r: 'yes',
          show_img: '',
          location: "识别错误：\r\n" + res.errMsg
        })*/
      },
      complete(res) {

      }
    })    
  },

  // 一键复制事件
  copyBtn: function (e) {
    var that = this;
    wx.setClipboardData({
      //准备复制的数据
      data: that.data.location,
      success: function (res) {
        wx.showToast({
          title: '复制成功',
        });
      }
    });
  },

  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    },
  onReady:function(){
    // 页面渲染完成    
    
  },
  /**
     * 生命周期函数--监听页面显示
     */
  onShow: function () {
    app.pages = getCurrentPages();
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  // 设置页面分享
  onShareAppMessage: function () {
    return {
      title: '二维码(条形码)解码器',
      path: '/pages/index/index'
    }
  }
})