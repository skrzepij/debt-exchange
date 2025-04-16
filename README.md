# 💸 Debt Exchange

**Debt Exchange** to aplikacja webowa służąca do zarządzania długami z funkcjonalnościami takimi jak wyszukiwanie,
sortowanie i przeglądanie szczegółów dłużników. Projekt został zbudowany przy użyciu nowoczesnych technologii i dobrych
praktyk programistycznych.

---

## 🛠️ Technologie

- **React** + **TypeScript**: Budowa interfejsu użytkownika.
- **Vite**: Szybkie i wydajne środowisko tworzenia aplikacji.
- **LESS**: Zarządzanie stylami.
- **Vitest** + **React Testing Library**: Testy jednostkowe i integracyjne.
- **ESLint** + **Prettier**: Statyczna analiza kodu i formatowanie.

---

## ✨ Funkcjonalności

- **Wyszukiwanie**: Szybkie wyszukiwanie dłużników po nazwie i numerze NIP.
- **Sortowanie**: Sortowanie danych po różnych polach, takich jak wartość długu, data zobowiązania, itp.
- **Obsługa błędów**: Dedykowany komponent do wyświetlania błędów w przypadku awarii.
- **Brak wyników**: Komponent sygnalizujący brak wyników wyszukiwania.
- **Responsywność**: Optymalny wygląd na urządzenia mobilne.

---

## 🔧 Konfiguracja i uruchamianie

1. **Klonowanie repozytorium**:
   ```bash
   git clone https://github.com/skrzepij/debt-exchange.git
   cd debt-exchange
   ```

2. **Instalacja zależności**:
   ```bash
   npm install
   ```

3. **Konfiguracja zmiennych środowiskowych**:
   Plik `.env` w katalogu głównym zawiera wymagane zmienne srodowiskowe. Przykład:
   ```
   VITE_API_URL=https://example.com/api
   ```

4. **Uruchomienie aplikacji**:
   ```bash
   npm run dev
   ```

5. **Uruchomienie testów**:
   ```bash
   npm run test
   ```

---

## 🗂️ Struktura projektu

```
src/
├── api/                # Definicje zapytań do API
├── components/         # Komponenty React
│   ├── common/         # Komponenty wspólne (np. nagłówki tabel)
│   ├── DebtTable/      # Tabela długów
│   ├── ErrorView/      # Komponent obsługi błędów
│   └── NoResult/       # Komponent "Brak wyników"
├── hooks/              # Custom hooki (np. `useSorting`)
├── utils/              # Funkcje pomocnicze (formatowanie dat, walut)
├── App.tsx             # Główny komponent aplikacji
└── index.tsx           # Punkt wejściowy aplikacji
```

---

## ✅ Przykładowe dane

Przykład obiektu `Debt` używanego w aplikacji:

```json
{
  "Id": 1,
  "Name": "ABC Company",
  "NIP": "1234567890",
  "Value": 1500.50,
  "Date": "2025-01-01"
}
```

---

## 👤 Autor

Projekt stworzony przez [Radomir Skrzepij](https://github.com/skrzepij). Masz pytania? Skontaktuj się za pośrednictwem
GitHuba!
