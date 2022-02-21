/**==================================================================
 * 이름 :스키마 정보
 * 설명 : 
 *   - 스키마 정보 정의
 * 
 * 일시         | 이름      | 설명
 * 2022-02-21   | LHS       | 최초 생성
 ==================================================================*/

 import { messaging } from 'firebase-admin'

/**
 * DB 종류
 */
 export enum eDBType  {
    MSSQL = 'MSSQL',
    ORACLE = 'ORACLE',
    MYSQL = 'MYSQL',
}


/**
 * DB 기본 포트
 */
 export enum eDBDefaultPort {
    MSSQL = 1433,
    ORACLE = 1521,
    MYSQL = 3306,
}

/**
 * 프로젝트 상태: 릴리즈, 개발
 */
 export enum PRODUCTTYPE {
    /** 릴리즈 */
    PRODUCT = 'PRODUCT',
    /** 개발 */
    DEVELOPMENT = 'DEV',
}

/**
 * HTTP Server 관련 CONFIG 정보
 */
 export interface  HTTPSERVERCONFIG {
    /** HTTP IP 정보 */
    HOST : String,
    /** HTTP PORT 정보 */
    PORT : Number,
    /** Home Path 물리 경로 */
    PATH : String,
    /** 자동 로그 아웃 시간(초) */
    DefaultLogoutTime : Number,
    /** 세션 타임 아웃 시간(초) */
    LogoutKeeptime : Number,
}


/**
 * DB POOL 관련 CONFIG 정보
 */
 export interface DBPOOLCONFIG {
    /** 최대 DB 커넥션 수 */
    Max : Number,
    /** 최소 DB 커넥션 수 */
    Min : Number,
    /** 타임 아웃 처리 */
    IdleTimeoutMillis : Number,
}

/**
 * DB 접속 관련 CONFIG 정보
 */
 export interface DBSERVERCONFIG {
    /** DB 종류 */
    DBType : eDBType,
    /** Database HOST 정보 : IP */
    HOST : String,
    /** Database PORT 정보 */
    PORT : Number,
    /** Database Name 정보 */
    DBName : String,
    /** 유저 아이디 */
    USER : String,
    /** 유저 비밀번호 */
    PASSWORLD : String,
    /** DB 타임 아웃 */
    DBTimeOut? : Number,
    /** DB POOL */
    POOL : DBPOOLCONFIG,
}

/** Redis 접속 관련 CONFIG 정보 */
export interface REDISSERVERCONFIG {
    /** Redis HOST 정보 */
    HOST : String,
    /** Redis PORT 정보 */
    PORT : Number,
    /** 비밀번호 */
    PASSWORLD? : Number,
    /** Redis 기본 세팅 정보 */
    RedisKeys : any,
}

/**
 * WTS 관련 세팅 정보
 */
export interface ExpressToken {
    /** Key 정보 */
    Key : String,
    /** 만료일자 */
    ExpiresIn : Number,
    /** 리플레시 토큰 만료일자 */
    RefreshExpiresIn : Number,
}

export interface SERVERCONFIG {
    /** 미들웨서 서버 이름 */
    Name : String,
    /** 서버 상태(운영 or 개발) */
    ProductType : PRODUCTTYPE,
    /** HTTP 서버 사용 유무 */
    Http_YN : Boolean,
    /** HTTP 서버 설정 정보 */
    HTTP_Conf : HTTPSERVERCONFIG,
    /** WTS 토큰 정보 */
    ExpressToken : ExpressToken,
    /** 세션 암호화 키 */
    Session_Secret : String,
    /** Database 사용 유무 */
    Database_YN : Boolean,
    /** Database 설정 정보 */
    Database_Conf : DBSERVERCONFIG,
    /** WebSocket 사용 유무 */
    Socket_YN : Boolean,
    /** Redis 사용 유무 */
    Redis_YN : Boolean,
    /** Redis 설정 정보 */
    Redis_Conf : REDISSERVERCONFIG,
    /** Firebase 알람 설정 */
    FirebaseAlarmMsgConfig : messaging.Message,
    /** Test 관련 API */
    TestAPIList: Array<String>,
    /** 미인증 화면 정의 */
    PassMenuList: Array<String>,
}

/**
 * WS 응답 포멧(JSON)
 * EX) { success: false, data: { state: false, msg: '서비스 호출 중 오류 발생 하였습니다.', errcode: '0002' } }
 * EX) res.json({ resultdata : row, statecode : 1, statemsg : '정상' });
 */
 export interface WSRETURNFORMAT {
    /** 결과 상태 */
    State : Boolean,
    /** 결과 메시지 */
    MessageCode : String,
    /** 결과 메시지(속성값) // {0}에서 {1}로 이동 => 해당 값부분 */
    MessageArgs : Array<any>,
    /** 반화 데이터 */
    Data : any,
    /** 에러가 있는경우 코드값 반환, 없는경우 null */
    ErrorCode : String,
}
