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
app.use(bodyParser.json({ limit: '100mb' }));

// POST endpoint for inserting update time => OK
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
    if (req.body.UserInfo) { // => OK
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
            
            // UserInfo 생성 후, 해당 ID를 사용하여 UserIncentive 생성
            const userIncentive = await prisma.userIncentive.create({
                data: {
                    userId: userInfo.id, // 새로 생성된 UserInfo의 ID
                    incentiveFrame: "Constant" // 기본값 설정
                }
            });
    
            // 응답에 UserInfo 및 UserIncentive 데이터 포함
            res.status(200).json({ id: userInfo.id });
        } catch (error) {
            console.error(error);
            res.status(500).send("Error processing UserInfo request");
        }
    } else if (req.body.UsageTimeDaily) {
        console.log('request from front api "UsageTimeDaily"');
        const { UserName, Date: getdate, TimeSlot, UsageTime, Success, Incentive, Frame, Period } = req.body.UsageTimeDaily[0];
        try {
            const dailyStatResult = await prisma.dailyStat.create({
                data: {
                    user: UserName,
                    date: getdate,
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
        const { UserName, Date: getdate, TimeSlot, AppPackage, UsageTime, Frame, Period } = req.body.UsageStatsRawData[0];
        try {
            const usageStatResult = await prisma.usageStat.create({
                data: {
                    user: UserName,
                    date: getdate,
                    timeSlot: TimeSlot,
                    appPackage: AppPackage,
                    usageTime: UsageTime,
                    frame: Frame,
                    period: Period,
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

app.post('/usage_data/initial_usage_stats', async (req, res) => {
    const initialUsageStats = req.body; // 클라이언트로부터 받은 JSON 배열
    console.log('request from front api "initial_usage_stats"');
    // 받은 데이터가 배열인지 확인
    if (!Array.isArray(initialUsageStats)) {
        return res.status(400).send("Data must be an array of usage stats.");
    }

    try {
        // 받은 초기 사용 통계 데이터 배열을 반복하여 데이터베이스에 저장
        for (const data of initialUsageStats) {
            await prisma.usageStat.create({
                data: {
                    user: data.UserName,
                    date: data.Date,
                    timeSlot: data.TimeSlot,
                    appPackage: data.AppPackage,
                    usageTime: data.UsageTime,
                    frame: data.Frame,
                    period: data.Period,
                    updated: data.Updated,
                }
            });
        }
        // 모든 데이터가 성공적으로 저장되면, 성공 메시지를 응답으로 보냄
        res.status(200).send("Initial usage stats successfully saved.");
    } catch (error) {
        console.error("Error saving initial usage stats:", error);
        res.status(500).send("Error processing initial usage stats request.");
    }
});

// GET 요청으로 특정 사용자의 incentiveFrame 가져오기
app.get('/goldentime/userincentive/:userId', async (req, res) => {
    const userid = req.params.userId;
    console.log('request from front api "chooseNewIncentive"');
    try {
        const userIncentive = await prisma.userIncentive.findFirst({
            where: {
                userInfo: {
                    is: {
                        id: parseInt(userid),
                      }
                }
            },
            select: {
                incentiveFrame: true
            }
        });

        if (userIncentive) {
            res.status(200).json(userIncentive);
        } else {
            res.status(404).send('UserIncentive not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error processing request');
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
