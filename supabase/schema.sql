-- Create tables for TaskFlow app

-- Enable Row Level Security
ALTER DATABASE postgres SET "anon.jwt.secret" TO 'your-jwt-secret';

-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL,
  columnId TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create columns table
CREATE TABLE IF NOT EXISTS columns (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  color TEXT NOT NULL,
  "order" INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default columns if needed
INSERT INTO columns (id, title, color, "order")
VALUES 
  ('todo', 'To Do', 'bg-blue-50', 1),
  ('in-progress', 'In Progress', 'bg-yellow-50', 2),
  ('done', 'Done', 'bg-green-50', 3)
ON CONFLICT (id) DO NOTHING;

-- Enable Row Level Security
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE columns ENABLE ROW LEVEL SECURITY;

-- Create policies
-- For now, allow all operations (in a real app, you'd want to restrict based on user ID)
CREATE POLICY "Allow all operations for tasks" ON tasks FOR ALL USING (true);
CREATE POLICY "Allow all operations for columns" ON columns FOR ALL USING (true);

-- Create function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to update the updated_at timestamp
CREATE TRIGGER update_tasks_updated_at
BEFORE UPDATE ON tasks
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_columns_updated_at
BEFORE UPDATE ON columns
FOR EACH ROW
EXECUTE FUNCTION update_updated_at(); 