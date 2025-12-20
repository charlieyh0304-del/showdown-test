const CACHE_NAME = 'showdown-referee-v44';
const urlsToCache = ['./', './index.html', './manifest.json'];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(names => 
      Promise.all(names.map(name => name !== CACHE_NAME && caches.delete(name)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.url.includes('firebase')) return;
  event.respondWith(
    caches.match(event.request).then(response => 
      response || fetch(event.request)
    )
  );
});
```

4. **"Commit changes"** 클릭

#### 3-5. icons 폴더 + 아이콘 업로드
1. **"Add file"** → **"Upload files"** 클릭
2. 아이콘 생성기에서 만든 **icons 폴더 전체**를 드래그앤드롭
   - 또는 icons 폴더 안의 **8개 PNG 파일**을 드래그앤드롭
3. ⚠️ **중요**: 파일명 앞에 `icons/` 경로 확인
   - GitHub가 자동으로 폴더 생성함
   - 만약 경로가 안 보이면, 아래 방법 사용

#### 3-5 (대안): icons 폴더 수동 생성
1. **"Add file"** → **"Create new file"**
2. 파일 이름에 `icons/icon-72.png` 입력 → `/` 치면 폴더 자동 생성
3. 취소하고 다시 **"Add file"** → **"Upload files"**
4. 이제 icons 폴더가 보임 → 아이콘 파일들 업로드

---

### Step 4: 배포 확인 (1-2분 대기)

1. **저장소** → **Settings** 탭
2. 좌측 메뉴 **"Pages"** 클릭
3. **"Your site is live at https://..."** 확인
4. 링크 클릭하여 접속

---

### Step 5: PWA 설치 테스트

#### Android (Chrome)
1. 배포된 URL 접속
2. 주소창에 **설치 아이콘** 또는 **⋮ 메뉴** → **"앱 설치"**

#### iOS (Safari)
1. 배포된 URL 접속  
2. 하단 **공유 버튼** (□↑) 탭
3. **"홈 화면에 추가"** 선택

---

### 📁 최종 저장소 구조
```
저장소/
├── index.html          ✅ 교체됨
├── manifest.json       ✅ 새로 추가
├── service-worker.js   ✅ 새로 추가
└── icons/              ✅ 새로 추가
    ├── icon-72.png
    ├── icon-96.png
    ├── icon-128.png
    ├── icon-144.png
    ├── icon-152.png
    ├── icon-192.png
    ├── icon-384.png
└── icon-512.png    
