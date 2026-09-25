-- ==============================================================================
-- BURGER LAB OS — PRODUCTION SEED DATA
-- ==============================================================================

-- Seed Master Menu Items
insert into public.menu_items (item_code, name, category, description, price, calories, grill_temp, fat_ratio, maillard_score, stock_status, image_url) values
('BL-01', 'THE SIGNATURE DOUBLE SMASH', 'burgers', 'Our flagship double smash burger. Two crispy hand-pressed beef patties, melted sharp white cheddar, and smoked bone-marrow aioli on toasted brioche.', 21.00, '680 kcal', '450°F Max', '80/20 Chuck & Rib', 9.8, 'available', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&h=600&q=80'),
('BL-02', 'THE TRUFFLE & GRUYÈRE', 'burgers', 'Marbled Wagyu chuck, sautéed wild chanterelles, melted Swiss Gruyère, and white truffle aioli on toasted brioche.', 26.00, '740 kcal', '460°F Sear', '75/25 Wagyu Chuck', 9.2, 'available', 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=600&h=600&q=80'),
('BL-03', 'THE GOCHUJANG GLAZE', 'burgers', 'Crispy griddle beef patties glazed in gochujang-soy reduction, house-pickled daikon, and fresh crisp watercress.', 24.00, '710 kcal', '445°F Sear', '80/20 Brisket Blend', 9.5, 'available', 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&h=600&q=80'),
('SD-11', 'TRIPLE-COOKED ROBUST WEDGES', 'sides', 'Fresh-cut potato wedges par-boiled and twice-fried in rendered A5 Wagyu beef tallow with Maldon flaked sea salt.', 12.00, '410 kcal', '365°F Tallow', 'A5 Wagyu Fat', 9.9, 'available', 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&h=600&q=80'),
('SD-15', 'QUICK-PICKLED DILL GHERKINS', 'sides', 'Hand-sliced English cucumbers cold-brined with wild dill flower, yellow mustard seeds, and organic white wine vinegar.', 9.00, '30 kcal', 'Cold 40°F', 'Zero Fat', 9.0, 'available', 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=600&h=600&q=80'),
('SD-22', 'CHARRED BONE MARROW CANOES', 'sides', 'Longitudinally split femur marrow bones roasted high over hardwood charcoal with fresh parsley and sourdough toast.', 18.00, '520 kcal', '500°F Charcoal', 'Pure Marrow', 9.6, 'low_stock', 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&h=600&q=80'),
('SK-40', 'MADAGASCAR VANILLA CAVIAR SHAKE', 'shakes', 'Heirloom Madagascar vanilla bean pods hand-scraped and blended with organic high-butterfat double cream and maple glaze.', 14.00, '490 kcal', 'Frozen 22°F', 'Country Cream', 9.7, 'available', 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=600&h=600&q=80'),
('SK-45', 'TOASTED SESAME & WHITE MISO SHAKE', 'shakes', 'Toasted black hull sesame paste blended with Kyoto white Shiro miso and Brittany grey salt.', 15.00, '520 kcal', 'Frozen 22°F', 'Cream Blend', 9.4, 'available', 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&h=600&q=80'),
('LN-01', 'THE MIDNIGHT SINGLE', 'late-night', 'Exclusive late-hours smash single patty with sweet caramelized onions and spicy brown mustard glaze.', 16.00, '410 kcal', '460°F Sear', '80/20 Chuck', 9.6, 'available', 'https://images.unsplash.com/photo-1521305916504-4a1121188589?auto=format&fit=crop&w=600&h=600&q=80'),
('LN-05', 'BEEF-TALLOW CRACKLED POPCORN', 'late-night', 'Warm popcorn lightly misted with grass-fed beef tallow and dusted with toasted nutritional yeast.', 11.00, '280 kcal', 'Air-Popped 375°F', 'Grass-Fed Tallow', 9.3, 'available', 'https://images.unsplash.com/photo-1578849278619-e73505e9610f?auto=format&fit=crop&w=800&q=80');

-- Seed Grill Station Nodes
insert into public.grill_stations (station_code, name, hardware, target_temp, current_temp, load_factor, active_task, status) values
('STATION-01', 'Cast-Iron Flat-Top Alpha', 'Custom 3/4" Rolled Steel Plate (450°F)', '450°F', '452°F', '88%', 'Caramelizing 6x Prime Double Smashes', 'ACTIVE'),
('STATION-02', 'Cast-Iron Flat-Top Beta', 'Custom 3/4" Rolled Steel Plate (450°F)', '450°F', '448°F', '65%', 'Gochujang Soy Reduction Glazing', 'ACTIVE'),
('STATION-03', 'Brioche Toasting Carousel', 'Commercial Radiance Bun Toaster', '380°F', '380°F', '40%', 'Butter-Steaming 8x Seeded Crowns', 'ACTIVE'),
('STATION-04', 'Tallow Fry Station Alpha', 'Pitco Wagyu Tallow Fryer', '365°F', '365°F', '72%', 'Triple-Cooking Robust Wedges', 'ACTIVE');

-- Seed KDS Orders
insert into public.orders (order_number, customer_name, customer_phone, order_type, status, subtotal, tax, total, special_instructions) values
('#TK-482', 'Marcus Vance', '+1 (555) 392-1084', 'Dine-In', 'on_grill', 68.00, 5.44, 73.44, 'Extra bone-marrow aioli on the side, please!'),
('#TK-483', 'Elena Rostova', '+1 (555) 720-4921', 'VIP Counter', 'plating', 59.00, 4.72, 63.72, 'VIP reservation counter seat 3'),
('#TK-484', 'Devon Hayes', '+1 (555) 198-3301', 'Takeout', 'received', 70.00, 5.60, 75.60, 'Pick up at 8:30 PM sharp'),
('#TK-480', 'Siddharth Patel', '+1 (555) 441-8910', 'Dine-In', 'ready', 28.00, 2.24, 30.24, 'Table 7');
