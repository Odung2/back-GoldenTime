# Digital-wellbeing based on Multi-Objective Multi-Armed Bandit algorithm / 밴딧 알고리즘을 이용한 디지털 웰빙 앱(Backend)

| Dashboard | Notification |
|--------|--------|
|<img src="https://github.com/Odung2/javaNewWiseBandit/assets/103209237/cbe4002f-ae00-4b91-b355-efecb40f6b20" align="center" width="90%"/>|<img src="https://github.com/Odung2/javaNewWiseBandit/assets/103209237/3cd71c2a-1e91-492f-a2eb-4a4813857bc2" align="center" width="90%"/>|

One Paragraph of project description goes here / 프로젝트의 전반적인 내용에 대한 요약을 여기에 적습니다

## Getting Started / 어떻게 시작하나요?

```
git clone https://github.com/Odung2/back-GoldenTime.git
```

### Prerequisites / 선행 조건

아래 사항들이 설치가 되어있어야합니다.

#### Prisma
```
$ npx prisma -v
```
Environment variables loaded from .env
prisma                  : 5.8.0
@prisma/client          : 5.8.0
...

#### Node.js
```
$ node -v
```
v18.19.0

#### npm(Node.js)
```
$ npm -v
```
10.2.3

#### MySQL
```
mysql> SELECT VERSION();
```
+-------------------------+
| VERSION()               |
+-------------------------+
| 8.0.36-0ubuntu0.22.04.1 |
+-------------------------+

#### pm2
```
$ pm2 -v
```
5.3.0

### Installing / 설치

아래 사항들로 현 프로젝트에 관한 모듈들을 설치할 수 있습니다.

#### Installing mysql
```
sudo apt update
```
```
sudo apt install mysql-server-8.0.36
```

#### Installing Node.js
```
$ sudo apt update
```
```
$ sudo apt install nodejs
```

#### Installing npm
```
$ sudo apt install npm
```

#### Installing prisma
```
npm init
```
```
npm install prisma --save-dev
```

#### Installing pm2
```
$ npm install pm2 -g
```

## Running the tests / 테스트의 실행


### Incentive 방식 변경

```
npx prisma studio
```
Environment variables loaded from .env
Prisma schema loaded from prisma/schema.prisma
Prisma Studio is up on http://localhost:5555

해당 주소에 접속하면 아래와 같은 창이 뜬다.


incentiveFrame을 "Constant", "Random", "MAB" 셋 중 원하는 방식으로 작성하고, 위에 생긴 'Saving 1 Change' 버튼을 누르면 변경사항이 DB에도 반영된다.

* Prisma를 통해 MySQL DB를 관리하고 있기 때문에, MySQL에 직접 접근해서 DB의 레코드나 schema를 수정하면 안 된다.

#### Random Incentive

```
폰 사용 절제 미션을 성공하면 매 시간마다 200 ~ 800 사이의 임의의 Gold를 받습니다.
```

#### MAB Incentive

```
폰 사용 절제 미션을 성공하면 매 시간마다 Context 기반 200 ~ 800 사이의 Gold를 받습니다.
```

## Deployment / 배포


## Built With / 누구랑 만들었나요?

* [이름](링크) - 무엇 무엇을 했어요
* [Name](Link) - Create README.md

## Contributiong / 기여


## License / 라이센스

[KAIST IC LAB](https://ic.kaist.ac.kr/)

## Acknowledgments / 감사의 말

* Hat tip to anyone whose code was used / 코드를 사용한 모든 사용자들에게 팁
* Inspiration / 영감
* etc / 기타
