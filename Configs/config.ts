/**==================================================================
 * 이름 : 미들웨어 서버 기본 설정(JSON)
 * 설명 :
 *   - 미들웨어에서 사용되는 기본 설정을 하는 부분
 * 
 * 일시 | 이름 | 설명
 * 2021-04-18 lee hee sang 최초 파일 생성 및 설정
 ==================================================================*/

'use strict'
var isDev = require('isdev')

import * as jsonschema from './jsonschema'
import { HTTPSERVERCONFIG, DBSERVERCONFIG, REDISSERVERCONFIG } from './jsonschema'

import { messaging } from 'firebase-admin'

//#region firebase 설정 : Start ================================================

var alerttitle : string = 'test'
var alertbody : string = '알람 발생하였습니다.'


var firebaseMessage : messaging.Message = {
    
    notification: {
        title: alerttitle,
        body: alertbody,
        imageUrl: '',
    },
    data: {
        click_action: 'FLUTTER_NOTIFICATION_CLICK',
    },
    android: {
        ttl: 3600 * 1000,
        priority: 'high',
        notification: {
            icon: 'stock_ticker_update',
            color: '#f45342',
            sound: 'default',
            tag: 'tag',
        }
    },
    apns: {
        payload: {
            headers: {
                'apns-priority': '10'
            },
            aps: {
                alert: {
                    title: alerttitle,
                    body: alertbody
                },
                sound: 'default',
            },
        },
        fcmOptions: {
            imageUrl: '',
        }
    },
    // topic: 'news',
    token: '',
}

//#endregion firebase 설정 : End ================================================ 

/**
 * HTTP Server 관련 CONFIG 정보(JSON) - 운영
 */
var HttpServer_PRODUCT : HTTPSERVERCONFIG = {
    HOST: '0.0.0.0',
    PORT: 8888,
    PATH: 'www',
    DefaultLogoutTime: 600,
    LogoutKeeptime : 15,         // sec
}

/**
 * HTTP Server 관련 CONFIG 정보(JSON) - 개발
 */
var HttpServer_DEV : HTTPSERVERCONFIG = {
    HOST: '0.0.0.0',
    PORT: 8888,
    PATH: 'www',
    DefaultLogoutTime: 600,
    LogoutKeeptime : 15,         // sec
}

/**
 * DB Server 관련 CONFIG 정보(JSON) - 운영
 */
var DBServer_PRODUCT : DBSERVERCONFIG = {
    DBType: jsonschema.eDBType.MSSQL,
    HOST: 'uphs.iptime.org',
    PORT: jsonschema.eDBDefaultPort.MSSQL,
    DBName: 'NOLIGOUI',
    USER: 'salhs',
    PASSWORLD: 'l64047495!',
    POOL: {
        Max: 30,
        Min: 0,
        IdleTimeoutMillis: 30000
    }    
}

/**
 * DB Server 관련 CONFIG 정보(JSON) - 개발
 */
var DBServer_DEV : DBSERVERCONFIG = {
    DBType: jsonschema.eDBType.MSSQL,
    HOST: 'uphs.iptime.org',
    PORT: jsonschema.eDBDefaultPort.MSSQL,
    DBName: 'NOLIGOUI',
    USER: 'salhs',
    PASSWORLD: 'l64047495!',
    POOL: {
        Max: 30,
        Min: 0,
        IdleTimeoutMillis: 30000
    }    
}

/** 아직 큰 의미가 없음 */
var RedisKeys = {
    seq : '0_seq',
    list : '1_list',
    id : '2_#',
    
}

var Redis_PRODUCT : REDISSERVERCONFIG = {
    HOST: 'uphs.iptime.org',
    PORT: 6379,
    RedisKeys: RedisKeys    
}

var Redis_DEV : REDISSERVERCONFIG = {
    HOST: 'uphs.iptime.org',
    PORT: 6379,
    RedisKeys: RedisKeys    
}

/** key 정보 */
var key : String = "@#@lhscj2466@$#$"

var NoligoUIServerConfig : jsonschema.SERVERCONFIG = {
    Name: 'NoligoUIServer',
    ProductType: isDev,
    Http_YN: true,
    HTTP_Conf: !isDev ? HttpServer_PRODUCT : HttpServer_DEV,
    ExpressToken: {
        Key: key,
        ExpiresIn: 60 * 60 ,// 1 H
        RefreshExpiresIn: 60 * 60 * 2,// 2 H
    },
    Session_Secret: key,
    Database_YN: true,
    Database_Conf: !isDev ? DBServer_PRODUCT : DBServer_DEV,
    Socket_YN: false,
    Redis_YN: false,
    Redis_Conf: !isDev ? Redis_PRODUCT : Redis_DEV,
    FirebaseAlarmMsgConfig: firebaseMessage,
    //TestAPIList : ['/ws/user/login', '/ws/user/adduser', '/ws/user/show', '/ws/sys/getsysdata', '/ws/sys/getsysdataarray'],
    TestAPIList : ['/ws/user/login', '/ws/user/adduser'],
    PassMenuList : ['/', 'BOARDVIEW', 'MENUMOVE', '/main', 'login'],    
}


exports = module.exports = NoligoUIServerConfig