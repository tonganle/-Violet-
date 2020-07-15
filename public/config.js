/**
 *vue打包后，保留配置文件
 *更新本文件，则需要在引入的地方更改最新版本号
 */
const api = {
  BASEURL: 'http://db.winjoinit.com:9514', // 9514
  PRDURL: window.location.origin + window.location.pathname + '#',
  PROXYURL:'http://localhost:8100/proxy',
  MENUURL: '/layout'
};

window._$api = api;
