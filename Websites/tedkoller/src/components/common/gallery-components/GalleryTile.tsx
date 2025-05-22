"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import styles from "./gallery.module.css"
import type { GalleryTileProps } from "@/app/home/Gallery"

interface TileProps {
  tile: GalleryTileProps & {
    descriptionLinks?: { href: string; text: string }[]
  }
}

export default function GalleryTile({ tile }: TileProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isMobileOverlayVisible, setIsMobileOverlayVisible] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleTileClick = () => {
    if (tile.behavior === "link" && tile.externalLink) {
      window.open(tile.externalLink, "_blank")
    } else if (tile.behavior === "expand") {
      setIsExpanded(!isExpanded)
    }
  }

  const handleMobileTap = () => {
    if (window.innerWidth < 768) {
      if (!isMobileOverlayVisible) {
        setIsMobileOverlayVisible(true)
      } else {
        handleTileClick()
        setIsMobileOverlayVisible(false)
      }
    } else {
      handleTileClick()
    }
  }

  return (
    <div className={styles.tileWrapper}>
      <div
        className={`${styles.tile} ${isExpanded ? styles.expanded : ""}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleMobileTap}
      >
        {/* Thumbnail */}
        {tile.thumbnailType === "video" ? (
          <video ref={videoRef} className={styles.thumbnail} autoPlay muted loop playsInline>
            <source src={`/images/photo-gallery/${tile.thumbnail}`} type="video/mp4" />
          </video>
        ) : (
          <div className={styles.thumbnailWrapper}>
            <Image
              src={`/images/photo-gallery/${tile.thumbnail}`}
              alt={tile.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className={styles.thumbnail}
              priority
            />
          </div>
        )}

        {/* Overlay */}
        {(isHovered || isMobileOverlayVisible) && (
          <div className={styles.overlay}>
            <div className={styles.overlayContent}>
              <h3 className={styles.tileTitle}>{tile.title}</h3>
              {tile.behavior === "expand" && <div className={styles.plusIcon}>+</div>}
            </div>
          </div>
        )}
      </div>

      {/* Expanded Content */}
      {isExpanded && tile.behavior === "expand" && (
        <div className={styles.expandedContent}>
          {tile.description && (
            <div className={styles.expandedDescription}>
              <p>{tile.description}</p>
              {tile.descriptionLinks && tile.descriptionLinks.length > 0 && (
                <div style={{ marginTop: '1rem' }}>
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
            </div>
          )}

          {/* Optional button if external link exists */}
          {tile.externalLink && (
            <a
              href={tile.externalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 underline text-white text-sm"
            >
              Watch full video →
            </a>
          )}

          {tile.media && tile.media.length > 0 && (
            <div className={styles.mediaGrid}>
              {tile.media.map((item, index) => (
                <div key={`media-${index}`} className={styles.mediaItem}>
                  {item.type === "image" ? (
                    <div className={styles.mediaImageWrapper}>
                      <Image
                        src={`/images/photo-gallery/${item.src}`}
                        alt={item.alt || `${tile.title} - image ${index + 1}`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className={styles.mediaImage}
                      />
                    </div>
                  ) : (
                    <video className={styles.mediaVideo} controls playsInline>
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
  )
}
