## 自主學習系統

> 高中生使用的自主學習系統，與教學場域專家和教授一起討論需求，設計系統、前後端的實作、架設系統、現場學生使用測試並收集反饋，進而改善系統，系統提供鷹架輔助、專家知識，系統主要提供學生可以階段性的完成專案，建立個人或小組專案，按照流程進行專案，拖拉卡片規劃專案排程，想法牆討論，小組的聊天室等，輔助學生完成自主學習的專案

### Feature
前端 : Vite、React、Tailwind

後端 : Express、PostgreSQL、Docker、Nginx

* 使用 react query 處理 cache 與狀態管理。
* 使用 react-beautiful-dnd, vis.js實踐可拖拉的排程看板與想法牆的討論工具。
* 使用 websocket 來實現即時的回饋（看板、想法牆與小組聊天室）。
* 使用 Sequlize (orm) 進行資料庫操作，提高安全性與可維護性。

### 建立或加入專案
學生可以建立一個或多個專案，也可以選擇要單人或多人組隊。

![image](https://hackmd.io/_uploads/rk-gIPDz0.png =80%x)

每個專案會有獨特的邀請碼，可以透過輸入邀請碼加入別人建立好的專案。

![image](https://hackmd.io/_uploads/SkqvBvvfR.png =80%x)


### 專案看板
專案看板可以在上面建立修改卡片，在上面不同的欄位隨意拖拉，並會即時更新，同個專案底下的成員皆可以看見看板拖拉的狀況。

![image](https://hackmd.io/_uploads/rJE9NvPMC.png =80%x)

也可以貼上標籤，指派小組內的成員。
![image](https://hackmd.io/_uploads/HJ5TLPDGA.png =50%x)![image](https://hackmd.io/_uploads/By60UwDz0.png =50%x)

### 想法牆
小組可以在想法牆上討論，貼上便條紙，同個專案的小組成員皆可以檢視，也可以產生箭頭去指向便條紙延伸別人的想法。
![image](https://hackmd.io/_uploads/rkUk_PwzC.png =80%x)

### 反思日誌
讓學生寫下討論過程與反思的紀錄

![image](https://hackmd.io/_uploads/ByQnODPzR.png =80%x)

![image](https://hackmd.io/_uploads/H1Os_vPzA.png =50%x)

### 階段繳交任務
由於科學探究主要分成五個大階段，每個階段底下又有子階段，在每個階段皆有目標需要完成，並達成該階段的目標內容。而繳交完成後系統就會往下一個子階段前進。

![image](https://hackmd.io/_uploads/HkndFvvzC.png =80%x)

### 學習歷程檔案
學生繳交過的資料，可以在透過立成檔案來回顧並下載當初上傳的東西。
![image](https://hackmd.io/_uploads/B16hKvvzR.png)