var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/utils.js
var EMOJI_FLAG_UNICODE_STARTING_POSITION = 127397;
function getFlag(countryCode) {
  const regex = new RegExp("^[A-Z]{2}$").test(countryCode);
  if (!countryCode || !regex)
    return void 0;
  return String.fromCodePoint(
    ...countryCode.split("").map((char) => EMOJI_FLAG_UNICODE_STARTING_POSITION + char.charCodeAt(0))
  );
}
__name(getFlag, "getFlag");

// src/config.js
var CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*"
};

// src/index.js
var src_default = {
  fetch(request) {
    const ip = request.headers.get("x-real-ip");
    const ua = request.headers.get("user-agent"); // 获取 User-Agent
    const { pathname } = new URL(request.url);
    console.log(ip, pathname);

    if (pathname === "/") {
      // 访问根目录时激活 geo 功能
      const geo = {
        city: request.cf.city,
        country: request.cf.country,
        flag: getFlag(request.cf.country),
        countryRegion: request.cf.region,
        region: request.cf.colo,
        latitude: request.cf.latitude,
        longitude: request.cf.longitude,
        asOrganization: request.cf.asOrganization
      };
      console.log(geo);
      return Response.json({
        ip,
        ...geo, // geo 信息在前
        ua // User-Agent 在最后
      }, {
        headers: {
          ...CORS_HEADERS,
          "x-client-ip": ip
        }
      });
    } else if (pathname === "/ip") {
      // 访问 /ip 时激活原先的根目录功能
      return new Response(ip, {
        headers: {
          ...CORS_HEADERS,
          "x-client-ip": ip
        }
      });
    }

    // 默认返回 404 或其他处理
    return new Response("Not Found", { status: 404 });
  }
};
export {
  src_default as default
};
//# sourceMappingURL=index.js.map