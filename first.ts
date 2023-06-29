const a: string = '5';
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
