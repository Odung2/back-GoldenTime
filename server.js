// server.js

const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bodyParser = require('body-parser');

const app = express();
const prisma = new PrismaClient();
const port = 5000;
const cors = require('cors');
app.use(cors());

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// POST endpoint for inserting update time
app.post('/goldentime/updatetime/insert', async (req, res) => {
    console.log('request from front api goldentime/updatetime/insert');
    const { UserName, UpdateTime, UsageStatsUpdateTime, Frame } = req.body.InsertUpdateTime[0];

    // 입력값 유효성 검사
    if (!UserName || !UpdateTime || !UsageStatsUpdateTime || Frame === undefined) {
        console.log('username: ', UserName);
        console.log('UpdateTime: ', UpdateTime);
        console.log('UsageStatsUpdateTime: ', UsageStatsUpdateTime);
        console.log('Frame: ', Frame);

        return res.status(400).send('Missing required fields');
    }

    try {
        // 새로운 업데이트 시간 항목 생성
        const newUpdateTime = await prisma.updateTime.create({
            data: {
                userName: UserName,
                updateTime: UpdateTime,
                usageStatsUpdateTime: UsageStatsUpdateTime,
                frame: Frame
            }
        });

        res.status(200).json(newUpdateTime);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred while inserting update time');
    }
});

// POST endpoint for daily statistics
app.post('/goldentime/dailystats', (req, res) => {
    // Handle the logic for daily stats
    console.log('request from front api goldentime/dailystats');
    console.log(req.body);
    res.status(200).send('Daily stats updated');
});

// POST endpoint for usage statistics
app.post('/goldentime/usagestats', (req, res) => {
    // Handle the logic for usage stats
    console.log('request from front api usagestats');
    console.log(req.body);
    res.status(200).send('Usage stats updated');
});

// // Error handling middleware
// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).send('Something broke!');
// });


// ACTION_INITIAL_DATA_UPDATE 요청 처리
app.post('/usage_data', async (req, res) => {
    // const { dataObj } = req.body;
    // console.log(dataObj);
    if (req.body.UserInfo) {
        console.log('request from front api "UserInfo"');

        const { UserName, Frame } = req.body.UserInfo[0];
        try {
            const userInfo = await prisma.userInfo.create({
                data: {
                    user: UserName,
                    frame: Frame,
                    updated: new Date().toISOString()
                }
            });
            res.status(200).json(userInfo);
        } catch (error) {
            console.error(error);
            res.status(500).send("Error processing UserInfo request");
        }
    } else if (req.body.UsageTimeDaily) {
        console.log('request from front api "UsageTimeDaily"');
        const { UserName, Date, TimeSlot, UsageTime, Success, Incentive, Frame, Period } = req.body.UsageTimeDaily[0];
        try {
            const dailyStatResult = await prisma.dailyStat.create({
                data: {
                    user: UserName,
                    date: Date,
                    timeSlot: TimeSlot,
                    usageTime: UsageTime,
                    success: Success,
                    incentive: Incentive,
                    frame: Frame,
                    period: Period,
                    updated: new Date().toISOString()
                }
            });
            res.status(200).json(dailyStatResult);
        } catch (error) {
            console.error(error);
            res.status(500).send("Error processing UsageTimeDaily request");
        }
    } else if (req.body.UsageStatsRawData) {
        console.log('request from front api "UsageStatsRawData"');
        const { userName: userNameUsage, date: dateUsage, timeSlot: timeSlotUsage, appPackage, usageTime: usageTimeUsage, frame: frameUsage, period: periodUsage } = req.body.UsageStatsRawData[0];
        try {
            const usageStatResult = await prisma.usageStat.create({
                data: {
                    user: userNameUsage,
                    date: dateUsage,
                    timeSlot: timeSlotUsage,
                    appPackage: appPackage,
                    usageTime: usageTimeUsage,
                    frame: frameUsage,
                    period: periodUsage,
                    updated: new Date().toISOString()
                }
            });
            res.status(200).json(usageStatResult);
        } catch (error) {
            console.error(error);
            res.status(500).send("Error processing UsageStatsRawData request");
        }
    } else {
        res.status(400).send("Invalid sendObjStr value");
    }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    try {
        await prisma.$connect();
        // res.send('Connected to the database successfully.');
        console.log('Database connection success:');
      } catch (error) {
        console.error('Database connection failed:', error);
        // res.status(500).send('Failed to connect to the database.');
      }
});
