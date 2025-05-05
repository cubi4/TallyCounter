# TallyCounter – Meter Reading Management with Vue 3, Pinia, and PrimeVue

## Project Description

**TallyCounter** is a simple web application for managing meters and their readings.  
It is built using **Vue 3**, **TypeScript**, **Vite**, **Pinia**, and **PrimeVue**.

Typical use cases:
- Create multiple meters with unique ID and type (electricity, gas, water, etc.)
- Document meter readings with name, value, and date
- Edit and delete meters and their readings

---

## Installation & Start

```bash
# Clone the repository
git clone https://github.com/cubi4/TallyCounter.git
cd tallycounter

# Install dependencies
npm install

# Start the development server
npm run dev
```

> Then open http://localhost:5173 in your browser.

---

## Used Technologies

| Technology | Description |
|------------|-------------|
| [Vue 3](https://vuejs.org/) | Frontend framework |
| [Pinia](https://pinia.vuejs.org/) | State management |
| [Vite](https://vitejs.dev/) | Build tool |
| [PrimeVue](https://primevue.org/) | UI components |
| [UUID](https://www.npmjs.com/package/uuid) | Unique ID generation for meters and entries |

---

## Project Structure

```
src/
├── components/
│   ├── MeterOverview.vue     # Overview of all meters and entries
│   ├── MeterForm.vue         # Form to create meters and readings
│   ├── EditModal.vue         # Modal for editing meters and readings
├── stores/
│   └── useMeterStore.ts      # Pinia store for state management
├── types.ts                  # Type definitions for meters and readings
├── App.vue                   # Root component
├── main.ts                   # Entry point
```

---

## How to Use the App

1. **Add a Meter**  
   Enter a meter name (14 digits) and select a meter type. Click “Add Meter”.  
   The meter will then appear in the overview.

2. **Add a Reading**  
   Choose an existing meter, enter name, value, and date.  
   Click “Add Reading”.  
   **Note:** The new reading will appear **collapsed by default**. You must click the arrow next to the meter to expand and see it.

3. **Expand/Collapse Entries**  
   Each meter can be expanded by clicking the arrow button to view its readings.

4. **Edit or Delete**  
   Meters and readings can be edited or deleted anytime via modal dialogs.

---

## Important Notice

> When adding a new reading, it will **initially appear collapsed**.  
> To see it, **click the arrow icon** next to the respective meter in the overview.

---

## Features

- Meter management (create, edit, delete)
- Meter readings per meter
- Input validation (e.g., name in “Firstname Lastname” format)
- Collapsed entries by default for better UI clarity
- Local state management via Pinia (no backend)


