var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _A13_b;
/* 기본적으로 변수, 속성, 매개변수, 리턴값에 타입이 붙었다고 생각하면 됨 */
const a = '5'; // String 처럼 대문자 쓰지 말라
const b = 5;
const c = true;
const d = undefined;
const e = null;
const f = true; // any를 쓰면 타입을 쓰는 의미가 없음
const g = true; // 고정된 원시값
function add(x, y) { return x + y; }
const add2 = (x, y) => x + y;
// interface Add {
//     (x: number, y: number): number;
// }
const add3 = (x, y) => x + y;
const arr = ['123', '456'];
const arr2 = [123, 456];
const arr3 = [123, 456, 'hello']; // tuple
const obj = { lat: 37.5, lon: 127.5 };
// tsc의 역할
// 1. ts를 js로 변환: npx tsc
// 2. 타입 검사: npx tsc --noEmit
// vscode 쓰는 이유. tsc --noEmit 을 알아서 계속 돌려줌
// ts에서 타입 부분 코드를 지웠을 때 올바른 js 코드여야 함
// ts가 타입 추론을 잘못했을 경우에만 타입 추가해라
// 타입을 최대한 좁게 적어라
/* never, unknown, any 타입 주의하기. any는 최대한 피하고 쓰더라도 나중에 꼭 제대로 타이핑하기 */
try {
    const array = []; // noImplicitAny가 false일 때
    array.push('hello');
}
catch (error) {
    error;
}
// 빈 배열은 never인 점 주의. 빈 배열 선언할 때 타이핑해줘라
/* 최대한 ! 대신 if를 쓸 것 */
const head = document.querySelector('#head');
console.log(head);
const head2 = document.querySelector('#head');
if (head2) {
    console.log(head2);
}
// world나 hell을 타입 자동완성으로 추천해줌. 타입 정교하게 만들 때 좋음
/* 배열, 튜플 문법 */
let arr4 = [];
let arr5 = [];
function rest(...args) { }
const tuple = ['1', 1];
// tuple[2] = 'hello'; // 얘는 에러 나는데
tuple.push('hello'); // 얘는 가능
// enum이란 것도 있다. 변수들을 하나의 그룹으로 묶고 싶을 때 주로 사용
// enum은 js로 변환하면 사라짐
// enum 말고 그냥 객체로 해도 됨
const ODirection = {
    Up: 0,
    Down: 1,
    Left: 2,
    Right: 3,
}; // 이 속성들을 상수로 쓰겠다
// 객체는 js로 변환하면 안 사라지고 남아있음. 웬만하면 남기는 거 추천
// (enum member) EDirection.Up = 0 // readonly라 할당이 안 됨
function walk(dir) { } // enum은 직접 타입으로 쓸 수 있음
function run(dir) { }
const obj2 = { a: '123', b: 'hello', c: 'world' }; // 고정된 값으로 타이핑
// 값을 타입으로 쓰고 싶으면 앞에 typeof 붙여줘야 함
walk(2 /* EDirection.Left */);
run(ODirection.Right);
const aa = { a: 'hello' };
const bb = { a: 'hello' };
const aaa = { a: 'hello', b: 'world' }; // union일 때는 여러 속성 중에 하나만 있어도 됨
const bbb = { a: 'hello', b: 'world' }; // intersection일 때는 모든 속성이 다 있어야 함
const waterDeer = { breath: true, breed: true };
const me = { breath: true, breed: true, think: true };
const obj1 = { a: 'hello', b: 'world' };
const ab = { name: 'en' };
// const a5: A5 = { hello: 'world', why: 'error' };
// 넓은 타입에 좁은 타입을 대입하는데 왜 안되냐. 객체 리터럴을 바로 대입하면 잉여 속성 검사에서 에러
const b5 = { hello: 'world', why: 'error' };
const c5 = b5; // 변수로 빼주면 에러 사라짐
/* void 타입은 return값을 사용하지 안 겠다는 뜻(메서드나 매개변수에서는 리턴값 사용 가능, but 조심해야 함) */
function fa(callback) {
}
fa(() => {
    return '3'; // 리턴값이 뭐든 간에 사용하지 않겠다
});
const human2 = {
    talk() { return 'abc'; } // 리턴값이 뭐든 간에 사용하지 않겠다
};
// declare function forEach<T>(arr: T[], callback: (el: T) => void): void;
let target = [];
forEach([1, 2, 3], el => target.push(el)); // 리턴값이 number임. void는 리턴값이 있어도 허용
const a6 = {
    talk() { return 3; }
};
// 추후 declare module, declare global, declare namespace도 배움
/* unknown과 any */
// any 쓸 바에는 unknown 씀. 지금 당장 타입을 정확하게 모르겠을 때. any는 ts를 쓰기를 포기한 것임
try {
}
catch (error) { // error의 타입은 unknown
    error.message;
}
/* 타입 좁히기(타입 가드) */
// 유니온 타입의 인자를 처리할 때 정확히 어떤 타입인지 검사해야 할 경우
function numOrStr(a) {
    // (a as number).toFixed(1); // unknown일 때는 as 쓰지 마라
    if (typeof a === 'number') {
        a.toFixed(1);
    }
    else { // string
        a.charAt(3);
    }
}
function numOrNumArray(a) {
    if (Array.isArray(a)) { // number[]
        a.concat(4);
    }
    else { // number
        a.toFixed(3);
    }
}
class A8 {
    a8() { }
}
class B8 {
    b8() { }
}
function aOrB(param) {
    if (param instanceof A8) {
        param.a8();
    }
}
aOrB(new A8()); // 인스턴스를 넣어주어야 함
aOrB(new B8());
function typeCheck(a) {
    if (a.type === 'b') { // 보통 값으로 더 많이 구분함. 객체들 간 구분할 때 type 속성 달아두는 거 추천
        a.bbb; // a: B9
    }
    else if (a.type === 'c') {
        a.ccc; // a: C9
    }
    else {
        a.ddd; // a: D9
    }
    if ('bbb' in a) { // in 연산자를 이용해서 속성명으로 구분할 수도 있음
        a.type;
    }
    else if ('ccc' in a) {
        a.type;
    }
    else {
        a.type;
    }
}
function catOrDog(a) {
    // 타입 판별 직접 만들기
    if (a.meow) {
        return false;
    }
    return true;
}
function pet(a) {
    if (catOrDog(a)) { // 커스텀 함수 사용
        console.log(a.bow);
    }
    if ('meow' in a) {
        console.log(a.meow);
    }
}
const isRejected = (input) => input.status === 'rejected';
const isFulfilled = (input) => input.status === 'fulfilled';
// Promise -> Pending -> Settled(Fulfilled, Rejected)
// Promise를 비동기로 실행하는 도중에는 Pending 상태였다가 완료되면 Settled 상태로 변함. 성공했으면 Fulfilled, 실패했으면 Rejected
// promises.then().catch()에서 전체는 Settled, then() 부분은 Fulfilled, catch() 부분은 Rejected
const promises = await Promise.allSettled([Promise.resolve('a'), Promise.resolve('b')]); // 성공했는지 실패했는지 모름
const errors = promises.filter(isRejected); // ts가 Rejected라고 추론하도록 함
/* {}와 Object */
const x = 'hello';
const y = 'hi'; // {}와 Object는 모든 타입을 가리킴(null과 undefined는 제외)
// const xx: object = 'hi'; // Type 'string' is not assignable to type 'object'.
const yy = { hello: 'world!' }; // object 지양해라. interface, type, class 써라
const z = 'hi';
// unknown도 any처럼 모든 타입, null, undefined를 다 받을 수 있음. any보다는 unknown 권장
// unknown = {} | null | undefined
if (z) {
    z; // z: {}
}
else {
    z; // z: unknown
}
/* class에 private, protected 추가됨 */
class A13 {
    constructor(a, b = 456) {
        _A13_b.set(this, void 0); // js의 private
        this.a = a;
        __classPrivateFieldSet(this, _A13_b, b, "f");
    }
    method() {
        console.log(this.a, __classPrivateFieldGet(this, _A13_b, "f"));
    }
}
_A13_b = new WeakMap();
const a13 = new A13('123');
class B14 {
    constructor() {
        this.c = 'wow'; // 아무것도 안 쓰면 public. 안과 밖 둘다에서 쓸 수 있음
        this._a = '123';
        this._b = 'world';
    }
    get a() { return this._a; }
    set a(value) { this._a = value; }
    get b() { return this._b; }
    set b(value) { this._b = value; }
    method() {
        console.log(this._a);
        console.log(this._b);
        console.log(this.c);
    }
}
class C14 extends B14 {
    method() {
        // console.log(this._a); // 에러
        console.log(this._b);
        console.log(this.c);
    }
}
// new C14()._a; // 에러
// new C14()._b; // 에러
new C14().c;
export {};
//             public   protected   private
// 클래스 내부      O          O          O
// 인스턴스         O          X          X
// 상속 클래스      O          O          X    
// js로 변환하면 private, protected 전부 다 사라짐
