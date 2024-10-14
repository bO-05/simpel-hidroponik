-- Create the plants table if it doesn't exist
CREATE TABLE IF NOT EXISTS plants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    difficulty TEXT NOT NULL,
    growth_time INTEGER NOT NULL,
    type TEXT NOT NULL,
    image TEXT NOT NULL,
    description TEXT NOT NULL,
    nutrient_needs TEXT NOT NULL,
    ideal_ph TEXT NOT NULL,
    harvest_time TEXT NOT NULL,
    ideal_temperature TEXT NOT NULL,
    ideal_humidity TEXT NOT NULL,
    companions TEXT[] NOT NULL
);

-- Insert some sample data if the table is empty
INSERT INTO plants (name, difficulty, growth_time, type, image, description, nutrient_needs, ideal_ph, harvest_time, ideal_temperature, ideal_humidity, companions)
SELECT 'Tomato', 'Medium', 8, 'Vegetable', 'https://example.com/tomato.jpg', 'A popular garden vegetable', 'High', '6.0-6.8', '60-80 days', '65-85°F', '60-80%', ARRAY['Basil', 'Marigold']
WHERE NOT EXISTS (SELECT 1 FROM plants LIMIT 1);
