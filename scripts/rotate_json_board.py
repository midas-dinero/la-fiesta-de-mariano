import json
import sys
import os

def rotate_coords_90_clockwise(json_path, height):
    # Load the JSON data
    with open(json_path, 'r') as f:
        data = json.load(f)

    # Process each square
    for square in data.get('squares', []):
        x, y = square['center_coord']
        x_new = height - y
        y_new = x
        square['center_coord'] = [x_new, y_new]

    # Save rotated version to a new file
    base, ext = os.path.splitext(json_path)
    rotated_path = f"{base}_rotated{ext}"
    with open(rotated_path, 'w') as f:
        json.dump(data, f, indent=4)

    print(f"Rotated coordinates saved to: {rotated_path}")

# Example usage
if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python rotate_json.py path/to/file.json height")
        sys.exit(1)

    json_file = sys.argv[1]
    height = float(sys.argv[2])

    rotate_coords_90_clockwise(json_file, height)
