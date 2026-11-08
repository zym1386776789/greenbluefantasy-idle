'use strict';

/* ============ 地图定义：9 章 × 10 区 ============ */
const CHAPTERS = [
  { name: '新手草原', monsters: ['草团','史莱姆','野兔','田鼠','青蛙','野鸡','野狗','野猫','土狼','小野猪'] },
  { name: '低矮树林', monsters: ['松鼠','刺猬','野狐','树蛙','蜜蜂','野鹿','啄木鸟','獾','小狼','树懒'] },
  { name: '小雪山',   monsters: ['雪兔','雪貂','雪鸡','冰蜥蜴','雪狐','小雪怪','冰蛙','雪鹰','雪貂王','雪猪'] },
  { name: '小火山',   monsters: ['火蚁','熔岩虫','小火苗','灰烬鼠','火雀','火蜥蜴','炭龟','火焰蛙','熔岩蟹','小炎兽'] },
  { name: '浅海湾',   monsters: ['海星','水母','小螃蟹','海马','贝壳怪','小鱼人','浅海龟','海胆','小章鱼','海湾水怪'] },
  { name: '低空云层', monsters: ['云雀','小风灵','飞虫','纸鸢怪','小云兽','风筝鸟','气球怪','轻风兽','小飞龙','云团怪'] },
  { name: '小沙丘',   monsters: ['沙鼠','沙蝎','蜥蜴','沙蚤','小沙虫','沙狐','仙人掌怪','沙蟹','沙蜥','小沙兽'] },
  { name: '旧墓园',   monsters: ['蝙蝠','老鼠','乌鸦','野猫','小骷髅','游魂','墓穴鼠','小幽灵','食腐犬','小墓兽'] },
  { name: '废弃小镇', monsters: ['流浪狗','野猫','乌鸦','老鼠','小盗贼','旧卫兵','破旧石像','小恶魔','破甲骑士','遗迹守卫'] },
];
const TOTAL_AREAS = 90;      // 1-1 ~ 9-10
const UNLOCK_KILLS = 5;      // 在最新区域击杀 5 只解锁下一区域

/* ============ 武器池：仅 R 级，9 种类型 × 3 把 = 27 把 ============ */
// 生命/攻击比例：刀45/55 剑50/50 杖35/65 弓30/70 斧60/40 枪55/45 乐器70/30 匕首25/75 拳套65/35
const TYPE_ORDER = ['刀','剑','杖','弓','斧','枪','乐器','拳套','匕首','铳'];
const RARITY_SORT = { UR: 0, SSR: 1, SR: 2, R: 3 }; // 武器库排序：稀有度从高到低
const TYPE_CHAPTER = { '刀':1, '剑':1, '杖':1, '弓':2, '斧':2, '枪':3, '乐器':3, '拳套':4, '匕首':4, '铳':2 };
const WEAPONS = [
  // 第一章：刀、剑、杖（总属性 T=96/100/104，差 ≤10）
  { id:'wood_knife',   type:'刀',   name:'木刀',   rarity:'R', atk:53, hp:43 },
  { id:'iron_knife',   type:'刀',   name:'铁刀',   rarity:'R', atk:55, hp:45 },
  { id:'copper_knife', type:'刀',   name:'铜刀',   rarity:'R', atk:57, hp:47 },
  { id:'wood_sword',   type:'剑',   name:'木剑',   rarity:'R', atk:48, hp:48 },
  { id:'iron_sword',   type:'剑',   name:'铁剑',   rarity:'R', atk:50, hp:50 },
  { id:'copper_sword', type:'剑',   name:'铜剑',   rarity:'R', atk:52, hp:52 },
  { id:'wood_staff',   type:'杖',   name:'木杖',   rarity:'R', atk:62, hp:34 },
  { id:'iron_staff',   type:'杖',   name:'铁杖',   rarity:'R', atk:65, hp:35 },
  { id:'copper_staff', type:'杖',   name:'铜杖',   rarity:'R', atk:68, hp:36 },
  // 第二章：弓、斧（T=96/100/104）
  { id:'wood_bow',     type:'弓',   name:'木弓',   rarity:'R', atk:67, hp:29 },
  { id:'hunt_bow',     type:'弓',   name:'猎弓',   rarity:'R', atk:70, hp:30 },
  { id:'iron_bow',     type:'弓',   name:'铁弓',   rarity:'R', atk:73, hp:31 },
  { id:'wood_axe',     type:'斧',   name:'木斧',   rarity:'R', atk:38, hp:58 },
  { id:'stone_axe',    type:'斧',   name:'石斧',   rarity:'R', atk:40, hp:60 },
  { id:'iron_axe',     type:'斧',   name:'铁斧',   rarity:'R', atk:42, hp:62 },
  // 第二章：铳（攻 80% / 生命 20%）
  { id:'wood_gun',     type:'铳',   name:'木铳',   rarity:'R', atk:77, hp:19 },
  { id:'iron_gun',     type:'铳',   name:'铁铳',   rarity:'R', atk:80, hp:20 },
  { id:'copper_gun',   type:'铳',   name:'铜铳',   rarity:'R', atk:83, hp:21 },
  // 第三章：枪、乐器（T=96/100/104）
  { id:'wood_spear',   type:'枪',   name:'木枪',   rarity:'R', atk:43, hp:53 },
  { id:'iron_spear',   type:'枪',   name:'铁枪',   rarity:'R', atk:45, hp:55 },
  { id:'copper_spear', type:'枪',   name:'铜枪',   rarity:'R', atk:47, hp:57 },
  { id:'wood_flute',   type:'乐器', name:'木笛',   rarity:'R', atk:29, hp:67 },
  { id:'copper_bell',  type:'乐器', name:'铜铃',   rarity:'R', atk:30, hp:70 },
  { id:'iron_harp',    type:'乐器', name:'铁琴',   rarity:'R', atk:31, hp:73 },
  // 第四章：拳套、匕首（T=96/100/104）
  { id:'cloth_glove',  type:'拳套', name:'布拳套', rarity:'R', atk:34, hp:62 },
  { id:'leather_glove',type:'拳套', name:'皮拳套', rarity:'R', atk:35, hp:65 },
  { id:'iron_glove',   type:'拳套', name:'铁拳套', rarity:'R', atk:36, hp:68 },
  { id:'wood_dagger',  type:'匕首', name:'木匕首', rarity:'R', atk:72, hp:24 },
  { id:'iron_dagger',  type:'匕首', name:'铁匕首', rarity:'R', atk:75, hp:25 },
  { id:'copper_dagger',type:'匕首', name:'铜匕首', rarity:'R', atk:78, hp:26 },
];

/* 5-8 章新增 R 武器（钢/银/金，总属性 96/100/104，与 1-4 章结构一致） */
const ADV_R = [
  { id:'steel_knife',   type:'刀',   name:'钢刀',   rarity:'R', atk:53, hp:43 },
  { id:'silver_knife',  type:'刀',   name:'银刀',   rarity:'R', atk:55, hp:45 },
  { id:'gold_knife',    type:'刀',   name:'金刀',   rarity:'R', atk:57, hp:47 },
  { id:'steel_sword',   type:'剑',   name:'钢剑',   rarity:'R', atk:48, hp:48 },
  { id:'silver_sword',  type:'剑',   name:'银剑',   rarity:'R', atk:50, hp:50 },
  { id:'gold_sword',    type:'剑',   name:'金剑',   rarity:'R', atk:52, hp:52 },
  { id:'steel_staff',   type:'杖',   name:'钢杖',   rarity:'R', atk:62, hp:34 },
  { id:'silver_staff',  type:'杖',   name:'银杖',   rarity:'R', atk:65, hp:35 },
  { id:'gold_staff',    type:'杖',   name:'金杖',   rarity:'R', atk:68, hp:36 },
  { id:'steel_bow',     type:'弓',   name:'钢弓',   rarity:'R', atk:67, hp:29 },
  { id:'silver_bow',    type:'弓',   name:'银弓',   rarity:'R', atk:70, hp:30 },
  { id:'gold_bow',      type:'弓',   name:'金弓',   rarity:'R', atk:73, hp:31 },
  { id:'steel_axe',     type:'斧',   name:'钢斧',   rarity:'R', atk:38, hp:58 },
  { id:'silver_axe',    type:'斧',   name:'银斧',   rarity:'R', atk:40, hp:60 },
  { id:'gold_axe',      type:'斧',   name:'金斧',   rarity:'R', atk:42, hp:62 },
  // 第六章：铳（攻 80% / 生命 20%）
  { id:'steel_gun',     type:'铳',   name:'钢铳',   rarity:'R', atk:77, hp:19 },
  { id:'silver_gun',    type:'铳',   name:'银铳',   rarity:'R', atk:80, hp:20 },
  { id:'gold_gun',      type:'铳',   name:'金铳',   rarity:'R', atk:83, hp:21 },
  { id:'steel_spear',   type:'枪',   name:'钢枪',   rarity:'R', atk:43, hp:53 },
  { id:'silver_spear',  type:'枪',   name:'银枪',   rarity:'R', atk:45, hp:55 },
  { id:'gold_spear',    type:'枪',   name:'金枪',   rarity:'R', atk:47, hp:57 },
  { id:'steel_flute',   type:'乐器', name:'钢笛',   rarity:'R', atk:29, hp:67 },
  { id:'silver_bell',   type:'乐器', name:'银铃',   rarity:'R', atk:30, hp:70 },
  { id:'gold_harp',     type:'乐器', name:'金琴',   rarity:'R', atk:31, hp:73 },
  { id:'steel_glove',   type:'拳套', name:'钢拳套', rarity:'R', atk:34, hp:62 },
  { id:'silver_glove',  type:'拳套', name:'银拳套', rarity:'R', atk:35, hp:65 },
  { id:'gold_glove',    type:'拳套', name:'金拳套', rarity:'R', atk:36, hp:68 },
  { id:'steel_dagger',  type:'匕首', name:'钢匕首', rarity:'R', atk:72, hp:24 },
  { id:'silver_dagger', type:'匕首', name:'银匕首', rarity:'R', atk:75, hp:25 },
  { id:'gold_dagger',   type:'匕首', name:'金匕首', rarity:'R', atk:78, hp:26 },
];

/* 5-8 章新增 SR 武器（精金/秘银/星陨，总属性 = R 的 2.5 倍：240/250/260，差 20 ≤ 25） */
const SR_WEAPONS = [
  { id:'ori_knife',     type:'刀',   name:'精金刀',   rarity:'SR', atk:132, hp:108 },
  { id:'mithril_knife', type:'刀',   name:'秘银刀',   rarity:'SR', atk:138, hp:112 },
  { id:'meteor_knife',  type:'刀',   name:'星陨刀',   rarity:'SR', atk:143, hp:117 },
  { id:'ori_sword',     type:'剑',   name:'精金剑',   rarity:'SR', atk:120, hp:120 },
  { id:'mithril_sword', type:'剑',   name:'秘银剑',   rarity:'SR', atk:125, hp:125 },
  { id:'meteor_sword',  type:'剑',   name:'星陨剑',   rarity:'SR', atk:130, hp:130 },
  { id:'ori_staff',     type:'杖',   name:'精金杖',   rarity:'SR', atk:156, hp:84 },
  { id:'mithril_staff', type:'杖',   name:'秘银杖',   rarity:'SR', atk:163, hp:87 },
  { id:'meteor_staff',  type:'杖',   name:'星陨杖',   rarity:'SR', atk:169, hp:91 },
  { id:'ori_bow',       type:'弓',   name:'精金弓',   rarity:'SR', atk:168, hp:72 },
  { id:'mithril_bow',   type:'弓',   name:'秘银弓',   rarity:'SR', atk:175, hp:75 },
  { id:'meteor_bow',    type:'弓',   name:'星陨弓',   rarity:'SR', atk:182, hp:78 },
  { id:'ori_axe',       type:'斧',   name:'精金斧',   rarity:'SR', atk:96,  hp:144 },
  { id:'mithril_axe',   type:'斧',   name:'秘银斧',   rarity:'SR', atk:100, hp:150 },
  { id:'meteor_axe',    type:'斧',   name:'星陨斧',   rarity:'SR', atk:104, hp:156 },
  { id:'ori_spear',     type:'枪',   name:'精金枪',   rarity:'SR', atk:108, hp:132 },
  { id:'mithril_spear', type:'枪',   name:'秘银枪',   rarity:'SR', atk:113, hp:137 },
  { id:'meteor_spear',  type:'枪',   name:'星陨枪',   rarity:'SR', atk:117, hp:143 },
  { id:'ori_flute',     type:'乐器', name:'精金笛',   rarity:'SR', atk:72,  hp:168 },
  { id:'mithril_bell',  type:'乐器', name:'秘银铃',   rarity:'SR', atk:75,  hp:175 },
  { id:'meteor_harp',   type:'乐器', name:'星陨琴',   rarity:'SR', atk:78,  hp:182 },
  { id:'ori_glove',     type:'拳套', name:'精金拳套', rarity:'SR', atk:84,  hp:156 },
  { id:'mithril_glove', type:'拳套', name:'秘银拳套', rarity:'SR', atk:88,  hp:162 },
  { id:'meteor_glove',  type:'拳套', name:'星陨拳套', rarity:'SR', atk:91,  hp:169 },
  { id:'ori_dagger',    type:'匕首', name:'精金匕首', rarity:'SR', atk:180, hp:60 },
  { id:'mithril_dagger',type:'匕首', name:'秘银匕首', rarity:'SR', atk:188, hp:62 },
  { id:'meteor_dagger', type:'匕首', name:'星陨匕首', rarity:'SR', atk:195, hp:65 },
  // 第六章：铳（攻 80% / 生命 20%；总属性 240/250/260）
  { id:'ori_gun',      type:'铳',   name:'精金铳', rarity:'SR', atk:192, hp:48 },
  { id:'mithril_gun',  type:'铳',   name:'秘银铳', rarity:'SR', atk:200, hp:50 },
  { id:'meteor_gun',   type:'铳',   name:'星陨铳', rarity:'SR', atk:208, hp:52 },
];

/* 第 9 章 SSR 武器：王之系列（9 件，总属性 = SR 的 2.5 倍：600/625/650，差 50 ≤ 62.5） */
const SSR_WEAPONS = [
  { id:'king_knife',  type:'刀',   name:'王者之刀', rarity:'SSR', atk:330, hp:270 },
  { id:'king_sword',  type:'剑',   name:'王者之剑', rarity:'SSR', atk:300, hp:300 },
  { id:'king_staff',  type:'杖',   name:'王者之杖', rarity:'SSR', atk:390, hp:210 },
  { id:'king_bow',    type:'弓',   name:'王者之弓', rarity:'SSR', atk:437, hp:188 },
  { id:'king_axe',    type:'斧',   name:'王者之斧', rarity:'SSR', atk:250, hp:375 },
  { id:'king_spear',  type:'枪',   name:'王者之枪', rarity:'SSR', atk:281, hp:344 },
  { id:'king_lute',   type:'乐器', name:'王者之音', rarity:'SSR', atk:195, hp:455 },
  { id:'king_fist',   type:'拳套', name:'王者之拳', rarity:'SSR', atk:228, hp:422 },
  { id:'king_dagger', type:'匕首', name:'王者之刃', rarity:'SSR', atk:488, hp:162 },
  { id:'king_gun',    type:'铳',   name:'王者之铳', rarity:'SSR', atk:480, hp:120 },
];

const ALL_R = [...WEAPONS, ...ADV_R];
const ALL_WEAPONS = [...ALL_R, ...SR_WEAPONS, ...SSR_WEAPONS];
const WEAPON_BY_ID = Object.fromEntries(ALL_WEAPONS.map(w => [w.id, w]));

/* ============ 提亚马特专属 SR 武器（风属性，击败「原初之风 提亚马特」5% 掉落） ============ */
const TIAMAT_WEAPONS = [
  { id:'tiamat_gun',   type:'铳', name:'提亚马特弩枪', rarity:'SR', atk:192, hp:48,  attr:'风' },
  { id:'tiamat_axe',   type:'斧', name:'提亚马特斩斧', rarity:'SR', atk:100, hp:150, attr:'风' },
  { id:'tiamat_sword', type:'剑', name:'提亚马特之峰', rarity:'SR', atk:130, hp:130, attr:'风' },
];
TIAMAT_WEAPONS.forEach(w => { WEAPON_BY_ID[w.id] = w; });

/* ============ 尤格多拉希尔专属 SR 武器（土属性，击败「原初之芽 尤格多拉希尔」5% 掉落） ============ */
const YGG_WEAPONS = [
  { id:'ygg_fist',  type:'拳套', name:'世界树的茎甲', rarity:'SR', atk:84,  hp:156, attr:'土' }, // 总 240
  { id:'ygg_sword', type:'剑',   name:'世界树的晶剑', rarity:'SR', atk:130, hp:130, attr:'土' }, // 总 260
  { id:'ygg_staff', type:'杖',   name:'世界树的露枝', rarity:'SR', atk:156, hp:84,  attr:'土' }, // 总 240
];
YGG_WEAPONS.forEach(w => { WEAPON_BY_ID[w.id] = w; });

/* ============ 尤格多拉希尔 Hard（玛格纳）专属 SSR · 创树方阵 ============ */
const YGG_MAGNA_WEAPONS = [
  { id:'ygg_magna_sword',  type:'剑',   name:'世界树的晶剑·玛格纳', rarity:'SSR', atk:300, hp:300, attr:'土', maxLevel:100, skill:'创树方阵·攻刃III-1', skillType:'attack' },
  { id:'ygg_magna_dagger', type:'匕首', name:'世界树的露刃·玛格纳', rarity:'SSR', atk:450, hp:150, attr:'土', maxLevel:100, skill:'创树方阵·守护II-1', skillType:'guard' },
  { id:'ygg_magna_bow',    type:'弓',   name:'世界树的藤弓·玛格纳', rarity:'SSR', atk:420, hp:180, attr:'土', maxLevel:100, skill:'创树方阵·背水III-1', skillType:'backwater' },
];
YGG_MAGNA_WEAPONS.forEach(w => { WEAPON_BY_ID[w.id] = w; });

/* ============ 利维坦专属 SR 武器（水属性，击败「原初之潮 利维坦」5% 掉落） ============ */
const LEVI_WEAPONS = [
  { id:'levi_dagger', type:'匕首', name:'利维坦凝视', rarity:'SR', atk:180, hp:60,  attr:'水' }, // 总 240（匕首 攻75/命25）
  { id:'levi_spear',  type:'枪',   name:'利维坦棘刺', rarity:'SR', atk:112, hp:138, attr:'水' }, // 总 250（枪 攻45/命55）
  { id:'levi_gun',    type:'铳',   name:'利维坦颚颌', rarity:'SR', atk:208, hp:52,  attr:'水' }, // 总 260
];
LEVI_WEAPONS.forEach(w => { WEAPON_BY_ID[w.id] = w; });

/* ============ 利维坦 Hard（玛格纳）专属 SSR · 海神方阵 ============ */
const LEVI_MAGNA_WEAPONS = [
  { id:'levi_magna_dagger', type:'匕首', name:'利维坦之视·玛格纳', rarity:'SSR', atk:450, hp:150, attr:'水', maxLevel:100, skill:'海神方阵·攻刃III-1', skillType:'attack' },
  { id:'levi_magna_staff',  type:'杖',   name:'利维坦权杖·玛格纳', rarity:'SSR', atk:210, hp:390, attr:'水', maxLevel:100, skill:'海神方阵·治愈III-1', skillType:'heal' },
  { id:'levi_magna_bow',    type:'弓',   name:'利维坦之弓·玛格纳', rarity:'SSR', atk:420, hp:180, attr:'水', maxLevel:100, skill:'海神方阵·守护-1', skillType:'guard' },
];
LEVI_MAGNA_WEAPONS.forEach(w => { WEAPON_BY_ID[w.id] = w; });

/* ============ 科罗萨斯专属 SR 武器（火属性，击败「科罗萨斯」5% 掉落） ============ */
const COLO_WEAPONS = [
  { id:'colo_fist',   type:'拳套', name:'科罗萨斯之拳',   rarity:'SR', atk:84,  hp:156, attr:'火' }, // 总 240
  { id:'colo_axe',    type:'斧',   name:'科罗萨斯之镐',   rarity:'SR', atk:100, hp:150, attr:'火' }, // 总 250
  { id:'colo_dagger', type:'匕首', name:'科罗萨斯破坏者', rarity:'SR', atk:195, hp:65,  attr:'火' }, // 总 260（匕首 攻75/命25）
];
COLO_WEAPONS.forEach(w => { WEAPON_BY_ID[w.id] = w; });

/* ============ 科罗萨斯 Hard（玛格纳）专属 SSR · 机炎方阵 ============ */
const COLO_MAGNA_WEAPONS = [
  { id:'colo_magna_staff', type:'杖',   name:'科罗萨斯手杖·玛格纳', rarity:'SSR', atk:210, hp:390, attr:'火', maxLevel:100, skill:'机炎方阵·攻刃III-1', skillType:'attack' },
  { id:'colo_magna_gun',   type:'铳',   name:'科罗萨斯卡宾枪·玛格纳', rarity:'SSR', atk:480, hp:120, attr:'火', maxLevel:100, skill:'机炎方阵·守护II-1', skillType:'guard' },
  { id:'colo_magna_fist',  type:'拳套', name:'科罗萨斯之拳·玛格纳', rarity:'SSR', atk:210, hp:390, attr:'火', maxLevel:100, skill:'机炎方阵·见切III-1', skillType:'kiri' },
];
COLO_MAGNA_WEAPONS.forEach(w => { WEAPON_BY_ID[w.id] = w; });

/* ============ 修瓦利耶专属 SR 武器（光属性，击败「修瓦利耶」5% 掉落） ============ */
const CHIV_WEAPONS = [
  { id:'chiv_sword', type:'剑', name:'修瓦利耶之剑', rarity:'SR', atk:120, hp:120, attr:'光' }, // 总 240
  { id:'chiv_spear', type:'枪', name:'修瓦利耶之枪', rarity:'SR', atk:112, hp:138, attr:'光' }, // 总 250（枪 攻45/命55）
  { id:'chiv_axe',   type:'斧', name:'修瓦利耶战斧', rarity:'SR', atk:104, hp:156, attr:'光' }, // 总 260
];
CHIV_WEAPONS.forEach(w => { WEAPON_BY_ID[w.id] = w; });

/* ============ 修瓦利耶 Hard（玛格纳）专属 SSR · 双技能 ============ */
const CHIV_MAGNA_WEAPONS = [
  { id:'chiv_magna_axe',  type:'斧',   name:'修瓦利耶战斧·玛格纳', rarity:'SSR', atk:240, hp:360, attr:'光', maxLevel:100, skills:[
      { name:'骑解方阵·守护II-1', target:'光', stat:'hp' },
      { name:'雾冰的攻刃-1',      target:'水', stat:'atk' },
    ] },
  { id:'chiv_magna_gun',  type:'铳',   name:'修瓦利耶弩枪·玛格纳', rarity:'SSR', atk:480, hp:120, attr:'光', maxLevel:100, skills:[
      { name:'骑解方阵·攻刃III-1', target:'光', stat:'atk' },
      { name:'地裂的守护-1',       target:'土', stat:'hp' },
    ] },
  { id:'chiv_magna_harp', type:'乐器', name:'修瓦利耶竖琴·玛格纳', rarity:'SSR', atk:180, hp:420, attr:'光', maxLevel:100, skills:[
      { name:'骑解方阵·攻刃III-1', target:'光', stat:'atk' },
      { name:'红莲的守护-1',       target:'火', stat:'hp' },
    ] },
];
CHIV_MAGNA_WEAPONS.forEach(w => { WEAPON_BY_ID[w.id] = w; });

/* ============ 塞勒斯特专属 SR 武器（暗属性，击败「塞勒斯特」5% 掉落） ============ */
const CELESTE_WEAPONS = [
  { id:'celeste_axe',   type:'斧', name:'塞勒斯特之镰', rarity:'SR', atk:96, hp:144, attr:'暗' }, // 总 240
  { id:'celeste_gun',   type:'铳', name:'塞勒斯特步枪', rarity:'SR', atk:200, hp:50,  attr:'暗' }, // 总 250（铳 攻80/命20）
  { id:'celeste_staff', type:'杖', name:'塞勒斯特手杖', rarity:'SR', atk:169, hp:91,  attr:'暗' }, // 总 260（杖 攻65/命35）
];
CELESTE_WEAPONS.forEach(w => { WEAPON_BY_ID[w.id] = w; });

/* ============ 塞勒斯特 Hard（玛格纳）专属 SSR · 双技能 ============ */
const CELESTE_MAGNA_WEAPONS = [
  { id:'cel_magna_spear', type:'枪',   name:'塞勒斯特之角·玛格纳', rarity:'SSR', atk:270, hp:330, attr:'暗', maxLevel:100, skills:[
      { name:'黑雾方阵·攻刃III-1', target:'暗', stat:'atk' },
      { name:'乱气的背水-1', kind:'backwater', target:'风' },
    ] },
  { id:'cel_magna_axe',   type:'斧',   name:'塞勒斯特之镰·玛格纳', rarity:'SSR', atk:240, hp:360, attr:'暗', maxLevel:100, skills:[
      { name:'黑雾方阵·攻刃III-1', target:'暗', stat:'atk' },
      { name:'雾冰的见切-1', kind:'kiri', target:'水' },
    ] },
  { id:'cel_magna_harp',  type:'乐器', name:'塞勒斯特竖琴·玛格纳', rarity:'SSR', atk:180, hp:420, attr:'暗', maxLevel:100, skills:[
      { name:'黑雾方阵·守护II-1', target:'暗', stat:'hp' },
      { name:'红莲的技巧-1', kind:'crit', target:'火' },
    ] },
];
CELESTE_MAGNA_WEAPONS.forEach(w => { WEAPON_BY_ID[w.id] = w; });
const ALL_MAGNA_SSR = CHIV_MAGNA_WEAPONS.concat(CELESTE_MAGNA_WEAPONS);

/* ============ 腐朽武器（材料，仅原型巴哈姆特掉落，基础 10%） ============ */
const DECAYED_WEAPONS = [
  { id: 'decayed_fist',   name: '腐朽的手甲', icon: '🥊' },
  { id: 'decayed_tachi',  name: '腐朽的太刀', icon: '🗡' },
  { id: 'decayed_bow',    name: '腐朽的弓',   icon: '🏹' },
  { id: 'decayed_staff',  name: '腐朽的法杖', icon: '🪄' },
  { id: 'decayed_lance',  name: '腐朽的铳枪', icon: '🔫' },
  { id: 'decayed_axe',    name: '腐朽的战斧', icon: '🪓' },
  { id: 'decayed_dagger', name: '腐朽的短剑', icon: '🔪' },
  { id: 'decayed_sword',  name: '腐朽的剑',   icon: '⚔' },
  { id: 'decayed_spear',  name: '腐朽的枪',   icon: '🔱' },
  { id: 'decayed_harp',   name: '腐朽的竖琴', icon: '🎵' },
];

// 5-9 章掉落类型（9 章为全部类型）
const ADV_TYPE_BY_CHAPTER = {
  5: ['刀','剑','杖'],
  6: ['弓','斧','铳'],
  7: ['枪','乐器'],
  8: ['拳套','匕首'],
  9: TYPE_ORDER.slice(),
};

/* ============ 命运之武器（9 种类型，一章一把，满级、无需装备即生效） ============ */
// 加成按该类型武器比例（生命% / 攻击%）；前 4 章对应 4 把，其余为后续章节预留
const FATE_WEAPONS = [
  { id:'fate_blade',  chapter:1, type:'刀',   name:'命运之刃', bonusHp:0.45, bonusAtk:0.55 },
  { id:'fate_bow',    chapter:2, type:'弓',   name:'命运之弦', bonusHp:0.30, bonusAtk:0.70 },
  { id:'fate_spear',  chapter:3, type:'枪',   name:'命运之矛', bonusHp:0.55, bonusAtk:0.45 },
  { id:'fate_fist',   chapter:4, type:'拳套', name:'命运之拳', bonusHp:0.65, bonusAtk:0.35 },
  { id:'fate_edge',   chapter:5, type:'剑',   name:'命运之锋', bonusHp:0.50, bonusAtk:0.50 },
  { id:'fate_staff',  chapter:6, type:'杖',   name:'命运之杖', bonusHp:0.35, bonusAtk:0.65 },
  { id:'fate_axe',    chapter:7, type:'斧',   name:'命运之斩', bonusHp:0.60, bonusAtk:0.40 },
  { id:'fate_lute',   chapter:8, type:'乐器', name:'命运之音', bonusHp:0.70, bonusAtk:0.30 },
  { id:'fate_dagger', chapter:9, type:'匕首', name:'命运之刺', bonusHp:0.25, bonusAtk:0.75 },
  // 命运之铳：无专属章节；第九章掉落所有未获得的命运武器，因此它也包含在第九章掉落池中（也可用收藏点兑换）
  { id:'fate_gun',    chapter:0, type:'铳',   name:'命运之铳', bonusHp:0.20, bonusAtk:0.80 },
];
const FATE_BY_CHAPTER = Object.fromEntries(FATE_WEAPONS.map(f => [f.chapter, f]));
const FATE_BY_ID = Object.fromEntries(FATE_WEAPONS.map(f => [f.id, f]));
const FATE_SHOP_BASE = 5000;     // 命运武器兑换基准价：初次 5000，之后每多拥有一件再加 5000
const FATE_DROP_RATE = 0.0001;  // 0.01% 固定独立掉率：不受成就点 / 金币掉落 / 地图进度等任何加成
const RARITY_POINTS = { R: 1, SR: 3, SSR: 10 }; // 满级武器重复获得转化收藏点

// 当前兑换价 = 5000 × (已拥有命运武器数 + 1)
function fateShopCost() {
  return FATE_SHOP_BASE * (Object.keys(state.fates).length + 1);
}
// 收藏点商店：金币收益等级花费（100 → 400 → 1600 → 6400 …，每级 ×4）
function goldBoostCost() { return 100 * Math.pow(4, state.goldBoostLevel); }
function goldMul() { return 1 + state.goldBoostLevel * 0.05; }
// Very Hard 佐伊首胜后解锁：每 5 点成就点 +1% 金币获取
function achGoldMul() { return state.vhCleared ? (1 + Math.floor(achievementPoints() / 5) * 0.01) : 1; }
// 收藏点商店：掉落几率等级（花费与金币收益一致：100 → 400 → 1600 …，每级 +5%）
function pointDropCost() { return 100 * Math.pow(4, state.pointDropLevel); }
function pointDropMul() { return 1 + state.pointDropLevel * 0.05; }
// 掉落总倍率 = 金币商店掉落 × 收藏点掉落
function totalDropMul() { return dropBuyMul() * pointDropMul(); }

/* ============ 副本 Boss ============ */
const DUNGEONS = [
  {
    id: 'zoe',
    name: '调停之翼的残影 佐伊',
    rank: 'normal',
    attr: '无',
    reqLevel: 50,
    hp: 32000,
    atk: 750,
    hardName: '调停之翼 佐伊',
    hardHp: 128000,   // Hard = normal × 4
    hardAtk: 3000,    // Hard = normal × 4
    vhName: '世界的调停者 佐伊',
    vhHp: 600000,     // Very Hard
    vhAtk: 10000,
  },
  {
    id: 'tiamat',
    name: '提亚马特',
    rank: 'normal',
    attr: '风',
    reqLevel: 0,
    hp: 177000,
    atk: 4500,
    hardName: '提亚马特·玛格纳',
    hardHp: 708000,   // Hard = normal × 4
    hardAtk: 13000,
    costAmber: 3,  // 每次挑战消耗 3 个岚龙的琥珀眼
  },
  {
    id: 'yggdrasil',
    name: '尤格多拉希尔',
    rank: 'normal',
    attr: '土',
    reqLevel: 0,
    hp: 185000,
    atk: 4700,
    costBud: 3, // 每次挑战消耗 3 个创树的花蕾
    hardName: '尤格多拉希尔·玛格纳',
    hardHp: 708000,
    hardAtk: 13000,
  },
  {
    id: 'leviathan',
    name: '利维坦',
    rank: 'normal',
    attr: '水',
    reqLevel: 0,
    hp: 195000,
    atk: 5000,
    costFan: 3, // 每次挑战消耗 3 个海神的扇尾
    hardName: '利维坦·玛格纳',
    hardHp: 708000,
    hardAtk: 13000,
  },
  {
    id: 'colossus',
    name: '科罗萨斯',
    rank: 'normal',
    attr: '火',
    reqLevel: 0,
    hp: 205000,
    atk: 5250,
    costSun: 3, // 每次挑战消耗 3 个日珥反应炉
    hardName: '科罗萨斯·玛格纳',
    hardHp: 708000,
    hardAtk: 13000,
  },
  {
    id: 'chivalier',
    name: '修瓦利耶',
    rank: 'normal',
    attr: '光',
    reqLevel: 0,
    hp: 205000,
    atk: 5250,
    costStar: 3, // 每次挑战消耗 3 个星星浮游体
    hardName: '修瓦利耶·玛格纳',
    hardHp: 708000,
    hardAtk: 10000,
  },
  {
    id: 'celeste',
    name: '塞勒斯特',
    rank: 'normal',
    attr: '暗',
    reqLevel: 0,
    hp: 205000,
    atk: 5250,
    costShard: 3, // 每次挑战消耗 3 个黑雾的结晶
    hardName: '塞勒斯特·玛格纳',
    hardHp: 708000,
    hardAtk: 10000,
  },
  {
    id: 'bahamut',
    name: '原型巴哈姆特',
    rank: 'normal',
    attr: '无',
    reqLevel: 0,
    hp: 300000,
    atk: 6000,
  },
];

/* ============ 金币商店（永久倍率，指数花费） ============ */
const EXP_BUY_BASE = 20000;     // 经验倍率 1 级花费
const EXP_BUY_GROWTH = 1.6;     // 经验倍率花费指数增长
const EXP_BUY_MAX_LEVEL = 20;   // 经验倍率上限（×2.0）
const DROP_BUY_BASE = 40000;    // 掉落几率 1 级花费
const DROP_BUY_GROWTH = 1.7;    // 掉落几率花费指数增长
const DROP_BUY_MAX_LEVEL = 30;  // 掉落几率上限（×2.5）
const BUY_MUL_PER_LEVEL = 0.05; // 每级 +5%
function expBuyMul() { return 1 + state.expBuyLevel * BUY_MUL_PER_LEVEL; }
function dropBuyMul() { return 1 + state.dropBuyLevel * BUY_MUL_PER_LEVEL; }
function expBuyCost() { return Math.floor(EXP_BUY_BASE * Math.pow(EXP_BUY_GROWTH, state.expBuyLevel)); }
function dropBuyCost() { return Math.floor(DROP_BUY_BASE * Math.pow(DROP_BUY_GROWTH, state.dropBuyLevel)); }

/* ============ 宇宙长剑（特殊武器：满级 20，每级 ×1.2） ============ */
const MED_WING_BLADE = {
  id: 'med_wing_blade',
  type: '剑',
  name: '宇宙长剑',
  rarity: 'SSR',
  atk: 330,
  hp: 270,       // 与王者之刀（王者系列刀）一致
  // 突破前上限 40；击败 Hard 佐伊并突破后提升至 80
  get maxLevel() { return state.medWingAwakened2 ? 100 : state.medWingAwakened ? 80 : 40; },
  growth: 0.01,  // 每级 +1% 基础属性（线性：80 级 = 1.79 倍）
};
WEAPON_BY_ID[MED_WING_BLADE.id] = MED_WING_BLADE;

/* ============ 天司武器（RANK 3 材料商店制作 · SR · 满级 40 · 自带克制增伤） ============ */
const TENSHI_WEAPONS = [
  { id:'tenshi_michael', type:'剑',   name:'米迦勒之剑', rarity:'SR', atk:120, hp:120, attr:'火', maxLevel:40, skill:'米迦勒的祝福 I',   skill2:'米迦勒的祝福 II',   beats:'风', costKey:'sunCore',      costName:'日珥反应炉',   costCrystal:'fireCrystal',  crystalName:'火晶之元素',
    bossId:'michael', bossName:'火之天司 米迦勒', bossHp:600000, bossAtk:10000, featherKey:'fireFeather',  featherName:'火之羽毛' },
  { id:'tenshi_gabriel', type:'杖',   name:'加百列之杖', rarity:'SR', atk:84,  hp:156, attr:'水', maxLevel:40, skill:'加百列的祝福 I',   skill2:'加百列的祝福 II',   beats:'火', costKey:'seaFan',       costName:'海神的扇尾',   costCrystal:'waterCrystal', crystalName:'水晶之元素',
    bossId:'gabriel', bossName:'水之天司 加百列', bossHp:600000, bossAtk:10000, featherKey:'waterFeather', featherName:'水之羽毛' },
  { id:'tenshi_uriel',   type:'拳套', name:'乌列尔之拳', rarity:'SR', atk:84,  hp:156, attr:'土', maxLevel:40, skill:'乌列尔的祝福 I',   skill2:'乌列尔的祝福 II',   beats:'水', costKey:'earthBud',     costName:'创树的花蕾',   costCrystal:'earthCrystal', crystalName:'土晶之元素',
    bossId:'uriel',   bossName:'土之天司 乌列尔', bossHp:600000, bossAtk:10000, featherKey:'earthFeather', featherName:'土之羽毛' },
  { id:'tenshi_raphael', type:'弓',   name:'拉斐尔之轮', rarity:'SR', atk:72,  hp:168, attr:'风', maxLevel:40, skill:'拉斐尔的祝福 I',   skill2:'拉斐尔的祝福 II',   beats:'土', costKey:'amberEyes',    costName:'岚龙的琥珀眼', costCrystal:'windCrystal',  crystalName:'风晶之元素',
    bossId:'raphael', bossName:'风之天司 拉斐尔', bossHp:600000, bossAtk:10000, featherKey:'windFeather',  featherName:'风之羽毛' },
  { id:'tenshi_gemini',  type:'乐器', name:'双子之琴',   rarity:'SR', atk:72,  hp:168, attr:'光', maxLevel:40, skill:'双子天司的引导 I', skill2:'双子天司的引导 II', beats:'暗', costKey:'starPlankton', costName:'星星浮游体',   costCrystal:'lightCrystal', crystalName:'光晶之元素',
    bossId:null, bossName:null, bossHp:0, bossAtk:0, featherKeys:['fireFeather','waterFeather'], featherName:'火之羽毛 + 水之羽毛' },
  { id:'tenshi_belial',  type:'斧',   name:'贝利尔之镰', rarity:'SR', atk:96,  hp:144, attr:'暗', maxLevel:40, skill:'堕落之面 I',       skill2:'堕落之面 II',       beats:'光', costKey:'darkShard',    costName:'黑雾的结晶',   costCrystal:'darkCrystal',  crystalName:'暗晶之元素',
    bossId:null, bossName:null, bossHp:0, bossAtk:0, featherKeys:['windFeather','earthFeather'], featherName:'风之羽毛 + 土之羽毛' },
];
TENSHI_WEAPONS.forEach(w => { w.growth = 0.4 / 39; WEAPON_BY_ID[w.id] = w; }); // 40 级 = 1.4 倍

/* ============ 天司 Boss（对应天司武器 40 级解锁） ============ */
const TENSHI_DUNGEONS = TENSHI_WEAPONS.filter(w => !!w.bossId).map(w => ({
  id: w.bossId, name: w.bossName, attr: w.attr, rank: 'normal',
  hp: w.bossHp, atk: w.bossAtk, reqLevel: 0,
  tenshiWeapon: w.id, featherKey: w.featherKey, featherName: w.featherName,
}));
function allDungeons() { return DUNGEONS.concat(TENSHI_DUNGEONS); }
// 天司武器上限：突破前 40，突破后 80
function tenshiMaxLevel(id) { return state.tenshiAwakened[id] ? 80 : 40; }
// 羽毛显示名
const FEATHER_NAMES = {
  fireFeather: '火之羽毛', waterFeather: '水之羽毛', earthFeather: '土之羽毛',
  windFeather: '风之羽毛', lightFeather: '光之羽毛', darkFeather: '暗之羽毛',
};

/* ============ 玛格纳 SSR（提亚马特 Hard 专属掉落 · 岚龙方阵） ============ */
const MAGNA_WEAPONS = [
  { id:'magna_fist',  type:'拳套', name:'提亚玛特手甲·玛格纳', rarity:'SSR', atk:210, hp:390, attr:'风', maxLevel:100, skill:'岚龙方阵·攻刃III-1', skillType:'attack' },
  { id:'magna_axe',   type:'斧',   name:'提亚玛特斩斧·玛格纳', rarity:'SSR', atk:240, hp:360, attr:'风', maxLevel:100, skill:'岚龙方阵·守护II-1', skillType:'guard' },
  { id:'magna_spear', type:'枪',   name:'提亚玛特长刃·玛格纳', rarity:'SSR', atk:270, hp:330, attr:'风', maxLevel:100, skill:'岚龙方阵·守护II-1', skillType:'guard' },
];
MAGNA_WEAPONS.forEach(w => { WEAPON_BY_ID[w.id] = w; });

// 岚龙方阵：每拥有一把攻刃武器 → 风属性武器攻击 +15%；每拥有一把守护武器 → 风属性武器生命 +15%
function magnaSquareBonus() {
  let atkN = 0, hpN = 0;
  for (const w of MAGNA_WEAPONS) {
    if (!state.weapons[w.id]) continue;
    if (w.skillType === 'attack') atkN++;
    else if (w.skillType === 'guard') hpN++;
  }
  return { atk: 0.15 * atkN, hp: 0.15 * hpN };
}

// 创树方阵：每拥有一把攻刃 → 土属性武器攻击 +15%；守护 → 土属性武器生命 +15%
function yggSquareBonus() {
  let atkN = 0, hpN = 0;
  for (const w of YGG_MAGNA_WEAPONS) {
    if (!state.weapons[w.id]) continue;
    if (w.skillType === 'attack') atkN++;
    else if (w.skillType === 'guard') hpN++;
  }
  return { atk: 0.15 * atkN, hp: 0.15 * hpN };
}

// 创树方阵·背水：血量变化后立即刷新面板与武器库中的土属性武器显示
function bwRefresh() {
  if (!state.weapons['ygg_magna_bow']) return;
  invalidateStats();
  updateHud();
  document.querySelectorAll('#grid .weapon[data-id]').forEach(card => {
    const id = card.dataset.id;
    const def = WEAPON_BY_ID[id];
    if (!def || def.attr !== '土') return;
    const b = weaponBonus(def);
    const ratio = state.equipped === id ? 1 : 0.1;
    const aEl = card.querySelector('.w-stats .a');
    const hEl = card.querySelector('.w-stats .h');
    if (aEl) aEl.textContent = `⚔ ${fmt1(b.atk * ratio)}`;
    if (hEl) hEl.textContent = `❤ ${fmt1(b.hp * ratio)}`;
    const sEl = card.querySelector('.w-skill');
    if (sEl) sEl.textContent = `⚡ ${def.skill}：${squareSkillInfo(def).desc}`;
  });
}

// 创树方阵·背水：按当前生命比例提升土属性武器攻击（满血 0% → 空血 30%）
// 背水曲线（0% → 30%），与具体武器解耦
function backwaterCurve() {
  const max = (statsCache && statsCache.hp) || 1;
  const r = Math.max(0, Math.min(1, state.playerHp / max));
  const x = 1 - r;
  return 0.1 * x + 0.2 * x * x; // 100%血 0 / 80% 2.8% / 60% 7.2% / 40% 13.2% / 20% 20.8% / 0% 30%
}
function yggBackwaterBonus() {
  if (!state.weapons['ygg_magna_bow']) return 0;
  return backwaterCurve();
}

// 海神方阵：每拥有一把攻刃 → 水属性武器攻击 +15%；守护 → 水属性武器生命 +15%
function leviSquareBonus() {
  let atkN = 0, hpN = 0;
  for (const w of LEVI_MAGNA_WEAPONS) {
    if (!state.weapons[w.id]) continue;
    if (w.skillType === 'attack') atkN++;
    else if (w.skillType === 'guard') hpN++;
  }
  return { atk: 0.15 * atkN, hp: 0.15 * hpN };
}

// 见切反击特效：金色「见切！」飘字 + 玩家金框 + 怪物受击红闪 + 血条闪避白光
function showKiriEffect() {
  const host = document.querySelector('.fighter.player');
  if (host) {
    const exist = host.querySelectorAll('.kiri-float');
    if (exist.length >= 2) exist[0].remove();
    const el = document.createElement('div');
    el.className = 'kiri-float';
    el.textContent = '见切！';
    host.appendChild(el);
    setTimeout(() => el.remove(), 1100);
    host.classList.remove('kiri-flash');
    void host.offsetWidth;
    host.classList.add('kiri-flash');
  }
  const mon = document.querySelector('.fighter.monster');
  if (mon) {
    mon.classList.remove('hit-flash');
    void mon.offsetWidth;
    mon.classList.add('hit-flash');
  }
  const bar = document.getElementById('bar-player');
  if (bar) {
    bar.classList.remove('dodge-flash');
    void bar.offsetWidth;
    bar.classList.add('dodge-flash');
  }
  log('⚡ 见切！闪避了这次攻击并立即反击', 'up');
}

// 治愈回血视觉反馈：绿色飘字 + 血条闪亮
function showHealFloat(amount) {
  const host = document.querySelector('.fighter.player');
  if (!host) return;
  const exist = host.querySelectorAll('.heal-float');
  if (exist.length >= 3) exist[0].remove();
  const el = document.createElement('div');
  el.className = 'heal-float';
  el.textContent = '+' + Math.round(amount);
  host.appendChild(el);
  setTimeout(() => el.remove(), 1200);
  const bar = document.getElementById('bar-player');
  if (bar) {
    bar.classList.remove('heal-flash');
    void bar.offsetWidth; // 重启动画
    bar.classList.add('heal-flash');
  }
}

// 海神方阵·治愈：拥有权杖 + 装备水属性武器时，每次攻击回复 1% 最大生命
function leviHealOnAttack() {
  if (!state.weapons['levi_magna_staff']) return; // 需拥有治愈技能武器
  if (playerAttr() !== '水') return;              // 且需装备水属性武器
  const max = playerMaxHp();
  const before = state.playerHp;
  state.playerHp = Math.min(max, state.playerHp + max * 0.01);
  const gained = state.playerHp - before;
  if (gained > 0.5) showHealFloat(gained);
  if (state.weapons['ygg_magna_bow']) invalidateStats(); // 生命比例变化 → 背水刷新
}

// 机炎方阵：每拥有一把攻刃 → 火属性武器攻击 +15%；守护 → 火属性武器生命 +15%
function coloSquareBonus() {
  let atkN = 0, hpN = 0;
  for (const w of COLO_MAGNA_WEAPONS) {
    if (!state.weapons[w.id]) continue;
    if (w.skillType === 'attack') atkN++;
    else if (w.skillType === 'guard') hpN++;
  }
  return { atk: 0.15 * atkN, hp: 0.15 * hpN };
}

// 机炎方阵·见切：拥有之拳 + 装备火属性武器时，受击有 3% 概率免伤并立即反击
function coloKiriActive() {
  return !!state.weapons['colo_magna_fist'] && playerAttr() === '火';
}

// 四属性玛格纳是否全部击败（提亚马特 / 尤格 / 利维坦 / 科罗萨斯）
function fourMagnaCleared() {
  return (state.tiamatHardKills || 0) > 0 && (state.yggHardKills || 0) > 0 && (state.leviHardKills || 0) > 0 && (state.coloHardKills || 0) > 0;
}

// 修瓦利耶 / 塞勒斯特 玛格纳武器提供的属性加成汇总（骑解 / 雾水 / 地裂 / 红莲 / 黑雾）
function chivMagnaBonusOf(attr) {
  let atk = 0, hp = 0;
  for (const w of ALL_MAGNA_SSR) {
    if (!state.weapons[w.id]) continue;
    for (const s of w.skills) {
      if (s.kind || s.target !== attr) continue;
      if (s.stat === 'atk') atk += 0.15;
      else hp += 0.15;
    }
  }
  return { atk, hp };
}

// 玛格纳 SSR 技能按「方阵 / 普通」分层汇总
// 方阵层：技能名含「方阵」；普通层：属性关键字（火/业火/红莲、风/龙卷/乱气 等）
// 两层相乘；同层内同名技能加算；同层内攻刃与背水相乘
function magnaSkillBonusOf(attr) {
  const r = { sqAtk: 0, sqHp: 0, sqBw: 0, nmAtk: 0, nmHp: 0, nmBw: 0 };
  for (const w of ALL_MAGNA_SSR) {
    if (!state.weapons[w.id]) continue;
    for (const s of w.skills) {
      if (s.target !== attr) continue;
      const square = /方阵/.test(s.name);
      if (s.kind === 'backwater') { if (square) r.sqBw += 1; else r.nmBw += 1; continue; }
      if (s.stat === 'atk') { if (square) r.sqAtk += 0.15; else r.nmAtk += 0.15; }
      else if (s.stat === 'hp') { if (square) r.sqHp += 0.15; else r.nmHp += 0.15; }
    }
  }
  return r;
}

// 乱气的背水：拥有塞勒斯特之角·玛格纳时，风属性武器享受背水（曲线与创树一致）
function celesteBackwaterActive() {
  return !!state.weapons['cel_magna_spear'];
}

// 雾冰的见切：拥有塞勒斯特之镰·玛格纳 + 装备水属性武器时，受击 3% 免伤并反击
function celesteKiriActive() {
  return !!state.weapons['cel_magna_axe'] && playerAttr() === '水';
}

// 红莲的技巧：拥有塞勒斯特竖琴·玛格纳 + 装备火属性武器时，攻击 8% 概率暴击（150% 伤害）
function celesteCritActive() {
  return !!state.weapons['cel_magna_harp'] && playerAttr() === '火';
}

// 某属性武器当前受到的方阵汇总加成（攻击% / 生命%）
function squareStatOf(attr) {
  if (attr === '土') return yggSquareBonus();
  if (attr === '水') return leviSquareBonus();
  if (attr === '火') return coloSquareBonus();
  return magnaSquareBonus();
}

// 某属性武器当前的总加成（方阵层 × 普通层，含背水实时值）
function totalAttrBonusOf(attr) {
  let sqAtk = 0, sqHp = 0, sqBw = 0, nmAtk = 0, nmHp = 0, nmBw = 0;
  if (attr === '风') { const s = magnaSquareBonus(); sqAtk += s.atk; sqHp += s.hp; }
  else if (attr === '土') {
    const s = yggSquareBonus(); sqAtk += s.atk; sqHp += s.hp;
    if (state.weapons['ygg_magna_bow']) sqBw += 1; // 创树方阵·背水（藤弓）
  }
  else if (attr === '水') { const s = leviSquareBonus(); sqAtk += s.atk; sqHp += s.hp; }
  else if (attr === '火') { const s = coloSquareBonus(); sqAtk += s.atk; sqHp += s.hp; }
  const ms = magnaSkillBonusOf(attr);
  sqAtk += ms.sqAtk; sqHp += ms.sqHp; sqBw += ms.sqBw;
  nmAtk += ms.nmAtk; nmHp += ms.nmHp; nmBw += ms.nmBw;
  const bw = backwaterCurve();
  return {
    atk: (1 + sqAtk) * (1 + bw * sqBw) * (1 + nmAtk) * (1 + bw * nmBw) - 1,
    hp: (1 + sqHp) * (1 + nmHp) - 1,
  };
}
// 百分比格式化：整数不带小数，其余保留两位
function fmtPct(v) {
  return String(+(v * 100).toFixed(2));
}

// 方阵技能展示文本（按武器所属方阵与技能类型区分）
// 玛格纳 SSR 的单条技能描述（stat / backwater / kiri / crit）
// 卡片用：只显示该技能自身的原始效果（不含同类汇总）
function skillOwnDesc(s) {
  if (s.kind === 'backwater') return `${s.target}属性武器 生命值越低，攻击提升越多（上限 +30%）`;
  if (s.kind === 'kiri') return `${s.target}属性武器 受击 3% 概率免伤并反击`;
  if (s.kind === 'crit') return `${s.target}属性武器 攻击时 8% 概率触发暴击，暴击额外造成 50% 伤害`;
  return `${s.target}属性武器 ${s.stat === 'atk' ? '攻击' : '生命'} +15%`;
}

function multiSkillDesc(s) {
  if (s.kind === 'backwater') {
    return `${s.target}属性武器 生命比例越低攻击越高（当前 +${(backwaterCurve() * 100).toFixed(1)}%，上限 30%）`;
  }
  if (s.kind === 'kiri') return `${s.target}属性武器 受击 3% 概率免伤并反击`;
  if (s.kind === 'crit') return `${s.target}属性武器 攻击时 8% 概率触发暴击，暴击额外造成 50% 伤害`;
  const st = magnaSkillBonusOf(s.target);
  const square = /方阵/.test(s.name);
  const v = (s.stat === 'atk' ? (square ? st.sqAtk : st.nmAtk) : (square ? st.sqHp : st.nmHp)) * 100;
  return `${s.target}属性武器 ${s.stat === 'atk' ? '攻击' : '生命'} +${v.toFixed(0)}%`;
}

function squareSkillInfo(def) {
  if (def.skills) {
    // 卡片：每个技能一行，只显示自身效果
    return { desc: def.skills.map(s => `${s.name}：${skillOwnDesc(s)}`).join('<br>') };
  }
  const kind = def.skillType;
  if (kind === 'heal') return { desc: '水属性武器 攻击时回复 1% 最大生命' };
  if (kind === 'kiri') return { desc: '火属性武器 受击 3% 概率免伤并立即反击' };
  if (kind === 'backwater') {
    return { desc: '土属性武器 生命比例越低，攻击提升越多（上限 +30%）' };
  }
  // 方阵攻刃 / 守护：每把武器自身提供 +15%（汇总仅在悬停显示）
  if (kind === 'attack') return { desc: `${def.attr}属性武器 攻击 +15%` };
  if (kind === 'guard') return { desc: `${def.attr}属性武器 生命 +15%` };
  return { desc: `${def.attr}属性武器 生命 +15%` };
}

/* ============ 巴哈姆特武器（任一腐朽武器 ×40 解锁制作 · 无属性 · SR · 满级 40） ============ */
const BAHA_WEAPONS = [
  { id:'baha_knife',  type:'刀',   name:'巴哈姆特之刀', rarity:'SR', atk:108, hp:132, attr:'无', maxLevel:40, skill:'创世之龙的加护 I', decayedKey:'decayed_tachi',  decayedName:'腐朽的太刀' },
  { id:'baha_lute',   type:'乐器', name:'巴哈姆特之琴', rarity:'SR', atk:72,  hp:168, attr:'无', maxLevel:40, skill:'创世之龙的加护 I', decayedKey:'decayed_harp',   decayedName:'腐朽的竖琴' },
  { id:'baha_bow',    type:'弓',   name:'巴哈姆特之弓', rarity:'SR', atk:72,  hp:168, attr:'无', maxLevel:40, skill:'创世之龙的加护 I', decayedKey:'decayed_bow',    decayedName:'腐朽的弓' },
  { id:'baha_fist',   type:'拳套', name:'巴哈姆特之拳', rarity:'SR', atk:84,  hp:156, attr:'无', maxLevel:40, skill:'创世之龙的加护 I', decayedKey:'decayed_fist',   decayedName:'腐朽的手甲' },
  { id:'baha_gun',    type:'铳',   name:'巴哈姆特之铳', rarity:'SR', atk:48,  hp:192, attr:'无', maxLevel:40, skill:'创世之龙的加护 I', decayedKey:'decayed_lance',  decayedName:'腐朽的铳枪' },
  { id:'baha_staff',  type:'杖',   name:'巴哈姆特之杖', rarity:'SR', atk:84,  hp:156, attr:'无', maxLevel:40, skill:'创世之龙的加护 I', decayedKey:'decayed_staff',  decayedName:'腐朽的法杖' },
  { id:'baha_axe',    type:'斧',   name:'巴哈姆特之斧', rarity:'SR', atk:96,  hp:144, attr:'无', maxLevel:40, skill:'创世之龙的加护 I', decayedKey:'decayed_axe',    decayedName:'腐朽的战斧' },
  { id:'baha_spear',  type:'枪',   name:'巴哈姆特之枪', rarity:'SR', atk:108, hp:132, attr:'无', maxLevel:40, skill:'创世之龙的加护 I', decayedKey:'decayed_spear',  decayedName:'腐朽的枪' },
  { id:'baha_dagger', type:'匕首', name:'巴哈姆特匕首', rarity:'SR', atk:60,  hp:180, attr:'无', maxLevel:40, skill:'创世之龙的加护 I', decayedKey:'decayed_dagger', decayedName:'腐朽的短剑' },
  { id:'baha_sword',  type:'剑',   name:'巴哈姆特之剑', rarity:'SR', atk:120, hp:120, attr:'无', maxLevel:40, skill:'创世之龙的加护 I', decayedKey:'decayed_sword',  decayedName:'腐朽的剑' },
];
BAHA_WEAPONS.forEach(w => { w.growth = 0.4 / 39; WEAPON_BY_ID[w.id] = w; }); // 40 级 = 1.4 倍

// 创世之龙的加护：当前对应类型武器数量与生命加成
function bahaSkillInfo(def) {
  let count = 0;
  for (const wid in state.weapons) {
    const d = WEAPON_BY_ID[wid];
    if (d && d.type === def.type) count++;
  }
  return { count, bonus: 0.002 * count };
}

/* ============ 成就 ============ */
// hidden:true 的成就在未完成前显示为「？？？」
const ACHIEVEMENTS = [
  { id:'first_kill',   name:'初次交锋',   desc:'首次击败怪物' },
  { id:'first_weapon', name:'初获武装',   desc:'第一次获得装备' },
  { id:'first_max',    name:'登峰造极',   desc:'第一次获得满级装备' },
  { id:'first_r_weapon', name:'初握利刃', desc:'首次获得 R 级武器' },
  { id:'first_r_max',    name:'利刃至臻', desc:'首次满级 R 级武器' },
  { id:'first_sr_weapon', name:'银辉初现', desc:'初次获得 SR 武器' },
  { id:'first_sr_max',    name:'银辉圆满', desc:'初次升满 SR 装备' },
  { id:'first_ssr_weapon', name:'王者降临', desc:'初次获得 SSR 装备' },
  { id:'first_ssr_max',    name:'王权永固', desc:'初次升满 SSR 装备', points:5 },
  // 每章武器全满级
  { id:'max_ch1', name:'青草收藏家', desc:'第一章武器全部满级' },
  { id:'max_ch2', name:'森林收藏家', desc:'第二章武器全部满级' },
  { id:'max_ch3', name:'雪山收藏家', desc:'第三章武器全部满级' },
  { id:'max_ch4', name:'火山收藏家', desc:'第四章武器全部满级' },
  { id:'max_ch5', name:'碧海收藏家', desc:'第五章武器全部满级', points:3 },
  { id:'max_ch6', name:'苍穹收藏家', desc:'第六章武器全部满级', points:3 },
  { id:'max_ch7', name:'荒漠收藏家', desc:'第七章武器全部满级', points:3 },
  { id:'max_ch8', name:'幽冥收藏家', desc:'第八章武器全部满级', points:3 },
  // 每把命运武器各一个成就（5 点成就点；未获得时显示？？？）
  ...FATE_WEAPONS.map(f => ({ id:'fateown_' + f.id, name:f.name, desc:'获得命运之武器 ' + f.name, hidden:true, points:5 })),
  // 完成章节（5-8 章 5 点，9 章 10 点）
  { id:'clear_1_10',   name:'平原征服者', desc:'完成 1-10' },
  { id:'clear_2_10',   name:'森林征服者', desc:'完成 2-10' },
  { id:'clear_3_10',   name:'雪山征服者', desc:'完成 3-10' },
  { id:'clear_4_10',   name:'火山征服者', desc:'完成 4-10' },
  { id:'clear_5_10',   name:'碧海征服者', desc:'完成 5-10', points:5 },
  { id:'clear_6_10',   name:'苍穹征服者', desc:'完成 6-10', points:5 },
  { id:'clear_7_10',   name:'荒漠征服者', desc:'完成 7-10', points:5 },
  { id:'clear_8_10',   name:'幽冥征服者', desc:'完成 8-10', points:5 },
  { id:'clear_9_10',   name:'圣域征服者', desc:'完成 9-10', points:10 },
  // 副本 Boss 成就
  { id:'zoe_first',    name:'翼之残影', desc:'首次击败调停之翼的残影（normal）', points:10, invisible:true },
  { id:'zoe_hard_first', name:'翼之终焉', desc:'击败 Hard 难度的调停之翼 佐伊', points:30 },
  { id:'zoe_vh_first',   name:'苍穹的执秤者', desc:'击败 Very Hard 难度的世界调停者 佐伊', points:150, invisible:true },
  { id:'med_wing_max', name:'长剑极意', desc:'将宇宙长剑升级至 40 级', points:20, invisible:true },
  { id:'med_wing_80',  name:'长剑通神', desc:'将宇宙长剑升级至 80 级', points:50, invisible:true },
  { id:'bahamut_first', name:'原型之敌', desc:'击败原型巴哈姆特', points:50, invisible:true },
  { id:'rank_1',       name:'破阶而立', desc:'抵达 RANK 1', points:20, invisible:true },
  { id:'rank_2',       name:'破阶再临', desc:'突破至 RANK 2', points:30 },
  { id:'rank_3',       name:'破阶三重', desc:'突破至 RANK 3', points:50 },
  // 集齐并升满（10 点）
  { id:'all_r_max',    name:'凡兵大成',   desc:'集齐并升满 60 件 R 武器', points:10 },
  { id:'all_sr_max',   name:'银辉集大成', desc:'集齐并升满 30 件 SR 武器', points:10 },
  { id:'all_ssr_max',  name:'王者加冕',   desc:'集齐所有王之系列并升满', points:10 },
  // 集齐全部（需完成凡兵大成/银辉集大成/王者加冕后额外获得）
  { id:'all_master',   name:'兵器宗师',   desc:'集齐并升满全部 R / SR / SSR 武器', points:10 },
  // 空岛 / 提亚马特 / 尤格多拉希尔（完成后才显示）
  { id:'wind_island_clear', name:'岚影终章', desc:'击败风之岛第五关的岚龙', points:20, invisible:true },
  { id:'tiamat_first',      name:'原初之风', desc:'击败提亚马特', points:30, invisible:true },
  { id:'tiamat_hard_first', name:'风神之玛格纳', desc:'击败 Hard 难度的提亚马特', points:100, invisible:true },
  { id:'earth_island_clear', name:'创树终章', desc:'击败土之岛第五关的创树之灵', points:20, invisible:true },
  { id:'ygg_first',          name:'创世之芽', desc:'击败尤格多拉希尔', points:30, invisible:true },
  { id:'ygg_hard_first',     name:'创树之玛格纳', desc:'击败 Hard 难度的尤格多拉希尔', points:100, invisible:true },
  { id:'sea_island_clear',   name:'潮汐终章', desc:'击败水之岛第五关的海神使徒', points:20, invisible:true },
  { id:'levi_first',         name:'原初之潮', desc:'击败利维坦', points:30, invisible:true },
  { id:'levi_hard_first',    name:'海神之玛格纳', desc:'击败 Hard 难度的利维坦', points:100, invisible:true },
  { id:'sun_island_clear',   name:'日珥终章', desc:'击败火之岛第五关的日珥守卫', points:20, invisible:true },
  { id:'colo_first',         name:'铁块苏醒', desc:'击败科罗萨斯', points:30, invisible:true },
  { id:'colo_hard_first',    name:'机炎之玛格纳', desc:'击败 Hard 难度的科罗萨斯', points:100, invisible:true },
  { id:'chiv_hard_first',    name:'骑解之玛格纳', desc:'击败 Hard 难度的修瓦利耶', points:100, invisible:true },
  { id:'celeste_hard_first', name:'黑雾之玛格纳', desc:'击败 Hard 难度的塞勒斯特', points:100, invisible:true },
  { id:'light_island_clear', name:'星辉终章', desc:'击败光之岛第五关的星辉守卫', points:20, invisible:true },
  { id:'chiv_first',         name:'契约之誓', desc:'击败修瓦利耶', points:30, invisible:true },
  { id:'dark_island_clear',  name:'黑雾终章', desc:'击败暗之岛第五关的黑雾之主', points:20, invisible:true },
  { id:'celeste_first',      name:'幽船之影', desc:'击败塞勒斯特', points:30, invisible:true },
  // 天司武器制作（RANK 3 材料商店）
  { id:'tenshi_first', name:'天司初铸',   desc:'制作任意一把天司武器', points:50, invisible:true },
  { id:'tenshi_all',   name:'六天司集齐', desc:'制作全部六把天司武器', points:100, invisible:true },
  // 巴哈姆特武器制作（任一腐朽武器 ×40 解锁后）
  { id:'baha_first', name:'龙之铸手',   desc:'制作一把巴哈姆特武器', points:50, invisible:true },
  { id:'baha_all',   name:'十龙集齐',   desc:'集齐全部十把巴哈姆特武器', points:100, invisible:true },
  // 天司 Boss 击败（每个 +50）
  { id:'tenshi_boss_michael', name:'火之天司', desc:'击败火之天司 米迦勒', points:50, invisible:true },
  { id:'tenshi_boss_gabriel', name:'水之天司', desc:'击败水之天司 加百列', points:50, invisible:true },
  { id:'tenshi_boss_uriel',   name:'土之天司', desc:'击败土之天司 乌列尔', points:50, invisible:true },
  { id:'tenshi_boss_raphael', name:'风之天司', desc:'击败风之天司 拉斐尔', points:50, invisible:true },
];
const ACH_BY_ID = Object.fromEntries(ACHIEVEMENTS.map(a => [a.id, a]));
const ACH_POINTS_PER = 0.01; // 每个成就点提供 +1% 普通装备掉率

const SAVE_KEY = 'idle_weapon_game_save_v2';
const MAX_LEVEL = 100;

/* ============ 游戏状态 ============ */
let state = {
  currentIdx: 1,     // 当前挂机区域（1..40）
  unlockedIdx: 1,    // 已解锁的最高区域
  progressKills: 0,  // 当前最新区域累计击杀（用于解锁下一区）
  kills: 0,          // 总击杀
  level: 1,          // 玩家等级 1..100
  exp: 0,            // 当前等级经验
  gold: 0,
  points: 0,         // 收藏点（满级武器重复获得转化）
  fates: {},         // 已获得的命运之武器 { id: true }
  achievements: {},  // 已完成的成就 { id: true }
  equipped: null,
  autoAdvance: false, // 自动推进：勾选后自动进入下一张地图
  autoProgress: 0, // 自动推进计数器（当前区域击杀数）
  weaponFilter: 'ALL', // 武器库分类：ALL / R / SR / SSR / UR
  weaponAttrFilter: 'ALL', // 武器库属性筛选：ALL / 无 / 风 ...（与稀有度叠加）
  notifyUpgrade: true, // 武器升级通知（toast）
  hidePointLog: false, // 隐藏「满级转收藏点」的日志
  hideAchievements: false, // 隐藏成就面板
  goldBoostLevel: 0, // 收藏点商店：金币收益等级（每级 +5%）
  pointDropLevel: 0, // 收藏点商店：掉落几率等级（每级 +5%）
  dungeonCleared: false, // 副本是否已通关（解锁成就点经验加成）
  dungeonFight: null,    // 当前副本战斗 { id, name, atk, bossHp, bossMaxHp }
  expBuyLevel: 0,        // 金币商店：经验倍率等级（每级 +5%）
  dropBuyLevel: 0,       // 金币商店：掉落几率等级（每级 +5%）
  silverGlory: 0,        // 银天之辉（材料商店货币）
  bahamutHorn: 0,        // 巴哈姆特之角（宇宙长剑突破材料）
  bahamutFirstCleared: false, // 是否已首次战胜原型巴哈姆特
  sealBroken: false,     // 原型巴哈姆特封印是否已解除
  decayedWeapons: {},    // 腐朽武器材料 { [id]: 数量 }（仅原型巴哈姆特掉落）
  bahaUnlocked: false,   // 巴哈姆特武器制作是否已解锁（一旦解锁永久开放）
  tiamatHard: false,     // 提亚马特是否使用 Hard 难度
  tiamatHardKills: 0,    // 提亚马特 Hard 击败次数（独立计数）
  yggHard: false,        // 尤格多拉希尔是否使用 Hard 难度
  yggHardKills: 0,       // 尤格多拉希尔 Hard 击败次数（独立计数）
  leviHard: false,       // 利维坦是否使用 Hard 难度
  leviHardKills: 0,      // 利维坦 Hard 击败次数（独立计数）
  coloHard: false,       // 科罗萨斯是否使用 Hard 难度
  coloHardKills: 0,      // 科罗萨斯 Hard 击败次数（独立计数）
  chivHard: false,       // 修瓦利耶是否使用 Hard 难度
  chivHardKills: 0,      // 修瓦利耶 Hard 击败次数（独立计数）
  celesteHard: false,    // 塞勒斯特是否使用 Hard 难度
  celesteHardKills: 0,   // 塞勒斯特 Hard 击败次数（独立计数）
  tenshiAwakened: {},    // 天司武器是否已突破（40 → 80）
  fireFeather: 0, waterFeather: 0, earthFeather: 0, windFeather: 0, lightFeather: 0, darkFeather: 0,
  medWingAwakened: false, // 宇宙长剑是否已突破（上限 40 → 80）
  medWingAwakened2: false, // 宇宙长剑第二次突破（上限 80 → 120，解锁「宇宙的权能 II」）
  vhCleared: false,        // 是否击败过 Very Hard 佐伊（解锁成就点金币加成 + 120 突破）
  verdantCrystal: 0,       // 苍翠的结晶（Very Hard 佐伊独特掉落）
  hardZoeKills: 0,        // Hard 难度佐伊击败次数（突破条件）
  bossCooldowns: {},        // 各 Boss 独立冷却结束时间戳 { [id]: ts }（各自 30s）
  rank: 0,                 // RANK 等级（每次突破 +1，等级上限 +10）
  rankFight: null,         // 当前 RANK 突破战斗 { name, atk, bossHp, bossMaxHp }
  everHadPoints: false,    // 是否曾获得过收藏点（收藏点商店出现条件）
  bossKills: {},           // 各副本 Boss 击败次数 { [id]: 次数 }
  autoBoss: {},            // 各 Boss 的自动挑战开关 { [id]: true }
  autoSweep: {},           // 各 Boss 的自动扫荡开关 { [id]: true }（累计 100 次解锁）
  hiddenBosses: {},        // 已隐藏的 Boss 难度 { [autoKey]: true }（解锁自动扫荡后可隐藏）
  hideBossReward: false,   // 战斗页总开关：关闭副本通关奖励通知
  hiddenBossMsgs: {},      // 副本界面按 Boss 单独关闭通知 { [bossId]: true }
  collapsed: {},           // 面板收起状态 { ach: true, ... }
  islandIdx: 0,            // 0=世界地图；1-5=当前空岛第几关
  islandId: 'wind',        // 当前空岛：wind / earth / sea
  islandProgress: {},      // 风之岛各关击败数 { [stage]: count }
  earthProgress: {},       // 土之岛各关击败数 { [stage]: count }
  seaProgress: {},         // 水之岛各关击败数 { [stage]: count }
  sunProgress: {},         // 火之岛各关击败数 { [stage]: count }
  lightProgress: {},       // 光之岛各关击败数 { [stage]: count }
  darkProgress: {},        // 暗之岛各关击败数 { [stage]: count }
  hiddenChapters: {},      // 已隐藏的章节 { [ch]: true }
  amberEyes: 0,            // 岚龙的琥珀眼
  earthBud: 0,             // 创树的花蕾
  seaFan: 0,               // 海神的扇尾
  sunCore: 0,              // 日珥反应炉
  starPlankton: 0,         // 星星浮游体
  darkShard: 0,            // 黑雾的结晶
  windCrystal: 0,          // 风晶之元素（normal 提亚马特必定掉落）
  earthCrystal: 0,         // 土晶之元素（normal 尤格多拉希尔必定掉落）
  waterCrystal: 0,         // 水晶之元素（normal 利维坦必定掉落）
  fireCrystal: 0,          // 火晶之元素（normal 科罗萨斯必定掉落）
  lightCrystal: 0,         // 光晶之元素（normal 修瓦利耶必定掉落）
  darkCrystal: 0,          // 暗晶之元素（normal 塞勒斯特必定掉落）
  tiamatCleared: false,    // 是否击败过 normal 提亚马特（解锁土之岛）
  yggCleared: false,       // 是否击败过 normal 尤格多拉希尔（解锁水之岛）
  leviCleared: false,      // 是否击败过 normal 利维坦（解锁火之岛）
  coloCleared: false,      // 是否击败过 normal 科罗萨斯（解锁光之岛 / 暗之岛）
  zoeHard: false,          // 佐伊 HARD 难度（击败 RANK 2 后解锁）
  zoeVH: false,            // 佐伊 VERY HARD 难度（等级 ≥ 121 解锁）
  vhZoeKills: 0,           // Very Hard 佐伊击败次数（独立计数，不封顶）
  weapons: {},       // { id: { level } }
  monster: null,
  playerHp: 0,
};
let paused = false;
let speed = 1;
let playerGauge = 0; // 玩家攻速读条（0~1，读满出手）
let battleTimer = null;

/* ============ 工具 ============ */
function rand(a, b) { return a + Math.random() * (b - a); }
function fmt(n) { return Math.floor(n); }
function fmt1(n) { const v = Math.round(n * 10) / 10; return Number.isInteger(v) ? String(v) : v.toFixed(1); }
function $(id) { return document.getElementById(id); }
function idxToArea(idx) {
  return { chapter: Math.floor((idx - 1) / 10) + 1, zone: (idx - 1) % 10 + 1 };
}
function areaLabel(idx) {
  const a = idxToArea(idx);
  return a.chapter + '-' + a.zone;
}

/* ============ 属性计算 ============ */
function weaponLevel(id) { return state.weapons[id] ? state.weapons[id].level : 1; }

// 100 级 = 基础属性的 200%（每级约 +1%）
function weaponBonus(def) {
  const lv = weaponLevel(def.id);
  // growth：每级固定 +N% 基础属性（线性，如宇宙长剑 +1%/级）
  // 否则按 maxLevel 线性到满级 2 倍（普通武器 100 级、天司武器 40 级）
  const maxLv = def.maxLevel || MAX_LEVEL;
  const mult = def.growth ? (1 + (lv - 1) * def.growth) : (1 + (lv - 1) / Math.max(1, maxLv - 1));
  let atk = def.atk * mult, hp = def.hp * mult;
  // 方阵层：各属性原生方阵（岚龙/创树/海神/机炎）+ SSR 方阵技能
  // 普通层：SSR 普通技能（属性关键字：火/业火/红莲、风/龙卷/乱气 等）
  // 两层相乘；同层内同名技能加算；同层内攻刃与背水相乘
  let sqAtk = 0, sqHp = 0, sqBw = 0, nmAtk = 0, nmHp = 0, nmBw = 0;
  if (def.attr === '风') {
    const s = magnaSquareBonus(); sqAtk += s.atk; sqHp += s.hp;
  } else if (def.attr === '土') {
    const s = yggSquareBonus(); sqAtk += s.atk; sqHp += s.hp;
    if (state.weapons['ygg_magna_bow']) sqBw += 1; // 创树方阵·背水（藤弓）
  } else if (def.attr === '水') {
    const s = leviSquareBonus(); sqAtk += s.atk; sqHp += s.hp;
  } else if (def.attr === '火') {
    const s = coloSquareBonus(); sqAtk += s.atk; sqHp += s.hp;
  }
  const ms = magnaSkillBonusOf(def.attr);
  sqAtk += ms.sqAtk; sqHp += ms.sqHp; sqBw += ms.sqBw;
  nmAtk += ms.nmAtk; nmHp += ms.nmHp; nmBw += ms.nmBw;
  const bw = backwaterCurve();
  atk *= (1 + sqAtk) * (1 + bw * sqBw) * (1 + nmAtk) * (1 + bw * nmBw);
  hp *= (1 + sqHp) * (1 + nmHp);
  return { atk, hp };
}
function equippedDef() { return state.equipped ? WEAPON_BY_ID[state.equipped] : null; }

// 玩家属性缓存：武器/装备/命运/等级/RANK 变化时调用 invalidateStats() 失效
let statsDirty = true;
const statsCache = { atk: 0, hp: 0 };
let weaponDirty = false;     // 武器是否有变化（自动装备降频用）
let killSinceAchCheck = 0;   // 距上次成就检测的击杀数（成就检测降频用）
function invalidateStats() { statsDirty = true; }
function recalcStats() {
  let a = 0, h = 0;
  for (const id in state.weapons) {
    const def = WEAPON_BY_ID[id];
    const ratio = (id === state.equipped) ? 1 : 0.1;
    const b = weaponBonus(def);
    a += b.atk * ratio;
    h += b.hp * ratio;
  }
  const f = fateMult(), lm = levelMul();
  // 宇宙长剑突破后获得「宇宙的权能 I」：每拥有一把武器，全属性 +0.1%（无需装备）
  let cosmicMul = 1;
  if (state.medWingAwakened) {
    cosmicMul = 1 + 0.001 * Object.keys(state.weapons).length;
    // 宇宙的权能 II：每拥有一把 MAX 等级武器，再 +0.1%
    if (state.medWingAwakened2) {
      let maxCount = 0;
      for (const k in state.weapons) {
        const dfn = WEAPON_BY_ID[k];
        if (dfn && state.weapons[k].level >= (dfn.maxLevel || MAX_LEVEL)) maxCount++;
      }
      cosmicMul += 0.001 * maxCount;
    }
  }
  // 创世之龙的加护：每拥有一把对应类型武器，生命 +0.2%（多把加算后整体乘算）
  let dragonHp = 1;
  for (const bw of BAHA_WEAPONS) {
    if (!state.weapons[bw.id]) continue;
    let cnt = 0;
    for (const wid in state.weapons) {
      const wd = WEAPON_BY_ID[wid];
      if (wd && wd.type === bw.type) cnt++;
    }
    dragonHp += 0.002 * cnt;
  }
  statsCache.atk = a * f.atk * lm * cosmicMul;
  statsCache.hp = h * f.hp * lm * cosmicMul * dragonHp;
  statsDirty = false;
}

// 命运之武器加成（百分比乘数）：所有已获得的命运武器加成累加
function fateMult() {
  let atk = 0, hp = 0;
  for (const id in state.fates) {
    const f = FATE_BY_ID[id];
    if (f) { atk += f.bonusAtk; hp += f.bonusHp; }
  }
  return { atk: 1 + atk, hp: 1 + hp };
}

/* ============ 等级与经验 ============ */
const PLAYER_MAX_LEVEL = 100;   // 基础等级上限（每次 RANK 突破 +10）
const EXP_BASE = 100;        // 1→2 级所需经验
const EXP_STEP = 100;        // 每级所需经验递增（线性）
const MONSTER_EXP_BASE = 20; // 1-1 每只怪经验
// 当前等级上限：基础 100 + RANK × 10
function levelCap() { return Math.min(140, PLAYER_MAX_LEVEL + state.rank * 10); }
// 升到下一级所需经验：1→100 线性；100→101 翻 10 倍；100 级后每级 +1 万；120 级起需求 ×10
function expNeed(level) {
  if (level < 100) return EXP_BASE + (level - 1) * EXP_STEP;
  if (level === 100) return 100000;
  if (level < 110) return 100000 + (level - 100) * 10000;
  // 110 级之后：110→111 = 200 万，之后每级 +10 万；120 级起 ×10；130 级起再 ×10（RANK 4）
  const base = 2000000 + (level - 110) * 100000;
  if (level >= 130) return base * 100;
  return level >= 120 ? base * 10 : base;
}
// 区域怪物经验：随地图递增（1-1 最低 20，每关 +3，9-10 最高 287）
function monsterExp(idx) { return MONSTER_EXP_BASE + (idx - 1) * 3; }
// 等级属性乘区：1 级 ×1.01，100 级 ×2.00，之后每级 +1%
function levelMul() { return 1 + state.level * 0.01; }

function playerAtk() { if (statsDirty) recalcStats(); return statsCache.atk; }
function playerMaxHp() { if (statsDirty) recalcStats(); return statsCache.hp; }
// 当前装备武器的属性（未装备或武器无属性时为「无」）
function playerAttr() {
  const def = WEAPON_BY_ID[state.equipped];
  return (def && def.attr) || '无';
}

// 属性克制链：风克土、土克水、水克火、火克风；光↔暗名义互克
const ATTR_BEATS = { 风: '土', 土: '水', 水: '火', 火: '风' };

// 属性结算（以玩家为主语）：返回 { out: 玩家造成伤害倍率, in: 玩家受到伤害倍率 }
// 优先级：怪物无属性 → 玩家无属性 → 同属性 → 光暗 → 四元素克制/被克 → 其余
function attrModifier(pAttr, mAttr) {  const p = pAttr || '无';
  const m = mAttr || '无';
  if (m === '无') return { out: 1, in: 1 };                              // 1) 怪物无属性 → 100% / 100%
  if (p === '无') return { out: 0.8, in: 1.2 };                          // 2) 玩家无属性、怪物有属性 → 80% / 120%
  if (p === m) return { out: 1, in: 1 };                                 // 3) 同属性 → 100% / 100%
  if ((p === '光' && m === '暗') || (p === '暗' && m === '光')) return { out: 1.5, in: 1 }; // 4) 光暗：仅玩家享受 150%
  if (ATTR_BEATS[p] === m) return { out: 1.5, in: 0.5 };                 // 5a) 玩家克制 → 150% / 50%
  if (ATTR_BEATS[m] === p) return { out: 0.5, in: 1.5 };                 // 5b) 玩家被克 → 50% / 150%
  return { out: 1, in: 1 };                                              // 6) 其余 → 100% / 100%
}

// 天司武器技能：拥有即生效（无需装备），与属性克制【相乘】（×1.05 / ×1.10）
function tenshiDamageMul(mAttr) {
  const attr = mAttr || '无';
  let bonus = 0;
  for (const w of TENSHI_WEAPONS) {
    if (state.weapons[w.id] && w.beats === attr) bonus += state.tenshiAwakened[w.id] ? 0.10 : 0.05;
  }
  return 1 + bonus;
}

/* ============ 怪物 ============ */
// 每章怪物强度：[起始 HP, 结束 HP, 起始攻击, 结束攻击]，章内 1-10 区线性插值
const MONSTER_SCALE = {
  1: { hp: [250, 500],    atk: [6, 12] },
  2: { hp: [500, 900],    atk: [14, 22] },
  3: { hp: [900, 1400],   atk: [24, 34] },
  4: { hp: [1400, 2250],  atk: [36, 50] },
  5: { hp: [1500, 4750],  atk: [38, 100] },
  6: { hp: [5000, 7000],  atk: [110, 150] },
  7: { hp: [7250, 9500],  atk: [160, 210] },
  8: { hp: [9500, 11500], atk: [215, 265] },
  9: { hp: [11500, 13000], atk: [270, 320] },
};

/* ============ 空岛：风之岛 / 土之岛 ============ */
const ISLANDS = {
  wind: {
    id: 'wind', name: '风之岛', attr: '风', stages: 5,
    monsters: ['风精灵', '疾风狼', '风暴鹰', '狂风巨人', '岚龙'],
    hp: [31000, 155000],   // 第 1 关 31000 → 第 5 关 155000（每关 +31000，线性）
    atk: [800, 4000],      // 第 1 关 800 → 第 5 关 4000（每关 +800，线性）
    material: '岚龙的琥珀眼', materialIcon: '🌀', materialKey: 'amberEyes',
    rate: [0.005, 0.20],   // 材料掉率：第 1 关 0.5% → 第 5 关 20%
  },
  earth: {
    id: 'earth', name: '土之岛', attr: '土', stages: 5,
    monsters: ['土精灵', '岩甲兽', '沙暴蝎', '泥沼巨像', '创树之灵'],
    hp: [32550, 162750],   // 风之岛 × 1.05
    atk: [840, 4200],      // 风之岛 × 1.05
    material: '创树的花蕾', materialIcon: '🌱', materialKey: 'earthBud',
    rate: [0.005, 0.20],
  },
  sea: {
    id: 'sea', name: '水之岛', attr: '水', stages: 5,
    monsters: ['水精灵', '浪花蟹', '潮汐蛇', '深海巨鲸', '海神使徒'],
    hp: [34178, 170888],   // 土之岛 × 1.05
    atk: [882, 4410],      // 土之岛 × 1.05
    material: '海神的扇尾', materialIcon: '🌊', materialKey: 'seaFan',
    rate: [0.005, 0.20],
  },
  sun: {
    id: 'sun', name: '火之岛', attr: '火', stages: 5,
    monsters: ['火精灵', '熔岩犬', '烈焰蜥', '炽焰巨像', '日珥守卫'],
    hp: [35887, 179432],   // 水之岛 × 1.05
    atk: [926, 4631],      // 水之岛 × 1.05
    material: '日珥反应炉', materialIcon: '🔥', materialKey: 'sunCore',
    rate: [0.005, 0.20],
  },
  light: {
    id: 'light', name: '光之岛', attr: '光', stages: 5,
    monsters: ['光辉精灵', '闪光鹿', '圣光鹰', '日耀巨像', '星辉守卫'],
    hp: [35887, 179432],   // 与火之岛一致
    atk: [926, 4631],      // 与火之岛一致
    material: '星星浮游体', materialIcon: '✨', materialKey: 'starPlankton',
    rate: [0.005, 0.20],
  },
  dark: {
    id: 'dark', name: '暗之岛', attr: '暗', stages: 5,
    monsters: ['暗影精灵', '夜行狼', '黑雾蝠', '虚空巨像', '黑雾之主'],
    hp: [35887, 179432],   // 与火之岛一致
    atk: [926, 4631],      // 与火之岛一致
    material: '黑雾的结晶', materialIcon: '🌑', materialKey: 'darkShard',
    rate: [0.005, 0.20],
  },
};
function islandCfg() { return ISLANDS[state.islandId] || ISLANDS.wind; }
function islandProgMap() {
  if (state.islandId === 'earth') {
    if (!state.earthProgress) state.earthProgress = {};
    return state.earthProgress;
  }
  if (state.islandId === 'sea') {
    if (!state.seaProgress) state.seaProgress = {};
    return state.seaProgress;
  }
  if (state.islandId === 'sun') {
    if (!state.sunProgress) state.sunProgress = {};
    return state.sunProgress;
  }
  if (state.islandId === 'light') {
    if (!state.lightProgress) state.lightProgress = {};
    return state.lightProgress;
  }
  if (state.islandId === 'dark') {
    if (!state.darkProgress) state.darkProgress = {};
    return state.darkProgress;
  }
  if (!state.islandProgress) state.islandProgress = {};
  return state.islandProgress;
}
function islandMaterialCount() { return state[islandCfg().materialKey] || 0; }
function islandAmberRate(stage) {
  const cfg = islandCfg();
  const t = (stage - 1) / (cfg.stages - 1);
  return cfg.rate[0] + (cfg.rate[1] - cfg.rate[0]) * t;
}

function currentMonsterName() {
  if (state.islandIdx > 0) return islandCfg().monsters[state.islandIdx - 1];
  const a = idxToArea(state.currentIdx);
  return CHAPTERS[a.chapter - 1].monsters[a.zone - 1];
}
function spawnMonster() {
  if (state.islandIdx > 0) {
    const cfg = islandCfg();
    const stage = state.islandIdx;
    const t = (stage - 1) / (cfg.stages - 1);
    const hp = Math.round(cfg.hp[0] + (cfg.hp[1] - cfg.hp[0]) * t);
    const atk = Math.round(cfg.atk[0] + (cfg.atk[1] - cfg.atk[0]) * t);
    state.monster = { name: cfg.monsters[stage - 1], attr: cfg.attr, atk, hp, maxHp: hp, gauge: 0, round: 0 };
    playerGauge = 0;
    return;
  }
  const a = idxToArea(state.currentIdx);
  const s = MONSTER_SCALE[a.chapter] || MONSTER_SCALE[9];
  const t = (a.zone - 1) / 9; // 章内进度 0..1
  const hp = Math.round(s.hp[0] + (s.hp[1] - s.hp[0]) * t);
  const atk = Math.round(s.atk[0] + (s.atk[1] - s.atk[0]) * t);
  state.monster = {
    name: currentMonsterName(),
    attr: '无',
    atk: atk,
    hp: hp,
    maxHp: hp,
    gauge: 0,
    round: 0,
  };
  playerGauge = 0;
}

/* ============ 掉落 / 武器 ============ */
// 区域掉率：每章第 1 区 25%，线性增长到第 10 区 100%
function dropRate(idx) {
  const zone = idxToArea(idx).zone; // 1..10
  return 0.25 + (zone - 1) * (0.75 / 9);
}

// 成就点：每完成一个成就获得 1 点
function achievementPoints() {
  let p = 0;
  for (const id in state.achievements) {
    const a = ACH_BY_ID[id];
    if (a) p += (a.points || 1);
  }
  return p;
}
// 普通装备实际掉率 = 基础掉率 × 成就加成 × 金币掉落倍率（不含命运武器独立掉率）
function effectiveDropRate(idx) {
  return dropRate(idx) * (1 + achievementPoints() * ACH_POINTS_PER) * totalDropMul();
}

// 按章节返回 R 武器池（1-4 章用基础 R，5-8 章用新增 R，第 9 章为全部 R）
function rPoolFor(ch) {
  if (ch <= 4) return WEAPONS.filter(w => TYPE_CHAPTER[w.type] === ch);
  if (ch === 9) return ALL_R;
  const types = ADV_TYPE_BY_CHAPTER[ch] || TYPE_ORDER;
  return ADV_R.filter(w => types.indexOf(w.type) >= 0);
}
// 按章节返回 SR 武器池（5-9 章；第 9 章为全部 SR）
function srPoolFor(ch) {
  if (ch < 5) return [];
  if (ch === 9) return SR_WEAPONS;
  const types = ADV_TYPE_BY_CHAPTER[ch] || TYPE_ORDER;
  return SR_WEAPONS.filter(w => types.indexOf(w.type) >= 0);
}
// 第 9 章 SSR 武器池
function ssrPoolFor(ch) {
  return ch === 9 ? SSR_WEAPONS : [];
}
// SR 掉率：5-9 章内第 1 区 10%，升到第 10 区 40%
function srDropRate(ch, zone) {
  if (ch < 5) return 0;
  return 0.10 + (zone - 1) * (0.30 / 9);
}
// SSR 掉率：仅第 9 章，第 1 区 4%，升到第 10 区 16%
function ssrDropRate(ch, zone) {
  if (ch !== 9) return 0;
  return 0.04 + (zone - 1) * (0.12 / 9);
}

function rollWeapon() {
  const ch = idxToArea(state.currentIdx).chapter;
  const pool = rPoolFor(ch);
  return pool[Math.floor(Math.random() * pool.length)];
}
// 返回 { type: 'new'|'up'|'max', def, level, points? }
function addWeapon(def) {
  invalidateStats();
  weaponDirty = true;
  armoryDirty = true;
  const owned = state.weapons[def.id];
  if (owned) {
    if (owned.level < MAX_LEVEL) {
      owned.level++;
      return { type:'up', def, level: owned.level };
    } else {
      // Boss 专属 SR（提亚马特/尤格/利维坦/科罗萨斯/修瓦利耶/塞勒斯特）满级重复 → 30 收藏点
      const isBossSr = /^(tiamat|ygg|levi|colo|chiv|celeste)_/.test(def.id);
      const p = isBossSr ? 30 : (RARITY_POINTS[def.rarity] || 1);
      state.points += p;
      state.everHadPoints = true;
      return { type:'max', def, level: MAX_LEVEL, points: p };
    }
  } else {
    state.weapons[def.id] = { level: 1 };
    return { type:'new', def, level: 1 };
  }
}

function weaponTotalScore(def) {
  const b = weaponBonus(def);
  return b.atk + b.hp;
}
function findBestWeapon() {
  let best = null, bestScore = -1;
  for (const id in state.weapons) {
    const def = WEAPON_BY_ID[id];
    const s = weaponTotalScore(def);
    if (s > bestScore) { bestScore = s; best = id; }
  }
  return best;
}
/* ============ 战斗 ============ */
function battleTick() {
  if (paused) return;
  if (state.dungeonFight || state.rankFight) { dungeonTick(); return; }
  if (!state.monster) return;

  // 攻速读条：100ms 帧推进 0.2（1x），读满 1 出手
  const step = speed === 1 ? 0.2 : 0.4;
  playerGauge += step;
  state.monster.gauge = (state.monster.gauge || 0) + step;

  // 玩家先手：读满则攻击；若击杀则本帧怪物不再行动
  if (playerGauge >= 1) {
    playerGauge -= 1;
    playerAttackOnce();
    if (!state.monster) { updateBattleUI(); return; }
  }
  // 怪物读满则反击
  if (state.monster && (state.monster.gauge || 0) >= 1) {
    state.monster.gauge -= 1;
    monsterAttackOnce();
  }
  updateBattleUI();
}

// 回合钩子：预留给「每 N 回合触发」的机制/技能
const ROUND_HOOKS = []; // { every: N, fn(ctx) => void }
function fireRoundHooks(ctx) {
  for (const h of ROUND_HOOKS) {
    if (h.every > 0 && ctx.round % h.every === 0) {
      try { h.fn(ctx); } catch (e) { console.error('round hook error:', e); }
    }
  }
}

// 玩家一次攻击
function playerAttackOnce() {
  state.monster.round = (state.monster.round || 0) + 1;
  fireRoundHooks({ round: state.monster.round, monster: state.monster });
  const mod = attrModifier(playerAttr(), state.monster.attr || '无');
  let dmg = playerAtk() * mod.out * rand(0.9, 1.1) * tenshiDamageMul(state.monster.attr);
  // 红莲的技巧（塞勒斯特竖琴·玛格纳）：装备火属性武器时 8% 概率暴击 150%
  if (celesteCritActive() && Math.random() < 0.08) dmg *= 1.5;
  state.monster.hp -= dmg;
  leviHealOnAttack(); // 海神方阵·治愈
  if (state.monster.hp <= 0) {
    state.monster.hp = 0;
    onMonsterKilled();
  }
}

// 怪物一次攻击（反击）
function monsterAttackOnce() {
  if (!state.monster) return;
  // 机炎方阵·见切：3% 概率免伤并立即反击
  if ((coloKiriActive() || celesteKiriActive()) && Math.random() < 0.03) {
    showKiriEffect();
    playerAttackOnce();
    return;
  }
  const mod = attrModifier(playerAttr(), state.monster.attr || '无');
  const mdmg = state.monster.atk * mod.in * rand(0.9, 1.1);
  state.playerHp -= mdmg;
  // 创树方阵·背水：血量变化后立即刷新面板
  bwRefresh();
  if (state.playerHp <= 0) {
    state.playerHp = playerMaxHp();
    if (state.autoAdvance) {
      state.autoAdvance = false;
      state.autoProgress = 0;
      const ck = $('ck-advance');
      if (ck) ck.checked = false;
      if (state.currentIdx > 1) {
        state.currentIdx--;
        state.progressKills = 0;
        spawnMonster();
        renderMap();
        log(`💀 战斗失败！自动推进已关闭，退回 <span class="area">${areaLabel(state.currentIdx)}</span>。`, 'death');
        toast(`💀 战斗失败：自动推进关闭，退回 ${areaLabel(state.currentIdx)}`);
      } else {
        spawnMonster();
        log('💀 战斗失败！自动推进已关闭（已在第一张地图），双方血量已回满。', 'death');
        toast('💀 战斗失败：自动推进关闭');
      }
      updateHud();
      renderPanels(true);
      save(true);
    } else {
      spawnMonster();
      log('你倒下了，已满血复活，怪物也回满，重新战斗！', 'death');
    }
  }
}

/* ============ 副本战斗 ============ */
// 佐伊难度：normal / hard / vh（VH 需等级 ≥ 121）
function zoeDiff() {
  if (state.level >= 121 && state.zoeVH) return 'vh';
  if (state.rank >= 2 && state.zoeHard) return 'hard';
  return 'normal';
}
function zoeKillsFor(diff) {
  if (diff === 'vh') return state.vhZoeKills || 0;
  if (diff === 'hard') return state.hardZoeKills || 0;
  return state.bossKills.zoe || 0;
}

function startDungeon(id) {
  const b = allDungeons().find(d => d.id === id);
  if (!b) return;
  // 天司 Boss：对应天司武器达到 40 级才可挑战
  if (b.tenshiWeapon) {
    const tw = state.weapons[b.tenshiWeapon];
    if (!tw || tw.level < 40) return;
  }
  if (state.dungeonFight) return; // 已在战斗中
  if (state.level < b.reqLevel) return;
  if (Date.now() < (state.bossCooldowns[b.id] || 0)) return; // 该 Boss 冷却中
  // 提亚马特：击败岚龙第 5 关 10 次后解锁，每次挑战消耗 3 个岚龙的琥珀眼
  if (b.id === 'tiamat') {
    if ((state.islandProgress[5] || 0) < 10) return;
    // 玛格纳（Hard）难度消耗翻倍：6 个琥珀眼
    const tHard = !!state.tiamatHard && (state.bossKills.raphael || 0) >= 10;
    const cost = tHard ? 6 : (b.costAmber || 3);
    if ((state.amberEyes || 0) < cost) return;
    state.amberEyes -= cost;
  }
  // 尤格多拉希尔：击败土之岛第 5 关「创树之灵」10 次后解锁；Normal 消耗 3，Hard（玛格纳）消耗 6
  if (b.id === 'yggdrasil') {
    if (((state.earthProgress || {})[5] || 0) < 10) return;
    const yHard = !!state.yggHard && (state.bossKills.uriel || 0) >= 10;
    const cost = yHard ? 6 : (b.costBud || 3);
    if ((state.earthBud || 0) < cost) return;
    state.earthBud -= cost;
  }
  // 利维坦：击败水之岛第 5 关「海神使徒」10 次后解锁；Normal 消耗 3，Hard（玛格纳）消耗 6
  if (b.id === 'leviathan') {
    if (((state.seaProgress || {})[5] || 0) < 10) return;
    const lHard = !!state.leviHard && (state.bossKills.gabriel || 0) >= 10;
    const cost = lHard ? 6 : (b.costFan || 3);
    if ((state.seaFan || 0) < cost) return;
    state.seaFan -= cost;
  }
  // 科罗萨斯：击败火之岛第 5 关「日珥守卫」10 次后解锁，每次消耗 3 个日珥反应炉
  if (b.id === 'colossus') {
    if (((state.sunProgress || {})[5] || 0) < 10) return;
    const cHard = !!state.coloHard && (state.bossKills.michael || 0) >= 10;
    const cost = cHard ? 6 : (b.costSun || 3);
    if ((state.sunCore || 0) < cost) return;
    state.sunCore -= cost;
  }
  // 修瓦利耶：Normal 消耗 3；Hard（玛格纳，四属性玛格纳全击败后解锁）消耗 6
  if (b.id === 'chivalier') {
    if (((state.lightProgress || {})[5] || 0) < 10) return;
    const cHard = !!state.chivHard && fourMagnaCleared();
    const cost = cHard ? 6 : (b.costStar || 3);
    if ((state.starPlankton || 0) < cost) return;
    state.starPlankton -= cost;
  }
  // 塞勒斯特：Normal 消耗 3；Hard（玛格纳，四属性玛格纳全击败后解锁）消耗 6
  if (b.id === 'celeste') {
    if (((state.darkProgress || {})[5] || 0) < 10) return;
    const eHard = !!state.celesteHard && fourMagnaCleared();
    const cost = eHard ? 6 : (b.costShard || 3);
    if ((state.darkShard || 0) < cost) return;
    state.darkShard -= cost;
  }
  // 原型巴哈姆特：需先解除封印
  if (b.id === 'bahamut' && !state.sealBroken) return;
  const zd = b.tenshiWeapon ? 'hard'
    : b.id === 'zoe' ? zoeDiff()
    : (b.id === 'tiamat' && state.tiamatHard && (state.bossKills.raphael || 0) >= 10) ? 'hard'
    : (b.id === 'yggdrasil' && state.yggHard && (state.bossKills.uriel || 0) >= 10) ? 'hard'
    : (b.id === 'leviathan' && state.leviHard && (state.bossKills.gabriel || 0) >= 10) ? 'hard'
    : (b.id === 'colossus' && state.coloHard && (state.bossKills.michael || 0) >= 10) ? 'hard'
    : (b.id === 'chivalier' && state.chivHard && fourMagnaCleared()) ? 'hard'
    : (b.id === 'celeste' && state.celesteHard && fourMagnaCleared()) ? 'hard'
    : 'normal';
  const vh = zd === 'vh';
  const hard = zd === 'hard';
  const hp = vh ? b.vhHp : (hard && b.hardHp) ? b.hardHp : b.hp;
  const atk = vh ? b.vhAtk : (hard && b.hardAtk) ? b.hardAtk : b.atk;
  const bossName = vh ? b.vhName : (hard && b.hardName) ? b.hardName : b.name;
  const diffName = vh ? 'Very Hard' : hard ? 'Hard' : 'Normal';
  state.dungeonFight = { id: b.id, name: bossName, attr: b.attr || '无', atk, bossHp: hp, bossMaxHp: hp, hard, vh, diff: diffName };
  state.playerHp = playerMaxHp();
  log(`⚔️ 挑战副本 Boss：<b>${bossName}</b> （ ${diffName}）`, 'area');
  toast(`⚔️ 挑战 ${bossName} （ ${diffName}）`);
  updateAll();
  save();
}

function dungeonTick() {
  if (paused) return;
  const isRank = !!state.rankFight;
  const f = state.dungeonFight || state.rankFight;
  if (!f) return;
  // 攻速读条：100ms 帧推进 0.2（1x），读满 1 出手
  const step = speed === 1 ? 0.2 : 0.4;
  f.playerGauge = (f.playerGauge || 0) + step;
  f.bossGauge = (f.bossGauge || 0) + step;

  if (f.playerGauge >= 1) {
    f.playerGauge -= 1;
    f.round = (f.round || 0) + 1;
    fireRoundHooks({ round: f.round, boss: f, isDungeon: true });
    const attrMod = attrModifier(playerAttr(), f.attr || '无');
    let dmg = playerAtk() * attrMod.out * rand(0.9, 1.1) * tenshiDamageMul(f.attr);
    if (celesteCritActive() && Math.random() < 0.08) dmg *= 1.5;
    f.bossHp -= dmg;
    leviHealOnAttack(); // 海神方阵·治愈
    if (f.bossHp <= 0) {
      f.bossHp = 0;
      if (isRank) onRankWin(); else onDungeonWin();
      return;
    }
  }
  if (f.bossGauge >= 1) {
    f.bossGauge -= 1;
    // 机炎方阵·见切：3% 概率免伤并立即反击
    if ((coloKiriActive() || celesteKiriActive()) && Math.random() < 0.03) {
      showKiriEffect();
      const kMod = attrModifier(playerAttr(), f.attr || '无');
      const kDmg = playerAtk() * kMod.out * rand(0.9, 1.1) * tenshiDamageMul(f.attr);
      f.bossHp -= kDmg;
      if (f.bossHp <= 0) {
        f.bossHp = 0;
        if (isRank) onRankWin(); else onDungeonWin();
        return;
      }
      updateBattleUI();
      return;
    }
    const attrMod = attrModifier(playerAttr(), f.attr || '无');
    const mdmg = f.atk * attrMod.in * rand(0.9, 1.1);
    state.playerHp -= mdmg;
    bwRefresh(); // 创树方阵·背水：副本战同样实时生效
    if (state.playerHp <= 0) {
      if (isRank) onRankLose(); else onDungeonLose();
      return;
    }
  }
  updateBattleUI();
}

// 获得/升级宇宙长剑（满级后转化为 1 银天之辉）
function grantMedWingBlade() {
  const owned = state.weapons[MED_WING_BLADE.id];
  if (!owned) {
    state.weapons[MED_WING_BLADE.id] = { level: 1 };
    invalidateStats();
    return 'new';
  }
  if (owned.level < MED_WING_BLADE.maxLevel) {
    owned.level++;
    invalidateStats();
    return 'up';
  }
  state.points += 1000; // 满级后重复获得 → 1000 收藏点
  return 'max';
}

// 副本 Boss 奖励（含当前加成）：Hard 4 倍；提亚马特 / 尤格多拉希尔数值更高，按 4.5 倍再高一档
function bossReward(hard, bossId, vh) {
  // 成就点经验加成与地图一致：需「首次通关 Normal 佐伊」后才生效
  const achMul = state.dungeonCleared ? (1 + achievementPoints() * ACH_POINTS_PER) : 1;
  const expBoost = achMul * expBuyMul();
  const isTenshiBoss = TENSHI_DUNGEONS.some(d => d.id === bossId);
  const isSixIslandBoss = (bossId === 'tiamat' || bossId === 'yggdrasil' || bossId === 'leviathan' || bossId === 'colossus' || bossId === 'chivalier' || bossId === 'celeste');
  // 倍率：Very Hard 16 / 天司 5.5 / Hard 为 Normal 的 4 倍（六岛 Boss 18，其余 4）/ 原型巴哈姆特 6.75 / 六岛 Normal 4.5 / 其余 1
  const mul = vh ? 16
    : isTenshiBoss ? 5.5
    : hard ? (isSixIslandBoss ? 18 : 4)
    : bossId === 'bahamut' ? 6.75
    : isSixIslandBoss ? 4.5
    : 1;
  return { exp: Math.round(2000 * mul * expBoost), gold: Math.round(2500 * mul * goldMul() * achGoldMul()) };
}

// 掉率 → 实际掉落件数：<100% 时最多 1 件；≥100% 时 floor 件 + 余数概率再掉 1 件
function rollDropCount(rate) {
  const whole = Math.floor(rate);
  return whole + (Math.random() < (rate - whole) ? 1 : 0);
}

// Boss 显示名（带难度后缀）
function bossLabel(b) {
  if (!b) return '';
  return b.diff ? `${b.name} （ ${b.diff}）` : b.name;
}

function onDungeonWin() {
  const boss = state.dungeonFight;
  // 通关通知：战斗页总开关或该 Boss 单独关闭时静音（奖励照常发放）
  suppressBossMsgs = !!state.hideBossReward || !!(state.hiddenBossMsgs && state.hiddenBossMsgs[boss.id]);
  const firstClear = !state.dungeonCleared;
  // 奖励在开关置位前结算：首通 Normal 佐伊的那一次不吃成就点经验加成
  const rw = bossReward(!!boss.hard, boss.id, !!boss.vh);
  state.dungeonFight = null;
  state.dungeonCleared = true;
  // 击败计数按难度独立累计（不封顶；该难度累计 100 次解锁自动扫荡）
  if (boss.vh) state.vhZoeKills = (state.vhZoeKills || 0) + 1;
  if (boss.vh) unlockAchievement('zoe_vh_first');
  else if (boss.hard && boss.id === 'zoe') state.hardZoeKills = (state.hardZoeKills || 0) + 1;
  else if (boss.hard && boss.id === 'tiamat') state.tiamatHardKills = (state.tiamatHardKills || 0) + 1;
  else if (boss.hard && boss.id === 'yggdrasil') state.yggHardKills = (state.yggHardKills || 0) + 1;
  else if (boss.hard && boss.id === 'leviathan') state.leviHardKills = (state.leviHardKills || 0) + 1;
  else if (boss.hard && boss.id === 'colossus') state.coloHardKills = (state.coloHardKills || 0) + 1;
  else if (boss.hard && boss.id === 'chivalier') state.chivHardKills = (state.chivHardKills || 0) + 1;
  else if (boss.hard && boss.id === 'celeste') state.celesteHardKills = (state.celesteHardKills || 0) + 1;
  else state.bossKills[boss.id] = (state.bossKills[boss.id] || 0) + 1;
  state.bossCooldowns[boss.id] = Date.now() + 30000; // 该 Boss 独立 30 秒冷却
  if (boss.id === 'tiamat') {
    state.tiamatCleared = true; // 解锁土之岛
    if (boss.hard) {
      // Hard（玛格纳）：风晶之元素数量受掉率加成
      const db = (1 + achievementPoints() * ACH_POINTS_PER) * totalDropMul();
      const whole = Math.floor(db);
      const gain = whole + (Math.random() < (db - whole) ? 1 : 0);
      state.windCrystal = (state.windCrystal || 0) + gain;
      log(`🌀 击败提亚马特·玛格纳，获得 <span class="drop">风晶之元素 ×${gain}</span>（掉率 ${(db * 100).toFixed(0)}%，当前 ${state.windCrystal}）`, 'drop');
    } else {
      state.windCrystal = (state.windCrystal || 0) + 1; // 必定掉落：风晶之元素 ×1
      log(`🌀 击败提亚马特，获得 <span class="drop">风晶之元素 ×1</span>（当前 ${state.windCrystal}）`, 'drop');
    }
    unlockAchievement('tiamat_first');
    if (boss.hard) unlockAchievement('tiamat_hard_first');
  }
  if (boss.id === 'yggdrasil') {
    const yBoost = (1 + achievementPoints() * ACH_POINTS_PER) * totalDropMul();
    const yCrystal = boss.hard ? (Math.floor(yBoost) + (Math.random() < (yBoost - Math.floor(yBoost)) ? 1 : 0)) : 1;
    state.earthCrystal = (state.earthCrystal || 0) + yCrystal; // Normal 必定 ×1；Hard 按掉率数量
    log(`🌳 击败尤格多拉希尔${boss.hard ? '·玛格纳' : ''}，获得 <span class="drop">土晶之元素 ×${yCrystal}</span>（当前 ${state.earthCrystal}）`, 'drop');
    state.yggCleared = true; // 解锁水之岛
    unlockAchievement('ygg_first');
    if (boss.hard) unlockAchievement('ygg_hard_first');
  }
  if (boss.id === 'leviathan') {
    const wBoost = (1 + achievementPoints() * ACH_POINTS_PER) * totalDropMul();
    const wCrystal = boss.hard ? (Math.floor(wBoost) + (Math.random() < (wBoost - Math.floor(wBoost)) ? 1 : 0)) : 1;
    state.waterCrystal = (state.waterCrystal || 0) + wCrystal; // Normal 必定 ×1；Hard 按掉率数量
    log(`🌊 击败利维坦${boss.hard ? '·玛格纳' : ''}，获得 <span class="drop">水晶之元素 ×${wCrystal}</span>（当前 ${state.waterCrystal}）`, 'drop');
    state.leviCleared = true; // 解锁火之岛
    unlockAchievement('levi_first');
    if (boss.hard) unlockAchievement('levi_hard_first');
  }
  if (boss.id === 'colossus') {
    const fBoost = (1 + achievementPoints() * ACH_POINTS_PER) * totalDropMul();
    const fCrystal = boss.hard ? (Math.floor(fBoost) + (Math.random() < (fBoost - Math.floor(fBoost)) ? 1 : 0)) : 1;
    state.fireCrystal = (state.fireCrystal || 0) + fCrystal; // Normal 必定 ×1；Hard 按掉率数量
    log(`🔥 击败科罗萨斯${boss.hard ? '·玛格纳' : ''}，获得 <span class="drop">火晶之元素 ×${fCrystal}</span>（当前 ${state.fireCrystal}）`, 'drop');
    unlockAchievement('colo_first');
    if (boss.hard) unlockAchievement('colo_hard_first');
    state.coloCleared = true; // 解锁光之岛 / 暗之岛
  }
  if (boss.id === 'chivalier') {
    const lBoost = (1 + achievementPoints() * ACH_POINTS_PER) * totalDropMul();
    const lCrystal = boss.hard ? (Math.floor(lBoost) + (Math.random() < (lBoost - Math.floor(lBoost)) ? 1 : 0)) : 1;
    state.lightCrystal = (state.lightCrystal || 0) + lCrystal; // Normal 必定 ×1；Hard 按掉率数量
    log(`✨ 击败修瓦利耶${boss.hard ? '·玛格纳' : ''}，获得 <span class="drop">光晶之元素 ×${lCrystal}</span>（当前 ${state.lightCrystal}）`, 'drop');
    unlockAchievement('chiv_first');
    if (boss.hard) unlockAchievement('chiv_hard_first');
  }
  if (boss.id === 'celeste') {
    const eBoost = (1 + achievementPoints() * ACH_POINTS_PER) * totalDropMul();
    const eCrystal = boss.hard ? (Math.floor(eBoost) + (Math.random() < (eBoost - Math.floor(eBoost)) ? 1 : 0)) : 1;
    state.darkCrystal = (state.darkCrystal || 0) + eCrystal; // Normal 必定 ×1；Hard 按掉率数量
    log(`🌑 击败塞勒斯特${boss.hard ? '·玛格纳' : ''}，获得 <span class="drop">暗晶之元素 ×${eCrystal}</span>（当前 ${state.darkCrystal}）`, 'drop');
    unlockAchievement('celeste_first');
    if (boss.hard) unlockAchievement('celeste_hard_first');
  }
  state.playerHp = playerMaxHp();

  // 银天之辉：普通难度固定 1 个；Hard 享受掉落率加成；Very Hard 基础为 Hard 的 4 倍
  let gloryGain = 1;
  if (boss.hard || boss.vh) {
    const gloryRate = (boss.vh ? 4 : 1) * (1 + achievementPoints() * ACH_POINTS_PER) * totalDropMul();
    const whole = Math.floor(gloryRate);
    gloryGain = whole + (Math.random() < (gloryRate - whole) ? 1 : 0);
  }
  if (boss.id !== 'zoe') gloryGain = 0; // 只有佐伊掉落银天之辉
  state.silverGlory += gloryGain;

  // 击败 Boss 获得经验与金币（Hard 为 Normal 的 4 倍；经验受成就/金币经验倍率加成）
  const bossGoldActual = rw.gold;
  const bossExp = rw.exp;
  state.gold += bossGoldActual;
  let bossLeveled = false;
  state.exp += bossExp;
  while (state.level < levelCap() && state.exp >= expNeed(state.level)) {
    state.exp -= expNeed(state.level);
    state.level++;
    invalidateStats();
    bossLeveled = true;
  }
  if (bossLeveled) state.playerHp = playerMaxHp();

  // 首次之后：普通难度 1%、Hard 难度 4% 概率直接掉落宇宙长剑（享受成就 + 金币掉落加成）
  const dropBoost = (1 + achievementPoints() * ACH_POINTS_PER) * totalDropMul();

  // 天司 Boss：首胜必定掉落对应羽毛 ×1；之后 0.5% × 掉率加成
  const td = TENSHI_DUNGEONS.find(d => d.id === boss.id);
  if (td) {
    const firstKill = (state.bossKills[boss.id] || 0) <= 1; // 计数已在本函数开头 +1
    let featherGain = 0;
    if (firstKill) {
      featherGain = 1;
    } else {
      const fr = 0.005 * dropBoost;
      const fw = Math.floor(fr);
      featherGain = fw + (Math.random() < (fr - fw) ? 1 : 0);
    }
    if (featherGain > 0) {
      state[td.featherKey] = (state[td.featherKey] || 0) + featherGain;
      log(`🪶 击败 ${boss.name}，获得 <span class="drop">${td.featherName} ×${featherGain}</span>（当前 ${state[td.featherKey]}）`, 'drop');
      toast(`🪶 获得 ${td.featherName} ×${featherGain}`);
    } else {
      log(`击败了 ${boss.name}，但没有掉落${td.featherName}。`, '');
    }
    if (firstKill) {
      const twName = WEAPON_BY_ID[td.tenshiWeapon].name;
      log(`🏆 首次击败 ${boss.name}！「${twName}」现在可以突破至 Lv.80`, 'drop');
      toast(`🔓 ${twName} 可突破至 Lv.80`);
      unlockAchievement('tenshi_boss_' + td.id);
    }
  }
  const bladeRate = boss.vh ? 0.16 : boss.hard ? 0.04 : 0.01;
  let bladeRes = null;
  // 宇宙长剑只有佐伊掉落
  // 宇宙长剑只有佐伊掉落（按掉率件数计算）
  if (boss.id === 'zoe' && !firstClear) {
    const bladeN = rollDropCount(bladeRate * dropBoost);
    for (let i = 0; i < bladeN; i++) bladeRes = grantMedWingBlade();
  }

  // Very Hard 佐伊独特掉落：苍翠的结晶（基础 0.5% × 掉率加成）
  if (boss.id === 'zoe' && boss.vh) {
    const verdantRate = 0.005 * dropBoost;
    const vw = Math.floor(verdantRate);
    const vc = vw + (Math.random() < (verdantRate - vw) ? 1 : 0);
    if (vc > 0) {
      state.verdantCrystal = (state.verdantCrystal || 0) + vc;
      log(`🌿 击败世界的调停者 佐伊，获得 <span class="drop">苍翠的结晶 ×${vc}</span>（当前 ${state.verdantCrystal}）`, 'drop');
      toast(`🌿 获得苍翠的结晶 ×${vc}`);
    }
  }

  // Very Hard 首胜：解锁成就点金币加成 + 宇宙长剑可突破至 Lv.100
  if (boss.id === 'zoe' && boss.vh && !state.vhCleared) {
    state.vhCleared = true;
    log('🏆 首次击败「世界的调停者 佐伊」！解锁：成就点金币加成（每 5 点 +1% 金币）、宇宙长剑可突破至 Lv.100（宇宙的权能 II）', 'drop');
    toast('🏆 解锁成就点金币加成 + 宇宙长剑 Lv.100 突破');
  }

  const gloryText = gloryGain > 0 ? `、<span class="drop">银天之辉 ×${gloryGain}</span>` : '';
  const gloryToast = gloryGain > 0 ? ` + 银天之辉 ×${gloryGain}` : '';
  if (firstClear) {
    log(`🏆 首次通关副本「<b>${bossLabel(boss)}</b>」！解锁「成就点加成经验获取」，获得经验 +${bossExp}、金币 +${bossGoldActual}${gloryText}`, 'drop');
    toast(`🏆 首次通关 ${bossLabel(boss)}！解锁经验加成 + 金币 ${bossGoldActual}${gloryToast}`);
  } else {
    log(`🏆 战胜「<b>${bossLabel(boss)}</b>」，获得经验 +${bossExp}、金币 +${bossGoldActual}${gloryText}`, 'drop');
    toast(`🏆 战胜 ${bossLabel(boss)}：经验 ${bossExp} + 金币 ${bossGoldActual}${gloryToast}`);
  }
  if (bossLeveled) {
    log(`🆙 升级至 <b>Lv.${state.level}</b>！属性提升`, 'up');
    toast(`🆙 升级至 Lv.${state.level}！`);
  }

  if (bladeRes && !(bladeRes === 'max' && state.hidePointLog)) {
    const owned = state.weapons[MED_WING_BLADE.id];
    const msg = bladeRes === 'new' ? '获得 Lv.1' : (bladeRes === 'up' ? '升级至 Lv.' + owned.level : '已满级，转化为 1000 收藏点');
    log(`✨ 掉落特殊武器 <span class="ssr">宇宙长剑</span>（${msg}）`, 'drop');
    toast(`✨ 掉落 宇宙长剑！${msg}`);
  }

  // 提亚马特：基础 5% × 所有掉落加成，掉落专属 SR 武器（按掉率件数，3 选 1）
  if (boss.id === 'tiamat') {
    const tSrN = rollDropCount(0.05 * (boss.hard ? 4 : 1) * dropBoost);
    for (let i = 0; i < tSrN; i++) {
      const def = TIAMAT_WEAPONS[Math.floor(Math.random() * TIAMAT_WEAPONS.length)];
      const res = addWeapon(def);
      const msg = res.type === 'new' ? '获得 Lv.1' : (res.type === 'up' ? '升级至 Lv.' + res.level : '已满级，转化为 ' + res.points + ' 收藏点');
      if (!(res.type === 'max' && state.hidePointLog)) {
        log(`🌀 击败提亚马特${boss.hard ? '·玛格纳' : ''}，掉落 <span class="sr">[SR] ${def.name}</span>（${msg}）`, 'up');
        toast(`🌀 获得 [SR] ${def.name}！${msg}`);
      }
    }
  }
  // 提亚马特·玛格纳（Hard）：玛格纳 SSR 按掉率件数掉落（0.2% × 加成），每件三选一
  if (boss.id === 'tiamat' && boss.hard) {
    const mN = rollDropCount(0.004 * dropBoost);
    for (let i = 0; i < mN; i++) {
      const mw = MAGNA_WEAPONS[Math.floor(Math.random() * MAGNA_WEAPONS.length)];
      const res = addWeapon(mw);
      const msg = res.type === 'new' ? '获得 Lv.1' : (res.type === 'up' ? '升级至 Lv.' + res.level : '已满级，转化为 ' + res.points + ' 收藏点');
      if (!(res.type === 'max' && state.hidePointLog)) {
        log(`🌪 击败提亚马特·玛格纳，掉落 <span class="ssr">[SSR] ${mw.name}</span>（${msg}）`, 'up');
        toast(`🌪 获得 [SSR] ${mw.name}！${msg}`);
      }
    }
  }

  // 尤格多拉希尔：Normal 5% / Hard ×4，掉落专属 SR 武器（3 选 1）
  if (boss.id === 'yggdrasil') {
    const ySrN = rollDropCount(0.05 * (boss.hard ? 4 : 1) * dropBoost);
    for (let i = 0; i < ySrN; i++) {
      const def = YGG_WEAPONS[Math.floor(Math.random() * YGG_WEAPONS.length)];
      const res = addWeapon(def);
      const msg = res.type === 'new' ? '获得 Lv.1' : (res.type === 'up' ? '升级至 Lv.' + res.level : '已满级，转化为 ' + res.points + ' 收藏点');
      if (!(res.type === 'max' && state.hidePointLog)) {
        log(`🌳 击败尤格多拉希尔，掉落 <span class="sr">[SR] ${def.name}</span>（${msg}）`, 'up');
        toast(`🌳 获得 [SR] ${def.name}！${msg}`);
      }
    }
    // Hard（玛格纳）：SSR 按掉率件数掉落，每件三选一
    if (boss.hard) {
      const mN = rollDropCount(0.004 * dropBoost);
      for (let i = 0; i < mN; i++) {
        const w = YGG_MAGNA_WEAPONS[Math.floor(Math.random() * YGG_MAGNA_WEAPONS.length)];
        const res = addWeapon(w);
        const msg = res.type === 'new' ? '获得 Lv.1' : (res.type === 'up' ? '升级至 Lv.' + res.level : '已满级，转化为 ' + res.points + ' 收藏点');
        if (!(res.type === 'max' && state.hidePointLog)) {
          log(`🌳 击败尤格多拉希尔·玛格纳，掉落 <span class="ssr">[SSR] ${w.name}</span>（${msg}）`, 'up');
          toast(`🌳 获得 [SSR] ${w.name}！${msg}`);
        }
      }
    }
  }

  // 利维坦：Normal 5% / Hard ×4，掉落专属 SR 武器（3 选 1）
  if (boss.id === 'leviathan') {
    const lSrN = rollDropCount(0.05 * (boss.hard ? 4 : 1) * dropBoost);
    for (let i = 0; i < lSrN; i++) {
      const def = LEVI_WEAPONS[Math.floor(Math.random() * LEVI_WEAPONS.length)];
      const res = addWeapon(def);
      const msg = res.type === 'new' ? '获得 Lv.1' : (res.type === 'up' ? '升级至 Lv.' + res.level : '已满级，转化为 ' + res.points + ' 收藏点');
      if (!(res.type === 'max' && state.hidePointLog)) {
        log(`🌊 击败利维坦，掉落 <span class="sr">[SR] ${def.name}</span>（${msg}）`, 'up');
        toast(`🌊 获得 [SR] ${def.name}！${msg}`);
      }
    }
    // Hard（玛格纳）：SSR 按掉率件数掉落，每件三选一
    if (boss.hard) {
      const mN = rollDropCount(0.004 * dropBoost);
      for (let i = 0; i < mN; i++) {
        const w = LEVI_MAGNA_WEAPONS[Math.floor(Math.random() * LEVI_MAGNA_WEAPONS.length)];
        const res = addWeapon(w);
        const msg = res.type === 'new' ? '获得 Lv.1' : (res.type === 'up' ? '升级至 Lv.' + res.level : '已满级，转化为 ' + res.points + ' 收藏点');
        if (!(res.type === 'max' && state.hidePointLog)) {
          log(`🌊 击败利维坦·玛格纳，掉落 <span class="ssr">[SSR] ${w.name}</span>（${msg}）`, 'up');
          toast(`🌊 获得 [SSR] ${w.name}！${msg}`);
        }
      }
    }
  }

  // 科罗萨斯：Normal 5% / Hard ×4，掉落专属 SR 武器（3 选 1）
  if (boss.id === 'colossus') {
    const cSrN = rollDropCount(0.05 * (boss.hard ? 4 : 1) * dropBoost);
    for (let i = 0; i < cSrN; i++) {
      const def = COLO_WEAPONS[Math.floor(Math.random() * COLO_WEAPONS.length)];
      const res = addWeapon(def);
      const msg = res.type === 'new' ? '获得 Lv.1' : (res.type === 'up' ? '升级至 Lv.' + res.level : '已满级，转化为 ' + res.points + ' 收藏点');
      if (!(res.type === 'max' && state.hidePointLog)) {
        log(`🔥 击败科罗萨斯，掉落 <span class="sr">[SR] ${def.name}</span>（${msg}）`, 'up');
        toast(`🔥 获得 [SR] ${def.name}！${msg}`);
      }
    }
    // Hard（玛格纳）：SSR 按掉率件数掉落，每件三选一
    if (boss.hard) {
      const mN = rollDropCount(0.004 * dropBoost);
      for (let i = 0; i < mN; i++) {
        const w = COLO_MAGNA_WEAPONS[Math.floor(Math.random() * COLO_MAGNA_WEAPONS.length)];
        const res = addWeapon(w);
        const msg = res.type === 'new' ? '获得 Lv.1' : (res.type === 'up' ? '升级至 Lv.' + res.level : '已满级，转化为 ' + res.points + ' 收藏点');
        if (!(res.type === 'max' && state.hidePointLog)) {
          log(`🔥 击败科罗萨斯·玛格纳，掉落 <span class="ssr">[SSR] ${w.name}</span>（${msg}）`, 'up');
          toast(`🔥 获得 [SSR] ${w.name}！${msg}`);
        }
      }
    }
  }

  // 修瓦利耶：Normal 5% / Hard ×4，掉落专属 SR 武器（按掉率件数，3 选 1）
  if (boss.id === 'chivalier') {
    const n = rollDropCount(0.05 * (boss.hard ? 4 : 1) * dropBoost);
    for (let i = 0; i < n; i++) {
      const def = CHIV_WEAPONS[Math.floor(Math.random() * CHIV_WEAPONS.length)];
      const res = addWeapon(def);
      const msg = res.type === 'new' ? '获得 Lv.1' : (res.type === 'up' ? '升级至 Lv.' + res.level : '已满级，转化为 ' + res.points + ' 收藏点');
      if (!(res.type === 'max' && state.hidePointLog)) {
        log(`✨ 击败修瓦利耶，掉落 <span class="sr">[SR] ${def.name}</span>（${msg}）`, 'up');
        toast(`✨ 获得 [SR] ${def.name}！${msg}`);
      }
    }
    // Hard（玛格纳）：SSR 按掉率件数掉落（0.2% × 加成），每件三选一
    if (boss.hard) {
      const mN = rollDropCount(0.004 * dropBoost);
      for (let i = 0; i < mN; i++) {
        const w = CHIV_MAGNA_WEAPONS[Math.floor(Math.random() * CHIV_MAGNA_WEAPONS.length)];
        const res = addWeapon(w);
        const msg = res.type === 'new' ? '获得 Lv.1' : (res.type === 'up' ? '升级至 Lv.' + res.level : '已满级，转化为 ' + res.points + ' 收藏点');
        if (!(res.type === 'max' && state.hidePointLog)) {
          log(`✨ 击败修瓦利耶·玛格纳，掉落 <span class="ssr">[SSR] ${w.name}</span>（${msg}）`, 'up');
          toast(`✨ 获得 [SSR] ${w.name}！${msg}`);
        }
      }
    }
  }

  // 塞勒斯特：Normal 5% / Hard ×4，掉落专属 SR 武器（按掉率件数，3 选 1）
  if (boss.id === 'celeste') {
    const n = rollDropCount(0.05 * (boss.hard ? 4 : 1) * dropBoost);
    for (let i = 0; i < n; i++) {
      const def = CELESTE_WEAPONS[Math.floor(Math.random() * CELESTE_WEAPONS.length)];
      const res = addWeapon(def);
      const msg = res.type === 'new' ? '获得 Lv.1' : (res.type === 'up' ? '升级至 Lv.' + res.level : '已满级，转化为 ' + res.points + ' 收藏点');
      if (!(res.type === 'max' && state.hidePointLog)) {
        log(`🌑 击败塞勒斯特，掉落 <span class="sr">[SR] ${def.name}</span>（${msg}）`, 'up');
        toast(`🌑 获得 [SR] ${def.name}！${msg}`);
      }
    }
    // Hard（玛格纳）：SSR 按掉率件数掉落（0.2% × 加成），每件三选一
    if (boss.hard) {
      const mN = rollDropCount(0.004 * dropBoost);
      for (let i = 0; i < mN; i++) {
        const w = CELESTE_MAGNA_WEAPONS[Math.floor(Math.random() * CELESTE_MAGNA_WEAPONS.length)];
        const res = addWeapon(w);
        const msg = res.type === 'new' ? '获得 Lv.1' : (res.type === 'up' ? '升级至 Lv.' + res.level : '已满级，转化为 ' + res.points + ' 收藏点');
        if (!(res.type === 'max' && state.hidePointLog)) {
          log(`🌑 击败塞勒斯特·玛格纳，掉落 <span class="ssr">[SSR] ${w.name}</span>（${msg}）`, 'up');
          toast(`🌑 获得 [SSR] ${w.name}！${msg}`);
        }
      }
    }
  }

  // 原型巴哈姆特：首胜必定掉落巴哈姆特之角 ×1；之后 1% × 掉率加成
  if (boss.id === 'bahamut') {
    const firstHorn = !state.bahamutFirstCleared;
    state.bahamutFirstCleared = true;
    let hornGain = 0;
    if (firstHorn) {
      hornGain = 1;
    } else {
      const hornRate = 0.01 * dropBoost;
      const hornWhole = Math.floor(hornRate);
      hornGain = hornWhole + (Math.random() < (hornRate - hornWhole) ? 1 : 0);
    }
    if (hornGain > 0) {
      state.bahamutHorn = (state.bahamutHorn || 0) + hornGain;
      log(`🐲 击败原型巴哈姆特，获得 <span class="drop">巴哈姆特之角 ×${hornGain}</span>（当前 ${state.bahamutHorn}）`, 'drop');
      toast(`🐲 获得巴哈姆特之角 ×${hornGain}`);
    } else {
      log('击败了原型巴哈姆特，但没有掉落巴哈姆特之角。', '');
    }
    unlockAchievement('bahamut_first');

    // 腐朽武器（材料）：基础 10% × 掉率加成，十种中随机一种
    const relicRate = 0.10 * dropBoost;
    const relicWhole = Math.floor(relicRate);
    const relicCount = relicWhole + (Math.random() < (relicRate - relicWhole) ? 1 : 0);
    for (let i = 0; i < relicCount; i++) {
      const relic = DECAYED_WEAPONS[Math.floor(Math.random() * DECAYED_WEAPONS.length)];
      if (!state.decayedWeapons) state.decayedWeapons = {};
      state.decayedWeapons[relic.id] = (state.decayedWeapons[relic.id] || 0) + 1;
      log(`🗡 从原型巴哈姆特身上拾得材料 <b>${relic.name}</b>（当前 ${state.decayedWeapons[relic.id]}）`, 'drop');
      toast(`🗡 获得材料 ${relic.name}`);
    }
  }

  suppressBossMsgs = false;
  updateAll();
  save();
}

function onDungeonLose() {
  const boss = state.dungeonFight;
  state.dungeonFight = null;
  state.playerHp = playerMaxHp();
  log(`💀 挑战「<b>${bossLabel(boss)}</b>」失败，Boss 太过强大…`, 'death');
  toast(`💀 挑战失败`);
  updateAll();
  save();
}

/* ============ RANK 突破 ============ */
// 当前 RANK 的突破 Boss（首次为巴哈姆特之影，之后逐级增强）
function rankBossDef() {
  if (state.rank === 0) {
    return { name: '巴哈姆特之影', hp: 54000, atk: 1500 };
  }
  if (state.rank === 1) {
    // 被封印的巴哈姆特：按 110 级 + 前九章全武器满级 + 全命运武器校准（该状态约 6 回合险胜）
    return { name: '被封印的巴哈姆特', hp: 200000, atk: 5200 };
  }
  if (state.rank === 2) {
    // RANK 2 → 3：邂逅，黑银之翼（Boss：黑银之翼 巴哈姆特）
    return { name: '黑银之翼 巴哈姆特', task: '邂逅，黑银之翼', hp: 320000, atk: 6200 };
  }
  if (state.rank === 3) {
    // RANK 3 → 4：试炼，四天司（风 → 火 → 水 → 土 连续挑战）
    return {
      name: '四天司连战', task: '试炼，四天司', hp: 0, atk: 0,
      stages: [
        { id: 'raphael', name: '风之天司 拉斐尔', attr: '风', hp: 600000, atk: 10000 },
        { id: 'michael', name: '火之天司 米迦勒', attr: '火', hp: 600000, atk: 10000 },
        { id: 'gabriel', name: '水之天司 加百列', attr: '水', hp: 600000, atk: 10000 },
        { id: 'uriel',   name: '土之天司 乌列尔', attr: '土', hp: 600000, atk: 10000 },
      ],
    };
  }
  const scale = Math.pow(1.15, state.rank - 2);
  return { name: '黑银之翼 巴哈姆特', task: '邂逅，黑银之翼', hp: Math.round(320000 * scale), atk: Math.round(6200 * scale) };
}
function rankReady() {
  if (state.level < levelCap()) return false;
  // RANK 0→1：集齐并满级 1-9 章全部武器；RANK 1→2：集齐所有命运之武器；RANK 2→3：击败原型巴哈姆特；RANK 3→4：宇宙长剑二次突破 + Lv.130
  if (state.rank === 0) return allWeaponsMaxed(ALL_WEAPONS);
  if (state.rank === 1) return Object.keys(state.fates).length >= FATE_WEAPONS.length;
  if (state.rank === 2) return state.bahamutFirstCleared === true || (state.bossKills.bahamut || 0) > 0;
  if (state.rank === 3) {
    const tenshi80 = TENSHI_WEAPONS.every(w => state.weapons[w.id] && state.weapons[w.id].level >= 80);
    return state.medWingAwakened2 === true && tenshi80 && state.level >= 130;
  }
  return false; // 更高 RANK 暂未开放
}
function startRankFight() {
  if (state.rankFight || state.dungeonFight) return;
  if (!rankReady()) return;
  const b = rankBossDef();
  if (b.stages) {
    const s0 = b.stages[0];
    state.rankFight = { name: s0.name, attr: s0.attr, atk: s0.atk, bossHp: s0.hp, bossMaxHp: s0.hp, stages: b.stages, stage: 0, task: b.task };
    log(`⚡ RANK 突破挑战：<b>${b.task}</b>（${b.stages.length} 连战）第 1 场 —— ${s0.name}`, 'area');
    toast(`⚡ ${b.task} · 第 1/${b.stages.length} 场：${s0.name}`);
  } else {
    state.rankFight = { name: b.name, attr: '无', atk: b.atk, bossHp: b.hp, bossMaxHp: b.hp };
    log(`⚡ RANK 突破挑战：<b>${b.name}</b>！`, 'area');
    toast(`⚡ 挑战 ${b.name}`);
  }
  state.playerHp = playerMaxHp();
  updateAll();
  save();
}
function onRankWin() {
  const rf = state.rankFight;
  // 连战：还有下一场 → 推进到下一场，不提升 RANK
  if (rf && rf.stages && rf.stage < rf.stages.length - 1) {
    const next = rf.stages[rf.stage + 1];
    state.rankFight = Object.assign({}, rf, {
      stage: rf.stage + 1, name: next.name, attr: next.attr, atk: next.atk,
      bossHp: next.hp, bossMaxHp: next.hp,
    });
    state.playerHp = playerMaxHp();
    log(`⚡ 第 ${rf.stage + 1}/${rf.stages.length} 场胜利！下一场：<b>${next.name}</b>`, 'drop');
    toast(`⚡ ${rf.stage + 1}/${rf.stages.length} 胜利 → ${next.name}`);
    updateAll();
    save();
    return;
  }
  state.rankFight = null;
  state.rank++;
  invalidateStats();
  state.playerHp = playerMaxHp();
  log(`⚡ RANK 突破成功！当前 <b>RANK ${state.rank}</b>，等级上限提升至 <b>Lv.${levelCap()}</b>`, 'drop');
  toast(`⚡ RANK ${state.rank}！等级上限 Lv.${levelCap()}`);
  updateAll();
  save();
}
function onRankLose() {
  const rf = state.rankFight;
  const nm = rf && rf.stages ? `${rf.name}（连战 ${rf.stage + 1}/${rf.stages.length}）` : rankBossDef().name;
  state.rankFight = null;
  state.playerHp = playerMaxHp();
  log(`💀 RANK 突破失败，${nm}太强大了…`, 'death');
  toast(`💀 RANK 突破失败`);
  updateAll();
  save();
}

function onMonsterKilled() {
  state.kills++;
  // 空岛：按该关怪物 HP 相对 9-10 的比例提升经验/金币（怪物越强，收益越高）
  let goldGain, expGain;
  if (state.islandIdx > 0) {
    const cfg = islandCfg();
    const t = (state.islandIdx - 1) / (cfg.stages - 1);
    const hp = cfg.hp[0] + (cfg.hp[1] - cfg.hp[0]) * t;
    const ratio = hp / MONSTER_SCALE[9].hp[1]; // 以 9-10 怪物 HP 为基准
    goldGain = Math.round((8 + 90 * 3) * ratio);
    expGain = Math.round(monsterExp(90) * ratio);
  } else {
    goldGain = 8 + state.currentIdx * 3;
    expGain = monsterExp(state.currentIdx);
  }
  const goldActual = Math.round(goldGain * goldMul() * achGoldMul());
  state.gold += goldActual;
  state.playerHp = playerMaxHp(); // 胜利回满

  // 获得经验与升级（满级后经验仍继续累积，留给 RANK 突破后使用）
  {
    const expMult = (state.dungeonCleared ? (1 + achievementPoints() * ACH_POINTS_PER) : 1) * expBuyMul();
    state.exp += Math.round(expGain * expMult);
    let leveled = false;
    while (state.level < levelCap() && state.exp >= expNeed(state.level)) {
      state.exp -= expNeed(state.level);
      state.level++;
      invalidateStats();
      leveled = true;
    }
    if (leveled) {
      state.playerHp = playerMaxHp(); // 升级回满
      log(`🆙 升级至 <b>Lv.${state.level}</b>！属性提升`, 'up');
      toast(`🆙 升级至 Lv.${state.level}！`);
    }
  }

  // 解锁进度：只有在最新区域挂机才推进
  let unlocked = false;
  if (state.islandIdx === 0 && state.currentIdx === state.unlockedIdx && state.unlockedIdx < TOTAL_AREAS) {
    state.progressKills++;
    if (state.progressKills >= UNLOCK_KILLS) {
      state.unlockedIdx++;
      state.progressKills = 0;
      unlocked = true;
    }
  }

  // 命运之武器：固定 0.01% 独立掉率，不受成就点 / 金币掉落 / 地图进度等任何加成
  // 第 9 章与空岛可掉落所有尚未获得的命运武器；其余章节掉本章对应那一把
  const chNow = state.islandIdx > 0 ? 9 : idxToArea(state.currentIdx).chapter;
  const fatePool = (chNow === 9)
    ? FATE_WEAPONS.filter(f => !state.fates[f.id])
    : (FATE_BY_CHAPTER[chNow] && !state.fates[FATE_BY_CHAPTER[chNow].id] ? [FATE_BY_CHAPTER[chNow]] : []);
  if (Math.random() < FATE_DROP_RATE) {
    if (fatePool.length) {
      const f = fatePool[Math.floor(Math.random() * fatePool.length)];
      state.fates[f.id] = true;
      invalidateStats();
      state.playerHp = playerMaxHp();
      log(`击败 <b>${state.monster.name}</b>，获得命运之武器 <span class="drop">${f.name}</span>！生命 +${Math.round(f.bonusHp * 100)}% / 攻击 +${Math.round(f.bonusAtk * 100)}%`, 'drop');
      toast(`✨ 获得命运之武器 ${f.name}！+${Math.round(f.bonusHp * 100)}% 生命 / +${Math.round(f.bonusAtk * 100)}% 攻击`);
    } else {
      const p = 1000;
      state.points += p;
      state.everHadPoints = true;
      log(`击败 <b>${state.monster.name}</b>，命运之武器祝福，转化为 <span class="drop">${p} 收藏点</span>`, 'drop');
      toast(`✨ 命运之武器祝福 → +${p} 收藏点`);
    }
  }

  // 普通装备掉落：成就点加成后，掉率 ≥100% 时可能一次掉多件
  const effRate = effectiveDropRate(state.islandIdx > 0 ? 90 : state.currentIdx);
  const whole = Math.floor(effRate);           // 必定掉落件数
  const frac = effRate - whole;                // 余数概率再掉 1 件
  const drops = whole + (Math.random() < frac ? 1 : 0);

  if (drops > 0) {
    for (let i = 0; i < drops; i++) {
      const def = state.islandIdx > 0 ? ALL_R[Math.floor(Math.random() * ALL_R.length)] : rollWeapon();
      const res = addWeapon(def);
      const goldNote = (i === 0) ? `，金币 +${goldActual}` : '';
      if (res.type === 'new') {
        log(`击败 <b>${state.monster.name}</b>，掉落 <span class="drop">[${def.rarity}] ${def.name}</span>${goldNote}`, 'drop');
        toast(`🎁 获得 <span class="t-r">[${def.rarity}] ${def.name}</span>（${def.type}）`);
      } else if (res.type === 'up') {
        log(`击败 <b>${state.monster.name}</b>，<span class="up">[${def.rarity}] ${def.name} 升级至 Lv.${res.level}</span>${goldNote}`, 'up');
        if (state.notifyUpgrade) toast(`⬆️ <span class="t-r">[${def.rarity}] ${def.name}</span> 升级至 Lv.${res.level}`);
      } else {
        // 满级装备转化为收藏点：只记日志，不弹窗
        if (!state.hidePointLog) log(`击败 <b>${state.monster.name}</b>，[${def.rarity}] ${def.name} 已满级，转化为 <span class="drop">${res.points} 收藏点</span>${goldNote}`, 'drop');
      }
    }
  } else {
    log(`击败 <b>${state.monster.name}</b>，未掉落武器，金币 +${goldActual}`, '');
  }

  // SR / SSR 稀有武器掉落（受成就点掉率加成；命运武器除外）
  const areaNow = state.islandIdx > 0 ? { chapter: 9, zone: 10 } : idxToArea(state.currentIdx);
  const achMul = 1 + achievementPoints() * ACH_POINTS_PER;

  // SR（5-9 章）：10% → 40%
  const srRate = srDropRate(areaNow.chapter, areaNow.zone) * achMul * totalDropMul();
  const srN = srRate > 0 ? rollDropCount(srRate) : 0;
  for (let i = 0; i < srN; i++) {
    const pool = srPoolFor(areaNow.chapter);
    if (pool.length) {
      const def = pool[Math.floor(Math.random() * pool.length)];
      const res = addWeapon(def);
      if (res.type === 'new') {
        log(`击败 <b>${state.monster.name}</b>，掉落 <span class="sr">[SR] ${def.name}</span>`, 'up');
        toast(`💎 获得 <span class="t-sr">[SR] ${def.name}</span>（${def.type}）`);
      } else if (res.type === 'up') {
        log(`击败 <b>${state.monster.name}</b>，<span class="sr">[SR] ${def.name} 升级至 Lv.${res.level}</span>`, 'up');
        if (state.notifyUpgrade) toast(`💎 <span class="t-sr">[SR] ${def.name}</span> 升级至 Lv.${res.level}`);
      } else {
        if (!state.hidePointLog) log(`击败 <b>${state.monster.name}</b>，[SR] ${def.name} 已满级，转化为 <span class="drop">${res.points} 收藏点</span>`, 'drop');
      }
    }
  }

  // SSR（第 9 章）：4% → 16%
  const ssrRate = ssrDropRate(areaNow.chapter, areaNow.zone) * achMul * totalDropMul();
  const ssrN = ssrRate > 0 ? rollDropCount(ssrRate) : 0;
  for (let i = 0; i < ssrN; i++) {
    const pool = ssrPoolFor(areaNow.chapter);
    if (pool.length) {
      const def = pool[Math.floor(Math.random() * pool.length)];
      const res = addWeapon(def);
      if (res.type === 'new') {
        log(`击败 <b>${state.monster.name}</b>，掉落 <span class="ssr">[SSR] ${def.name}</span>`, 'up');
        toast(`👑 获得 <span class="t-ssr">[SSR] ${def.name}</span>（${def.type}）`);
      } else if (res.type === 'up') {
        log(`击败 <b>${state.monster.name}</b>，<span class="ssr">[SSR] ${def.name} 升级至 Lv.${res.level}</span>`, 'up');
        if (state.notifyUpgrade) toast(`👑 <span class="t-ssr">[SSR] ${def.name}</span> 升级至 Lv.${res.level}`);
      } else {
        if (!state.hidePointLog) log(`击败 <b>${state.monster.name}</b>，[SSR] ${def.name} 已满级，转化为 <span class="drop">${res.points} 收藏点</span>`, 'drop');
      }
    }
  }

  // 空岛：岚龙的琥珀眼（受成就点/金币掉落加成；>100% 时 floor + 余数，同银天之辉）
  if (state.islandIdx > 0) {
    const cfg = islandCfg();
    // 空岛关卡进度：击败 10 只解锁下一关
    const islandProg = islandProgMap();
    const curStage = state.islandIdx;
    const before = islandProg[curStage] || 0;
    if (before < 10) {
      islandProg[curStage] = before + 1;
      if (islandProg[curStage] >= 10) {
        renderMap(); // 刚好解锁下一关：重建空岛界面
      } else {
        const progEl = document.querySelector('.island-progress b');
        if (progEl) progEl.textContent = islandProg[curStage] + '/10';
      }
    }
    if (state.islandId === 'wind' && state.islandIdx === 5) unlockAchievement('wind_island_clear');
    if (state.islandId === 'earth' && state.islandIdx === 5) unlockAchievement('earth_island_clear');
    if (state.islandId === 'sea' && state.islandIdx === 5) unlockAchievement('sea_island_clear');
    if (state.islandId === 'sun' && state.islandIdx === 5) unlockAchievement('sun_island_clear');
    if (state.islandId === 'light' && state.islandIdx === 5) unlockAchievement('light_island_clear');
    if (state.islandId === 'dark' && state.islandIdx === 5) unlockAchievement('dark_island_clear');
    const matRate = islandAmberRate(state.islandIdx) * (1 + achievementPoints() * ACH_POINTS_PER) * totalDropMul();
    const matWhole = Math.floor(matRate);
    const matCount = matWhole + (Math.random() < (matRate - matWhole) ? 1 : 0);
    if (matCount > 0) {
      state[cfg.materialKey] = (state[cfg.materialKey] || 0) + matCount;
      log(`击败 <b>${state.monster.name}</b>，掉落 <span class="drop">${cfg.material} ×${matCount}</span>`, 'drop');
    }
  }

  if (unlocked) {
    log(`🎉 解锁新区域 <span class="area">${areaLabel(state.unlockedIdx)}</span>！`, 'area');
    toast(`🎉 解锁新区域 ${areaLabel(state.unlockedIdx)}！`);
  }

  // 自动推进：下一张已解锁 → 杀 1 只即进入；未解锁 → 杀满 UNLOCK_KILLS 只后进入
  if (state.islandIdx === 0 && state.autoAdvance && state.currentIdx < TOTAL_AREAS) {
    const nextIdx = state.currentIdx + 1;
    const need = (nextIdx <= state.unlockedIdx) ? 1 : UNLOCK_KILLS;
    state.autoProgress = (state.autoProgress || 0) + 1;
    if (state.autoProgress >= need) {
      state.autoProgress = 0;
      state.currentIdx = nextIdx;
      state.progressKills = 0;
      state.playerHp = playerMaxHp();
      log(`⏩ 自动推进至 <span class="area">${areaLabel(state.currentIdx)}</span>。`, 'area');
      toast(`⏩ 自动推进至 ${areaLabel(state.currentIdx)}`);
      renderMap();
    }
  }

  killSinceAchCheck++;
  if (killSinceAchCheck >= 5) {
    killSinceAchCheck = 0;
    checkAchievements(false);
  }
  if (weaponDirty) {
    weaponDirty = false;
  }
  spawnMonster();
  if (unlocked) renderMap();
  updateHud();
  renderPanels(false);
  save();
}

/* ============ 渲染 ============ */
function updateBattleUI() {
  const maxHp = playerMaxHp();
  const hp = Math.max(0, state.playerHp);
  const bossFight = state.dungeonFight || state.rankFight;
  const roundEl = $('battle-round');
  if (roundEl) {
    const r = bossFight ? (bossFight.round || 0) : (state.monster ? (state.monster.round || 0) : 0);
    roundEl.textContent = `第 ${Math.max(1, r)} 回合`;
  }

  $('bar-player').style.transform = `scaleX(${hp / maxHp})`;
  const atbP = $('atb-player');
  if (atbP) {
    // 副本战用 dungeonFight.playerGauge，地图战用全局 playerGauge
    const pGauge = bossFight ? (bossFight.playerGauge || 0) : playerGauge;
    atbP.style.transform = `scaleX(${Math.min(1, Math.max(0, pGauge))})`;
  }
  $('nums-player').textContent = `❤ ${fmt(hp)} / ${fmt(maxHp)} · ⚔ ${fmt(playerAtk())}`;
  const pa = $('player-attr');
  if (pa) pa.textContent = '属性：' + playerAttr();

  // 副本 / RANK Boss 战
  if (bossFight) {
    $('bar-monster').style.transform = `scaleX(${Math.max(0, bossFight.bossHp) / bossFight.bossMaxHp})`;
    $('monster-name').textContent = bossFight.diff ? `${bossFight.name} （ ${bossFight.diff}）` : bossFight.name;
    const ma = $('monster-attr');
    if (ma) ma.textContent = '属性：' + (bossFight.attr || '无');
    $('nums-monster').textContent = `❤ ${fmt(Math.max(0, bossFight.bossHp))} / ${fmt(bossFight.bossMaxHp)} · ⚔ ${fmt(bossFight.atk)}`;
    const atbB = $('atb-monster');
    if (atbB) atbB.style.transform = `scaleX(${Math.min(1, Math.max(0, bossFight.bossGauge || 0))})`;
    return;
  }

  const m = state.monster;
  if (!m) return;
  $('bar-monster').style.transform = `scaleX(${m.hp / m.maxHp})`;
  $('monster-name').textContent = m.name;
  const ma2 = $('monster-attr');
  if (ma2) ma2.textContent = '属性：' + (m.attr || '无');
  $('nums-monster').textContent = `❤ ${fmt(m.hp)} / ${fmt(m.maxHp)} · ⚔ ${fmt(m.atk)}`;
  const atbM = $('atb-monster');
  if (atbM) atbM.style.transform = `scaleX(${Math.min(1, Math.max(0, m.gauge || 0))})`;
}

function updateHud() {
  const maxHp = playerMaxHp();
  if (state.playerHp > maxHp) state.playerHp = maxHp;

  $('st-area').textContent = areaLabel(state.currentIdx);
  $('st-gold').textContent = fmt(state.gold);
  $('st-points').textContent = fmt(state.points);
  {
    const cap = levelCap();
    const isMax = state.level >= cap;
    const rankTag = state.rank > 0 ? ` · RANK ${state.rank}` : '';
    $('st-level').textContent = `Lv.${state.level}${isMax ? ' MAX' : ''}${rankTag}`;
    const need = expNeed(state.level);
    $('exp-fill').style.transform = `scaleX(${Math.min(1, state.exp / need)})`;
  }
  $('st-atk').textContent = fmt(playerAtk());
  $('st-hp').textContent = fmt(maxHp);
  const eq = equippedDef();
  $('st-equip').textContent = eq ? `${eq.name} Lv.${weaponLevel(eq.id)}` : '—';

  updateBattleUI();
  updateMapHint();
}

// 面板渲染节流：击杀时最多每 250ms 重建一次；force 时立即重建
let lastPanelRender = 0;
let armoryDirty = true; // 武器库需要重建（91 卡，重）
let achDirty = true;    // 成就面板需要重建（100+ 卡，重）
// 属性统计：各属性武器的加成方式与当前数值
function renderStats() {
  const el = $('stats');
  if (!el) return;
  const ATTRS = [['风', '🌀'], ['土', '💠'], ['水', '💧'], ['火', '🔥'], ['光', '✨'], ['暗', '🌑']];
  const bw = backwaterCurve();
  const SQ_LISTS = { '风': MAGNA_WEAPONS, '土': YGG_MAGNA_WEAPONS, '水': LEVI_MAGNA_WEAPONS, '火': COLO_MAGNA_WEAPONS };
  let html = '<div class="stat-grid">';
  for (const [attr, icon] of ATTRS) {
    let sqAtk = 0, sqHp = 0, sqBw = 0;
    if (attr === '风') { const s = magnaSquareBonus(); sqAtk += s.atk; sqHp += s.hp; }
    else if (attr === '土') {
      const s = yggSquareBonus(); sqAtk += s.atk; sqHp += s.hp;
      if (state.weapons['ygg_magna_bow']) sqBw += 1;
    } else if (attr === '水') { const s = leviSquareBonus(); sqAtk += s.atk; sqHp += s.hp; }
    else if (attr === '火') { const s = coloSquareBonus(); sqAtk += s.atk; sqHp += s.hp; }
    const ms = magnaSkillBonusOf(attr);
    sqAtk += ms.sqAtk; sqHp += ms.sqHp; sqBw += ms.sqBw;
    const nmAtk = ms.nmAtk, nmHp = ms.nmHp, nmBw = ms.nmBw;
    const atkMul = (1 + sqAtk) * (1 + bw * sqBw) * (1 + nmAtk) * (1 + bw * nmBw);
    const hpMul = (1 + sqHp) * (1 + nmHp);
    const grp = { atk: [], hp: [], sp: [] };
    const addSrc = (text, g) => grp[g].push(text);
    // 原生方阵武器
    if (SQ_LISTS[attr]) {
      for (const w of SQ_LISTS[attr]) {
        if (!state.weapons[w.id]) continue;
        const k = w.skillType;
        if (k === 'attack') addSrc(`${w.name}：${w.skill}（方阵攻刃 +15%）`, 'atk');
        else if (k === 'guard') addSrc(`${w.name}：${w.skill}（方阵守护 +15%）`, 'hp');
        else if (k === 'backwater') addSrc(`${w.name}：${w.skill}（方阵背水，当前 +${(bw * 100).toFixed(1)}%）`, 'atk');
        else if (k === 'heal') addSrc(`${w.name}：${w.skill}（治愈：水属性武器攻击时回复 1% 最大生命）`, 'sp');
        else if (k === 'kiri') addSrc(`${w.name}：${w.skill}（见切：受击 3% 概率免伤并反击）`, 'sp');
      }
    }
    // 玛格纳 SSR（双技能）
    for (const w of ALL_MAGNA_SSR) {
      if (!state.weapons[w.id]) continue;
      for (const s of w.skills) {
        if (s.target !== attr) continue;
        const tier = /方阵/.test(s.name) ? '方阵' : '普通';
        if (s.kind === 'backwater') addSrc(`${w.name}：${s.name}（${tier}背水，当前 +${(bw * 100).toFixed(1)}%）`, 'atk');
        else if (s.kind === 'kiri') addSrc(`${w.name}：${s.name}（见切：受击 3% 概率免伤并反击）`, 'sp');
        else if (s.kind === 'crit') addSrc(`${w.name}：${s.name}（技巧：攻击 8% 概率暴击，额外 50% 伤害）`, 'sp');
        else if (s.stat === 'atk') addSrc(`${w.name}：${s.name}（${tier}攻刃 +15%）`, 'atk');
        else addSrc(`${w.name}：${s.name}（${tier}守护 +15%）`, 'hp');
      }
    }
    const srcHtml = grp.sp.length ? `<div class="stat-grp"><b>特殊效果</b><br>${grp.sp.join('<br>')}</div>` : '';
    html += `<div class="stat-card">
      <div class="stat-name">${icon} ${attr}属性武器</div>
      <div class="stat-sec">攻击 <b>×${atkMul.toFixed(3)}</b>（+${fmtPct(atkMul - 1)}%）</div>
      <div class="stat-layer">方阵：攻刃 +${(sqAtk * 100).toFixed(0)}%${sqBw ? ` · 背水 ×${sqBw}（当前 +${(bw * 100).toFixed(1)}%）` : ''}</div>
      <div class="stat-layer">普通：攻刃 +${(nmAtk * 100).toFixed(0)}%${nmBw ? ` · 背水 ×${nmBw}（当前 +${(bw * 100).toFixed(1)}%）` : ''}</div>
      <div class="stat-sec">生命 <b>×${hpMul.toFixed(3)}</b>（+${fmtPct(hpMul - 1)}%）</div>
      <div class="stat-layer">方阵：守护 +${(sqHp * 100).toFixed(0)}%</div>
      <div class="stat-layer">普通：守护 +${(nmHp * 100).toFixed(0)}%</div>
      <div class="stat-src stat-list">${srcHtml || '<div class="stat-none">无特殊效果</div>'}</div>
    </div>`;
  }
  html += '</div>';
  // 收益加成
  const ap = achievementPoints();
  const achExp = state.dungeonCleared ? 1 + ap * ACH_POINTS_PER : 1;
  const goldTotal = goldMul() * achGoldMul();
  const expTotal = expBuyMul() * achExp;
  const dropAch = 1 + ap * ACH_POINTS_PER;
  const dropTotal = dropAch * totalDropMul();
  html += `<div class="stat-global">
    <div class="stat-name">💰 收益加成</div>
    <div class="stat-row">金币 <b>×${goldTotal.toFixed(3)}</b>（金币商店 ×${goldMul().toFixed(2)} · 成就点 ×${achGoldMul().toFixed(3)}）</div>
    <div class="stat-row">经验 <b>×${expTotal.toFixed(3)}</b>（金币商店 ×${expBuyMul().toFixed(2)} · 成就点 ×${achExp.toFixed(3)}）</div>
    <div class="stat-row">掉落率 <b>×${dropTotal.toFixed(2)}</b>（成就点 ×${dropAch.toFixed(2)} · 金币商店 ×${dropBuyMul().toFixed(2)} · 收藏点 ×${pointDropMul().toFixed(2)}）</div>
  </div>`;
  // 全局乘区
  const f = fateMult(), lm = levelMul();
  let cosmic = 1;
  if (state.medWingAwakened) {
    cosmic = 1 + 0.001 * Object.keys(state.weapons).length;
    if (state.medWingAwakened2) {
      let mc = 0;
      for (const k in state.weapons) {
        const d = WEAPON_BY_ID[k];
        if (d && state.weapons[k].level >= (d.maxLevel || MAX_LEVEL)) mc++;
      }
      cosmic += 0.001 * mc;
    }
  }
  let dragon = 1;
  for (const bw2 of BAHA_WEAPONS) {
    if (!state.weapons[bw2.id]) continue;
    let cnt = 0;
    for (const wid in state.weapons) {
      const wd = WEAPON_BY_ID[wid];
      if (wd && wd.type === bw2.type) cnt++;
    }
    dragon += 0.002 * cnt;
  }
  html += `<div class="stat-global">
    <div class="stat-name">🌐 全局乘区（对所有武器生效）</div>
    <div class="stat-row">命运武器：攻击 ×${f.atk.toFixed(3)} · 生命 ×${f.hp.toFixed(3)}</div>
    <div class="stat-row">等级：×${lm.toFixed(3)}（Lv.${state.level}）</div>
    <div class="stat-row">宇宙的权能：×${cosmic.toFixed(3)}${state.medWingAwakened ? '' : '（未突破）'}</div>
    <div class="stat-row">创世之龙的加护：生命 ×${dragon.toFixed(3)}</div>
    <div class="stat-row">天司（按敌方属性）：伤害 +${((tenshiDamageMul('风') - 1) * 100).toFixed(0)}%</div>
  </div>`;
  el.innerHTML = html;
}

function renderPanels(force) {
  if (!force) {
    const now = performance.now();
    if (now - lastPanelRender < 400) return;
    lastPanelRender = now;
  } else {
    lastPanelRender = performance.now();
  }
  // 重面板：只在数据变化时重建（避免后期每秒重建上百张卡）
  if (force || armoryDirty) { renderArmory(); updateChapterGlow(); armoryDirty = false; }
  if (force || achDirty) { renderAchievements(); achDirty = false; }
  // 轻面板：每次重建（开销小）
  renderShop();
  renderDungeon();
  renderCoinShop();
  renderMaterialShop();
  renderBag();
  renderRankSection();
  renderStats();
}

function updateAll() {
  updateHud();
  renderPanels(true);
  renderMap(); // 面板强制刷新时同步重建地图，避免地图停留在空白
}

// 收藏点商店：未获得任何命运武器显示「？？？」，获得任意后显示「兑换命运之武器」；点击随机获得一把未获得的
function renderShop() {
  const list = $('shop-list');
  if (!list) return;
  // 首次获得收藏点后才出现
  const panel = $('panel-fateshop');
  const show = state.everHadPoints || state.points > 0;
  if (panel) panel.style.display = show ? '' : 'none';
  if (!show) return;
  const hint = $('shop-hint');
  if (hint) hint.textContent = '满级武器重复获得会转化为收藏点';
  const cost = fateShopCost();
  const buyable = state.points >= cost;
  const anyOwned = Object.keys(state.fates).length > 0;
  const remaining = FATE_WEAPONS.filter(f => !state.fates[f.id]);

  // 金币收益升级条目
  const gCost = goldBoostCost();
  const goldItem = `<div class="shop-item">
    <div class="shop-icon">💰</div>
    <div class="shop-info">
      <div class="shop-name">金币收益 <span class="coin-lv">Lv.${state.goldBoostLevel}</span></div>
      <div class="shop-desc">当前 ×${goldMul().toFixed(2)} · 每级 +5% 金币获取</div>
    </div>
    <button class="gold shop-buy-gold" ${state.points >= gCost ? '' : 'disabled'}>升级 · ${gCost.toLocaleString()}</button>
  </div>`;

  // 掉落几率升级条目（花费与金币收益一致：100 → 400 → 1600 …）
  const dCost = pointDropCost();
  const dropItem = `<div class="shop-item">
    <div class="shop-icon">🎁</div>
    <div class="shop-info">
      <div class="shop-name">掉落几率 <span class="coin-lv">Lv.${state.pointDropLevel}</span></div>
      <div class="shop-desc">当前 ×${pointDropMul().toFixed(2)} · 每级 +5% 掉落几率</div>
    </div>
    <button class="gold shop-buy-drop" ${state.points >= dCost ? '' : 'disabled'}>升级 · ${dCost.toLocaleString()}</button>
  </div>`;

  // 未获得任何命运武器 → 只显示「？？？」；已获得任意 → 显示「兑换命运之武器」
  const fateItem = remaining.length === 0
    ? '<div class="shop-empty">已获得全部命运之武器</div>'
    : `<div class="shop-item">
        <div class="shop-icon">✨</div>
        <div class="shop-info"><div class="shop-name">${anyOwned ? '兑换命运之武器' : '？？？'}</div></div>
        <button class="gold shop-buy" ${buyable ? '' : 'disabled'}>兑换 · ${cost.toLocaleString()}</button>
      </div>`;

  list.innerHTML = fateItem + goldItem + dropItem;
}

function grantFate(f) {
  state.fates[f.id] = true;
  invalidateStats();
  state.playerHp = playerMaxHp();
  log(`在收藏点商店兑换了命运之武器 <span class="drop">${f.name}</span>！生命 +${Math.round(f.bonusHp * 100)}% / 攻击 +${Math.round(f.bonusAtk * 100)}%`, 'drop');
  toast(`✨ 兑换成功：${f.name}！+${Math.round(f.bonusHp * 100)}% 生命 / +${Math.round(f.bonusAtk * 100)}% 攻击`);
}

// 兑换：从未获得的命运武器中随机获得一把
function buyFate() {
  const cost = fateShopCost();
  if (state.points < cost) return;
  const pool = FATE_WEAPONS.filter(f => !state.fates[f.id]);
  if (pool.length === 0) return;
  const f = pool[Math.floor(Math.random() * pool.length)];
  state.points -= cost;
  grantFate(f);
  checkAchievements(false);
  updateAll();
  save(true);
}

// 收藏点商店：升级金币收益
function buyGoldBoost() {
  const cost = goldBoostCost();
  if (state.points < cost) return;
  state.points -= cost;
  state.goldBoostLevel++;
  toast(`💰 金币收益提升至 Lv.${state.goldBoostLevel}（×${goldMul().toFixed(2)}）`);
  renderShop();
  updateHud();
  save(true);
}

// 收藏点商店：升级掉落几率（花费与金币收益一致）
function buyPointDrop() {
  const cost = pointDropCost();
  if (state.points < cost) return;
  state.points -= cost;
  state.pointDropLevel++;
  toast(`🎁 掉落几率提升至 Lv.${state.pointDropLevel}（×${pointDropMul().toFixed(2)}）`);
  renderShop();
  updateHud();
  save(true);
}

// 某章对应的武器池（1-4 章原 R；5-8 章新 R + SR；9 章全部）
function chapterPool(ch) {
  if (ch <= 4) return WEAPONS.filter(w => TYPE_CHAPTER[w.type] === ch);
  if (ch <= 8) {
    const types = ADV_TYPE_BY_CHAPTER[ch] || [];
    return ADV_R.filter(w => types.indexOf(w.type) >= 0)
      .concat(SR_WEAPONS.filter(w => types.indexOf(w.type) >= 0));
  }
  return ALL_WEAPONS; // 第 9 章：全部武器
}
// 该章武器是否全部已收集且满级
function chapterComplete(ch) {
  const pool = chapterPool(ch);
  return pool.length > 0 && pool.every(w => state.weapons[w.id] && state.weapons[w.id].level >= MAX_LEVEL);
}

function renderMapInner() {
  const mapEl = $('map');
  let html = '';
  // 空岛界面
  if (state.islandIdx > 0) {
    const cfg = islandCfg();
    html += `<div class="island-head"><button class="panel-toggle" data-island-back="1">← 返回世界地图</button></div>`;
    html += `<div class="chapter"><div class="chapter-name"><span class="cnum">🏝️ ${cfg.name}</span> <span class="hint">${cfg.attr}属性 · ${cfg.stages} 关 · 掉落与 9-10 一致</span></div><div class="area-grid">`;
    const islandProg = islandProgMap();
    for (let s = 1; s <= cfg.stages; s++) {
      const unlocked = s === 1 || (islandProg[s - 1] || 0) >= 10;
      const cls = 'area' + (state.islandIdx === s ? ' current' : (s < state.islandIdx ? ' cleared' : '')) + (unlocked ? '' : ' locked');
      html += `<button class="${cls}" data-island-stage="${s}" data-island-tip="${s}" ${unlocked ? '' : 'disabled'}>${unlocked ? s : '🔒'}</button>`;
    }
    html += '</div></div>';
    const prog = Math.min(10, islandProg[state.islandIdx] || 0);
    html += `<div class="island-progress">当前第 ${state.islandIdx} 关进度：<b>${prog}/10</b>（满 10 解锁下一关）</div>`;
    mapEl.innerHTML = html;
    chapterGlowState = [];
    updateMapHint();
    return;
  }
  for (let ci = 0; ci < CHAPTERS.length; ci++) {
    const ch = ci + 1;
    const done = chapterComplete(ch);
    const hidden = !!state.hiddenChapters[ch];
    html += `<div class="chapter${done ? ' chapter-complete' : ''}"><div class="chapter-name"><span class="cnum">第${ch}章</span> ${CHAPTERS[ci].name}${done ? ' ✅' : ''}`;
    if (done) html += ` <button class="ch-hide" data-hide-ch="${ch}">${hidden ? '显示' : '隐藏'}</button>`;
    html += `</div>`;
    if (!hidden) {
      html += '<div class="area-grid">';
      for (let z = 0; z < 10; z++) {
        const idx = ci * 10 + z + 1;
        const locked = idx > state.unlockedIdx;
        const current = idx === state.currentIdx;
        const cleared = idx < state.unlockedIdx; // 已解锁且非最新
        let cls = 'area';
        if (locked) cls += ' locked';
        if (current) cls += ' current';
        else if (cleared) cls += ' cleared';
        html += `<button class="${cls}" data-idx="${idx}">${locked ? '🔒' : (z + 1)}</button>`;
      }
      html += '</div>';
    }
    html += '</div>';
  }
  // 空岛入口（RANK 2 解锁）
  if (state.rank >= 2) {
    const earthOk = !!state.tiamatCleared;
    const seaOk = !!state.yggCleared;
    const sunOk = !!state.leviCleared;
    const coloOk = !!state.coloCleared;
    html += `<div class="island-entry">
      <button class="gold" data-island="wind">🏝️ 风之岛</button>
      <button class="gold" data-island="earth" ${earthOk ? '' : 'disabled'}>🏝️ 土之岛${earthOk ? '' : '（击败提亚马特解锁）'}</button>
      <button class="gold" data-island="sea" ${seaOk ? '' : 'disabled'}>🏝️ 水之岛${seaOk ? '' : '（击败尤格多拉希尔解锁）'}</button>
      <button class="gold" data-island="sun" ${sunOk ? '' : 'disabled'}>🏝️ 火之岛${sunOk ? '' : '（击败利维坦解锁）'}</button>
      <button class="gold" data-island="light" ${coloOk ? '' : 'disabled'}>🏝️ 光之岛${coloOk ? '' : '（击败科罗萨斯解锁）'}</button>
      <button class="gold" data-island="dark" ${coloOk ? '' : 'disabled'}>🏝️ 暗之岛${coloOk ? '' : '（击败科罗萨斯解锁）'}</button>
      <span class="hint">掉落与 9-10 一致</span>
    </div>`;
  }
  mapEl.innerHTML = html;
  chapterGlowState = CHAPTERS.map((_, i) => chapterComplete(i + 1));
  updateMapHint();
}

// 渲染兜底：任何异常都不让地图变成空白
function renderMap() {
  try {
    renderMapInner();
  } catch (err) {
    console.error('renderMap error:', err);
    const mapEl = $('map');
    if (!mapEl) return;
    // 强制展开地图面板，避免错误信息被"收起"状态挡住
    const panel = $('panel-map');
    if (panel) panel.classList.remove('collapsed');
    state.collapsed.map = false;
    const toggle = panel && panel.querySelector('[data-collapse="map"]');
    if (toggle) toggle.textContent = '收起';
    mapEl.innerHTML = `<div class="empty" style="grid-column:1/-1;">
      <div>地图渲染出错：${(err && err.message) || err}</div>
      <div style="margin-top:6px;">请按 <b>Ctrl + F5</b> 强制刷新；若仍出现，请把这条信息反馈。</div>
      ${state.islandIdx > 0 ? '<button class="gold" data-island-back="1" style="margin-top:8px;">← 返回世界地图</button>' : ''}
    </div>`;
  }
}

// 章节全收集金色状态自动更新（无需重进地图）
let chapterGlowState = []; // 上一次各章节金色状态（避免重复写 DOM）
function updateChapterGlow() {
  const mapEl = $('map');
  if (!mapEl || state.islandIdx > 0) return;
  const chapters = mapEl.querySelectorAll('.chapter');
  chapters.forEach((el, i) => {
    const done = chapterComplete(i + 1);
    if (chapterGlowState[i] === done) return; // 状态未变，跳过
    chapterGlowState[i] = done;
    el.classList.toggle('chapter-complete', done);
    const nameEl = el.querySelector('.chapter-name');
    if (nameEl) {
      nameEl.innerHTML = `<span class="cnum">第${i + 1}章</span> ${CHAPTERS[i].name}${done ? ' ✅' : ''}`;
    }
  });
}

let lastMapHintText = '';
function updateMapHint() {
  const hint = $('map-hint');
  if (!hint) return;
  let text;
  if (state.islandIdx > 0) {
    const cfg = islandCfg();
    text = `空岛 · ${cfg.name} 第 <b>${state.islandIdx}</b> 关 · ${cfg.attr}属性怪物 · 掉落与 9-10 一致`;
  } else if (state.unlockedIdx >= TOTAL_AREAS) {
    text = `已解锁全部 ${TOTAL_AREAS} 个区域，可自由挂机！`;
  } else {
    text = `当前：<b>${areaLabel(state.currentIdx)}</b> ｜ 在 <b>${areaLabel(state.unlockedIdx)}</b> 击杀进度 <b>${state.progressKills}/${UNLOCK_KILLS}</b>，满即可解锁 <b>${areaLabel(state.unlockedIdx + 1)}</b>`;
  }
  if (text === lastMapHintText && hint.textContent) return; // 内容未变且已写入则不写 DOM
  lastMapHintText = text;
  hint.innerHTML = text;
}

// 武器库筛选：只有拥有对应稀有度武器时才显示该筛选
// 武器属性（未标注视为「无」）
function weaponAttrOf(id) {
  const def = WEAPON_BY_ID[id];
  return (def && def.attr) ? def.attr : '无';
}

// 属性筛选按钮：全部 + 已拥有武器出现的属性
function updateWeaponAttrFilters() {
  const el = $('weapon-attr-filters');
  if (!el) return;
  const attrs = new Set();
  for (const id in state.weapons) attrs.add(weaponAttrOf(id));
  const order = ['无', '风', '土', '水', '火', '光', '暗'];
  const list = order.filter(a => attrs.has(a));
  if (state.weaponAttrFilter !== 'ALL' && !attrs.has(state.weaponAttrFilter)) {
    state.weaponAttrFilter = 'ALL';
  }
  const cur = state.weaponAttrFilter || 'ALL';
  const label = a => a === 'ALL' ? '全部' : (a === '无' ? '无属性' : a);
  el.innerHTML = ['ALL', ...list].map(a =>
    `<button class="filter-btn ${a === cur ? 'active' : ''}" data-attr-filter="${a}">${label(a)}</button>`
  ).join('');
}

function updateWeaponFilters() {
  const has = { R: false, SR: false, SSR: false, UR: Object.keys(state.fates).length > 0 };
  for (const id in state.weapons) {
    const def = WEAPON_BY_ID[id];
    if (def && has[def.rarity] !== undefined) has[def.rarity] = true;
  }
  document.querySelectorAll('#weapon-filters .filter-btn').forEach(btn => {
    const f = btn.dataset.filter;
    if (f === 'ALL') return;
    btn.style.display = has[f] ? '' : 'none';
  });
  // 当前筛选已不可用（如重置后）→ 回退到「全部」
  if (state.weaponFilter !== 'ALL' && !has[state.weaponFilter]) {
    state.weaponFilter = 'ALL';
    document.querySelectorAll('#weapon-filters .filter-btn').forEach(b => b.classList.toggle('active', b.dataset.filter === 'ALL'));
  }
}

function renderArmory() {
  updateWeaponFilters();
  updateWeaponAttrFilters();
  const grid = $('grid');
  const allIds = Object.keys(state.weapons);
  const filter = state.weaponFilter || 'ALL';
  const hasFate = Object.keys(state.fates).length > 0;
  if (allIds.length === 0 && !hasFate) {
    grid.innerHTML = '<div class="empty" style="grid-column:1/-1;">暂无武器，战斗胜利后会掉落武器哦！</div>';
    return;
  }
  const attrFilter = state.weaponAttrFilter || 'ALL';
  const ids = allIds.filter(id => {
    const def = WEAPON_BY_ID[id];
    if (!def) return false;
    if (filter !== 'ALL' && def.rarity !== filter) return false;
    // 命运之武器 / 宇宙长剑（UR）不属于任何属性：只在「全部」下显示
    if (attrFilter !== 'ALL' && (def.rarity === 'UR' || weaponAttrOf(id) !== attrFilter)) return false;
    return true;
  });
  // 预计算总属性，避免排序比较器重复调用 weaponTotalScore
  const scoreCache = new Map();
  for (const id of ids) scoreCache.set(id, weaponTotalScore(WEAPON_BY_ID[id]));
  ids.sort((a, b) => {
    const da = WEAPON_BY_ID[a], db = WEAPON_BY_ID[b];
    // 稀有度从高到低：UR > SSR > SR > R
    const ra = RARITY_SORT[da.rarity] ?? 9;
    const rb = RARITY_SORT[db.rarity] ?? 9;
    if (ra !== rb) return ra - rb;
    // 同稀有度按类型
    if (TYPE_ORDER.indexOf(da.type) !== TYPE_ORDER.indexOf(db.type))
      return TYPE_ORDER.indexOf(da.type) - TYPE_ORDER.indexOf(db.type);
    // 同类型按总属性降序
    return scoreCache.get(b) - scoreCache.get(a);
  });

  // 命运之武器（UR）不属于任何属性：只在属性筛选为「全部」时显示
  let fateCards = '';
  const fateAttrOk = (attrFilter === 'ALL');
  if ((filter === 'ALL' || filter === 'UR') && fateAttrOk) {
    for (const id in state.fates) {
      const f = FATE_BY_ID[id];
      if (!f) continue;
      fateCards += `
        <div class="weapon fate-card">
          <div class="w-top">
            <span class="badge UR">UR</span>
            <span class="w-type">${f.type}</span>
            <span class="w-lv max">命运</span>
          </div>
          <div class="w-name">${f.name}</div>
          <div class="w-stats">
            <span class="a">+${Math.round(f.bonusAtk * 100)}% 攻击</span>
            <span class="h">+${Math.round(f.bonusHp * 100)}% 生命</span>
          </div>
          <div class="w-rank"><span>命运之武器 · 无需装备</span></div>
        </div>`;
    }
  }

  const cards = ids.map(id => {
    const def = WEAPON_BY_ID[id];
    const lv = weaponLevel(id);
    const b = weaponBonus(def);
    const equipped = state.equipped === id;
    const maxLv = def.skill2 ? tenshiMaxLevel(id) : (def.maxLevel || MAX_LEVEL);
    const max = lv >= maxLv;
    const ratio = equipped ? 1 : 0.1;
    // 宇宙长剑满 40 级、未突破：卡片内提供突破入口
    let awaken = '';
    if (id === MED_WING_BLADE.id && lv >= 40 && !state.medWingAwakened) {
      if (state.hardZoeKills > 0) {
        const canPay = state.silverGlory >= 2500 && (state.bahamutHorn || 0) >= 1;
        awaken = `<button class="w-awaken" data-awaken="med" ${canPay ? '' : 'disabled'}>突破 · 2500 银天之辉 + 1 巴哈姆特之角</button>`;
      } else {
        awaken = `<div class="w-awaken-hint">突破需先击败 Hard 难度的调停之翼 佐伊</div>`;
      }
    }
    // 第二次突破：Lv.80 + 击败 Very Hard 佐伊 → Lv.100（宇宙的权能 II）
    if (id === MED_WING_BLADE.id && state.medWingAwakened && !state.medWingAwakened2 && lv >= 80) {
      if (!state.vhCleared) {
        awaken = `<div class="w-awaken-hint">突破需先击败 Very Hard 难度的「世界的调停者 佐伊」</div>`;
      } else {
        const canPay2 = state.silverGlory >= 10000 && (state.verdantCrystal || 0) >= 10;
        awaken = `<button class="w-awaken" data-awaken="med2" ${canPay2 ? '' : 'disabled'}>突破 · 10000 银天之辉 + 10 苍翠的结晶</button>`;
      }
    }
    // 天司武器 Lv.40 未突破：可突破至 80（有 Boss 的需先击败；光/暗武器无需击败）
    if (def.skill2 && !state.tenshiAwakened[id] && lv >= 40) {
      if (def.bossId && (state.bossKills[def.bossId] || 0) < 1) {
        awaken = `<div class="w-awaken-hint">突破需先击败「${def.bossName}」</div>`;
      } else {
        const fKeys = def.featherKeys || (def.featherKey ? [def.featherKey] : []);
        const canPayT = fKeys.every(k => (state[k] || 0) >= 1) && (state[def.costKey] || 0) >= 2000 && (state[def.costCrystal] || 0) >= 400 && (state.silverGlory || 0) >= 1000;
        const fLabel = fKeys.map(k => `${FEATHER_NAMES[k] || k}×1`).join(' + ');
        awaken = `<button class="w-awaken" data-awaken="tenshi" data-id="${id}" ${canPayT ? '' : 'disabled'}>突破 · ${fLabel} + ${def.costName}×2000 + ${def.crystalName}×400 + 银天之辉×1000</button>`;
      }
    }
    // 已解锁的武器技能：卡片内展示，悬停看详情
    let skillLine = '';
    if (id === MED_WING_BLADE.id && state.medWingAwakened) {
      const s = medWingSkillInfo();
      skillLine = `<div class="w-skill">⚡ ${state.medWingAwakened2 ? '宇宙的权能 II' : '宇宙的权能 I'}：全属性 +${(s.bonus * 100).toFixed(1)}%</div>`;
    } else if (def.skillType) {
      skillLine = `<div class="w-skill">⚡ ${def.skill}：${squareSkillInfo(def).desc}</div>`;
    } else if (def.skills) {
      skillLine = `<div class="w-skill">⚡ ${squareSkillInfo(def).desc}</div>`;
    } else if (def.skill) {
      const awokenT = !!state.tenshiAwakened[id];
      const skillNameT = awokenT && def.skill2 ? def.skill2 : def.skill;
      let skillDesc;
      if (def.beats) {
        skillDesc = `对 ${def.beats} 属性敌人伤害 +${awokenT ? 10 : 5}%`;
      } else {
        const bs = bahaSkillInfo(def);
        skillDesc = `生命 +${(bs.bonus * 100).toFixed(1)}%（${bs.count} 把${def.type}）`;
      }
      skillLine = `<div class="w-skill">⚡ ${skillNameT}：${skillDesc}</div>`;
    }
    return `
      <div class="weapon rarity-${def.rarity}${equipped ? ' equipped' : ''}" data-id="${id}">
        <div class="w-top">
          <span class="badge ${def.rarity}">${def.rarity}</span>
          <span class="w-type">${def.type}</span>
          <span class="w-lv ${max ? 'max' : ''}">${max ? 'MAX' : 'Lv.' + lv}</span>
        </div>
        <div class="w-name">${def.name}</div>
        <div class="w-stats">
          <span class="a">⚔ ${fmt1(b.atk * ratio)}</span>
          <span class="h">❤ ${fmt1(b.hp * ratio)}</span>
        </div>
        <div class="w-rank">
          <span>基础 ${def.atk}攻 / ${def.hp}命</span>
          <span class="w-attr">属性：${def.attr || '无'}</span>
          <span class="w-tag ${equipped ? 'eq' : 'off'}">${equipped ? '已装备 100%' : '未装备 10%'}</span>
        </div>
        ${skillLine}${awaken}
      </div>`;
  }).join('');

  if (!fateCards && ids.length === 0) {
    grid.innerHTML = '<div class="empty" style="grid-column:1/-1;">该分类下暂无武器</div>';
    return;
  }
  grid.innerHTML = fateCards + cards;
}

// 解除原型巴哈姆特封印：各消耗 100 个晶之元素
function breakBahamutSeal() {
  if (state.sealBroken) return;
  const costs = [
    ['windCrystal', '风晶之元素'], ['earthCrystal', '土晶之元素'], ['waterCrystal', '水晶之元素'],
    ['fireCrystal', '火晶之元素'], ['lightCrystal', '光晶之元素'], ['darkCrystal', '暗晶之元素'],
  ];
  const need = 100;
  const lack = costs.filter(([k]) => (state[k] || 0) < need);
  if (lack.length) {
    toast(`材料不足：${lack.map(([k, n]) => `${n} ×${need - (state[k] || 0)}`).join('、')}`);
    return;
  }
  costs.forEach(([k]) => { state[k] -= need; });
  state.sealBroken = true;
  log('🔓 六种晶之元素汇聚，<b>原型巴哈姆特的封印已解除</b>！', 'drop');
  toast('🔓 原型巴哈姆特的封印已解除！');
  renderDungeon();
  updateAll();
  save(true);
}

// 副本列表
function renderDungeon() {
  const list = $('dungeon-list');
  if (!list) return;
  // 通关 9-10 后才出现
  const panel = $('panel-dungeon');
  const show = !!state.achievements['clear_9_10'];
  if (panel) panel.style.display = show ? '' : 'none';
  if (!show) return;
  const cleared = state.dungeonCleared;
  const now = Date.now();
  const hardUnlocked = state.rank >= 2;
  // 提亚马特：击败岚龙第 5 关 10 次后出现
  const visibleDungeons = allDungeons().filter(b => {
    if (b.tenshiWeapon) { const tw = state.weapons[b.tenshiWeapon]; return !!(tw && tw.level >= 40); }
    if (b.id === 'tiamat') return (state.islandProgress[5] || 0) >= 10;
    if (b.id === 'yggdrasil') return (((state.earthProgress || {})[5]) || 0) >= 10;
    if (b.id === 'leviathan') return (((state.seaProgress || {})[5]) || 0) >= 10;
    if (b.id === 'colossus') return (((state.sunProgress || {})[5]) || 0) >= 10;
    if (b.id === 'chivalier') return (((state.lightProgress || {})[5]) || 0) >= 10;
    if (b.id === 'celeste') return (((state.darkProgress || {})[5]) || 0) >= 10;
    return true;
  });
  const hiddenKeys = [];
  let html = visibleDungeons.map(b => {
    // 原型巴哈姆特：未解除封印时显示解封入口
    if (b.id === 'bahamut' && !state.sealBroken) {
      const sealList = [
        ['windCrystal', '风晶之元素', '🌀'],
        ['earthCrystal', '土晶之元素', '💠'],
        ['waterCrystal', '水晶之元素', '💧'],
        ['fireCrystal', '火晶之元素', '🔥'],
        ['lightCrystal', '光晶之元素', '✨'],
        ['darkCrystal', '暗晶之元素', '🌑'],
      ];
      const sealNeed = 100;
      const canBreak = sealList.every(([k]) => (state[k] || 0) >= sealNeed);
      const sealText = sealList.map(([k, n, ic]) => {
        const have = state[k] || 0;
        return `<span style="color:${have >= sealNeed ? '#8fbf8f' : '#e57373'}">${ic} ${n} ${fmt(have)}/${sealNeed}</span>`;
      }).join(' · ');
      return `<div class="dungeon-item" data-boss="bahamut">
        <div class="dungeon-icon">🔒</div>
        <div class="dungeon-info">
          <div class="dungeon-name">原型巴哈姆特 <span class="diff-tag active">Normal</span></div>
          <div class="dungeon-desc">🔒 封印中 · 属性 无 · ${(state.bossKills.bahamut || 0) > 0 ? `生命 ${fmt(b.hp)} · 攻击 ${fmt(b.atk)}` : '生命 ??? · 攻击 ???'}</div>
          <div class="dungeon-reward">解除封印需各消耗 ${sealNeed} 个晶之元素：${sealText}</div>
        </div>
        <button class="gold" data-break-seal="1" ${canBreak ? '' : 'disabled'}>解除封印</button>
      </div>`;
    }
    const cooldownLeft = Math.max(0, Math.ceil(((state.bossCooldowns[b.id] || 0) - now) / 1000));
    let tag, btn;
    if (state.dungeonFight) {
      tag = '<span class="dungeon-tag ready">战斗中</span>';
      btn = '<button class="gold" disabled>战斗中</button>';
    } else if (cooldownLeft > 0) {
      tag = `<span class="dungeon-tag locked" data-cd-tag>冷却 ${cooldownLeft}s</span>`;
      btn = `<button class="gold" disabled data-cd-btn>冷却 ${cooldownLeft}s</button>`;
    } else if (state.level < b.reqLevel) {
      tag = `<span class="dungeon-tag locked">需要 Lv.${b.reqLevel}</span>`;
      btn = '<button class="gold" disabled>等级不足</button>';
    } else {
      tag = '<span class="dungeon-tag ready">可挑战</span>';
      btn = `<button class="gold" data-dungeon="${b.id}">挑战</button>`;
    }
    // 未击败：隐藏属性的同时显示首通奖励；击败后显示属性、不显示首通奖励
    const kills = state.bossKills[b.id] || 0;
    const zd = b.id === 'zoe' ? zoeDiff() : 'normal';
    const vhOn = zd === 'vh';
    const hardOn = zd === 'hard';
    const tiamatHardUnlocked = b.id === 'tiamat' && (state.bossKills.raphael || 0) >= 10;
    const tiamatHardOn = b.id === 'tiamat' && !!state.tiamatHard && tiamatHardUnlocked;
    const yggHardUnlocked = b.id === 'yggdrasil' && (state.bossKills.uriel || 0) >= 10;
    const yggHardOn = b.id === 'yggdrasil' && !!state.yggHard && yggHardUnlocked;
    const leviHardUnlocked = b.id === 'leviathan' && (state.bossKills.gabriel || 0) >= 10;
    const leviHardOn = b.id === 'leviathan' && !!state.leviHard && leviHardUnlocked;
    const coloHardUnlocked = b.id === 'colossus' && (state.bossKills.michael || 0) >= 10;
    const coloHardOn = b.id === 'colossus' && !!state.coloHard && coloHardUnlocked;
    const chivHardUnlocked = b.id === 'chivalier' && fourMagnaCleared();
    const chivHardOn = b.id === 'chivalier' && !!state.chivHard && chivHardUnlocked;
    const ceHardUnlocked = b.id === 'celeste' && fourMagnaCleared();
    const ceHardOn = b.id === 'celeste' && !!state.celesteHard && ceHardUnlocked;
    const dispHp = (tiamatHardOn || yggHardOn || leviHardOn || coloHardOn || chivHardOn || ceHardOn) ? b.hardHp : vhOn ? b.vhHp : hardOn ? b.hardHp : b.hp;
    const dispAtk = (tiamatHardOn || yggHardOn || leviHardOn || coloHardOn || chivHardOn || ceHardOn) ? b.hardAtk : vhOn ? b.vhAtk : hardOn ? b.hardAtk : b.atk;
    // 自动挑战按难度独立：各难度需先战胜 10 遍才解锁
    const tiamatHardDiff = b.id === 'tiamat' && tiamatHardOn;
    const yggHardDiff = b.id === 'yggdrasil' && yggHardOn;
    const leviHardDiff = b.id === 'leviathan' && leviHardOn;
    const coloHardDiff = b.id === 'colossus' && coloHardOn;
    const chivHardDiff = b.id === 'chivalier' && chivHardOn;
    const ceHardDiff = b.id === 'celeste' && ceHardOn;
    const autoKey = b.id + (vhOn ? '_vh' : hardOn ? '_hard' : tiamatHardDiff ? '_hard' : yggHardDiff ? '_hard' : leviHardDiff ? '_hard' : coloHardDiff ? '_hard' : chivHardDiff ? '_hard' : ceHardDiff ? '_hard' : '');
    const diffKills = vhOn ? (state.vhZoeKills || 0) : hardOn ? (state.hardZoeKills || 0) : tiamatHardDiff ? (state.tiamatHardKills || 0) : yggHardDiff ? (state.yggHardKills || 0) : leviHardDiff ? (state.leviHardKills || 0) : coloHardDiff ? (state.coloHardKills || 0) : chivHardDiff ? (state.chivHardKills || 0) : ceHardDiff ? (state.celesteHardKills || 0) : kills;
    const autoUnlocked = diffKills >= 10;
    const autoOn = autoUnlocked && !!state.autoBoss[autoKey];
    const sweepUnlocked = diffKills >= 100;
    const sweepOn = sweepUnlocked && !!state.autoSweep[autoKey];
    // 属性始终显示；生命/攻击数值需击败过该 Boss 一次后才显示
    const everBeat = b.id === 'zoe'
      ? ((state.bossKills.zoe || 0) + (state.hardZoeKills || 0) + (state.vhZoeKills || 0)) > 0
      : kills > 0;
    const attrText = `属性 ${b.attr || '无'}`;
    const killTag = everBeat
      ? (diffKills < 10 ? ` · 已击败 ${diffKills} 次` : '') + (autoOn ? ' · ⚡自动挑战' : '')
      : '';
    const desc = everBeat
      ? `生命 ${fmt(dispHp)} · 攻击 ${fmt(dispAtk)} · ${attrText} · ${tag}${killTag}`
      : `${attrText} · 生命 ??? · 攻击 ??? · ${tag}`;
    // 首通奖励提示：未击败该难度时显示，首次击败后消失
    const zoeDiffKillsNow = vhOn ? (state.vhZoeKills || 0) : hardOn ? (state.hardZoeKills || 0) : (state.bossKills.zoe || 0);
    let firstClearHint = '';
    if (b.id === 'zoe' && zoeDiffKillsNow === 0) {
      if (vhOn) firstClearHint = `<div class="dungeon-reward">🎁 首通奖励：解锁成就点金币加成 + 宇宙长剑可突破至 Lv.100</div>`;
      else if (!hardOn) firstClearHint = `<div class="dungeon-reward">🎁 首通奖励：解锁成就点经验加成 + 银天之辉</div>`;
    } else if (b.tenshiWeapon && (state.bossKills[b.id] || 0) === 0) {
      const twName = WEAPON_BY_ID[b.tenshiWeapon].name;
      firstClearHint = `<div class="dungeon-reward">🎁 首通奖励：解锁「${twName}」突破至 Lv.80</div>`;
    } else if (b.id === 'bahamut' && !state.bahamutFirstCleared && (state.bossKills.bahamut || 0) === 0) {
      firstClearHint = `<div class="dungeon-reward">🎁 首通奖励：必定掉落 巴哈姆特之角 ×1</div>`;
    }
    // 天司 Boss：显示专属羽毛掉落（含实际掉率加成后的百分比）
    const featherPct = (0.005 * (1 + achievementPoints() * ACH_POINTS_PER) * totalDropMul() * 100).toFixed(2);
    const tenshiLine = b.tenshiWeapon
      ? `<div class="dungeon-reward">🪶 ${kills > 0 ? `掉落 ${b.featherName} <span class="tip-p">${featherPct}%</span>` : `首次击败必掉 ${b.featherName} ×1（之后 ${featherPct}%）`}</div>`
      : '';
    // 提亚马特 Hard：显示玛格纳掉落说明
    const tiamatHardLine = tiamatHardOn
      ? `<div class="dungeon-reward">🌀 SR 掉率 ×4 · 💠 风晶之元素按掉率数量掉落 · ✨ 玛格纳 SSR 各 0.2%（吃掉率加成）</div>`
      : '';
    // 提亚马特：挑战消耗琥珀眼
    const costLine = b.costAmber
      ? `<div class="dungeon-reward">🌀 消耗 ${b.costAmber} 个岚龙的琥珀眼（当前 ${fmt(state.amberEyes || 0)}）</div>` +
        `<div class="dungeon-reward">💠 必定掉落：风晶之元素 ×1（当前 ${fmt(state.windCrystal || 0)}）</div>`
      : b.costBud
        ? `<div class="dungeon-reward">🌱 消耗 ${b.costBud} 个创树的花蕾（当前 ${fmt(state.earthBud || 0)}）</div>` +
          `<div class="dungeon-reward">💠 必定掉落：土晶之元素 ×1（当前 ${fmt(state.earthCrystal || 0)}）</div>`
        : b.costFan
          ? `<div class="dungeon-reward">🌊 消耗 ${b.costFan} 个海神的扇尾（当前 ${fmt(state.seaFan || 0)}）</div>` +
            `<div class="dungeon-reward">💠 必定掉落：水晶之元素 ×1（当前 ${fmt(state.waterCrystal || 0)}）</div>`
          : b.costSun
            ? `<div class="dungeon-reward">🔥 消耗 ${b.costSun} 个日珥反应炉（当前 ${fmt(state.sunCore || 0)}）</div>` +
              `<div class="dungeon-reward">💠 必定掉落：火晶之元素 ×1（当前 ${fmt(state.fireCrystal || 0)}）</div>`
            : b.costStar
              ? `<div class="dungeon-reward">✨ 消耗 ${b.costStar} 个星星浮游体（当前 ${fmt(state.starPlankton || 0)}）</div>` +
                `<div class="dungeon-reward">💠 必定掉落：光晶之元素 ×1（当前 ${fmt(state.lightCrystal || 0)}）</div>`
              : b.costShard
                ? `<div class="dungeon-reward">🌑 消耗 ${b.costShard} 个黑雾的结晶（当前 ${fmt(state.darkShard || 0)}）</div>` +
                  `<div class="dungeon-reward">💠 必定掉落：暗晶之元素 ×1（当前 ${fmt(state.darkCrystal || 0)}）</div>`
                : '';
    // 难度标签：Hard 解锁后显示 Normal / Hard 可点击切换；未解锁时不显示
    const diffTag = (b.id === 'zoe' && hardUnlocked)
      ? `<span class="diff-tag ${(!hardOn && !vhOn) ? 'active' : ''}" data-zoe-diff="normal">Normal</span>` +
        `<span class="diff-tag ${hardOn ? 'active' : ''}" data-zoe-diff="hard">Hard</span>` +
        (state.level >= 121 ? `<span class="diff-tag ${vhOn ? 'active' : ''}" data-zoe-diff="vh">Very Hard</span>` : '')
      : '';
    // 名称随难度切换：Hard / Very Hard 使用各自名字
    const dispName = b.id === 'zoe' ? (vhOn ? b.vhName : hardOn ? (b.hardName || b.name) : b.name)
      : tiamatHardOn ? (b.hardName || b.name)
      : yggHardOn ? (b.hardName || b.name)
      : leviHardOn ? (b.hardName || b.name)
      : coloHardOn ? (b.hardName || b.name)
      : chivHardOn ? (b.hardName || b.name)
      : ceHardOn ? (b.hardName || b.name) : b.name;
    const tenshiDiffTag = b.tenshiWeapon ? `<span class="diff-tag active">Hard</span>` : '';
    // 提亚马特 Hard：击败风之天司 10 次解锁，可切换 Normal / Hard
    const tiamatDiffTag = tiamatHardUnlocked
      ? `<span class="diff-tag ${!tiamatHardOn ? 'active' : ''}" data-tiamat-diff="normal">Normal</span>` +
        `<span class="diff-tag ${tiamatHardOn ? 'active' : ''}" data-tiamat-diff="hard">Hard</span>`
      : '';
    // 尤格多拉希尔 Hard：击败土之天司 10 次解锁，可切换 Normal / Hard
    const yggDiffTag = yggHardUnlocked
      ? `<span class="diff-tag ${!yggHardOn ? 'active' : ''}" data-ygg-diff="normal">Normal</span>` +
        `<span class="diff-tag ${yggHardOn ? 'active' : ''}" data-ygg-diff="hard">Hard</span>`
      : '';
    // 利维坦 Hard：击败水之天司 10 次解锁，可切换 Normal / Hard
    const leviDiffTag = leviHardUnlocked
      ? `<span class="diff-tag ${!leviHardOn ? 'active' : ''}" data-levi-diff="normal">Normal</span>` +
        `<span class="diff-tag ${leviHardOn ? 'active' : ''}" data-levi-diff="hard">Hard</span>`
      : '';
    // 科罗萨斯 Hard：击败火之天司 10 次解锁，可切换 Normal / Hard
    const coloDiffTag = coloHardUnlocked
      ? `<span class="diff-tag ${!coloHardOn ? 'active' : ''}" data-colo-diff="normal">Normal</span>` +
        `<span class="diff-tag ${coloHardOn ? 'active' : ''}" data-colo-diff="hard">Hard</span>`
      : '';
    // 修瓦利耶 Hard：四属性玛格纳全部击败后解锁
    const chivDiffTag = chivHardUnlocked
      ? `<span class="diff-tag ${!chivHardOn ? 'active' : ''}" data-chiv-diff="normal">Normal</span>` +
        `<span class="diff-tag ${chivHardOn ? 'active' : ''}" data-chiv-diff="hard">Hard</span>`
      : '';
    // 塞勒斯特 Hard：四属性玛格纳全部击败后解锁
    const ceDiffTag = ceHardUnlocked
      ? `<span class="diff-tag ${!ceHardOn ? 'active' : ''}" data-ce-diff="normal">Normal</span>` +
        `<span class="diff-tag ${ceHardOn ? 'active' : ''}" data-ce-diff="hard">Hard</span>`
      : '';
    // 已解锁自动扫荡且勾选隐藏 → 不显示卡片（自动扫荡仍在后台运行）
    if (sweepUnlocked && state.hiddenBosses && state.hiddenBosses[autoKey]) {
      hiddenKeys.push({ key: autoKey, name: dispName + (vhOn ? '（Very Hard）' : hardOn ? '（Hard）' : '') });
      return '';
    }
    return `<div class="dungeon-item" data-boss="${b.id}">
      <div class="dungeon-icon">🐉</div>
      <div class="dungeon-info">
        <div class="dungeon-name">${dispName}${diffTag}${tenshiDiffTag}${tiamatDiffTag}${yggDiffTag}${leviDiffTag}${coloDiffTag}${chivDiffTag}${ceDiffTag}</div>
        <div class="dungeon-desc">${desc}</div>
        ${firstClearHint}
        ${sweepUnlocked
          ? `<label class="dungeon-auto" title="自动扫荡：冷却结束自动获得奖励"><input type="checkbox" data-sweep-boss="${autoKey}" ${sweepOn ? 'checked' : ''}> 自动扫荡</label>` +
            `<label class="dungeon-auto" title="隐藏该 Boss（自动扫荡仍会继续）"><input type="checkbox" data-hide-boss="${autoKey}" ${(state.hiddenBosses || {})[autoKey] ? 'checked' : ''}> 隐藏</label>`
          : `<label class="dungeon-auto" title="${autoUnlocked ? '自动挑战' : `需在该难度战胜 10 遍后才解锁（${diffKills}/10）`}"><input type="checkbox" data-auto-boss="${autoKey}" ${autoOn ? 'checked' : ''} ${autoUnlocked ? '' : 'disabled'}> 自动挑战${autoUnlocked ? '' : `（${diffKills}/10）`}</label>` +
            `<label class="dungeon-auto" title="累计击败 100 次后解锁，届时将替代自动挑战"><input type="checkbox" disabled> 自动扫荡（${Math.min(100, diffKills)}/100）</label>`}
        <label class="dungeon-auto" title="关闭该 Boss 的通关奖励提示（单独设置）"><input type="checkbox" data-boss-msg="${b.id}" ${(state.hiddenBossMsgs || {})[b.id] ? 'checked' : ''}> 关通知</label>
      </div>
      ${btn}
    </div>`;
  }).join('');
  if (hiddenKeys.length) {
    html += `<div class="dungeon-hidden">🙈 已隐藏：${hiddenKeys.map(h => `<span>${h.name} <button class="link-btn" data-show-boss="${h.key}">显示</button></span>`).join('')}</div>`;
  }
  list.innerHTML = html;
}

// RANK 突破区块（等级达到 100 级后出现）
function renderRankSection() {
  const el = $('rank-section');
  if (!el) return;
  // 现阶段最高开放到 RANK 4：RANK 4 及以上的升阶挑战暂不显示
  if (state.rank >= 4) { el.innerHTML = ''; return; }
  // 只有当前等级达到上限（可突破）时才显示；战胜后上限提升，需重新练满才会再次出现
  if (state.level < levelCap()) { el.innerHTML = ''; return; }
  const cap = levelCap();
  const ready = rankReady();
  const b = rankBossDef();
  let status, btn;
  if (state.rankFight) {
    const rf = state.rankFight;
    status = rf.stages ? `连战 ${rf.stage + 1}/${rf.stages.length} · ${rf.name}` : '战斗中';
    btn = '<button class="gold" disabled>战斗中</button>';
  } else if (!ready) {
    const needDesc = state.rank === 0 ? '需集齐并满级 1-9 章全部武器'
      : state.rank === 1 ? '需集齐所有命运之武器'
      : state.rank === 2 ? '需击败原型巴哈姆特'
      : '需完成宇宙长剑第二次突破 + 天司武器全部 Lv.80';
    status = state.level < cap ? `需要 Lv.${cap}` : needDesc;
    btn = '<button class="gold" disabled>条件未满足</button>';
  } else {
    status = '可挑战';
    btn = '<button class="gold" data-rank="1">突破</button>';
  }
  const condDesc = state.rank === 0 ? '1-9 章全部武器满级'
    : state.rank === 1 ? '集齐所有命运之武器'
    : state.rank === 2 ? '击败原型巴哈姆特'
    : '宇宙长剑第二次突破（Lv.80 → 100）+ 天司武器全部达到 Lv.80';
  const descHtml = b.stages
    ? `四天司连战（风 → 火 → 水 → 土）· 每场 生命 ${fmt(b.stages[0].hp)} · 攻击 ${fmt(b.stages[0].atk)} · ${status}`
    : `属性 无 · 生命 ${fmt(b.hp)} · 攻击 ${fmt(b.atk)} · ${status}`;
  el.innerHTML = `<div class="dungeon-item rank-item">
    <div class="dungeon-icon">⚡</div>
    <div class="dungeon-info">
      <div class="dungeon-name">${b.task ? b.task + ' · ' : ''}${b.name} <span class="dungeon-rank">RANK ${state.rank} → ${state.rank + 1}</span></div>
      <div class="dungeon-desc">${descHtml}</div>
      <div class="dungeon-reward">突破条件：Lv.${cap} 满级 + ${condDesc} → 等级上限提升至 Lv.${cap + 10}</div>
    </div>
    ${btn}
  </div>`;
}

// 金币商店：经验倍率 / 掉落几率（永久，每级 +5%，花费指数增长）
function renderCoinShop() {
  const list = $('coin-shop');
  if (!list) return;
  // 通关 4-10（解锁 5-1）后才出现
  const panel = $('panel-coin');
  const show = state.unlockedIdx >= 41;
  if (panel) panel.style.display = show ? '' : 'none';
  if (!show) return;
  const items = [
    { key:'exp', name:'经验倍率', icon:'📈', level: state.expBuyLevel, max: EXP_BUY_MAX_LEVEL, mul: expBuyMul(), cost: expBuyCost() },
    { key:'drop', name:'掉落几率', icon:'🎁', level: state.dropBuyLevel, max: DROP_BUY_MAX_LEVEL, mul: dropBuyMul(), cost: dropBuyCost() },
  ];
  list.innerHTML = items.map(it => {
    const isMax = it.level >= it.max;
    const btn = isMax
      ? '<button class="gold" disabled>已满级</button>'
      : `<button class="gold" data-coinshop="${it.key}" ${state.gold >= it.cost ? '' : 'disabled'}>升级 · ${it.cost.toLocaleString()}</button>`;
    return `<div class="shop-item">
      <div class="shop-icon">${it.icon}</div>
      <div class="shop-info">
        <div class="shop-name">${it.name} <span class="coin-lv">Lv.${it.level}/${it.max}</span></div>
        <div class="shop-desc">当前倍率 ×${it.mul.toFixed(2)} · 每级 +5% · 与成就/副本加成乘算</div>
      </div>
      ${btn}
    </div>`;
  }).join('');
}

function buyCoinUpgrade(key) {
  if (key === 'exp') {
    if (state.expBuyLevel >= EXP_BUY_MAX_LEVEL) return;
    const cost = expBuyCost();
    if (state.gold < cost) return;
    state.gold -= cost;
    state.expBuyLevel++;
    toast(`📈 经验倍率提升至 Lv.${state.expBuyLevel}（×${expBuyMul().toFixed(2)}）`);
  } else if (key === 'drop') {
    if (state.dropBuyLevel >= DROP_BUY_MAX_LEVEL) return;
    const cost = dropBuyCost();
    if (state.gold < cost) return;
    state.gold -= cost;
    state.dropBuyLevel++;
    toast(`🎁 掉落几率提升至 Lv.${state.dropBuyLevel}（×${dropBuyMul().toFixed(2)}）`);
  } else {
    return;
  }
  updateAll();
  save(true);
}

// 材料商店：用银天之辉兑换 / 升级宇宙长剑
function exchangeMedWing() {
  const owned = state.weapons[MED_WING_BLADE.id];
  if (owned && owned.level >= MED_WING_BLADE.maxLevel) {
    toast(state.medWingAwakened ? `宇宙长剑已达 Lv.${MED_WING_BLADE.maxLevel} 上限` : '宇宙长剑已满级，可在下方「突破」提升上限');
    return;
  }
  if (state.silverGlory < 100) return;
  state.silverGlory -= 100;
  invalidateStats(); // 宇宙长剑获得/升级后需要重算属性缓存
  if (!owned) {
    state.weapons[MED_WING_BLADE.id] = { level: 1 };
    log(`在材料商店兑换了 <span class="ssr">宇宙长剑</span>（已放入武器库，Lv.1，消耗银天之辉 ×100）`, 'drop');
    toast(`✨ 获得 宇宙长剑 Lv.1（已放入武器库）`);
  } else {
    owned.level++;
    log(`在材料商店将 <span class="ssr">宇宙长剑</span> 升级至 Lv.${owned.level}（消耗银天之辉 ×100）`, 'drop');
    toast(`✨ 宇宙长剑 升级至 Lv.${owned.level}`);
  }
  updateAll();
  save(true);
}

// 宇宙长剑突破：满 40 级 + 击败过 Hard 佐伊 + 2500 银天之辉 + 1 巴哈姆特之角 → 上限 80，解锁「宇宙的权能 I」
function awakenMedWing() {
  const owned = state.weapons[MED_WING_BLADE.id];
  if (!owned || owned.level < 40) { toast('宇宙长剑需先升级至 Lv.40'); return; }
  if (!(state.hardZoeKills > 0)) { toast('需先击败 Hard 难度的「调停之翼 佐伊」'); return; }
  if (state.medWingAwakened) return;
  if (state.silverGlory < 2500) { toast(`银天之辉不足（需要 2500，当前 ${state.silverGlory}）`); return; }
  if ((state.bahamutHorn || 0) < 1) { toast('缺少巴哈姆特之角（击败原型巴哈姆特或 RANK Boss 获得）'); return; }
  state.silverGlory -= 2500;
  state.bahamutHorn -= 1;
  state.medWingAwakened = true;
  invalidateStats();
  log(`⚡ 宇宙长剑突破成功！等级上限提升至 <b>Lv.80</b>，获得永续技能「宇宙的权能 I」（每拥有一把武器全属性 +0.1%）`, 'drop');
  toast(`⚡ 宇宙长剑突破！上限 Lv.80 · 解锁「宇宙的权能 I」`);
  updateAll();
  save(true);
}

// 天司武器突破：Lv.40 + 击败对应天司 Boss + 羽毛 ×1 + 空岛材料 ×2000 + 晶之元素 ×400 + 银天之辉 ×1000 → 上限 80
function awakenTenshiWeapon(id) {
  const def = WEAPON_BY_ID[id];
  const owned = state.weapons[id];
  if (!def || !owned || !def.skill2 || state.tenshiAwakened[id]) return;
  if (owned.level < tenshiMaxLevel(id)) { toast('需先升至 Lv.40'); return; }
  // 有对应天司 Boss 的武器：需先击败；无 Boss 的光/暗武器：无需击败
  if (def.bossId && (state.bossKills[def.bossId] || 0) < 1) { toast(`需先击败「${def.bossName}」`); return; }
  const featherNeeds = def.featherKeys || (def.featherKey ? [def.featherKey] : []);
  const costs = featherNeeds.map(k => [k, 1]).concat([[def.costKey, 2000], [def.costCrystal, 400], ['silverGlory', 1000]]);
  for (const [k, n] of costs) {
    if ((state[k] || 0) < n) { toast('突破材料不足'); return; }
  }
  for (const [k, n] of costs) state[k] -= n;
  state.tenshiAwakened[id] = true;
  owned.level = Math.max(owned.level, 41); // 突破后 40 → 41，上限 80
  invalidateStats();
  armoryDirty = true;
  log(`🔓 ${def.name} 突破成功！等级上限提升至 <b>Lv.80</b>，技能升级为「${def.skill2}」（对 ${def.beats} 属性敌人伤害 +10%）`, 'drop');
  toast(`🔓 ${def.name} 突破至 Lv.80`);
  updateAll();
  save(true);
}

// 宇宙长剑技能信息（卡片 / 悬停提示使用）
function medWingSkillInfo() {
  const n = Object.keys(state.weapons).length;
  let maxCount = 0;
  for (const k in state.weapons) {
    const d = WEAPON_BY_ID[k];
    if (d && state.weapons[k].level >= (d.maxLevel || MAX_LEVEL)) maxCount++;
  }
  // 权能 I：0.1% × 武器数；权能 II：再加 0.1% × MAX 武器数（加算）
  const bonus = 0.001 * n + (state.medWingAwakened2 ? 0.001 * maxCount : 0);
  return { n, maxCount, bonus };
}

// 宇宙长剑第二次突破：Lv.80 + 击败 Very Hard 佐伊 + 10000 银天之辉 + 10 苍翠的结晶 → 上限 120，权能 II
function awakenMedWing2() {
  const owned = state.weapons[MED_WING_BLADE.id];
  if (!owned || owned.level < 80) { toast('宇宙长剑需先升至 Lv.80'); return; }
  if (!state.medWingAwakened) { toast('需先完成第一次突破（40 → 80）'); return; }
  if (state.medWingAwakened2) return;
  if (!state.vhCleared) { toast('需先击败 Very Hard 难度的「世界的调停者 佐伊」'); return; }
  if (state.silverGlory < 10000) { toast(`银天之辉不足（需要 10000，当前 ${state.silverGlory}）`); return; }
  if ((state.verdantCrystal || 0) < 10) { toast('缺少苍翠的结晶（需要 10）'); return; }
  state.silverGlory -= 10000;
  state.verdantCrystal -= 10;
  state.medWingAwakened2 = true;
  invalidateStats();
  log('⚡ 宇宙长剑第二次突破成功！等级上限提升至 <b>Lv.100</b>，技能升级为「宇宙的权能 II」（每拥有一把 MAX 武器额外 +0.1% 全属性）', 'drop');
  toast('⚡ 宇宙长剑突破！上限 Lv.100 · 解锁「宇宙的权能 II」');
  updateAll();
  save(true);
}

// 升级已制作的天司武器：空岛材料 ×25 + 晶之元素 ×5 + 银天之辉 ×10
function upgradeCraftWeapon(id) {
  const def = WEAPON_BY_ID[id];
  const owned = state.weapons[id];
  if (!def || !owned || state.rank < 3) return;
  const maxLv = def.skill2 ? tenshiMaxLevel(id) : def.maxLevel;
  if (owned.level >= maxLv) { toast('该武器已满级'); return; }
  // 天司武器突破后（40 → 80）升级材料更高
  const costs = (def.skill2 && state.tenshiAwakened[id])
    ? [[def.costKey, 50], [def.costCrystal, 10], ['silverGlory', 20]]
    : [[def.costKey, 25], [def.costCrystal, 5], ['silverGlory', 10]];
  for (const [k, n] of costs) {
    if ((state[k] || 0) < n) { toast('材料不足，无法升级'); return; }
  }
  for (const [k, n] of costs) state[k] -= n;
  owned.level++;
  invalidateStats();
  armoryDirty = true;
  log(`⚒ ${def.name} 升级至 Lv.${owned.level}`, 'up');
  toast(`⚒ ${def.name} → Lv.${owned.level}`);
  updateAll();
  save(true);
}

// 巴哈姆特武器：任一腐朽武器达到 40 解锁制作（解锁后永久开放）
function canCraftBaha() {
  if (state.bahaUnlocked) return true;
  const ok = Object.values(state.decayedWeapons || {}).some(v => (v || 0) >= 40);
  if (ok) { state.bahaUnlocked = true; save(true); }
  return ok;
}

// 制作巴哈姆特武器：对应腐朽武器 ×40 + 巴哈姆特之角 ×5
function craftBahaWeapon(id) {
  const def = WEAPON_BY_ID[id];
  if (!def || !def.decayedKey || state.rank < 3) return;
  if (!canCraftBaha()) { toast('需要任一腐朽武器达到 40 才能解锁'); return; }
  if (state.weapons[id]) { toast('已制作过该武器'); return; }
  if (!state.decayedWeapons) state.decayedWeapons = {};
  const haveD = state.decayedWeapons[def.decayedKey] || 0;
  const haveH = state.bahamutHorn || 0;
  if (haveD < 40 || haveH < 5) { toast(`材料不足：${def.decayedName} ×40 + 巴哈姆特之角 ×5`); return; }
  state.decayedWeapons[def.decayedKey] -= 40;
  state.bahamutHorn -= 5;
  state.weapons[id] = { level: 1 };
  invalidateStats();
  armoryDirty = true;
  log(`🐲 制作完成：<span class="sr">[SR] ${def.name}</span>（Lv.1 · 技能「${def.skill}」）`, 'drop');
  toast(`🐲 制作完成：${def.name}`);
  // 成就：制作任意一把 / 集齐十把巴哈姆特武器
  const bahaOwned = BAHA_WEAPONS.filter(w => state.weapons[w.id]).length;
  if (bahaOwned >= 1) unlockAchievement('baha_first');
  if (bahaOwned >= 10) unlockAchievement('baha_all');
  updateAll();
  save(true);
}

// 升级巴哈姆特武器：对应腐朽武器 ×2 + 巴哈姆特之角 ×1
function upgradeBahaWeapon(id) {
  const def = WEAPON_BY_ID[id];
  const owned = state.weapons[id];
  if (!def || !owned || state.rank < 3) return;
  if (owned.level >= def.maxLevel) { toast('该武器已满级'); return; }
  if (!state.decayedWeapons) state.decayedWeapons = {};
  const haveD = state.decayedWeapons[def.decayedKey] || 0;
  const haveH = state.bahamutHorn || 0;
  if (haveD < 2 || haveH < 1) { toast(`材料不足：${def.decayedName} ×2 + 巴哈姆特之角 ×1`); return; }
  state.decayedWeapons[def.decayedKey] -= 2;
  state.bahamutHorn -= 1;
  owned.level++;
  invalidateStats();
  armoryDirty = true;
  log(`🐲 ${def.name} 升级至 Lv.${owned.level}`, 'up');
  toast(`🐲 ${def.name} → Lv.${owned.level}`);
  updateAll();
  save(true);
}

let craftTab = 'tenshi'; // 材料商店制作栏当前分类

// 制作天司武器：空岛材料 ×1000 + 对应晶之元素 ×200 + 银天之辉 ×500
function craftWeapon(id) {
  const def = WEAPON_BY_ID[id];
  if (!def || !def.costKey || state.rank < 3) return;
  if (state.weapons[id]) { toast('已制作过该武器'); return; }
  const costs = [[def.costKey, 1000], [def.costCrystal, 200], ['silverGlory', 500]];
  for (const [k, n] of costs) {
    if ((state[k] || 0) < n) { toast(`材料不足：${k === 'silverGlory' ? '银天之辉' : (k === def.costKey ? def.costName : def.crystalName)} 还需 ${n - (state[k] || 0)}`); return; }
  }
  for (const [k, n] of costs) state[k] -= n;
  state.weapons[id] = { level: 1 };
  invalidateStats();
  armoryDirty = true;
  log(`⚒ 制作完成：<span class="sr">[SR] ${def.name}</span>（Lv.1 · 技能「${def.skill}」）`, 'drop');
  toast(`⚒ 制作完成：${def.name}`);
  // 成就：制作任意一把 / 集齐六把天司武器
  const ownedTenshi = TENSHI_WEAPONS.filter(w => state.weapons[w.id]).length;
  if (ownedTenshi >= 1) unlockAchievement('tenshi_first');
  if (ownedTenshi >= 6) unlockAchievement('tenshi_all');
  updateAll();
  save(true);
}

function renderMaterialShop() {
  const list = $('material-shop');
  if (!list) return;
  // 通关 9-10 后才出现
  const panel = $('panel-material');
  const show = !!state.achievements['clear_9_10'];
  if (panel) panel.style.display = show ? '' : 'none';
  if (!show) return;
  const owned = state.weapons[MED_WING_BLADE.id];
  let info, btn;
  if (owned && owned.level >= MED_WING_BLADE.maxLevel) {
    if (!state.medWingAwakened) {
      const canAwaken = state.hardZoeKills > 0;
      info = `<div class="shop-name">宇宙长剑 <span class="badge SSR">SSR</span> <span class="coin-lv">Lv.${MED_WING_BLADE.maxLevel} MAX</span></div>
        <div class="shop-desc">已满 40 级，${canAwaken ? '可突破上限至 80 级' : '需击败 Hard 难度的「调停之翼 佐伊」后才能突破'}</div>`;
      btn = `<button class="gold" disabled>突破请前往武器库</button>`;
    } else {
      info = `<div class="shop-name">宇宙长剑 <span class="badge SSR">SSR</span> <span class="coin-lv">Lv.${MED_WING_BLADE.maxLevel} MAX</span></div>
        <div class="shop-desc">已突破，达到等级上限</div>`;
      btn = `<button class="gold" disabled>已满级</button>`;
    }
  } else {
    const lvDesc = owned
      ? `当前 Lv.${owned.level} → 兑换后 Lv.${owned.level + 1}`
      : '兑换后放入武器库（Lv.1）';
    info = `<div class="shop-name">宇宙长剑 <span class="badge SSR">SSR</span>${owned ? ` <span class="coin-lv">Lv.${owned.level}</span>` : ''}</div>
      <div class="shop-desc">${lvDesc} · 每级 +1% 基础属性 · 上限 Lv.${MED_WING_BLADE.maxLevel}</div>`;
    btn = `<button class="gold" data-material="med" ${state.silverGlory >= 100 ? '' : 'disabled'}>兑换 · 100 银天之辉</button>`;
  }
  let craftHtml = '';
  if (state.rank >= 3) {
    const tabBtn = (id, label) => `<button class="filter-btn ${craftTab === id ? 'active' : ''}" data-craft-tab="${id}">${label}</button>`;
    let body = '';
    if (craftTab === 'bahamut') {
      const maxDecayed = Math.max(0, ...Object.values(state.decayedWeapons || {}).map(v => v || 0));
      if (!canCraftBaha()) {
        body = `<div class="shop-desc">🔒 未解锁：任一腐朽武器达到 40 后开放（当前最高 ${maxDecayed}/40）</div>`;
      } else {
        body = BAHA_WEAPONS.map(w => {
          const ownedW = state.weapons[w.id];
          const haveD = (state.decayedWeapons || {})[w.decayedKey] || 0;
          const haveH = state.bahamutHorn || 0;
          if (!ownedW) {
            const enough = haveD >= 40 && haveH >= 5;
            return `<div class="craft-row">
              <div class="craft-info">
                <div class="shop-name">${w.name} <span class="badge SR">SR</span> <span class="w-attr">属性：无</span></div>
                <div class="shop-desc">${w.type} · 基础 ${w.atk}攻/${w.hp}命 · 满级 ${w.maxLevel} · 技能「${w.skill}」：每拥有一把${w.type}类型武器，生命 +0.2%</div>
                <div class="craft-cost">${w.decayedName} ${fmt(haveD)}/40 · 巴哈姆特之角 ${fmt(haveH)}/5</div>
              </div>
              <button class="gold" data-baha-craft="${w.id}" ${enough ? '' : 'disabled'}>制作</button>
            </div>`;
          }
          const maxed = ownedW.level >= w.maxLevel;
          const enoughUp = haveD >= 2 && haveH >= 1;
          const act = maxed
            ? `<span class="craft-done">Lv.${ownedW.level} / ${w.maxLevel} 已满级</span>`
            : `<button class="gold" data-baha-upgrade="${w.id}" ${enoughUp ? '' : 'disabled'}>升级 · ${ownedW.level} → ${ownedW.level + 1}</button>`;
          return `<div class="craft-row">
            <div class="craft-info">
              <div class="shop-name">${w.name} <span class="badge SR">SR</span> <span class="w-attr">属性：无</span> <span class="coin-lv">Lv.${ownedW.level}/${w.maxLevel}</span></div>
              <div class="shop-desc">${w.type} · 基础 ${w.atk}攻/${w.hp}命 · 技能「${w.skill}」：每拥有一把${w.type}类型武器，生命 +0.2%</div>
              <div class="craft-cost">升级：${w.decayedName} ${fmt(haveD)}/2 · 巴哈姆特之角 ${fmt(haveH)}/1</div>
            </div>
            ${act}
          </div>`;
        }).join('');
      }
    } else {
      body = TENSHI_WEAPONS.map(w => {
        const ownedW = state.weapons[w.id];
        const have1 = state[w.costKey] || 0, have2 = state[w.costCrystal] || 0, have3 = state.silverGlory || 0;
        const awoken = !!state.tenshiAwakened[w.id];
        const maxLv = tenshiMaxLevel(w.id);
        const skillName = awoken ? w.skill2 : w.skill;
        const skillPct = awoken ? 10 : 5;
        if (!ownedW) {
          // 未制作：显示制作需求
          const enough = have1 >= 1000 && have2 >= 200 && have3 >= 500;
          return `<div class="craft-row">
            <div class="craft-info">
              <div class="shop-name">${w.name} <span class="badge SR">SR</span> <span class="w-attr">属性：${w.attr}</span></div>
              <div class="shop-desc">${w.type} · 基础 ${w.atk}攻/${w.hp}命 · 满级 ${w.maxLevel} · 技能「${w.skill}」：对 ${w.beats} 属性敌人伤害 +5%</div>
              <div class="craft-cost">${w.costName} ${fmt(have1)}/1000 · ${w.crystalName} ${fmt(have2)}/200 · 银天之辉 ${fmt(have3)}/500</div>
            </div>
            <button class="gold" data-craft-weapon="${w.id}" ${enough ? '' : 'disabled'}>制作</button>
          </div>`;
        }
        // 已制作：显示等级 + 升级（40 级前 25/5/10；突破后 40→80 为 50/10/20）
        const maxed = ownedW.level >= maxLv;
        const high = ownedW.level >= 40;
        const up1 = high ? 50 : 25, up2 = high ? 10 : 5, up3 = high ? 20 : 10;
        const enoughUp = have1 >= up1 && have2 >= up2 && have3 >= up3;
        const act = maxed
          ? `<span class="craft-done">Lv.${ownedW.level} / ${maxLv} 已满级</span>`
          : `<button class="gold" data-craft-upgrade="${w.id}" ${enoughUp ? '' : 'disabled'}>升级 · ${ownedW.level} → ${ownedW.level + 1}</button>`;
        return `<div class="craft-row">
          <div class="craft-info">
            <div class="shop-name">${w.name} <span class="badge SR">SR</span> <span class="w-attr">属性：${w.attr}</span> <span class="coin-lv">Lv.${ownedW.level}/${maxLv}</span></div>
            <div class="shop-desc">${w.type} · 基础 ${w.atk}攻/${w.hp}命 · 技能「${skillName}」：对 ${w.beats} 属性敌人伤害 +${skillPct}%</div>
            <div class="craft-cost">升级：${w.costName} ${fmt(have1)}/${up1} · ${w.crystalName} ${fmt(have2)}/${up2} · 银天之辉 ${fmt(have3)}/${up3}</div>
          </div>
          ${act}
        </div>`;
      }).join('');
    }
    craftHtml = `<div class="shop-item">
      <div class="shop-icon">⚒</div>
      <div class="shop-info">
        <div class="shop-name">武器制作 <span class="coin-lv">RANK 3</span></div>
        <div class="craft-tabs">${tabBtn('tenshi', '天司武器')}${tabBtn('bahamut', '巴哈姆特武器')}</div>
        <div class="craft-list">${body}</div>
      </div>
    </div>`;
  }
  list.innerHTML = `<div class="shop-item">
    <div class="shop-icon">⚔️</div>
    <div class="shop-info">${info}</div>
    ${btn}
  </div>` + craftHtml;
}

// 背包：所有材料一览
function renderBag() {
  const panel = $('panel-bag');
  const wrap = document.querySelector('.app-side-left');
  const keys = ['amberEyes', 'earthBud', 'seaFan', 'sunCore', 'starPlankton', 'darkShard', 'windCrystal', 'earthCrystal', 'waterCrystal', 'fireCrystal', 'lightCrystal', 'darkCrystal', 'silverGlory', 'bahamutHorn', 'verdantCrystal', 'fireFeather', 'waterFeather', 'earthFeather', 'windFeather'];
  // 解锁材料后（任意材料 > 0）才显示背包
  const hasAny = keys.some(k => (state[k] || 0) > 0) || Object.values(state.decayedWeapons || {}).some(v => v > 0);
  if (wrap) wrap.style.display = hasAny ? '' : 'none';
  if (panel) panel.style.display = hasAny ? '' : 'none';
  if (!hasAny) return;
  const el = $('bag');
  if (!el) return;
  const groups = [
    { title: '空岛材料', items: [
      { icon: '🌀', name: '岚龙的琥珀眼', key: 'amberEyes' },
      { icon: '🌱', name: '创树的花蕾', key: 'earthBud' },
      { icon: '🌊', name: '海神的扇尾', key: 'seaFan' },
      { icon: '🔥', name: '日珥反应炉', key: 'sunCore' },
      { icon: '✨', name: '星星浮游体', key: 'starPlankton' },
      { icon: '🌑', name: '黑雾的结晶', key: 'darkShard' },
    ] },
    { title: '晶之元素', items: [
      { icon: '🌀', name: '风晶之元素', key: 'windCrystal' },
      { icon: '💠', name: '土晶之元素', key: 'earthCrystal' },
      { icon: '💧', name: '水晶之元素', key: 'waterCrystal' },
      { icon: '🔥', name: '火晶之元素', key: 'fireCrystal' },
      { icon: '✨', name: '光晶之元素', key: 'lightCrystal' },
      { icon: '🌑', name: '暗晶之元素', key: 'darkCrystal' },
    ] },
    { title: '其他材料', items: [
      { icon: '🌟', name: '银天之辉', key: 'silverGlory' },
      { icon: '🐲', name: '巴哈姆特之角', key: 'bahamutHorn' },
      { icon: '🌿', name: '苍翠的结晶', key: 'verdantCrystal' },
    ] },
    { title: '天司羽毛', items: [
      { icon: '🪶', name: '火之羽毛', key: 'fireFeather' },
      { icon: '🪶', name: '水之羽毛', key: 'waterFeather' },
      { icon: '🪶', name: '土之羽毛', key: 'earthFeather' },
      { icon: '🪶', name: '风之羽毛', key: 'windFeather' },
    ] },
    { title: '腐朽武器（材料）', items: DECAYED_WEAPONS.map(r => ({ icon: r.icon, name: r.name, key: null, id: r.id })) },
  ];
  let html = '';
  for (const g of groups) {
    html += `<div class="bag-group">${g.title}</div>`;
    for (const it of g.items) {
      const n = it.key ? (state[it.key] || 0) : ((state.decayedWeapons || {})[it.id] || 0);
      html += `<div class="bag-item"><span class="bag-icon">${it.icon}</span><span class="bag-name">${it.name}</span><span class="bag-n">×${fmt(n)}</span></div>`;
    }
  }
  el.innerHTML = html;
}

/* ============ 日志 / 提示 ============ */
const logbox = $('logbox');
// 日志批量刷新（120ms 内合并，减少高频 DOM 操作）
let logQueue = [];
let logFlushTimer = null;
let suppressBossMsgs = false; // Boss 通关通知静音（总开关或单 Boss）
function log(html, cls) {
  if (suppressBossMsgs) return;
  logQueue.push({ html, cls });
  if (!logFlushTimer) {
    logFlushTimer = setTimeout(() => {
      logFlushTimer = null;
      if (!logQueue.length) return;
      const frag = document.createDocumentFragment();
      for (let i = logQueue.length - 1; i >= 0; i--) {
        const it = logQueue[i];
        const li = document.createElement('li');
        if (it.cls) li.className = it.cls;
        li.innerHTML = it.html;
        frag.appendChild(li);
      }
      logQueue = [];
      logbox.prepend(frag);
      while (logbox.children.length > 30) logbox.removeChild(logbox.lastChild);
    }, 200);
  }
}
function toast(html) {
  if (suppressBossMsgs) return;
  const box = $('toasts');
  while (box.children.length >= 5) box.removeChild(box.firstChild);
  const t = document.createElement('div');
  t.className = 'toast';
  t.innerHTML = html;
  box.appendChild(t);
  setTimeout(() => t.classList.add('fade'), 2200);
  setTimeout(() => t.remove(), 2700);
}

/* ============ 成就 ============ */
function unlockAchievement(id, silent) {
  if (state.achievements[id]) return;
  const a = ACHIEVEMENTS.find(x => x.id === id);
  if (!a) return;
  state.achievements[id] = true;
  achDirty = true;
  log(`🏆 成就达成：<b>${a.name}</b>（成就点 +${a.points || 1}）`, 'up');
  if (!silent) toast(`🏆 成就达成：${a.name}`);
  renderAchievements();
  achDirty = false;
  save();
}

// 条件式检测所有成就（每次击杀后 / 读档后调用；silent 用于读档补触发不弹窗）
// 某章（1-4）武器是否都已满级
function chapterWeaponsMaxed(ch) {
  const pool = WEAPONS.filter(w => TYPE_CHAPTER[w.type] === ch);
  return pool.length > 0 && pool.every(w => state.weapons[w.id] && state.weapons[w.id].level >= MAX_LEVEL);
}
// 第 5-8 章武器（新增 R + SR）是否全部满级
function advChapterWeaponsMaxed(ch) {
  const types = ADV_TYPE_BY_CHAPTER[ch] || [];
  const pool = ADV_R.filter(w => types.indexOf(w.type) >= 0)
    .concat(SR_WEAPONS.filter(w => types.indexOf(w.type) >= 0));
  return pool.length > 0 && pool.every(w => state.weapons[w.id] && state.weapons[w.id].level >= MAX_LEVEL);
}
// 某个武器池是否全部已获得且满级
function allWeaponsMaxed(pool) {
  return pool.length > 0 && pool.every(w => state.weapons[w.id] && state.weapons[w.id].level >= MAX_LEVEL);
}

function checkAchievements(silent) {
  if (state.kills >= 1) unlockAchievement('first_kill', silent);
  if (Object.keys(state.weapons).length > 1) unlockAchievement('first_weapon', silent);
  if (Object.keys(state.weapons).some(id => state.weapons[id].level >= MAX_LEVEL)) unlockAchievement('first_max', silent);
  // 各稀有度武器成就
  const ids = Object.keys(state.weapons);
  const rIds = ids.filter(id => WEAPON_BY_ID[id] && WEAPON_BY_ID[id].rarity === 'R');
  const srIds = ids.filter(id => WEAPON_BY_ID[id] && WEAPON_BY_ID[id].rarity === 'SR');
  const ssrIds = ids.filter(id => WEAPON_BY_ID[id] && WEAPON_BY_ID[id].rarity === 'SSR');
  if (rIds.length > 0) unlockAchievement('first_r_weapon', silent);
  if (rIds.some(id => state.weapons[id].level >= MAX_LEVEL)) unlockAchievement('first_r_max', silent);
  if (srIds.length > 0) unlockAchievement('first_sr_weapon', silent);
  if (srIds.some(id => state.weapons[id].level >= MAX_LEVEL)) unlockAchievement('first_sr_max', silent);
  if (ssrIds.length > 0) unlockAchievement('first_ssr_weapon', silent);
  if (ssrIds.some(id => state.weapons[id].level >= MAX_LEVEL)) unlockAchievement('first_ssr_max', silent);
  // 集齐并升满
  if (allWeaponsMaxed(ALL_R)) unlockAchievement('all_r_max', silent);
  if (allWeaponsMaxed(SR_WEAPONS)) unlockAchievement('all_sr_max', silent);
  if (allWeaponsMaxed(SSR_WEAPONS)) unlockAchievement('all_ssr_max', silent);
  // 完成以上三个集齐成就后，额外获得「兵器宗师」
  if (state.achievements['all_r_max'] && state.achievements['all_sr_max'] && state.achievements['all_ssr_max'])
    unlockAchievement('all_master', silent);
  // 第 1-4 章武器全部满级
  for (let ch = 1; ch <= 4; ch++) {
    if (chapterWeaponsMaxed(ch)) unlockAchievement('max_ch' + ch, silent);
  }
  // 第 5-8 章武器全部满级
  for (let ch = 5; ch <= 8; ch++) {
    if (advChapterWeaponsMaxed(ch)) unlockAchievement('max_ch' + ch, silent);
  }
  // 每把命运武器各一个成就
  for (const f of FATE_WEAPONS) {
    if (state.fates[f.id]) unlockAchievement('fateown_' + f.id, silent);
  }
  // 完成章节
  const area = idxToArea(state.currentIdx);
  if (area.zone === 10) unlockAchievement('clear_' + area.chapter + '_10', silent);
  if (state.unlockedIdx >= 11) unlockAchievement('clear_1_10', silent);
  if (state.unlockedIdx >= 21) unlockAchievement('clear_2_10', silent);
  if (state.unlockedIdx >= 31) unlockAchievement('clear_3_10', silent);
  if (state.unlockedIdx >= 41) unlockAchievement('clear_4_10', silent);
  if (state.unlockedIdx >= 51) unlockAchievement('clear_5_10', silent);
  if (state.unlockedIdx >= 61) unlockAchievement('clear_6_10', silent);
  if (state.unlockedIdx >= 71) unlockAchievement('clear_7_10', silent);
  if (state.unlockedIdx >= 81) unlockAchievement('clear_8_10', silent);
  // 副本 Boss 成就
  if (state.dungeonCleared) unlockAchievement('zoe_first', silent);
  if (state.hardZoeKills > 0) unlockAchievement('zoe_hard_first', silent);
  if (state.vhCleared || (state.vhZoeKills || 0) > 0) unlockAchievement('zoe_vh_first', silent);
  if (state.rank >= 1) unlockAchievement('rank_1', silent);
  if (state.rank >= 2) unlockAchievement('rank_2', silent);
  if (state.rank >= 3) unlockAchievement('rank_3', silent);
  if (state.weapons[MED_WING_BLADE.id] && state.weapons[MED_WING_BLADE.id].level >= 40)
    unlockAchievement('med_wing_max', silent);
  if (state.weapons[MED_WING_BLADE.id] && state.weapons[MED_WING_BLADE.id].level >= 80)
    unlockAchievement('med_wing_80', silent);
  // 原型巴哈姆特（兼容更新前已击败）
  if (state.bahamutFirstCleared || (state.bossKills.bahamut || 0) > 0)
    unlockAchievement('bahamut_first', silent);
  // 空岛通关：第 5 关累计击败 10 只（兼容更新前已通关）
  const islandClearPairs = [
    [state.islandProgress, 'wind_island_clear'],
    [state.earthProgress, 'earth_island_clear'],
    [state.seaProgress, 'sea_island_clear'],
    [state.sunProgress, 'sun_island_clear'],
    [state.lightProgress, 'light_island_clear'],
    [state.darkProgress, 'dark_island_clear'],
  ];
  for (const [prog, achId] of islandClearPairs) {
    if (((prog || {})[5] || 0) >= 10) unlockAchievement(achId, silent);
  }
  // 空岛 Boss（兼容更新前已击败）
  if ((state.bossKills.tiamat || 0) > 0 || state.tiamatCleared) unlockAchievement('tiamat_first', silent);
  if ((state.tiamatHardKills || 0) > 0) unlockAchievement('tiamat_hard_first', silent);
  if ((state.bossKills.yggdrasil || 0) > 0 || state.yggCleared) unlockAchievement('ygg_first', silent);
  if ((state.yggHardKills || 0) > 0) unlockAchievement('ygg_hard_first', silent);
  if ((state.bossKills.leviathan || 0) > 0 || state.leviCleared) unlockAchievement('levi_first', silent);
  if ((state.leviHardKills || 0) > 0) unlockAchievement('levi_hard_first', silent);
  if ((state.bossKills.colossus || 0) > 0 || state.coloCleared) unlockAchievement('colo_first', silent);
  if ((state.coloHardKills || 0) > 0) unlockAchievement('colo_hard_first', silent);
  if ((state.bossKills.chivalier || 0) > 0 || state.chivCleared) unlockAchievement('chiv_first', silent);
  if ((state.chivHardKills || 0) > 0) unlockAchievement('chiv_hard_first', silent);
  if ((state.bossKills.celeste || 0) > 0 || state.celesteCleared) unlockAchievement('celeste_first', silent);
  if ((state.celesteHardKills || 0) > 0) unlockAchievement('celeste_hard_first', silent);
  // 天司武器：武器库里有一把就解锁（兼容更新前已制作）
  const tenshiOwned = TENSHI_WEAPONS.filter(w => state.weapons[w.id]).length;
  if (tenshiOwned >= 1) unlockAchievement('tenshi_first', silent);
  if (tenshiOwned >= 6) unlockAchievement('tenshi_all', silent);
  // 巴哈姆特武器（兼容更新前已制作）
  const bahaOwned = BAHA_WEAPONS.filter(w => state.weapons[w.id]).length;
  if (bahaOwned >= 1) unlockAchievement('baha_first', silent);
  if (bahaOwned >= 10) unlockAchievement('baha_all', silent);
  // 天司 Boss 击败（兼容更新前已击败）
  for (const d of TENSHI_DUNGEONS) {
    if ((state.bossKills[d.id] || 0) > 0) unlockAchievement('tenshi_boss_' + d.id, silent);
  }
}

function renderAchievements() {
  const grid = $('ach-grid');
  if (!grid) return;
  const pts = achievementPoints();
  const dungeonBonus = state.dungeonCleared ? ' · 副本经验加成 已解锁（每点 +1% 经验）' : ' · 副本经验加成 未解锁';
  $('ach-points').textContent = `成就点 ${pts} · 掉率 +${pts}%${dungeonBonus}`;
  grid.innerHTML = ACHIEVEMENTS
    .filter(a => !(a.invisible && !state.achievements[a.id])) // 隐藏型成就：未解锁前完全不在界面显示
    .filter(a => !(state.hideAchievements && state.achievements[a.id]))
    .sort((a, b) => (a.points || 1) - (b.points || 1)) // 按成就点从少到多排序
    .map(a => {
    const done = !!state.achievements[a.id];
    const pts = a.points || 1;
    let name = a.name, desc = a.desc;
    if (a.hidden && !done) { name = '？？？'; desc = '第一次获得？？？'; }
    return `<div class="ach ${done ? 'done' : ''}">
      <div class="ach-icon">${done ? '🏆' : '🔒'}</div>
      <div class="ach-info"><div class="ach-name">${name}${pts > 1 ? ` <span class="ach-pts">+${pts}</span>` : ''}</div><div class="ach-desc">${desc}</div></div>
      <div class="ach-state">${done ? '✓' : ''}</div>
    </div>`;
  }).join('');
}

/* ============ 存档 ============ */
// 组装存档数据（localStorage 保存与导出文件共用）
function buildSaveData() {
  return {
    currentIdx: state.currentIdx, unlockedIdx: state.unlockedIdx,
    progressKills: state.progressKills, kills: state.kills, gold: state.gold,
    level: state.level, exp: state.exp,
    points: state.points, fates: state.fates,
    dungeonCleared: state.dungeonCleared,
    expBuyLevel: state.expBuyLevel, dropBuyLevel: state.dropBuyLevel,
    silverGlory: state.silverGlory,
    bahamutHorn: state.bahamutHorn,
    bahamutFirstCleared: state.bahamutFirstCleared,
    sealBroken: state.sealBroken,
    decayedWeapons: state.decayedWeapons,
    bahaUnlocked: state.bahaUnlocked,
    tiamatHard: state.tiamatHard,
    tiamatHardKills: state.tiamatHardKills,
    yggHard: state.yggHard,
    yggHardKills: state.yggHardKills,
    leviHard: state.leviHard,
    leviHardKills: state.leviHardKills,
    coloHard: state.coloHard,
    coloHardKills: state.coloHardKills,
    chivHard: state.chivHard,
    chivHardKills: state.chivHardKills,
    celesteHard: state.celesteHard,
    celesteHardKills: state.celesteHardKills,
    tenshiAwakened: state.tenshiAwakened,
    fireFeather: state.fireFeather, waterFeather: state.waterFeather, earthFeather: state.earthFeather,
    windFeather: state.windFeather, lightFeather: state.lightFeather, darkFeather: state.darkFeather,
    medWingAwakened: state.medWingAwakened,
    medWingAwakened2: state.medWingAwakened2,
    vhCleared: state.vhCleared,
    verdantCrystal: state.verdantCrystal,
    hardZoeKills: state.hardZoeKills,
    bossCooldowns: state.bossCooldowns,
    rank: state.rank,
    goldBoostLevel: state.goldBoostLevel, pointDropLevel: state.pointDropLevel,
    everHadPoints: state.everHadPoints,
    bossKills: state.bossKills,
    achievements: state.achievements,
    equipped: state.equipped,
    weaponFilter: state.weaponFilter, weaponAttrFilter: state.weaponAttrFilter, notifyUpgrade: state.notifyUpgrade, hidePointLog: state.hidePointLog, autoAdvance: state.autoAdvance, hideAchievements: state.hideAchievements, autoBoss: state.autoBoss, autoSweep: state.autoSweep, hiddenBosses: state.hiddenBosses, hideBossReward: state.hideBossReward, hiddenBossMsgs: state.hiddenBossMsgs, zoeHard: state.zoeHard, zoeVH: state.zoeVH, vhZoeKills: state.vhZoeKills, collapsed: state.collapsed,
    islandIdx: state.islandIdx, islandId: state.islandId, hiddenChapters: state.hiddenChapters, amberEyes: state.amberEyes, islandProgress: state.islandProgress, earthProgress: state.earthProgress, seaProgress: state.seaProgress, sunProgress: state.sunProgress, lightProgress: state.lightProgress, darkProgress: state.darkProgress, earthBud: state.earthBud, seaFan: state.seaFan, sunCore: state.sunCore, starPlankton: state.starPlankton, darkShard: state.darkShard, windCrystal: state.windCrystal, earthCrystal: state.earthCrystal, waterCrystal: state.waterCrystal, fireCrystal: state.fireCrystal, lightCrystal: state.lightCrystal, darkCrystal: state.darkCrystal, tiamatCleared: state.tiamatCleared, yggCleared: state.yggCleared, leviCleared: state.leviCleared, coloCleared: state.coloCleared,
    weapons: state.weapons,
  };
}
let lastSaveAt = 0;
function save(force) {
  // 节流：非强制保存时 2 秒内最多写一次（localStorage 是同步阻塞 I/O）
  const now = Date.now();
  if (!force && now - lastSaveAt < 2000) return;
  lastSaveAt = now;
  try { localStorage.setItem(SAVE_KEY, JSON.stringify(buildSaveData())); } catch (e) {}
}
// 把存档对象应用到 state（读档与导入文件共用）
function applySaveData(d) {
  state.currentIdx = Math.min(Math.max(d.currentIdx || 1, 1), TOTAL_AREAS);
  state.unlockedIdx = Math.min(Math.max(d.unlockedIdx || 1, 1), TOTAL_AREAS);
  state.progressKills = d.progressKills || 0;
  state.kills = d.kills || 0;
  state.rank = d.rank || 0;
  state.goldBoostLevel = d.goldBoostLevel || 0;
  state.pointDropLevel = d.pointDropLevel || 0;
  state.everHadPoints = d.everHadPoints === true || (d.points || 0) > 0;
  state.bossKills = (d.bossKills && typeof d.bossKills === 'object') ? d.bossKills : {};
  state.rankFight = null;
  state.dungeonFight = null;
  state.level = Math.min(levelCap(), Math.max(1, d.level || 1));
  state.exp = d.exp || 0;
  state.gold = d.gold || 0;
  state.points = d.points || 0;
  state.fates = (d.fates && typeof d.fates === 'object') ? d.fates : {};
  // 兼容旧存档：旧版单把 fateOwned=true 视为已获得「命运之锋」（剑）
  if (d.fateOwned === true && !Object.keys(state.fates).length) state.fates['fate_edge'] = true;
  state.achievements = (d.achievements && typeof d.achievements === 'object') ? d.achievements : {};
  state.dungeonCleared = d.dungeonCleared === true;
  state.expBuyLevel = d.expBuyLevel || 0;
  state.dropBuyLevel = d.dropBuyLevel || 0;
  state.silverGlory = d.silverGlory || 0;
  state.bahamutHorn = d.bahamutHorn || 0;
  state.bahamutFirstCleared = d.bahamutFirstCleared === true;
  state.sealBroken = d.sealBroken === true;
  state.decayedWeapons = (d.decayedWeapons && typeof d.decayedWeapons === 'object') ? d.decayedWeapons : {};
  state.bahaUnlocked = d.bahaUnlocked === true;
  state.tiamatHard = d.tiamatHard === true;
  state.tiamatHardKills = d.tiamatHardKills || 0;
  state.yggHard = d.yggHard === true;
  state.yggHardKills = d.yggHardKills || 0;
  state.leviHard = d.leviHard === true;
  state.leviHardKills = d.leviHardKills || 0;
  state.coloHard = d.coloHard === true;
  state.coloHardKills = d.coloHardKills || 0;
  state.chivHard = d.chivHard === true;
  state.chivHardKills = d.chivHardKills || 0;
  state.celesteHard = d.celesteHard === true;
  state.celesteHardKills = d.celesteHardKills || 0;
  state.tenshiAwakened = (d.tenshiAwakened && typeof d.tenshiAwakened === 'object') ? d.tenshiAwakened : {};
  state.fireFeather = d.fireFeather || 0;
  state.waterFeather = d.waterFeather || 0;
  state.earthFeather = d.earthFeather || 0;
  state.windFeather = d.windFeather || 0;
  state.lightFeather = d.lightFeather || 0;
  state.darkFeather = d.darkFeather || 0;
  state.medWingAwakened = d.medWingAwakened === true;
  state.medWingAwakened2 = d.medWingAwakened2 === true;
  state.vhCleared = d.vhCleared === true;
  state.verdantCrystal = d.verdantCrystal || 0;
  state.hardZoeKills = d.hardZoeKills || 0;
  state.bossCooldowns = (d.bossCooldowns && typeof d.bossCooldowns === 'object') ? d.bossCooldowns : {};
  // 兼容旧存档：旧的全局冷却迁移给佐伊
  if (d.dungeonCooldownUntil > 0 && !state.bossCooldowns.zoe) state.bossCooldowns = { zoe: d.dungeonCooldownUntil };
  // 清理已不存在于成就表的旧 id（例如旧版 first_fate）
  const validAch = new Set(ACHIEVEMENTS.map(a => a.id));
  for (const id in state.achievements) if (!validAch.has(id)) delete state.achievements[id];
  state.equipped = d.equipped || null;
  state.weaponFilter = d.weaponFilter || 'ALL';
  state.weaponAttrFilter = d.weaponAttrFilter || 'ALL';
  state.notifyUpgrade = d.notifyUpgrade !== false;
  state.hidePointLog = d.hidePointLog === true;
  state.hideAchievements = d.hideAchievements === true;
  state.autoBoss = (d.autoBoss && typeof d.autoBoss === 'object') ? d.autoBoss : {};
  state.autoSweep = (d.autoSweep && typeof d.autoSweep === 'object') ? d.autoSweep : {};
  state.hiddenBosses = (d.hiddenBosses && typeof d.hiddenBosses === 'object') ? d.hiddenBosses : {};
  state.hideBossReward = d.hideBossReward === true;
  state.hiddenBossMsgs = (d.hiddenBossMsgs && typeof d.hiddenBossMsgs === 'object') ? d.hiddenBossMsgs : {};
  state.collapsed = (d.collapsed && typeof d.collapsed === 'object') ? d.collapsed : {};
  delete state.collapsed.undefined; // 清理旧版本误写入的脏键
  state.islandIdx = Math.min(5, Math.max(0, d.islandIdx || 0));
  state.islandId = d.islandId === 'earth' ? 'earth' : (d.islandId === 'sea' ? 'sea' : (d.islandId === 'sun' ? 'sun' : (d.islandId === 'light' ? 'light' : (d.islandId === 'dark' ? 'dark' : 'wind'))));
  state.earthProgress = (d.earthProgress && typeof d.earthProgress === 'object') ? d.earthProgress : {};
  state.seaProgress = (d.seaProgress && typeof d.seaProgress === 'object') ? d.seaProgress : {};
  state.sunProgress = (d.sunProgress && typeof d.sunProgress === 'object') ? d.sunProgress : {};
  state.lightProgress = (d.lightProgress && typeof d.lightProgress === 'object') ? d.lightProgress : {};
  state.darkProgress = (d.darkProgress && typeof d.darkProgress === 'object') ? d.darkProgress : {};
  state.sunCore = d.sunCore || 0;
  state.starPlankton = d.starPlankton || 0;
  state.darkShard = d.darkShard || 0;
  state.lightCrystal = d.lightCrystal || 0;
  state.darkCrystal = d.darkCrystal || 0;
  state.seaFan = d.seaFan || 0;
  state.earthBud = d.earthBud || 0;
  state.windCrystal = d.windCrystal || 0;
  state.earthCrystal = d.earthCrystal || 0;
  state.waterCrystal = d.waterCrystal || 0;
  state.fireCrystal = d.fireCrystal || 0;
  state.tiamatCleared = d.tiamatCleared === true;
  state.yggCleared = d.yggCleared === true;
  state.leviCleared = d.leviCleared === true;
  state.coloCleared = d.coloCleared === true;
  state.hiddenChapters = (d.hiddenChapters && typeof d.hiddenChapters === 'object') ? d.hiddenChapters : {};
  state.amberEyes = d.amberEyes || 0;
  state.islandProgress = (d.islandProgress && typeof d.islandProgress === 'object') ? d.islandProgress : {};
  state.zoeHard = d.zoeHard === true;
  state.zoeVH = d.zoeVH === true;
  state.vhZoeKills = d.vhZoeKills || 0;
  state.autoAdvance = d.autoAdvance === true;
  state.weapons = d.weapons || {};
  if (state.equipped && !WEAPON_BY_ID[state.equipped]) state.equipped = null;
  invalidateStats();
}
function load() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return false;
    applySaveData(JSON.parse(raw));
    return true;
  } catch (e) { return false; }
}
// 导出存档为文本文件
function exportSave() {
  const text = JSON.stringify(buildSaveData(), null, 2);
  const blob = new Blob([text], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const ts = new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-');
  a.href = url;
  a.download = `挂机武器传说存档_${ts}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  save(true);
  toast('📤 存档已导出为文件');
}
// 从文本文件导入存档
function importSaveFromFile(file) {
  const reader = new FileReader();
  reader.onload = function () {
    try {
      const d = JSON.parse(reader.result);
      if (!d || typeof d !== 'object') throw new Error('invalid');
      applySaveData(d);
      spawnMonster();
      state.playerHp = playerMaxHp();
      checkAchievements(true);
      renderMap();
      // 同步界面开关
      $('ck-advance').checked = state.autoAdvance;
      $('ck-upgrade-notify').checked = state.notifyUpgrade;
      $('ck-hide-boss').checked = state.hideBossReward;
      $('ck-hide-point-log').checked = state.hidePointLog;
      $('ck-hide-ach').checked = state.hideAchievements;
      document.querySelectorAll('#weapon-filters .filter-btn').forEach(b => b.classList.toggle('active', b.dataset.filter === state.weaponFilter));
      updateAll();
      save(true);
      log('📥 已从文件导入存档。', 'area');
      toast('📥 存档导入成功！');
    } catch (e) {
      toast('❌ 导入失败：存档文件格式无效');
    }
  };
  reader.readAsText(file);
}
function resetGame() {
  if (!confirm('确定要重置存档吗？所有进度将丢失。')) return;
  try { localStorage.removeItem(SAVE_KEY); } catch (e) {}
  state = {
    currentIdx: 1, unlockedIdx: 1, progressKills: 0, kills: 0, gold: 0,
    level: 1, exp: 0,
    points: 0, fates: {}, achievements: {}, dungeonCleared: false, expBuyLevel: 0, dropBuyLevel: 0, silverGlory: 0, bahamutHorn: 0, bahamutFirstCleared: false, sealBroken: false, decayedWeapons: {}, bahaUnlocked: false, tiamatHard: false, tiamatHardKills: 0, yggHard: false, yggHardKills: 0, leviHard: false, leviHardKills: 0, coloHard: false, coloHardKills: 0, chivHard: false, chivHardKills: 0, celesteHard: false, celesteHardKills: 0, tenshiAwakened: {}, fireFeather: 0, waterFeather: 0, earthFeather: 0, windFeather: 0, lightFeather: 0, darkFeather: 0, medWingAwakened: false, medWingAwakened2: false, vhCleared: false, verdantCrystal: 0, hardZoeKills: 0, vhZoeKills: 0, bossCooldowns: {}, rank: 0, rankFight: null, everHadPoints: false, bossKills: {}, goldBoostLevel: 0, pointDropLevel: 0, equipped: null,
    weaponFilter: 'ALL', weaponAttrFilter: 'ALL', notifyUpgrade: true, hidePointLog: false, autoAdvance: false, hideAchievements: false, autoBoss: {}, autoSweep: {}, hiddenBosses: {}, hideBossReward: false, hiddenBossMsgs: {}, zoeHard: false, zoeVH: false, collapsed: {},
    islandIdx: 0, islandId: 'wind', hiddenChapters: {}, amberEyes: 0, islandProgress: {}, earthProgress: {}, seaProgress: {}, sunProgress: {}, lightProgress: {}, darkProgress: {}, earthBud: 0, seaFan: 0, sunCore: 0, starPlankton: 0, darkShard: 0, windCrystal: 0, earthCrystal: 0, waterCrystal: 0, fireCrystal: 0, lightCrystal: 0, darkCrystal: 0, tiamatCleared: false, yggCleared: false, leviCleared: false, coloCleared: false,
    weapons: {}, monster: null, playerHp: 0,
  };
  state.weapons['wood_sword'] = { level: 1 };
  state.equipped = 'wood_sword';
  invalidateStats();
  spawnMonster();
  state.playerHp = playerMaxHp();
  logbox.innerHTML = '';
  log('新旅程开始！在 1-1 挂机，击杀怪物解锁新区域。', 'area');
  renderMap();
  updateAll();
  save(true);
}

/* ============ 主循环控制 ============ */
function startBattle() {
  stopBattle();
  const interval = speed === 1 ? 100 : 50;
  battleTimer = setInterval(function () {
    try {
      battleTick();
    } catch (e) {
      // 单次 tick 出错不应中断整个挂机循环
      console.error('battleTick error:', e);
    }
  }, interval);
}
function stopBattle() { if (battleTimer) { clearInterval(battleTimer); battleTimer = null; } }

/* ============ 事件绑定 ============ */
$('btn-pause').addEventListener('click', function () {
  paused = !paused;
  this.textContent = paused ? '▶ 继续' : '⏸ 暂停';
  this.classList.toggle('active', paused);
});
$('btn-speed').addEventListener('click', function () {
  speed = speed === 1 ? 2 : 1;
  this.textContent = speed + 'x';
  startBattle();
});
$('btn-export').addEventListener('click', exportSave);
$('btn-stats').addEventListener('click', function () {
  renderStats();
  $('stats-modal').classList.add('show');
});
$('btn-stats-close').addEventListener('click', function () {
  $('stats-modal').classList.remove('show');
});
$('stats-modal').addEventListener('click', function (e) {
  if (e.target === this) this.classList.remove('show');
});
$('btn-import').addEventListener('click', function () { $('import-file').click(); });
$('import-file').addEventListener('change', function () {
  const file = this.files && this.files[0];
  if (file) importSaveFromFile(file);
  this.value = '';
});
$('btn-reset').addEventListener('click', resetGame);
$('btn-best').addEventListener('click', function () {
  const best = findBestWeapon();
  if (!best) { toast('还没有任何武器'); return; }
  state.equipped = best;
  invalidateStats();
  state.playerHp = Math.min(state.playerHp, playerMaxHp()); // 切换武器不重置血量
  const def = WEAPON_BY_ID[best];
  toast(`已装备 <span class="t-r">[${def.rarity}] ${def.name}</span>`);
  updateAll();
  save(true);
});
$('shop-list').addEventListener('click', function (e) {
  const goldBtn = e.target.closest('.shop-buy-gold');
  if (goldBtn) {
    if (!goldBtn.disabled) buyGoldBoost();
    return;
  }
  const dropBtn = e.target.closest('.shop-buy-drop');
  if (dropBtn) {
    if (!dropBtn.disabled) buyPointDrop();
    return;
  }
  const btn = e.target.closest('.shop-buy');
  if (!btn || btn.disabled) return;
  buyFate();
});
$('dungeon-list').addEventListener('click', function (e) {
  const sealBtn = e.target.closest('[data-break-seal]');
  if (sealBtn) { breakBahamutSeal(); return; }
  const showBossBtn = e.target.closest('[data-show-boss]');
  if (showBossBtn) {
    if (!state.hiddenBosses) state.hiddenBosses = {};
    state.hiddenBosses[showBossBtn.dataset.showBoss] = false;
    renderDungeon();
    save(true);
    return;
  }
  const tDiff = e.target.closest('[data-tiamat-diff]');
  if (tDiff) {
    state.tiamatHard = tDiff.dataset.tiamatDiff === 'hard';
    renderDungeon();
    save(true);
    return;
  }
  const yDiff = e.target.closest('[data-ygg-diff]');
  if (yDiff) {
    state.yggHard = yDiff.dataset.yggDiff === 'hard';
    // 切换难度：取消该 Boss 的自动挑战/扫荡，并中止当前副本战斗
    state.autoBoss['yggdrasil'] = false;
    state.autoBoss['yggdrasil_hard'] = false;
    state.autoSweep['yggdrasil'] = false;
    state.autoSweep['yggdrasil_hard'] = false;
    if (state.dungeonFight && state.dungeonFight.id === 'yggdrasil') state.dungeonFight = null;
    renderDungeon();
    updateAll();
    save(true);
    return;
  }
  const lDiff = e.target.closest('[data-levi-diff]');
  if (lDiff) {
    state.leviHard = lDiff.dataset.leviDiff === 'hard';
    // 切换难度：取消该 Boss 的自动挑战/扫荡，并中止当前副本战斗
    state.autoBoss['leviathan'] = false;
    state.autoBoss['leviathan_hard'] = false;
    state.autoSweep['leviathan'] = false;
    state.autoSweep['leviathan_hard'] = false;
    if (state.dungeonFight && state.dungeonFight.id === 'leviathan') state.dungeonFight = null;
    renderDungeon();
    updateAll();
    save(true);
    return;
  }
  const cDiff = e.target.closest('[data-colo-diff]');
  if (cDiff) {
    state.coloHard = cDiff.dataset.coloDiff === 'hard';
    // 切换难度：取消该 Boss 的自动挑战/扫荡，并中止当前副本战斗
    state.autoBoss['colossus'] = false;
    state.autoBoss['colossus_hard'] = false;
    state.autoSweep['colossus'] = false;
    state.autoSweep['colossus_hard'] = false;
    if (state.dungeonFight && state.dungeonFight.id === 'colossus') state.dungeonFight = null;
    renderDungeon();
    updateAll();
    save(true);
    return;
  }
  const chivDiff = e.target.closest('[data-chiv-diff]');
  if (chivDiff) {
    state.chivHard = chivDiff.dataset.chivDiff === 'hard';
    state.autoBoss['chivalier'] = false;
    state.autoBoss['chivalier_hard'] = false;
    state.autoSweep['chivalier'] = false;
    state.autoSweep['chivalier_hard'] = false;
    if (state.dungeonFight && state.dungeonFight.id === 'chivalier') state.dungeonFight = null;
    renderDungeon();
    updateAll();
    save(true);
    return;
  }
  const ceDiff = e.target.closest('[data-ce-diff]');
  if (ceDiff) {
    state.celesteHard = ceDiff.dataset.ceDiff === 'hard';
    state.autoBoss['celeste'] = false;
    state.autoBoss['celeste_hard'] = false;
    state.autoSweep['celeste'] = false;
    state.autoSweep['celeste_hard'] = false;
    if (state.dungeonFight && state.dungeonFight.id === 'celeste') state.dungeonFight = null;
    renderDungeon();
    updateAll();
    save(true);
    return;
  }
  const diff = e.target.closest('[data-zoe-diff]');
  if (diff) {
    const pick = diff.dataset.zoeDiff;
    if (pick === 'vh' && state.level < 121) return;
    if (state.zoeHard === (pick === 'hard') && state.zoeVH === (pick === 'vh')) return;
    state.zoeHard = pick === 'hard';
    state.zoeVH = pick === 'vh';
    // 切换难度：自动挑战 / 自动扫荡自动取消勾选，并中止当前副本战斗
    state.autoBoss['zoe'] = false;
    state.autoBoss['zoe_hard'] = false;
    state.autoBoss['zoe_vh'] = false;
    state.autoSweep['zoe'] = false;
    state.autoSweep['zoe_hard'] = false;
    state.autoSweep['zoe_vh'] = false;
    if (state.dungeonFight) {
      state.dungeonFight = null;
      state.playerHp = playerMaxHp();
      spawnMonster();
      log('⏸ 切换难度，已中止当前副本战斗。', 'area');
    }
    renderDungeon();
    updateAll();
    save(true);
    return;
  }
  const btn = e.target.closest('[data-dungeon]');
  if (!btn || btn.disabled) return;
  startDungeon(btn.dataset.dungeon);
});
$('rank-section').addEventListener('click', function (e) {
  const btn = e.target.closest('[data-rank]');
  if (!btn || btn.disabled) return;
  startRankFight();
});
$('coin-shop').addEventListener('click', function (e) {
  const btn = e.target.closest('[data-coinshop]');
  if (!btn || btn.disabled) return;
  buyCoinUpgrade(btn.dataset.coinshop);
});
$('material-shop').addEventListener('click', function (e) {
  const tabBtn = e.target.closest('[data-craft-tab]');
  if (tabBtn) { craftTab = tabBtn.dataset.craftTab; renderMaterialShop(); return; }
  const craftBtn = e.target.closest('[data-craft-weapon]');
  if (craftBtn && !craftBtn.disabled) { craftWeapon(craftBtn.dataset.craftWeapon); return; }
  const upBtn = e.target.closest('[data-craft-upgrade]');
  if (upBtn && !upBtn.disabled) { upgradeCraftWeapon(upBtn.dataset.craftUpgrade); return; }
  const bahaBtn = e.target.closest('[data-baha-craft]');
  if (bahaBtn && !bahaBtn.disabled) { craftBahaWeapon(bahaBtn.dataset.bahaCraft); return; }
  const bahaUp = e.target.closest('[data-baha-upgrade]');
  if (bahaUp && !bahaUp.disabled) { upgradeBahaWeapon(bahaUp.dataset.bahaUpgrade); return; }
  const btn = e.target.closest('[data-material]');
  if (!btn || btn.disabled) return;
  if (btn.dataset.material === 'break') { awakenMedWing(); return; }
  exchangeMedWing();
});
$('ck-advance').addEventListener('change', function () {
  state.autoAdvance = this.checked;
  save();
});
$('ck-upgrade-notify').addEventListener('change', function () {
  state.notifyUpgrade = this.checked;
  save();
});
$('ck-hide-boss').addEventListener('change', function () {
  state.hideBossReward = this.checked;
  save(true);
});
$('ck-hide-point-log').addEventListener('change', function () {
  state.hidePointLog = this.checked;
  save(true);
});
$('ck-hide-ach').addEventListener('change', function () {
  state.hideAchievements = this.checked;
  renderAchievements();
  save(true);
});
$('dungeon-list').addEventListener('change', function (e) {
  const hideCb = e.target.closest('[data-hide-boss]');
  if (hideCb) {
    if (!state.hiddenBosses) state.hiddenBosses = {};
    state.hiddenBosses[hideCb.dataset.hideBoss] = hideCb.checked;
    renderDungeon();
    save(true);
    return;
  }
  const sweepCb = e.target.closest('[data-sweep-boss]');
  if (sweepCb) {
    state.autoSweep[sweepCb.dataset.sweepBoss] = sweepCb.checked;
    save(true);
    if (sweepCb.checked) { autoSweepTry(); renderDungeon(); }
    return;
  }
  const msgCb = e.target.closest('[data-boss-msg]');
  if (msgCb) {
    if (!state.hiddenBossMsgs) state.hiddenBossMsgs = {};
    state.hiddenBossMsgs[msgCb.dataset.bossMsg] = msgCb.checked;
    save(true);
    return;
  }
  const cb = e.target.closest('[data-auto-boss]');
  if (!cb) return;
  state.autoBoss[cb.dataset.autoBoss] = cb.checked;
  save(true);
  if (cb.checked) {
    // 勾选后立即尝试挑战（冷却中则等冷却结束自动继续）
    autoChallenge();
    renderDungeon();
  }
});

// 武器库分类筛选
$('weapon-filters').addEventListener('click', function (e) {
  const btn = e.target.closest('.filter-btn');
  if (!btn) return;
  state.weaponFilter = btn.dataset.filter;
  document.querySelectorAll('#weapon-filters .filter-btn').forEach(b => b.classList.toggle('active', b === btn));
  renderArmory();
  save();
});

// 武器库属性筛选（与稀有度叠加）
$('weapon-attr-filters').addEventListener('click', function (e) {
  const btn = e.target.closest('.filter-btn');
  if (!btn) return;
  state.weaponAttrFilter = btn.dataset.attrFilter;
  renderArmory();
  save();
});

// 地图区域选择（事件委托）
$('map').addEventListener('click', function (e) {
  // 章节隐藏 / 显示
  const hideBtn = e.target.closest('[data-hide-ch]');
  if (hideBtn) {
    const ch = parseInt(hideBtn.dataset.hideCh, 10);
    state.hiddenChapters[ch] = !state.hiddenChapters[ch];
    renderMap();
    save(true);
    return;
  }
  // 进入空岛
  const islandBtn = e.target.closest('[data-island]');
  if (islandBtn) {
    if (state.rank < 2) return;
    const idRaw = islandBtn.dataset.island;
    const id = idRaw === 'earth' ? 'earth' : (idRaw === 'sea' ? 'sea' : (idRaw === 'sun' ? 'sun' : (idRaw === 'light' ? 'light' : (idRaw === 'dark' ? 'dark' : 'wind'))));
    if (id === 'earth' && !state.tiamatCleared) return;
    if (id === 'sea' && !state.yggCleared) return;
    if (id === 'sun' && !state.leviCleared) return;
    if ((id === 'light' || id === 'dark') && !state.coloCleared) return;
    state.islandId = id;
    state.islandIdx = 1;
    state.autoProgress = 0;
    state.playerHp = playerMaxHp();
    spawnMonster();
    const cfg = islandCfg();
    log(`🏝️ 进入空岛 · <span class="area">${cfg.name}</span> 第 1 关（${cfg.attr}属性）。`, 'area');
    renderMap();
    updateAll();
    save(true);
    return;
  }
  // 空岛关卡切换
  const stageBtn = e.target.closest('[data-island-stage]');
  if (stageBtn) {
    const s = parseInt(stageBtn.dataset.islandStage, 10);
    if (s === state.islandIdx) return;
    const islandProg = islandProgMap();
    if (s !== 1 && (islandProg[s - 1] || 0) < 10) return; // 未解锁
    state.islandIdx = s;
    state.playerHp = playerMaxHp();
    spawnMonster();
    log(`🏝️ 切换到 ${islandCfg().name} 第 <span class="area">${s}</span> 关。`, 'area');
    renderMap();
    updateAll();
    save(true);
    return;
  }
  // 返回世界地图
  const backBtn = e.target.closest('[data-island-back]');
  if (backBtn) {
    state.islandIdx = 0;
    state.playerHp = playerMaxHp();
    spawnMonster();
    renderMap();
    updateAll();
    save(true);
    return;
  }
  const btn = e.target.closest('.area');
  if (!btn) return;
  const idx = parseInt(btn.dataset.idx, 10);
  if (idx > state.unlockedIdx || idx === state.currentIdx) return;
  state.currentIdx = idx;
  state.autoProgress = 0;
  state.playerHp = playerMaxHp();
  spawnMonster();
  log(`切换到区域 <span class="area">${areaLabel(idx)}</span> 挂机。`, 'area');
  renderMap();
  updateAll();
  save();
});

// 地图悬停显示该区域掉落装备与概率
const areaTip = $('area-tip');
// 武器在 tooltip 中的满级/等级状态
function tipStatusHtml(id) {
  const w = state.weapons[id];
  if (!w) return '<span class="tip-state none">未获得</span>';
  if (w.level >= MAX_LEVEL) return '<span class="tip-state max">满级</span>';
  return `<span class="tip-state lv">Lv.${w.level}</span>`;
}
function showAreaTip(idx, x, y) {
  const a = idxToArea(idx);
  const ch = a.chapter;
  const zone = a.zone;
  const achMul = 1 + achievementPoints() * ACH_POINTS_PER; // 成就点掉率加成
  let html;

  if (ch === 9) {
    // 第 9 章：掉落全部武器，地图只展示 SSR 掉率 + 说明
    html = `<div class="tip-title">${areaLabel(idx)} · ${CHAPTERS[ch - 1].name}</div>`;
    html += `<div class="tip-row">📜 本区掉落全部 R / SR / SSR 武器</div>`;
    const anyFate = Object.keys(state.fates).length > 0;
    html += `<div class="tip-row">✨ ${anyFate ? '以及所有命运之武器' : '以及所有的？？？'}</div>`;
    const ssrRate = ssrDropRate(ch, zone) * achMul * totalDropMul();
    const ssrPool = ssrPoolFor(ch);
    const ssrPer = ssrPool.length ? ssrRate / ssrPool.length : 0;
    html += `<div class="tip-row fate-row">👑 SSR 总掉率 <span class="tip-p">${Math.round(ssrRate * 100)}%</span></div>`;
    for (const w of ssrPool) {
      html += `<div class="tip-row"><span class="badge SSR">SSR</span> ${w.name} <span class="tip-p">${(ssrPer * 100).toFixed(1)}%</span>${tipStatusHtml(w.id)}</div>`;
    }
  } else {
    const D = effectiveDropRate(idx); // 已含成就点掉率加成
    const pool = rPoolFor(ch);
    const per = pool.length ? D / pool.length : 0;
    html = `<div class="tip-title">${areaLabel(idx)} · ${CHAPTERS[ch - 1].name} · 掉率 <b>${Math.round(D * 100)}%</b></div>`;
    for (const w of pool) {
      html += `<div class="tip-row"><span class="badge R">R</span> ${w.name} <span class="tip-p">${(per * 100).toFixed(1)}%</span>${tipStatusHtml(w.id)}</div>`;
    }
    // SR 稀有武器（5-8 章，独立掉率）
    const srRate = srDropRate(ch, zone) * achMul * totalDropMul();
    if (srRate > 0) {
      const srPool = srPoolFor(ch);
      const srPer = srPool.length ? srRate / srPool.length : 0;
      html += `<div class="tip-row fate-row">💎 SR 总掉率 <span class="tip-p">${Math.round(srRate * 100)}%</span></div>`;
      for (const w of srPool) {
        html += `<div class="tip-row"><span class="badge SR">SR</span> ${w.name} <span class="tip-p">${(srPer * 100).toFixed(1)}%</span>${tipStatusHtml(w.id)}</div>`;
      }
    }
  }

  // 命运之武器：获得后显示名称，未获得显示「？？？」（不显示掉率；第 9 章已在上方说明，跳过）
  if (ch !== 9) {
    const fate = FATE_BY_CHAPTER[ch];
    if (fate) {
      const fname = state.fates[fate.id] ? fate.name : '？？？';
      html += `<div class="tip-row fate-row">✨ ${fname}</div>`;
    }
  }
  areaTip.innerHTML = html;
  areaTip.classList.add('show');
  areaTip.style.left = Math.min(x + 14, window.innerWidth - 360) + 'px';
  areaTip.style.top = (y + 14) + 'px';
}
function hideAreaTip() { areaTip.classList.remove('show'); }
// 空岛关卡悬停：显示怪物属性与材料掉率
function showIslandStageTip(stage, x, y) {
  const cfg = islandCfg();
  const achMul = 1 + achievementPoints() * ACH_POINTS_PER;
  const base = islandAmberRate(stage);
  const actual = base * achMul * totalDropMul();
  let html = `<div class="tip-title">${cfg.name} 第 ${stage} 关 · ${cfg.monsters[stage - 1]}</div>`;
  html += `<div class="tip-row">属性：<b>${cfg.attr}</b></div>`;
  html += `<div class="tip-row fate-row">${cfg.materialIcon} ${cfg.material} 基础掉率 <span class="tip-p">${(base * 100).toFixed(2)}%</span></div>`;
  html += `<div class="tip-row">含加成实际掉率 <b>${(actual * 100).toFixed(2)}%</b>（成就点 + 金币掉落）</div>`;
  areaTip.innerHTML = html;
  areaTip.classList.add('show');
  areaTip.style.left = Math.min(x + 14, window.innerWidth - 360) + 'px';
  areaTip.style.top = (y + 14) + 'px';
}
$('map').addEventListener('mouseover', function (e) {
  const stageBtn = e.target.closest('[data-island-tip]');
  if (stageBtn) {
    showIslandStageTip(parseInt(stageBtn.dataset.islandTip, 10), e.clientX, e.clientY);
    return;
  }
  const btn = e.target.closest('.area');
  if (!btn) return;
  showAreaTip(parseInt(btn.dataset.idx, 10), e.clientX, e.clientY);
});
$('map').addEventListener('mousemove', function (e) {
  if (!areaTip.classList.contains('show')) return;
  areaTip.style.left = Math.min(e.clientX + 14, window.innerWidth - 360) + 'px';
  areaTip.style.top = (e.clientY + 14) + 'px';
});
$('map').addEventListener('mouseout', function (e) {
  const from = e.target.closest('.area, [data-island-tip]');
  const to = e.relatedTarget && e.relatedTarget.closest ? e.relatedTarget.closest('.area, [data-island-tip]') : null;
  if (from && from !== to) hideAreaTip();
});

// 副本 Boss 悬停显示掉落（复用地图浮层 #area-tip）
function showBossTip(bossId, x, y) {
  const b = allDungeons().find(d => d.id === bossId);
  if (!b) return;
  // 提亚马特：Normal / Hard（玛格纳）掉落与消耗（悬停显示全部）
  if (b.id === 'tiamat') {
    const dropBoost = (1 + achievementPoints() * ACH_POINTS_PER) * totalDropMul();
    const tHard = !!state.tiamatHard && (state.bossKills.raphael || 0) >= 10;
    const srMul = tHard ? 4 : 1;
    const totalRate = 0.05 * srMul * dropBoost;
    const per = totalRate / TIAMAT_WEAPONS.length;
    const cost = tHard ? 6 : (b.costAmber || 3);
    const title = tHard ? `${b.hardName} · Hard` : `${b.name} · Normal`;
    let html = `<div class="tip-title">${title}</div>`;
    html += `<div class="tip-row">属性：<b>风</b> · 生命 ${fmt(tHard ? b.hardHp : b.hp)} · 攻击 ${fmt(tHard ? b.hardAtk : b.atk)}</div>`;
    html += `<div class="tip-row">🌀 挑战消耗：岚龙的琥珀眼 ×${cost}（当前 ${fmt(state.amberEyes || 0)}）</div>`;
    if (tHard) {
      const whole = Math.floor(dropBoost);
      html += `<div class="tip-row">💠 掉落：风晶之元素 ×${whole}~${whole + 1}（按掉率 ${(dropBoost * 100).toFixed(0)}%）</div>`;
    } else {
      html += `<div class="tip-row">💠 必定掉落：风晶之元素 ×1（当前 ${fmt(state.windCrystal || 0)}）</div>`;
    }
    html += `<div class="tip-row fate-row">⚔ 专属 SR 总掉率 <span class="tip-p">${(totalRate * 100).toFixed(2)}%</span>（${tHard ? 'Hard ×4 · ' : ''}三选一，每件 ${(per * 100).toFixed(2)}%）</div>`;
    TIAMAT_WEAPONS.forEach(w => {
      const owned = state.weapons[w.id];
      const status = !owned
        ? '<span class="tip-state none">未获得</span>'
        : owned.level >= MAX_LEVEL
          ? '<span class="tip-state max">满级</span>'
          : `<span class="tip-state lv">Lv.${owned.level}</span>`;
      html += `<div class="tip-row"><span class="badge SR">SR</span> ${w.name} <span class="tip-p">${(per * 100).toFixed(2)}%</span>${status}</div>`;
    });
    if (tHard) {
      const mTotal = 0.004 * dropBoost;
      const mPer = mTotal / MAGNA_WEAPONS.length;
      html += `<div class="tip-row fate-row">✨ 玛格纳 SSR 总掉率 <span class="tip-p">${(mTotal * 100).toFixed(2)}%</span>（三选一，每件 ${(mPer * 100).toFixed(2)}%）</div>`;
      MAGNA_WEAPONS.forEach(w => {
        const ownedM = state.weapons[w.id];
        const status = !ownedM
          ? '<span class="tip-state none">未获得</span>'
          : ownedM.level >= MAX_LEVEL
            ? '<span class="tip-state max">满级</span>'
            : `<span class="tip-state lv">Lv.${ownedM.level}</span>`;
        html += `<div class="tip-row"><span class="badge SSR">SSR</span> ${w.name} <span class="tip-p">${(mPer * 100).toFixed(2)}%</span>${status}</div>`;
      });
    }
    areaTip.innerHTML = html;
    areaTip.classList.add('show');
    areaTip.style.left = Math.min(x + 14, window.innerWidth - 360) + 'px';
    areaTip.style.top = (y + 14) + 'px';
    return;
  }
  // 尤格多拉希尔：Normal / Hard（玛格纳）掉落与消耗（悬停显示全部）
  if (b.id === 'yggdrasil') {
    const yDropBoost = (1 + achievementPoints() * ACH_POINTS_PER) * totalDropMul();
    const yHard = !!state.yggHard && (state.bossKills.uriel || 0) >= 10;
    const srMul = yHard ? 4 : 1;
    const yTotal = 0.05 * srMul * yDropBoost;
    const yPer = yTotal / YGG_WEAPONS.length;
    const cost = yHard ? 6 : (b.costBud || 3);
    const title = yHard ? `${b.hardName} · Hard` : `${b.name} · Normal`;
    let html = `<div class="tip-title">${title}</div>`;
    html += `<div class="tip-row">属性：<b>土</b> · 生命 ${fmt(yHard ? b.hardHp : b.hp)} · 攻击 ${fmt(yHard ? b.hardAtk : b.atk)}</div>`;
    html += `<div class="tip-row">🌱 挑战消耗：创树的花蕾 ×${cost}（当前 ${fmt(state.earthBud || 0)}）</div>`;
    if (yHard) {
      const whole = Math.floor(yDropBoost);
      html += `<div class="tip-row">💠 掉落：土晶之元素 ×${whole}~${whole + 1}（按掉率 ${(yDropBoost * 100).toFixed(0)}%）</div>`;
    } else {
      html += `<div class="tip-row">💠 必定掉落：土晶之元素 ×1（当前 ${fmt(state.earthCrystal || 0)}）</div>`;
    }
    html += `<div class="tip-row fate-row">⚔ 专属 SR 总掉率 <span class="tip-p">${(yTotal * 100).toFixed(2)}%</span>（${yHard ? 'Hard ×4 · ' : ''}三选一，每件 ${(yPer * 100).toFixed(2)}%）</div>`;
    YGG_WEAPONS.forEach(w => {
      const ownedW = state.weapons[w.id];
      const status = !ownedW
        ? '<span class="tip-state none">未获得</span>'
        : ownedW.level >= MAX_LEVEL
          ? '<span class="tip-state max">满级</span>'
          : `<span class="tip-state lv">Lv.${ownedW.level}</span>`;
      html += `<div class="tip-row"><span class="badge SR">SR</span> ${w.name} <span class="tip-p">${(yPer * 100).toFixed(2)}%</span>${status}</div>`;
    });
    if (yHard) {
      const mTotal = 0.004 * yDropBoost;
      const mPer = mTotal / YGG_MAGNA_WEAPONS.length;
      html += `<div class="tip-row fate-row">✨ 玛格纳 SSR 总掉率 <span class="tip-p">${(mTotal * 100).toFixed(2)}%</span>（三选一，每件 ${(mPer * 100).toFixed(2)}%）</div>`;
      YGG_MAGNA_WEAPONS.forEach(w => {
        const ownedM = state.weapons[w.id];
        const status = !ownedM
          ? '<span class="tip-state none">未获得</span>'
          : ownedM.level >= MAX_LEVEL
            ? '<span class="tip-state max">满级</span>'
            : `<span class="tip-state lv">Lv.${ownedM.level}</span>`;
        html += `<div class="tip-row"><span class="badge SSR">SSR</span> ${w.name} <span class="tip-p">${(mPer * 100).toFixed(2)}%</span>${status}</div>`;
      });
    }
    areaTip.innerHTML = html;
    areaTip.classList.add('show');
    areaTip.style.left = Math.min(x + 14, window.innerWidth - 360) + 'px';
    areaTip.style.top = (y + 14) + 'px';
    return;
  }
  // 利维坦：Normal / Hard（玛格纳）掉落与消耗（悬停显示全部）
  if (b.id === 'leviathan') {
    const lDropBoost = (1 + achievementPoints() * ACH_POINTS_PER) * totalDropMul();
    const lHard = !!state.leviHard && (state.bossKills.gabriel || 0) >= 10;
    const srMul = lHard ? 4 : 1;
    const lTotal = 0.05 * srMul * lDropBoost;
    const lPer = lTotal / LEVI_WEAPONS.length;
    const cost = lHard ? 6 : (b.costFan || 3);
    const title = lHard ? `${b.hardName} · Hard` : `${b.name} · Normal`;
    let html = `<div class="tip-title">${title}</div>`;
    html += `<div class="tip-row">属性：<b>水</b> · 生命 ${fmt(lHard ? b.hardHp : b.hp)} · 攻击 ${fmt(lHard ? b.hardAtk : b.atk)}</div>`;
    html += `<div class="tip-row">🌊 挑战消耗：海神的扇尾 ×${cost}（当前 ${fmt(state.seaFan || 0)}）</div>`;
    if (lHard) {
      const whole = Math.floor(lDropBoost);
      html += `<div class="tip-row">💠 掉落：水晶之元素 ×${whole}~${whole + 1}（按掉率 ${(lDropBoost * 100).toFixed(0)}%）</div>`;
    } else {
      html += `<div class="tip-row">💠 必定掉落：水晶之元素 ×1（当前 ${fmt(state.waterCrystal || 0)}）</div>`;
    }
    html += `<div class="tip-row fate-row">⚔ 专属 SR 总掉率 <span class="tip-p">${(lTotal * 100).toFixed(2)}%</span>（${lHard ? 'Hard ×4 · ' : ''}三选一，每件 ${(lPer * 100).toFixed(2)}%）</div>`;
    LEVI_WEAPONS.forEach(w => {
      const ownedL = state.weapons[w.id];
      const status = !ownedL
        ? '<span class="tip-state none">未获得</span>'
        : ownedL.level >= MAX_LEVEL
          ? '<span class="tip-state max">满级</span>'
          : `<span class="tip-state lv">Lv.${ownedL.level}</span>`;
      html += `<div class="tip-row"><span class="badge SR">SR</span> ${w.name} <span class="tip-p">${(lPer * 100).toFixed(2)}%</span>${status}</div>`;
    });
    if (lHard) {
      const mTotal = 0.004 * lDropBoost;
      const mPer = mTotal / LEVI_MAGNA_WEAPONS.length;
      html += `<div class="tip-row fate-row">✨ 玛格纳 SSR 总掉率 <span class="tip-p">${(mTotal * 100).toFixed(2)}%</span>（三选一，每件 ${(mPer * 100).toFixed(2)}%）</div>`;
      LEVI_MAGNA_WEAPONS.forEach(w => {
        const ownedM = state.weapons[w.id];
        const status = !ownedM
          ? '<span class="tip-state none">未获得</span>'
          : ownedM.level >= MAX_LEVEL
            ? '<span class="tip-state max">满级</span>'
            : `<span class="tip-state lv">Lv.${ownedM.level}</span>`;
        html += `<div class="tip-row"><span class="badge SSR">SSR</span> ${w.name} <span class="tip-p">${(mPer * 100).toFixed(2)}%</span>${status}</div>`;
      });
    }
    areaTip.innerHTML = html;
    areaTip.classList.add('show');
    areaTip.style.left = Math.min(x + 14, window.innerWidth - 360) + 'px';
    areaTip.style.top = (y + 14) + 'px';
    return;
  }
  // 科罗萨斯：Normal / Hard（玛格纳）掉落与消耗（悬停显示全部）
  if (b.id === 'colossus') {
    const cDropBoost = (1 + achievementPoints() * ACH_POINTS_PER) * totalDropMul();
    const cHard = !!state.coloHard && (state.bossKills.michael || 0) >= 10;
    const srMul = cHard ? 4 : 1;
    const cTotal = 0.05 * srMul * cDropBoost;
    const cPer = cTotal / COLO_WEAPONS.length;
    const cost = cHard ? 6 : (b.costSun || 3);
    const title = cHard ? `${b.hardName} · Hard` : `${b.name} · Normal`;
    let html = `<div class="tip-title">${title}</div>`;
    html += `<div class="tip-row">属性：<b>火</b> · 生命 ${fmt(cHard ? b.hardHp : b.hp)} · 攻击 ${fmt(cHard ? b.hardAtk : b.atk)}</div>`;
    html += `<div class="tip-row">🔥 挑战消耗：日珥反应炉 ×${cost}（当前 ${fmt(state.sunCore || 0)}）</div>`;
    if (cHard) {
      const whole = Math.floor(cDropBoost);
      html += `<div class="tip-row">💠 掉落：火晶之元素 ×${whole}~${whole + 1}（按掉率 ${(cDropBoost * 100).toFixed(0)}%）</div>`;
    } else {
      html += `<div class="tip-row">💠 必定掉落：火晶之元素 ×1（当前 ${fmt(state.fireCrystal || 0)}）</div>`;
    }
    html += `<div class="tip-row fate-row">⚔ 专属 SR 总掉率 <span class="tip-p">${(cTotal * 100).toFixed(2)}%</span>（${cHard ? 'Hard ×4 · ' : ''}三选一，每件 ${(cPer * 100).toFixed(2)}%）</div>`;
    COLO_WEAPONS.forEach(w => {
      const ownedC = state.weapons[w.id];
      const status = !ownedC
        ? '<span class="tip-state none">未获得</span>'
        : ownedC.level >= MAX_LEVEL
          ? '<span class="tip-state max">满级</span>'
          : `<span class="tip-state lv">Lv.${ownedC.level}</span>`;
      html += `<div class="tip-row"><span class="badge SR">SR</span> ${w.name} <span class="tip-p">${(cPer * 100).toFixed(2)}%</span>${status}</div>`;
    });
    if (cHard) {
      const mTotal = 0.004 * cDropBoost;
      const mPer = mTotal / COLO_MAGNA_WEAPONS.length;
      html += `<div class="tip-row fate-row">✨ 玛格纳 SSR 总掉率 <span class="tip-p">${(mTotal * 100).toFixed(2)}%</span>（三选一，每件 ${(mPer * 100).toFixed(2)}%）</div>`;
      COLO_MAGNA_WEAPONS.forEach(w => {
        const ownedM = state.weapons[w.id];
        const status = !ownedM
          ? '<span class="tip-state none">未获得</span>'
          : ownedM.level >= MAX_LEVEL
            ? '<span class="tip-state max">满级</span>'
            : `<span class="tip-state lv">Lv.${ownedM.level}</span>`;
        html += `<div class="tip-row"><span class="badge SSR">SSR</span> ${w.name} <span class="tip-p">${(mPer * 100).toFixed(2)}%</span>${status}</div>`;
      });
    }
    areaTip.innerHTML = html;
    areaTip.classList.add('show');
    areaTip.style.left = Math.min(x + 14, window.innerWidth - 360) + 'px';
    areaTip.style.top = (y + 14) + 'px';
    return;
  }
  // 修瓦利耶：专属 SR 掉落与挑战消耗
  if (b.id === 'chivalier') {
    const vDropBoost = (1 + achievementPoints() * ACH_POINTS_PER) * totalDropMul();
    const vHard = !!state.chivHard && fourMagnaCleared();
    const vTotal = 0.05 * (vHard ? 4 : 1) * vDropBoost;
    const vPer = vTotal / CHIV_WEAPONS.length;
    const vCost = vHard ? 6 : (b.costStar || 3);
    const vTitle = vHard ? `${b.hardName} · Hard` : `${b.name} · Normal`;
    let html = `<div class="tip-title">${vTitle}</div>`;
    html += `<div class="tip-row">属性：<b>光</b> · 生命 ${fmt(vHard ? b.hardHp : b.hp)} · 攻击 ${fmt(vHard ? b.hardAtk : b.atk)}</div>`;
    html += `<div class="tip-row">✨ 挑战消耗：星星浮游体 ×${vCost}（当前 ${fmt(state.starPlankton || 0)}）</div>`;
    if (vHard) {
      const whole = Math.floor(vDropBoost);
      html += `<div class="tip-row">💠 掉落：光晶之元素 ×${whole}~${whole + 1}（按掉率 ${(vDropBoost * 100).toFixed(0)}%）</div>`;
    } else {
      html += `<div class="tip-row">💠 必定掉落：光晶之元素 ×1（当前 ${fmt(state.lightCrystal || 0)}）</div>`;
    }
    html += `<div class="tip-row fate-row">⚔ 专属 SR 总掉率 <span class="tip-p">${(vTotal * 100).toFixed(2)}%</span>（${vHard ? 'Hard ×4 · ' : ''}三选一，每件 ${(vPer * 100).toFixed(2)}%）</div>`;
    CHIV_WEAPONS.forEach(w => {
      const ownedV = state.weapons[w.id];
      const status = !ownedV
        ? '<span class="tip-state none">未获得</span>'
        : ownedV.level >= MAX_LEVEL
          ? '<span class="tip-state max">满级</span>'
          : `<span class="tip-state lv">Lv.${ownedV.level}</span>`;
      html += `<div class="tip-row"><span class="badge SR">SR</span> ${w.name} <span class="tip-p">${(vPer * 100).toFixed(2)}%</span>${status}</div>`;
    });
    if (vHard) {
      const mTotal = 0.004 * vDropBoost;
      const mPer = mTotal / CHIV_MAGNA_WEAPONS.length;
      html += `<div class="tip-row fate-row">✨ 玛格纳 SSR 总掉率 <span class="tip-p">${(mTotal * 100).toFixed(2)}%</span>（三选一，每件 ${(mPer * 100).toFixed(2)}%）</div>`;
      CHIV_MAGNA_WEAPONS.forEach(w => {
        const ownedM = state.weapons[w.id];
        const status = !ownedM
          ? '<span class="tip-state none">未获得</span>'
          : ownedM.level >= MAX_LEVEL
            ? '<span class="tip-state max">满级</span>'
            : `<span class="tip-state lv">Lv.${ownedM.level}</span>`;
        html += `<div class="tip-row"><span class="badge SSR">SSR</span> ${w.name} <span class="tip-p">${(mPer * 100).toFixed(2)}%</span>${status}</div>`;
      });
    }
    areaTip.innerHTML = html;
    areaTip.classList.add('show');
    areaTip.style.left = Math.min(x + 14, window.innerWidth - 360) + 'px';
    areaTip.style.top = (y + 14) + 'px';
    return;
  }
  // 塞勒斯特：专属 SR 掉落与挑战消耗
  if (b.id === 'celeste') {
    const eDropBoost = (1 + achievementPoints() * ACH_POINTS_PER) * totalDropMul();
    const eHard = !!state.celesteHard && fourMagnaCleared();
    const eTotal = 0.05 * (eHard ? 4 : 1) * eDropBoost;
    const ePer = eTotal / CELESTE_WEAPONS.length;
    const eCost = eHard ? 6 : (b.costShard || 3);
    const eTitle = eHard ? `${b.hardName} · Hard` : `${b.name} · Normal`;
    let html = `<div class="tip-title">${eTitle}</div>`;
    html += `<div class="tip-row">属性：<b>暗</b> · 生命 ${fmt(eHard ? b.hardHp : b.hp)} · 攻击 ${fmt(eHard ? b.hardAtk : b.atk)}</div>`;
    html += `<div class="tip-row">🌑 挑战消耗：黑雾的结晶 ×${eCost}（当前 ${fmt(state.darkShard || 0)}）</div>`;
    if (eHard) {
      const whole = Math.floor(eDropBoost);
      html += `<div class="tip-row">💠 掉落：暗晶之元素 ×${whole}~${whole + 1}（按掉率 ${(eDropBoost * 100).toFixed(0)}%）</div>`;
    } else {
      html += `<div class="tip-row">💠 必定掉落：暗晶之元素 ×1（当前 ${fmt(state.darkCrystal || 0)}）</div>`;
    }
    html += `<div class="tip-row fate-row">⚔ 专属 SR 总掉率 <span class="tip-p">${(eTotal * 100).toFixed(2)}%</span>（${eHard ? 'Hard ×4 · ' : ''}三选一，每件 ${(ePer * 100).toFixed(2)}%）</div>`;
    CELESTE_WEAPONS.forEach(w => {
      const ownedE = state.weapons[w.id];
      const status = !ownedE
        ? '<span class="tip-state none">未获得</span>'
        : ownedE.level >= MAX_LEVEL
          ? '<span class="tip-state max">满级</span>'
          : `<span class="tip-state lv">Lv.${ownedE.level}</span>`;
      html += `<div class="tip-row"><span class="badge SR">SR</span> ${w.name} <span class="tip-p">${(ePer * 100).toFixed(2)}%</span>${status}</div>`;
    });
    if (eHard) {
      const mTotal = 0.004 * eDropBoost;
      const mPer = mTotal / CELESTE_MAGNA_WEAPONS.length;
      html += `<div class="tip-row fate-row">✨ 玛格纳 SSR 总掉率 <span class="tip-p">${(mTotal * 100).toFixed(2)}%</span>（三选一，每件 ${(mPer * 100).toFixed(2)}%）</div>`;
      CELESTE_MAGNA_WEAPONS.forEach(w => {
        const ownedM = state.weapons[w.id];
        const status = !ownedM
          ? '<span class="tip-state none">未获得</span>'
          : ownedM.level >= MAX_LEVEL
            ? '<span class="tip-state max">满级</span>'
            : `<span class="tip-state lv">Lv.${ownedM.level}</span>`;
        html += `<div class="tip-row"><span class="badge SSR">SSR</span> ${w.name} <span class="tip-p">${(mPer * 100).toFixed(2)}%</span>${status}</div>`;
      });
    }
    areaTip.innerHTML = html;
    areaTip.classList.add('show');
    areaTip.style.left = Math.min(x + 14, window.innerWidth - 360) + 'px';
    areaTip.style.top = (y + 14) + 'px';
    return;
  }
  // 原型巴哈姆特：无属性，首胜必掉角，之后 1%
  if (b.id === 'bahamut') {
    const pBoost = (1 + achievementPoints() * ACH_POINTS_PER) * totalDropMul();
    const pRate = 0.01 * pBoost;
    let html = `<div class="tip-title">${b.name} · ${b.rank}</div>`;
    html += `<div class="tip-row">属性：<b>无</b></div>`;
    html += `<div class="tip-row">生命 ${fmt(b.hp)} · 攻击 ${fmt(b.atk)}</div>`;
    html += `<div class="tip-row">${state.sealBroken ? '🔓 封印已解除' : '🔒 封印中（需各 100 晶之元素）'}</div>`;
    html += state.bahamutFirstCleared
      ? `<div class="tip-row fate-row">巴哈姆特之角掉率 <span class="tip-p">${(pRate * 100).toFixed(2)}%</span></div>`
      : `<div class="tip-row fate-row">首胜必定掉落 巴哈姆特之角 ×1；之后掉率 <span class="tip-p">${(pRate * 100).toFixed(2)}%</span></div>`;
    html += `<div class="tip-row">腐朽武器掉率 <span class="tip-p">${(0.10 * pBoost * 100).toFixed(2)}%</span></div>`;
    areaTip.innerHTML = html;
    areaTip.classList.add('show');
    areaTip.style.left = Math.min(x + 14, window.innerWidth - 360) + 'px';
    areaTip.style.top = (y + 14) + 'px';
    return;
  }
  const zdTip = b.id === 'zoe' ? zoeDiff() : 'normal';
  const vhTip = zdTip === 'vh';
  const hard = zdTip === 'hard';
  const dropBoost = (1 + achievementPoints() * ACH_POINTS_PER) * totalDropMul();
  const bladePct = ((vhTip ? 0.16 : hard ? 0.04 : 0.01) * dropBoost * 100).toFixed(2);
  const owned = state.weapons[MED_WING_BLADE.id];
  const bladeStatus = !owned
    ? '<span class="tip-state none">未获得</span>'
    : owned.level >= MED_WING_BLADE.maxLevel
      ? '<span class="tip-state max">满级</span>'
      : `<span class="tip-state lv">Lv.${owned.level}</span>`;
  const bossName = vhTip ? b.vhName : hard ? (b.hardName || b.name) : b.name;
  // 非 Normal 难度时不再显示 "normal"，只显示 HARD / VERY HARD
  const titleSuffix = ` · ${vhTip ? 'Very Hard' : hard ? 'Hard' : 'Normal'}`;
  // 天司 Boss：只显示属性与专属羽毛实际掉落概率
  if (b.tenshiWeapon) {
    const everBeatT = (state.bossKills[b.id] || 0) > 0;
    const featherPctT = (0.005 * dropBoost * 100).toFixed(2);
    areaTip.innerHTML = `<div class="tip-title">${b.name} · Hard</div>` +
      `<div class="tip-row">属性 ${b.attr || '无'} · 生命 ${fmt(b.hp)} · 攻击 ${fmt(b.atk)}</div>` +
      `<div class="tip-row">🪶 ${everBeatT ? `掉落 ${b.featherName} <span class="tip-p">${featherPctT}%</span>` : `首次击败必掉 ${b.featherName} ×1；之后 `}${everBeatT ? '' : `<span class="tip-p">${featherPctT}%</span>`}</div>`;
    areaTip.classList.add('show');
    areaTip.style.left = Math.min(x + 14, window.innerWidth - 360) + 'px';
    areaTip.style.top = (y + 14) + 'px';
    return;
  }
  let html = `<div class="tip-title">${bossName}${titleSuffix}</div>`;
  if (hard || vhTip) {
    const rate = (vhTip ? 4 : 1) * (1 + achievementPoints() * ACH_POINTS_PER) * totalDropMul();
    html += `<div class="tip-row">💰 每次战胜：银天之辉 ×${Math.floor(rate)} 起（${(rate * 100).toFixed(0)}% 掉落率加成，余数概率再掉 1 个）</div>`;
  } else {
    html += `<div class="tip-row">💰 每次战胜：银天之辉 ×1</div>`;
  }
  html += `<div class="tip-row fate-row">⚔ 宇宙长剑掉率 <span class="tip-p">${bladePct}%</span>${bladeStatus}</div>`;
  if (vhTip) {
    html += `<div class="tip-row">🌿 苍翠的结晶掉率 <span class="tip-p">${(0.005 * dropBoost * 100).toFixed(2)}%</span></div>`;
  }
  areaTip.innerHTML = html;
  areaTip.classList.add('show');
  areaTip.style.left = Math.min(x + 14, window.innerWidth - 360) + 'px';
  areaTip.style.top = (y + 14) + 'px';
}
$('dungeon-list').addEventListener('mouseover', function (e) {
  const item = e.target.closest('.dungeon-item');
  if (!item) return;
  showBossTip(item.dataset.boss, e.clientX, e.clientY);
});
$('dungeon-list').addEventListener('mousemove', function (e) {
  if (!areaTip.classList.contains('show')) return;
  areaTip.style.left = Math.min(e.clientX + 14, window.innerWidth - 360) + 'px';
  areaTip.style.top = (e.clientY + 14) + 'px';
});
$('dungeon-list').addEventListener('mouseout', function (e) {
  const item = e.target.closest('.dungeon-item');
  const to = e.relatedTarget && e.relatedTarget.closest ? e.relatedTarget.closest('.dungeon-item') : null;
  if (item && item !== to) hideAreaTip();
});

// 武器库悬停：显示该武器自己的技能数据（无技能时明确提示）
$('grid').addEventListener('mouseover', function (e) {
  const card = e.target.closest('.weapon');
  if (!card) return;
  const id = card.dataset.id;
  const wdef = WEAPON_BY_ID[id];
  if (!wdef) return;
  let title = '无特殊技能';
  let desc = '该武器没有附加技能';
  if (id === MED_WING_BLADE.id) {
    if (state.medWingAwakened) {
      const s = medWingSkillInfo();
      title = state.medWingAwakened2 ? '宇宙的权能 II' : '宇宙的权能 I';
      desc = state.medWingAwakened2
        ? `每拥有一把武器：全属性 +0.1%；每拥有一把 MAX 武器：全属性 +0.1%（两者加算）。当前 ${s.n} 把武器 + ${s.maxCount} 把满级 = 全属性 +${(s.bonus * 100).toFixed(1)}%`
        : `每拥有一把武器：全属性 +0.1%。当前 ${s.n} 把武器 = 全属性 +${(s.bonus * 100).toFixed(1)}%`;
    } else {
      title = '宇宙长剑';
      desc = '击败 Hard 佐伊并突破后解锁「宇宙的权能」';
    }
  } else if (wdef.skills) {
    title = wdef.skills.map(s => s.name).join(' / ');
    // 只显示该武器自身属性的加成，其他属性（如附着在其他属性上的技能）不列出
    const b = totalAttrBonusOf(wdef.attr);
    let extra = '';
    if (wdef.skills.some(s => s.kind === 'backwater' && s.target === wdef.attr)) {
      extra = '；背水：生命比例越低攻击越高（上限 30%）';
    } else if (wdef.skills.some(s => s.kind === 'kiri' && s.target === wdef.attr)) {
      extra = '；受击 3% 概率免伤并反击';
    } else if (wdef.skills.some(s => s.kind === 'crit' && s.target === wdef.attr)) {
      extra = '；攻击 8% 概率触发暴击';
    }
    desc = `${wdef.attr}属性武器 攻击 +${fmtPct(b.atk)}% · 生命 +${fmtPct(b.hp)}%${extra}`;
  } else if (wdef.skill) {
    const aw = !!state.tenshiAwakened[id];
    title = aw && wdef.skill2 ? wdef.skill2 : wdef.skill;
    if (wdef.skillType) {
      const st = totalAttrBonusOf(wdef.attr);
      let extra = '';
      if (wdef.skillType === 'backwater') {
        extra = `；背水：生命比例越低攻击越高（当前 +${(yggBackwaterBonus() * 100).toFixed(1)}%，上限 30%）`;
      } else if (wdef.skillType === 'heal') {
        extra = '；治愈：水属性武器 攻击时回复 1% 最大生命';
      } else if (wdef.skillType === 'kiri') {
        extra = '；见切：火属性武器 受击 3% 概率免伤并反击';
      }
      desc = `${wdef.attr}属性武器 攻击 +${fmtPct(st.atk)}% · 生命 +${fmtPct(st.hp)}%${extra}`;
    } else if (wdef.beats) {
      desc = `对 ${wdef.beats} 属性敌人额外造成 +${aw ? 10 : 5}% 伤害`;
    } else {
      const bs = bahaSkillInfo(wdef);
      desc = `每拥有一把${wdef.type}类型武器，生命 +0.2%；当前 ${bs.count} 把 → +${(bs.bonus * 100).toFixed(1)}%（多把巴哈武器加算）`;
    }
  }
  areaTip.innerHTML = `<div class="tip-title">${title}</div>` +
    `<div class="tip-row">${wdef.name}（${wdef.type} · 属性 ${wdef.attr || '无'}）</div>` +
    `<div class="tip-row">${desc}</div>`;
  areaTip.classList.add('show');
  areaTip.style.left = Math.min(e.clientX + 14, window.innerWidth - 360) + 'px';
  areaTip.style.top = (e.clientY + 14) + 'px';
});
$('grid').addEventListener('mousemove', function (e) {
  if (!areaTip.classList.contains('show')) return;
  areaTip.style.left = Math.min(e.clientX + 14, window.innerWidth - 360) + 'px';
  areaTip.style.top = (e.clientY + 14) + 'px';
});
$('grid').addEventListener('mouseout', function (e) {
  const card = e.target.closest('.weapon');
  const to = e.relatedTarget && e.relatedTarget.closest ? e.relatedTarget.closest('.weapon') : null;
  if (card && card !== to) hideAreaTip();
});

// 点击武器装备 / 卸下（事件委托）
$('grid').addEventListener('click', function (e) {
  const awakenBtn = e.target.closest('[data-awaken]');
  if (awakenBtn) {
    if (awakenBtn.dataset.awaken === 'tenshi') awakenTenshiWeapon(awakenBtn.dataset.id);
    else if (awakenBtn.dataset.awaken === 'med2') awakenMedWing2();
    else awakenMedWing();
    return;
  }
  const card = e.target.closest('.weapon');
  if (!card) return;
  const id = card.dataset.id;
  if (!id) return; // 命运之武器卡片不可装备/卸下
  if (state.equipped === id) {
    if (Object.keys(state.weapons).length <= 1) {
      toast('至少要装备一把武器');
      return;
    }
    state.equipped = null;
    invalidateStats();
    state.playerHp = Math.min(state.playerHp, playerMaxHp()); // 切换武器不重置血量
    log('已卸下武器。', '');
  } else {
    state.equipped = id;
    invalidateStats();
    state.playerHp = Math.min(state.playerHp, playerMaxHp()); // 切换武器不重置血量
    const def = WEAPON_BY_ID[id];
    log(`装备了 <span class="drop">[${def.rarity}] ${def.name}</span>。`, 'drop');
  }
  updateAll();
  save(true);
});

window.addEventListener('beforeunload', function () { save(true); });
setInterval(save, 5000);

// 自动挑战遇到材料不足：暂停该 Boss 的自动挑战并提示玩家
function pauseAutoForMaterial(key, bossName, matName, need, have) {
  state.autoBoss[key] = false;
  log(`⏸ 自动挑战已暂停：<b>${bossName}</b> 需要 ${matName} ×${need}，当前仅 ${have}`, 'death');
  toast(`⏸ ${bossName} 材料不足：需 ${matName} ×${need}（当前 ${have}），自动挑战已暂停`);
  renderDungeon();
  save(true);
}

// 自动扫荡遇到材料不足：暂停该 Boss 的自动扫荡并提示玩家
function pauseSweepForMaterial(key, bossName, matName, need, have) {
  state.autoSweep[key] = false;
  // 若该 Boss 处于隐藏状态，一并取消隐藏，让玩家能看到暂停提示
  if (state.hiddenBosses && state.hiddenBosses[key]) state.hiddenBosses[key] = false;
  log(`⏸ 自动扫荡已暂停：<b>${bossName}</b> 需要 ${matName} ×${need}，当前仅 ${have}`, 'death');
  toast(`⏸ ${bossName} 材料不足：需 ${matName} ×${need}（当前 ${have}），自动扫荡已暂停`);
  renderDungeon();
  save(true);
}

// 自动扫荡：该难度累计击败 100 次后可开启；冷却结束自动结算奖励，不进入战斗界面
function autoSweepTry() {
  if (state.dungeonFight || state.rankFight) return;
  const now = Date.now();
  for (const d of allDungeons()) {
    if (d.tenshiWeapon) { const tw = state.weapons[d.tenshiWeapon]; if (!tw || tw.level < 40) continue; }
    const zd = d.id === 'zoe' ? zoeDiff()
      : (d.id === 'tiamat' && state.tiamatHard && (state.bossKills.raphael || 0) >= 10) ? 'hard'
      : (d.id === 'yggdrasil' && state.yggHard && (state.bossKills.uriel || 0) >= 10) ? 'hard'
      : (d.id === 'leviathan' && state.leviHard && (state.bossKills.gabriel || 0) >= 10) ? 'hard'
      : (d.id === 'colossus' && state.coloHard && (state.bossKills.michael || 0) >= 10) ? 'hard'
      : (d.id === 'chivalier' && state.chivHard && fourMagnaCleared()) ? 'hard'
      : (d.id === 'celeste' && state.celesteHard && fourMagnaCleared()) ? 'hard'
      : 'normal';
    const vh = zd === 'vh';
    const hard = zd === 'hard';
    const key = d.id + (vh ? '_vh' : hard ? '_hard' : '');
    if (!state.autoSweep[key]) continue;
    if (now < (state.bossCooldowns[d.id] || 0)) continue;
    if (d.id === 'tiamat' && (state.islandProgress[5] || 0) < 10) continue;
    if (d.id === 'yggdrasil' && (((state.earthProgress || {})[5]) || 0) < 10) continue;
    if (d.id === 'leviathan' && (((state.seaProgress || {})[5]) || 0) < 10) continue;
    if (d.id === 'colossus' && (((state.sunProgress || {})[5]) || 0) < 10) continue;
    if (d.id === 'chivalier' && (((state.lightProgress || {})[5]) || 0) < 10) continue;
    if (d.id === 'celeste' && (((state.darkProgress || {})[5]) || 0) < 10) continue;
    if (d.id === 'bahamut' && !state.sealBroken) continue; // 未解封
    const kills = vh ? (state.vhZoeKills || 0)
      : (hard && d.id === 'zoe') ? (state.hardZoeKills || 0)
      : (hard && d.id === 'tiamat') ? (state.tiamatHardKills || 0)
      : (hard && d.id === 'yggdrasil') ? (state.yggHardKills || 0)
      : (hard && d.id === 'leviathan') ? (state.leviHardKills || 0)
      : (hard && d.id === 'colossus') ? (state.coloHardKills || 0)
      : (hard && d.id === 'chivalier') ? (state.chivHardKills || 0)
      : (hard && d.id === 'celeste') ? (state.celesteHardKills || 0)
      : (state.bossKills[d.id] || 0);
    if (kills < 100) continue;
    const tiamatCost = (d.id === 'tiamat' && hard) ? 6 : (d.costAmber || 3);
    if (d.id === 'tiamat' && (state.amberEyes || 0) < tiamatCost) { pauseSweepForMaterial(key, d.name, '岚龙的琥珀眼', tiamatCost, state.amberEyes || 0); continue; }
    const yggCost = (d.id === 'yggdrasil' && hard) ? 6 : (d.costBud || 3);
    if (d.id === 'yggdrasil' && (state.earthBud || 0) < yggCost) { pauseSweepForMaterial(key, d.name, '创树的花蕾', yggCost, state.earthBud || 0); continue; }
    const leviCost = (d.id === 'leviathan' && hard) ? 6 : (d.costFan || 3);
    if (d.id === 'leviathan' && (state.seaFan || 0) < leviCost) { pauseSweepForMaterial(key, d.name, '海神的扇尾', leviCost, state.seaFan || 0); continue; }
    const coloCost = (d.id === 'colossus' && hard) ? 6 : (d.costSun || 3);
    if (d.id === 'colossus' && (state.sunCore || 0) < coloCost) { pauseSweepForMaterial(key, d.name, '日珥反应炉', coloCost, state.sunCore || 0); continue; }
    const chivCost = (d.id === 'chivalier' && hard) ? 6 : (d.costStar || 3);
    if (d.id === 'chivalier' && (state.starPlankton || 0) < chivCost) { pauseSweepForMaterial(key, d.name, '星星浮游体', chivCost, state.starPlankton || 0); continue; }
    const ceCost = (d.id === 'celeste' && hard) ? 6 : (d.costShard || 3);
    if (d.id === 'celeste' && (state.darkShard || 0) < ceCost) { pauseSweepForMaterial(key, d.name, '黑雾的结晶', ceCost, state.darkShard || 0); continue; }
    if (d.id === 'tiamat') state.amberEyes -= tiamatCost;
    if (d.id === 'yggdrasil') state.earthBud -= yggCost;
    if (d.id === 'leviathan') state.seaFan -= leviCost;
    if (d.id === 'colossus') state.sunCore -= coloCost;
    if (d.id === 'chivalier') state.starPlankton -= ((d.id === 'chivalier' && hard) ? 6 : (d.costStar || 3));
    if (d.id === 'celeste') state.darkShard -= ((d.id === 'celeste' && hard) ? 6 : (d.costShard || 3));
    const atk = vh ? d.vhAtk : hard ? d.hardAtk : d.atk;
    const diffName = d.tenshiWeapon ? 'Hard' : vh ? 'Very Hard' : hard ? 'Hard' : 'Normal';
    const bName = vh ? d.vhName : d.name;
    state.dungeonFight = { id: d.id, name: bName, attr: d.attr || '无', atk, bossHp: 0, bossMaxHp: 1, hard, vh, diff: diffName };
    log(`⚡ 自动扫荡「<b>${bName} （ ${diffName}）</b>」`, 'area');
    onDungeonWin();
    renderDungeon();
    save(true);
    return; // 一秒最多扫荡一个，之后冷却结束继续
  }
}

// 副本冷却刷新（每秒只更新倒计时文本，不重建列表以免打断浮层）
// 自动挑战：按当前难度检查对应开关（每个难度需先战胜 10 遍才解锁）
function autoChallenge() {
  if (state.dungeonFight || state.rankFight) return;
  const now = Date.now();
  for (const d of allDungeons()) {
    if (d.tenshiWeapon) { const tw = state.weapons[d.tenshiWeapon]; if (!tw || tw.level < 40) continue; }
    const zdC = d.id === 'zoe' ? zoeDiff()
      : (d.id === 'tiamat' && state.tiamatHard && (state.bossKills.raphael || 0) >= 10) ? 'hard'
      : (d.id === 'yggdrasil' && state.yggHard && (state.bossKills.uriel || 0) >= 10) ? 'hard'
      : (d.id === 'leviathan' && state.leviHard && (state.bossKills.gabriel || 0) >= 10) ? 'hard'
      : (d.id === 'colossus' && state.coloHard && (state.bossKills.michael || 0) >= 10) ? 'hard'
      : (d.id === 'chivalier' && state.chivHard && fourMagnaCleared()) ? 'hard'
      : (d.id === 'celeste' && state.celesteHard && fourMagnaCleared()) ? 'hard'
      : 'normal';
    const vhC = zdC === 'vh';
    const hard = zdC === 'hard';
    const key = d.id + (vhC ? '_vh' : hard ? '_hard' : '');
    if (!state.autoBoss[key]) continue;
    // 该难度已解锁自动扫荡：自动挑战不再生效（选项已被自动扫荡替代）
    const autoKills = vhC ? (state.vhZoeKills || 0)
      : (hard && d.id === 'zoe') ? (state.hardZoeKills || 0)
      : (hard && d.id === 'tiamat') ? (state.tiamatHardKills || 0)
      : (hard && d.id === 'yggdrasil') ? (state.yggHardKills || 0)
      : (hard && d.id === 'leviathan') ? (state.leviHardKills || 0)
      : (hard && d.id === 'colossus') ? (state.coloHardKills || 0)
      : (hard && d.id === 'chivalier') ? (state.chivHardKills || 0)
      : (hard && d.id === 'celeste') ? (state.celesteHardKills || 0)
      : (state.bossKills[d.id] || 0);
    if (autoKills >= 100) continue;
    if (now < (state.bossCooldowns[d.id] || 0)) continue; // 该 Boss 独立冷却中
    if (d.id === 'tiamat' && (state.islandProgress[5] || 0) < 10) continue; // 未解锁
    if (d.id === 'yggdrasil' && (((state.earthProgress || {})[5]) || 0) < 10) continue; // 未解锁
    if (d.id === 'leviathan' && (((state.seaProgress || {})[5]) || 0) < 10) continue; // 未解锁
    if (d.id === 'colossus' && (((state.sunProgress || {})[5]) || 0) < 10) continue; // 未解锁
    if (d.id === 'chivalier' && (((state.lightProgress || {})[5]) || 0) < 10) continue; // 未解锁
    if (d.id === 'celeste' && (((state.darkProgress || {})[5]) || 0) < 10) continue; // 未解锁
    if (d.id === 'bahamut' && !state.sealBroken) continue; // 未解封
    // 材料不足：暂停该 Boss 的自动挑战并提示
    const tiamatCostA = (d.id === 'tiamat' && hard) ? 6 : (d.costAmber || 3);
    if (d.id === 'tiamat' && (state.amberEyes || 0) < tiamatCostA) { pauseAutoForMaterial(key, d.name, '岚龙的琥珀眼', tiamatCostA, state.amberEyes || 0); continue; }
    const yggCostA = (d.id === 'yggdrasil' && hard) ? 6 : (d.costBud || 3);
    if (d.id === 'yggdrasil' && (state.earthBud || 0) < yggCostA) { pauseAutoForMaterial(key, d.name, '创树的花蕾', yggCostA, state.earthBud || 0); continue; }
    const leviCostA = (d.id === 'leviathan' && hard) ? 6 : (d.costFan || 3);
    if (d.id === 'leviathan' && (state.seaFan || 0) < leviCostA) { pauseAutoForMaterial(key, d.name, '海神的扇尾', leviCostA, state.seaFan || 0); continue; }
    const coloCostA = (d.id === 'colossus' && hard) ? 6 : (d.costSun || 3);
    if (d.id === 'colossus' && (state.sunCore || 0) < coloCostA) { pauseAutoForMaterial(key, d.name, '日珥反应炉', coloCostA, state.sunCore || 0); continue; }
    const chivCostA = (d.id === 'chivalier' && hard) ? 6 : (d.costStar || 3);
    if (d.id === 'chivalier' && (state.starPlankton || 0) < chivCostA) { pauseAutoForMaterial(key, d.name, '星星浮游体', chivCostA, state.starPlankton || 0); continue; }
    const ceCostA = (d.id === 'celeste' && hard) ? 6 : (d.costShard || 3);
    if (d.id === 'celeste' && (state.darkShard || 0) < ceCostA) { pauseAutoForMaterial(key, d.name, '黑雾的结晶', ceCostA, state.darkShard || 0); continue; }
    startDungeon(d.id);
    return;
  }
}

function updateDungeonCooldown() {
  const now = Date.now();
  const list = $('dungeon-list');
  if (list) {
    allDungeons().forEach(b => {
      const left = Math.max(0, Math.ceil(((state.bossCooldowns[b.id] || 0) - now) / 1000));
      const item = list.querySelector(`[data-boss="${b.id}"]`);
      if (!item) return;
      const btn = item.querySelector('[data-cd-btn]');
      const tag = item.querySelector('[data-cd-tag]');
      if (btn) btn.textContent = left > 0 ? `冷却 ${left}s` : '挑战';
      if (tag) tag.textContent = left > 0 ? `冷却 ${left}s` : '可挑战';
    });
  }
  // 清理已结束的冷却并刷新列表
  let expired = false;
  allDungeons().forEach(b => {
    if ((state.bossCooldowns[b.id] || 0) && state.bossCooldowns[b.id] <= now) {
      delete state.bossCooldowns[b.id];
      expired = true;
    }
  });
  if (expired) { renderDungeon(); save(); }
  autoSweepTry();
  autoChallenge();
}
setInterval(updateDungeonCooldown, 1000);

/* ============ 初始化 ============ */
// 面板收起/展开状态应用
function applyCollapsed() {
  document.querySelectorAll('.panel-toggle').forEach(function (btn) {
    const key = btn.dataset.collapse;
    if (!key) return; // 非面板开关（如空岛的「返回世界地图」），忽略
    const panel = btn.closest('.panel');
    const on = !!state.collapsed[key];
    if (panel) panel.classList.toggle('collapsed', on);
    btn.textContent = on ? '展开' : '收起';
  });
}
document.querySelector('#app').addEventListener('click', function (e) {
  const btn = e.target.closest('.panel-toggle');
  if (!btn) return;
  const key = btn.dataset.collapse;
  if (!key) return; // 非面板开关，忽略（避免写入 collapsed.undefined）
  state.collapsed[key] = !state.collapsed[key];
  applyCollapsed();
  save(true);
});

(function init() {
  try {
    const loaded = load();
    if (!loaded) {
      // 开局赠送一把新手武器
      state.weapons['wood_sword'] = { level: 1 };
      state.equipped = 'wood_sword';
    }
    spawnMonster();
    state.playerHp = playerMaxHp();
    renderMap(); // 先渲染地图（独立于后续步骤，避免前面出错导致地图空白）
    checkAchievements(true); // 兼容旧存档：补触发已满足的成就（静默）
    // 同步 UI 开关与筛选状态
    $('ck-advance').checked = state.autoAdvance;
    $('ck-upgrade-notify').checked = state.notifyUpgrade;
    $('ck-hide-boss').checked = state.hideBossReward;
    $('ck-hide-point-log').checked = state.hidePointLog;
    $('ck-hide-ach').checked = state.hideAchievements;
    document.querySelectorAll('#weapon-filters .filter-btn').forEach(b => b.classList.toggle('active', b.dataset.filter === state.weaponFilter));
    renderMap();
    updateAll();
    applyCollapsed();
    log('⚔️ 自动战斗已开启！在 1-1 挂机，击杀怪物掉落武器并解锁新区域。', 'area');
  } catch (e) {
    // 某一步渲染失败也不能让战斗停摆
    console.error('初始化出错，已跳过并继续启动战斗：', e);
  }
  startBattle();
})();

// 战斗看门狗：未暂停却长时间没有击杀（后台节流、异常停滞等）时自动重启战斗循环
let wdKills = state.kills;
let wdAt = Date.now();
let wdRecoverAt = 0;
setInterval(function () {
  if (paused || state.dungeonFight || state.rankFight) {
    wdKills = state.kills; wdAt = Date.now();
    return;
  }
  if (state.kills !== wdKills) {
    wdKills = state.kills; wdAt = Date.now();
    return;
  }
  const now = Date.now();
  if (now - wdAt > 12000 && now - wdRecoverAt > 60000) {
    startBattle();
    wdRecoverAt = now; wdAt = now;
    log('🔧 检测到战斗停滞，已自动恢复。', 'area');
  }
}, 3000);

// 从后台切回前台时刷新一次界面（浏览器会节流后台定时器）
document.addEventListener('visibilitychange', function () {
  if (!document.hidden) {
    if (!paused && !battleTimer) startBattle();
    wdKills = state.kills; wdAt = Date.now();
    updateAll();
  }
});