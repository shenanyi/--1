// utf8编码
function decodeUtf8(bytes) {
    var encoded = "";
    for (var i = 0; i < bytes.length; i++) {
        encoded += '%' + bytes[i].toString(16);
    }
    return decodeURIComponent(encoded);
}
// 数组转字符串
function dec(t) {
    if ("string" == typeof t) return t; for (var n = [], i = 0; i < t.length; i++) {
        n.push(t[i]);
    } return decodeUtf8(n);
}
// hex字符串转数组
function n(t) {
    var e = 0,
        n = t.length; if (n % 2 != 0) return null; n /= 2; for (var o = [], i = 0; i < n; i++) {
            var r = t.substr(e, 2),
                a = parseInt(r, 16); o.push(a), e += 2;
        } return o;
}
// 加解密核心算法
function m(t, e) {
    for (var n, o = e.length,
        i = (t ^ o) % 255,
        r = ((o & i) + (t ^ i)) % 255,
        a = [], s = 0; s < o; s++) {
        i -= (r * o ^ t) % 255, t -= r, n = 255 & ((n = e[s]) ^ (r = i % 255)), a.push(n);
    } return a;
}
// 字符串转字节
function stringToByte(t) {
    var e,
        n,
        o = new Array();
    e = t.length;
    for (var i = 0; i < e; i++) {
        (n = t.charCodeAt(i)) >= 65536 && n <= 1114111 ? (o.push(n >> 18 & 7 | 240), o.push(n >> 12 & 63 | 128), o.push(n >> 6 & 63 | 128), o.push(63 & n | 128)) : n >= 2048 && n <= 65535 ? (o.push(n >> 12 & 15 | 224), o.push(n >> 6 & 63 | 128), o.push(63 & n | 128)) : n >= 128 && n <= 2047 ? (o.push(n >> 6 & 31 | 192), o.push(63 & n | 128)) : o.push(255 & n);
    } return o;
}
// 数组转hex字符串
function parseByte2HexStr(t) {
    for (var e = "", n = 0; n < t.length; n++) {
        var o = t[n].toString(16);
        1 == o.length && (o = "0" + o), e += o;
    } return e;
}
// 解密数据，a和b分别为t和v
function decode(a, b) {
    return dec(m(a, n(b)))
}
// 加密数据，e和n分别为t和v
function encode(e, n) {
    return parseByte2HexStr(m(e, stringToByte(n)))
}