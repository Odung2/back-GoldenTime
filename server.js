// server.js

const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bodyParser = require('body-parser');

const app = express();
const prisma = new PrismaClient();
const port = 5000;


app.use(bodyParser.json());

// ACTION_INITIAL_DATA_UPDATE 요청 처리
app.post('/usage_data', (req, res) => {
    // req.body에는 사용자 정보와 초기 데이터가 포함되어 있음
    // 데이터베이스에 저장하는 로직을 구현
    console.log(req.body);
    res.status(200).send("Initial data updated successfully");
});

// ACTION_ONTIME_STATS_UPDATE 요청 처리
app.post('/usage_time_daily', (req, res) => {
    // req.body에는 일일 사용 시간 통계 데이터가 포함되어 있음
    // 데이터베이스에 저장하는 로직을 구현
    console.log(req.body);
    res.status(200).send("Usage time stats updated successfully");
});

// ACTION_APPUSAGE_STATS_UPDATE 요청 처리
app.post('/usage_stats_raw_data', (req, res) => {
    // req.body에는 앱 사용 통계 데이터가 포함되어 있음
    // 데이터베이스에 저장하는 로직을 구현
    console.log(req.body);
    res.status(200).send("App usage stats updated successfully");
});


app.post('/saveUserInfo', async (req, res) => {
    const { userName, frame } = req.body;

    try {
        const result = await prisma.userInfo.create({
            data: {
                user: userName,
                frame: frame,
                updated: new Date()
            }
        });
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error saving user info");
    }
});

app.post('/updateDailyUsageTimeLogData', async (req, res) => {
    const { userName, date, timeSlot, usageTime, success, incentive, frame, period } = req.body;

    try {
        const result = await prisma.dailyStat.create({
            data: {
                user: userName,
                date: date,
                timeSlot: timeSlot,
                usageTime: usageTime,
                success: success,
                incentive: incentive,
                frame: frame,
                period: period,
                updated: new Date()
            }
        });
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error updating daily usage time log data");
    }
});

app.post('/updateUsageStatsRawData', async (req, res) => {
    const { userName, date, timeSlot, appPackage, usageTime, frame, period } = req.body;

    try {
        const result = await prisma.usageStat.create({
            data: {
                user: userName,
                date: date,
                timeSlot: timeSlot,
                appPackage: appPackage,
                usageTime: usageTime,
                frame: frame,
                period: period,
                updated: new Date()
            }
        });
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error updating usage stats raw data");
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
