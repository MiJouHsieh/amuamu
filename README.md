# AMUAMU

AMUAMU 是一個簡易食譜記錄 App，靈感來自日常中常見的使用情境：
- 在 Instagram 看到食譜，但儲存在資料夾中難以查找和分類
- 習慣用便利貼簡單寫下步驟，但容易丟失
- 想在確認食材後，自動產生一份購物清單，避免遺漏所需材料

因此，想打造一個介面簡潔、操作直覺的 App ，來解決日常的不便，讓使用者可以更輕鬆的查找、記錄和實作食譜。

[Demo Link](https://amuamu-six.vercel.app/)

## 專案安裝流程

1. 確認本機已安裝 Node.js 與 npm
2. 將此專案從 GitHub 複製至本機

    ```
    git clone https://github.com/MiJouHsieh/amuamu.git
    ```

3. 進入專案資料夾

    ```
    cd amuamu
    ```

4. 安裝專案所需套件

    ```
    npm install
    ```

5. 啟動專案

    ```
    npm run dev
    ```

6. 結束專案運行

    ```
    Ctrl + C
    ```

## 產品功能
### 使用者不需註冊登入的功能

使用者在 AMUAMU 首頁:
- 可輸入關鍵字搜尋 - 有搭配模糊搜尋
- 可透過標籤搜尋 - 目前標籤只能單選
- 瀏覽任一食譜頁面
- 一鍵將所有食材加入購物車

使用者在購物車頁面:
- 可瀏覽總食材數量
- 可移除一項或全部食材
- 可瀏覽食材來自哪個食譜，可連結至該食譜頁面
- 可勾選已採購的項目

使用者在食譜頁:
- 若有多圖可以 carousel 瀏覽，若只有一張圖就沒有 carousel
- 可瀏覽是自己的食譜還是 AMU 夥伴建立的
- 可勾選已有的食材，或新增至購物車
- 可在步驟卡片上勾選已完成的步驟

### 使用者需註冊登入的功能

- 使用者可更新名稱
- 使用者可上傳照片

使用者在新增食譜頁:
- 可輸入食譜名稱、上傳多張照片、建立標籤、食材、步驟、筆記
- 上傳資料至 Supabase後，會呈顯該食譜頁面

使用者在食譜頁:
- 可進行編輯所有內容
- 編輯時文字有自動儲存功能
- 可選擇取消編輯、更新編輯、刪除食譜
- 可使用步驟教學
  - 選擇是否要計時，可作為參考紀錄
  - 計時可暫停或重置

## 使用的套件與技術

前端框架
- Vite: v6.2.0 – 專案建構工具
- React: v19.0.0 – 前端框架

表單處理
- [Formik v2.4.6](https://formik.org) – 表單狀態管理
- [Yup v1.6.1](https://github.com/jquense/yup) – 表單驗證
- [react-textarea-autosize v8.5.9](https://github.com/Andarist/react-textarea-autosize) – 自動調整高度的輸入框

UI / 動畫
- [react-icons v5.5.0](https://github.com/react-icons/react-icons) – icons
- [JS Confetti v0.12.0](https://github.com/loonywizard/js-confetti) – 完成動態效果
- [react-slick v0.30.3](https://github.com/akiran/react-slick) – Carousel component
- [slick-carousel v1.8.1](https://github.com/akiran/react-slick) – Carousel component
- [Swiper v11.2.8](https://github.com/nolimits4web/swiper) – slider

功能增強
- [Fuse.js v7.1.0](https://fusejs.io) – 模糊搜尋功能
- [uuid v11.1.0](https://github.com/uuidjs/uuid) – UUIDs
- [react-dropzone v14.3.8](https://react-dropzone.js.org) – 檔案拖曳上傳
- [react-hot-toast v2.5.2](https://github.com/timolins/react-hot-toast) – 訊息提示

 後端 / 資料庫
- [Supabase v1.35.7](https://supabase.com) – 後端服務與資料庫