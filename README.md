# Decoupled APIs – Clean Architecture & Domain-Driven Design (DDD)

This project is a **TypeScript-based headless backend architecture** designed with **Clean Architecture**, **Domain‑Driven Design (DDD)** principles, and **decoupled domain boundaries**. The goal is to create a system that is easy to extend, test, maintain, and scale independently.

---

## ✅ High-Level Architecture Overview

The project follows a layered architecture with strict separation of concerns:

```
┌───────────────────────────────────────────┐
│                Presentation                │
│         (Controllers / HTTP Layer)         │
└───────────────────────────────────────────┘
                 ↓                      
┌───────────────────────────────────────────┐
│                Application                 │
│    (Use Cases / Services / Input Ports)    │
└───────────────────────────────────────────┘
                 ↓                      
┌───────────────────────────────────────────┐
│                  Domain                    │
│   (Entities / Value Objects / Interfaces)  │
└───────────────────────────────────────────┘
                 ↓                      
┌───────────────────────────────────────────┐
│              Infrastructure                │
│ (DB Repositories / External Services)      │
└───────────────────────────────────────────┘
```

Each layer isolates business logic from framework details, ensuring that your **domain remains pure**.

---

## ✅ Philosophy Behind the Architecture

### **1️⃣ Decoupling**

* No module depends directly on another domain module.
* Dependencies always flow **inward** toward the domain.
* Infrastructure, presentation, or frameworks are replaceable without touching core logic.

### **2️⃣ Domain‑Driven Design (DDD)**

* Each domain module represents a **bounded context**.
* Each bounded context has its own:

  * Entities
  * Value Objects
  * Domain services
  * Repositories (interfaces)

### **3️⃣ Headless Architecture**

* APIs ONLY expose data or functionality.
* No frontend logic or rendering.
* Allows multiple clients: mobile, web, desktop apps.

---

## ✅ Folder Structure (Clean + DDD Style)

```
src/
│
├── domain/
│   ├── entities/
│   ├── valueObjects/
│   ├── services/
│   ├── events/
│   └── repositories/   (Interfaces only)
│
├── application/
│   ├── usecases/       (Business orchestrators)
│   ├── dtos/
│   └── ports/          (Input/Output boundaries)
│
├── infrastructure/
│   ├── db/
│   │   ├── models/
│   │   └── repositories/  (Implementation of domain interfaces)
│   ├── services/
│   └── config/
│
├── presentation/
│   ├── controllers/
│   └── routes/
│
└── shared/
    ├── utils/
    ├── errors/
    └── types/
```

---

## ✅ Layer Responsibilities

### **🧠 Domain Layer (Business Truth)**

Contains all business rules. This is the heart of your system.

* No external imports
* 100% pure TypeScript
* Defines interfaces for data access

```
// Example: domain/entities/User.ts
class User {
  constructor(private id: string, private email: EmailVO) {}
}
```

---

### **⚙️ Application Layer (Use Cases)**

Coordinators between domain concepts.

* Implements use-cases
* Calls domain services, repositories (interfaces)
* Holds request/response DTOs

```
class CreateUserUseCase {
  constructor(private userRepo: IUserRepository) {}
  async execute(input: CreateUserDTO) { /* business flow */ }
}
```

---

### **🌐 Presentation Layer (API Layer)**

* Express controllers
* Request validation
* Mapping HTTP requests → DTOs
* Returns JSON response only (headless)

```
router.post('/user', controller.createUser)
```

---

### **💾 Infrastructure Layer (External World)**

* Actual DB models
* Repository implementations
* Third-party services (email, cache, queue)
* Config files

```
class UserRepository implements IUserRepository {
  async save(user: User) { /* DB write */ }
}
```

---

## ✅ Dependency Flow Rules

* **Presentation → Application → Domain**
* **Infrastructure → Domain (via interfaces)**
* Domain NEVER imports from infrastructure.
* Application NEVER imports from Express or database libraries.

---

## ✅ How Modules Stay Decoupled

### 1. Repositories exist only as interfaces in **domain**

```
interface IUserRepository {
  save(user: User): Promise<void>
}
```

### 2. Infrastructure implements them

```
class PostgresUserRepository implements IUserRepository {}
```

### 3. Application depends on interface, not implementation

```
constructor(private userRepo: IUserRepository) {}
```

### 4. Composition Root wires everything

```
const userRepo = new PostgresUserRepository()
const createUserUseCase = new CreateUserUseCase(userRepo)
```

---

## ✅ Advantages of This Clean + DDD Setup

### ✔ High testability

* Domain and application layers are purely TypeScript
* You can unit test without DB or network

t

### ✔ Easy maintainability

* Each module is isolated
* Clearly defined responsibilities

### ✔ Scalable for microservices

* Each domain can later split into its own service

---

## ✅ How to Navigate the Repository

| Layer          | What to Look For           | Why It's Important     |
| -------------- | -------------------------- | ---------------------- |
| domain         | business logic, pure rules | core system behavior   |
| application    | use cases                  | main operations        |
| infrastructure | DB + external tools        | implementation details |
| presentation   | controllers/routes         | API entry points       |

---

## ✅ Conclusion

This architecture ensures a clean, extensible, framework‑agnostic backend built using TypeScript with strong adherence to DDD principles. Everything is decoupled, predictable, and easy to reason about.

If you want a breakdown of how dependency injection is handled, or want to generate diagrams, let me know!
