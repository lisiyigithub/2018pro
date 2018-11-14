//朋友圈广告测试环境
const url1 = "http://51starpos.com:8780/marketManage/online/v1";
//朋友圈广告生产环境
//const url1 = "http://starpos.com.cn:8980/marketManage/online/v1";

//星管家测试环境
const url2 = "http://sandbox.starpos.com.cn/estmadp1";
//星管家生产环境
//const url2 = "https://gateway.starpos.com.cn/estmadp2";

//电子发票测试环境
const url3 = "http://invoice-service-test.starpos.com.cn/invoice/rest/v1";
//电子发票生产环境
//const url3 = "http://starpos.com.cn:8780/invoice/rest/v1";

//星POS钱客多测试环境
const url4 = "https://member-test.starpos.com.cn:8680/member/rest/v1"
//星POS钱客多生产环境
//const url4 = "https://member.starpos.com.cn:2080/member/rest/v1"

//钱客多测试+生产环境
const url5 = "https://app.qiankeduo.cn"

//应用商店测试环境
const url6 = "http://51starpos.com:9280/appstore/online/v2";
//应用商店生产环境
//const url6 = "http://starpos.com.cn:9280/appstore/online/v2";

//项目url测试环境
const url7 = "http://starmwx-test.starpos.com.cn/starposAppTest/pages";
//项目url生产环境
//const url7 = "http://find.starpos.com.cn:909/pages";



const API = {
    /**朋友圈广告**/
    //申请订单
    "SAVEFRIEND": url1 + "/firend/saveFriend",
    //查询订单
    "QUERYFRIEND": url1 + "/firend/queryFriend",
    //修改支付状态接口
    "UPDATEFRIEND": url1 + "/firend/updateFriend",

    /**应用商店**/
    //增值服务列表查询
    "GETAPPRECIATIONS": url6 + "/appreciate/getAppreciations",
    //支付结果推送
    "GETPAYSTATUSFAIL": url6 + "/appreciate/getPayStatusFail",
    //订单生成接口
    "SAVEORDERINFO": url6 + "/appreciate/saveOrderInfo",
    //订单状态查询
    "GETORDERINFO": url6 + "/appreciate/getOrderInfo",
    //商户下的所有订单信息查询接口
    "ORDERUSERANDAPPLIST": url6 + "/appreciate/orderUserAndAppList",
    //应用商店筛选商户列表
    "USABLEMERCHANT": url6 + "/appreciate/usableMerchant",

    /**星管家**/
    // 星管家查询绑定商户 过滤台牌
    "CHECKMER": url2 + "/checkmer2.json",
    // 星管家查询绑定商户 不过滤
    "CHECKMER1": url2 + "/checkmer1.json",
    // 星管家查询交易排名
    "QRYTRANRANK": url2 + "/qry_tran_rank.json",
    // 星管家查询终端号 csn号
    "QRYTERMINFO": url2 + "/qry_term_info.json",
    // 账户余额
    "GETTOTALBALANCE": url2 + "/getTotalBalance.json",
    // 开通提现权限
    //"GETENCHASHAUTH":url2 + "/getEnchashAuth.json",				
    "GETENCHASHAUTH": url2 + "/getEnchashAuth1.json",
    // 获取提现信息 
    // "GETENCHASHINFO":url2 + "/getEnchashInfo.json", //demo
    "GETENCHASHINFO": url2 + "/getEnchashInfo1.json",
    // 确认提现
    // "ENCHASHMENT":url2 + "/enchashment.json", //demo
    "ENCHASHMENT": url2 + "/enchashment1.json",
    // 提现结果查询
    // "GETENCHASHLIST":url2 + "/getEnchashList.json",//demo
    "GETENCHASHLIST": url2 + "/getEnchashList1.json",

    // 提现说明文案数据
    // "GETENCHASHLIST":url2 + "/getEnchashList.json",//demo
    "GETEXPLANTEXT": url2 + "/getEnchashLimit.json",

    // 关闭提现

    "CLOSEENCHASHAUTH": url2 + "/closeEnchashAuth.json",

	//自动提现状态更新
	"UPDAUTOD": url2 + "/updAutoD0.json",
	
    //新手引导数据入库
    "INSERTHUGPAGES": url2 + "/insertHugPages.json",
    
     //广告授权状态更新
    "UPD_ADVERTISING_STS": url2 + "/upd_advertising_sts.json",
    
     //是否进行过人脸识别
    "FACETOFACE": url2 + "/facetoface.json",
    
     //人工审核
    "FACE_CHECK": url2 + "/face_check.json",
    
    /**电子发票**/
    //电子发票开通接口
    "OPENSERVICE": url3 + "/merchant/mobile/open",

    /**星POS钱客多**/
    //开通星POS钱客多
    "OPENMEMBER": url6 + "/appreciate/openMember",
    //查询商户是否开通
    "GETMERCHANTINFO": url4 + "/consume/get_merchantInfo",

    //查询商户是否开通(操作员)
    "GETMERCHANTINFO2": url4 + "/merc/add_userAccount",

    /**钱客多**/
    "OPENIDLOGIN": url5 + "/User/OpenIdLogin",
    
    /**广告授权协议**/
    "PROTOCOL": url7 + "/doc/protocol.html"
};