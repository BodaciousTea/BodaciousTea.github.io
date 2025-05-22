"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { useWindowSize } from "@/components/common/gallery-components/use-window-size"
import styles from "@/components/common/gallery-components/gallery.module.css"
import "@/styles/gallery-globals.css"
import "@/components/common/gallery-components/breathing-text.css"
import BreathingText from "@/components/common/gallery-components/BreathingText"
// Remove the ArrowRight import:
// import { ArrowRight } from 'lucide-react'

const ArrowDown = () => <div style={{ fontSize: "2rem", color: "#f0f0f0" }}>↓</div>

export interface MediaItem {
  src: string
  type: "image" | "video"
  alt?: string
}

export interface GalleryTileProps {
  id: string
  title: string
  behavior: "expand" | "video" | "link" | "image"
  thumbnail: string
  thumbnailType?: "image" | "video"
  media?: MediaItem[]
  description?: string
  descriptionLinks?: { href: string; text: string }[]
  externalLink?: string
  category?: string
  featured?: boolean
  aspectRatio?: number
  year?: string
}

import rawGalleryData from "@/components/common/gallery-components/gallery-data.json"

const galleryData: { tiles: GalleryTileProps[] } = rawGalleryData as { tiles: GalleryTileProps[] }

export default function Gallery() {
  const { width } = useWindowSize()
  const [columns, setColumns] = useState(3)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [expandedTile, setExpandedTile] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const categories = Array.from(new Set(galleryData.tiles.map((tile) => tile.category).filter(Boolean)))

  useEffect(() => {
    if (width < 640) {
      setColumns(1)
    } else if (width < 1024) {
      setColumns(2)
    } else {
      setColumns(3)
    }
  }, [width])

  // Filter out featured projects from the main gallery to avoid duplication
  const featuredProjectIds = galleryData.tiles.filter((tile) => tile.featured).map((tile) => tile.id)

  const filteredTiles = activeCategory
    ? galleryData.tiles.filter((tile) => tile.category === activeCategory)
    : // Only show non-featured projects in the main gallery when viewing "All"
      galleryData.tiles.filter((tile) => !featuredProjectIds.includes(tile.id) || activeCategory !== null)

  const featuredProjects = galleryData.tiles.filter((tile) => tile.featured)

  const distributeIntoColumns = (tiles: GalleryTileProps[]) => {
    const columnsArray: GalleryTileProps[][] = Array.from({ length: columns }, () => [])

const sortedTiles = [...tiles] // Maintain original order


    sortedTiles.forEach((tile) => {
      const columnHeights = columnsArray.map((column) =>
        column.reduce((height, tile) => height + (tile.aspectRatio || 1.5), 0),
      )
      const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights))
      columnsArray[shortestColumnIndex].push(tile)
    })

    return columnsArray
  }

  // Make sure the handleTileClick function is correctly toggling the expanded state
  const handleTileClick = (tileId: string, behavior: string) => {
    // Only toggle expand state for tiles with expand behavior
    if (behavior === "expand") {
      requestAnimationFrame(() => {
        setExpandedTile(expandedTile === tileId ? null : tileId)
      })

      if (expandedTile !== tileId) {
        setTimeout(() => {
          const element = document.getElementById(`tile-${tileId}`)
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" })
          }
        }, 300)
      }
    } else if (behavior === "link") {
      // Handle link behavior
      const tile = galleryData.tiles.find((t) => t.id === tileId)
      if (tile?.externalLink) {
        window.open(tile.externalLink, "_blank")
      }
    }
  }

  const columnData = distributeIntoColumns(filteredTiles)

  return (
    <div className={styles.galleryContainer} ref={scrollRef}>
      {/* Hero Section with Breathing Animation */}
      <div className={styles.heroSection}>
        <BreathingText
          text="Portfolio"
          speed="medium"
          intensity="dramatic"
          withScale={true}
          style={{ fontSize: width < 768 ? "4rem" : "6rem" }}
        />
        <p className={styles.gallerySubtitle}>A collection of visual explorations and design projects</p>
        <div className={styles.scrollIndicator}>
          <ArrowDown />
          <span>Scroll to explore</span>
        </div>
      </div>

      {/* Category Navigation */}
      <div className={styles.categoryNav}>
        <button
          className={`${styles.categoryButton} ${activeCategory === null ? styles.active : ""}`}
          onClick={() => setActiveCategory(null)}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            className={`${styles.categoryButton} ${activeCategory === category ? styles.active : ""}`}
            onClick={() => setActiveCategory(category ?? null)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Featured Projects Section */}
      {activeCategory === null && featuredProjects.length > 0 && (
        <div className={styles.featuredSection}>
          <h2 className={styles.sectionTitle}>Featured Projects</h2>
          <div className={styles.featuredGrid}>
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                id={`tile-${project.id}`}
                className={`${styles.featuredTile} ${expandedTile === project.id ? styles.expanded : ""}`}
                onClick={() => handleTileClick(project.id, project.behavior)}
              >
                <div className={styles.featuredImageWrapper}>
                  <Image
                    src={`/images/photo-gallery/${project.thumbnail}`}
                    alt={project.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className={styles.featuredImage}
                    priority
                  />
                  <div className={styles.featuredOverlay}>
                    <h3 className={styles.featuredTitle}>{project.title}</h3>
                    {project.year && <span className={styles.projectYear}>{project.year}</span>}
                    <div className={styles.viewProject}>
                      {project.behavior === "expand" ? "View Details" : "View Project"}
                    </div>
                  </div>
                </div>

                {/* Simplified Expanded Content for Featured Projects - No Title/Date */}
                {project.behavior === "expand" && expandedTile === project.id && (
                  <div className={styles.expandedFeatured}>
                    {project.description && <p className={styles.expandedDescription}>{project.description}</p>}

                    {/* Add description links if they exist */}
                    {project.descriptionLinks && project.descriptionLinks.length > 0 && (
                      <div className={styles.descriptionLinks}>
                        {project.descriptionLinks.map((link, index) => (
                          <p key={index}>
                            <a
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={styles.descriptionLink}
                            >
                              {link.text}
                            </a>
                          </p>
                        ))}
                      </div>
                    )}

                    {project.media && project.media.length > 0 && (
                      <div className={styles.expandedMediaGrid}>
                        {project.media.map((item, index) => (
                          <div key={`media-${index}`} className={styles.expandedMediaItem}>
                            {item.type === "image" ? (
                              <div className={styles.expandedImageWrapper}>
                                <Image
                                  src={`/images/photo-gallery/${item.src}`}
                                  alt={item.alt || `${project.title} - image ${index + 1}`}
                                  width={1200}
                                  height={800}
                                  className={styles.expandedImage}
                                />
                              </div>
                            ) : (
                              <video className={styles.expandedVideo} controls playsInline>
                                <source src={`/images/photo-gallery/${item.src}`} type="video/mp4" />
                              </video>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Gallery Grid */}
      <div className={styles.gallerySection}>
        <h2 className={styles.sectionTitle}>{activeCategory ? activeCategory : "All Projects"}</h2>
        <div className={styles.galleryGrid} style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
          {columnData.map((column, columnIndex) => (
            <div key={`column-${columnIndex}`} className={styles.galleryColumn}>
              {column.map((tile) => (
                <div
                  key={tile.id}
                  id={`tile-${tile.id}`}
                  className={`${styles.tileContainer} ${expandedTile === tile.id ? styles.expanded : ""}`}
                >
                  <div className={styles.tile} onClick={() => handleTileClick(tile.id, tile.behavior)}>
                    <div
                      className={styles.thumbnailWrapper}
                      style={{ aspectRatio: tile.aspectRatio ? `${tile.aspectRatio}` : "auto" }}
                    >
                      {tile.thumbnailType === "video" ? (
                        <video className={styles.thumbnail} autoPlay muted loop playsInline>
                          <source src={`/images/photo-gallery/${tile.thumbnail}`} type="video/mp4" />
                        </video>
                      ) : (
                        <Image
                          src={`/images/photo-gallery/${tile.thumbnail}`}
                          alt={tile.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className={styles.thumbnail}
                        />
                      )}
                      <div className={styles.tileOverlay}>
                        <div className={styles.tileInfo}>
                          <h3 className={styles.tileTitle}>{tile.title}</h3>
                          {tile.year && <span className={styles.tileYear}>{tile.year}</span>}
                          {tile.behavior === "expand" && <div className={styles.expandIcon}>+</div>}
                          {tile.behavior === "link" && <div className={styles.linkIcon}>→</div>}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Simplified Expanded Content - No Title/Date */}
                  {tile.behavior === "expand" && (
                    <div
                      className={styles.expandedContent}
                      style={{
                        maxHeight: expandedTile === tile.id ? "2000px" : "0",
                        padding: expandedTile === tile.id ? "1.5rem" : "0",
                      }}
                    >
                      {tile.description && <p className={styles.expandedDescription}>{tile.description}</p>}

                      {/* Add description links if they exist */}
                      {tile.descriptionLinks && tile.descriptionLinks.length > 0 && (
                        <div className={styles.descriptionLinks}>
                          {tile.descriptionLinks.map((link, index) => (
                            <p key={index}>
                              <a
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.descriptionLink}
                              >
                                {link.text}
                              </a>
                            </p>
                          ))}
                        </div>
                      )}

                      {tile.media && tile.media.length > 0 && (
                        <div className={styles.expandedMediaGrid}>
                          {tile.media.map((item, index) => (
                            <div key={`media-${index}`} className={styles.expandedMediaItem}>
                              {item.type === "image" ? (
                                <div className={styles.expandedImageWrapper}>
                                  <Image
                                    src={`/images/photo-gallery/${item.src}`}
                                    alt={item.alt || `${tile.title} - image ${index + 1}`}
                                    width={1200}
                                    height={800}
                                    className={styles.expandedImage}
                                  />
                                </div>
                              ) : (
                                <video className={styles.expandedVideo} controls playsInline>
                                  <source src={`/images/photo-gallery/${item.src}`} type="video/mp4" />
                                </video>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.editorialBreak}>
        <div className={styles.editorialLine}></div>
        <div className={styles.editorialCircle}></div>
      </div>

      <div className={styles.galleryFooter}>
        <p className={styles.footerText}>© {new Date().getFullYear()} Ted Koller. All rights reserved.</p>
      </div>
    </div>
  )
}
