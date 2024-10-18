# Simpel Hidroponik

Simpel Hidroponik is a web application designed to help users manage their hydroponic gardening systems. It provides tools for selecting plants, tracking plant growth, managing nutrients, and maintaining a checklist for garden care.

## Features

- Plant Selection: Choose from a variety of plants suitable for hydroponic gardening.
- Dashboard: Get an overview of your hydroponic garden status.
- Growth Timeline: Log and monitor the growth of your plants over time.
- Nutrient Management: Calculate and track the right nutrient mix for your plants based on their growth stage.
- Maintenance Checklist: Keep track of tasks required to maintain your hydroponic garden.
- Care Reminders: Set and manage reminders for plant care tasks.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- Supabase account (for database)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/bO-05/simpel-hidroponik
   ```

2. Navigate to the project directory:
   ```
   cd simpel-hidroponik
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Set up your Supabase project and update the `src/supabaseClient.ts` file with your project's URL and anon key.

5. Run the SQL script in `setup_plants_table.sql` in your Supabase project to set up the necessary database table.

6. Start the development server:
   ```
   npm run dev
   ```

7. Open your browser and visit `http://localhost:5173` to view the application.

## Usage

1. Sign in or create an account using the AuthComponent.
2. Select plants you want to grow in the "Plant Selection" component.
3. Use the "Growth Timeline" to log the progress of your plants.
4. Manage nutrients for your plants using the "Nutrient Management" component.
5. Keep track of maintenance tasks in the "Maintenance Checklist" component.
6. Set care reminders for your plants using the "Care Reminders" component.
7. View overall garden status in the "Dashboard" component.

## Project Structure

- `src/components/`: React components (AuthComponent, Dashboard, PlantSelection, etc.)
- `src/hooks/`: Custom React hooks (useLocalStorage, usePlants)
- `src/data/`: Static data files
- `src/types.ts`: TypeScript type definitions
- `src/supabaseClient.ts`: Supabase client configuration

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Acknowledgments

- Plant information sourced from various hydroponic gardening resources.
- Built with React, TypeScript, and Supabase.
- UI components styled with Tailwind CSS.
