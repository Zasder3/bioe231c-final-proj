/*! For license information please see 9763.e485ece1.chunk.js.LICENSE.txt */
"use strict";(globalThis.webpackChunk_jbrowse_web=globalThis.webpackChunk_jbrowse_web||[]).push([[9763],{39763:(t,e,n)=>{n.d(e,{e:()=>a});const r=BigInt(32);"getBigInt64"in DataView||(DataView.prototype.getBigInt64=function(t,e){return function(t,e,n){const i=Number(!!n),o=Number(!n);return BigInt(t.getInt32(e,n)*o+t.getInt32(e+4,n)*i)<<r|BigInt(t.getUint32(e,n)*i+t.getUint32(e+4,n)*o)}(this,t,e)}),"getBigUint64"in DataView||(DataView.prototype.getBigUint64=function(t,e){return function(t,e,n){const i=t.getUint32(e,n),o=t.getUint32(e+4,n),s=Number(!!n),f=Number(!n);return BigInt(i*f+o*s)<<r|BigInt(i*s+o*f)}(this,t,e)});var i=n(45834),o=n(65446);const s=440477507,f=["T","C","A","G"],u=[];for(let t=0;t<256;t++)u.push(f[t>>6&3]+f[t>>4&3]+f[t>>2&3]+f[3&t]);const h=u.map((t=>t.toLowerCase()));class a{constructor({filehandle:t,path:e}){if(t)this.filehandle=t;else{if(!e)throw new Error("must supply path or filehandle");this.filehandle=new i.EY(e)}}async _detectEndianness(){const t=await this.filehandle.read(o.hp.allocUnsafe(8),0,8,0),{buffer:e}=t;if(e.readInt32LE(0)!==s)throw e.readInt32BE(0)===s?new Error("big endian not supported"):new Error("not a 2bit file");this.version=e.readInt32LE(4)}getHeader(){return this.headerP||(this.headerP=this._getHeader().catch((t=>{throw this.headerP=void 0,t}))),this.headerP}async _getHeader(){await this._detectEndianness();const{buffer:t}=await this.filehandle.read(o.hp.allocUnsafe(16),0,16,0),e=t,n=!0,r=new DataView(e.buffer,e.byteOffset,e.length);let i=0;const s=r.getInt32(i,n);if(i+=4,440477507!==s)throw new Error(`Wrong magic number ${s}`);const f=r.getInt32(i,n);i+=4;const u=r.getUint32(i,n);return i+=4,{version:f,magic:s,sequenceCount:u,reserved:r.getUint32(i,n)}}getIndex(){return this.indexP||(this.indexP=this._getIndex().catch((t=>{throw this.indexP=void 0,t}))),this.indexP}async _getIndex(){const t=await this.getHeader(),e=8+t.sequenceCount*(257+(1===this.version?8:4)),{buffer:n}=await this.filehandle.read(o.hp.allocUnsafe(e),0,e,8),r=!0,i=n,s=new DataView(i.buffer,i.byteOffset,i.length);let f=0;const u=s.getUint32(f,r);f+=4,f+=4;const h=[];for(let e=0;e<u;e++){const e=s.getUint8(f);f+=1;const i=n.subarray(f,f+e).toString();if(f+=e,1===t.version){const t=Number(s.getBigUint64(f,r));f+=8,h.push({offset:t,name:i})}else{const t=s.getUint32(f,r);f+=4,h.push({offset:t,name:i})}}return Object.fromEntries(h.map((({name:t,offset:e})=>[t,e])))}async getSequenceNames(){const t=await this.getIndex();return Object.keys(t)}async getSequenceSizes(){const t=await this.getIndex(),e=Object.keys(t),n=Object.values(t).map((t=>this._getSequenceSize(t))),r=await Promise.all(n),i={};for(const[t,n]of e.entries())i[n]=r[t];return i}async getSequenceSize(t){const e=(await this.getIndex())[t];if(e)return this._getSequenceSize(e)}async _getSequenceSize(t){return this._record1(t).then((t=>t.dnaSize))}async _record1(t,e=8){const{buffer:n}=await this.filehandle.read(o.hp.allocUnsafe(e),0,e,t),r=n,i=!0;let s=0;const f=new DataView(r.buffer,r.byteOffset,r.length),u=f.getUint32(s,i);s+=4;const h=f.getUint32(s,i);return s+=4,{dnaSize:u,nBlockCount:h}}async _record2(t,e){const{buffer:n}=await this.filehandle.read(o.hp.allocUnsafe(e),0,e,t),r=n,i=!0;let s=0;const f=new DataView(r.buffer,r.byteOffset,r.length),u=f.getUint32(s,i);s+=4;const h=[];for(let t=0;t<u;t++){const t=f.getUint32(s,i);s+=4,h.push(t)}const a=[];for(let t=0;t<u;t++){const t=f.getUint32(s,i);s+=4,a.push(t)}return{maskBlockCount:f.getUint32(s,i),nBlockSizes:a,nBlockStarts:h}}async _record3(t,e){const{buffer:n}=await this.filehandle.read(o.hp.allocUnsafe(e),0,e,t),r=n,i=!0;let s=0;const f=new DataView(r.buffer,r.byteOffset,r.length),u=f.getUint32(s,i);s+=4;const h=[];for(let t=0;t<u;t++){const t=f.getUint32(s,i);s+=4,h.push(t)}const a=[];for(let t=0;t<u;t++){const t=f.getUint32(s,i);s+=4,a.push(t)}return{maskBlockCount:u,maskBlockSizes:a,maskBlockStarts:h,reserved:f.getInt32(s,i)}}async _getSequenceRecord(t){const e=await this._record1(t),n=8*e.nBlockCount+8,r=await this._record2(t+4,n),i=8*r.maskBlockCount+8,o=await this._record3(t+4+n-4,i);return{dnaSize:e.dnaSize,nBlocks:{starts:r.nBlockStarts,sizes:r.nBlockSizes},maskBlocks:{starts:o.maskBlockStarts,sizes:o.maskBlockSizes},dnaPosition:t+4+n-4+i}}async getSequence(t,e=0,n=Number.POSITIVE_INFINITY){const r=(await this.getIndex())[t];if(!r)return;const i=await this._getSequenceRecord(r);if(e<0)throw new TypeError("regionStart cannot be less than 0");n>i.dnaSize&&(n=i.dnaSize);const s=this._getOverlappingBlocks(e,n,i.nBlocks.starts,i.nBlocks.sizes),f=this._getOverlappingBlocks(e,n,i.maskBlocks.starts,i.maskBlocks.sizes),a=o.hp.allocUnsafe(Math.ceil((n-e)/4)+1),c=Math.floor(e/4),{buffer:l}=await this.filehandle.read(a,0,a.length,i.dnaPosition+c);let p="";for(let t=e;t<n;t+=1){for(;f.length>0&&f[0].end<=t;)f.shift();const e=f[0]&&f[0].start<=t&&f[0].end>t;if(s[0]&&t>=s[0].start&&t<s[0].end){const r=s.shift();for(;t<r.end&&t<n;t+=1)p+=e?"n":"N";t-=1}else{const n=t%4,r=l[Math.floor(t/4)-c];p+=e?h[r][n]:u[r][n]}}return p}_getOverlappingBlocks(t,e,n,r){let i,o;for(const[s,f]of n.entries())if(t>=f+r[s]||e<=f){if(void 0!==i){o=s;break}}else void 0===i&&(i=s);if(void 0===i)return[];void 0===o&&(o=n.length);const s=new Array(o-i);for(let t=i;t<o;t+=1)s[t-i]={start:n[t],end:n[t]+r[t],size:r[t]};return s}}},65446:(t,e,n)=>{const r=n(47130),i=n(96607),o="function"==typeof Symbol&&"function"==typeof Symbol.for?Symbol.for("nodejs.util.inspect.custom"):null;e.hp=u,e.IS=50;const s=2147483647;function f(t){if(t>s)throw new RangeError('The value "'+t+'" is invalid for option "size"');const e=new Uint8Array(t);return Object.setPrototypeOf(e,u.prototype),e}function u(t,e,n){if("number"==typeof t){if("string"==typeof e)throw new TypeError('The "string" argument must be of type string. Received type number');return c(t)}return h(t,e,n)}function h(t,e,n){if("string"==typeof t)return function(t,e){if("string"==typeof e&&""!==e||(e="utf8"),!u.isEncoding(e))throw new TypeError("Unknown encoding: "+e);const n=0|y(t,e);let r=f(n);const i=r.write(t,e);return i!==n&&(r=r.slice(0,i)),r}(t,e);if(ArrayBuffer.isView(t))return function(t){if(J(t,Uint8Array)){const e=new Uint8Array(t);return p(e.buffer,e.byteOffset,e.byteLength)}return l(t)}(t);if(null==t)throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof t);if(J(t,ArrayBuffer)||t&&J(t.buffer,ArrayBuffer))return p(t,e,n);if("undefined"!=typeof SharedArrayBuffer&&(J(t,SharedArrayBuffer)||t&&J(t.buffer,SharedArrayBuffer)))return p(t,e,n);if("number"==typeof t)throw new TypeError('The "value" argument must not be of type number. Received type number');const r=t.valueOf&&t.valueOf();if(null!=r&&r!==t)return u.from(r,e,n);const i=function(t){if(u.isBuffer(t)){const e=0|g(t.length),n=f(e);return 0===n.length||t.copy(n,0,0,e),n}return void 0!==t.length?"number"!=typeof t.length||Z(t.length)?f(0):l(t):"Buffer"===t.type&&Array.isArray(t.data)?l(t.data):void 0}(t);if(i)return i;if("undefined"!=typeof Symbol&&null!=Symbol.toPrimitive&&"function"==typeof t[Symbol.toPrimitive])return u.from(t[Symbol.toPrimitive]("string"),e,n);throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof t)}function a(t){if("number"!=typeof t)throw new TypeError('"size" argument must be of type number');if(t<0)throw new RangeError('The value "'+t+'" is invalid for option "size"')}function c(t){return a(t),f(t<0?0:0|g(t))}function l(t){const e=t.length<0?0:0|g(t.length),n=f(e);for(let r=0;r<e;r+=1)n[r]=255&t[r];return n}function p(t,e,n){if(e<0||t.byteLength<e)throw new RangeError('"offset" is outside of buffer bounds');if(t.byteLength<e+(n||0))throw new RangeError('"length" is outside of buffer bounds');let r;return r=void 0===e&&void 0===n?new Uint8Array(t):void 0===n?new Uint8Array(t,e):new Uint8Array(t,e,n),Object.setPrototypeOf(r,u.prototype),r}function g(t){if(t>=s)throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+s.toString(16)+" bytes");return 0|t}function y(t,e){if(u.isBuffer(t))return t.length;if(ArrayBuffer.isView(t)||J(t,ArrayBuffer))return t.byteLength;if("string"!=typeof t)throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type '+typeof t);const n=t.length,r=arguments.length>2&&!0===arguments[2];if(!r&&0===n)return 0;let i=!1;for(;;)switch(e){case"ascii":case"latin1":case"binary":return n;case"utf8":case"utf-8":return G(t).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*n;case"hex":return n>>>1;case"base64":return H(t).length;default:if(i)return r?-1:G(t).length;e=(""+e).toLowerCase(),i=!0}}function d(t,e,n){let r=!1;if((void 0===e||e<0)&&(e=0),e>this.length)return"";if((void 0===n||n>this.length)&&(n=this.length),n<=0)return"";if((n>>>=0)<=(e>>>=0))return"";for(t||(t="utf8");;)switch(t){case"hex":return k(this,e,n);case"utf8":case"utf-8":return S(this,e,n);case"ascii":return O(this,e,n);case"latin1":case"binary":return _(this,e,n);case"base64":return A(this,e,n);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return T(this,e,n);default:if(r)throw new TypeError("Unknown encoding: "+t);t=(t+"").toLowerCase(),r=!0}}function w(t,e,n){const r=t[e];t[e]=t[n],t[n]=r}function b(t,e,n,r,i){if(0===t.length)return-1;if("string"==typeof n?(r=n,n=0):n>2147483647?n=2147483647:n<-2147483648&&(n=-2147483648),Z(n=+n)&&(n=i?0:t.length-1),n<0&&(n=t.length+n),n>=t.length){if(i)return-1;n=t.length-1}else if(n<0){if(!i)return-1;n=0}if("string"==typeof e&&(e=u.from(e,r)),u.isBuffer(e))return 0===e.length?-1:B(t,e,n,r,i);if("number"==typeof e)return e&=255,"function"==typeof Uint8Array.prototype.indexOf?i?Uint8Array.prototype.indexOf.call(t,e,n):Uint8Array.prototype.lastIndexOf.call(t,e,n):B(t,[e],n,r,i);throw new TypeError("val must be string, number or Buffer")}function B(t,e,n,r,i){let o,s=1,f=t.length,u=e.length;if(void 0!==r&&("ucs2"===(r=String(r).toLowerCase())||"ucs-2"===r||"utf16le"===r||"utf-16le"===r)){if(t.length<2||e.length<2)return-1;s=2,f/=2,u/=2,n/=2}function h(t,e){return 1===s?t[e]:t.readUInt16BE(e*s)}if(i){let r=-1;for(o=n;o<f;o++)if(h(t,o)===h(e,-1===r?0:o-r)){if(-1===r&&(r=o),o-r+1===u)return r*s}else-1!==r&&(o-=o-r),r=-1}else for(n+u>f&&(n=f-u),o=n;o>=0;o--){let n=!0;for(let r=0;r<u;r++)if(h(t,o+r)!==h(e,r)){n=!1;break}if(n)return o}return-1}function m(t,e,n,r){n=Number(n)||0;const i=t.length-n;r?(r=Number(r))>i&&(r=i):r=i;const o=e.length;let s;for(r>o/2&&(r=o/2),s=0;s<r;++s){const r=parseInt(e.substr(2*s,2),16);if(Z(r))return s;t[n+s]=r}return s}function E(t,e,n,r){return W(G(e,t.length-n),t,n,r)}function I(t,e,n,r){return W(function(t){const e=[];for(let n=0;n<t.length;++n)e.push(255&t.charCodeAt(n));return e}(e),t,n,r)}function U(t,e,n,r){return W(H(e),t,n,r)}function v(t,e,n,r){return W(function(t,e){let n,r,i;const o=[];for(let s=0;s<t.length&&!((e-=2)<0);++s)n=t.charCodeAt(s),r=n>>8,i=n%256,o.push(i),o.push(r);return o}(e,t.length-n),t,n,r)}function A(t,e,n){return 0===e&&n===t.length?r.fromByteArray(t):r.fromByteArray(t.slice(e,n))}function S(t,e,n){n=Math.min(t.length,n);const r=[];let i=e;for(;i<n;){const e=t[i];let o=null,s=e>239?4:e>223?3:e>191?2:1;if(i+s<=n){let n,r,f,u;switch(s){case 1:e<128&&(o=e);break;case 2:n=t[i+1],128==(192&n)&&(u=(31&e)<<6|63&n,u>127&&(o=u));break;case 3:n=t[i+1],r=t[i+2],128==(192&n)&&128==(192&r)&&(u=(15&e)<<12|(63&n)<<6|63&r,u>2047&&(u<55296||u>57343)&&(o=u));break;case 4:n=t[i+1],r=t[i+2],f=t[i+3],128==(192&n)&&128==(192&r)&&128==(192&f)&&(u=(15&e)<<18|(63&n)<<12|(63&r)<<6|63&f,u>65535&&u<1114112&&(o=u))}}null===o?(o=65533,s=1):o>65535&&(o-=65536,r.push(o>>>10&1023|55296),o=56320|1023&o),r.push(o),i+=s}return function(t){const e=t.length;if(e<=R)return String.fromCharCode.apply(String,t);let n="",r=0;for(;r<e;)n+=String.fromCharCode.apply(String,t.slice(r,r+=R));return n}(r)}u.TYPED_ARRAY_SUPPORT=function(){try{const t=new Uint8Array(1),e={foo:function(){return 42}};return Object.setPrototypeOf(e,Uint8Array.prototype),Object.setPrototypeOf(t,e),42===t.foo()}catch(t){return!1}}(),u.TYPED_ARRAY_SUPPORT||"undefined"==typeof console||"function"!=typeof console.error||console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."),Object.defineProperty(u.prototype,"parent",{enumerable:!0,get:function(){if(u.isBuffer(this))return this.buffer}}),Object.defineProperty(u.prototype,"offset",{enumerable:!0,get:function(){if(u.isBuffer(this))return this.byteOffset}}),u.poolSize=8192,u.from=function(t,e,n){return h(t,e,n)},Object.setPrototypeOf(u.prototype,Uint8Array.prototype),Object.setPrototypeOf(u,Uint8Array),u.alloc=function(t,e,n){return function(t,e,n){return a(t),t<=0?f(t):void 0!==e?"string"==typeof n?f(t).fill(e,n):f(t).fill(e):f(t)}(t,e,n)},u.allocUnsafe=function(t){return c(t)},u.allocUnsafeSlow=function(t){return c(t)},u.isBuffer=function(t){return null!=t&&!0===t._isBuffer&&t!==u.prototype},u.compare=function(t,e){if(J(t,Uint8Array)&&(t=u.from(t,t.offset,t.byteLength)),J(e,Uint8Array)&&(e=u.from(e,e.offset,e.byteLength)),!u.isBuffer(t)||!u.isBuffer(e))throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');if(t===e)return 0;let n=t.length,r=e.length;for(let i=0,o=Math.min(n,r);i<o;++i)if(t[i]!==e[i]){n=t[i],r=e[i];break}return n<r?-1:r<n?1:0},u.isEncoding=function(t){switch(String(t).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},u.concat=function(t,e){if(!Array.isArray(t))throw new TypeError('"list" argument must be an Array of Buffers');if(0===t.length)return u.alloc(0);let n;if(void 0===e)for(e=0,n=0;n<t.length;++n)e+=t[n].length;const r=u.allocUnsafe(e);let i=0;for(n=0;n<t.length;++n){let e=t[n];if(J(e,Uint8Array))i+e.length>r.length?(u.isBuffer(e)||(e=u.from(e)),e.copy(r,i)):Uint8Array.prototype.set.call(r,e,i);else{if(!u.isBuffer(e))throw new TypeError('"list" argument must be an Array of Buffers');e.copy(r,i)}i+=e.length}return r},u.byteLength=y,u.prototype._isBuffer=!0,u.prototype.swap16=function(){const t=this.length;if(t%2!=0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(let e=0;e<t;e+=2)w(this,e,e+1);return this},u.prototype.swap32=function(){const t=this.length;if(t%4!=0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(let e=0;e<t;e+=4)w(this,e,e+3),w(this,e+1,e+2);return this},u.prototype.swap64=function(){const t=this.length;if(t%8!=0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(let e=0;e<t;e+=8)w(this,e,e+7),w(this,e+1,e+6),w(this,e+2,e+5),w(this,e+3,e+4);return this},u.prototype.toString=function(){const t=this.length;return 0===t?"":0===arguments.length?S(this,0,t):d.apply(this,arguments)},u.prototype.toLocaleString=u.prototype.toString,u.prototype.equals=function(t){if(!u.isBuffer(t))throw new TypeError("Argument must be a Buffer");return this===t||0===u.compare(this,t)},u.prototype.inspect=function(){let t="";const n=e.IS;return t=this.toString("hex",0,n).replace(/(.{2})/g,"$1 ").trim(),this.length>n&&(t+=" ... "),"<Buffer "+t+">"},o&&(u.prototype[o]=u.prototype.inspect),u.prototype.compare=function(t,e,n,r,i){if(J(t,Uint8Array)&&(t=u.from(t,t.offset,t.byteLength)),!u.isBuffer(t))throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type '+typeof t);if(void 0===e&&(e=0),void 0===n&&(n=t?t.length:0),void 0===r&&(r=0),void 0===i&&(i=this.length),e<0||n>t.length||r<0||i>this.length)throw new RangeError("out of range index");if(r>=i&&e>=n)return 0;if(r>=i)return-1;if(e>=n)return 1;if(this===t)return 0;let o=(i>>>=0)-(r>>>=0),s=(n>>>=0)-(e>>>=0);const f=Math.min(o,s),h=this.slice(r,i),a=t.slice(e,n);for(let t=0;t<f;++t)if(h[t]!==a[t]){o=h[t],s=a[t];break}return o<s?-1:s<o?1:0},u.prototype.includes=function(t,e,n){return-1!==this.indexOf(t,e,n)},u.prototype.indexOf=function(t,e,n){return b(this,t,e,n,!0)},u.prototype.lastIndexOf=function(t,e,n){return b(this,t,e,n,!1)},u.prototype.write=function(t,e,n,r){if(void 0===e)r="utf8",n=this.length,e=0;else if(void 0===n&&"string"==typeof e)r=e,n=this.length,e=0;else{if(!isFinite(e))throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");e>>>=0,isFinite(n)?(n>>>=0,void 0===r&&(r="utf8")):(r=n,n=void 0)}const i=this.length-e;if((void 0===n||n>i)&&(n=i),t.length>0&&(n<0||e<0)||e>this.length)throw new RangeError("Attempt to write outside buffer bounds");r||(r="utf8");let o=!1;for(;;)switch(r){case"hex":return m(this,t,e,n);case"utf8":case"utf-8":return E(this,t,e,n);case"ascii":case"latin1":case"binary":return I(this,t,e,n);case"base64":return U(this,t,e,n);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return v(this,t,e,n);default:if(o)throw new TypeError("Unknown encoding: "+r);r=(""+r).toLowerCase(),o=!0}},u.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};const R=4096;function O(t,e,n){let r="";n=Math.min(t.length,n);for(let i=e;i<n;++i)r+=String.fromCharCode(127&t[i]);return r}function _(t,e,n){let r="";n=Math.min(t.length,n);for(let i=e;i<n;++i)r+=String.fromCharCode(t[i]);return r}function k(t,e,n){const r=t.length;(!e||e<0)&&(e=0),(!n||n<0||n>r)&&(n=r);let i="";for(let r=e;r<n;++r)i+=K[t[r]];return i}function T(t,e,n){const r=t.slice(e,n);let i="";for(let t=0;t<r.length-1;t+=2)i+=String.fromCharCode(r[t]+256*r[t+1]);return i}function L(t,e,n){if(t%1!=0||t<0)throw new RangeError("offset is not uint");if(t+e>n)throw new RangeError("Trying to access beyond buffer length")}function x(t,e,n,r,i,o){if(!u.isBuffer(t))throw new TypeError('"buffer" argument must be a Buffer instance');if(e>i||e<o)throw new RangeError('"value" argument is out of bounds');if(n+r>t.length)throw new RangeError("Index out of range")}function P(t,e,n,r,i){M(e,r,i,t,n,7);let o=Number(e&BigInt(4294967295));t[n++]=o,o>>=8,t[n++]=o,o>>=8,t[n++]=o,o>>=8,t[n++]=o;let s=Number(e>>BigInt(32)&BigInt(4294967295));return t[n++]=s,s>>=8,t[n++]=s,s>>=8,t[n++]=s,s>>=8,t[n++]=s,n}function $(t,e,n,r,i){M(e,r,i,t,n,7);let o=Number(e&BigInt(4294967295));t[n+7]=o,o>>=8,t[n+6]=o,o>>=8,t[n+5]=o,o>>=8,t[n+4]=o;let s=Number(e>>BigInt(32)&BigInt(4294967295));return t[n+3]=s,s>>=8,t[n+2]=s,s>>=8,t[n+1]=s,s>>=8,t[n]=s,n+8}function C(t,e,n,r,i,o){if(n+r>t.length)throw new RangeError("Index out of range");if(n<0)throw new RangeError("Index out of range")}function z(t,e,n,r,o){return e=+e,n>>>=0,o||C(t,0,n,4),i.write(t,e,n,r,23,4),n+4}function N(t,e,n,r,o){return e=+e,n>>>=0,o||C(t,0,n,8),i.write(t,e,n,r,52,8),n+8}u.prototype.slice=function(t,e){const n=this.length;(t=~~t)<0?(t+=n)<0&&(t=0):t>n&&(t=n),(e=void 0===e?n:~~e)<0?(e+=n)<0&&(e=0):e>n&&(e=n),e<t&&(e=t);const r=this.subarray(t,e);return Object.setPrototypeOf(r,u.prototype),r},u.prototype.readUintLE=u.prototype.readUIntLE=function(t,e,n){t>>>=0,e>>>=0,n||L(t,e,this.length);let r=this[t],i=1,o=0;for(;++o<e&&(i*=256);)r+=this[t+o]*i;return r},u.prototype.readUintBE=u.prototype.readUIntBE=function(t,e,n){t>>>=0,e>>>=0,n||L(t,e,this.length);let r=this[t+--e],i=1;for(;e>0&&(i*=256);)r+=this[t+--e]*i;return r},u.prototype.readUint8=u.prototype.readUInt8=function(t,e){return t>>>=0,e||L(t,1,this.length),this[t]},u.prototype.readUint16LE=u.prototype.readUInt16LE=function(t,e){return t>>>=0,e||L(t,2,this.length),this[t]|this[t+1]<<8},u.prototype.readUint16BE=u.prototype.readUInt16BE=function(t,e){return t>>>=0,e||L(t,2,this.length),this[t]<<8|this[t+1]},u.prototype.readUint32LE=u.prototype.readUInt32LE=function(t,e){return t>>>=0,e||L(t,4,this.length),(this[t]|this[t+1]<<8|this[t+2]<<16)+16777216*this[t+3]},u.prototype.readUint32BE=u.prototype.readUInt32BE=function(t,e){return t>>>=0,e||L(t,4,this.length),16777216*this[t]+(this[t+1]<<16|this[t+2]<<8|this[t+3])},u.prototype.readBigUInt64LE=Q((function(t){q(t>>>=0,"offset");const e=this[t],n=this[t+7];void 0!==e&&void 0!==n||V(t,this.length-8);const r=e+256*this[++t]+65536*this[++t]+this[++t]*2**24,i=this[++t]+256*this[++t]+65536*this[++t]+n*2**24;return BigInt(r)+(BigInt(i)<<BigInt(32))})),u.prototype.readBigUInt64BE=Q((function(t){q(t>>>=0,"offset");const e=this[t],n=this[t+7];void 0!==e&&void 0!==n||V(t,this.length-8);const r=e*2**24+65536*this[++t]+256*this[++t]+this[++t],i=this[++t]*2**24+65536*this[++t]+256*this[++t]+n;return(BigInt(r)<<BigInt(32))+BigInt(i)})),u.prototype.readIntLE=function(t,e,n){t>>>=0,e>>>=0,n||L(t,e,this.length);let r=this[t],i=1,o=0;for(;++o<e&&(i*=256);)r+=this[t+o]*i;return i*=128,r>=i&&(r-=Math.pow(2,8*e)),r},u.prototype.readIntBE=function(t,e,n){t>>>=0,e>>>=0,n||L(t,e,this.length);let r=e,i=1,o=this[t+--r];for(;r>0&&(i*=256);)o+=this[t+--r]*i;return i*=128,o>=i&&(o-=Math.pow(2,8*e)),o},u.prototype.readInt8=function(t,e){return t>>>=0,e||L(t,1,this.length),128&this[t]?-1*(255-this[t]+1):this[t]},u.prototype.readInt16LE=function(t,e){t>>>=0,e||L(t,2,this.length);const n=this[t]|this[t+1]<<8;return 32768&n?4294901760|n:n},u.prototype.readInt16BE=function(t,e){t>>>=0,e||L(t,2,this.length);const n=this[t+1]|this[t]<<8;return 32768&n?4294901760|n:n},u.prototype.readInt32LE=function(t,e){return t>>>=0,e||L(t,4,this.length),this[t]|this[t+1]<<8|this[t+2]<<16|this[t+3]<<24},u.prototype.readInt32BE=function(t,e){return t>>>=0,e||L(t,4,this.length),this[t]<<24|this[t+1]<<16|this[t+2]<<8|this[t+3]},u.prototype.readBigInt64LE=Q((function(t){q(t>>>=0,"offset");const e=this[t],n=this[t+7];void 0!==e&&void 0!==n||V(t,this.length-8);const r=this[t+4]+256*this[t+5]+65536*this[t+6]+(n<<24);return(BigInt(r)<<BigInt(32))+BigInt(e+256*this[++t]+65536*this[++t]+this[++t]*2**24)})),u.prototype.readBigInt64BE=Q((function(t){q(t>>>=0,"offset");const e=this[t],n=this[t+7];void 0!==e&&void 0!==n||V(t,this.length-8);const r=(e<<24)+65536*this[++t]+256*this[++t]+this[++t];return(BigInt(r)<<BigInt(32))+BigInt(this[++t]*2**24+65536*this[++t]+256*this[++t]+n)})),u.prototype.readFloatLE=function(t,e){return t>>>=0,e||L(t,4,this.length),i.read(this,t,!0,23,4)},u.prototype.readFloatBE=function(t,e){return t>>>=0,e||L(t,4,this.length),i.read(this,t,!1,23,4)},u.prototype.readDoubleLE=function(t,e){return t>>>=0,e||L(t,8,this.length),i.read(this,t,!0,52,8)},u.prototype.readDoubleBE=function(t,e){return t>>>=0,e||L(t,8,this.length),i.read(this,t,!1,52,8)},u.prototype.writeUintLE=u.prototype.writeUIntLE=function(t,e,n,r){t=+t,e>>>=0,n>>>=0,r||x(this,t,e,n,Math.pow(2,8*n)-1,0);let i=1,o=0;for(this[e]=255&t;++o<n&&(i*=256);)this[e+o]=t/i&255;return e+n},u.prototype.writeUintBE=u.prototype.writeUIntBE=function(t,e,n,r){t=+t,e>>>=0,n>>>=0,r||x(this,t,e,n,Math.pow(2,8*n)-1,0);let i=n-1,o=1;for(this[e+i]=255&t;--i>=0&&(o*=256);)this[e+i]=t/o&255;return e+n},u.prototype.writeUint8=u.prototype.writeUInt8=function(t,e,n){return t=+t,e>>>=0,n||x(this,t,e,1,255,0),this[e]=255&t,e+1},u.prototype.writeUint16LE=u.prototype.writeUInt16LE=function(t,e,n){return t=+t,e>>>=0,n||x(this,t,e,2,65535,0),this[e]=255&t,this[e+1]=t>>>8,e+2},u.prototype.writeUint16BE=u.prototype.writeUInt16BE=function(t,e,n){return t=+t,e>>>=0,n||x(this,t,e,2,65535,0),this[e]=t>>>8,this[e+1]=255&t,e+2},u.prototype.writeUint32LE=u.prototype.writeUInt32LE=function(t,e,n){return t=+t,e>>>=0,n||x(this,t,e,4,4294967295,0),this[e+3]=t>>>24,this[e+2]=t>>>16,this[e+1]=t>>>8,this[e]=255&t,e+4},u.prototype.writeUint32BE=u.prototype.writeUInt32BE=function(t,e,n){return t=+t,e>>>=0,n||x(this,t,e,4,4294967295,0),this[e]=t>>>24,this[e+1]=t>>>16,this[e+2]=t>>>8,this[e+3]=255&t,e+4},u.prototype.writeBigUInt64LE=Q((function(t,e=0){return P(this,t,e,BigInt(0),BigInt("0xffffffffffffffff"))})),u.prototype.writeBigUInt64BE=Q((function(t,e=0){return $(this,t,e,BigInt(0),BigInt("0xffffffffffffffff"))})),u.prototype.writeIntLE=function(t,e,n,r){if(t=+t,e>>>=0,!r){const r=Math.pow(2,8*n-1);x(this,t,e,n,r-1,-r)}let i=0,o=1,s=0;for(this[e]=255&t;++i<n&&(o*=256);)t<0&&0===s&&0!==this[e+i-1]&&(s=1),this[e+i]=(t/o|0)-s&255;return e+n},u.prototype.writeIntBE=function(t,e,n,r){if(t=+t,e>>>=0,!r){const r=Math.pow(2,8*n-1);x(this,t,e,n,r-1,-r)}let i=n-1,o=1,s=0;for(this[e+i]=255&t;--i>=0&&(o*=256);)t<0&&0===s&&0!==this[e+i+1]&&(s=1),this[e+i]=(t/o|0)-s&255;return e+n},u.prototype.writeInt8=function(t,e,n){return t=+t,e>>>=0,n||x(this,t,e,1,127,-128),t<0&&(t=255+t+1),this[e]=255&t,e+1},u.prototype.writeInt16LE=function(t,e,n){return t=+t,e>>>=0,n||x(this,t,e,2,32767,-32768),this[e]=255&t,this[e+1]=t>>>8,e+2},u.prototype.writeInt16BE=function(t,e,n){return t=+t,e>>>=0,n||x(this,t,e,2,32767,-32768),this[e]=t>>>8,this[e+1]=255&t,e+2},u.prototype.writeInt32LE=function(t,e,n){return t=+t,e>>>=0,n||x(this,t,e,4,2147483647,-2147483648),this[e]=255&t,this[e+1]=t>>>8,this[e+2]=t>>>16,this[e+3]=t>>>24,e+4},u.prototype.writeInt32BE=function(t,e,n){return t=+t,e>>>=0,n||x(this,t,e,4,2147483647,-2147483648),t<0&&(t=4294967295+t+1),this[e]=t>>>24,this[e+1]=t>>>16,this[e+2]=t>>>8,this[e+3]=255&t,e+4},u.prototype.writeBigInt64LE=Q((function(t,e=0){return P(this,t,e,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))})),u.prototype.writeBigInt64BE=Q((function(t,e=0){return $(this,t,e,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))})),u.prototype.writeFloatLE=function(t,e,n){return z(this,t,e,!0,n)},u.prototype.writeFloatBE=function(t,e,n){return z(this,t,e,!1,n)},u.prototype.writeDoubleLE=function(t,e,n){return N(this,t,e,!0,n)},u.prototype.writeDoubleBE=function(t,e,n){return N(this,t,e,!1,n)},u.prototype.copy=function(t,e,n,r){if(!u.isBuffer(t))throw new TypeError("argument should be a Buffer");if(n||(n=0),r||0===r||(r=this.length),e>=t.length&&(e=t.length),e||(e=0),r>0&&r<n&&(r=n),r===n)return 0;if(0===t.length||0===this.length)return 0;if(e<0)throw new RangeError("targetStart out of bounds");if(n<0||n>=this.length)throw new RangeError("Index out of range");if(r<0)throw new RangeError("sourceEnd out of bounds");r>this.length&&(r=this.length),t.length-e<r-n&&(r=t.length-e+n);const i=r-n;return this===t&&"function"==typeof Uint8Array.prototype.copyWithin?this.copyWithin(e,n,r):Uint8Array.prototype.set.call(t,this.subarray(n,r),e),i},u.prototype.fill=function(t,e,n,r){if("string"==typeof t){if("string"==typeof e?(r=e,e=0,n=this.length):"string"==typeof n&&(r=n,n=this.length),void 0!==r&&"string"!=typeof r)throw new TypeError("encoding must be a string");if("string"==typeof r&&!u.isEncoding(r))throw new TypeError("Unknown encoding: "+r);if(1===t.length){const e=t.charCodeAt(0);("utf8"===r&&e<128||"latin1"===r)&&(t=e)}}else"number"==typeof t?t&=255:"boolean"==typeof t&&(t=Number(t));if(e<0||this.length<e||this.length<n)throw new RangeError("Out of range index");if(n<=e)return this;let i;if(e>>>=0,n=void 0===n?this.length:n>>>0,t||(t=0),"number"==typeof t)for(i=e;i<n;++i)this[i]=t;else{const o=u.isBuffer(t)?t:u.from(t,r),s=o.length;if(0===s)throw new TypeError('The value "'+t+'" is invalid for argument "value"');for(i=0;i<n-e;++i)this[i+e]=o[i%s]}return this};const j={};function D(t,e,n){j[t]=class extends n{constructor(){super(),Object.defineProperty(this,"message",{value:e.apply(this,arguments),writable:!0,configurable:!0}),this.name=`${this.name} [${t}]`,this.stack,delete this.name}get code(){return t}set code(t){Object.defineProperty(this,"code",{configurable:!0,enumerable:!0,value:t,writable:!0})}toString(){return`${this.name} [${t}]: ${this.message}`}}}function F(t){let e="",n=t.length;const r="-"===t[0]?1:0;for(;n>=r+4;n-=3)e=`_${t.slice(n-3,n)}${e}`;return`${t.slice(0,n)}${e}`}function M(t,e,n,r,i,o){if(t>n||t<e){const r="bigint"==typeof e?"n":"";let i;throw i=o>3?0===e||e===BigInt(0)?`>= 0${r} and < 2${r} ** ${8*(o+1)}${r}`:`>= -(2${r} ** ${8*(o+1)-1}${r}) and < 2 ** ${8*(o+1)-1}${r}`:`>= ${e}${r} and <= ${n}${r}`,new j.ERR_OUT_OF_RANGE("value",i,t)}!function(t,e,n){q(e,"offset"),void 0!==t[e]&&void 0!==t[e+n]||V(e,t.length-(n+1))}(r,i,o)}function q(t,e){if("number"!=typeof t)throw new j.ERR_INVALID_ARG_TYPE(e,"number",t)}function V(t,e,n){if(Math.floor(t)!==t)throw q(t,n),new j.ERR_OUT_OF_RANGE(n||"offset","an integer",t);if(e<0)throw new j.ERR_BUFFER_OUT_OF_BOUNDS;throw new j.ERR_OUT_OF_RANGE(n||"offset",`>= ${n?1:0} and <= ${e}`,t)}D("ERR_BUFFER_OUT_OF_BOUNDS",(function(t){return t?`${t} is outside of buffer bounds`:"Attempt to access memory outside buffer bounds"}),RangeError),D("ERR_INVALID_ARG_TYPE",(function(t,e){return`The "${t}" argument must be of type number. Received type ${typeof e}`}),TypeError),D("ERR_OUT_OF_RANGE",(function(t,e,n){let r=`The value of "${t}" is out of range.`,i=n;return Number.isInteger(n)&&Math.abs(n)>2**32?i=F(String(n)):"bigint"==typeof n&&(i=String(n),(n>BigInt(2)**BigInt(32)||n<-(BigInt(2)**BigInt(32)))&&(i=F(i)),i+="n"),r+=` It must be ${e}. Received ${i}`,r}),RangeError);const Y=/[^+/0-9A-Za-z-_]/g;function G(t,e){let n;e=e||1/0;const r=t.length;let i=null;const o=[];for(let s=0;s<r;++s){if(n=t.charCodeAt(s),n>55295&&n<57344){if(!i){if(n>56319){(e-=3)>-1&&o.push(239,191,189);continue}if(s+1===r){(e-=3)>-1&&o.push(239,191,189);continue}i=n;continue}if(n<56320){(e-=3)>-1&&o.push(239,191,189),i=n;continue}n=65536+(i-55296<<10|n-56320)}else i&&(e-=3)>-1&&o.push(239,191,189);if(i=null,n<128){if((e-=1)<0)break;o.push(n)}else if(n<2048){if((e-=2)<0)break;o.push(n>>6|192,63&n|128)}else if(n<65536){if((e-=3)<0)break;o.push(n>>12|224,n>>6&63|128,63&n|128)}else{if(!(n<1114112))throw new Error("Invalid code point");if((e-=4)<0)break;o.push(n>>18|240,n>>12&63|128,n>>6&63|128,63&n|128)}}return o}function H(t){return r.toByteArray(function(t){if((t=(t=t.split("=")[0]).trim().replace(Y,"")).length<2)return"";for(;t.length%4!=0;)t+="=";return t}(t))}function W(t,e,n,r){let i;for(i=0;i<r&&!(i+n>=e.length||i>=t.length);++i)e[i+n]=t[i];return i}function J(t,e){return t instanceof e||null!=t&&null!=t.constructor&&null!=t.constructor.name&&t.constructor.name===e.name}function Z(t){return t!=t}const K=function(){const t="0123456789abcdef",e=new Array(256);for(let n=0;n<16;++n){const r=16*n;for(let i=0;i<16;++i)e[r+i]=t[n]+t[i]}return e}();function Q(t){return"undefined"==typeof BigInt?X:t}function X(){throw new Error("BigInt not supported")}}}]);
//# sourceMappingURL=9763.e485ece1.chunk.js.map