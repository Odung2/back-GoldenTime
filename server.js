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
    const { userName, updateTime, usageStatsUpdateTime, frame } = req.body;

    // 입력값 유효성 검사
    if (!userName || !updateTime || !usageStatsUpdateTime || frame === undefined) {
        return res.status(400).send('Missing required fields');
    }

    try {
        // 새로운 업데이트 시간 항목 생성
        const newUpdateTime = await prisma.updateTime.create({
            data: {
                userName,
                updateTime,
                usageStatsUpdateTime,
                frame
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
    console.log('request from front api usage_data');
    const { sendObjStr } = req.body;

    try {
        switch (sendObjStr) {
            case "UserInfo":
                // UserInfo 처리 로직
                // ...
                break;

            case "UsageTimeDaily":
                // 일일 앱 사용 시간 통계 업데이트 처리 로직
                const { userName, date, timeSlot, usageTime, success, incentive, frame, period } = req.body;
                const dailyStatResult = await prisma.dailyStat.create({
                    data: {
                        user: userName,
                        date: date,
                        timeSlot: timeSlot,
                        usageTime: usageTime,
                        success: success,
                        incentive: incentive,
                        frame: frame,
                        period: period,
                        updated: new Date().toISOString()
                    }
                });
                res.status(200).json(dailyStatResult);
                break;

            case "UsageStatsRawData":
                // 앱 사용 통계 업데이트 처리 로직
                const { userName: userNameUsage, date: dateUsage, timeSlot: timeSlotUsage, appPackage, usageTime: usageTimeUsage, frame: frameUsage, period: periodUsage } = req.body;
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
                break;

            default:
                res.status(400).send("Invalid sendObjStr value");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error processing request");
    }
});
// // ACTION_INITIAL_DATA_UPDATE 요청 처리
// app.post('/usage_data', async (req, res) => {
//     // req.body에는 사용자 정보와 초기 데이터가 포함되어 있음
//     // 데이터베이스에 저장하는 로직을 구현
//     console.log('request from front api usage_data');
//     const { sendObjStr } = req.body;
//     try {
//         if (sendObjStr === "UserInfo") {
//             const { UserName, Frame } = req.body;
//             const result = await prisma.userInfo.create({
//                 data: {
//                     user: UserName,
//                     frame: Frame,
//                     updated: new Date().toISOString()
//                 }
//             });
//             return res.status(200).json(result); // Send response and return immediately
//         } else if (sendObjStr === "UsageTimeDaily") {
//             const { userName, date, timeSlot, usageTime, success, incentive, frame, period } = req.body;
//             const result = await prisma.dailyStat.create({
//                 data: {
//                     user: userName,
//                     date: date,
//                     timeSlot: timeSlot,
//                     usageTime: usageTime,
//                     success: success,
//                     incentive: incentive,
//                     frame: frame,
//                     period: period,
//                     updated: new Date().toISOString()
//                 }
//             });
//             return res.status(200).json(result); // Send response and return immediately
//         } else if (sendObjStr === "UsageStatsRawData") {
//             const { userName, date, timeSlot, appPackage, usageTime, frame, period } = req.body;
//             const result = await prisma.usageStat.create({
//                 data: {
//                     user: userName,
//                     date: date,
//                     timeSlot: timeSlot,
//                     appPackage: appPackage,
//                     usageTime: usageTime,
//                     frame: frame,
//                     period: period,
//                     updated: new Date().toISOString()
//                 }
//             });
//             return res.status(200).json(result); // Send response and return immediately
//         } else {
//             // If sendObjStr is not recognized
//             return res.status(400).send("Invalid sendObjStr value");
//         }
//     } catch (error) {
//         console.error(error);
//         return res.status(500).send("Error processing request"); // Send error response and return immediately
//     }
// });


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
