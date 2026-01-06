import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SEOProps {
  title?: string;
  description?: string;
  ogImage?: string;
}

const SEO = ({ title, description, ogImage }: SEOProps) => {
  const location = useLocation();

  useEffect(() => {
    // Mettre à jour le titre
    if (title) {
      document.title = title;
    }

    // Mettre à jour la meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    if (description) {
      metaDescription.setAttribute("content", description);
    }

    // Mettre à jour les meta OpenGraph
    const updateMeta = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("property", property);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    if (title) updateMeta("og:title", title);
    if (description) updateMeta("og:description", description);
    if (ogImage) updateMeta("og:image", ogImage);

    // Mettre à jour l'URL canonique
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", `https://secretar-ia.fr${location.pathname}`);
  }, [title, description, ogImage, location.pathname]);

  return null;
};

export default SEO;


