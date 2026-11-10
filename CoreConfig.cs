// ============================================================
// 挂机武器传说 — 全局配置常量（CoreConfig）
// ------------------------------------------------------------
// 说明：本文件是“规则与数值的唯一参考清单”，由 game.js 提取而来，
//       用于文档化与后续迁移；游戏运行时仍以 game.js 为准。
//       修改数值时，请同步修改 game.js 与本文件。
// ============================================================

namespace IdleWeaponLegend.Config;

public static class CoreConfig
{
    // ===== 存档 =====
    public const string SaveKey = "idle_weapon_game_save_v2";

    // ===== 地图（前九章）=====
    public const int TotalAreas = 90;      // 1-1 ~ 9-10，共 9 章 × 10 区
    public const int UnlockKills = 5;      // 最新区域击杀 5 只解锁下一区
    public const int ChapterCount = 9;
    public const int ZonesPerChapter = 10;

    // ===== 武器基础 =====
    public const int MaxLevel = 100;       // 普通武器满级（天司 40/80，巴哈 40/80，宇宙长剑 40/80/100/120）
    public const int WeaponLevelCapDefault = 100;

    // 稀有度排序（武器库展示：高 → 低）
    public static readonly string[] RaritySort = { "UR", "SSR", "SR", "R" };

    // 满级重复获得 → 收藏点
    public const int PointsR = 1;
    public const int PointsSr = 3;
    public const int PointsSsr = 10;
    public const int PointsMagnaSsr = 300;   // 六属性玛格纳 SSR
    public const int PointsBossSr = 30;      // 六岛专属 SR（提亚马特/尤格/利维坦/科罗萨斯/修瓦利耶/塞勒斯特）
    public const int PointsMedWing = 1000;   // 宇宙长剑（调停翼刃）满级重复

    // ===== 武器类型（10 种）=====
    public static readonly string[] TypeOrder =
    {
        "刀", "剑", "杖", "弓", "斧", "枪", "乐器", "拳套", "匕首", "铳"
    };

    // 类型 → 首次出现的章节（R 武器）
    public static readonly Dictionary<string, int> TypeChapter = new()
    {
        ["刀"] = 1, ["剑"] = 1, ["杖"] = 1,
        ["弓"] = 2, ["斧"] = 2, ["铳"] = 2,
        ["枪"] = 3, ["乐器"] = 3,
        ["拳套"] = 4, ["匕首"] = 4,
    };

    // ===== 装备倍率 =====
    public const double EquipRatioEquipped = 1.0;    // 已装备 100%
    public const double EquipRatioUnequipped = 0.1;  // 未装备 10%
    public const double EquipRatioSameType = 1.1;    // 装备武器类型 == 当前职业得意武器时 110%

    // ===== 命运之武器 =====
    public const int FateShopBase = 5000;        // 初次兑换 5000，之后每多拥有一件 +5000
    public const double FateDropRate = 0.0001;   // 0.01%，不吃任何加成
    public const int FateCount = 10;             // 10 种类型各一把

    // ===== 金币商店 =====
    public const long ExpBuyBase = 20000;        // 经验倍率 Lv.1 花费
    public const double ExpBuyGrowth = 1.6;      // 每级花费指数增长
    public const long DropBuyBase = 40000;       // 掉落几率 Lv.1 花费
    public const double DropBuyGrowth = 1.7;     // 每级花费指数增长
    public const double BuyMulPerLevel = 0.05;   // 每级 +5%
    // 两项均无等级上限（Infinity）

    // ===== 角色等级 / 经验 =====
    public const int PlayerMaxLevelBase = 100;   // 基础上限 100；每次 RANK 突破 +10
    public const int ExpBase = 100;              // 1→2 级所需经验
    public const int ExpStep = 100;              // 每级线性递增
    public const int MonsterExpBase = 20;        // 1-1 每只怪基础经验

    // RANK → 等级上限
    public static readonly Dictionary<int, int> RankLevelCap = new()
    {
        [0] = 100, [1] = 110, [2] = 120, [3] = 130, [4] = 140,
    };

    // 突破级经验倍率（该段首级所需经验翻倍系数）
    public const int RankExpJumpMultiplier = 10; // 100→101、110→111、120→121、130→131 均 ×10

    // ===== 掉落率 =====
    public const double AchPointsPerDrop = 0.01;  // 每个成就点 +1% 普通装备掉率
    public const double MapDropStart = 0.25;      // 每章 1 区基础 25%
    public const double MapDropEnd = 1.00;        // 每章 10 区基础 100%
    public const double IslandMaterialStart = 0.005; // 空岛材料 1 区 0.5%
    public const double IslandMaterialEnd = 0.20;    // 空岛材料 5 区 20%
    public const double ExpertElementStart = 0.00009; // 专精岛武器元素 1 关 0.009%（提高 100 倍后）
    public const double ExpertElementEnd = 0.00036;   // 第 9 关 0.036%

    // ===== 属性（七属性）=====
    public static readonly string[] Attributes = { "风", "火", "土", "水", "光", "暗", "无" };
    // 四元素克制链：风克土、土克水、水克火、火克风
    public static readonly Dictionary<string, string> AttrBeats = new()
    {
        ["风"] = "土", ["土"] = "水", ["水"] = "火", ["火"] = "风",
    };

    // 伤害倍率
    public const double DmgCounter = 1.5;   // 克制：造成 150%
    public const double DmgCountered = 0.5; // 被克：造成 50%
    public const double DmgTakenCounter = 0.5;   // 克制对方：受到 50%
    public const double DmgTakenCountered = 1.5; // 被克：受到 150%
    public const double LightDarkOut = 1.5;      // 光暗互克：玩家造成 150%
    public const double LightDarkIn = 1.0;       // 光暗互克：玩家受到 100%
    public const double NoAttrOut = 0.8;         // 无属性打有属性：造成 80%
    public const double NoAttrIn = 1.2;          // 无属性打有属性：受到 120%

    // ===== 战斗节奏 =====
    public const double AttackIntervalSeconds = 0.5; // 基础攻速：每人每 0.5 秒一次
    public const double RankFightSpeedScale = 0.5;   // 四天司连战整体速度 ×0.5
    public const double DummyHp = 1e15;              // 训练木桩血量
    public const double DummyDamagePercent = 0.01;   // 木桩固定造成玩家最大生命 1%

    // ===== 奥义 =====
    public const int OwgiMax = 100;
    public const int OwgiGainOnAttack = 5;   // 攻击 +5
    public const int OwgiGainOnHit = 5;      // 受击 +5
    // 释放本身不获得奥义值；进入战斗重置；暴击段不额外加
    public static readonly Dictionary<string, string> OwgiNames = new()
    {
        ["sword"] = "守护之誓", ["axe"] = "狂战斩", ["dagger"] = "元素爆发", ["bow"] = "箭雨",
        ["spear"] = "贯穿突刺", ["knife"] = "一闪", ["staff"] = "陨石术", ["gun"] = "影袭",
        ["lute"] = "生命赞歌", ["fist"] = "百裂拳",
    };

    // ===== 职业 =====
    public const int JobMaxLevel = 10;
    public const long JobExpValue = 20_000_000; // 130→131 所需经验的 5% = 1 职业经验点
    public const int JobCount = 10;

    // 职业 → 得意武器
    public static readonly Dictionary<string, string> JobWeaponType = new()
    {
        ["sword"] = "剑", ["axe"] = "斧", ["dagger"] = "匕首", ["bow"] = "弓",
        ["spear"] = "枪", ["knife"] = "刀", ["staff"] = "杖", ["gun"] = "铳",
        ["lute"] = "乐器", ["fist"] = "拳套",
    };

    // ===== 专精岛（10 座，按顺序解锁）=====
    public const int ExpertIslandStages = 10;
    public const int ExpertUnlockKills = 10;      // 每关击败 10 只解锁下一关
    public const double ExpertHpGrowthPerStage = 1.05;   // 前 9 关每关 ×1.05
    public const double ExpertFinalStageHpMul = 1.5;     // 第 10 关 = 第 9 关 ×1.5
    public const double ExpertIslandHpStep = 1.02;       // 后一个岛同关卡 ×1.02
    public const double ExpertIslandAtkStep = 1.01;      // 后一个岛同关卡 ×1.01
    public const double ExpertFinalIslandHpStep = 1.05;  // 第 10 关岛间 ×1.05
    public const double ExpertFinalIslandAtkStep = 1.025; // 第 10 关岛间 ×1.025
    public const double ExpertSameTypeBonusOut = 1.5;    // 本岛对应武器：造成 150%
    public const double ExpertSameTypeBonusIn = 0.5;     // 本岛对应武器：受到 50%
    public static readonly int ExpertBaseHp = 179432 * 4; // 剑之岛第 1 关（暗之岛第 5 关 ×4）
    public static readonly int ExpertBaseAtk = 4631 * 4;

    // ===== 成就 =====
    public const int AchRanks = 4;               // 成就按 RANK 1-4 分组
    public const int AchPointPerPercent = 1;     // 每 1 点成就 = +1% 掉率
    public const int AchJobAllMasterPoints = 200;
    public const int AchBahaHardPoints = 200;

    // ===== 副本 Boss 基础倍率（相对 2000 经验 / 2500 金币）=====
    public const double BossExpBase = 2000;
    public const double BossGoldBase = 2500;
    public const double BossMulVeryHard = 16;
    public const double BossMulTenshi = 5.5;
    public const double BossMulSixIslandHard = 18;
    public const double BossMulSixIslandNormal = 4.5;
    public const double BossMulBahamutNormal = 6.75;
    public const double BossMulBahamutHard = 33.75;   // Normal ×5
    public const double BossMulDefaultHard = 4;
    public const int BossCooldownSeconds = 30;
    public const int AutoSweepUnlockKills = 100;  // 每个难度独立计数
    public const int AutoChallengeUnlockKills = 10;

    // ===== 六属性玛格纳（Hard）=====
    public const int MagnaHardHp = 708000;
    public const int MagnaHardAtk = 13000;
    public const double MagnaHardSrRateMul = 4;     // SR 掉率 ×4
    public const double MagnaSsrRate = 0.002;       // 玛格纳 SSR 每件 0.2%

    // ===== 天司 =====
    public const int TenshiMaxLevel = 40;
    public const int TenshiAwakenedMaxLevel = 80;
    public const int TenshiBossHp = 600000;
    public const int TenshiBossAtk = 10000;
    public const double TenshiElementBonus = 0.05;  // 克制属性敌人 +5%（拥有即生效）
    public const double TenshiElementBonusII = 0.10; // 突破后 +10%

    // ===== 巴哈姆特武器 =====
    public const int BahaMaxLevel = 40;
    public const int BahaAwakenedMaxLevel = 80;
    public const int BahaCraftDecayedNeed = 40;
    public const int BahaCraftHornNeed = 5;
    public const double BahaSkillHp = 0.002;        // 创世之龙的加护 I：每把对应类型武器 生命 +0.2%
    public const double BahaSkillHpHard = 0.003;    // 加护 II：+0.3%

    // ===== 巴哈姆特（黑银之翼，Hard）=====
    public const int BahaHardHp = 1500000;
    public const int BahaHardAtk = 10000;
    public const double PurpleHornRate = 0.0005;    // 紫电角 0.05%

    // ===== 宇宙长剑（调停翼刃）=====
    public const int MedWingBaseAtk = 300;
    public const int MedWingBaseHp = 300;
    public const double MedWingPerLevel = 1.01;     // 每级 ×1.01
    public const int MedWingMaxLevel = 40;
    public const int MedWingAwakenedMaxLevel = 80;
    public const int MedWingFinalMaxLevel = 100;    // 第二次突破 80 → 100

    // ===== 星晶兽（属性岛第 6 关）=====
    public const int StarBeastMatNeed = 10000;      // 对应空岛材料
    public const int StarBeastElemNeed = 50000;     // 对应晶之元素
    public const int StarBeastSilverNeed = 50000;   // 银天之辉
    public const int StarBeastVerdantNeed = 50;     // 苍翠的结晶
    public const int StarBeastFeatherNeed = 50;     // 对应羽毛（光/暗为拆分 25+25）

    // ===== 星晶兽 · 哪吒（风之岛第 6 关）=====
    public const int NezhaHp = 2_000_000;
    public const int NezhaAtk = 10_000;
    public const double NezhaPhase2HpRatio = 0.50;   // ≤50% 触发火焰长枪 +20%
    public const double NezhaPhase3HpRatio = 0.10;   // ≤10% 狂暴提升至 +50%
    public const double NezhaFireLanceBase = 0.20;
    public const double NezhaFireLanceEnraged = 0.25;
    public const double NezhaSongAtk = 0.08;         // 楚歌：风武器攻击 +8%（前 8 回合）
    public const int NezhaSongTurns = 8;
    public const double NezhaTyrantAtk = 0.15;       // 暴君：风武器攻击 +15%
    public const double NezhaTyrantHpDown = 0.10;    // 暴君：风武器生命 -10%（两把加算 → 0.8）

    // ===== 背包材料键名 =====
    public static readonly string[] BagMaterialKeys =
    {
        "amberEyes", "earthBud", "seaFan", "sunCore", "starPlankton", "darkShard",
        "windCrystal", "earthCrystal", "waterCrystal", "fireCrystal", "lightCrystal", "darkCrystal",
        "silverGlory", "bahamutHorn", "verdantCrystal",
        "fireFeather", "waterFeather", "earthFeather", "windFeather",
    };

    // ===== 存档字段（核心）=====
    // currentIdx, unlockedIdx, progressKills, kills, gold, level, exp, points,
    // fates, dungeonCleared, expBuyLevel, dropBuyLevel, silverGlory, bahamutHorn,
    // rank, bossCooldowns, achievements, equipped, weaponFilter, notifyUpgrade,
    // hidePointLog, autoAdvance, hideAchievements, autoBoss, autoSweep, hiddenBosses,
    // islandIdx, islandId, islandProgress, earthProgress, seaProgress, sunProgress,
    // lightProgress, darkProgress, expertProgress, jobs, currentJob, mapView,
    // weapons, decayedWeapons, ...
}
