/**
 * Enhanced gallery scanner that generates rich metadata
 * Run this script whenever you add new images to your gallery
 */

import fs from "fs";
import path from "path";
import { promisify } from "util";
import { exec } from "child_process";

const execAsync = promisify(exec);

// Define types for our gallery data
interface MediaItem {
  src: string;
  type: "image" | "video";
  alt?: string;
}

interface DescriptionLink {
  href: string;
  text: string;
}

interface GalleryTile {
  id: string;
  title: string;
  behavior: "expand" | "video" | "link" | "image";
  thumbnail: string;
  thumbnailType?: "image" | "video";
  media?: MediaItem[];
  description?: string;
  descriptionLinks?: DescriptionLink[]; // Added this property
  externalLink?: string;
  category?: string;
  featured?: boolean;
  aspectRatio?: number;
  year?: string;
}

interface GalleryData {
  tiles: GalleryTile[];
}

// Move getMediaType to top level to avoid ES5 strict mode issues
function getMediaType(file: string): "image" | "video" {
  return file.endsWith(".mp4") || file.endsWith(".webm") ? "video" : "image";
}

/**
 * Gets image dimensions to calculate aspect ratio
 */
async function getImageDimensions(
  imagePath: string
): Promise<{ width: number; height: number }> {
  try {
    const { stdout } = await execAsync(
      `identify -format "%w %h" "${imagePath}"`
    );
    const [width, height] = stdout.trim().split(" ").map(Number);
    return { width, height };
  } catch (error) {
    console.error(`Error getting dimensions for ${imagePath}:`, error);
    return { width: 1200, height: 800 }; // Default fallback
  }
}

// New function to generate sample description links for certain projects
function generateDescriptionLinks(
  projectId: string
): DescriptionLink[] | undefined {
  // Add specific links for certain projects
  if (projectId === "cover-crop-spotlight") {
    return [
      {
        href: "https://example.com/sustainable-farming",
        text: "Learn about sustainable farming",
      },
      { href: "https://example.com/cover-crops", text: "Cover crop benefits" },
    ];
  }

  if (projectId === "feed-coop-kawmix") {
    return [
      {
        href: "https://example.com/feed-systems",
        text: "Feed systems overview",
      },
      {
        href: "https://example.com/agricultural-coops",
        text: "About agricultural cooperatives",
      },
    ];
  }

  // Add more project-specific links as needed

  // Return undefined for projects that don't need links
  return undefined;
}

/**
 * Automatically scans the photo-gallery directory and generates gallery data
 */
async function scanGallery() {
  const galleryDir = path.join(process.cwd(), "public/images/photo-gallery");
  const outputPath = path.join(
    process.cwd(),
    "pages/gallery-components/gallery-data.json"
  );

  console.log(`Scanning directory: ${galleryDir}`);

  if (!fs.existsSync(galleryDir)) {
    console.error(`Gallery directory not found: ${galleryDir}`);
    return;
  }

  const files = fs.readdirSync(galleryDir);
  const mediaFiles = files.filter((file) => {
    const ext = path.extname(file).toLowerCase();
    return [".jpg", ".jpeg", ".png", ".gif", ".webp", ".mp4", ".webm"].includes(
      ext
    );
  });

  console.log(`Found ${mediaFiles.length} media files`);

  const fileGroups: Record<string, string[]> = {};

  mediaFiles.forEach((file) => {
    const match = file.match(/^([a-zA-Z0-9-_]+)-\d+/);
    if (match && match[1]) {
      const projectName = match[1];
      if (!fileGroups[projectName]) {
        fileGroups[projectName] = [];
      }
      fileGroups[projectName].push(file);
    } else {
      const baseName = path.basename(file, path.extname(file));
      if (!fileGroups[baseName]) {
        fileGroups[baseName] = [];
      }
      fileGroups[baseName].push(file);
    }
  });

  const tiles: GalleryTile[] = [];

  for (const [groupName, files] of Object.entries(fileGroups)) {
    const title = groupName
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());

    const behavior: GalleryTile["behavior"] =
      files.length > 1 ? "expand" : "image";
    const thumbnail = files[0];
    const thumbnailType = getMediaType(thumbnail);

    let aspectRatio;
    if (thumbnailType === "image") {
      const imagePath = path.join(galleryDir, thumbnail);
      try {
        const dimensions = await getImageDimensions(imagePath);
        aspectRatio = dimensions.width / dimensions.height;
      } catch (error) {
        console.warn(
          `Couldn't get dimensions for ${thumbnail}, using default aspect ratio`
        );
        aspectRatio = 1.5;
      }
    }

    let category;
    if (groupName.includes("web")) category = "Web Design";
    else if (groupName.includes("print")) category = "Print";
    else if (groupName.includes("photo")) category = "Photography";
    else if (groupName.includes("video")) category = "Video";
    else if (groupName.includes("3d")) category = "3D";
    else category = "Other";

    const media =
      behavior === "expand"
        ? files.slice(1).map((file) => ({
            src: file,
            type: getMediaType(file),
            alt: `${title} - ${file}`,
          }))
        : undefined;

    const featured = groupName.includes("featured") || Math.random() < 0.2;
    const yearMatch = groupName.match(/-(20\d\d)-/);
    const year = yearMatch ? yearMatch[1] : undefined;

    // Generate description links for this project
    const descriptionLinks = generateDescriptionLinks(groupName);

    tiles.push({
      id: groupName,
      title,
      behavior,
      thumbnail,
      thumbnailType,
      media,
      description: `${title} project.`,
      descriptionLinks, // Add the description links to the tile
      category,
      featured,
      aspectRatio,
      year,
    });
  }

  const galleryData: GalleryData = { tiles };
  fs.writeFileSync(outputPath, JSON.stringify(galleryData, null, 2));

  console.log(
    `Successfully generated gallery data with ${tiles.length} projects`
  );
  console.log(`Output written to: ${outputPath}`);
}

scanGallery().catch((err) => {
  console.error("Error scanning gallery:", err);
  process.exit(1);
});
