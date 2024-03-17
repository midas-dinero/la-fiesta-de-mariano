import json

# Read the JSON file
with open('board_1.json', 'r') as file:
    data = json.load(file)

# Refactor the data
for square in data['squares']:
    centerX = sum(square['coord_x']) / len(square['coord_x'])
    centerY = sum(square['coord_y']) / len(square['coord_y'])
    square['center_coord'] = [centerX, centerY]
    del square['coord_x']
    del square['coord_y']

# Write the refactored data back to the JSON file
with open('board_1.json', 'w') as file:
    json.dump(data, file, indent=4)