import React, { useEffect, useRef } from "react";

const YandexMap = () => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    const loadYandexMap = () => {
      const script = document.createElement("script");
      script.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU";
      script.type = "text/javascript";
      script.onload = () => {
        window.ymaps.ready(init);
      };
      document.head.appendChild(script);
    };

    const init = () => {
      if (!mapRef.current) return;

      mapInstanceRef.current = new window.ymaps.Map(mapRef.current, {
        center: [45.142714, 42.014969], // Координаты центра карты
        zoom: 15,
        controls: ["zoomControl", "typeSelector", "fullscreenControl"], // Указание нужных контролов
      });

      const myPlacemark = new window.ymaps.Placemark(
        [45.142714, 42.014969], // Координаты маркера
        {
          hintContent: "г. Михайловск, ул. Демидова, д. 142/2",
          balloonContent: "Это ваше местоположение",
        }
      );

      mapInstanceRef.current.geoObjects.add(myPlacemark);
    };

    loadYandexMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy(); // Уничтожаем карту при размонтировании компонента
      }
    };
  }, []);

  return (
    <div
      id="map"
      ref={mapRef} // Привязываем ссылку к div карты
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
