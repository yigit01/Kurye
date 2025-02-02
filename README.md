# Kargo Takip Sistemi

Bu proje, NestJS, TypeORM, PostgreSQL kullanılarak geliştirilmiş modern bir kargo takip sistemidir.

## Backend Teknoloji Yığını

- **Framework**: NestJS v11.0 (TypeScript)
- **Veritabanı**: PostgreSQL
- **ORM**: TypeORM
- **Authentication**: JWT (JSON Web Token)
- **Validation**: class-validator
- **Pagination**: nestjs-paginate
- **API Documentation**: Swagger/OpenAPI (planlanan)
- **Testing**: Jest (planlanan)

## Backend Modüler Yapı

1. **Auth Module** (`/src/auth`)

   - JWT tabanlı kimlik doğrulama
   - Role-based access control (RBAC)
   - Guards: `JwtAuthGuard`, `RolesGuard`
   - Decorators: `@Roles()`, `@GetUser()`

2. **User Module** (`/src/user`)

   - Kullanıcı CRUD işlemleri
   - Rol yönetimi (Admin, Branch Operator, Courier, Customer)
   - Şifre hash'leme (bcrypt)

3. **Shipment Module** (`/src/shipment`)

   - Kargo CRUD işlemleri
   - Durum takibi ve güncellemeleri
   - Şubeler arası transfer sistemi
   - Kurye atama mekanizması
   - Otomatik takip kodu üretimi (nanoid)

4. **Branch Module** (`/src/branch`)

   - Şube CRUD işlemleri
   - Şube bazlı operasyonlar
   - Konum yönetimi (point type)

5. **Courier Module** (`/src/courier`)

   - Kurye CRUD işlemleri
   - Kurye atama/çıkarma
   - Aktif/pasif durum yönetimi
   - Şube bazlı kurye listeleme

6. **Reports Module** (`/src/reports`)
   - Kargo istatistikleri
   - Kurye performans raporları
   - Şube performans raporları
   - Tarih bazlı filtreleme

## Backend API Endpoints

### Auth Endpoints

```
POST   /auth/register    # Yeni kullanıcı kaydı
POST   /auth/login      # Kullanıcı girişi ve JWT token üretimi
```

### User Endpoints

```
GET    /users           # Kullanıcı listesi (paginated)
GET    /users/profile   # Giriş yapmış kullanıcı bilgileri
GET    /users/:id       # Kullanıcı detayı
PATCH  /users/:id       # Kullanıcı güncelleme
DELETE /users/:id       # Kullanıcı silme
```

### Shipment Endpoints

```
POST   /shipments                              # Yeni kargo oluştur
GET    /shipments                             # Kargo listesi (paginated)
GET    /shipments/:id                         # Kargo detayı
GET    /shipments/track/:trackingCode         # Kargo takibi
PATCH  /shipments/:id                         # Kargo güncelle
PATCH  /shipments/:id/assign-courier/:courierId # Kurye ata
PATCH  /shipments/:id/transfer                # Şube transfer
```

### Branch Endpoints

```
POST   /branches        # Yeni şube oluştur
GET    /branches        # Şube listesi (paginated)
GET    /branches/:id    # Şube detayı
PATCH  /branches/:id    # Şube güncelle
DELETE /branches/:id    # Şube sil
```

### Courier Endpoints

```
POST   /couriers        # Yeni kurye oluştur
GET    /couriers        # Kurye listesi (paginated)
GET    /couriers/available # Müsait kuryeler
GET    /couriers/:id    # Kurye detayı
PATCH  /couriers/:id    # Kurye güncelle
DELETE /couriers/:id    # Kurye sil
```

### Reports Endpoints

```
GET    /reports/shipments?startDate=X&endDate=Y  # Kargo istatistikleri
GET    /reports/couriers?startDate=X&endDate=Y   # Kurye performansı
GET    /reports/branches?startDate=X&endDate=Y   # Şube performansı
```

## Veri Modelleri

### User Entity

```typescript
{
  id: string;
  fullName: string;
  email: string;
  phone: string;
  identificationNumber: string;
  password: string;
  role: UserRole;
  branchId: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### Shipment Entity

```typescript
{
  id: string;
  trackingCode: string;
  sender: User;
  recipientName: string;
  recipientPhone: string;
  recipientAddress: string;
  status: ShipmentStatus;
  paymentType: PaymentType;
  amount: number;
  currentBranch: Branch;
  assignedCourier: User;
  dimensions: {
    weight: number;
    width: number;
    height: number;
    length: number;
  };
  history: ShipmentHistory[];
  createdAt: Date;
  updatedAt: Date;
}
```

### Branch Entity

```typescript
{
  id: string;
  name: string;
  address: string;
  phone: string;
  location: Point;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### ShipmentHistory Entity

```typescript
{
  id: string;
  shipment: Shipment;
  status: ShipmentStatus;
  description: string;
  updatedBy: User;
  createdAt: Date;
}
```

## Enums

### UserRole

```typescript
enum UserRole {
  ADMIN = "admin",
  BRANCH_OPERATOR = "branch_operator",
  COURIER = "courier",
  CUSTOMER = "customer",
}
```

### ShipmentStatus

```typescript
enum ShipmentStatus {
  CREATED = "created",
  COURIER_ASSIGNED = "courier_assigned",
  PICKED_UP = "picked_up",
  IN_BRANCH = "in_branch",
  IN_TRANSIT = "in_transit",
  OUT_FOR_DELIVERY = "out_for_delivery",
  DELIVERED = "delivered",
  FAILED = "failed",
}
```

### PaymentType

```typescript
enum PaymentType {
  CASH = "cash",
  CREDIT_CARD = "credit_card",
  BANK_TRANSFER = "bank_transfer",
}
```

## Backend Kurulum

1. Gereksinimleri yükleyin:

```bash
npm install
```

2. `.env` dosyasını oluşturun:

```env
# Application
NODE_ENV=development
PORT=3000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=kurye_user
DB_PASSWORD=kurye_password
DB_DATABASE=kurye_db

# JWT
JWT_SECRET=your-super-secret-key-change-this-in-production
JWT_EXPIRATION=1d
```

3. Docker ile PostgreSQL başlatın:

```bash
docker-compose up -d
```

4. Uygulamayı başlatın:

```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

## Backend Güvenlik Özellikleri

1. **Kimlik Doğrulama**

   - JWT tabanlı token sistemi
   - Token expiration yönetimi
   - Refresh token desteği (planlanan)

2. **Yetkilendirme**

   - Role-based access control (RBAC)
   - Custom decorators ile rol kontrolü
   - Guard'lar ile otomatik yetki kontrolü

3. **Veri Güvenliği**

   - Password hashing (bcrypt)
   - Input validation (class-validator)
   - SQL injection koruması (TypeORM)
   - Rate limiting (planlanan)

4. **API Güvenliği**
   - CORS yapılandırması
   - Helmet middleware
   - API key sistemi (planlanan)

## Backend Test Yapısı (Planlanan)

1. **Unit Tests**

   - Service katmanı testleri
   - Controller katmanı testleri
   - Guard ve decorator testleri

2. **Integration Tests**

   - API endpoint testleri
   - Database işlem testleri
   - Authentication flow testleri

3. **E2E Tests**
   - Tam iş akışı testleri
   - Senaryo bazlı testler

# Frontend Yapısı

## Teknoloji Yığını

- **Framework**: React 18
- **State Yönetimi**: Redux Toolkit
- **UI Framework**: Material-UI (MUI) v5
- **Form Yönetimi**: React Hook Form
- **API İletişimi**: Axios
- **Grafik Kütüphanesi**: Recharts
- **Tarih İşlemleri**: Day.js
- **Validation**: Yup

## Sayfa Yapısı

### 1. Giriş/Yetkilendirme Sayfaları

- **Giriş (/login)**
  - Kullanıcı girişi formu
  - Şifremi unuttum linki
  - Hata mesajları

### 2. Dashboard (/dashboard)

- **Özet Bilgiler**
  - Toplam kargo sayısı
  - Günlük teslimat sayısı
  - Aktif kuryeler
  - Bekleyen kargolar
- **Grafik ve İstatistikler**
  - Günlük/Haftalık/Aylık kargo dağılımı
  - Şube performans grafiği
  - Kurye performans grafiği

### 3. Kargo Yönetimi

- **Kargo Listesi (/shipments)**
  - Filtreleme ve arama
  - Durum bazlı gruplama
  - Toplu işlem seçenekleri
  - Pagination
- **Kargo Detay (/shipments/:id)**
  - Kargo bilgileri
  - Durum güncelleme
  - Kurye atama
  - Konum bilgisi
  - Tarihçe görüntüleme
- **Yeni Kargo (/shipments/create)**
  - Gönderici bilgileri
  - Alıcı bilgileri
  - Kargo detayları
  - Ödeme bilgileri

### 4. Kurye Yönetimi

- **Kurye Listesi (/couriers)**
  - Aktif/Pasif kurye filtresi
  - Şube bazlı filtreleme
  - Performans göstergeleri
- **Kurye Detay (/couriers/:id)**
  - Kişisel bilgiler
  - Atanmış kargolar
  - Performans metrikleri
  - Durum güncelleme

### 5. Şube Yönetimi

- **Şube Listesi (/branches)**
  - Bölge bazlı filtreleme
  - Aktif/Pasif şube görüntüleme
  - Performans metrikleri
- **Şube Detay (/branches/:id)**
  - Şube bilgileri
  - Personel listesi
  - Kargo istatistikleri
  - Konum bilgisi

### 6. Kullanıcı Yönetimi

- **Kullanıcı Listesi (/users)**
  - Rol bazlı filtreleme
  - Aktif/Pasif kullanıcı görüntüleme
  - Toplu işlem seçenekleri
- **Kullanıcı Detay (/users/:id)**
  - Kullanıcı bilgileri
  - Rol yönetimi
  - Şube ataması
  - Aktivite geçmişi

### 7. Raporlama

- **Kargo Raporları (/reports/shipments)**
  - Tarih aralığı seçimi
  - Durum bazlı dağılım
  - Excel/PDF export
- **Kurye Raporları (/reports/couriers)**
  - Performans metrikleri
  - Teslimat istatistikleri
  - Başarı oranları
- **Şube Raporları (/reports/branches)**
  - Şube performansları
  - Karşılaştırmalı analizler
  - Kapasite kullanımı

## Ortak Özellikler

### 1. Layout

- Responsive tasarım
- Sol menü (collapsible)
- Üst bar
  - Kullanıcı profili
  - Bildirimler
  - Hızlı işlemler

### 2. Veri Tabloları

- Sıralama
- Filtreleme
- Arama
- Sayfalama
- Toplu işlem
- Excel/PDF export

### 3. Formlar

- Gerçek zamanlı validasyon
- Otomatik tamamlama
- Dosya yükleme
- Tarih/saat seçiciler
- Adres girişi (harita entegrasyonu)

### 4. Bildirimler

- İşlem sonuç bildirimleri
- Sistem uyarıları
- Hata mesajları

## Güvenlik

- Route koruma (PrivateRoute)
- Rol bazlı erişim kontrolü
- Token yönetimi
- Session timeout
- XSS koruması
