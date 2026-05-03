# Trade Processing System

A minimal full-stack trade management app built with:
- **Backend**: Java 17, Spring Boot, Spring Data JPA, PostgreSQL
- **Frontend**: React + Vite

---

## Project Structure

```
trade-processing-system/
│
├── backend/                          ← Spring Boot project (open this in IntelliJ)
│   ├── pom.xml
│   └── src/main/
│       ├── java/com/trade/system/
│       │   ├── TradeProcessingSystemApplication.java   ← App entry point
│       │   ├── controller/
│       │   │   └── TradeController.java                ← REST endpoints
│       │   ├── service/
│       │   │   └── TradeService.java                   ← Business logic
│       │   ├── repository/
│       │   │   └── TradeRepository.java                ← DB access (JPA)
│       │   ├── entity/
│       │   │   ├── Trade.java                          ← JPA entity (maps to DB table)
│       │   │   └── TradeStatus.java                    ← PENDING / SETTLED enum
│       │   ├── dto/
│       │   │   ├── CreateTradeRequest.java             ← Input DTO for POST /api/trades
│       │   │   └── TradeReportResponse.java            ← Output DTO for GET /report
│       │   ├── event/
│       │   │   ├── TradeEvent.java                     ← Custom Spring event
│       │   │   └── TradeEventListener.java             ← Logs events when trades change
│       │   └── exception/
│       │       ├── TradeNotFoundException.java         ← Thrown when trade ID not found
│       │       └── GlobalExceptionHandler.java         ← Converts exceptions → HTTP errors
│       └── resources/
│           ├── application.properties                  ← DB config
│           └── schema.sql                              ← Creates the trades table
│
└── frontend/                         ← React + Vite project
    ├── package.json
    ├── vite.config.js
    ├── index.html
    └── src/
        ├── main.jsx                  ← React entry point
        ├── App.jsx                   ← Root component, manages state
        ├── index.css                 ← All styles
        ├── api/
        │   └── tradeApi.js           ← All fetch() calls to the backend
        └── components/
            ├── CreateTradeForm.jsx   ← Form to create a new trade
            ├── TradeList.jsx         ← Table of all trades + Settle buttons
            └── TradeReport.jsx       ← Shows total trades + volume
```

---

## Prerequisites

- **Java 17** (check: `java -version`)
- **Maven** (check: `mvn -version`) or use the IntelliJ Maven plugin
- **Node.js 18+** (check: `node -v`)
- **PostgreSQL** running locally

---

## Step 1 — Set Up the Database

Open your PostgreSQL client (psql, pgAdmin, or DBeaver) and run:

```sql
CREATE DATABASE tradedb;
```

The `schema.sql` file will create the `trades` table automatically when Spring Boot starts.

---

## Step 2 — Configure the Backend

Open `backend/src/main/resources/application.properties` and update the credentials if needed:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/tradedb
spring.datasource.username=postgres
spring.datasource.password=postgres
```

---

## Step 3 — Run the Backend

**Option A — IntelliJ IDEA:**
1. Open IntelliJ → `File > Open` → select the `backend/` folder
2. IntelliJ will detect the Maven project and download dependencies
3. Open `TradeProcessingSystemApplication.java`
4. Click the green ▶ Run button

**Option B — Terminal:**
```bash
cd backend
mvn spring-boot:run
```

The backend starts at: **http://localhost:8080**

---

## Step 4 — Run the Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend starts at: **http://localhost:5173**

---

## API Endpoints

| Method | URL                        | Description               |
|--------|----------------------------|---------------------------|
| POST   | /api/trades                | Create a new trade        |
| GET    | /api/trades                | Get all trades            |
| POST   | /api/trades/{id}/settle    | Settle a trade by ID      |
| GET    | /api/trades/report         | Get totals summary        |

### Example — Create a trade
```bash
curl -X POST http://localhost:8080/api/trades \
  -H "Content-Type: application/json" \
  -d '{"product": "Electricity", "quantity": 100, "price": 50}'
```

### Example — Get all trades
```bash
curl http://localhost:8080/api/trades
```

### Example — Settle a trade
```bash
curl -X POST http://localhost:8080/api/trades/1/settle
```

### Example — Get report
```bash
curl http://localhost:8080/api/trades/report
```

---

## How It Works

1. User fills in the form → React calls `POST /api/trades`
2. `TradeController` receives the request → calls `TradeService`
3. `TradeService` validates, saves to PostgreSQL via `TradeRepository`
4. A `TradeEvent` is published → `TradeEventListener` logs it
5. React refreshes the trade list and report automatically

---

## Common Issues

| Problem | Fix |
|---|---|
| `Connection refused` on startup | Check PostgreSQL is running and credentials in `application.properties` are correct |
| `Table "trades" does not exist` | Make sure `spring.sql.init.mode=always` is in properties and `schema.sql` exists |
| Frontend shows "Could not connect to backend" | Make sure Spring Boot is running on port 8080 |
| Lombok annotations not working in IntelliJ | Enable annotation processing: `Settings > Build > Compiler > Annotation Processors` |
