'use client';
import { useState } from 'react';
import { MapPin } from 'lucide-react';
import Picture from './Picture';
import { site } from '@/data/site';

/**
 * Google Maps is ~1 MB of third-party script, so show the storefront photo
 * first and only load the interactive map when someone asks for it.
 */
export default function MapEmbed() {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <div className="map-frame">
        <iframe
          title="Map showing Kerala Coastal Restaurant on Shankar Road, Rajinder Nagar"
          src={site.maps.embed}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className="map-frame map-facade">
      <Picture
        name="storefront"
        alt="The Kerala Coastal Restaurant signboard on Shankar Road"
        sizes="(max-width: 1040px) 92vw, 560px"
      />
      <div className="map-facade-overlay">
        <p className="map-facade-hint">Look for our black Kerala Coastal signboard, opposite the BSES office</p>
        <div className="map-facade-actions">
          <button type="button" className="btn btn-coconut" onClick={() => setLoaded(true)}>
            <MapPin size={18} aria-hidden="true" /> Show map
          </button>
          <a className="btn btn-outline" href={site.maps.place} target="_blank" rel="noopener noreferrer">
            Open in Google Maps
          </a>
        </div>
      </div>
    </div>
  );
}
