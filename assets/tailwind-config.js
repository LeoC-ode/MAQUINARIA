tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "secondary-container": "#dae2fd",
        "error": "#ba1a1a",
        "on-primary-container": "#fffbff",
        "surface-tint": "#a73a00",
        "outline-variant": "#e2bfb2",
        "surface": "#f6fafe",
        "inverse-surface": "#2c3134",
        "surface-bright": "#f6fafe",
        "surface-container-lowest": "#ffffff",
        "on-secondary": "#ffffff",
        "secondary": "#565e74",
        "on-tertiary": "#ffffff",
        "primary-fixed-dim": "#ffb599",
        "on-surface-variant": "#5a4138",
        "surface-container": "#eaeef2",
        "on-primary": "#ffffff",
        "surface-variant": "#dfe3e7",
        "on-error-container": "#93000a",
        "on-secondary-container": "#5c647a",
        "surface-container-highest": "#dfe3e7",
        "on-error": "#ffffff",
        "error-container": "#ffdad6",
        "on-background": "#171c1f",
        "outline": "#8e7166",
        "primary-container": "#cc4900",
        "surface-container-high": "#e4e9ed",
        "on-surface": "#171c1f",
        "primary-fixed": "#ffdbce",
        "tertiary-container": "#67758c",
        "background": "#f6fafe",
        "surface-container-low": "#f0f4f8",
        "surface-dim": "#d6dade",
        "tertiary": "#4f5d72",
        "primary": "#a33900"
      },
      borderRadius: {
        DEFAULT: "0.125rem",
        lg: "0.25rem",
        xl: "0.5rem",
        full: "0.75rem"
      },
      spacing: {
        sm: "8px",
        gutter: "16px",
        xl: "32px",
        md: "16px",
        base: "8px",
        xs: "4px",
        margin: "24px",
        lg: "24px"
      },
      fontFamily: {
        "body-md": ["Public Sans"],
        "body-lg": ["Public Sans"],
        "h3": ["Public Sans"],
        "label-sm": ["Public Sans"],
        "h2": ["Public Sans"],
        "display": ["Public Sans"],
        "caption": ["Public Sans"],
        "h1": ["Public Sans"]
      },
      fontSize: {
        "body-md": ["16px", { lineHeight: "1.6", fontWeight: "400" }],
        "body-lg": ["18px", { lineHeight: "1.6", fontWeight: "400" }],
        "h3": ["20px", { lineHeight: "1.4", fontWeight: "600" }],
        "label-sm": ["14px", { lineHeight: "1.4", letterSpacing: "0.02em", fontWeight: "600" }],
        "h2": ["24px", { lineHeight: "1.3", fontWeight: "600" }],
        "display": ["36px", { lineHeight: "1.2", fontWeight: "700" }],
        "caption": ["12px", { lineHeight: "1.4", fontWeight: "400" }],
        "h1": ["30px", { lineHeight: "1.3", fontWeight: "600" }]
      }
    }
  }
};
