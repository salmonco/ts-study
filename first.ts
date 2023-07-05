/* 기본적으로 변수, 속성, 매개변수, 리턴값에 타입이 붙었다고 생각하면 됨 */
const a: string = '5'; // String 처럼 대문자 쓰지 말라
const b: number = 5;
const c: boolean = true;
const d: undefined = undefined;
const e: null = null;
const f: any = true; // any를 쓰면 타입을 쓰는 의미가 없음
const g: true = true; // 고정된 원시값

function add(x: number, y: number): number { return x + y }
const add2: (x: number, y: number) => number = (x, y) => x + y;

type Add = (x: number, y: number) => number;
// interface Add {
//     (x: number, y: number): number;
// }

const add3: Add = (x, y) => x + y;

const arr: string[] = ['123', '456'];
const arr2: Array<number> = [123, 456];
const arr3: [number, number, string] = [123, 456, 'hello']; // tuple
const obj: { lat: number, lon: number } = { lat: 37.5, lon: 127.5 };

// tsc의 역할
// 1. ts를 js로 변환: npx tsc
// 2. 타입 검사: npx tsc --noEmit

// vscode 쓰는 이유. tsc --noEmit 을 알아서 계속 돌려줌
// ts에서 타입 부분 코드를 지웠을 때 올바른 js 코드여야 함

// ts가 타입 추론을 잘못했을 경우에만 타입 추가해라
// 타입을 최대한 좁게 적어라

/* never, unknown, any 타입 주의하기. any는 최대한 피하고 쓰더라도 나중에 꼭 제대로 타이핑하기 */
try {
    const array: string[] = []; // noImplicitAny가 false일 때
    array.push('hello');
} catch(error) {
    error;
}
// 빈 배열은 never인 점 주의. 빈 배열 선언할 때 타이핑해줘라

/* 최대한 ! 대신 if를 쓸 것 */
const head: Element = document.querySelector('#head')!;
console.log(head);

const head2 = document.querySelector('#head')!;
if (head2) {
  console.log(head2);
}
// '!'는 null이나 undefined가 아님을 보증하는 것인데, 웬만하면 안 쓰는 게 좋음

/* 템플릿 리터럴 타입이 존재(유니언 등 사용 가능) */
type World = "world" | "hell";

// type Greeting = "hello world"
type Greeting = `hello ${World}`; // 템플릿 리터럴 타입
// world나 hell을 타입 자동완성으로 추천해줌. 타입 정교하게 만들 때 좋음

/* 배열, 튜플 문법 */
let arr4: string[] = [];
let arr5: Array<string> = [];
function rest(...args: string[]) {}

const tuple: [string, number] = ['1', 1];
// tuple[2] = 'hello'; // 얘는 에러 나는데
tuple.push('hello'); // 얘는 가능

/* enum, keyof, typeof */
const enum EDirection {
    Up,
    Down,
    Left,
    Right,
}
// enum이란 것도 있다. 변수들을 하나의 그룹으로 묶고 싶을 때 주로 사용
// enum은 js로 변환하면 사라짐

// enum 말고 그냥 객체로 해도 됨
const ODirection = {
    Up: 0,
    Down: 1,
    Left: 2,
    Right: 3,
} as const; // 이 속성들을 상수로 쓰겠다
// 객체는 js로 변환하면 안 사라지고 남아있음. 웬만하면 남기는 거 추천
            
// (enum member) EDirection.Up = 0 // readonly라 할당이 안 됨

function walk(dir: EDirection) {} // enum은 직접 타입으로 쓸 수 있음

// 객체로 하려면 라인이 좀 더 길어짐
type Direction = typeof ODirection[keyof typeof ODirection]; // value들 가져오기
function run(dir: Direction) {}

const obj2 = {a: '123', b: 'hello', c: 'world'} as const; // 고정된 값으로 타이핑
type Key = keyof typeof obj2; // "a" | "b" | "c"
type Value = typeof obj2[keyof typeof obj2] // "123" | "hello" | "world"
// 값을 타입으로 쓰고 싶으면 앞에 typeof 붙여줘야 함

walk(EDirection.Left);
run(ODirection.Right);

/* 객체 타이핑: type과 interface 구분하기 */
type A = { a: string };
const aa: A = { a: 'hello' };

interface B { a: string }
const bb: B = { a: 'hello' };
// 간단하게 하고 싶으면 type
// 객체지향 프로그래밍을 하고 싶으면 interface

/* union, intersection */
// function add(x: string | number, y: string | number): string | number { return x + y }
// add(1, 2)
// add('1', '2')
// add(1, '2')

type A2 = {
    a: string;
}
type B2 = {
    b: string;
}

const aaa: A2 | B2 = { a: 'hello', b: 'world' }; // union일 때는 여러 속성 중에 하나만 있어도 됨
const bbb: A2 & B2 = { a: 'hello', b: 'world' }; // intersection일 때는 모든 속성이 다 있어야 함

// 상속
type Animal = { breath: true };
type Mammal = Animal & { breed: true };
type Human = Mammal & { think: true };

interface Animal2 {
    breath: true
}
interface Mammal2 extends Animal2 { // 좀 더 직관적
    breed: true
}

const waterDeer: Mammal2 = { breath: true, breed: true };
const me: Human = { breath: true, breed: true, think: true };

// interface는 같은 이름으로 여러 번 선언 가능. 선언할 때마다 합쳐짐
interface A3 { a: string }
interface A3 { b: string }
const obj1: A3 = { a: 'hello', b: 'world' }
// type보다 interface를 많이 씀. 나중에 확장 쉽기 때문

/* 객체 리터럴은 잉여 속성 검사가 있음 */
// 객체는 속성이 많을수록(구체적일수록) 좁은 타입임
type A4 = { name: string };
type B4 = { age: number };
type C4 = { name: string, age: number }; // 얘가 더 좁은 타임임. A4 & B4
type AB = A4 | B4; // 더 넓은 타입임
const ab: AB = { name: 'en' };
// 좁은 타입은 넓은 타입에 대입 가능. 넓은 타입을 좁은 타입에 넣는 건 안 됨

type A5 = { hello: string };
// const a5: A5 = { hello: 'world', why: 'error' };
// 넓은 타입에 좁은 타입을 대입하는데 왜 안되냐. 객체 리터럴을 바로 대입하면 잉여 속성 검사에서 에러
const b5 = { hello: 'world', why: 'error' };
const c5: A5 = b5; // 변수로 빼주면 에러 사라짐

/* void 타입은 return값을 사용하지 안 겠다는 뜻(메서드나 매개변수에서는 리턴값 사용 가능, but 조심해야 함) */
function fa(callback: () => void): void { // 리턴값이 없다는 의미
}
fa(() => {
    return '3'; // 리턴값이 뭐든 간에 사용하지 않겠다
});

interface Human2 {
    talk: () => void
}

const human2: Human2 = {
    talk() { return 'abc'; } // 리턴값이 뭐든 간에 사용하지 않겠다
}

declare function forEach<T>(arr: T[], callback: (el: T) => void): void;
// declare function forEach<T>(arr: T[], callback: (el: T) => void): void;
let target: number[] = [];
forEach([1, 2, 3], el => target.push(el)); // 리턴값이 number임. void는 리턴값이 있어도 허용

interface A6 {
    talk: () => void;
}
const a6: A6 = {
    talk() { return 3; }
}

/* 타입만 선언하고 싶을 때 declare(구현은 다른 파일에 있어야 함) */
declare const a7: string;
declare function fa7(x: number): number;
declare class A7 {}
// 추후 declare module, declare global, declare namespace도 배움

/* unknown과 any */
// any 쓸 바에는 unknown 씀. 지금 당장 타입을 정확하게 모르겠을 때. any는 ts를 쓰기를 포기한 것임
try {

} catch (error) { // error의 타입은 unknown
    (error as Error).message
}

/* 타입 좁히기(타입 가드) */
// 유니온 타입의 인자를 처리할 때 정확히 어떤 타입인지 검사해야 할 경우
function numOrStr(a: number | string) {
    // (a as number).toFixed(1); // unknown일 때는 as 쓰지 마라
    if (typeof a === 'number') {
        a.toFixed(1);
    } else { // string
        a.charAt(3);
    }
}

function numOrNumArray(a: number | number[]) {
    if (Array.isArray(a)) { // number[]
        a.concat(4);
    } else { // number
        a.toFixed(3);
    }
}

class A8 {
    a8() {}
}
class B8 {
    b8() {}
}
function aOrB(param: A8 | B8) {
    if (param instanceof A8) {
        param.a8();
    }
}
aOrB(new A8()); // 인스턴스를 넣어주어야 함
aOrB(new B8());
// 원시값일 때는 typeof, 배열일 때는 Array.isArray(), 클래스일 때는 instanceof 씀

type B9 = { type: 'b', bbb: string };
type C9 = { type: 'c', ccc: string };
type D9 = { type: 'd', ddd: string };
type A9 = B9 | C9 | D9;
function typeCheck(a: A9) {
  if (a.type === 'b') { // 보통 값으로 더 많이 구분함. 객체들 간 구분할 때 type 속성 달아두는 거 추천
    a.bbb; // a: B9
  } else if (a.type === 'c') {
    a.ccc; // a: C9
  } else {
    a.ddd; // a: D9
  }

  if ('bbb' in a) { // in 연산자를 이용해서 속성명으로 구분할 수도 있음
    a.type;
  } else if ('ccc' in a) {
    a.type;
  } else {
    a.type;
  }
}
// ts가 if문에 대해 타입 추론을 정확하게 해줌

/* 커스텀 타입 가드(is, 형식 조건자) */
// typeof, Array.isArray(), instanceof 말고도, 타입을 구분해주는 커스텀 함수를 직접 만들 수 있음
interface Cat { meow: number }
interface Dog { bow: number }
function catOrDog(a: Cat | Dog): a is Dog { // 리턴값에 is가 있으면 커스텀 타입 가드로 구분
  // 타입 판별 직접 만들기
  if ((a as Cat).meow) { return false }
  return true;
}

function pet(a: Cat | Dog) {
  if (catOrDog(a)) { // 커스텀 함수 사용
      console.log(a.bow);
  }
  if ('meow' in a) {
      console.log(a.meow);
  }
}

const isRejected = (input: PromiseSettledResult<unknown>): input is PromiseRejectedResult => input.status === 'rejected';
const isFulfilled = <T>(input: PromiseSettledResult<T>): input is PromiseFulfilledResult<T> => input.status === 'fulfilled';

// Promise -> Pending -> Settled(Fulfilled, Rejected)
// Promise를 비동기로 실행하는 도중에는 Pending 상태였다가 완료되면 Settled 상태로 변함. 성공했으면 Fulfilled, 실패했으면 Rejected
// promises.then().catch()에서 전체는 Settled, then() 부분은 Fulfilled, catch() 부분은 Rejected

const promises = await Promise.allSettled([Promise.resolve('a'), Promise.resolve('b')]); // 성공했는지 실패했는지 모름
const errors = promises.filter(isRejected); // ts가 Rejected라고 추론하도록 함
export {};

/* {}와 Object */
const x: {} = 'hello';
const y: Object = 'hi'; // {}와 Object는 모든 타입을 가리킴(null과 undefined는 제외)
// const xx: object = 'hi'; // Type 'string' is not assignable to type 'object'.
const yy: object = { hello: 'world!' }; // object 지양해라. interface, type, class 써라
const z: unknown = 'hi';
// unknown도 any처럼 모든 타입, null, undefined를 다 받을 수 있음. any보다는 unknown 권장
// unknown = {} | null | undefined
if (z) {
    z; // z: {}
} else {
    z; // z: unknown
}

/* readonly, 인덱스드 시그니처, 맵드 타입스 */
interface A10 {
    readonly a: string;
    b: string;
}

type A11 = { [key: string]: number } // 속성이 너무 많은데 전부 다 문자열이었음 좋겠어. 인덱스드 시그니처

type B12 = 'Human' | 'Mammal' | 'Animal';
type A12 = { [key in B12]: B12 }; // 속성이 Human, Mammal, Animal 중 하나였으면 좋겠어. 맵드 타입스
