[https://data.mnd.go.kr/user/boardList.action?command=view&page=1&boardId=O\_60283&boardSeq=O\_274083&titleId=null&siteId=data&id=data\_120100000000&column=null&search=null](https://data.mnd.go.kr/user/boardList.action?command=view&page=1&boardId=O_60283&boardSeq=O_274083&titleId=null&siteId=data&id=data_120100000000&column=null&search=null)

# 강철군인

육군 신체측정 데이터를 기반으로 하여 정확도 높은 통계 및 지표 제공, 각종 운동법 공유 서비스 제공, 웹 앱(Web App)으로 제작되어 PC, 모바일 등 다양한 환경에서 설치과정 없이 간편하게 접근, 이용 가능한 서비스입니다. (모바일 Chrome에 최적화되어있습니다.)

<iframe src="https://www.youtube.com/embed/0EtwRB7gK5E" width="560" height="315" frameborder="0" allowfullscreen=""></iframe>

---

## 기능 및 특징

상기 서비스는 크게 4개의 화면(프로필, 신체 정보분석, 운동 프로그램, 설정)으로 나누어져 있고, 3가지의 부가기능(다크 모드, 한/영 언어 선택, 애니메이션 비활성화)을 지원합니다.

### 프로필

각 사용자가 입력한 정보를 토대로 BMI 지수 계산, 최근 체중 변화량, 목표 체중 달성량 등 개인별 유용한 정보를 안내합니다. 신체측정 업데이트, 목표 체중 설정 또한 가능합니다.

### 신체 정보분석

국방 Open API를 통해 불러온 10만 개의 육군 신체측정 데이터를 막대그래프로 시각화하여 사용자에게 보여줍니다. 신체 정보는 총 5가지(신장, 체중, BMI 지수, 머리둘레, 다리 길이)로 구성되어 있으며, 각기 다른 그래프를 가집니다. 추가적으로 사용자가 입력한 신체 정보가 어느 범위에 속하는지를 표현해주어, 각 사용자가 본인이 어느 정도의 위치에 속해있는지를 간편하게 알 수 있습니다.  
또한, 신체 정보를 등록/갱신할 때마다 신체 기록을 추가하여, 선형 그래프로 신체 변화량을 시각화하여 보여줍니다.

### 운동 프로그램

여러 운동 종목들의 운동 방법, 루틴 등을 안내합니다.

### 설정

다크 모드, 한/영 언어 선택, 애니메이션 비활성화를 설정할 수 있습니다. 또한, 입력한 신체 데이터 삭제, 전체 신체 데이터 초기화 기능을 사용할 수 있습니다.

---

## 구현 방법

Amazon 사의 Lightsail 서비스를 이용하여 Linux 기반의 Ubuntu 운영체제 서버를 구축하였고, Node.JS 를 사용하여 Server 측 프로그램을 작성하였습니다. Client 측에 보여줄 Web App은 React.JS 를 사용하여 개발하였습니다.

### Server(Backend)

국방 Open API를 통해 10만 개의 육군 신체측정 데이터를 불러옵니다. 이때, Client의 요청이 들어올 때마다 10만 개의 데이터를 불러 들여오는 것은 매우 비효율적입니다. 게다가, API를 통해 제공되는 데이터의 형식은 XML인데, Server는 Javascript 위에서 작동하기 때문에 Json Parsing 과정을 거쳐주어야 하는 등 시간과 자원을 소모할 수밖에 없습니다.

이 문제점들을 해결하기 위해, 매일 특정 시간마다 API를 통해 데이터를 불러 들여오고, Json Pasing 및 갱신하여 Server side에 데이터를 저장합니다. 이후 Client 요청 시 저장된 데이터를 바로 전송하여 시간과 자원을 최소화하였습니다.

운동 프로그램의 운동법을 소개해주는 기능에서는 Google 사의 Google Cloud Platform API 서비스를 사용하였는데, 상기 API는 발급받은 API key마다 일일 요청횟수가 제한되어 있습니다. 이 제한사항을 극복하기 위해, 위와 마찬가지로 매일 특정 시간마다 Server side에 데이터를 갱신하고, Client 요청 시 저장된 데이터를 전송해주는 방식을 사용하였습니다.

### Client(Frontend)

서비스 특성상 사용자 개개인이 본인이 신체 정보를 입력해야 하는데, 이는 민감한 개인정보가 될 수 있습니다. 만일 각 사용자가 입력한 신체 정보를 Server side Database에 저장하게 된다면, 악성 사용자의 Server 불법 접근으로 인한 개인정보 탈취 위험이 발생할 수 있습니다. 따라서, 각 사용자가 입력한 신체 정보를 Server side에 저장하는 것이 아닌, 각 Client의 브라우저(Local Storage)에 저장하는 방식을 사용하여 개인정보를 안전하게 보호할 수 있는 방식을 채택하였습니다.

또한, Progressive Web App(PWA) 기술을 적용하여 더욱이 하나의 Application처럼 사용할 수 있도록 하였습니다. 모바일 Chrome 브라우저를 기준으로 \[우상단 메뉴 > 홈 화면에 추가\]를 통해 이를 사용할 수 있습니다.
