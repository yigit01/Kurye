Aşağıdaki doküman, belirttiğiniz teknoloji yığını (Tech Stack) — **NestJS**, **TypeORM**, **PostgreSQL** ve **React TypeScript** — kullanılarak geliştirilecek bir **Kargo Takip Uygulaması** için örnek bir **Ürün Gereksinimleri Dokümanı (Product Requirements Document – PRD)** taslağıdır. Bu doküman; uygulamanın amaçlarını, kapsamını, temel gereksinimlerini ve nasıl geliştirileceğini yüksek seviyede tanımlar. Geliştirme sürecinde bu taslağı ihtiyaçlarınıza göre daha detaylandırabilirsiniz.

---

# 1. Genel Bakış

## 1.1. Ürünün Amacı

- **Kargo Takip ve Yönetim Sistemi**: Gönderici ve alıcının kargo durumunu uçtan uca izleyebildiği, kurye ve şube operasyonlarının yönetilebildiği bir platform.
- **Temel Hedef**:
  - Kargonun oluşturulmasından, şubeler/dağıtım merkezleri arası transferine, en sonunda alıcıya teslim edilmesine kadar tüm sürecin **gerçek zamanlı** takibi.
  - Manuel kurye ataması, barkod/QR okutma, faturalandırma, T.C./Vergi numarası kaydı gibi kritik işlevlerin sorunsuz yönetimi.

## 1.2. Kullanıcı Rolleri

1. **Gönderici**: Kargoyu oluşturan, gönderim talebini başlatan kişi veya şirket.
2. **Alıcı**: Kargoyu teslim alacak son kullanıcı.
3. **Kurye**: Kargoyu teslim alan ve dağıtımını gerçekleştiren saha personeli.
4. **Şube/Operasyon Sorumlusu**: Kargoları ayrıştıran, transfer planlaması yapan ve kurye atamalarını yöneten kişi.
5. **Yönetici/Admin**: Tüm sistemi izleyebilen, raporlama yapabilen, kullanıcı/şube/kurye yönetiminden sorumlu.

---

# 2. Kapsam

## 2.1. Önemli Özellikler

1. **Kargo Oluşturma ve Takip Numarası Üretimi**

   - Göndericinin ad, soyad, telefon, T.C./Vergi no (fatura için), ödeme tipi gibi bilgilerin girilmesi.
   - Benzersiz bir barkod/QR kod üretilerek kargo kimliğinin sistemde tanımlanması.

2. **Manuel Kurye Ataması**

   - Şube sorumlusu, bekleyen kargolar için sistem üzerinden kurye seçer.
   - Kurye, mobil veya web arayüzünden kendisine atanan kargoları görüntüler.

3. **Barkod Okuma**

   - Kurye, kargoyu teslim alırken veya teslim ederken barkodu (kamera ile) okutarak sistemde durum güncellemesi yapar.

4. **Kargo Durum Takibi**

   - “Kargo Oluşturuldu” → “Kurye Teslim Aldı” → “Şubede” → “Transfer Ediliyor” → “Dağıtıma Çıktı” → “Teslim Edildi” gibi aşamalar.
   - Alıcı ve gönderici bu durumları anlık izleyebilir.

5. **Faturalandırma ve Ödeme**

   - Ödeme tipinin (POS, Nakit, IBAN vb.) kaydı, faturalandırma için T.C./Vergi no doğrulaması.
   - Muhasebe/finans sistemine temel entegrasyon (opsiyonel).

6. **Şubeler Arası Transfer ve Ayrıştırma**

   - Kargonun farklı şubeler veya dağıtım merkezleri arasında taşınması, durum güncellemeleri.

7. **Raporlama ve Yönetici Paneli**
   - Toplam kargo sayısı, teslim edilmeyi bekleyen kargolar, gecikmeler, şube performansları vb.
   - Kullanıcı yönetimi, rol tanımları, yetkilendirmeler.

---

# 3. İşlevsel Gereksinimler (Functional Requirements)

Aşağıdaki gereksinimler, öne çıkan işlevleri detaylandırmaktadır.

| Kim?                     | Gereksinim                                                                                                                                                                                                                                                                                       |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Gönderici                | 1. Kargo oluştururken **Ad, Soyad, Telefon, TC/Vergi No, Adres** gibi bilgileri girebilir.<br>2. Ödeme yöntemini (POS, Nakit, IBAN, Borç vb.) seçebilir.<br>3. Kargo takip numarası veya barkodu çıktı olarak alabilir.                                                                          |
| Kurye                    | 1. **Barkod okutarak** kargoyu teslim aldığını sisteme işleyebilir.<br>2. Kendisine **manuel atanan** kargoların listesini görebilir.<br>3. Dağıtıma çıktığında veya alıcıya teslim ettiğinde durumu güncelleyebilir.                                                                            |
| Şube/Operasyon Sorumlusu | 1. Yeni oluşturulan kargoları listeleyebilir.<br>2. **Manuel olarak kurye ataması** yapabilir.<br>3. Şubeye gelen kargoların durumunu **“Şubeye Ulaştı”** olarak güncelleyebilir.<br>4. Kargoları farklı şubeye veya dağıtım merkezine sevk etmek için “Transfer Ediliyor” durumuna geçirebilir. |
| Alıcı                    | 1. Web veya mobil arayüzde **kargo takip numarası** girerek kargonun anlık durumunu görebilir.<br>2. Teslim aşamasında kuryenin barkod okumasıyla teslim onayını verebilir (isteğe bağlı dijital imza).                                                                                          |
| Yönetici/Admin           | 1. Kullanıcıları, kuryeleri, şubeleri, rolleri yönetebilir.<br>2. Kargo hareketlerini raporlayabilir (Teslim süresi, bekleyen kargolar vb.).<br>3. Ödeme kayıtlarını ve fatura bilgilerini inceleyebilir.                                                                                        |

---

# 4. Teknik Mimari ve Yığın (Tech Stack)

## 4.1. Backend

- **NestJS** (TypeScript)
  - MVC yapısına benzer modüler bir mimari.
  - REST API veya GraphQL API oluşturmak için uygun.
- **TypeORM**
  - Veri tabanı modeli: **PostgreSQL**.
  - Entity’lerle veritabanı tabloları yönetilir, migration desteğiyle şema değişiklikleri takip edilir.
- **Yapı**
  - **Modüller**: AuthModule (kimlik doğrulama), UserModule, ShipmentModule (kargo), CourierModule, PaymentModule vb.
  - **Controller – Service – Repository** katmanları (NestJS tipik yaklaşım).

## 4.2. Veritabanı (PostgreSQL)

Temel tablo/entiteler (öneri):

1. **User (Kullanıcı)**
   - id, ad_soyad, telefon, email, sifre, rol (Kurye, SubeSorumlusu, Admin, vb.), tc_no/vergi_no (opsiyonel), created_at, updated_at
2. **Shipment (Kargo)**
   - id, tracking_code (barkod/QR için), gonderici_id, alici_adi, alici_adresi, alici_telefon, odeme_tipi, durum (enum: OLUSTURULDU, KURYE_ALDI, SUBEDE, vb.), created_at, updated_at
3. **Branch (Şube)**
   - id, sube_adi, adres, created_at, updated_at
4. **ShipmentHistory (Kargo Durum Geçmişi)**
   - id, shipment_id, onceki_durum, yeni_durum, tarih, aciklama
5. **Courier (Kurye)**
   - id, user_id (bağlantı), plaka, aktif_mi, created_at, updated_at

> Not: Bazı durumlarda `couriers` tablosu yerine `role = 'courier'` olan kullanıcılar tek tablo üzerinden yönetilebilir. Tasarımı proje ihtiyacınıza göre düzenleyebilirsiniz.

## 4.3. Frontend (React + TypeScript)

- **React TypeScript**
  - Bileşen (component) tabanlı yapı.
  - State yönetimi için React Context API veya Redux.
- **Routing**
  - react-router-dom ile sayfa yönlendirmeleri.
- **HTTP İletişim**
  - Axios veya fetch API, NestJS’te oluşturulan endpoint’lerle entegre.
- **Barkod/QR Okuma**
  - Kuryenin kamerasını kullanmak için `react-qr-reader`, `react-barcode-reader` gibi kütüphaneler.
- **UI Kütüphanesi (Opsiyonel)**
  - Material UI, Ant Design veya Bootstrap gibi bir bileşen kütüphanesiyle hızlı geliştirme.

## 4.4. Geliştirme ve Dağıtım

- **Versiyon Kontrol**
  - Git (GitHub, GitLab veya Bitbucket).
- **Sürekli Entegrasyon (CI)**
  - GitHub Actions veya GitLab CI ile otomatik test, build.
- **Dağıtım (Deployment)**
  - Sunucu tarafında Docker kullanarak, Postgres ve NestJS konteynerları ile barındırma.
  - Frontend’i statik olarak Nginx veya benzeri bir sunucuda barındırma.

---

# 5. Fonksiyonel Olmayan Gereksinimler (Non-Functional Requirements)

1. **Performans**

   - Aynı anda en az “X” adet kurye ve “Y” adet gönderici işlem yapabilmelidir.
   - Durum güncellemeleri anlık görülmelidir (<1-2 sn gecikme).

2. **Güvenlik**

   - JWT tabanlı kimlik doğrulama (NestJS’de `@nestjs/jwt`).
   - T.C./Vergi numarası gibi kritik bilgilerin veritabanında güvenli şekilde saklanması.
   - HTTPS zorunlu, parolalar hash’li (BCrypt vb.).

3. **Veri Yedekleme**

   - PostgreSQL günlük/haftalık yedeklemesi.
   - Mümkünse farklı bir lokasyonda (off-site) replikasyon.

4. **Ölçeklenebilirlik**

   - İleride mikrolara bölünecek şekilde kodu modüler yazmak.
   - Veritabanı tablo indekslemeleri (kargo sorgulamaları hızlı olsun).

5. **Kullanılabilirlik (UI/UX)**
   - Kurye uygulamasının sahada kolay kullanımı (mobil uyum, büyük butonlar, hızlı barkod okuma).
   - Gönderici ve alıcının takip ekranlarının sade ve anlaşılır olması.

---

# 6. Kullanıcı Akışı (Örnek Senaryo)

1. **Kargo Oluşturma**

   - Gönderici panelden giriş yapar → “Yeni Kargo” butonuna tıklar → Gönderici/Alıcı bilgilerini ve ödeme tipini girer → Kargo kayıt edilir, `tracking_code` üretilir.

2. **Manuel Kurye Atama (Şube Sorumlusu)**

   - Şube sorumlusu, “Bekleyen Kargolar” listesini görür → Uygun bir kuryeyi seçer → Sistem durumu “Kurye Atandı” olarak günceller.

3. **Kurye Teslim Alma**

   - Kurye, telefonundaki React mobil sayfasına girer → Kamera açılır → Barkodu okutur → “Teslim Aldım”a basar → Durum “Kurye Aldı” olur.

4. **Şubeye Getirme ve Transfer**

   - Kurye şubeye geldiğinde sistemde “Şubeye Teslim Edildi” olarak günceller.
   - Şube ayrıştırma işleminden sonra “Transfer Ediliyor” durumu → Bir sonraki şubeye veya dağıtım merkezine yönlendirilir.

5. **Son Şubeye Ulaşma ve Tekrar Kurye Atama**

   - Son şubede “Dağıtım Kurye Atandı” olarak güncellenir.
   - Kurye, barkod okutarak “Dağıtıma Çıktı” durumuna geçer.

6. **Teslim Etme**
   - Alıcının adresine geldiğinde barkodu tekrar okutur (isteğe bağlı) → “Teslim Edildi” durumuna geçer.
   - Alıcı da “Teslim Alındı” bilgisini görebilir.

## Sonuç

Bu PRD, **NestJS, TypeORM, PostgreSQL ve React TypeScript** tabanlı bir kargo takip sisteminin temel gereksinimlerini ve mimarisini özetler. Projenin ilerleyen aşamalarında:

1. **Detaylı Teknik Tasarım Dokümanı**: Entity ilişkileri, API endpoint dökümanları, validasyon kuralları.
2. **Arayüz Prototipleri (UI/UX)**: Wireframe/mokap tasarımları, kullanıcı akış senaryoları.
