import { useEffect } from "react";

declare global {
  interface Window {
    AmCharts: any;
  }
}

let amChartsPromise: Promise<void> | null = null;

const loadScript = (src: string) =>
  new Promise<void>((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(script);
  });

const loadCss = (href: string) =>
  new Promise<void>((resolve, reject) => {
    if (document.querySelector(`link[href="${href}"]`)) {
      resolve();
      return;
    }
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    link.onload = () => resolve();
    link.onerror = () => reject(new Error(`Failed to load ${href}`));
    document.head.appendChild(link);
  });

const loadAmCharts = () => {
  if (amChartsPromise) return amChartsPromise;
  amChartsPromise = (async () => {
    await loadCss("https://www.amcharts.com/lib/3/plugins/export/export.css");
    await loadScript("https://www.amcharts.com/lib/3/ammap.js");
    await loadScript("https://www.amcharts.com/lib/3/maps/js/worldLow.js");
    await loadScript("https://www.amcharts.com/lib/3/themes/light.js");
    await loadScript("https://www.amcharts.com/lib/3/plugins/export/export.min.js");
  })();
  return amChartsPromise;
};

const WorldMap = () => {
  useEffect(() => {
    let map: any;
    let cancelled = false;

    const init = async () => {
      try {
        await loadAmCharts();
        if (cancelled || !window.AmCharts) return;

        const targetSVG =
          "M9,0C4.029,0,0,4.029,0,9s4.029,9,9,9s9-4.029,9-9S13.971,0,9,0z M9,15.93 c-3.83,0-6.93-3.1-6.93-6.93S5.17,2.07,9,2.07s6.93,3.1,6.93,6.93S12.83,15.93,9,15.93 M12.5,9c0,1.933-1.567,3.5-3.5,3.5S5.5,10.933,5.5,9S7.067,5.5,9,5.5 S12.5,7.067,12.5,9z";

        const planeSVG =
          "m2,106h28l24,30h72l-44,-133h35l80,132h98c21,0 21,34 0,34l-98,0 -80,134h-35l43,-133h-71l-24,30h-28l15,-47";

        map = window.AmCharts.makeChart("chartdiv", {
          type: "map",
          theme: "light",
          projection: "miller",
          dataProvider: {
            map: "worldLow",
            areas: [
              { id: "AS", color: "#4477AA" },
              { id: "EU", color: "#335577" },
            ],
            lines: [
              {
                id: "lineIndia",
                arc: -0.8,
                alpha: 0.3,
                latitudes: [20.5937, 25.2048, 48.8566, 51.5074, 35.6895],
                longitudes: [78.9629, 55.2708, 2.3522, -0.1276, 139.6917],
              },
              {
                id: "lineIndiaShadow",
                alpha: 0,
                latitudes: [20.5937, 25.2048, 48.8566, 51.5074, 35.6895],
                longitudes: [78.9629, 55.2708, 2.3522, -0.1276, 139.6917],
              },
            ],
            images: [
              {
                svgPath: targetSVG,
                title: "India",
                latitude: 20.5937,
                longitude: 78.9629,
              },
              {
                svgPath: targetSVG,
                title: "Dubai",
                latitude: 25.2048,
                longitude: 55.2708,
              },
              {
                svgPath: targetSVG,
                title: "Paris",
                latitude: 48.8566,
                longitude: 2.3522,
              },
              {
                svgPath: targetSVG,
                title: "London",
                latitude: 51.5074,
                longitude: -0.1276,
              },
              {
                svgPath: targetSVG,
                title: "Tokyo",
                latitude: 35.6895,
                longitude: 139.6917,
              },
              {
                svgPath: planeSVG,
                positionOnLine: 0,
                color: "#000000",
                alpha: 0.3,
                animateAlongLine: true,
                lineId: "lineIndiaShadow",
                flipDirection: true,
                loop: true,
                scale: 0.07,
                positionScale: 1.5,
              },
              {
                svgPath: planeSVG,
                positionOnLine: 0,
                color: "#222222",
                animateAlongLine: true,
                lineId: "lineIndia",
                flipDirection: true,
                loop: true,
                scale: 0.07,
                positionScale: 2,
              },
            ],
          },
          areasSettings: {
            unlistedAreasColor: "#b6e2f0",
            rollOverOutlineColor: "#fff",
            rollOverColor: "#74b9ff",
          },
          imagesSettings: {
            color: "#333333",
            rollOverColor: "#000000",
            selectedColor: "#000000",
            pauseDuration: 0.2,
            animationDuration: 4,
            adjustAnimationSpeed: true,
          },
          linesSettings: {
            color: "#333333",
            alpha: 0.4,
          },
          export: {
            enabled: true,
          },
        });
      } catch (error) {
        console.error(error);
      }
    };

    init();

    return () => {
      cancelled = true;
      if (map && typeof map.clear === "function") {
        map.clear();
      }
    };
  }, []);

  return (
    <div
      id="chartdiv"
      style={{
        width: "100%",
        height: "500px",
        borderRadius: "10px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
      }}
    ></div>
  );
};

export default WorldMap;
