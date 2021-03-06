import * as Discord from "discord.js"
import { readFile, unwatchFile } from "fs";
import * as utils from "./utils"

import * as http from "http"
import * as https from "https"
import * as canvas from "canvas";

import * as difflib from "difflib"
import { promises, LookupOneOptions } from "dns";
import { parse } from "path";
import { parentPort } from "worker_threads";
import { Stream, Writable } from "stream";


let queues = [

    {
        "queueId": 0,
        "map": "Custom games",
        "description": null,
        "notes": null
    },

    {

        "queueId": 2,

        "map": "Summoner's Rift",

        "description": "5v5 Blind Pick games",

        "notes": "Deprecated in patch 7.19 in favor of queueId 430"

    },

    {

        "queueId": 4,

        "map": "Summoner's Rift",

        "description": "5v5 Ranked Solo games",

        "notes": "Deprecated in favor of queueId 420"

    },

    {

        "queueId": 6,

        "map": "Summoner's Rift",

        "description": "5v5 Ranked Premade games",

        "notes": "Game mode deprecated"

    },

    {

        "queueId": 7,

        "map": "Summoner's Rift",

        "description": "Co-op vs AI games",

        "notes": "Deprecated in favor of queueId 32 and 33"

    },

    {

        "queueId": 8,

        "map": "Twisted Treeline",

        "description": "3v3 Normal games",

        "notes": "Deprecated in patch 7.19 in favor of queueId 460"

    },

    {

        "queueId": 9,

        "map": "Twisted Treeline",

        "description": "3v3 Ranked Flex games",

        "notes": "Deprecated in patch 7.19 in favor of queueId 470"

    },

    {

        "queueId": 14,

        "map": "Summoner's Rift",

        "description": "5v5 Draft Pick games",

        "notes": "Deprecated in favor of queueId 400"

    },

    {

        "queueId": 16,

        "map": "Crystal Scar",

        "description": "5v5 Dominion Blind Pick games",

        "notes": "Game mode deprecated"

    },

    {

        "queueId": 17,

        "map": "Crystal Scar",

        "description": "5v5 Dominion Draft Pick games",

        "notes": "Game mode deprecated"

    },
    {
        "queueId": 25,
        "map": "Crystal Scar",
        "description": "Dominion Co-op vs AI games",
        "notes": "Game mode deprecated"
    },
    {
        "queueId": 31,
        "map": "Summoner's Rift",
        "description": "Co-op vs AI Intro Bot games",
        "notes": "Deprecated in patch 7.19 in favor of queueId 830"
    },
    {
        "queueId": 32,
        "map": "Summoner's Rift",
        "description": "Co-op vs AI Beginner Bot games",
        "notes": "Deprecated in patch 7.19 in favor of queueId 840"
    },
    {

        "queueId": 33,

        "map": "Summoner's Rift",

        "description": "Co-op vs AI Intermediate Bot games",

        "notes": "Deprecated in patch 7.19 in favor of queueId 850"

    },

    {

        "queueId": 41,

        "map": "Twisted Treeline",

        "description": "3v3 Ranked Team games",

        "notes": "Game mode deprecated"

    },

    {

        "queueId": 42,

        "map": "Summoner's Rift",

        "description": "5v5 Ranked Team games",

        "notes": "Game mode deprecated"

    },

    {

        "queueId": 52,

        "map": "Twisted Treeline",

        "description": "Co-op vs AI games",

        "notes": "Deprecated in patch 7.19 in favor of queueId 800"

    },

    {

        "queueId": 61,

        "map": "Summoner's Rift",

        "description": "5v5 Team Builder games",

        "notes": "Game mode deprecated"

    },

    {

        "queueId": 65,

        "map": "Howling Abyss",

        "description": "5v5 ARAM games",

        "notes": "Deprecated in patch 7.19 in favor of queueId 450"

    },

    {

        "queueId": 67,

        "map": "Howling Abyss",

        "description": "ARAM Co-op vs AI games",

        "notes": "Game mode deprecated"

    },

    {

        "queueId": 70,

        "map": "Summoner's Rift",

        "description": "One for All games",

        "notes": "Deprecated in patch 8.6 in favor of queueId 1020"

    },

    {

        "queueId": 72,

        "map": "Howling Abyss",

        "description": "1v1 Snowdown Showdown games",

        "notes": null

    },

    {

        "queueId": 73,

        "map": "Howling Abyss",

        "description": "2v2 Snowdown Showdown games",

        "notes": null

    },

    {

        "queueId": 75,

        "map": "Summoner's Rift",

        "description": "6v6 Hexakill games",

        "notes": null

    },

    {

        "queueId": 76,

        "map": "Summoner's Rift",

        "description": "Ultra Rapid Fire games",

        "notes": null

    },

    {

        "queueId": 78,

        "map": "Howling Abyss",

        "description": "One For All: Mirror Mode games",

        "notes": null

    },

    {

        "queueId": 83,

        "map": "Summoner's Rift",

        "description": "Co-op vs AI Ultra Rapid Fire games",

        "notes": null

    },

    {

        "queueId": 91,

        "map": "Summoner's Rift",

        "description": "Doom Bots Rank 1 games",

        "notes": "Deprecated in patch 7.19 in favor of queueId 950"

    },

    {

        "queueId": 92,

        "map": "Summoner's Rift",

        "description": "Doom Bots Rank 2 games",

        "notes": "Deprecated in patch 7.19 in favor of queueId 950"

    },

    {

        "queueId": 93,

        "map": "Summoner's Rift",

        "description": "Doom Bots Rank 5 games",

        "notes": "Deprecated in patch 7.19 in favor of queueId 950"

    },

    {

        "queueId": 96,

        "map": "Crystal Scar",

        "description": "Ascension games",

        "notes": "Deprecated in patch 7.19 in favor of queueId 910"

    },

    {

        "queueId": 98,

        "map": "Twisted Treeline",

        "description": "6v6 Hexakill games",

        "notes": null

    },

    {

        "queueId": 100,

        "map": "Butcher's Bridge",

        "description": "5v5 ARAM games",

        "notes": null

    },

    {

        "queueId": 300,

        "map": "Howling Abyss",

        "description": "Legend of the Poro King games",

        "notes": "Deprecated in patch 7.19 in favor of queueId 920"

    },

    {

        "queueId": 310,

        "map": "Summoner's Rift",

        "description": "Nemesis games",

        "notes": null

    },

    {

        "queueId": 313,

        "map": "Summoner's Rift",

        "description": "Black Market Brawlers games",

        "notes": null

    },

    {

        "queueId": 315,

        "map": "Summoner's Rift",

        "description": "Nexus Siege games",

        "notes": "Deprecated in patch 7.19 in favor of queueId 940"

    },

    {

        "queueId": 317,

        "map": "Crystal Scar",

        "description": "Definitely Not Dominion games",

        "notes": null

    },

    {

        "queueId": 318,

        "map": "Summoner's Rift",

        "description": "ARURF games",

        "notes": "Deprecated in patch 7.19 in favor of queueId 900"

    },

    {

        "queueId": 325,

        "map": "Summoner's Rift",

        "description": "All Random games",

        "notes": null

    },

    {

        "queueId": 400,

        "map": "Summoner's Rift",

        "description": "5v5 Draft Pick games",

        "notes": null

    },

    {

        "queueId": 410,

        "map": "Summoner's Rift",

        "description": "5v5 Ranked Dynamic games",

        "notes": "Game mode deprecated in patch 6.22"

    },

    {

        "queueId": 420,

        "map": "Summoner's Rift",

        "description": "5v5 Ranked Solo games",

        "notes": null

    },

    {

        "queueId": 430,

        "map": "Summoner's Rift",

        "description": "5v5 Blind Pick games",

        "notes": null

    },

    {

        "queueId": 440,

        "map": "Summoner's Rift",

        "description": "5v5 Ranked Flex games",

        "notes": null

    },

    {

        "queueId": 450,

        "map": "Howling Abyss",

        "description": "5v5 ARAM games",

        "notes": null

    },

    {

        "queueId": 460,

        "map": "Twisted Treeline",

        "description": "3v3 Blind Pick games",

        "notes": "Deprecated in patch 9.23"

    },

    {

        "queueId": 470,

        "map": "Twisted Treeline",

        "description": "3v3 Ranked Flex games",

        "notes": "Deprecated in patch 9.23"

    },

    {

        "queueId": 600,

        "map": "Summoner's Rift",

        "description": "Blood Hunt Assassin games",

        "notes": null

    },

    {

        "queueId": 610,

        "map": "Cosmic Ruins",

        "description": "Dark Star: Singularity games",

        "notes": null

    },

    {

        "queueId": 700,

        "map": "Summoner's Rift",

        "description": "Clash games",

        "notes": null

    },

    {

        "queueId": 800,

        "map": "Twisted Treeline",

        "description": "Co-op vs. AI Intermediate Bot games",

        "notes": "Deprecated in patch 9.23"

    },

    {

        "queueId": 810,

        "map": "Twisted Treeline",

        "description": "Co-op vs. AI Intro Bot games",

        "notes": "Deprecated in patch 9.23"

    },

    {

        "queueId": 820,

        "map": "Twisted Treeline",

        "description": "Co-op vs. AI Beginner Bot games",

        "notes": null

    },

    {

        "queueId": 830,

        "map": "Summoner's Rift",

        "description": "Co-op vs. AI Intro Bot games",

        "notes": null

    },

    {

        "queueId": 840,

        "map": "Summoner's Rift",

        "description": "Co-op vs. AI Beginner Bot games",

        "notes": null

    },

    {

        "queueId": 850,

        "map": "Summoner's Rift",

        "description": "Co-op vs. AI Intermediate Bot games",

        "notes": null

    },

    {

        "queueId": 900,

        "map": "Summoner's Rift",

        "description": "URF games",

        "notes": null

    },

    {

        "queueId": 910,

        "map": "Crystal Scar",

        "description": "Ascension games",

        "notes": null

    },

    {

        "queueId": 920,

        "map": "Howling Abyss",

        "description": "Legend of the Poro King games",

        "notes": null

    },

    {

        "queueId": 940,

        "map": "Summoner's Rift",

        "description": "Nexus Siege games",

        "notes": null

    },

    {

        "queueId": 950,

        "map": "Summoner's Rift",

        "description": "Doom Bots Voting games",

        "notes": null

    },

    {

        "queueId": 960,

        "map": "Summoner's Rift",

        "description": "Doom Bots Standard games",

        "notes": null

    },

    {

        "queueId": 980,

        "map": "Valoran City Park",

        "description": "Star Guardian Invasion: Normal games",

        "notes": null

    },

    {

        "queueId": 990,

        "map": "Valoran City Park",

        "description": "Star Guardian Invasion: Onslaught games",

        "notes": null

    },

    {

        "queueId": 1000,

        "map": "Overcharge",

        "description": "PROJECT: Hunters games",

        "notes": null

    },

    {

        "queueId": 1010,

        "map": "Summoner's Rift",

        "description": "Snow ARURF games",

        "notes": null

    },

    {

        "queueId": 1020,

        "map": "Summoner's Rift",

        "description": "One for All games",

        "notes": null

    },

    {

        "queueId": 1030,

        "map": "Crash Site",

        "description": "Odyssey Extraction: Intro games",

        "notes": null

    },

    {

        "queueId": 1040,

        "map": "Crash Site",

        "description": "Odyssey Extraction: Cadet games",

        "notes": null

    },

    {

        "queueId": 1050,

        "map": "Crash Site",

        "description": "Odyssey Extraction: Crewmember games",

        "notes": null

    },

    {

        "queueId": 1060,

        "map": "Crash Site",

        "description": "Odyssey Extraction: Captain games",

        "notes": null

    },

    {

        "queueId": 1070,

        "map": "Crash Site",

        "description": "Odyssey Extraction: Onslaught games",

        "notes": null

    },

    {

        "queueId": 1090,

        "map": "Convergence",

        "description": "Teamfight Tactics games",

        "notes": null

    },

    {

        "queueId": 1100,

        "map": "Convergence",

        "description": "Ranked Teamfight Tactics games",

        "notes": null

    },

    {

        "queueId": 1110,

        "map": "Convergence",

        "description": "Teamfight Tactics Tutorial games",

        "notes": null

    },

    {

        "queueId": 1200,

        "map": "Nexus Blitz",

        "description": "Nexus Blitz games",

        "notes": "Deprecated in patch 9.2"

    },

    {

        "queueId": 2000,

        "map": "Summoner's Rift",

        "description": "Tutorial 1",

        "notes": null

    },

    {

        "queueId": 2010,

        "map": "Summoner's Rift",

        "description": "Tutorial 2",

        "notes": null

    },

    {

        "queueId": 2020,

        "map": "Summoner's Rift",

        "description": "Tutorial 3",

        "notes": null

    }

]



interface sumSpellImage {
    full: string;
    sprite: string;
    group: string;
    x: number;
    y: number;
    w: number;
    h: number;
}

interface sumSpellJSON {
    type: string,
    version: string,
    data: { [key: string]: sumSpell }
}

interface sumSpell {
    id: string;
    name: string;
    description: string;
    tooltip: string;
    maxrank: number;
    cooldown: number[];
    cooldownBurn: string;
    cost: number[];
    costBurn: string;
    datavalues: object;
    effect: number[][];
    effectBurn: string[];
    vars: any[];
    key: string;
    summonerLevel: number;
    modes: string[];
    costType: string;
    maxammo: string;
    range: number[];
    rangeBurn: string;
    image: sumSpellImage;
    resource: string;
}

export interface Rune {
    id: number;
    key: string;
    icon: string;
    name: string;
    shortDesc: string;
    longDesc: string;
}

export interface Slot {
    runes: Rune[];
}

export interface RuneCategory {
    id: number;
    key: string;
    icon: string;
    name: string;
    slots: Slot[];
}

interface championJSON {
    type: string,
    format: string,
    version: string,
    data: { [key: string]: championObj }
}
interface infoChampion {
    attack: number;
    defense: number;
    magic: number;
    difficulty: number;
}

interface imagesChampion {
    full: string;
    sprite: string;
    group: string;
    x: number;
    y: number;
    w: number;
    h: number;
}

interface statsChampion {
    hp: number;
    hpperlevel: number;
    mp: number;
    mpperlevel: number;
    movespeed: number;
    armor: number;
    armorperlevel: number;
    spellblock: number;
    spellblockperlevel: number;
    attackrange: number;
    hpregen: number;
    hpregenperlevel: number;
    mpregen: number;
    mpregenperlevel: number;
    crit: number;
    critperlevel: number;
    attackdamage: number;
    attackdamageperlevel: number;
    attackspeedperlevel: number;
    attackspeed: number;
}

interface championObj {
    version: string;
    id: string;
    key: string;
    name: string;
    title: string;
    blurb: string;
    info: infoChampion;
    image: imagesChampion;
    tags: string[];
    partype: string;
    stats: statsChampion;
}





interface summoner {
    id: string,
    accountId: string,
    puuid: string,
    name: string,
    profileIconId: number,
    summonerLevel: number
}

interface leaugeMatch {
    platformId: string,
    gameId: number,
    champion: number,
    queue: number,
    season: number,
    timestamp: number,
    role: string,
    lane: string
}
interface TeamBansDto {
    championId: number,
    pickTurn: number
}
interface BannedChampion {
    championId: number,
    pickTurn: number,
    teamId: number
}

interface TeamStatsDto {
    towerKills: number,
    riftHeraldKills: number,
    firstBlood: boolean,
    inhibitorKills: number,
    bans: Array<TeamBansDto>,
    firstBaron: boolean,
    firstDragon: boolean,
    dominionVictoryScore: number,
    dragonKills: number,
    baronKills: number,
    firstInhibitor: boolean,
    firstTower: boolean,
    vilemawKills: number,
    firstRiftHerald: boolean,
    teamId: number,
    win: string
}

interface ParticipantStatsDto {
    item0: number,
    item2: number,
    totalUnitsHealed: number,
    item1: number,
    largestMultiKill: number,
    goldEarned: number,
    firstInhibitorKill: boolean,
    physicalDamageTaken: number,
    nodeNeutralizeAssist: number,
    totalPlayerScore: number,
    champLevel: number,
    damageDealtToObjectives: number,
    totalDamageTaken: number,
    neutralMinionsKilled: number,
    deaths: number,
    tripleKills: number,
    magicDamageDealtToChampions: number,
    wardsKilled: number,
    pentaKills: number,
    damageSelfMitigated: number,
    largestCriticalStrike: number,
    nodeNeutralize: number,
    totalTimeCrowdControlDealt: number,
    firstTowerKill: boolean,
    magicDamageDealt: number,
    totalScoreRank: number,
    nodeCapture: number,
    wardsPlaced: number,
    totalDamageDealt: number,
    timeCCingOthers: number,
    magicalDamageTaken: number,
    largestKillingSpree: number,
    totalDamageDealtToChampions: number,
    physicalDamageDealtToChampions: number,
    neutralMinionsKilledTeamJungle: number,
    totalMinionsKilled: number,
    firstInhibitorAssist: boolean,
    visionWardsBoughtInGame: boolean,
    objectivePlayerScore: number,
    kills: number,
    firstTowerAssist: boolean,
    combatPlayerScore: number,
    inhibitorKills: number,
    turretKills: number,
    participantId: number,
    trueDamageTaken: number,
    firstBloodAssist: boolean,
    nodeCaptureAssist: number,
    assists: number,
    teamObjective: number,
    altarsNeutralized: number,
    goldSpent: number,
    damageDealtToTurrets: number,
    altarsCaptured: number,
    win: boolean,
    totalHeal: number,
    unrealKills: number,
    visionScore: number,
    physicalDamageDealt: number,
    firstBloodKill: boolean,
    longestTimeSpentLiving: number,
    killingSprees: number,
    sightWardsBoughtInGame: number,
    trueDamageDealtToChampions: number,
    neutralMinionsKilledEnemyJungle: number,
    doubleKills: number,
    trueDamageDealt: number,
    quadraKills: number,
    item4: number,
    item3: number,
    item6: number,
    item5: number,
    playerScore0: number,
    playerScore1: number,
    playerScore2: number,
    playerScore3: number,
    playerScore4: number,
    playerScore5: number,
    playerScore6: number,
    playerScore7: number,
    playerScore8: number,
    playerScore9: number,
    perk0: number, //rune 
    perk0Var1: number,
    perk0Var2: number,
    perk0Var3: number,
    perk1: number, //rune 
    perk1Var1: number,
    perk1Var2: number,
    perk1Var3: number,
    perk2: number, //rune 
    perk2Var1: number,
    perk2Var2: number,
    perk2Var3: number,
    perk3: number, //rune 
    perk3Var1: number,
    perk3Var2: number,
    perk3Var3: number,
    perk4: number, //rune 
    perk4Var1: number,
    perk4Var2: number,
    perk4Var3: number,
    perk5: number, //rune 
    perk5Var1: number,
    perk5Var2: number,
    perk5Var3: number,
    perkPrimaryStyle: number,
    perkSubStyle: number
}

interface ParticipantTimelineDto {
    participantId: number,
    csDiffPerMinDeltas: Map<string, number>,
    damageTakenPerMinDeltas: Map<string, number>,
    role: string,
    damageTakenDiffPerMinDeltas: Map<string, number>,
    xpPerMinDeltas: Map<string, number>,
    xpDiffPerMinDeltas: Map<string, number>,
    lane: string,
    creepsPerMinDeltas: Map<string, number>,
    goldPerMinDeltas: Map<string, number>
}
interface MasteryDto {
    rank: number,
    masteryId: number
}

interface ParticipantDto {
    participantId: number,
    championId: number,
    runes: Array<object>
    stats: ParticipantStatsDto,
    teamId: number, // 100 for blue side. 200 for red side. 
    timeline: ParticipantTimelineDto,
    spell1Id: number,
    spell2Id: number,
    highestAchievedSeasonTier: string,
    masteries: Array<MasteryDto>
}


interface PlayerDto {
    profileIcon: number,
    accountId: string,
    matchHistoryUri: string,
    currentAccountId: string,
    currentPlatformId: string,
    summonerName: string,
    summonerId: string,
    platformId: string
}

interface ParticipantIdentityDto {
    participantId: number,
    player: PlayerDto
}
interface MatchDto {
    gameId: number
    participantIdentities: Array<ParticipantIdentityDto>,
    queueId: number,
    gameType: string,
    gameDuration: number,
    teams: Array<TeamStatsDto>,
    platformId: string,
    gameCreation: number,
    seasonId: number,
    gameVersion: string,
    mapId: number,
    gameMode: string,
    participants: Array<ParticipantDto>
}
interface Perks {
    perkIds: Array<number>,
    perkStyle: number,
    perkSubStyle: number
}
interface GameCustomizationObject {

    category: string,
    content: string
}
interface CurrentGameParticipant {
    championId: number,
    perks: Perks,
    profileIconId: number,
    bot: boolean,
    teamId: number,
    summonerName: string,
    summonerId: string,
    spell1Id: number,
    spell2Id: number,
    gameCustomizationObjects: Array<GameCustomizationObject>
}

interface CurrentGameInfo {
    gameId: number,
    gameType: string,
    gameStartTime: number,
    mapId: number,
    gameLength: number,
    platformId: number,
    gameMode: string,
    bannedChampions: Array<BannedChampion>,
    gameQueueConfigId: number,
    participants: Array<CurrentGameParticipant>
}


let dddragonBaseURL = ""
let items = {}
let champions: championJSON
let runes: Array<RuneCategory>
let version = ""
let sumSpells: sumSpellJSON

let lolHttpsOptions = {
    "headers": {
        "X-Riot-Token": utils.tokens.riot
    }
}

https.get('https://ddragon.leagueoflegends.com/api/versions.json', (res: http.IncomingMessage) => {
    let data = ""
    res.on("data", (chunck: string) => {
        data = data + chunck
    })
    res.on("end", () => {

        version = JSON.parse(data)[0]
        dddragonBaseURL = `https://ddragon.leagueoflegends.com/cdn/${version}`
        console.log(`latest lol patch : ${version}`)
        https.get(dddragonBaseURL + "/data/fr_FR/item.json", (res: http.IncomingMessage) => {
            let data = ""
            res.on("data", (chunck) => {
                data = data + chunck
            })
            res.on("end", () => {
                items = JSON.parse(data).data

            })
        })
        https.get(dddragonBaseURL + "/data/fr_FR/champion.json", (res: http.IncomingMessage) => {
            let data = ""
            res.on("data", (chunck) => {
                data = data + chunck
            })
            res.on("end", () => {
                champions = JSON.parse(data)
            })
        })

        https.get(dddragonBaseURL + "/data/fr_FR/runesReforged.json", (res) => {

            let data = ""
            res.on("data", (chunck) => {
                data = data + chunck
            })
            res.on("end", () => {
                runes = JSON.parse(data)
            })
        })
        https.get(dddragonBaseURL + "/data/fr_FR/summoner.json", (res) => {

            let data = ""
            res.on("data", (chunck) => {
                data = data + chunck
            })
            res.on("end", () => {
                sumSpells = JSON.parse(data)
            })
        })
    })
})

function item_search(msg: Discord.Message) {
    const args = utils.parse(msg).slice(3)
    if (args.length == 0) {
        msg.channel.send("Please provide a name")
    }
    else {
        const name = args.toString()
        let embed = new Discord.RichEmbed()
        embed.title = `Résultat de la recherche : ${name}`
        for (let item in items) {

            // @ts-ignore
            if (items[item].colloq.toLowerCase().indexOf(name.toLowerCase()) >= 0) {
                // @ts-ignore
                embed.addField(items[item].name, `${items[item].gold.total} PO`)
            }
        }
        msg.channel.send("", embed)


    }
}
function item_stat(msg: Discord.Message) {
    const args = utils.parse(msg).slice(3)
    if (args.length == 0) {
        msg.channel.send("Please provide a name")
    } else {
        const nom = args.toString()
        let max_ratio = 0
        let max_ratio_key = ""
        for (let item in items) {
            //@ts-ignore
            let colloq = items[item].colloq.split(";")
            let len = colloq.length
            for (let i = 0; i < len; i++) {
                let s = new difflib.SequenceMatcher(null, colloq[i].toLowerCase(), nom.toLowerCase())
                // @ts-ignore
                let ratio = s.ratio()
                if (ratio > max_ratio) {
                    max_ratio = ratio
                    max_ratio_key = item
                }
            }
        }
        if (max_ratio == 0) {
            msg.channel.send("Impossible de trouver l'item")
        } else {
            let embed = new Discord.RichEmbed()
            // @ts-ignore
            embed.title = items[max_ratio_key].name
            // @ts-ignore
            embed.setThumbnail(`http://ddragon.leagueoflegends.com/cdn/${version}/img/item/${max_ratio_key}.png`)
            // @ts-ignore
            let description = items[max_ratio_key].description
            description = description.replace(/<br>/g, "\n")
            description = description.replace(/<groupLimit>/g, "__")
            description = description.replace(/<\/groupLimit>/g, "__")
            description = description.replace(/<unique>/g, "**")
            description = description.replace(/<\/unique>/g, "**")
            description = description.replace(/<active>/g, "__**")
            description = description.replace(/<\/active>/g, "**__")
            description = description.replace(/<stats>/g, "```")
            description = description.replace(/<\/stats>/g, "```")
            description = description.replace(/<rules>/g, "__")
            description = description.replace(/<\/rules>/g, "__")
            description = description.replace(/<passive>/g, "**")
            description = description.replace(/<\/passive>/g, "**")
            description = description.replace(/<consumable>/g, "**")
            description = description.replace(/<\/consumable>/g, "**")
            description = description.replace(/<u>/g, "__")
            description = description.replace(/<\/u>/g, "__")
            embed.addField("Description", description)
            msg.channel.send("", embed)
        }
    }

}


function item(msg: Discord.Message): void {
    let args = utils.parse(msg).slice(2)
    if (args.length == 0) {
        msg.channel.send("Usage : item search <item> | item stat <item> ")

    } else {
        const sous_commande = args[0]
        switch (sous_commande) {
            case "search":
                item_search(msg)
                break
            case "stat":
                item_stat(msg)
                break
            case "stats":
                item_stat(msg)
                break
        }
    }
}

interface spectatorStatus {
    objective: number, current: number, cv: canvas.Canvas, summonerName: string, gameMode: string, color: string, startedAt: number
}

function loadedImageEvent(msg: Discord.Message, status: spectatorStatus) {
    status.current += 1
    if (status.objective == status.current) {
        let f = new Discord.Attachment(status.cv.createPNGStream(), "tab.png")
        let embed = new Discord.RichEmbed()
        embed.setTitle(`${status.summonerName}’s ${status.gameMode}`)
        embed.setImage("attachment://tab.png")
        embed.setColor(status.color)
        embed.setTimestamp(status.startedAt)
        embed.setFooter("Game started at")

        msg.channel.send("", { embed: embed, files: [f] })
        msg.channel.stopTyping()
    }
    // console.log(status.current.toString() + ":" + status.objective.toString())

}


function spectate(msg: Discord.Message) {
    let summonerName = utils.parse(msg).slice(2).join(" ")
    summonerByName(summonerName).then((value) => {
        spectator(value.id).then((result) => {
            msg.channel.startTyping()

            let cv = canvas.createCanvas(1600, 1200)
            let ctx = cv.getContext("2d")
            let specStatus: spectatorStatus = {
                objective: result.participants.length * 9 + result.bannedChampions.length,
                current: 0,
                cv: cv,
                summonerName: value.name,
                gameMode: "",
                color: "#8B0000",
                startedAt: result.gameStartTime
            }

            if (result.gameQueueConfigId == 0 || result.gameQueueConfigId == undefined) {
                specStatus.gameMode = "Custom Game"
            } else {

                queues.forEach((value, index) => {
                    if (value.queueId == result.gameQueueConfigId) {
                        if (value.description) {
                            specStatus.gameMode = value.description.replace("games", "game")

                        }
                    }
                })
            }


            let blueY = 0
            let redY = 0
            let blueX = 0
            let redX = 800
            let bans = ""
            for (let i = 0; i < result.bannedChampions.length; ++i) {
                let championId = result.bannedChampions[i].championId
                for (let p in champions.data) {
                    let curr = champions.data[p]


                    if (curr.key == championId.toString()) {
                        let x = blueX
                        let y = 1075
                        if (result.bannedChampions[i].teamId == 200) {
                            x = redX
                            redX += 100
                        } else {
                            blueX += 100
                        }

                        bans = bans + curr.name + "\n"
                        let img = new canvas.Image()
                        img.src = dddragonBaseURL + `/img/champion/${curr.image.full}`
                        img.onload = function () {
                            ctx.drawImage(img, x, y, 100, 100)
                            loadedImageEvent(msg, specStatus)

                        }
                    }
                }
            }
            if (bans) {

                ctx.lineWidth = 2
                ctx.fillStyle = "#afafaf"
                ctx.font = "bold 40px sans-serif "
                ctx.fillText("Bans : ", 10, 1040)
            }

            blueX = 0
            redX = 800

            for (let i = 0; i < result.participants.length; ++i) {
                let current = result.participants[i]
                let championId = current.championId.toString()
                let championName = ""
                let championIcon = ""
                let sumSpell1 = ""
                let sumSpell2 = ""
                let sumSpell1Icon = ""
                let sumSpell2Icon = ""
                let mainPerk = current.perks.perkIds[0]

                let perks: Array<Rune> = []
                perks.fill({
                    id: 0,
                    key: "",
                    icon: "",
                    name: "",
                    shortDesc: "",
                    longDesc: ""
                }, current.perks.perkIds.length)

                let mainPerkIcon = ""

                if (current.summonerId == value.id && current.teamId == 100) {
                    specStatus.color = "#1E90FF"

                }

                for (let j = 0; j < runes.length; ++j) {
                    let currPage = runes[j]
                    for (let a = 0; a < currPage.slots.length; ++a) {
                        let currSlot = currPage.slots[a]
                        for (let b = 0; b < currSlot.runes.length; ++b) {
                            let currRune = currSlot.runes[b]
                            let resFind = current.perks.perkIds.lastIndexOf(currRune.id)
                            if (resFind >= 0) {
                                perks[resFind] = currRune
                            }
                            if (currRune.id == mainPerk) {

                                mainPerkIcon = currRune.icon
                            }

                        }

                    }
                }



                for (let p in sumSpells.data) {
                    let curr = sumSpells.data[p]
                    if (current.spell1Id.toString() == curr.key) {

                        sumSpell1Icon = curr.image.full
                    }
                    if (current.spell2Id.toString() == curr.key) {

                        sumSpell2Icon = curr.image.full

                    }
                }


                for (let p in champions.data) {
                    let curr = champions.data[p]

                    if (curr.key == championId) {

                        championIcon = curr.image.full
                    }
                }


                let x = blueX
                let y = blueY

                if (current.teamId == 100) {
                    blueY += 200

                }
                else {
                    x = redX
                    y = redY
                    redY += 200

                }

                ctx.lineWidth = 2
                ctx.fillStyle = "#afafaf"
                ctx.font = "bold 40px sans-serif "
                ctx.fillText(current.summonerName, x + 260, y + 60)

                let championImage = new canvas.Image()
                championImage.src = dddragonBaseURL + `/img/champion/${championIcon}`
                championImage.onerror = function () {
                    msg.channel.send("error loading image")
                }
                championImage.onload = function () {
                    ctx.drawImage(championImage, x + 80, y + 25, 150, 150)
                    loadedImageEvent(msg, specStatus)
                }

                let sumSpell1Image = new canvas.Image()
                sumSpell1Image.src = dddragonBaseURL + `/img/spell/${sumSpell1Icon}`
                sumSpell1Image.onload = function () {
                    ctx.drawImage(sumSpell1Image, x, y + 25, 65, 65)
                    loadedImageEvent(msg, specStatus)
                }

                let sumSpell2Image = new canvas.Image()
                sumSpell2Image.src = dddragonBaseURL + `/img/spell/${sumSpell2Icon}`
                sumSpell2Image.onload = function () {
                    ctx.drawImage(sumSpell2Image, x, y + 100, 65, 65)
                    loadedImageEvent(msg, specStatus)
                }

                perks.forEach((value, index) => {
                    let perkImage = new canvas.Image()
                    perkImage.src = `https://ddragon.leagueoflegends.com/cdn/img/${value.icon}`
                    if (index == 0) {

                        perkImage.onload = function () {
                            ctx.drawImage(perkImage, x + 240, y + 75, 100, 100)
                            loadedImageEvent(msg, specStatus)
                        }
                    } else {
                        perkImage.onload = function () {
                            ctx.drawImage(perkImage, x + 240 + 100 + 52 * (index - 1), y + 100, 50, 50)
                            loadedImageEvent(msg, specStatus)
                        }
                    }
                })






            }




        }, (reason) => {
            msg.channel.send("Summoner not in game")
        })
    }, (reason) => {
        msg.channel.send(JSON.stringify(reason))
    })
}
function spectator(summonerId: string) {
    let promise: Promise<CurrentGameInfo> = new Promise(function (resolve, reject) {
        console.log(summonerId)
        https.get(`https://euw1.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${summonerId}`, lolHttpsOptions, (res: http.IncomingMessage) => {
            let data = ""
            if (res.statusCode != 200) {
                reject("not found")
            }
            res.on("data", (chunck: string) => {
                data = data + chunck
            })
            res.on("end", () => {
                let parsed = JSON.parse(data)
                if (parsed["gameId"] || parsed.gameId) {
                    let out = <CurrentGameInfo>parsed
                    resolve(out)
                }
                else {
                    reject("data corrupted")
                }
            })

        })
    })
    return promise

}




function matchInfo(matchId: number) {

    let promise: Promise<Array<MatchDto>> = new Promise(function (resolve, reject) {

        https.get(`https://euw1.api.riotgames.com/lol/match/v4/matches/${matchId}`, lolHttpsOptions, (res: http.IncomingMessage) => {
            let data = ""
            if (res.statusCode != 200) {
                reject("not found")
            }
            res.on("data", (chunck: string) => {
                data = data + chunck
            })
            res.on("end", () => {
                let parsed = JSON.parse(data)
                if (parsed.length && parsed.length > 0) {
                    let out = <Array<MatchDto>>parsed
                    resolve(out)
                }
                else {
                    reject("data corrupted")
                }
            })

        })
    })
    return promise

}



function getMatcheList(accountId: string) {
    let promise: Promise<Array<leaugeMatch>> = new Promise(function (resolve, reject) {

        https.get(`https://euw1.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}`, lolHttpsOptions, (res: http.IncomingMessage) => {
            let data = ""
            if (res.statusCode != 200) {
                reject("not found")
            }
            res.on("data", (chunck: string) => {
                data = data + chunck
            })
            res.on("end", () => {
                let parsed = JSON.parse(data)
                if (parsed.length && parsed.length > 0) {
                    let out = <Array<leaugeMatch>>parsed
                    resolve(out)
                }
                else {
                    reject("data corrupted")
                }
            })

        })
    })
    return promise
}


function summonerByName(name: string): Promise<summoner> {
    let promise: Promise<summoner> = new Promise(function (resolve, reject) {
        https.get(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}`, lolHttpsOptions, (res: http.IncomingMessage) => {
            let data = ""
            if (res.statusCode != 200) {
                reject("not found")
            }
            res.on("data", (chunck: string) => {
                data = data + chunck
            })
            res.on("end", () => {
                let parsed = JSON.parse(data)
                if (parsed.id || parsed["id"]) {
                    let out: summoner = {
                        id: parsed.id,
                        accountId: parsed.accountId,
                        puuid: parsed.puuid,
                        name: parsed.name,
                        profileIconId: parsed.profileIconId,
                        summonerLevel: parsed.summonerLevel
                    }
                    resolve(out)
                }
                else {
                    reject("summonner data corrupted")
                }
            })

        })
    })
    return promise
}



export function lol(msg: Discord.Message): void {
    let args = utils.parse(msg).slice(1)
    if (args.length == 0) {
        msg.reply("Lol module, for more info use `lol help`")
    }
    else {
        switch (args[0]) {
            case "item":
                item(msg)
                break
            case "items":
                item(msg)
                break
            case "spectate":
                spectate(msg)
                break
        }
    }

} 
