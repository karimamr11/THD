import sys
from PIL import Image

def remove_background(input_path, output_path, tolerance=30):
    print(f"Processing {input_path}...")
    try:
        img = Image.open(input_path).convert("RGBA")
    except Exception as e:
        print(f"Error opening image: {e}")
        return

    width, height = img.size
    pixels = img.load()
    
    queue = []
    visited = set()
    
    # Check borders
    for x in range(width):
        for y in (0, height-1):
            r, g, b, a = pixels[x, y]
            if r < tolerance and g < tolerance and b < tolerance:
                queue.append((x, y))
                visited.add((x, y))
                
    for y in range(height):
        for x in (0, width-1):
            if (x, y) not in visited:
                r, g, b, a = pixels[x, y]
                if r < tolerance and g < tolerance and b < tolerance:
                    queue.append((x, y))
                    visited.add((x, y))

    print(f"Found {len(queue)} initial edge pixels to remove.")
    removed = 0
    
    while queue:
        x, y = queue.pop(0)
        pixels[x, y] = (0, 0, 0, 0)
        removed += 1
        
        for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            nx, ny = x + dx, y + dy
            if 0 <= nx < width and 0 <= ny < height and (nx, ny) not in visited:
                r, g, b, a = pixels[nx, ny]
                if r < tolerance and g < tolerance and b < tolerance:
                    queue.append((nx, ny))
                    visited.add((nx, ny))
    
    print(f"Removed {removed} pixels. Saving to {output_path}...")
    img.save(output_path, "PNG")
    print("Done!")

if __name__ == "__main__":
    remove_background("public/building.png", "public/building.png", tolerance=25)
