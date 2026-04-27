# Course Reward API — Frontend Integration Guide

> **Maqsad:** Ushbu hujjat frontendchi yoki AI vositaga kurs mukofotlari (reward) tizimini to'liq tushuntirib berish uchun yozilgan. UI qurishda shu hujjatdan foydalaning.

---

## Umumiy tushuncha

Kurs mukofotlari tizimi **uch qatlamdan** iborat:

```
1. RewardTemplate  →  mukofot shabloni (kutubxona)
2. CourseReward    →  shablon + lesson = to'g'ridan-to'g'ri mukofot
3. LessonRewardBox →  shablon + lesson + quti = ko'p mukofotli quti
```

**Qoida:** Template avval yaratiladi, keyin lesson/kursga biriktiriladi. Foydalanuvchi darsni tugatgach mukofotni "claim" (olish) qiladi.

---

## 1. Reward Templates

**Endpoint:** `GET /api/v1/course/reward/templates`

Barcha mavjud mukofot shablonlarini qaytaradi. Frontendda admin panelda "mukofot tanlash" dropdowni yoki ro'yxatini ko'rsatish uchun ishlatiladi.

### Query parametrlari (ixtiyoriy)

| Parametr | Tur | Tavsif |
|---|---|---|
| `type` | `RewardType` | Turga ko'ra filterlash |
| `isPartial` | `boolean` | Faqat partial / faqat oddiy |
| `search` | `string` | Sarlavha bo'yicha qidiruv |

### Response

```jsonc
[
  {
    "id": "uuid",
    "title": "Oltin tanga",
    "description": "100 ta tanga mukofot",
    "photo": "https://...",   // null bo'lishi mumkin
    "value": 100,             // COIN turida ball miqdori, boshqalarda null
    "type": "COIN",
    "isPartial": false,
    "parts": []               // isPartial=true bo'lsa qismlar ro'yxati
  },
  {
    "id": "uuid",
    "title": "Maxsus kubok",
    "description": "4 qismdan iborat kubok",
    "photo": "https://...",
    "value": null,
    "type": "PRODUCT",
    "isPartial": true,
    "parts": [
      { "id": "uuid", "title": "Qism 1", "photo": "https://...", "value": 1 },
      { "id": "uuid", "title": "Qism 2", "photo": "https://...", "value": 2 },
      { "id": "uuid", "title": "Qism 3", "photo": "https://...", "value": 3 },
      { "id": "uuid", "title": "Qism 4", "photo": "https://...", "value": 4 }
    ]
  }
]
```

### Reward turlari (`RewardType`)

| Qiymat | Tavsif | Qo'shimcha maydon |
|---|---|---|
| `COIN` | Ball (point) | `value` — miqdori |
| `PRODUCT` | Mahsulot sovg'a | — |
| `PROMOCODE` | Promokod | `code` (claim qilganda keladi) |
| `FILE` | Fayl/hujjat | `file` (claim qilganda keladi) |
| `EXTRA_FORTUNA_SPIN` | Qo'shimcha fortuna aylantirish | `extraSpin` — soni |
| `AMATEUR_CERTIFICATE` | Boshlang'ich sertifikat | `certificate`, `imageFile` |
| `PROGRESSIVE_CERTIFICATE` | Rivojlangan sertifikat | `certificate`, `imageFile` |
| `COURSE` | Bepul kursga kirish | — |
| `BADGE` | Nishon | — |

---

## 2. Course Rewards (To'g'ridan-to'g'ri mukofotlar)

**Endpoint:** `GET /api/v1/course/reward`

Berilgan kursdagi har bir lessonga biriktirilgan mukofotlar ro'yxati. Foydalanuvchi uchun "Kurs mukofotlari xaritasi" UI elementini qurishda ishlatiladi.

### Query parametrlari

| Parametr | Majburiy | Tavsif |
|---|---|---|
| `courseId` | ✅ | Kurs IDsi |
| `lessonId` | ❌ | Faqat bitta lesson mukofotini olish |

### Response

```jsonc
[
  {
    // Lesson ma'lumotlari
    "id": "courseReward-uuid",    // CourseReward ID (claim uchun emas)
    "lessonId": "lesson-uuid",
    "orderId": 3,                  // Lessonning tartib raqami
    "title": "Dars nomi",          // Lesson sarlavhasi

    // Mukofot ma'lumotlari
    "reward": "Oltin tanga",       // RewardTemplate.title
    "rewardId": "template-uuid",
    "rewardType": "COIN",
    "rewardPhoto": "https://...", // null bo'lishi mumkin

    // Foydalanuvchi holati
    "isReceived": false,           // User bu mukofotni olgandimi?
    "canClaim": true,              // Hozir olishi mumkinmi? (darsni tugatgan + olmaganligi)

    // Faqat isPartial=true bo'lsa
    "isPartial": true,
    "partNumber": 2,               // Bu lesson qaysi qismni beradi
    "totalParts": 4,               // Jami qismlar soni
    "collectedParts": 1,           // User hozircha nechta qism yig'ganligi
    "isFullComplete": false        // Barcha qismlar to'plandimi?
  }
]
```

### UI holatlari

```
isReceived=false, canClaim=false  →  🔒 Locked   (dars tugallanmagan)
isReceived=false, canClaim=true   →  🎁 Claim    (tugallangan, olish mumkin)
isReceived=true                   →  ✅ Received  (allaqachon olindi)

Partial reward uchun:
  collectedParts < totalParts     →  🧩 X/Y (progress)
  isFullComplete=true             →  ✅ To'liq yig'ildi
```

### Mukofot claim qilish

**Endpoint:** `POST /api/v1/course/reward/claim`

```jsonc
// Request body
{
  "courseId": "uuid",
  "lessonId": "uuid",
  "rewardId": "uuid"    // RewardTemplate ID
}

// Response — reward turiga qarab farqli
{
  "type": "COIN",
  "title": "Oltin tanga",
  "value": 100                     // COIN uchun
}

{
  "type": "PROMOCODE",
  "title": "Maxsus chegirma",
  "code": "SAVE20"                 // PROMOCODE uchun
}

{
  "type": "PRODUCT",
  "title": "Kubok",
  "collectedParts": 2,             // Partial uchun
  "totalParts": 4,
  "isComplete": false
}

{
  "type": "AMATEUR_CERTIFICATE",
  "title": "Sertifikat",
  "certificate": "https://...pdf", // Sertifikat fayli URL
  "imageFile": "https://...jpg"    // Sertifikat rasm URL
}

{
  "type": "EXTRA_FORTUNA_SPIN",
  "title": "Qo'shimcha spin",
  "extraSpin": 2
}
```

> **Eslatma:** Claim so'rovi yuborishdan oldin `canClaim=true` ekanligini tekshiring. Agar dars tugallanmagan bo'lsa, backend `400 Bad Request` qaytaradi.

---

## 3. Lesson Reward Boxes (Quti tizimi)

**Endpoint:** `GET /api/v1/course/reward/boxes`

Kurs darslariga biriktirilgan mukofot qutilarini qaytaradi. Har bir qutida bir nechta mukofot bo'lishi mumkin. Bu — `CourseReward` dan alohida, parallel tizim.

### Query parametrlari

| Parametr | Majburiy | Tavsif |
|---|---|---|
| `courseId` | ✅ | Kurs IDsi |

### Response

```jsonc
[
  {
    "id": "box-uuid",
    "lessonId": "lesson-uuid",
    "courseId": "course-uuid",
    "title": "Dars sovg'asi",
    "image": "https://...",       // Quti rasmi (loot box ikonka)
    "description": "...",         // null bo'lishi mumkin

    // Foydalanuvchi holati
    "isClaimed": false,           // Barcha itemlar olinganmi?

    // Qutidagi mukofotlar
    "items": [
      {
        "id": "item-uuid",
        "rewardId": "template-uuid",
        "partId": "part-uuid",    // Partial reward bo'lsa, qaysi qism
        "rewardType": "COIN",
        "rewardTitle": "Tanga",
        "rewardPhoto": "https://...",
        "rewardValue": 50
      },
      {
        "id": "item-uuid",
        "rewardId": "template-uuid",
        "partId": null,
        "rewardType": "PROMOCODE",
        "rewardTitle": "Chegirma",
        "rewardPhoto": null,
        "rewardValue": null
      }
    ]
  }
]
```

### UI holatlari

```
isClaimed=false  →  🎁 Ochish mumkin (agar dars tugallangan bo'lsa)
isClaimed=true   →  ✅ Allaqachon ochilgan

items ichidagi har bir item — alohida mukofot iconka sifatida ko'rsatiladi.
```

### Qutini claim qilish

**Endpoint:** `POST /api/v1/course/reward/box/claim`

```jsonc
// Request body
{
  "boxId": "box-uuid",
  "courseId": "course-uuid"
}

// Response — barcha itemlar natijalari
{
  "rewards": [
    {
      "itemId": "item-uuid",
      "type": "COIN",
      "title": "Tanga",
      "value": 50,
      "alreadyClaimed": false       // Yangi olindi
    },
    {
      "itemId": "item-uuid",
      "type": "PROMOCODE",
      "title": "Chegirma",
      "code": "PROMO123",
      "alreadyClaimed": false
    },
    {
      "itemId": "item-uuid",
      "type": "PRODUCT",
      "title": "Kubok",
      "collectedParts": 3,
      "totalParts": 4,
      "isComplete": false,
      "alreadyClaimed": true        // Oldin olingan — qayta berilmadi
    }
  ]
}
```

> **Eslatma:**
> - `alreadyClaimed=true` bo'lsa — bu item avval olingan, faqat ma'lumot ko'rsatiladi
> - `alreadyClaimed=false` bo'lsa — yangi olindi, animation/confetti ko'rsating
> - Dars tugallanmagan bo'lsa backend `400 Bad Request` qaytaradi

---

## Tizimlarning farqi

| | **CourseReward** | **LessonRewardBox** |
|---|---|---|
| Endpoint | `GET /reward` | `GET /boxes` |
| Har bir lessondan | 1 ta mukofot | 1 ta quti → N ta mukofot |
| Claim | `POST /reward/claim` | `POST /reward/box/claim` |
| `isClaimed` hisoblash | Har bir reward alohida | Barcha items olinsa `true` |
| Partial support | `isPartial`, `partNumber` | `partId` orqali |
| UI tavsifi | Dars yonida badge | Loot box / yashik animatsiya |

---

## To'liq oqim

```
1. Sahifa yuklanganda:
   GET /reward?courseId=X     → lesson mukofotlari xaritasi
   GET /boxes?courseId=X      → quti mukofotlari

2. User darsni tugatgach:
   canClaim=true bo'ladi (GET /reward yangilanganda)

3. User mukofot olmoqchi:
   POST /reward/claim         → to'g'ridan-to'g'ri mukofot
   POST /reward/box/claim     → quti mukofotlari

4. Natija ko'rsatish (response turiga qarab):
   COIN              → "+X ball" animatsiya
   PROMOCODE         → kod ko'rsatish (nusxa olish tugmasi)
   PRODUCT           → mahsulot rasmi
   EXTRA_FORTUNA_SPIN→ "+X spin" animatsiya
   AMATEUR/PROGRESSIVE_CERTIFICATE → sertifikat yuklab olish tugmasi
   Partial           → progress bar (X/Y qism)
```

---

## Xato holatlari

| HTTP kodi | Sabab | UI da nima qilish |
|---|---|---|
| `400` | Dars tugallanmagan | "Avval darsni tugallang" toast |
| `400` | Quti/reward topilmadi | "Mukofot topilmadi" xabar |
| `403` | Ruxsat yo'q | Login sahifaga yo'naltirish |
| `404` | Sertifikat shabloni yo'q | "Sertifikat hali tayyorlanmagan" xabar |

---

## Muhim eslatmalar

1. **Barcha so'rovlar `Authorization: Bearer <token>` talab qiladi.**
2. **`isReceived` va `isClaimed`** — GET so'rovida keladi, POST claim dan keyin GET ni qayta chaqirib UI ni yangilang.
3. **Partial reward** — bir kurs ichida bir nechta darsda bir mukofotning turli qismlari bo'ladi. `collectedParts >= totalParts` bo'lsa mukofot to'liq yig'ilgan.
4. **`canClaim`** — faqat `GET /reward` da keladi. `GET /boxes` da bu maydon yo'q; boxes uchun `isClaimed` ni tekshiring va dars tugallanganligini alohida `Progress` API dan oling.
5. **Bir lessondan faqat bitta quti bo'lishi mumkin** (`lessonId` bo'yicha unique constraint).
