// ==========================================
// --- 全路線全時段動態生成輔助工具 ---
// ==========================================

// 1 站相關輔助生成器
function generateHourlyPattern1站(startHour, endHour) {
    const result = [];
    for (let h = startHour; h <= endHour; h++) {
        const prefix = String(h).padStart(2, '0');
        const mins = ["05", "15", "25", "35", "45", "55"];
        mins.forEach(m => {
            result.push({ t: `${prefix}${m}`, r_key: "a", c: "route-a", tc: "t-a" });
        });
    }
    return result;
}

// 2 站相關輔助生成器
function generateStrict5MinPattern(startHour, endHour) {
    const result = [];
    const minutesPattern = ["02", "07", "12", "17", "22", "27", "32", "37", "42", "47", "52", "57"];
    for (let h = startHour; h <= endHour; h++) {
        const prefix = String(h).padStart(2, '0');
        minutesPattern.forEach(m => {
            const isEven = parseInt(m) % 2 === 0;
            result.push({
                t: `${prefix}${m}`,
                r_key: isEven ? "b" : "a",
                c: isEven ? "route-b" : "route-a",
                tc: isEven ? "t-b" : "t-a"
            });
        });
    }
    return result;
}

function generateHourlyPattern2站平日日間(startHour, endHour) {
    const result = [];
    for (let h = startHour; h <= endHour; h++) {
        const prefix = String(h).padStart(2, '0');
        const mins = ["02", "07", "14", "19", "26", "31", "38", "43", "50", "55"];
        mins.forEach((m, idx) => {
            const r = idx % 2 === 0 ? "b" : "a";
            result.push({ t: `${prefix}${m}`, r_key: r, c: `route-${r}`, tc: `t-${r}` });
        });
    }
    return result;
}

function generateHourlyPattern2站平日黃昏段(startHour, endHour) {
    const result = [];
    for (let h = startHour; h <= endHour; h++) {
        const prefix = String(h).padStart(2, '0');
        const mins = ["02", "07", "12", "17", "22", "27", "32", "37", "42", "47", "52", "57"];
        mins.forEach((m, idx) => {
            const r = idx % 2 === 0 ? "b" : "a";
            result.push({ t: `${prefix}${m}`, r_key: r, c: `route-${r}`, tc: `t-${r}` });
        });
    }
    return result;
}

// 3 站相關輔助生成器
// (注意：此處保留你原稿前半段的 05, 17, 29 還是後半段的 00, 12, 24？以下先以 05, 17 為範例，若後半段才對請自行修正)
function generateHourlyPattern3站平日日間(startHour, endHour) {
    const result = [];
    for (let h = startHour; h <= endHour; h++) {
        const prefix = String(h).padStart(2, '0');
        const mins = ["05", "17", "29", "41", "53"];
        mins.forEach(m => {
            result.push({ t: `${prefix}${m}`, r_key: "a", c: "route-a", tc: "t-a" });
        });
    }
    return result;
}

function generateHourlyPattern3站平日十鐘段(startHour, endHour) {
    const result = [];
    for (let h = startHour; h <= endHour; h++) {
        const prefix = String(h).padStart(2, '0');
        const mins = ["00", "10", "20", "30", "40", "50"];
        mins.forEach(m => {
            result.push({ t: `${prefix}${m}`, r_key: "b", c: "route-b", tc: "t-b" });
        });
    }
    return result;
}

function generateHourlyPattern3站假日十鐘段(startHour, endHour) {
    return generateHourlyPattern3站平日十鐘段(startHour, endHour);
}


// ==========================================
// --- 各站核心數據庫定義 ---
// ==========================================
const ALL_STATIONS_DATA = {
    "1": {
        lastBus: "01:15",
        schedule: {
            weekday: [
                { t: "0542", r_key: "circular", c: "route-circular", tc: "t-circular" },
                { t: "0548", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "0600", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "0607", r_key: "circular", c: "route-circular", tc: "t-circular" },
                { t: "0615", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "0622", r_key: "circular", c: "route-circular", tc: "t-circular" },
                { t: "0630", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "0637", r_key: "circular", c: "route-circular", tc: "t-circular" },
                { t: "0645", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "0652", r_key: "circular", c: "route-circular", tc: "t-circular" },
                { t: "0701", r_key: "c", c: "route-c", tc: "t-c" }, { t: "0709", r_key: "c", c: "route-c", tc: "t-c" },
                { t: "0717", r_key: "c", c: "route-c", tc: "t-c" }, { t: "0725", r_key: "c", c: "route-c", tc: "t-c" },
                { t: "0733", r_key: "c", c: "route-c", tc: "t-c" }, { t: "0741", r_key: "c", c: "route-c", tc: "t-c" },
                { t: "0749", r_key: "c", c: "route-c", tc: "t-c" }, { t: "0755", r_key: "c", c: "route-c", tc: "t-c" },
                { t: "0801", r_key: "c", c: "route-c", tc: "t-c" }, { t: "0807", r_key: "c", c: "route-c", tc: "t-c" },
                { t: "0815", r_key: "c", c: "route-c", tc: "t-c" }, { t: "0823", r_key: "c", c: "route-c", tc: "t-c" },
                { t: "0831", r_key: "c", c: "route-c", tc: "t-c" }, { t: "0838", r_key: "c", c: "route-c", tc: "t-c" },
                { t: "0845", r_key: "c", c: "route-c", tc: "t-c" }, { t: "0855", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "0905", r_key: "a", c: "route-a", tc: "t-a" }, { t: "0917", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "0929", r_key: "a", c: "route-a", tc: "t-a" }, { t: "0941", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "0953", r_key: "a", c: "route-a", tc: "t-a" }, { t: "1005", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "1017", r_key: "a", c: "route-a", tc: "t-a" }, { t: "1029", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "1041", r_key: "a", c: "route-a", tc: "t-a" }, { t: "1053", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "1105", r_key: "a", c: "route-a", tc: "t-a" }, { t: "1117", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "1129", r_key: "a", c: "route-a", tc: "t-a" }, { t: "1141", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "1153", r_key: "a", c: "route-a", tc: "t-a" }, { t: "1205", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "1217", r_key: "a", c: "route-a", tc: "t-a" }, { t: "1229", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "1241", r_key: "a", c: "route-a", tc: "t-a" }, { t: "1253", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "1305", r_key: "a", c: "route-a", tc: "t-a" }, { t: "1317", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "1329", r_key: "a", c: "route-a", tc: "t-a" }, { t: "1341", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "1353", r_key: "a", c: "route-a", tc: "t-a" }, { t: "1405", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "1417", r_key: "a", c: "route-a", tc: "t-a" }, { t: "1429", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "1441", r_key: "a", c: "route-a", tc: "t-a" }, { t: "1453", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "1505", r_key: "a", c: "route-a", tc: "t-a" }, { t: "1515", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "1525", r_key: "a", c: "route-a", tc: "t-a" }, { t: "1535", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "1545", r_key: "a", c: "route-a", tc: "t-a" }, { t: "1555", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "1605", r_key: "a", c: "route-a", tc: "t-a" }, { t: "1615", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "1625", r_key: "a", c: "route-a", tc: "t-a" }, { t: "1635", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "1645", r_key: "a", c: "route-a", tc: "t-a" }, { t: "1655", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "1705", r_key: "a", c: "route-a", tc: "t-a" }, { t: "1715", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "1725", r_key: "a", c: "route-a", tc: "t-a" }, { t: "1735", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "1745", r_key: "a", c: "route-a", tc: "t-a" }, { t: "1755", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "1805", r_key: "a", c: "route-a", tc: "t-a" }, { t: "1815", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "1825", r_key: "a", c: "route-a", tc: "t-a" }, { t: "1835", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "1845", r_key: "a", c: "route-a", tc: "t-a" }, { t: "1854", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "1901", r_key: "a", c: "route-a", tc: "t-a" }, { t: "1908", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "1915", r_key: "a", c: "route-a", tc: "t-a" }, { t: "1922", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "1929", r_key: "a", c: "route-a", tc: "t-a" }, { t: "1936", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "1943", r_key: "a", c: "route-a", tc: "t-a" }, { t: "1950", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "1957", r_key: "a", c: "route-a", tc: "t-a" }, { t: "2005", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "2015", r_key: "a", c: "route-a", tc: "t-a" }, { t: "2025", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "2035", r_key: "a", c: "route-a", tc: "t-a" }, { t: "2045", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "2055", r_key: "a", c: "route-a", tc: "t-a" }, { t: "2105", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "2115", r_key: "a", c: "route-a", tc: "t-a" }, { t: "2125", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "2135", r_key: "a", c: "route-a", tc: "t-a" }, { t: "2145", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "2155", r_key: "a", c: "route-a", tc: "t-a" }, { t: "2205", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "2215", r_key: "a", c: "route-a", tc: "t-a" }, { t: "2225", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "2235", r_key: "a", c: "route-a", tc: "t-a" }, { t: "2245", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "2255", r_key: "a", c: "route-a", tc: "t-a" }, { t: "2300", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "2312", r_key: "a", c: "route-a", tc: "t-a" }, { t: "2324", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "2336", r_key: "a", c: "route-a", tc: "t-a" }, { t: "2348", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "0000", r_key: "a", c: "route-a", tc: "t-a" }, { t: "0015", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "0030", r_key: "a", c: "route-a", tc: "t-a" }, { t: "0045", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "0100", r_key: "a", c: "route-a", tc: "t-a" }, { t: "0115", r_key: "a", c: "route-a", tc: "t-a" }
            ],
            weekend: [
                { t: "0540", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "0600", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "0607", r_key: "circular", c: "route-circular", tc: "t-circular" },
                { t: "0622", r_key: "circular", c: "route-circular", tc: "t-circular" },
                { t: "0630", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "0637", r_key: "circular", c: "route-circular", tc: "t-circular" },
                { t: "0652", r_key: "circular", c: "route-circular", tc: "t-circular" },
                ...generateHourlyPattern1站(7, 21),
                { t: "2205", r_key: "a", c: "route-a", tc: "t-a" }, { t: "2215", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "2225", r_key: "a", c: "route-a", tc: "t-a" }, { t: "2235", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "2245", r_key: "a", c: "route-a", tc: "t-a" }, { t: "2255", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "2300", r_key: "a", c: "route-a", tc: "t-a" }, { t: "2312", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "2324", r_key: "a", c: "route-a", tc: "t-a" }, { t: "2336", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "2348", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "0000", r_key: "a", c: "route-a", tc: "t-a" }, { t: "0015", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "0030", r_key: "a", c: "route-a", tc: "t-a" }, { t: "0045", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "0100", r_key: "a", c: "route-a", tc: "t-a" }, { t: "0115", r_key: "a", c: "route-a", tc: "t-a" }
            ]
        }
    },
    "2": {
        lastBus: "01:17",
        schedule: {
            weekday: [
                { t: "0540", r_key: "circular", c: "route-circular", tc: "t-circular" },
                { t: "0550", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "0602", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "0605", r_key: "circular", c: "route-circular", tc: "t-circular" },
                { t: "0617", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "0620", r_key: "circular", c: "route-circular", tc: "t-circular" },
                { t: "0632", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "0635", r_key: "circular", c: "route-circular", tc: "t-circular" },
                { t: "0647", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "0650", r_key: "circular", c: "route-circular", tc: "t-circular" },
                { t: "0702", r_key: "d", c: "route-d", tc: "t-d" }, { t: "0710", r_key: "d", c: "route-d", tc: "t-d" },
                { t: "0718", r_key: "d", c: "route-d", tc: "t-d" }, { t: "0726", r_key: "d", c: "route-d", tc: "t-d" },
                { t: "0732", r_key: "d", c: "route-d", tc: "t-d" }, { t: "0738", r_key: "d", c: "route-d", tc: "t-d" },
                { t: "0744", r_key: "d", c: "route-d", tc: "t-d" }, { t: "0750", r_key: "d", c: "route-d", tc: "t-d" },
                { t: "0756", r_key: "d", c: "route-d", tc: "t-d" }, { t: "0802", r_key: "d", c: "route-d", tc: "t-d" },
                { t: "0808", r_key: "d", c: "route-d", tc: "t-d" }, { t: "0814", r_key: "d", c: "route-d", tc: "t-d" },
                { t: "0820", r_key: "d", c: "route-d", tc: "t-d" }, { t: "0826", r_key: "d", c: "route-d", tc: "t-d" },
                { t: "0832", r_key: "d", c: "route-d", tc: "t-d" }, { t: "0839", r_key: "d", c: "route-d", tc: "t-d" },
                { t: "0846", r_key: "d", c: "route-d", tc: "t-d" }, { t: "0852", r_key: "b", c: "route-b", tc: "t-b" },
                { t: "0857", r_key: "a", c: "route-a", tc: "t-a" },
                ...generateHourlyPattern2站平日日間(9, 13), 
                { t: "1402", r_key: "b", c: "route-b", tc: "t-b" }, { t: "1407", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "1414", r_key: "b", c: "route-b", tc: "t-b" }, { t: "1419", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "1426", r_key: "b", c: "route-b", tc: "t-b" }, { t: "1431", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "1438", r_key: "b", c: "route-b", tc: "t-b" }, { t: "1443", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "1452", r_key: "b", c: "route-b", tc: "t-b" }, { t: "1455", r_key: "a", c: "route-a", tc: "t-a" },
                ...generateHourlyPattern2站平日黃昏段(15, 19), 
                ...generateStrict5MinPattern(20, 22),
                { t: "2302", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "2314", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "2326", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "2338", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "2350", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "0002", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "0017", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "0032", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "0047", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "0102", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "0117", r_key: "a", c: "route-a", tc: "t-a" }
            ],
            weekend: [
                { t: "0542", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "0602", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "0605", r_key: "circular", c: "route-circular", tc: "t-circular" },
                { t: "0620", r_key: "circular", c: "route-circular", tc: "t-circular" },
                { t: "0632", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "0635", r_key: "circular", c: "route-circular", tc: "t-circular" },
                { t: "0650", r_key: "circular", c: "route-circular", tc: "t-circular" },
                ...generateStrict5MinPattern(7, 22),
                { t: "2302", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "2314", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "2326", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "2338", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "2350", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "0002", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "0017", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "0032", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "0047", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "0102", r_key: "a", c: "route-a", tc: "t-a" },
                { t: "0117", r_key: "a", c: "route-a", tc: "t-a" }
            ]
        }
    },
    "3": {
        lastBus: "22:50",
        schedule: {
            weekday: [
                { t: "0700", r_key: "e", c: "route-e", tc: "t-e" }, { t: "0710", r_key: "e", c: "route-e", tc: "t-e" },
                { t: "0720", r_key: "e", c: "route-e", tc: "t-e" }, { t: "0730", r_key: "e", c: "route-e", tc: "t-e" },
                { t: "0740", r_key: "e", c: "route-e", tc: "t-e" }, { t: "0750", r_key: "e", c: "route-e", tc: "t-e" },
                { t: "0800", r_key: "e", c: "route-e", tc: "t-e" }, { t: "0810", r_key: "e", c: "route-e", tc: "t-e" },
                { t: "0820", r_key: "e", c: "route-e", tc: "t-e" }, { t: "0830", r_key: "e", c: "route-e", tc: "t-e" },
                { t: "0840", r_key: "e", c: "route-e", tc: "t-e" }, { t: "0850", r_key: "b", c: "route-b", tc: "t-b" },
                ...generateHourlyPattern3站平日日間(9, 14),
                ...generateHourlyPattern3站平日十鐘段(15, 17),
                { t: "1800", r_key: "b", c: "route-b", tc: "t-b" }, { t: "1810", r_key: "b", c: "route-b", tc: "t-b" },
                { t: "1820", r_key: "b", c: "route-b", tc: "t-b" }, { t: "1830", r_key: "b", c: "route-b", tc: "t-b" },
                { t: "1840", r_key: "b", c: "route-b", tc: "t-b" }, { t: "1850", r_key: "b", c: "route-b", tc: "t-b" },
                { t: "1858", r_key: "b", c: "route-b", tc: "t-b" },
                { t: "1905", r_key: "b", c: "route-b", tc: "t-b" }, { t: "1912", r_key: "b", c: "route-b", tc: "t-b" },
                { t: "1919", r_key: "b", c: "route-b", tc: "t-b" }, { t: "1926", r_key: "b", c: "route-b", tc: "t-b" },
                { t: "1933", r_key: "b", c: "route-b", tc: "t-b" }, { t: "1940", r_key: "b", c: "route-b", tc: "t-b" },
                { t: "1947", r_key: "b", c: "route-b", tc: "t-b" }, { t: "1954", r_key: "b", c: "route-b", tc: "t-b" },
                ...generateHourlyPattern3站平日十鐘段(20, 22)
            ],
            weekend: [
                ...generateHourlyPattern3站假日十鐘段(7, 22)
            ]
        }
    }
};
window.ALL_STATIONS_DATA = ALL_STATIONS_DATA;