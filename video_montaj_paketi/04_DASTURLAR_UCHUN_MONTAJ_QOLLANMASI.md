# 💻 Montaj Dasturlari Bo'yicha Bosqichma-Bosqich Qo'llanma

Ushbu qo'llanmada **CapCut (Kompyuter va telefon)**, **Adobe Premiere Pro / After Effects** hamda **DaVinci Resolve** dasturlarida loyihani professional tarzda yig'ish ko'rsatilgan.

---

## 📱 1. CapCut Dasturida Montaj Qilish (Eng Tez va Oson Usul)

CapCut bepul bo'lib, zamonaviy avto-subtitrlar, qadam animatsiyalari va tayyor effektlarga ega.

### Bosqichma-bosqich tartib:
1. **Loyiha yaratish:**
   - Dasturni oching va `New Project` bosing.
   - Video formatini tanlang: `Ratio -> 16:9` (Gorizontal YouTube) yoki `Ratio -> 9:16` (Instagram Reels/Shorts).
2. **Audio yo'laklarini joylashtirish:**
   - `01_SSENARIY_VA_DIKTOR_MATNI.md` dagi diktor ovozini yozib oling (yoki ovozli faylni import qiling).
   - Ovozni timeline-ga qo'ying.
   - Fon musiqasini qo'shing va `Auto Beat` yoki `Volume -> -24 dB` qiling.
   - `Audio Ducking` (fon musiqasini ovoz chiqqanda avtomatik pasaytirish) tugmasini yoqing.
3. **Kadrlar va Skrinshotlarni joylashtirish:**
   - Sayt skrinshotlarini va `05_INFOGRAFIKA_VA_GRAFIK_KARTALAR.html` orqali olingan suratlarni timeline-ga qo'ying.
   - Har bir rasmga `Animation -> In -> Zoom 1` yoki `Slide Right` effektini bering (0.5s davomiylikda).
4. **Matnlar va Avtomatik Subtitrlar (Auto-Captions):**
   - `Text -> Auto Captions` bo'limiga kiring. O'zbekcha yoki ruscha tanlang.
   - Shriftni `Montserrat Bold` yoki `Inter` ga almashtiring, matn rangini Oq (`#FFFFFF`) va hoshiyasini (Stroke) Qora (`#000000`) qiling.
5. **SFX tovushlarini ulaymiz:**
   - `03_AUDIO_DESIGN_VA_SFX_QOLLANMASI.md` dagi har bir sekundga mos ravishda (Whoosh, Click, Ding) tovushlarni joylashtiring.
6. **Eksport (Export):**
   - Resolution: `1080p` yoki `2K/4K`
   - Bit rate: `Higher` yoki `Recommended`
   - Frame rate: `60 fps`
   - Format: `MP4`

---

## 🎬 2. Adobe Premiere Pro & After Effects Dasturlarida Montaj Qilish

Professional darajadagi taqdimot va ilmiy himoyalar uchun:

### Bosqichma-bosqich tartib:
1. **Sequence Sozlamalari (Premiere Pro):**
   - `Sequence -> Sequence Settings`:
     - Editing Mode: Custom
     - Timebase: `60.00 frames/second`
     - Frame Size: `1920 x 1080` (16:9) yoki `1080 x 1920` (9:16)
     - Pixel Aspect Ratio: `Square Pixels (1.0)`
2. **Keyframe Animatsiyalari (Ken Burns Effect):**
   - Har bir ekran skrinshoti kadrda qotib turmasligi uchun `Scale: 100% -> 105%` va `Position` o'zgarishini (Slow Pan & Zoom) bering.
   - Harakat boshlanishi va tugashida `Ease In / Ease Out` (F9) bering.
3. **After Effects Titrlari va Grafikalari (Lower Thirds):**
   - Muallif nomi: `Zulunxo'jayev Marufjon Ma'murjon o'g'li`.
   - Dissertatsiya mavzusi va universitet nomini `Essential Graphics` panelida alohida kompozitsiya qilib oling.
   - Yashil chiziq (`#059669`) chapdan o'ngga `Trim Paths` animatsiyasi orqali ochilsin.
4. **Raqamlar hisoblagichi (Number Counter Expression):**
   - Qadamlar soni 0 dan 8 500 ga o'sishi uchun After Effects-da `Slider Control` effektini qo'llang:
     ```javascript
     Math.round(effect("Slider Control")("Slider"))
     ```
     Slider qiymatini 0 soniyada `0`, 3 soniyada `8500` qilib keyframe qo'ying.
5. **Eksport Parametrlari (Adobe Media Encoder):**
   - Format: `H.264`
   - Preset: `Match Source — High bitrate`
   - Bitrate Encoding: `VBR, 2 pass`
     - Target Bitrate: `20 Mbps` (1080p uchun) yoki `45 Mbps` (4K uchun)
     - Maximum Bitrate: `30 Mbps`
   - Render at Maximum Depth: `Belgilansin (Checked)`

---

## 🎨 3. DaVinci Resolve Dasturida Montaj Qilish

Bepul va yuqori sifatli rang korreksiyasi (Color Grading) hamda Fairlight audiosi uchun:

1. **Master Timeline:**
   - Timeline Resolution: `1920 x 1080 Full HD`
   - Timeline Frame Rate: `60 fps`
2. **Color Page (Ranglarni to'g'rilash):**
   - Yashil va ko'k elementlar to'yinganligini (Saturation) biroz oshiring (+10%), oq fondagi kontrastni mustahkamlang.
3. **Fairlight Page (Audio Mastering):**
   - Diktor yo'lagiga `Compressor` va `Limiter (-1.0 dB True Peak)` qo'ying.
   - Fon musiqasiga `Sidechain Compressor` o'rnating (diktor ovozi kelganda musiqa avtomatik pasayishi uchun).
4. **Deliver Page (Eksport):**
   - Format: `MP4`, Codec: `H.264`, Quality: `Restrict to 25000 Kb/s`, Audio: `Linear PCM` yoki `AAC 320 Kb/s`.

---

## 📦 4. Tayyor Video Tekshiruv Ro'yxati (Pre-Launch Checklist)

Video montajni tugatgach, eksportdan oldin quyidagilarni tekshiring:
- [ ] Muallif F.I.O si to'g'ri yozilganmi? (`Zulunxo'jayev Marufjon Ma'murjon o'g'li`)
- [ ] Ilmiy daraja va muassasa to'g'rimi? (`PhD izlanuvchisi, Toshkent Davlat Pedagogika Universiteti`)
- [ ] 72% va 24% ko'rsatkichlari aniq ko'rinyaptimi?
- [ ] Fon musiqasi diktor ovozini bosib ketmayaptimi?
- [ ] Vertikal formatda (9:16) yozuvlar ekran chetlariga yopishib qolmaganmi?
- [ ] Eksport qilingan videoda qotishlar yoki shovqinlar yo'qmi?
