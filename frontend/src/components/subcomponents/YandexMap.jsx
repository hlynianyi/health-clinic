import React, { useEffect, useRef } from "react";

const YandexMap = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A3e351105ccd6bc05a582be82cea0b4cadfaa7722d4f6c9fc6e1f935d2bca65c7&amp;width=100%25&amp;height=500&amp;lang=en_FR&amp;scroll=true";
    script.async = true;
    script.charset = "utf-8";

    mapRef.current.appendChild(script);

    return () => {
      if (mapRef.current) {
        mapRef.current.innerHTML = ""; // Очищаем контейнер карты при размонтировании компонента
      }
    };
  }, []);

  return (
    <div
      ref={mapRef}
      style={{
        width: "100%",
        height: "500px",
        marginTop: "20px",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    ></div>
  );
};

export default YandexMap;
