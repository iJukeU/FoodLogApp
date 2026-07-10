import curryPan from '../../FoodImages/S__12189702-removebg-preview.png';
import fries from '../../FoodImages/S__12189703-removebg-preview.png';
import skewer from '../../FoodImages/S__12189704-removebg-preview.png';
import coffee from '../../FoodImages/S__12189705-removebg-preview.png';
import broccoli from '../../FoodImages/S__12189706-removebg-preview.png';
import iceCream from '../../FoodImages/S__12189707-removebg-preview.png';
import nugget from '../../FoodImages/S__12189708-removebg-preview.png';
import tomato from '../../FoodImages/S__12189709-removebg-preview.png';
import hotDog from '../../FoodImages/S__12189710-removebg-preview.png';
import donut from '../../FoodImages/S__12189711-removebg-preview.png';
import tart from '../../FoodImages/S__12189712-removebg-preview.png';
import burger from '../../FoodImages/S__12189713-removebg-preview.png';

export type FoodPost = {
  id: number;
  friend: string;
  handle: string;
  food: string;
  note: string;
  time: string;
  date: string;
  calendarDay: number;
  calories: number;
  place: string;
  category: string;
  image: string;
  icon: string;
  /** 地圖標記座標（對應後端 meals 未來的 latitude/longitude 欄位） */
  latitude: number;
  longitude: number;
  /** 地址描述，顯示在地圖資訊卡 */
  address: string;
  /** ISO 時間戳，Timeline Replay 依此排序播放 */
  timestamp: string;
};

export const foodPosts: FoodPost[] = [
  {
    id: 1,
    friend: '\u5077\u6bd4',
    handle: 'yy.11_0707',
    food: '\u4eca\u5929\u5403\u5496\u54e9\u98ef',
    note: '\u751f\u5b58\u5831\u5099\uff1a\u665a\u9910\u5df2\u7d93\u89e3\u6c7a',
    time: '2h ago',
    date: 'OCT 31',
    calendarDay: 5,
    calories: 520,
    place: 'CURRY HOUSE',
    category: '\u5496\u54e9\u98ef',
    image: curryPan,
    icon: '🥚',
    latitude: 25.033,
    longitude: 121.543,
    address: '台北市大安區忠孝東路四段',
    timestamp: '2025-10-31T19:30:00',
  },
  {
    id: 2,
    friend: '\u90ed\u716e\u9b5a',
    handle: '_chen0317',
    food: '\u8d77\u53f8\u6f22\u5821',
    note: '\u770b\u8d77\u4f86\u5f88\u597d\u5403',
    time: '3h ago',
    date: 'OCT 30',
    calendarDay: 1,
    calories: 640,
    place: 'BURGER HUB',
    category: '\u6f22\u5821',
    image: burger,
    icon: '🍔',
    latitude: 25.036,
    longitude: 121.567,
    address: '台北市信義區松壽路',
    timestamp: '2025-10-30T12:40:00',
  },
  {
    id: 3,
    friend: 'TK',
    handle: 'tk_food',
    food: '\u8377\u5305\u86cb',
    note: '\u5403\u6211',
    time: '5h ago',
    date: 'OCT 29',
    calendarDay: 20,
    calories: 90,
    place: 'BREAKFAST CLUB',
    category: '\u86cb\u6599\u7406',
    image: fries,
    icon: '🍟',
    latitude: 25.0525,
    longitude: 121.532,
    address: '台北市中山區南京東路二段',
    timestamp: '2025-10-29T08:20:00',
  },
  {
    id: 4,
    friend: '\u67d0\u67d0',
    handle: 'yan_ting_0',
    food: '\u86cb\u5854',
    note: '\u5348\u5f8c\u751c\u9ede\u88dc\u7d66',
    time: '6h ago',
    date: 'OCT 28',
    calendarDay: 18,
    calories: 180,
    place: 'PASTRY SHOP',
    category: '\u751c\u9ede',
    image: tart,
    icon: '🥧',
    latitude: 25.0421,
    longitude: 121.5079,
    address: '台北市萬華區漢中街',
    timestamp: '2025-10-28T15:10:00',
  },
  {
    id: 5,
    friend: 'Alex',
    handle: 'alex_daily',
    food: '\u756a\u8304',
    note: '\u4eca\u5929\u5403\u5f97\u6bd4\u8f03\u6e05\u723d',
    time: '1d ago',
    date: 'OCT 27',
    calendarDay: 15,
    calories: 22,
    place: 'FRESH MART',
    category: '\u852c\u679c',
    image: tomato,
    icon: '🍅',
    latitude: 25.0148,
    longitude: 121.534,
    address: '台北市中正區羅斯福路四段',
    timestamp: '2025-10-27T12:05:00',
  },
  {
    id: 6,
    friend: 'Mina',
    handle: 'mina_ice',
    food: '\u82b1\u6930\u83dc',
    note: '\u7d42\u65bc\u5403\u4e86\u7da0\u8272\u7684\u6771\u897f',
    time: '1d ago',
    date: 'OCT 26',
    calendarDay: 12,
    calories: 45,
    place: 'GREEN BOWL',
    category: '\u852c\u83dc',
    image: broccoli,
    icon: '🥦',
    latitude: 25.0498,
    longitude: 121.5776,
    address: '台北市松山區南京東路五段',
    timestamp: '2025-10-26T18:45:00',
  },
  {
    id: 7,
    friend: 'Rae',
    handle: 'rae_snack',
    food: '\u8106\u76ae\u96de\u6392',
    note: '\u4eca\u5929\u9700\u8981\u4e00\u9ede\u70b8\u7269',
    time: '2d ago',
    date: 'OCT 25',
    calendarDay: 11,
    calories: 520,
    place: 'WING STOP',
    category: '\u70b8\u7269',
    image: nugget,
    icon: '🍗',
    latitude: 25.0881,
    longitude: 121.5254,
    address: '台北市士林區文林路',
    timestamp: '2025-10-25T20:30:00',
  },
  {
    id: 8,
    friend: 'Ning',
    handle: 'ning_cafe',
    food: '\u6fc3\u7e2e\u5496\u5561',
    note: '\u5beb\u5831\u544a\u7684\u71c3\u6599',
    time: '2d ago',
    date: 'OCT 24',
    calendarDay: 9,
    calories: 5,
    place: 'CITY CAFE',
    category: '\u5496\u5561',
    image: coffee,
    icon: '☕',
    latitude: 25.0466,
    longitude: 121.5173,
    address: '台北市中正區忠孝西路一段',
    timestamp: '2025-10-24T09:15:00',
  },
  {
    id: 9,
    friend: 'Yu',
    handle: 'yu_sweet',
    food: '\u8393\u679c\u751c\u7b52',
    note: '\u751c\u9ede\u4e5f\u662f\u4e00\u7a2e\u751f\u5b58\u65b9\u5f0f',
    time: '3d ago',
    date: 'OCT 23',
    calendarDay: 8,
    calories: 310,
    place: 'ICE CREAMERY',
    category: '\u751c\u9ede',
    image: iceCream,
    icon: '🍦',
    latitude: 25.0416,
    longitude: 121.5546,
    address: '台北市大安區敦化南路一段',
    timestamp: '2025-10-23T16:20:00',
  },
  {
    id: 10,
    friend: 'Han',
    handle: 'han_bar',
    food: '\u7cd6\u971c\u751c\u751c\u5708',
    note: '\u592a\u665a\u4e86\u4f46\u9084\u662f\u60f3\u5403',
    time: '3d ago',
    date: 'OCT 22',
    calendarDay: 7,
    calories: 280,
    place: 'SWEET BAR',
    category: '\u751c\u9ede',
    image: donut,
    icon: '🍩',
    latitude: 25.058,
    longitude: 121.5266,
    address: '台北市中山區中山北路二段',
    timestamp: '2025-10-22T22:10:00',
  },
  {
    id: 11,
    friend: 'Bo',
    handle: 'bo_night',
    food: '\u71b1\u72d7\u5821',
    note: '\u5bb5\u591c\u5831\u5099',
    time: '4d ago',
    date: 'OCT 21',
    calendarDay: 6,
    calories: 430,
    place: 'NIGHT STAND',
    category: '\u5bb5\u591c',
    image: hotDog,
    icon: '🌭',
    latitude: 25.0554,
    longitude: 121.5156,
    address: '台北市大同區寧夏路夜市',
    timestamp: '2025-10-21T23:40:00',
  },
  {
    id: 12,
    friend: 'Lin',
    handle: 'lin_bbq',
    food: '\u70e4\u4e32',
    note: '\u9031\u672b\u5c0f\u805a',
    time: '5d ago',
    date: 'OCT 20',
    calendarDay: 10,
    calories: 360,
    place: 'STREET BBQ',
    category: '\u70e4\u7269',
    image: skewer,
    icon: '🍢',
    latitude: 25.0509,
    longitude: 121.5772,
    address: '台北市松山區饒河街夜市',
    timestamp: '2025-10-20T21:00:00',
  },
];

export const friends = [
  { id: 1, name: '\u5077\u6bd4', handle: 'yy.11_0707', message: '\u97d3\u5e2d', unread: false },
  { id: 2, name: '\u90ed\u716e\u9b5a', handle: '_chen0317', message: '\u6b38\u770b\u8d77\u4f86\u5f88\u597d\u5403', unread: false },
  { id: 3, name: 'TK', handle: 'tk_food', message: '\u5403\u6211', unread: false },
  { id: 4, name: '\u67d0\u67d0', handle: 'yan_ting_0', message: '\u5382', unread: true },
];

export const monthlySummary = {
  mealsLogged: 16,
  daysTracked: 16,
  totalCalories: 42850,
  towerHeight: 12,
  savedPlaces: 14,
  diversity: 8,
};
