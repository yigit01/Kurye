# Kurye Sistemi Frontend

Modern kargo takip sisteminin frontend uygulaması.

## Teknolojiler

- React 18
- TypeScript
- Redux Toolkit
- Material-UI (MUI) v5
- React Router v6
- Axios
- React Hook Form
- Yup
- Recharts
- Vite

## Özellikler

- Modern ve responsive tasarım
- Role-based access control (RBAC)
- Form validasyonları
- Gerçek zamanlı veri güncellemeleri
- Grafiksel raporlama
- Tema desteği
- Offline destek (planlanan)
- PWA desteği (planlanan)

## Kurulum

1. Bağımlılıkları yükleyin:

```bash
npm install
```

2. Geliştirme sunucusunu başlatın:

```bash
npm run dev
```

3. Uygulamayı derleyin:

```bash
npm run build
```

## Proje Yapısı

```
src/
├── components/        # Yeniden kullanılabilir bileşenler
│   ├── auth/         # Kimlik doğrulama bileşenleri
│   ├── layout/       # Layout bileşenleri
│   ├── shipments/    # Kargo bileşenleri
│   ├── couriers/     # Kurye bileşenleri
│   └── shared/       # Ortak bileşenler
├── pages/            # Sayfa bileşenleri
├── store/            # Redux store ve slice'lar
├── services/         # API servisleri
├── hooks/            # Custom hooks
├── utils/            # Yardımcı fonksiyonlar
├── styles/           # Global stiller
├── types/            # TypeScript tipleri
└── constants/        # Sabitler
```

## Ortam Değişkenleri

```env
VITE_API_URL=http://localhost:4000/api
```

## Kod Kalitesi

- ESLint
- Prettier
- Husky (pre-commit hooks)
- Jest (unit testler)
- React Testing Library (component testleri)

## Git Commit Mesajları

Commit mesajları için [Conventional Commits](https://www.conventionalcommits.org/) standardını kullanıyoruz:

- `feat`: Yeni özellik
- `fix`: Hata düzeltmesi
- `docs`: Dokümantasyon değişiklikleri
- `style`: Kod stilinde değişiklikler
- `refactor`: Kod refactoring
- `test`: Test ekleme veya düzenleme
- `chore`: Yapılandırma değişiklikleri

## Dağıtım

1. Projeyi derleyin:

```bash
npm run build
```

2. `dist` klasöründeki dosyaları web sunucunuza yükleyin.

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır.
